<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'

defineProps({
  promotion: {
    type: Object,
    required: true,
  },
})

// const showSideMenu = ref(false)

const $showSideMenu = inject('$showSideMenu')
const showPromoBtn = ref(false)

const goCurrentPromo = () => {
  promotionToMc(promotion.promotionType, setMcPage)
}

const getPromoTime = (promotion) => {
  const start = dayjs(promotion.startDate).format('YYYY-MM-DD HH:mm:ss')
  const end = dayjs(promotion.endDate).format('YYYY-MM-DD HH:mm:ss')
  return `${start} - ${end}`
}
</script>

<template>
  <div class="promo-detail-container">
    <img
      class="detail-img"
      :src="promotion.announcementImages[0]?.url"
      alt=""
    >
    <div class="detail-title">{{ promotion.title }}</div>
    <div class="vhtml" v-html="promotion.content" />
    <div class="detail-footer">
      <button class="promo-btn" type="button" @click="goCurrentPromo">
        {{ $t('go_promo') }}
      </button>
    </div>
  </div>
</template>
