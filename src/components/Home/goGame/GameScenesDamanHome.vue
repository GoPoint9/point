<template>
  <div class="Maincontainer">
    <div class="firstContainer">
      <div class="insideFirstContainer">
        <div class="firstBox" @click="goOtherPage('DailyTasks')" />
        <div class="secondBox" @click="goOtherPage('InvitationBonus')" />
      </div>
      <div class="titleActivity">
        <div class="firstTitle" @click="goOtherPage('DailyTasks')">
          {{ $t('activity') }}<span>{{ $t('Richrewardactivities') }}.</span>
        </div>
        <div class="secondTitle" @click="goOtherPage('InvitationBonus')">
          {{ $t('invite') }}<span>{{ $t('Invfrndstorvvehugerewards') }}.</span>
        </div>
      </div>
    </div>
  </div>
  <template v-for="(item, key) in categoryList">
    <div v-if="item.categoryCode == 'Lottery'" class="OriginalContainer">
      <div class="insideOriginal">
        <div class="lotteryIcon" />
        <div class="title">{{ $t('Lotterygames') }}</div>
      </div>

      <div v-if="slotGamesData.length > 3" class="arrows">
        <div class="left" @click="handleLset('left')" />
        <div class="right" @click="handleLset('right')" />
      </div>
    </div>
    <div v-if="item.categoryCode == 'Lottery'" class="OriginalImages">
      <div class="OriginalImages_imgs">
        <Swipe
          ref="lotteryRef"
          class="my_swipe"
          :lazy-render="false"
          :show-indicators="false"
        >
          <SwipeItem v-for="(item, index) in chunk(LotteryGameData, 3)" :key="index">
            <img
              v-for="(item1, index1) in item"
              :key="index1"
              :src="item1.categoryImg"
              class="img"
              @click="isAlowGame(item1.id, goLottery)"
            >
          </SwipeItem>
        </Swipe>
      </div>
    </div>
    <!-- Original games start from here  -->
    <div v-if="item.categoryCode == 'Flash'" class="OriginalContainer">
      <div class="insideOriginal">
        <div class="icon">
          <span><img src="./imgs/HotGamesHome.png"></span>
        </div>
        <div class="title">{{ $t('code9308Flash') }}</div>
        <div class="All" @click="goOtherPage('Original')">
          {{ $t('all') }}<span>{{ originalGamesData.length }}</span>
        </div>
      </div>

      <div v-if="slotGamesData.length > 3" class="arrows">
        <div class="left" @click="handleOffset('left')" />
        <div class="right" @click="handleOffset('right')" />
      </div>
    </div>

    <div v-if="item.categoryCode == 'Flash'" class="OriginalImages">
      <div v-if="originalGamesData" class="OriginalImages_imgs">
        <Swipe
          ref="swipeRef"
          class="my_swipe"
          :lazy-render="false"
          :show-indicators="false"
        >
          <SwipeItem v-for="(item, index) in chunk(originalGamesData, 3)" :key="index">
            <img
              v-for="(item1, index1) in item"
              :key="index1"
              :src="item1.img"
              class="img"
              @click="isAlowGame(item1, goGame)"
            >
          </SwipeItem>
        </Swipe>
      </div>
    </div>

    <!-- Hot games start from Here  -->

    <div v-if="item.categoryCode == 'Popular'" class="OriginalContainer">
      <div class="insideOriginal">
        <div class="icon">
          <span><img src="./imgs/Fire.png"></span>
        </div>
        <div class="title">{{ $t('Hotgames') }}</div>
        <div class="All" @click="goOtherPage('HotGames')">
          {{ $t('all') }}<span>{{ hotData.length }}</span>
        </div>
      </div>

      <div v-if="hotData.length > 6" class="arrows">
        <div class="left" @click="handleHotset('left')" />
        <div class="right" @click="handleHotset('right')" />
      </div>
    </div>

    <div v-if="item.categoryCode == 'Popular'" class="hotImages">
      <div class="hotImages_hotGames">
        <Swipe
          ref="swipeHot"
          class="my-swipeHot"
          :lazy-render="false"
          :show-indicators="false"
        >
          <SwipeItem v-for="(item, index) in chunk(hotData, 6)" :key="index">
            <img
              v-for="(item1, index1) in item"
              :key="index1"
              :src="item1.imgUrl"
              alt=""
              @click="isAlowGame(item1, goGame)"
            >
          </SwipeItem>
        </Swipe>
      </div>
    </div>

    <!-- casino Starts from here -->

    <div v-if="item.categoryCode == 'Video'" class="OriginalContainer">
      <div class="insideOriginal">
        <div class="icon">
          <span><img src="./imgs/Live.png"></span>
        </div>
        <div class="title">{{ $t('live') }}</div>
        <div class="All" @click="goOtherPage('Casino')">
          {{ $t('all') }}<span>{{ casinoData.length }}</span>
        </div>
      </div>
      <div v-if="casinoData.length > 6" class="arrows">
        <div class="left" @click="handleCasinoset('left')" />
        <div class="right" @click="handleCasinoset('right')" />
      </div>
    </div>

    <div v-if="item.categoryCode == 'Video'" class="hotImages">
      <div class="hotImages_hotGames">
        <Swipe
          ref="swipeCasino"
          class="my-swipeHot"
          :lazy-render="false"
          :show-indicators="false"
        >
          <SwipeItem v-for="(item, index) in chunk(casinoData, 6)" :key="index">
            <img
              v-for="(item1, index1) in item"
              :key="index1"
              :src="item1.vendorImg"
              alt=""
              @click="isAlowGame(item1, goGame)"
            >
          </SwipeItem>
        </Swipe>
      </div>
    </div>
    <!-- Slots starts from here  -->
    <div v-if="item.categoryCode == 'Slot'" class="OriginalContainer">
      <div class="insideOriginal">
        <div class="icon">
          <span><img src="./imgs/Joystick.png"></span>
        </div>
        <div class="title">{{ $t('code9304Slot') }}</div>
        <div class="All" @click="goOtherPage('Slots')">
          {{ $t('all') }}<span>{{ slotGamesData.length }}</span>
        </div>
      </div>
      <div v-if="slotGamesData.length > 6" class="arrows">
        <div class="left" @click="handleSlotsset('left')" />
        <div class="right" @click="handleSlotsset('right')" />
      </div>
    </div>

    <div v-if="item.categoryCode == 'Slot'" class="SlotImages">
      <div class="SlotImages_images">
        <Swipe
          ref="swipeSlots"
          class="my-swipeSlots"
          :lazy-render="false"
          :show-indicators="false"
        >
          <SwipeItem v-for="(item, index) in chunk(slotGamesData, 6)" :key="index">
            <div class="flex_container">
              <img
                v-for="(item1, index1) in item"
                :key="index1"
                :src="item1.vendorImg"
                alt=""
                @click="gotoSlot(item1)"
              >
            </div>
          </SwipeItem>
        </Swipe>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
