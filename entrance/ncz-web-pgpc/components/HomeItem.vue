<script setup>
import { ref, computed, watch } from 'vue'
import GameListItem from './GameListItem.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Grid, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/grid'

import { useHome } from '@/hooks'

const modules = [Grid, Navigation, Pagination]
const props = defineProps({
  params: { type: Object },
  menu: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  // options: {
  //   type: Object,
  //   default: () => ({}),
  //   required: true
  // },
  type: {
    type: String,
    required: true,
  },
})

const { homeState, currentGameType } = useHome()
// const gameVendor = {}

/**
  lottery,
  fish,
  slot,
  flash,
  sport,
  video,
  chess,
  popular,
  bigaward

;[
  { categoryName: '热门游戏', categoryCode: 'Popular' },
  { categoryName: '小游戏', categoryCode: 'Flash' },
  { categoryName: '捕鱼游戏', categoryCode: 'Fish' },
  { categoryName: '棋牌游戏', categoryCode: 'Chess' },
  { categoryName: '视讯游戏', categoryCode: 'Video' },
  { categoryName: '体育游戏', categoryCode: 'Sport' },
  { categoryName: '彩票', categoryCode: 'Lottery' },
  { categoryName: '电子游戏', categoryCode: 'Slot' },
  { categoryName: '电子大奖', categoryCode: 'BigAward' }
]

getVideonChildGame()
// homeState.videoGame
getSlotList()
// homeState.slotsGame

 */

const vendorSwiper = ref(null)
const gameSwiper = ref(null)

const currentPage = ref(1)
const totalPages = ref(0)

const activeClassify = ref('') // 當前類型
const vendorSwiperOption = computed(() => ({
  observer: true,
  observeParents: true,
  slidesPerView: 'auto',
  spaceBetween: 20,
}))
function setVendor (vendor) {
  // currentPage.value = 1
  activeClassify.value = getVendorCode(vendor)
  // params.vassalage = vassalage
  // fetchGames(true)
}

const showTabs = computed(() => ['video', 'slot'].includes(props.type.toLowerCase()))

// 第二層 tab, 例如電子、視訊等
const filterVendorList = computed(() => {
  if (!showTabs.value) return [] // 不符合先排除

  // NCZ
  if (import.meta.env.VITE_APP_IS_WEB_PGPC) {
    console.warn('props.menu.pubExtGameVolist ', props.menu.pubExtGameVolist)
    props.menu.pubExtGameVolist.forEach(i => {
      i._vendorCode = i.extPlatformId === 'usmg' ? 'MG' : i.extPlatformId.toUpperCase() // 英文代號
      i.vendorCode = i.extGamePlatformName // 這邊可能會有中文
    })
    return props.menu.pubExtGameVolist
  }

  const dataMap = new Map([
    ['video', homeState.videoGame],
    ['slot', homeState.slotsGame],
  ])

  const result = dataMap.get(props.type.toLowerCase())
  return result || []
})

const getVendorCode = vendor => vendor._vendorCode || vendor.vendorCode
watch(
  filterVendorList,
  val => {
    if (!val.length) return
    activeClassify.value = getVendorCode(val[0])
  },
  { immediate: true }
)

// popular: ['platformList', 'clicksTopList', 'clicksVideoTopList']
const gameList = computed(() => {
  const key = props.type.toLowerCase()

  if (import.meta.env.VITE_APP_IS_WEB_PGPC) {
    // video, slot 取得第三層
    if (['video', 'slot'].includes(key)) {
      const game = props.menu.pubExtGameVolist.find(i => i._vendorCode === activeClassify.value)
      return game.gameList
    }
    return props.menu.pubExtGameVolist
  }

  // 以下 BDG web
  // const result = (homeState.allGameList || {})[props.type] || { clicksTopList: [], clicksVideoTopList: [] }
  const { allGameList } = homeState
  if (!allGameList || allGameList === undefined) return []

  switch (key) {
    case 'video':
      return homeState.videoGameMap[activeClassify.value] || []
    case 'slot':
      return homeState.slotsGameMap[activeClassify.value] || []
    case 'popular':
      return allGameList[key].platformList
    case 'bigaward':
      return allGameList.awardrecordlist
  }

  const result = allGameList[key]
  return result
})

