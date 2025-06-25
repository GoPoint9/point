<script setup lang="jsx">
import { calcAmount, getAwardResult } from './helper.ts'
import { getIcons, getIconsPublic, fixDateStr, formatTimeDay, dateRange, currency, getArrayKey, AwaitApiResult } from '@/utils'

import {
  getCpGameCategory,
  getExtGameCategory,
  getNewMyEmerdList,
  getExtNewMyEmerdList
} from '@/NCZ/api'

import TCTable from '@entrance/ncz-web-pgpc/components/TCTable'
import TabNav from '@entrance/ncz-web-pgpc/components/TabNav.vue'
import { $t } from '@/languages'

const route = useRoute()

const gameTypeList = computed(() => {
  return [
    { name: $t('YJ.lottery' /** 彩票 */), index: 0, key: 'cp' },
    { name: $t('YJ.live' /** 真人 */), index: 1, key: 'sx' },
    { name: $t('YJ.fishing' /** 捕鱼 */), index: 2, key: 'by' },
    { name: $t('YJ.chess' /** 棋牌 */), index: 3, key: 'qp' },
    { name: $t('YJ.miniGame' /** 原创 */), index: 4, key: 'mi' },
    { name: $t('YJ.electronic' /** 电子 */), index: 5, key: 'dz' },
    { name: $t('YJ.sport' /** 电子 */), index: 6, key: 'ty' },
  ]
})

const isLoading = ref(false)
const setLoadingState = boolean => (isLoading.value = boolean)
const currentGameIndex = ref(0)
const isCP = computed(() => unref(currentGameIndex) === 0)
const gameCategory = ref([])

const currentDate = ref('')
const currentCategoryIndex = ref(0)

const betResult = ref({})
const records = computed(() => {
  const { records = [] } = betResult.value
  // return [...records, ...records, ...records]
  return records
})
const count = computed(() => {
  const { count = 0 } = betResult.value
  return count
})

watch(
  () => currentGameIndex,
  val => console.log(' --> currentGameIndex ', val)
)
watch(
  () => currentCategoryIndex,
  val => console.log(' --> currentCategoryIndex ', val)
)

// 彩票跳轉 e.g. url?playId=K3
const queryCpID = computed(() => route.query.playId?.toUpperCase())
onMounted(() => {
  onTabClick({ index: 0 }).then(() => {
    // 如果網址有帶 query.playId
    if (unref(queryCpID)) {
      const cpIndex = gameCategory.value.findIndex(i => i.playId === unref(queryCpID))
      currentCategoryIndex.value = ~cpIndex ? cpIndex : 0 // -1 就給 0
    }
  })
})

const fecthBetData = async () => {
  const data = {
    pageNo: 1,
    pageSize: 10,
    searchDate: currentDate.value,
  }

  const categoryIndex = unref(currentCategoryIndex)
  const { playId = '' } = gameCategory.value[categoryIndex] ?? {}

  let res = {}
  // 彩票
  if (isCP.value) {
    data.playId = playId
    res = await AwaitApiResult(getNewMyEmerdList(data))
  } else {
    // 第三方
    data.extGamePlatformIds = playId.split(',')
    res = await AwaitApiResult(getExtNewMyEmerdList(data))
  }

  betResult.value = res?.data ?? {}
}

// 將第三方遊戲資料，轉換成 CP 的格式，以便元件更方便使用。
const transformExtGameCategory = resData => {
  const extList = resData.map(i => ({ playId: i.extGamePlatformId, name: i.extGamePlatformName }))
  const allId = extList.map(item => item.playId).join(',')
  return [{ name: $t('YJ.all'), playId: allId }, ...extList]
}

// 根據 index 取 CP(index: 0) 或第三方的遊戲分類資料
const fetchGameCategory = async () => {
  const promise = isCP.value ? getCpGameCategory() : getExtGameCategory({ categoryType: unref(currentGameIndex) })
  const res = await AwaitApiResult(promise)
  if (!res) return []
  return isCP.value ? res.data : transformExtGameCategory(res.data)
}

const onTabClick = async () => {
  if (unref(isLoading)) return
  setLoadingState(true)
  betResult.value = {}
  const result = await fetchGameCategory()
  gameCategory.value = result
  currentCategoryIndex.value = 0
  await fecthBetData()
  setLoadingState(false)
}

