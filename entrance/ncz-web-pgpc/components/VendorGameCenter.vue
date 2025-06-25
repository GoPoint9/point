<script setup>
import { computed } from 'vue'
// import { useGameVendorMixin, useStore, useCommit, useReactiveState } from 'path/to/hooks'
import GameVendorItem from './GameVendorItem.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Grid, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/grid'

import { useHome } from '@/hooks'

const modules = [Grid, Navigation, Pagination]
const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})
const { homeState, currentGameType } = useHome()

const gameList = computed(() => {
  const { allGameList = {} } = homeState

  console.log(' >>>> allGameList ', allGameList)
  const result = allGameList[props.type] || []

  console.warn(' -->> gameList/result ', result)
  // homeState.allGameList?.lottery || []
  if (props.type === 'lottery') return result

  return result
})

// const gameVendor = useReactiveState('gameVendor')
const gameVendor = {}
// const { store, commit } = useStore()
// const currentGameType = computed(() => store.eGameStore.currentGameType)

const vendors = computed(() => {
  return gameVendor.value?.[type] || []
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

// const gameSwiperOption = computed(() => ({
//   observer: true,
//   observeParents: true,
//   slidesPerColumnFill: type === 'SPORTS' ? 'column' : 'row',
//   slidesPerView: 3,
//   slidesPerColumn: type === 'SPORTS' ? 2 : 1,
//   spaceBetween: 20,
//   navigation: {
//     prevEl: '.menu-prev',
//     nextEl: '.menu-next'
//   }
// }))

const setGameType = gameType => {
  commit('setCurrentGameType', gameType)
}
</script>
<template>
  <div class="vender-game-center-container" :data-set-type="type">
    <div class="vendor-game-container">
      <div class="main-title">
        <div class="title-label" :class="options[type]?.icon">
          <span>
            {{ $t(options[type]?.title || '') }}
          </span>
        </div>
      </div>
      <div v-if="gameList.length" class="vendor-wrapper">
        <swiper v-bind="gameSwiperOption" :key="type" :modules="modules">
          <swiper-slide v-for="(game, index) in gameList" :key="`${type}-${index}`">
            <GameVendorItem :game="game" :type="options[type].type" />
          </swiper-slide>
        </swiper>
        <div v-if="gameList.length > 12" class="pagination-container">
          <div slot="button-prev" :class="`menu-prev-${type} menu-prev swiper-nav`">
            <svg-icon name="arrow-left" />
          </div>
          <div v-if="currentGameType === 'HOME'" class="more-btn" @click="setGameType(type)">
            {{ $t('more_button') }}
          </div>
          <div slot="button-next" :class="`menu-next-${type} menu-next swiper-nav`">
            <svg-icon name="arrow-right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add relevant styles */
</style>
