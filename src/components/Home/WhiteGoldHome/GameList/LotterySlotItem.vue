<template>
  <div class="lottery_container">
    <div
      v-for="item in list[currentLottery]"
      :key="item.typeId"
      class="lotterySlotItem"
      :class="item.class"
      @click="isAlowGame(item, onItemClick)"
    >
      <img :src="getIconsPublic('home/lottery', `${item.class}${item.typeId}`)" alt="">
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { AwaitApiResult, getIconsPublic } from '@/utils'
import { useHome } from '@/hooks'
import { getLotteryGameTypeList } from '@/api'

const { isAlowGame } = useHome()
const router = useRouter()
const props = withDefaults(
  defineProps<{
    currentLottery: string
  }>(),
  {}
)
function flattenDeep (arr: any[]): any[] {
  return arr.reduce((acc, val) => {
    return Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val)
  }, [])
}
const wingo30 = import.meta.env.VITE_WINGO
const list = reactive<any>({
  All: [],
  XOSO: [],
  'Win Go': [
    {
      typeId: 30,
      class: 'wingo',
      title: 'Win Go 30s',
      path: 'WinGo',
    },
    {
      typeId: 1,
      class: 'wingo',
      title: 'Win Go 1Min',
      path: 'WinGo',
    },
    {
      typeId: 2,
      class: 'wingo',
      title: 'Win Go 3Min',
      path: 'WinGo',
    },
    {
      typeId: 3,
      class: 'wingo',
      title: 'Win Go 5Min',
      path: 'WinGo',
    },
    {
      typeId: 4,
      class: 'wingo',
      title: 'Win Go 10Min',
      path: 'WinGo',
    },
  ],
  '5D': [
    {
      typeId: 5,
      class: 'd5',
      title: '5D 1Min',
      path: '5D',
    },
    {
      typeId: 6,
      class: 'd5',
      title: '5D 3Min',
      path: '5D',
    },
    {
      typeId: 7,
      class: 'd5',
      title: '5D 5Min',
      path: '5D',
    },
    {
      typeId: 8,
      class: 'd5',
      title: '5D 10Min',
      path: '5D',
    },
  ],
  K3: [
    {
      typeId: 9,
      class: 'k3',
      title: 'K3 1Min',
      path: 'K3',
    },
    {
      typeId: 10,
      class: 'k3',
      title: 'K3 3Min',
      path: 'K3',
    },
    {
      typeId: 11,
      class: 'k3',
      title: 'K3 5Min',
      path: 'K3',
    },
    {
      typeId: 12,
      class: 'k3',
      title: 'K3 10Min',
      path: 'K3',
    },
  ],
  'Trx Win Go': [
    {
      typeId: 13,
      class: 'trx',
      title: 'Trx Win Go 1Min',
      path: 'WinTrx',
    },
    {
      typeId: 14,
      class: 'trx',
      title: 'Trx Win Go 3Min',
      path: 'WinTrx',
    },
    {
      typeId: 15,
      class: 'trx',
      title: 'Trx Win Go 5Min',
      path: 'WinTrx',
    },
    {
      typeId: 16,
      class: 'trx',
      title: 'Trx Win Go 10Min',
      path: 'WinTrx',
    },
  ],
})

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

onMounted(async () => {
  await getWingo()
})
</script>

<style lang="scss" scoped>
.lottery_container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  .lotterySlotItem {
    width: 218px;
    height: 218px;
    border-radius: 30px;
    text-align: center;
    position: relative;
    background: linear-gradient(90deg, #ffc59a 0%, #ff8580 100%);
    div {
      position: absolute;
      bottom: 15px;
      left: 0;
      width: 100%;
      text-align: center;
      color: #171717;
      text-align: center;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: 1.42px;
      html:lang(ar) & {
        left: unset;
        right: 0;
      }
    }
    img {
      width: 172px;
      height: 172px;
    }
  }
  //.wingo {
  //	background-image: url('@/assets/icons/home/icons/wingo.png');
  //}
  //.k3 {
  //	background-image: url('@/assets/icons/home/icons/k3.png') ;
  //}
  //.d5 {
  //	background-image: url('@/assets/icons/home/icons/5d.png');
  //}
  //.trx {
  //	background-image: url('@/assets/icons/home/icons/trx.png');
  //}
}
</style>
