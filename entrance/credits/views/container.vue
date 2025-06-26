<template>
  <div class="page-banner">
    <div class="game-banner">
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
        <span
          v-for="i in banners.length"
          :key="i"
          :class="{ active: swiperIndex === i - 1 }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { useBreakpoints } from '@vueuse/core'

// const banners = ref([])
onMounted(async () => {
  // if (import.meta.env.VITE_APP_IS_WEB_PGPC) {
  //   const { useSiteStore } = await import('@/stores')
  //   const siteStore = useSiteStore()
  //   const { imgFtpUrl } = siteStore.config
  //   banners.value = siteStore.h5BannerList.map(i => ({ bannerUrl: imgFtpUrl + i.image, url: i.url }))
  // } else {
  //   const { useHome } = await import('@/hooks')
  //   const { getBannerApi, getBanner } = useHome()
  //   await getBannerApi.value()
  //   banners.value = getBanner
  // }

//   banners.value = [
//     {
//       bannerUrl: '2.jpg',
//       url: '',
//     },
//     {
//       bannerUrl: '2.jpg',
//       url: '',
//     },
//     {
//       bannerUrl: '2.jpg',
//       url: '',
//     },
//   ]
})

const h5Banners = [
  { bannerUrl: 'h5_1.jpg', url: '/h5/path/1' },
  { bannerUrl: 'h5_2.jpg', url: '/h5/path/2' },
]
const webBanners = [
  { bannerUrl: 'web_1.jpg', url: '/web/path/1' },
  { bannerUrl: 'web_2.jpg', url: '/web/path/2' },
]

const breakpoints = useBreakpoints({
  desktop: 768,
})
// 'isDesktop' 會是一個響應式的 boolean 值 (true/false)
const isDesktop = breakpoints.greater('desktop') // 寬度大於等於 768px 時為 true

const banners = computed(() => {
  if (isDesktop.value) {
    console.log('偵測到桌面模式 (>= 768px)')
    return webBanners // Web 模式用第二組圖
  } else {
    console.log('偵測到 H5 模式 (< 768px)')
    return h5Banners // H5 模式用第一組圖
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

<style lang="scss" scoped>
/* 既有的分頁樣式... */
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

// 1. 設定 Swiper 容器的寬高比
.swiper-wrap {
  // aspect-ratio: 16 / 9; // 您可以改成您想要的比例
  height: auto; // 高度設為 auto，讓 aspect-ratio 生效
}

// 2. 讓圖片去適應容器，而不是撐開容器
.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover; // 圖片等比例填滿，多餘部分裁切
}
</style>
