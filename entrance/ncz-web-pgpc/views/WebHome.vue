<script setup lang="ts">
import { useCommonStore } from '@/stores'

// import PageBanner from '@entrance/ncz-web-pgpc/components/PageBanner.vue'
// import NoticeMarquee from '@entrance/ncz-web-pgpc/components/NoticeMarquee.vue'
// import HomeGame from '@entrance/ncz-web-pgpc/components/HomeGame.vue'

const commonStore = useCommonStore()
</script>

<template>
  <!-- Home.vue -->
  <div class="page-center home-container" :class="{ off: commonStore.showSideMenu }">
    <div class="home-banner">
      <!-- <PageBanner /> -->
      <!-- <NoticeMarquee /> -->
    </div>
    <!-- <HomeGame /> -->
  </div>
</template>
