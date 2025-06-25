<script setup>
import { ref, computed } from 'vue'
import PromoModal from './PromoModal.vue'
import PromoDetail from './PromoDetail.vue'
import NoData from './NoData.vue'

// import TCModal from './TCModal.vue'
import TCModal from '@entrance/ncz-web-pgpc/components/CommonLogic/components/TCModal.vue'

const promoMenuList = [
  { name: 'all_promo', type: 'all', iconClass: 'all' },
  { name: 'rng_promo', type: 'rng_promo', iconClass: 'rng' },
  { name: 'live_promo', type: 'live_promo', iconClass: 'live' },
  { name: 'pvp_promo', type: 'pvp_promo', iconClass: 'pvp' },
  { name: 'sport_promo', type: 'sport_promo', iconClass: 'sport' },
  { name: 'fish_promo', type: 'fish_promo', iconClass: 'fish' },
  { name: 'lotto_promo', type: 'lotto_promo', iconClass: 'lotto' },
  { name: 'rebate_promo', type: 'rebate_promo', iconClass: 'rebate' },
  { name: 'deposit_promo', type: 'deposit_promo', iconClass: 'deposit' },
  { name: 'rank_promo', type: 'player_rank_rules', iconClass: 'rank' },
  { name: 'point_promo', type: 'point_mall', iconClass: 'point' },
  { name: 'download_promo', type: 'app_download', iconClass: 'download' },
  { name: 'new_player_promo', type: 'new_player', iconClass: 'new-player' },
  { name: 'other_promo', type: 'other_promo', iconClass: 'other' },
]

const currentType = ref('all')
const showDetail = ref(false)
const activePromo = ref({})
const showSideMenu = ref(false)

const promoMenu = computed(() => {
  return promoMenuList.filter(item => item.type !== 'all')
})

const switchType = (type) => {
  currentType.value = type
}

const checkDetail = (promo) => {
  activePromo.value = promo
  showDetail.value = true
}

const hideDetail = () => {
  showDetail.value = false
}

const swiperOption = {
  slidesPerView: 'auto',
  spaceBetween: 13,
  navigation: {
    prevEl: '.promo-prev',
    nextEl: '.promo-next',
  },
}
</script>

<template>
  <div class="promo-container">
    <div class="promo-bg page-center" :class="{ off: showSideMenu, dark: showDetail, promoDetail: showDetail }">
      <PromoDetail v-if="showDetail" :promotion="activePromo" :close="hideDetail" />
      <div v-else class="promo-content">
        <swiper class="promo-menu-list" :options="swiperOption">
          <swiper-slide>
            <div class="promo-menu-item all" :class="{ active: currentType === 'all' }" @click="switchType('all')">
              <span class="promo-name">{{ $t('all_promo') }}</span>
            </div>
          </swiper-slide>
          <swiper-slide v-for="item in promoMenu" :key="item.type">
            <div class="promo-menu-item" :class="[item.iconClass, { active: item.type === currentType }]" @click="switchType(item.type)">
              <img class="icon" :src="require(`@/assets/${item.iconClass}.png`)" alt="">
              <span class="promo-name">{{ $t(item.name) }}</span>
            </div>
          </swiper-slide>
        </swiper>
        <div v-if="promoMenu.length > 8" slot="button-prev" class="promo-prev prev swiper-arrow" />
        <div v-if="promoMenu.length > 8" slot="button-next" class="promo-next next swiper-arrow" />
        <div class="active-promo-box">
          <div v-if="promoMenu.length" class="active-promo-list">
            <div
              v-for="(promo, index) in promoMenu"
              :key="`${currentType}_${index}`"
              class="active-promo-item"
              @click="checkDetail(promo)"
            >
              <div class="active-item-img">
                <img :src="require(`@/assets/${promo.iconClass}.png`)" alt="">
              </div>
              <div class="active-item-info">
                <div class="item-title">{{ promo.name }}</div>
                <div class="more-btn">{{ $t('more_button') }}</div>
              </div>
            </div>
          </div>
          <NoData v-else />
        </div>
      </div>
    </div>
    <TCModal name="promo-details">
      <PromoModal :promotion="activePromo" />
    </TCModal>
  </div>
</template>
