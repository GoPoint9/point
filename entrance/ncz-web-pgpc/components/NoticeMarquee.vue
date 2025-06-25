<!-- NoticeMarquee.vue -->
<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useNotice } from '@/hooks'

import { Vue3Marquee } from 'vue3-marquee'

const $modal = inject('$modal')
const { getNotice, noticeList, setNoticeIndex } = useNotice(false)
onMounted(getNotice)

const marqueeDuration = ref(330)
const latestAnnouncements = computed(() => {
  if (noticeList.value.length === 0) return ''
  const [{ siteMessage } = {}] = noticeList.value
  return siteMessage
})

watch(
  () => latestAnnouncements.value,
  siteMessage => {
    if (siteMessage.length <= 100) {
      marqueeDuration.value = 10
    } else {
      marqueeDuration.value = siteMessage.length / 5
    }
  }
)

const onOpenNoticeModal = index => {
  setNoticeIndex(index)
  $modal.show('noticeModal')
}
</script>

<template>
  <div class="notice-marquee-container">
    <div class="notice-marquee-content">
      <div class="notice-main">
        <div class="notice-icon">
          <span class="speaker" />
        </div>
        <div class="marquee_box">
          <Vue3Marquee :pause-on-hover="true" :duration="100">
            <ul class="notice_list">
              <li v-for="(i, index) in noticeList" :key="index" @click="onOpenNoticeModal(index)">{{ i.siteMessage }}</li>
            </ul>
          </Vue3Marquee>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.marquee_box {
  overflow: hidden;
}

.notice_list li {
  height: 100%;
  display: inline-block;
  line-height: 41.8px;
  margin-right: 70px;
  cursor: pointer;
}
</style>