const rows = computed(() => (currentGameType.value === 'Popular' ? 2 : 4))
const gameSwiperOption = computed(() => ({
  observer: true,
  observeParents: true,
  slidesPerView: 6,
  slidesPerGroup: 6,
  grid: {
    rows: rows.value,
    fill: 'row',
  },
  on: {
    observerUpdate () {
      console.warn('observerUpdate ', observerUpdate)
      props.type !== 'HOT' && props.type !== 'FAV' && showPagination() && gameSwiper.value.$el.swiper.slideNext()
    },
  },
  spaceBetween: 20,
}))

const showPagination = () => {
  return gameList.value.length > rows.value
  // return gameList.value.length > 12 || totalPages.value > 1
  // switch (props.type) {
  //   case 'HOT':
  //   case 'FAV':
  //     return homeState.allGameList.length > rows.value
  //   default:
  //     // return homeState.allGameList.length > rows.value || n.totalPages > 1
  //     return homeState.allGameList.length > rows.value
  // }
}

function onMenuChange (action) {
  const swiperInstance = gameSwiper.value.$el.swiper

  if (action === 'prev') {
    const isChange = swiperInstance.slidePrev()
    if (isChange) currentPage.value -= 1
  }
  if (action === 'next') {
    const isChange = swiperInstance.slideNext()
    if (isChange) currentPage.value += 1
  }
}

function fetchGames (reset = false) {
  // Fetch game logic
}

// onMounted(() => {
//   fetchGames()
// })

// watch([gameVendor, currentGameType], () => {
//   fetchGames()
// })
</script>
<template>
  <div class="home-item" :data-type="type">
    <div class="main-title">
      <!-- :class="(props.options[type] || {})?.icon" -->
      <div class="title-label" :style="{ '--icon-categoryImg': `url(${props.menu.categoryImg})` }">
        <span>{{ menu.title || '' }}</span>
      </div>
      <!-- <div class="title-label" :class="(props.options[type] || {})?.icon">
        <span>{{ $t((props.options[type] || {})?.title || '') }}</span>
      </div> -->
    </div>
    <div v-if="filterVendorList.length && showTabs" class="classify-list">
      <swiper ref="vendorSwiper" v-bind="vendorSwiperOption">
        <swiper-slide v-for="(vendor, index) in filterVendorList" :key="`classify-${index}`">
          <div
            :class="['classify-item', { on: activeClassify === getVendorCode(vendor) }, getVendorCode(vendor)]"
            @click="setVendor(vendor)"
          >
            <!-- <img class="classify-icon" :src="getVendorIcon(vendor)?.rngColor || ''" alt="" /> -->
            <svg-icon :name="getVendorCode(vendor)" class="classify-icon" />
            <div class="classify-name">{{ vendor.vendorCode }}</div>
          </div>
          <!--
            <div
              class="classify-item"
              :class="{ on: activeClassify === vendor.vassalage || params.vassalage === vendor.vassalage }"
              @click="setVendor(vendor.vassalage)"
            >
              <img class="classify-icon" :src="getVendorIcon(vendor)?.rngColor || ''" alt="" />
              <div class="classify-name">{{ vendor.displayName }}</div>
            </div>
          -->
        </swiper-slide>
      </swiper>
    </div>
    <!-- <div v-if="homeState.allGameList.length" class="games-wrapper"> -->
    <div v-if="gameList.length" class="games-wrapper" :data-length="gameList.length">
      <!-- <swiper :key="type" ref="gameSwiper" v-bind="gameSwiperOption" :modules="modules" :navigation="true"> -->
      <swiper
        :key="type"
        ref="gameSwiper"
        v-bind="gameSwiperOption"
        :modules="modules"
      >
        <swiper-slide v-for="(game, index) in gameList" :key="`${type}-${index}`">
          <GameListItem :game="game" />
        </swiper-slide>
      </swiper>
    </div>
    <div v-else class="no-data">{{ $t('in_no_data') }}</div>
    <div v-if="showPagination()" class="pagination-container" :data-page="currentPage">
      <div
        :class="['menu-prev swiper-nav', `menu-prev-${type} ${currentPage === 1 ? 'disabled' : ''}`]"
        @click="onMenuChange('prev')"
      >
        <svg-icon name="arrow-left" />
      </div>
      <div v-if="currentGameType === 'Popular'" class="more-btn" @click="setGameType(type)">More</div>
      <div
        :class="['menu-next swiper-nav', `menu-next-${type} ${currentPage === totalPages ? 'disabled' : ''}`]"
        @click="onMenuChange('next')"
      >
        <svg-icon name="arrow-right" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-item .main-title .title-label:before {
  background-image: var(--icon-categoryImg);
}
</style>
