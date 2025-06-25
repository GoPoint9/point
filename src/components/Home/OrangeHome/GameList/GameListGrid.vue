<template>
  <div class="gameListGrid__container" :class="{ all_container: isAll }">
    <van-skeleton v-if="currentGame === 'popular'" :loading="loading">
      <template #template>
        <div class="skeleton_hot">
          <div class="hot_tit" />
          <div class="hot_list">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
          <div class="hot_tit" />
          <div class="hot_list">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </template>
      <!-- 热门 -->
      <HotGameItem
        :platform-list="getPlatformList"
        :clicks-top-list="getClicksTopList"
        :is-all="isAll"
        @on-item-click="onItemClick"
      />
    </van-skeleton>

    <van-skeleton v-if="getType === 2" :loading="loading">
      <template #template>
        <div class="skeleton_other">
          <div />
          <div />
          <div />
          <div />
        </div>
      </template>
      <!-- 体育、棋牌、真人 -->
      <div class="otherGame">
        <OtherGameItem
          v-for="(item, index) in gameData[currentGame]"
          :key="index"
          :info="item"
          :game-type="currentGame"
          :is-all="isAll"
          @click="handleOpenGame(item, currentGame)"
        />
      </div>
    </van-skeleton>

    <van-skeleton v-if="getType === 4" :loading="loading">
      <template #template>
        <div class="skeleton_slot">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </template>
      <!-- 电子 -->
      <ElectronicWinRate v-if="!isAll" />
      <ElectronicItem :game-data="gameData[currentGame]" :is-all="isAll" @handle-open-game="handleOpenGame" />
    </van-skeleton>

    <van-skeleton v-if="getType === 3" :loading="loading">
      <template #template>
        <div class="skeleton_other">
          <div />
          <div />
          <div />
          <div />
        </div>
      </template>
      <!-- 彩票 -->
      <LotterySlotItem :game-list="gameData[currentGame]" :is-all="isAll" />
    </van-skeleton>

    <!-- 小游戏、捕鱼 -->
    <van-skeleton v-if="getType === 5" :loading="loading">
      <template #template>
        <div class="skeleton_flash">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </template>
      <OnlineGamesItem
        :game-data="gameData[currentGame]"
        :game-type="currentGame"
        :is-all="isAll"
        @on-item-click="onItemClick"
      />
    </van-skeleton>

    <button v-if="!isAll" class="look_all" @click="goAll">
      <img :src="getIcons('home', 'all')" alt="">
      {{ $t('viewAll') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import HotGameItem from './HotGameItem.vue'
import OnlineGamesItem from './OnlineGamesItem.vue'
import LotterySlotItem from './LotterySlotItem.vue'
import { getIcons } from '@/utils'
import OtherGameItem from './OtherGameItem.vue'
import ElectronicItem from './ElectronicItem.vue'
import ElectronicWinRate from './ElectronicWinRate.vue'
import { useHome } from '@/hooks'

const props = defineProps({
  currentGame: {
    type: String,
    default: '',
  },
  isAll: {
    type: Boolean,
    default: false,
  },
})
const router = useRouter()
const loading = ref(true)

const { onItemClick, getAllGame, homeState } = useHome()

const gameData = computed<any>(() => homeState.allGameList)

const getType = computed(() => {
  if (props.currentGame === 'popular') return 1
  const otherList = ['sport', 'chess', 'video']
  if (otherList.includes(props.currentGame as string)) return 2
  if (props.currentGame === 'lottery') return 3
  if (props.currentGame === 'slot') return 4
  if (props.currentGame === 'flash' || props.currentGame === 'fish') return 5
  return -1
})

const getGameList = async () => {
  await getAllGame()
  // 处理平台推荐和热门
  const game: any = gameData.value
  game.popular = [gameData.value?.popular.platformList, gameData.value?.popular.clicksTopList]
  sessionStorage.setItem('gameData', JSON.stringify(game))
  loading.value = false
}

const goAll = () => {
  router.push({
    name: 'AllGames',
    query: {
      type: props.currentGame,
    },
  })
}

const getPlatformList = computed(() => {
  return gameData.value[props.currentGame].length < 1 ? [] : gameData.value[props.currentGame][0]
})

const getClicksTopList = computed(() => {
  if (gameData.value[props.currentGame].length < 1) return []
  return gameData.value[props.currentGame][1].length > 9 && !props.isAll
    ? gameData.value[props.currentGame][1].slice(0, 9)
    : gameData.value[props.currentGame][1]
})

const handleOpenGame = async (item: any, key: string) => {
  const otherList = ['chess', 'slot']
  if (otherList.includes(key)) {
    sessionStorage.setItem('slotGamesList', JSON.stringify(gameData.value[props.currentGame]))
    sessionStorage.setItem('gameType', JSON.stringify(props.currentGame))
    sessionStorage.setItem('clickedItem', JSON.stringify(item))
    router.push({
      name: 'AllOnlineGames',
    })
  } else {
    onItemClick(item)
  }
}

getGameList()
</script>

<style lang="scss" scoped>
.gameListGrid__container {
  position: sticky;
  top: 92px+92px;
  display: inline-flex;
  flex-direction: column;
  width: 553.89px;
  height: min-content;
  padding-left: 20px;

  &-gameRec {
    display: flex;
    align-items: center;
    margin-bottom: 16.63px;
    font-size: 24px;
    font-weight: 700;

    svg {
      width: 36.29px;
      height: 36.29px;
      margin-right: 8.36px;
    }

    :deep(.hotGames) {
      g {
        path {
          fill: #fe6868;
        }
      }
    }
  }

  &-wrapper {
    display: grid;
    gap: 15px 20px;
    padding-left: 10px;

    &__item {
      position: relative;
      width: 246px;
      height: 160px;

      img {
        width: 100%;
        height: 100%;
      }

      .hotBadge {
        position: absolute;
        top: -8px;
        right: -8px;
        width: 38.74px;
        height: 36.01px;
      }

      &.hot {
        width: 166.31px;
        height: 166.31px;
      }
    }
  }
}

.look_all {
  width: 100%;
  height: 80px;
  border: 1px solid #f95959;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f8ff;
  font-size: 26px;
  color: #f95959;
  img {
    width: 48px;
    height: 48px;
    margin-right: 14px;
  }
}
.all_container {
  width: 100%;
  padding-left: 0;
}
.skeleton_hot {
  width: 100%;
  height: 100%;
  margin-right: 12px;
  .hot_tit {
    width: 100%;
    height: 36px;
    margin-bottom: 16px;
  }
  .hot_list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 14px;
    margin-bottom: 26px;
    div {
      width: 166px;
      height: 166px;
      background: linear-gradient(118.23deg, #ff8e89 26.37%, #ffc3a2 89.18%);
      box-shadow: 0px 8px 16px rgba(208, 208, 237, 0.36), inset 0px -4px 10px #fff6f4;
      border-radius: 16px;
      margin-bottom: 12px;
    }
  }
}

.skeleton_other {
  width: 100%;
  display: flex;
  flex-direction: column;
  div {
    width: 100%;
    height: 200px;
    border-radius: 40px;
    background: linear-gradient(118deg, #ff9902 26.37%, #ffd058 89.18%);
    box-shadow: 0px -4px 10px 0px #fff6f4 inset, 0px 8px 16px 4px #d0d0ed5c;
    margin-bottom: 20px;
  }
}

.skeleton_slot {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
  div {
    width: 252px;
    height: 320px;
    background: linear-gradient(118deg, #ff9902 26.37%, #ffd058 89.18%);
    box-shadow: 0px 8px 16px rgba(208, 208, 237, 0.36), inset 0px -4px 10px #fff6f4;
    border-radius: 20px;
  }
}

.skeleton_flash {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 34px;
  margin-bottom: 30px;
  div {
    width: 244px;
    height: 244px;
    background: linear-gradient(118deg, #ff9902 26.37%, #ffd058 89.18%);
    box-shadow: 0px 8px 16px rgba(208, 208, 237, 0.36), inset 0px -4px 10px #fff6f4;
    border-radius: 20px;
  }
}

.otherGame {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}

::v-deep(.van-skeleton) {
  padding: 0;
}
</style>
