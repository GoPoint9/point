<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

const banners = ref([])
onMounted(async () => {
  if (import.meta.env.VITE_APP_IS_WEB_PGPC) {
    const { useSiteStore } = await import('@/stores')
    const siteStore = useSiteStore()
    const { imgFtpUrl } = siteStore.config
    banners.value = siteStore.h5BannerList.map(i => ({ bannerUrl: imgFtpUrl + i.image, url: i.url }))
  } else {
    const { useHome } = await import('@/hooks')
    const { getBannerApi, getBanner } = useHome()
    await getBannerApi.value()
    banners.value = getBanner
  }
})

const swiperIndex = ref(0)

const goPage = (newUrl: string) => {
  newUrl && (window.location.href = newUrl)
}

const swiperOption = computed(() => {
  // console.warn(' ====> [ banners.value ] ', banners.value)
  const options =
    banners.value.length > 1
      ? {
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.banner-pagination',
            clickable: true,
          },
        }
      : {}

  return {
    ...options,
    observer: true,
    observeParents: true,
    preloadImages: false,
    slidesPerView: 1,
    spaceBetween: 20.3,
    // on: {
    //   click: () => {
    //     console.warn('click ')
    //     // const currentBanner = banners[mySwiper.value.realIndex]
    //     // openLinkage(currentBanner)
    //   }
    // }
  }
})
const mySwiper = computed(() => $refs.mySwiper.swiper)
const linkageType = 1
</script>

<template>
  <div class="page-banner">
    <div v-if="banners.length" class="game-banner">
      <swiper
        :key="$route.path"
        ref="mySwiper"
        class="swiper-wrap"
        v-bind="swiperOption"
        :modules="[Autoplay, Pagination]"
        :pagination="{ clickable: true }"
      >
        <swiper-slide v-for="(banner, index) in banners" :key="'banner_' + index">
          <!-- <img class="banner-img" :style="linkageType ? 'cursor: pointer;' : ''" :src="banner.url" /> -->
          <img
            v-lazy="banner.bannerUrl"
            class="banner-img"
            :style="linkageType ? 'cursor: pointer;' : ''"
            @click="goPage(banner.url)"
          >
        </swiper-slide>
      </swiper>
      <div v-if="banners.length > 1" class="banner-pagination swiper-pagination">
        <span v-for="i in banners.length" :key="i" :class="{ active: swiperIndex === i - 1 }" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-banner .banner-swiper-pagination,
.game-banner .swiper-container-horizontal > .swiper-pagination-bullets,
.game-banner .swiper-pagination-custom,
.game-banner .swiper-pagination-fraction {
  bottom: 10%;
  width: 500px;
  left: 50%;
  transform: translate(-50%);
  border-radius: 5px;
}
</style>
