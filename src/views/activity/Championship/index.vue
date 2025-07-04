<template>
  <div class="championship">
    <van-sticky>
      <NavBar :title="$t('cpsTip1')" left-arrow @click-left="() => router.back()" />
      <div class="tabs">
        <div
          v-for="item in tabList"
          :key="item.key"
          :class="{ active: pageQuery.state == item.key }"
          @click="onSwitch(item.key)"
        >
          {{ item.title }}
        </div>
      </div>
    </van-sticky>
    <List
      ref="listRef"
      v-model:list="list"
      v-model:page-query="pageQuery"
      :api="getChampionTaskList"
      :distance="100"
      :is-auto-load="true"
      @list-change="listChange"
    >
      <template #content>
        <div v-for="item in list" :key="item.id">
          <Card
            v-model:is-refresh="isRefresh"
            :item-d="item"
            :state="item.state"
            @click="onDetail(item.id)"
          />
          <div
            v-if="[1].includes(item.state)"
            class="btn"
            :class="{ active: !item.isJoin }"
            @click="joinChampionTaskV(item)"
          >
            {{ item.isJoin ? $t('cpsTip8') : $t('cpsTip9') }}
          </div>
        </div>
      </template>
    </List>
    <Dialog
      v-model:show="ifShow"
      :show-cancel-btn="false"
      :show-close-icon="true"
      :click-out-side="true"
      @confirm="() => (ifShow = false)"
    >
      <template #content>
        <h1>{{ failTxt }}</h1>
      </template>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import Card from '@/components/Activity/Championship/card.vue'
import { useChampionship } from '@/hooks'
import { reactive, ref, watch } from 'vue'
import List from '@/components/common/ListSimply.vue'
import Dialog from '@/components/common/Dialog.vue'
import { getChampionTaskList, joinChampionTask } from '@/api'
import { fixMsg } from '@/utils'
import { showSuccessToast } from 'vant'
import { useI18n } from 'vue-i18n'

const { tabList, serviceNowTime, type } = useChampionship()
const { t } = useI18n()
const router = useRouter()
const pageQuery = reactive<any>({
  state: 1,
})
const list = ref<any[]>([])
const listRef = ref()
const ifShow = ref(false)
const failTxt = ref('')
const isRefresh = ref(false)
watch(isRefresh, (val) => {
  if (isRefresh.value) {
    listRef.value?.resetRefresh()
  }
})

function onDetail (championId: number) {
  router.push({ name: 'Championship-ChampionshipDetail', query: { championId } })
}
function onSwitch (index: number) {
  pageQuery.state = index
  listRef.value?.resetRefresh()
}
function listChange (res: any) {
  serviceNowTime.value = res.serviceNowTime
}

// 参加锦标赛
const timer = ref(null)
const joinChampionTaskV = async (item: any) => {
  timer.value && clearTimeout(timer.value)
  timer.value = setTimeout(async () => {
    if (item.isJoin) return
    const res = await AwaitApiResultW(joinChampionTask({ championId: item.id }))
    if (res) {
      if (res.code == 0) {
        showSuccessToast(t('success'))
        listRef.value?.resetRefresh()
      } else {
        if ([803, 804, 805].includes(res.msgCode) && res.data != null) {
          ifShow.value = true
          switch (res.msgCode) {
            case 803:
              failTxt.value = t('cpsTip25', [res.data])
              break
            case 804:
              failTxt.value = t('cpsTip26', [res.data])
              break
            case 805:
              failTxt.value = t('cpsTip27', [type[res.data]])
              break
            default:
              failTxt.value = t(`code${res.msgCode}`)
          }
        }
      }
    }
  }, 100) as any
}

const AwaitApiResultW = async <T = any>(promise: Promise<any>): Promise<T | null> => {
  const result: IRes | any = await promise
    .then((res: IRes) => {
      if (res && res.code !== 0) {
        if ([803, 804, 805].includes(res.msgCode)) {
          return res
        }
        fixMsg(res)
        return null
      }
      return res
    })
    .catch((error) => {
      fixMsg(error)
      return null
    })
  return result
}
</script>
<style lang="scss" scoped>
.championship {
  padding: 20px 0;

  .tabs {
    background: var(--light-main-color, var(--bg_color_L3));
    display: flex;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      min-height: 120px;
      color: var(--text_color_L2);
      font-size: 30px;
      width: calc(100% / 3);

      &.active {
        font-weight: 900;
        position: relative;
        color: var(--text_color_L1);

        &::after {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          display: block;
          content: '';
          width: 0;
          height: 0;
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
          border-bottom: 18px solid var(--text_color_L1);
        }
      }
    }
  }

  .item {
    margin: 20px;
    min-height: auto;
  }

  .btn {
    margin: 20px;
    font-size: 30px;
    color: var(--text_color_L2);
    font-weight: 700;
    letter-spacing: 1.2px;
    background: var(--button_dis_color);
    text-align: center;
    border-radius: 50px;
    padding: 15px 0;
    &.active {
      color: var(--text_color_L4);
      background: var(--main_gradient-color);
    }
  }
}
</style>
