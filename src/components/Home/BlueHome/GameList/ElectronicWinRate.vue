<!--
 * @Author: Seven
 * @Date: 2024-03-19 14:04:59
 * @LastEditTime: 2024-03-19 14:05:00
 * @LastEditors: Seven
 * @Description:
-->
<script setup lang="ts">
import { SettingStore } from '@/stores'
import { computed } from 'vue'

const store = SettingStore()
const image = computed(() => store.winRate.electronicWinRateImgUrl || '')
const isShow = computed(() => {
  if (store.winRate.isShowElectronicWinRateExternalLink && image.value) return true
  return false
})
const onJump = () => {
  if (!store.winRate.electronicWinRateExternalLink) return
  window.open(store.winRate.electronicWinRateExternalLink)
}
</script>

<template>
  <div v-if="isShow" class="WinRate" @click="onJump">
    <img v-lazy="image" alt="">
  </div>
</template>

<style scoped lang="scss">
.WinRate {
  width: 100%;
  min-height: 128px;
  margin-bottom: 30px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
