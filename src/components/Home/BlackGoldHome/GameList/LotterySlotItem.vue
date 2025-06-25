<template>
  <div class="lottery_container">
    <div class="lottery_container-tab">
      <ul class="lottery_container-tab-wrap">
        <li :class="{ active: 'all' === categoryCode }" @click="categoryCode = 'All'">
          {{ $t('all') }}
        </li>
        <li
          v-for="item in gameList"
          :class="{ active: item.categoryCode === categoryCode }"
          @click="categoryCode = item.categoryCode"
        >
          {{ formatString(item.categoryCode) }}
        </li>
      </ul>
    </div>
    <div class="lottery_container-list">
      <div
        v-for="item in list[categoryCode]"
        :key="item.id"
        class="lotterySlotItem"
        @click="isAlowGame(item, onItemClick)"
      >
        <div class="lotterySlotItem_img">
          <img v-lazy="image[item.icon]">
        </div>
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { computed, onMounted, reactive, ref } from 'vue'
import { useHome } from '@/hooks'
import { AwaitApiResult, getIconsPublic } from '@/utils'
import { getLotteryGameTypeList } from '@/api'
const { t } = useI18n()

const { isAlowGame } = useHome()

const router = useRouter()
const props = withDefaults(
  defineProps<{
    gameData: {
      gameList: any[]
      isShow: boolean
      title: string
      img: string
      gameType: string
    }
    isAll: boolean
  }>(),
  {}
)
const gameList = computed(() => props.gameData.gameList.filter((item) => item.state === 1))
function flattenDeep (arr: any[]): any[] {
  return arr.reduce((acc, val) => {
    return Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val)
  }, [])
}

/**
 * @description: 过滤彩票游戏名字
 * @param {*} string
 * @return {*}
 */
const formatString = (string: string) => {
  if (string) {
    let newStr = string
    switch (newStr) {
      case 'Trx Win Go':
        newStr = 'Trx Win'
        break
      case 'FXOSO':
        newStr = t('FXOSO')
      default:
        newStr = newStr
    }
    return newStr
  }
  return ''
}
const image = computed(() => {
  const map: any = {}
  props.gameData.gameList.forEach((item) => {
    map[item.categoryCode] = item.categoryImg
  })
  return map
})
const categoryCode = ref('All')

const list = reactive<any>({
  All: [],
  XOSO: [],
  'Win Go': [
    {
      typeId: 30,
      class: 'wingo',
      title: 'Win Go 30s',
      path: 'WinGo',
      icon: 'Win Go',
    },
    {
      typeId: 1,
      class: 'wingo',
      title: 'Win Go 1Min',
      path: 'WinGo',
      icon: 'Win Go',
    },
    {
      typeId: 2,
      class: 'wingo',
      title: 'Win Go 3Min',
      path: 'WinGo',
      icon: 'Win Go',
    },
    {
      typeId: 3,
      class: 'wingo',
      title: 'Win Go 5Min',
      path: 'WinGo',
      icon: 'Win Go',
    },
    {
      typeId: 4,
      class: 'wingo',
      title: 'Win Go 10Min',
      path: 'WinGo',
      icon: 'Win Go',
    },
  ],
  '5D': [
    {
      typeId: 5,
      class: 'd5',
      title: '5D 1Min',
      path: '5D',
      icon: '5D',
    },
    {
      typeId: 6,
      class: 'd5',
      title: '5D 3Min',
      path: '5D',
      icon: '5D',
    },
    {
      typeId: 7,
      class: 'd5',
      title: '5D 5Min',
      path: '5D',
      icon: '5D',
    },
    {
      typeId: 8,
      class: 'd5',
      title: '5D 10Min',
      path: '5D',
      icon: '5D',
    },
  ],
  K3: [
    {
      typeId: 9,
      class: 'k3',
      title: 'K3 1Min',
      path: 'K3',
      icon: 'K3',
    },
    {
      typeId: 10,
      class: 'k3',
      title: 'K3 3Min',
      path: 'K3',
      icon: 'K3',
    },
    {
      typeId: 11,
      class: 'k3',
      title: 'K3 5Min',
      path: 'K3',
      icon: 'K3',
    },
    {
      typeId: 12,
      class: 'k3',
      title: 'K3 10Min',
      path: 'K3',
      icon: 'K3',
    },
  ],
  'Trx Win Go': [
    {
      typeId: 13,
      class: 'trx',
      title: 'Trx Win Go 1Min',
      path: 'WinTrx',
      icon: 'Trx Win Go',
    },
    {
      typeId: 14,
      class: 'trx',
      title: 'Trx Win Go 3Min',
      path: 'WinTrx',
      icon: 'Trx Win Go',
    },
    {
      typeId: 15,
      class: 'trx',
      title: 'Trx Win Go 5Min',
      path: 'WinTrx',
      icon: 'Trx Win Go',
    },
    {
      typeId: 16,
      class: 'trx',
      title: 'Trx Win Go 10Min',
      path: 'WinTrx',
      icon: 'Trx Win Go',
    },
  ],
})