// Hook imported
import { useGames } from '@/hooks/useGoGames.hook'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { SwipeInstance } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import { useGame, useHome } from '@/hooks'
const { goGame } = useGame()
const { isAlowGame } = useHome()
const { t } = useI18n()
const router = useRouter()
const swipeRef = ref<SwipeInstance | null>(null)
const swipeHot = ref<SwipeInstance | null>(null)
const swipeCasino = ref<SwipeInstance | null>(null)
const swipeSlots = ref<SwipeInstance | null>(null)
const lotteryRef = ref<SwipeInstance | null>(null)
// used hook to get the games from the api
const { gameData, gameTypeList } = useGames()
// Original games Data
const originalGamesData = computed(() => gameData.Original)
// Hot games Data
const hotData = computed(() => gameData.HotGames)
// Casino games Data
const casinoData = computed(() => gameData.Casino)
// Slot games Data
const slotGamesData = computed(() => gameData.Slot)
// Lottery games Data
const LotteryGameData = computed(() => gameData.Lottery?.filter((item) => item.state === 1) || [])
// 排序
const categoryList = computed(() => {
  const map = ['Lottery', 'Flash', 'Popular', 'Video', 'Slot']
  return gameTypeList.value.filter((item) => map.includes(item.categoryCode))
})
const lotteryMap = {
  1: {
    title: t('lotteryHintStr1'),
    describe: t('lotteryHintStr2'),
    RouterName: 'AllLotteryGames-WinGo',
  },
  2: {
    title: t('lotteryHintStr1'),
    describe: t('lotteryHintStr2'),
    RouterName: 'AllLotteryGames-K3',
  },
  3: {
    title: t('lotteryHintStr1'),
    describe: t('lotteryHintStr4'),
    RouterName: 'AllLotteryGames-5D',
  },
  4: {
    title: t('lotteryHintStr1'),
    describe: t('lotteryHintStr2'),
    RouterName: 'AllLotteryGames-WinTrx',
  },
  5: {
    title: t('vietnamOfficialLottery'),
    describe: t('lotteryHintStr6'),
    RouterName: 'AllLotteryGames-XoSo',
  },
  6: {
    title: t('vietnamOfficialLottery'),
    describe: t('lotteryHintStr6'),
    RouterName: 'AllLotteryGames-XoSo',
  },
  7: {
    title: t('vietnamOfficialLottery'),
    describe: t('lotteryHintStr6'),
    RouterName: 'AllLotteryGames-Binguo',
  },
  8: {
    title: t('lotteryHintStr1'),
    describe: t('lotteryHintStr2'),
    RouterName: 'AllLotteryGames-4D',
  },
}

const goLottery = (id: string | number) => {
  let query
  if (id == 6 || id == 5) {
    query = {
      id,
    }
  }
  router.push({
    name: lotteryMap[id].RouterName,
    query,
  })
}

const handleOffset = (type: string): void => {
  if (type === 'left') {
    swipeRef.value[0]?.prev()
  } else {
    swipeRef.value[0]?.next()
  }
}

const handleHotset = (type: string): void => {
  if (type === 'left') {
    swipeHot.value[0]?.prev()
  } else {
    swipeHot.value[0]?.next()
  }
}

const handleCasinoset = (type: string): void => {
  if (type === 'left') {
    swipeCasino.value[0]?.prev()
  } else {
    swipeCasino.value[0]?.next()
  }
}

const handleLset = (type: string): void => {
  if (type === 'left') {
    lotteryRef.value[0]?.prev()
  } else {
    lotteryRef.value[0]?.next()
  }
}

const handleSlotsset = (type: string): void => {
  if (!swipeSlots.value) return
  if (type === 'left') {
    swipeSlots.value[0]?.prev()
  } else {
    swipeSlots.value[0]?.next()
  }
}
const goOtherPage = (name: string) => {
  router.push({
    name,
  })
}

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

const gotoSlot = (value: any) => {
  sessionStorage.setItem('slotGamesList', JSON.stringify(gameData.Slot))
  sessionStorage.setItem('clickedItem', JSON.stringify(value))
  sessionStorage.setItem('gameType', JSON.stringify('slot'))
  router.push({
    name: 'AllOnlineGames',
    query: {
      game: 'slot',
      currentId: value.slotsName,
    },
  })
}
onMounted(() => {
  // getGameList()
})
</script>

<style lang="scss" scoped>
@import './home.scss';
</style>
