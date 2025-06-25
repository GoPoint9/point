<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
// import { Autoplay, Pagination } from 'swiper'
// import { computed, watch, onMounted, reactive, ref } from 'vue'

import { useHome } from '@/hooks'
import { getIconsPublic } from '@/utils'

defineProps({
  menus: {
    type: Array,
    required: true,
  },
  // options: {
  //   type: Object,
  //   required: false
  // }
})

const { currentGameType, setCurrentGameType } = useHome()

// console.warn('response.data.code ', response.data.code)
// const { showLoginPopup } = useLoginStatus()
// const isUserLoggedIn = computed(() => store.Login.isLogin)

const menuSwiperOption = {
  slidesPerView: 'auto',
  spaceBetween: 20,
  freeMode: true,
  observer: true,
  observeParents: true,
  navigation: {
    prevEl: '.menu-prev',
    nextEl: '.menu-next',
  },
}

// const setGameType = gameCategory => {
//   if (gameCategory === 'FAV' && !isUserLoggedIn.value) {
//     showLoginPopup('loginPopupModal')
//     return
//   }
//   if (gameCategory === 'RUMMY') {
//     proxy.startGameV2({ vassalage: 'JL', gameId: 'JL0078', nodeId: 173957 })
//   } else if (gameCategory === 'LUDO') {
//     proxy.startGameV2({ vassalage: 'JL', gameId: 'JL0092', nodeId: 174856 })
//   } else {
//     commit('setCurrentGameType', gameCategory)
//   }
// }
</script>
<template>
  <div class="game-menu-container" :data-type="currentGameType">
    <div v-if="menus.length > 0" class="game-menu-swiper">
      <swiper ref="menuSwiper" v-bind="menuSwiperOption">
        <swiper-slide v-for="menu in menus" :key="`game_menu_${menu.categoryCode}`">
          <div
            :class="['game-menu-item', { active: currentGameType === menu.categoryCode }]"
            @click="setCurrentGameType(menu.categoryCode)"
          >
            <!-- <div class="menu-icon" :class="menu.categoryCode"></div> -->
            <img
              v-lazy="menu.categoryImg"
              class="menu-icon"
              :alt="menu.categoryCode"
              :data-img="getIconsPublic('images', 'avatar')"
            >
            <span class="menu-title">{{ menu.title }}</span>
          </div>
        </swiper-slide>
      </swiper>

      <!-- <div class="menu-prev hover swiper-nav" slot="button-prev">
        <svg-icon name="arrow-left" />
      </div>
      <div class="menu-next hover swiper-nav" slot="button-next">
        <svg-icon name="arrow-right" />
      </div> -->
    </div>
  </div>
</template>

<style scoped>
/* Add relevant styles */
</style>
