<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { d7e } from '@/composables/useRaffleEvent'
import { rn } from '@/composables/usePromotion'
import Nje from '@/components/TicketPopup.vue'
import k4e from '@/components/RaffleModal.vue'

const { t } = useI18n()

const {
  hasRaffleEvent,
  hasCountdown,
  displayTime,
  getRafflePrize,
  showEventModal,
  closeEventModal,
  rafflePrize,
  closeRaffle,
} = d7e()

const promotionStore = rn()
const promoList = computed(() => promotionStore.promoList || [])
const promotionConfig = computed(() => promotionStore.promotionConfig)
const availablePromoCount = computed(() => promotionStore.availablePromoCount)
const claimTicketList = computed(() => promotionStore.claimTicketList || [])

const ticketTypes = ['MANUAL', 'SAVIOR', 'UPGRADE_BONUS', 'MISSION_MANUAL']
const showPromo = ref(false)
const showMainContent = ref(true)
const selectedTicketType = ref('')
const ticketPopupRef = ref(null)

window.shellAPI.openPromoUI = async (id: string) => {
  showPromo.value = true
  await promotionStore.getAvailablePromotions()
  await promotionStore.getClaimTicketList()
  const ticket = claimTicketList.value.find((item) => item.id === id)
  if (ticket) {
    promotionStore.setTicketItem(ticket)
  }
  showPromo.value = promotionStore.ticketCount > 0 || claimTicketList.value.length > 0
  if (showPromo.value && claimTicketList.value.length) {
    ticketPopupRef.value?.slideToById()
  }
}

const initializePromoData = async () => {
  await Promise.allSettled([
    promotionStore.getAvailablePromotions(),
    promotionStore.getPromotionConfig(),
  ])
  const notifyEnabled = promotionConfig.value.unusedTicketNotify === 'Y'
  showPromo.value = notifyEnabled && (promotionStore.ticketCount > 0 || claimTicketList.value.length > 0)
}

const toggleRaffle = () => {
  closeRaffle()
  showMainContent.value = !showMainContent.value
}

const closePromo = () => {
  showPromo.value = false
}

const handleTicketType = (type: string) => {
  selectedTicketType.value = type
  switch (type) {
    case 'GOLDEN_EGG':
    case 'RAFFLE':
    case 'PRIZE_WHEEL':
    case 'CASH_VOUCHER':
    case 'GIFT_CODE':
      showPromo.value = true
      break
    case 'MISSION':
      xn('missionLeaderboard')
      break
    case 'LOGIN':
      xn('signInTask')
      break
    case 'REGISTER':
      xn('newbieTask')
      break
    case 'DEFAULT':
    case 'EVENT':
      xn('rewardCenter')
      break
  }
}

onMounted(() => {
  initializePromoData()
})

watch(() => hasRaffleEvent.value, (newValue) => {
  if (newValue) {
    showMainContent.value = true
  }
})
</script>

<template>
  <div v-if="showMainContent && (promoList.length > 0 || hasRaffleEvent)" :class="['available-promotions', promotionConfig.ticketIconPosition]">
    <swiper
      class="swiper-container"
      :navigation="{ nextEl: '.custom-prev-button', prevEl: '.custom-next-button' }"
      :slides-per-view="1"
      centered-slides
      slide-to-clicked-slide
      loop
      :speed="1000"
      :slides-per-group="1"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
    >
      <template v-if="hasRaffleEvent">
        <swiper-slide>
          <div class="event-wrap">
            <div class="event-tips-wrap">
              <div class="event-tips-content">
                <i class="reward-icon" />
                <div :class="['get-reward-button', { disabled: hasCountdown }]" @click="getRafflePrize">
                  {{ t('new_year_claim') }}
                </div>
              </div>
              <div v-if="hasCountdown" class="reward-count-time">
                {{ displayTime }}
              </div>
            </div>
          </div>
        </swiper-slide>
      </template>
      <template v-for="(item, index) in promoList" :key="item.ticketType + index">
        <swiper-slide>
          <div
            :class="[
              'gif-container',
              ticketTypes.includes(item.ticketType) ? 'public' : item.ticketType
            ]"
            @click="handleTicketType(item.ticketType)"
          />
          <span v-if="item.ticketType === 'DEFAULT'" class="ticket-count">{{ availablePromoCount }}</span>
        </swiper-slide>
      </template>
    </swiper>
    <span v-if="availablePromoCount > 0 || promoList.length > 0 || hasRaffleEvent" class="close-btn" @click="toggleRaffle" />
  </div>

  <k4e v-if="showEventModal" :raffle-prize="rafflePrize" @close-event-modal="closeEventModal" />

  <Nje
    v-if="showPromo"
    ref="ticketPopupRef"
    :type="selectedTicketType"
    @toggle-ticket-popup="closePromo"
  />
</template>
