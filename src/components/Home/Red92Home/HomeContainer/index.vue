<template>
  <div class="home_container">
    <!-- 热门 -->
    <van-skeleton v-if="currentMenu === 'slot'" :loading="loading">
      <!-- <div class="title"><img :src="getIcons('home', 'slot')" alt="" />{{ $t('code9304') }}</div> -->
    </van-skeleton>
    <van-skeleton v-if="currentMenu === 'sport'" :loading="loading">
      <!-- <div class="title"><img :src="getIcons('home', 'sport')" alt="" />{{ $t('code9305') }}</div> -->
    </van-skeleton>
    <van-skeleton v-if="currentMenu === 'video'" :loading="loading">
      <!-- <div class="title"><img :src="getIcons('home', 'video')" alt="" />{{ $t('code9306') }}</div> -->
    </van-skeleton>
    <van-skeleton v-if="currentMenu === 'chess'" :loading="loading">
      <!-- <div class="title"><img :src="getIcons('home', 'chess')" alt="" />{{ $t('PVC') }}</div> -->
    </van-skeleton>
    <van-skeleton v-if="currentMenu === 'popular'" :loading="loading">
      <template #template>
        <div class="skeleton_hot">
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
      </template>
      <HotGameItem
        :clicks-top-list="[gameList.popular.platformList, gameList.popular.clicksTopList]"
        @on-item-click="onItemClick"
      />
    </van-skeleton>

    <!-- 电子、体育、棋牌、视讯 -->
    <van-skeleton v-if="isOther(currentMenu)" :loading="loading">
      <template #template>
        <div class="skeleton_other">
          <div />
          <div />
          <div />
          <div />
        </div>
      </template>
      <ElectronicWinRate v-if="['slot'].includes(currentMenu)" />
      <OtherGameItem :game-list="gameList[currentMenu]" :current-menu="currentMenu" @on-item-click="handleOpenGame" />
    </van-skeleton>

    <!-- 捕鱼 -->
    <van-skeleton v-if="currentMenu === 'fish'" :loading="loading">
      <!-- <div class="title"><img :src="getIcons('home', 'fish')" alt="" />{{ $t('code9303') }}</div> -->
      <template #template>
        <div class="skeleton_hot">
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
      </template>
      <Fish :game-list="gameList.fish.slice(0, 15)" @on-item-click="onItemClick" />
    </van-skeleton>

    <!-- 小游戏 -->
    <van-skeleton v-if="currentMenu === 'flash'" :loading="loading">
      <!-- <div class="title"><img :src="getIcons('home', 'flash')" alt="" />{{ $t('flash') }}</div> -->
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
          <div />
        </div>
      </template>
      <Flash :game-list="gameList.flash" :current-menu="currentMenu" @on-item-click="onItemClick" />
    </van-skeleton>

    <!-- 彩票 -->
    <van-skeleton v-if="currentMenu === 'lottery'" :loading="lotteryLoading">
      <!-- <div class="title"><img :src="getIcons('home', 'lottery')" alt="" />{{ $t('code9301') }}</div> -->
      <template #template>
        <div class="skeleton_lottery">
          <div>
            <div />
          </div>
          <div />
        </div>
      </template>
      <KeepAlive>
        <LotterySlotItem v-if="currentMenu === 'lottery'" :game-list="gameList.lottery" />
      </KeepAlive>
    </van-skeleton>

    <div v-if="currentMenu === 'fish'" class="all_btn" @click="handleGoFish">{{ $t('viewAll') }}</div>
  </div>
</template>
<script setup lang="ts">
import type { AllGameList, HomeGameList } from '@/types/api'
import { deepCopy, getIcons } from '@/utils'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import HotGameItem from '../GameList/HotGameItem.vue'
import OtherGameItem from '../GameList/OtherGameItem.vue'
import Fish from '../GameList/Fish.vue'
import Flash from '../GameList/Flash.vue'
import LotterySlotItem from '../../commonHome/LotterySlotItem.vue'
import ElectronicWinRate from '../GameList/ElectronicWinRate.vue'
import { useHome } from '@/hooks'
withDefaults(
  defineProps<{
    currentMenu: string
    currentTitle: string
  }>(),
  {}
)
const { onItemClick, getAllGame, homeState } = useHome()
const router = useRouter()
const loading = ref(false)
const lotteryLoading = ref(false)
const gameList = reactive<
  AllGameList & {
    lottery: HomeGameList[]
  }
