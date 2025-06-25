<!--
 * @Author: Seven
 * @Date: 2023-04-18 09:28:41
 * @LastEditTime: 2024-03-23 16:07:58
 * @LastEditors: Seven
 * @Description: 单独游戏展示
-->
<template>
  <div class="aloneGame">
    <div class="header">
      <div v-if="isShowTitle" class="title">
        <img :src="getIconsPublic('electronic', gameType)" alt="" class="icons">
        {{ title }}
        <div v-if="gameType !== 'bigaward'" @click="handleGoAll">
          <span class="all">ALL</span>
          <span class="len">{{ gameList.length }}</span>
        </div>
      </div>
      <div v-if="isShowBtn" class="right_btn">
        <van-icon name="arrow-left" :class="{ active: swipeIndex == 0 }" @click="handleOffset('left')" />
        <van-icon name="arrow" :class="{ active: swipeIndex === getGameList.length - 1 }" @click="handleOffset('right')" />
        <!--				<img :src="getIcons('home', 'arrow_left')" alt=""  />-->
        <!--				<img :src="getIcons('home', 'arrow_right')" alt=""  />-->
      </div>
    </div>
    <div v-if="gameType === 'flash'" class="flash_desc">{{ $t('flashDesc', [store.getProjectName]) }}</div>
    <div v-if="gameType === 'bigaward'" class="flash_desc awar_desc">
      {{ $t('awarDesc1') }}<br>
      {{ $t('awarDesc2') }} <span class="amount">{{ currency(getBigAward) }}</span>
    </div>
    <Swipe
      ref="swipeRef"
      class="my-swipe"
      :autoplay="gameType !== 'flash' ? '-' : 9000"
      :lazy-render="false"
      :show-indicators="false"
      @change="swipeChange"
    >
      <SwipeItem
        v-for="(item, x) in getGameList"
        :key="gameType + x"
        :class="{
          isShowAll: isAll,
          gys: gameType === 'slot' && isAll && currentMenuType === 0
        }"
      >
        <GameItem
          v-for="(suc, index) in item"
          :key="getKeys(suc, index)"
          class="item_two"
          :game-type="gameType"
          :game-item="suc"
          :type="getType"
          :is-width="isAll"
        />
      </SwipeItem>
    </Swipe>
    <div v-if="isShowMore && gameList.length > 9" class="look_all" @click="handleGoAll">{{ t('viewAll') }}</div>
    <div v-if="gameType === 'bigaward'" class="look_all look_awar" @click="handleGoAwar">{{ $t('lookBigAward') }}</div>
    <div v-if="gameType === 'lottery'" class="ChangLong" @click="changlongEnter" />
  </div>
</template>
<script setup lang="ts">
import { currency, getIconsPublic } from '@/utils'
import GameItem from '../GameItem/index.vue'
import { computed, ref } from 'vue'
import { useEventBus } from '@/components/common/use'
import { Swipe, SwipeItem, type SwipeInstance } from 'vant'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { SettingStore } from '@/stores'
import { useHome } from '@/hooks'
const { homeState, isAlowGame } = useHome()

const { t } = useI18n()

const eventBus = useEventBus()
const router = useRouter()
const emit = defineEmits(['goAll'])
const swipeRef = ref<SwipeInstance>()
const store = SettingStore()
const gameData = computed<any>(() => homeState.allGameList)
// 定义组件props
interface Props {
  title: string // 标题
  isAll?: boolean // 是否展示全部游戏
  gameType: string // 游戏类型
  gameList: FishingAndMiniGameAndHot[] | OtherGame[] | Lottery[] // 游戏列表
  isShowMore?: boolean // 是否展示查看全部按钮
  currentMenuType?: number // 当前游戏类型
  isShowBtn?: boolean // 是否展点击切换示按钮
  isShowTitle?: boolean // 是否展示标题
}

// 电子类游戏
type FishingAndMiniGameAndHot = {
  vendorId: string // 供应商ID
  gameCode?: string // 游戏代码
  imgUrl?: string // 图片URL
  img?: string // 图片
  gameID?: string // 游戏ID
  gameNameEn?: string // 游戏英文名
}

