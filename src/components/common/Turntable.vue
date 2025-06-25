<template>
  <div
    v-if="store.getOpenTurntable"
    class="turntable-lottery trntableIcon2"
    :class="{ 'lottery-bottom': store.getBigTurntableLink }"
    @click="router.push({ name: 'Turntable' })"
  />
  <div
    v-if="store.getBigTurntableLink"
    ref="turntableId"
    class="turntable turntableIcon1"
    @click="onToTurntable"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { SettingStore } from '@/stores'
const router = useRouter()
const turntableId = ref()
const store = SettingStore()
function onToTurntable () {
  if (!store.getBigTurntableLink) return
  window.open(store.getBigTurntableLink)
}
</script>
<style lang="scss">
.turntable {
  position: fixed;
  bottom: 460px;
  right: 15px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  z-index: 100; //层级需要高于头部导航栏
  touch-action: none;
  background: url('@/assets/icons/home/turntable_icon.png') no-repeat center/cover;
}
.turntable-lottery {
  position: fixed;
  bottom: 460px;
  right: 15px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  z-index: 100; //层级需要高于头部导航栏
  touch-action: none;
  background: url('@/assets/icons/activity/Turntable/turntable.png') no-repeat center/cover;
  &.lottery-bottom {
    bottom: 620px;
  }
}
</style>
