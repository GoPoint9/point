<template>
  <div
    v-if="['1', '2'].includes(type) && gameType !== 'bigaward'"
    class="gameItem1"
    :class="{ elec: gameType === 'slot' }"
    @click.stop="handleClickGame(gameItem)"
  >
    <div
      v-if="gameType === 'slot'"
      class="slot_bg"
      :style="{
        backgroundImage: `url(${getGameItem1})`
      }"
    />
    <img v-else v-lazy="getGameItem1">
    <div v-if="['clicksTopList', 'platformList'].includes(gameType) && store.isShowHotGameWinOdds" class="win-odds">
      <span>{{ $t('winOdds') }}</span>
      <span>{{ gameItem.winOdds }}%</span>
      <div class="win-p" :style="{ width: `${Math.min(gameItem.winOdds, 100)}%` }" />
    </div>
  </div>

  <div v-else class="gameImte2" @click.stop="handleClickGame">
    <div v-if="gameType === 'bigaward'" class="big_prize">
      <div
        class="bg"
        :style="{
          backgroundImage: `url(${(gameItem as Award).imgUrl})`
        }"
      />
      <div class="info">
        <div class="text">
          <div class="title">{{ (gameItem as Award).gameName }}</div>
          <div class="award">{{ currency((gameItem as Award).bonusAmount) }}</div>
          <div />
        </div>
        <div class="multiple">{{ (gameItem as Award).multiple }}X</div>
      </div>
    </div>

    <div
      v-else
      class="other_style"
      :style="{
        backgroundImage: gameItme2Bg
      }"
    >
      <div>{{ gameTypeTitle[gameType] }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import { getIcons, getUserAgent, currency } from '@/utils'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { GlobalStore, SettingStore } from '@/stores'
import { useHome } from '@/hooks'
const { t } = useI18n()
const { homeState, onItemClick, isAlowGame } = useHome()

interface Props {
  type: string // '2' 彩票、体育、棋牌、真人 '1' 电子、捕鱼、小游戏、热门
  gameItem: GameItem1 | GameItem2 | Lottery | Award
  gameType: string
  isWidth: boolean
  isElec?: boolean
}

interface GameItem1 {
  vendorId: string
  gameCode?: string
  imgUrl?: string
  img?: string
  gameID?: string
  gameNameEn?: string
  vendorImg?: string
  categoryImg?: string
}

interface GameItem2 {
  slotsTypeID: number
  slotsName: string
  vendorImg: string
}

interface Lottery {
  id: number
  categoryCode: string
  categoryName: string
  state: number
  sort: number
  categoryImg: string
}
interface Award {
  orderId: number
  userId: number
  userPhoto: string
  userName: string
  gameName: string
  imgUrl: string
  multiple: number
  bonusAmount: number
  multipleName: string
  createTime: string
}

const props = withDefaults(defineProps<Props>(), {
  isWidth: false,
  isElec: false,
})
const store = SettingStore()

const gameTypeTitle = {
  sport: t('sport'),
  video: t('live'),
  chess: t('chess'),
} as any

/**
 * @description: 计算游戏背景图高度
 * @param {*} computed
 * @return {*}
 */
const bgHidth = computed(() => {
  const isPc = getUserAgent() === 0
  if (props.isWidth) {
    return (isPc ? 248 / 2 : 218 / 2) + 'px'
  }
  return '100%'
})

const getGameItem1 = computed(() => {
  const gameItem = props.gameItem as GameItem1
  const url = gameItem.imgUrl || gameItem.img || gameItem.vendorImg || gameItem.categoryImg
  return url
})

/**
 * @description: 获取游戏背景图
 * @param {*} computed
 * @return {*}
 */
const gameItme2Bg = computed(() => {
  if (props.gameType === 'lottery') {
    const item = props.gameItem as Lottery
    const url = item.categoryImg
    return `url(${url})`
  }
  const item = props.gameItem as GameItem2
  const url = item.vendorImg
  return `url(${url})`
})

/**
 * @description: 点击游戏
 * @return {*}
 */
const handleClickGame = (item: any) => {
  const globalStore = GlobalStore()
  if (!globalStore.token) {
    router.push({ name: 'login' })
    return
  }
  if (props.type === '1') {
    if (!['slot'].includes(props.gameType)) {
      onItemClick(item)
    } else {
      if (props.isElec) {
        onItemClick(item)
        return
      }
      sessionStorage.setItem('slotGamesList', JSON.stringify(homeState.allGameList?.slot))
      sessionStorage.setItem('gameType', JSON.stringify('slot'))
      sessionStorage.setItem('clickedItem', JSON.stringify(props.gameItem))
      router.push({
        name: 'AllOnlineGames',
      })
    }
  } else {
    if (props.gameType === 'lottery') {
      // 进入彩票全部
      // const lotteryRoutes = ['WinGo', '5D', 'K3', 'WinTrx']
      isAlowGame(item, goLetteryRoute)
    }
    // 真人 体育直接进游戏
    if (props.gameType === 'video' || props.gameType === 'sport') {
      onItemClick(item)
    }
    if (props.gameType === 'chess') {
      if (props.isElec) {
        onItemClick(item)
        return
      }
      sessionStorage.setItem('slotGamesList', JSON.stringify(homeState.allGameList?.chess))
      sessionStorage.setItem('gameType', JSON.stringify('chess'))
      sessionStorage.setItem('clickedItem', JSON.stringify(props.gameItem))
      router.push({
        name: 'AllOnlineGames',
      })
    }
  }
}

/**
 * @description: 点击前往游戏页面
 * @return {*}
 */
const goLetteryRoute = (item: any) => {
  router.push({
    name: 'AllLotteryGames-' + lotteryRoutes[lotteryRoutes.findIndex((v) => v.value === item.id)].path,
    query: { id: item.id },
  })
  console.log('游戏', lotteryRoutes)
}

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
 * @description: 过滤彩票游戏名字
 * @param {*} string
 * @return {*}
 */
const formatString = (str: string, isRoute?: boolean) => {
  if (str) {
    let newStr = str
    switch (str) {
      case '5D':
        if (isRoute) return '5D'
        newStr = newStr.toLocaleUpperCase() + ''
        break
      case 'K3':
        if (isRoute) return 'K3'
        break
      case 'Trx Win Go':
        if (isRoute) return 'WinTrx'
        newStr = 'Trx Hash'
        break
      case 'XOSO':
      case 'FXOSO':
        if (isRoute) return 'XoSo'
        newStr = 'XoSo'
        break
      case 'Bingo18':
        if (isRoute) return 'Binguo'
        newStr = 'Binguo'
        break
      case '4D':
        if (isRoute) return '4D'
        newStr = '4D'
        break
      default:
        if (isRoute) return 'WinGo'
        newStr = newStr
    }
    return newStr
  }
  return ''
}
</script>
<style lang="scss" scoped>
.gameItem1 {
  width: 218px;
  height: 294px;
  border-radius: 12px;
  display: inline-block;
  img {
    width: 218px;
    height: 294px;
    border-radius: 12px;
  }
  .win-odds {
    display: flex;
    height: 36px;
    background: rgba(var(--main-color-rgb), 0.9);
    color: var(--text_color_L1);
    width: 100%;
    border-radius: 10px;
    font-size: 22px;
    overflow: hidden;
    margin-top: 6px;
    margin-bottom: 10px;
    position: relative;
    .win-p {
      position: absolute;
      left: 0;
      height: 100%;
      top: 0;
      background-color: var(--main-color);
      html:lang(ar) & {
        left: unset;
        right: 0;
      }
    }
    span {
      position: relative;
      z-index: 1;
      display: block;
      height: 100%;
      flex: 1;
      line-height: 40px;
      &:first-child {
        padding-left: 10px;
      }
      &:last-child {
        text-align: right;
        padding-right: 10px;
      }
    }
  }
}
.elec {
  height: 294px;
  img {
    height: 294px;
  }
}
.slot_bg {
  width: 340px;
  height: 108px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #151c26;
  border-radius: 0;
}

.gameImte2 {
  width: 100%;
  .other_style,
  .lottery_style {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: #ffffff;
    white-space: break-spaces;
  }
  .other_style {
    width: 218px;
    height: 294px;
    img {
      width: 218px;
      height: 294px;
    }
    div {
      padding-top: 62px;
      text-align: center;
      font-size: 20px;
      color: #fff;
      font-weight: 400;
    }
  }

  .lottery_style {
    position: relative;
    width: 100%;
    height: v-bind(bgHidth);
    color: #fff;
    .tit {
      position: absolute;
      width: 152px;
      top: 24px;
      left: 24px;
      font-weight: bold;
      font-size: 28px;
      html:lang(ar) & {
        left: unset;
        right: 24px;
      }
    }
    .txt1,
    .txt2 {
      position: absolute;
      left: 24px;
      bottom: 52px;
      font-size: 18px;
      transform: scale(0.85);
      html:lang(ar) & {
        left: unset;
        right: 24px;
      }
    }
    .txt2 {
      left: 18px;
      bottom: 20px;
      html:lang(ar) & {
        left: unset;
        right: 18px;
      }
    }
  }
  .big_prize {
    width: 218px;
    height: 294px;
    position: relative;
    // box-shadow: 0px 3px 0px 1px #482BBF;
    border-radius: 24px;
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 218px;
      height: 294px;
      border-radius: 24px;
      background-repeat: no-repeat;
      background-size: 218px 294px;
      background-position: center;
      z-index: 1;
      html:lang(ar) & {
        left: unset;
        right: 0;
      }
    }
    .info {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 3;
      padding-top: 10px;
      .text {
        margin-left: 8px;
        .title {
          font-size: 22px;
          color: #fff;
        }
        .award {
          font-size: 26px;
          color: #fecc21;
        }
      }

      .multiple {
        position: relative;
        z-index: 3;
        color: #fff;
        padding: 6px 4px;
        border: 1px solid #fff;
        border-radius: 6px;
        font-size: 22px;
        margin-right: 8px;
      }
    }

    .bottom {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      bottom: 0;
      left: 0;
      height: 82px;
      z-index: 3;
      width: 100%;
      background: #141c26;
      html:lang(ar) & {
        left: unset;
        right: 0;
      }
      .foot {
        position: relative;
        color: #ffffff;
        font-weight: 500;
        font-size: 20px;
        text-align: center;
      }
      .amount {
        position: relative;
        color: #fecc21;
        font-size: 20px;
        text-align: center;
      }
    }
  }
  .big_prize::after {
    content: '';
    display: block;
    width: 218px;
    height: 84px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background: rgba(21, 28, 38, 0.5);
    html:lang(ar) & {
      left: unset;
      right: 0;
    }
  }
}
</style>
