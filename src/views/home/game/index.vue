<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDraggable } from '@vueuse/core'
import { decodeFromBase64 } from '@/utils'
const route = useRoute()
const el = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 30, y: 30 },
  preventDefault: true,
  onMove: () => {
    isDragging.value = true
  },
  onEnd: () => {
    setTimeout(() => (isDragging.value = false))
  },
})
const url = computed(() => {
  const data = route.query.url as string
  if (!data) return ''
  const encode = decodeFromBase64(data || '')
  if (encode.startsWith('https:')) return encode
  return `data:text/html;charset=utf-8,${encodeURIComponent(encode)}`
})
const router = useRouter()
const onClock = () => {
  if (isDragging.value) {
    return
  }
  router.push({
    name: 'home',
  })
}
</script>

<template>
  <div class="game-iframe">
    <iframe v-if="url" :src="url" />
    <div
      ref="el"
      class="close"
      :style="style"
      @click="onClock"
    >
      <img src="@/assets/icons/activity/DailyTask/close.png" alt="">
    </div>
  </div>
</template>

<style scoped lang="scss">
.game-iframe {
  width: 100%;
  height: 100vh;
  .close {
    position: fixed;
    z-index: 100;
    top: 30px;
    left: 30px;
    img {
      width: 60px;
      height: 60px;
    }
  }
  iframe {
    display: block;
    border: 0;
    width: 100%;
    height: 94%;
  }
}
</style>