// 三方的游戏
type OtherGame = {
  slotsTypeID: number // 游戏类型ID
  slotsName: string // 游戏类型名称
}

// 游戏类型为Lottery的游戏
type Lottery = {
  name: string // 游戏名称
  value: boolean // 布尔值
}

const props = withDefaults(defineProps<Props>(), {
  isAll: false,
  isShowMore: false,
  isShowBtn: false,
  isShowTitle: true,
})

/**
 * @description: 获取key
 * @param {*} item
 * @param {*} index
 * @return {*}
 */
const getKeys = (item: FishingAndMiniGameAndHot | OtherGame | Lottery, index: number) => {
  switch (props.gameType) {
    case 'lottery':
      return (item as Lottery).name + '' + index
    case 'all':
    case 'clicksTopList':
    case 'platformList':
    case 'fish':
    case 'flash':
      return (item as FishingAndMiniGameAndHot).vendorId + '' + index
    default:
      return (item as OtherGame).slotsTypeID + '' + index
  }
}

const getBigAward = computed(() => {
  return store.getJackportMaxReswadAmount
})

// const swipeWidth = computed(() => {
// 	let deviceWidth = document.getElementById('game_content')
// 		? (document.getElementById('game_content') as Element).clientWidth
// 		: 0
// 	console.log(getUserAgent())
// 	return deviceWidth
// })

/**
 * @description: 获取类型
 * @param {*} computed
 * @return {*}
 */
const getType = computed(() => {
  const gameType = props.gameType
  if (
    gameType === 'flash' ||
    gameType === 'slot' ||
    gameType === 'fish' ||
    gameType === 'clicksTopList' ||
    gameType === 'platformList'
  ) {
    return '1'
  } else {
    return '2'
  }
})

// 实现将数组内的数据按照个数分割成多个数组
const chunk = (arr: any[], size: number) => {
  const result = []
  for (let x = 0; x < Math.ceil(arr.length / size); x++) {
    const start = x * size
    const end = start + size
    result.push(arr.slice(start, end))
  }
  return result
}

/**
 * @description: 获取游戏列表，根据游戏类型不同当前选取的菜单，分割成不同的数量数组
 * @param {*} computed
 * @return {*}
 */
const getGameList = computed(() => {
  if (props.isAll) {
    return chunk(props.gameList, props.gameList.length)
  }
  // 如果当前是选择全部，并且是热门游戏，计算出热门游戏的数组，如果大于15个，只取前15个，否则全部取出，然后分割成9个一组
  if (props.currentMenuType === 0 && (props.gameType === 'clicksTopList' || props.gameType === 'platformList')) {
    const gameList = props.gameList
    if (gameList.length > 6) {
      return chunk(gameList, 6)
    } else {
      return chunk(props.gameList, gameList.length)
    }
  } else if (props.currentMenuType === 0 && props.gameType === 'slot') {
    return chunk(props.gameList, props.gameList.length)
  }
  if (props.currentMenuType === 0 && props.gameType === 'bigaward') {
    return chunk(props.gameList.slice(0, 6), 6)
  } else {
    return chunk(props.gameList, 3)
  }
})

/**
 * @description: 左右滚动游戏
 * @param {*} type
 * @return {*}
 */
const handleOffset = (type: string): void => {
  if (type === 'left') {
    swipeRef.value?.prev()
  } else {
    swipeRef.value?.next()
  }
}

const handleGoAwar = () => {
  router.push({
    path: '/main/SuperJackpot',
  })
}
const swipeIndex = ref(0)
const swipeChange = (index: number) => {
  console.log(index)
  swipeIndex.value = index
}

// /**
//  * @description: 动态获取swipe的高度
//  * @param {*} computed
//  * @return {*}
//  */
// const swipeHeight = computed(() => {
// 	if (props.gameType === 'clicksTopList' || props.gameType === 'platformList') {
// 		return 'auto'
// 	} else if (props.gameType === 'slot') {
// 		return 660 / 2 + 'px'
// 	}
// })