const lotteryRoutes = [
  {
    value: 1,
    path: 'WinGo',
  },
  {
    value: 3,
    path: '5D',
  },
  {
    value: 2,
    path: 'K3',
  },
  {
    value: 4,
    path: 'WinTrx',
  },
  {
    value: 5,
    path: 'XoSo',
  },
  {
    value: 6,
    path: 'XoSo',
  },
  {
    value: 7,
    path: 'Binguo',
  },
  {
    value: 8,
    path: '4D',
  },
]

/**
 * @description: 点击前往游戏页面
 * @return {*}
 */
const onItemClick = (item: any) => {
  router.push({
    name: 'AllLotteryGames-' + item.path,
    query: {
      typeId: item.typeId,
      id: item.id,
    },
  })
  // console.log('游戏', lotteryRoutes)
}

const getWingo = async () => {
  // const result = await AwaitApiResult(winGoGetTypeList())
  const res = await AwaitApiResult(getLotteryGameTypeList())
  const wingo = res.data.winGo || []
  const k3 = res.data.k3 || []
  const trx = res.data.trxWinGo || []
  const d5 = res.data.fiveD || []

  for (let i = list['Win Go'].length - 1; i >= 0; i--) {
    const item = list['Win Go'][i]
    const el = wingo.find((x: any) => item.typeId === x.typeID)
    if (!el) {
      list['Win Go'].splice(i, 1)
    }
  }

  for (let i = list.K3.length - 1; i >= 0; i--) {
    const item = list.K3[i]
    const el = k3.find((x: any) => item.typeId === x.typeID)
    if (!el) {
      list.K3.splice(i, 1)
    }
  }

  for (let i = list['Trx Win Go'].length - 1; i >= 0; i--) {
    const item = list['Trx Win Go'][i]
    const el = trx.find((x: any) => item.typeId === x.typeID)
    if (!el) {
      list['Trx Win Go'].splice(i, 1)
    }
  }

  for (let i = list['5D'].length - 1; i >= 0; i--) {
    const item = list['5D'][i]
    const el = d5.find((x: any) => item.typeId === x.typeID)
    if (!el) {
      list['5D'].splice(i, 1)
    }
  }

  const flattened = flattenDeep(Object.values(list))
  list.All = flattened
}
onMounted(() => {
  getWingo()
})
</script>

<style lang="scss" scoped>
.lottery_container {
  &-tab {
    background: #3a3a3a;
    color: #a6a9ae;
    overflow-x: auto;
    width: 702px;
    &-wrap {
      width: 100%;
      font-size: 0;
      white-space: nowrap;
    }
    li {
      display: inline-block;
      width: 150px;
      font-weight: 500;
      line-height: 70px;
      font-size: 24px;
      text-align: center;
      border-radius: 8px;
      &.active {
        color: #8f5206;
        background: linear-gradient(180deg, #f6e3a3 0%, #d2a753 100%);
      }
    }
  }
  &-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-top: 15px;
  }
  .lotterySlotItem {
    position: relative;
    width: 222px;
    height: 300px;
    text-align: end;
    background: #3a3a3a;
    border-radius: 20px;
    &_img {
      width: 220px;
      height: 300px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    span {
      margin-top: 10px;
      display: block;
      color: #ffee6a;
      white-space: break-spaces;
      font-weight: 700;
      font-size: 24px;
      text-align: center;
      position: absolute;
      bottom: 10px;
      width: 100%;
    }
  }
}
</style>