>({
  slot: [],
  video: [],
  chess: [],
  sport: [],
  popular: {
    platformList: [],
    clicksTopList: [],
  },
  fish: [],
  flash: [],
  lottery: [],
})
const gameMenu = ref()

const isOther = (key: string) => {
  return ['slot', 'video', 'chess', 'sport'].includes(key)
}

/**
 * @description: 获取游戏列表
 * @return {*}
 */
const getGameList = async () => {
  await getAllGame()

  const gamelist: any = deepCopy(homeState.allGameList)
  Object.keys(gameList).forEach((item) => {
    if (item === 'popular') {
      gameList.popular = { platformList: gamelist[item].platformList, clicksTopList: gamelist[item].clicksTopList }
    } else {
      gameList[item] = gamelist[item]
    }
  })
  sessionStorage.setItem('gameList', JSON.stringify(gameList))

  setTimeout(() => {
    loading.value = false
  }, 0)
}

const handleGoFish = () => {
  router.push({
    name: 'FishGames',
  })
}

const handleOpenGame = async (item: any, key: string) => {
  console.log(item, key)
  const otherList = ['chess', 'slot']
  if (otherList.includes(key)) {
    sessionStorage.setItem('slotGamesList', JSON.stringify(gameList[key]))
    sessionStorage.setItem('gameType', JSON.stringify(key))
    sessionStorage.setItem('clickedItem', JSON.stringify(item))
    router.push({
      name: 'AllOnlineGames',
    })
  } else {
    onItemClick(item)
  }
}

/**
 * @description: 初始化
 * @return {*}
 */
const init = () => {
  loading.value = true
  getGameList()
  gameMenu.value = sessionStorage.getItem('homeMenu')
  if (gameMenu.value === 'lottery') {
    lotteryLoading.value = true
  }
}
init()
</script>
<style lang="scss" scoped>
.home_container {
  padding: 0 26px;
}
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  img {
    width: 48px;
    height: 48px;
    margin-right: 12px;
  }
  span {
    font-size: 30px;
    line-height: 30px;
    font-weight: 700;
  }
}
.platform {
  margin-bottom: 26px;
  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 14px;
    .item {
      width: 220px;
      position: relative;
      height: 220px;
      background: linear-gradient(118.23deg, #ff8e89 26.37%, #ffc3a2 89.18%);
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 12px;
      img {
        width: 200px;
        height: 200px;
        border-radius: 16px;
      }
      .hot_bage {
        position: absolute;
        right: -6px;
        top: -8px;
        width: 38px;
        height: 36px;
      }
    }
  }
}
.gameRec,
.hotGames {
  width: 48px;
  height: 48px;
  margin-right: 12px;
}
::v-deep(.van-skeleton) {
  padding: 0 !important;
}
.skeleton_hot {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  div {
    width: 220px;
    height: 220px;
    background-color: #ff8e89;
    margin: auto;
  }
}
.skeleton_other {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 38px;
  grid-template-rows: repeat(2, 1fr);
  div {
    width: 330px;
    height: 300px;
    border-radius: 20px;
    background-color: #ff8e89;
    margin: auto;
  }
}
.skeleton_flash {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  div {
    width: 216px;
    height: 216px;
    background-color: #ff8e89;
  }
}

.skeleton_lottery {
  width: 100%;
  display: flex;
  flex-direction: column;
  div {
    width: 100%;
    height: 293px;
    background: linear-gradient(95.66deg, #72c1ff 4.12%, #4875fb 97.56%);
    border-radius: 26px 26px 0px 0px;
    position: relative;
    margin-bottom: 56px;
    div {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 84px;
      background: #f4f5f8;
      margin: 0;
      box-shadow: 0px 4px 8px rgba(197, 197, 218, 0.26);
      border-radius: 0;
    }
  }
}
.all_btn {
  border: 1px solid #f2413b;
  border-radius: 60px;
  width: 520px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  color: #f2413b;
  margin: 30px auto;
  font-size: 26px;
}
</style>