// 跳转入口页面
const changlongEnter = async () => {
  isAlowGame('', () => {
    router.push({ name: 'AllLotteryGames-ChangLong' })
  })
}
const handleGoAll = () => {
  eventBus.emit('changeKeepAliveKey')
  if (props.gameType === 'clicksTopList' || props.gameType === 'platformList') {
    emit('goAll', 'popular')
    return
  }
  emit('goAll', props.gameType)
}
</script>
<style lang="scss" scoped>
.aloneGame {
  width: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .title {
      font-size: 30px;
      color: var(--text_color_L1);
      display: flex;
      align-items: center;
      .icons {
        width: 42px;
        height: 42px;
        margin-right: 14px;
      }
      div {
        display: inline-block;
        width: 130px;
        height: 48px;
        background-color: var(--bg_color_L2);
        border-radius: 8px;
        font-size: 26px;
        line-height: 48px;
        cursor: pointer;
        margin-left: 10px;
        .all {
          color: var(--text_color_L3);
          margin-left: 20px;
        }
        .len {
          color: var(--text_color_L1);
          margin-left: 20px;
        }
      }
    }
    .right_btn {
      display: flex;
      align-items: center;
      i {
        width: 48px;
        height: 48px;
        margin-left: 10px;
        background: var(--main_gradient-color);
        color: var(--textW);
        font-size: 32px;
        border-radius: 8px;
        text-align: center;
        line-height: 48px;
        &.active {
          opacity: 0.5;
        }
      }
    }
  }
  .flash_desc {
    font-size: 24px;
    color: var(--text_color_L1);
  }
  .awar_desc {
    .amount {
      color: #fecc21;
    }
  }
  .three_item {
    width: 100%;
    height: 288px;
    overflow-x: hidden;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    position: relative;
    .contents {
      height: 218px;
      display: -webkit-box;
      white-space: nowrap;
      padding: 0;
      position: absolute;
      left: 0;
      top: 0;
      html:lang(ar) & {
        left: unset;
        right: 0;
      }
      .item {
        margin-right: 18px;
        display: inline-block;
      }
      // .item:nth-child(3n) {
      // 	margin-right: 0;
      // }
    }
  }
  .three_item3 {
    height: 218px;
    .contents3 {
      height: 218px;
    }
  }
  .three_item22 {
    height: 218px;
  }
  /* 隐藏滚动条 */
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent;
  }
  .all_item {
    .item_one {
      margin-bottom: 18px;
    }
    .item_two {
      margin: 0 auto 18px;
      display: flex;
      justify-content: center;
    }
  }
  .look_all {
    margin: 48px auto 48px;
    width: 288px;
    height: 60px;
    background: var(--main_gradient-color);
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    border-radius: 30px;
    font-size: 24px;
    font-weight: 500;
    color: #fff;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
  }
  .look_awar {
    margin: 48px auto 48px;
    height: 48px;
    line-height: 48px;
  }
}
.my-swipe {
  margin-top: 30px;
  margin-bottom: 30px;
}
.my-swipe .van-swipe-item {
  width: 100%;
  // height: v-bind(swipeHeight);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  height: 100%;
  // justify-items: center;
  .item_one {
    height: 100%;
    margin-bottom: 18px;
  }
  .item_two {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
}
.my-swipe .isShowAll {
  height: auto;
}
.my-swipe .gys {
  grid-template-columns: repeat(2, 1fr);
  border-radius: none;
}
.ChangLong {
  width: 100%;
  height: 160px;
  background: url('@/assets/icons/home/changlong_bg.png') no-repeat center center;
  background-size: contain;
  position: relative;
  padding-top: 18px;
  margin-bottom: 40px;
  cursor: pointer;
  .box {
    height: 90px;
    background: url('@/assets/icons/home/changlong_icon.png') no-repeat left center;
    background-size: 90px 90px;
    padding-left: 102px;
    color: var(--textW);
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    div:first-child {
      font-size: 24px;
      margin-bottom: 5px;
      padding-top: 12px;
    }
    div:nth-child(2) {
      font-size: 18px;
      width: 260px;
    }
  }
}
</style>