// TODO: 補第三方
const columnsProps = computed(() => {
  /**
    <div class="bet-container-lottery-card-header ar-1px-b">
      <h1><h2>{{ item.gameTitle || item.platfromName }}</h2><span
        :class="{
          'color40C592': item.awardResult && Number(item.winAmount),
          'colorE98613': item.awardResult && (Number(item.winAmount) <= 0)
        }"
      >{{ item.winStatus || item.orderStatus }}</span></h1>
      <p>{{ item.createDate || item.betTime }}</p>
    </div>
  */
  const columnsPropsCP = [
    { label: $t('Common.label_game_name'), prop: 'gameTitle' },
    { label: $t('Common.label_type'), prop: 'gameName' },
    { label: $t('label_bet_time'), prop: 'createDate' },
    { label: $t('Lottery.label_period'), prop: 'periodNo' },
    { label: $t('Common.label_orderNum'), prop: 'billNo' },
    { label: $t('LtConfig.label_CTXNC_title'), prop: 'betContent' },
    { label: $t('AgentCenter.label_total_betMoney'), prop: 'betAmount' },
    {
      label: $t('Lottery.label_results'),
      prop: 'awardResult',
      render: (h, { row, data }) => {
        return row.playId === 'RG'
          ? [
            <span class={getAwardResult(row).BSClass}>{ getAwardResult(row).BS }</span>,
            <span class={['ml-5', getAwardResult(row).colorClass]}>{ getAwardResult(row).color }</span>,
            ]
          : data
      },
    },
    { label: $t('Lottery.label_actual_amount'), prop: 'amountAfterTax', render: (h, { data }) => currency(data) },
    { label: $t('Lottery.label_winnings'), prop: 'winAmount', render: (h, { data }) => currency(data) },
    { label: $t('AccountManagement.label_handing_fee'), prop: 'amountTax', render: (h, { data }) => currency(data) },
    {
      label: $t('AgentCenter.label_profit_loss'),
      prop: 'winAmount',
      render: (h, { row }) => {
        return row.awardResult
          ? <span class={calcAmount(row).class}>{ calcAmount(row).amount }</span>
          : <span class="h4_red">-</span>
      },
    },
  ]

  const columnsPropsEXP = [
    { label: $t('Common.label_game_name'), prop: 'platfromName' },
    { label: $t('Common.label_type'), prop: 'gameName' },
    { label: $t('label_bet_time'), prop: 'betTime' },
    { label: $t('YJ.orderNumber' /** 订单号 */), prop: 'bettingCode' },
    { label: $t('YJ.betAmounts' /** 投注金额 */), prop: 'betAmount', render: (h, { data }) => currency(data) },
    { label: $t('AccountManagement.label_handing_fee' /** 手续费 */), prop: 'betAmount', render: (h) => currency(0) },
    { label: $t('YJ.actualAmount' /** 实际投注额 */), prop: 'actualAmount', render: (h, { data }) => currency(data) },
    { label: $t('YJ.lotteryAmount' /** 派彩金额 */), prop: 'winAmount', render: (h, { data }) => currency(data) },
    {
      label: $t('YJ.profitNloss' /** 盈亏 */),
      prop: 'profit',
      render: (h, { data }) => <span class={data > 0 ? 'success' : 'fail'}>currency(data)</span>,
    },
  ]

  return isCP.value ? columnsPropsCP : columnsPropsEXP
})

const onSearch = () => {
  fecthBetData()
}

const disabledDate = (time) => {
  return time.getTime() > Date.now() || time.getTime() < new Date(new Date().getFullYear() - 2, 1, 1)
}
</script>
<template>
  <div id="mc_container" class="order-history-wrap bet-record-wrapper CN">
    <TabNav
      v-model="currentGameIndex"
      :tabs="gameTypeList"
      :is-loading="isLoading"
      @tab-click="onTabClick"
    />

    <div id="tr_history" style="overflow: hidden">
      <div class="order-pvp-page reset-css">
        <div id="ui-id-4" class="search-form">
          <!-- 今天 昨天 最近7天 -->

          <div class="form-group">
            <ElDatePicker
              v-model="currentDate"
              :placeholder="$t('pickDate')"
              value-format="YYYY-MM-DD"
              :disabled-date="disabledDate"
              @change="onSearch"
            />
          </div>
          <div class="form-group v-line" />
          <div class="form-group">
            <ElSelect v-model="currentCategoryIndex" style="width: 200px" @change="onSearch">
              <el-option
                v-for="(i, index) in gameCategory"
                :key="i.name"
                :label="i.name"
                :value="index"
              >
                {{ i.name }}
              </el-option>
            </ElSelect>
          </div>
          <div class="form-group">
            <ElButton
              type="danger"
              color="#fd2f2f"
              round
              :loading="isLoading"
              @click="onSearch"
            >
              {{ $t('button_search') }}
            </ElButton>
          </div>
        </div>

        <TCTable :data="records" :columns="columnsProps" height="516" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@entrance/ncz-web-pgpc/components/MemberCenter/components/BetHistory/BetHistory.scss' as *;

.form-group .el-button {
  min-width: 98px;
}

// 微調 table, 以符合競品
:deep(.el-table) {
  margin-top: -1px;
  font-size: 12px;
  .el-table__cell { padding: 2px; }
  .cell { padding: 0 3px; }
}

:deep() {
  // .rgBall {
  //   width: 0.66667rem;
  //   height: 0.66667rem;
  //   display: inline-block;
  //   object-fit: cover;
  //   margin: 0;
  // }
  .bigClass {
    border-color: #fccc52;
    color: #fccc52;
  }
  .small {
    border-color: #7aafff;
    color: #7aafff;
  }
  .rg_red { color: #fb4e4e; }
  .rg_green { color: #49ce9b; }
  .rg_green_violet {
    background-image: linear-gradient(to bottom right, #40ad72 50%, #eb43dd 0);
    background-clip: text;
    color: transparent;
  }
  .rg_red_violet {
    background: linear-gradient(to bottom right, #fb4e4e 50%, #b658fe 0);
    background-clip: text;
    color: transparent;
  }
}

</style>
