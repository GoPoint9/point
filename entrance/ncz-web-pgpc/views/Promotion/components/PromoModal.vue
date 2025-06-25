<script setup>
const props = defineProps({
  promotion: {
    type: Object,
    required: true,
  },
})
const globalStore = GlobalStore()
const isLogin = computed(() => globalStore.isLogin)

//
//
//
const showPromoMcBtn = 0
// const store = {}
// const showRegister = ref(true)
// const setMcPage = (page) => {
//   store.commit('setMcShow', true)
//   store.commit('setMcPage', page)
// }
// const showPromoBtn = (promotionType, showRegister) => {
//   // 假设 showPromoBtn 是 mixin 提供的方法
// }
// onBeforeMount(() => {
//   showPromoBtn(props.promotion.promotionType, showRegister.value)
// })
// const formatTime = (start, end, type) => {
//   return +type !== 1 && end
//     ? `${i()(start).format('YYYY/MM/DD HH:mm:ss')} - ${i()(end).format('YYYY/MM/DD HH:mm:ss')}`
//     : `${i()(start).format('YYYY/MM/DD HH:mm:ss')} - ${t.$t('long_term')}`
// }
// const handleTime = (start, end, type) => {
//   if (+type !== 1 && end && start) {
//     const diff = end - start
//     return dateCount(diff)
//   }
//   return t.$t('long_term')
// }
// const dateCount = (diff) => {
//   const days = Math.floor(diff / 1000 / 3600 / 24)
//   const hours = Math.floor((diff / 1000 / 3600) % 24)
//   return hours === 0 ? `${days} days` : `${hours} hour ${days} days`
// }
const goCurrentPromo = () => {
  // promotionToMc(props.promotion.promotionType, setMcPage)
  close()
}
const close = () => {
  $modal.hide('promo-details')
}

</script>

<template>
  <div class="promo-details-modal PromoModal">
    <div class="modal-content">
      <div class="modal-body">
        <div class="modal-header">
          <div class="modal-info">
            <h5 class="modal-title">{{ promotion.title || promotion.name }}</h5>
          </div>
        </div>
        <div class="vhtml" v-html="promotion.content" />
      </div>

      <!-- <div v-if="showPromoMcBtn && isLogin" class="modal-footer">
        <button class="btn btn-gomc" type="button" @click="goCurrentPromo">
          {{ $t('go_promo') }}
        </button>
      </div> -->
    </div>
  </div>
</template>
