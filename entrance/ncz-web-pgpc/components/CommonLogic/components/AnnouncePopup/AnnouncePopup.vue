<script setup lang="ts">
import { Pagination as VantPagination } from 'vant'
import { chunk } from 'lodash'

import { useNotice } from '@/hooks'

interface Content {
  title: string
  content: string
  // dateStr: string
  // type: number
  // sort: number | null
}
const props = defineProps({
  // 當前元件名稱
  name: {
    type: String,
    default: 'publicModal',
  },
  // 列表資料
  popupList: {
    type: Array,
    required: true,
  },
  // 當前選中的選項
  // noticeIndex: {
  //   type: Number,
  //   default: 0,
  // },
})

const PAGE_COUNT = 9
const pageState = reactive({
  select: 0, // 當前選中的訊息
  page: 1,
})

const publicityList = computed(() => chunk(props.popupList, PAGE_COUNT))

// 當前頁資料
const currentPageList = computed(() => {
  const currentPageIndex = pageState.page - 1
  const result = unref(publicityList)[currentPageIndex]
  if (!result) console.error(' [currentPageList] Check it!')
  return result || []
})
// 當前內容
const currentContent = computed<Content>(() => {
  const currentContent = unref(currentPageList)[pageState.select] || {}
  const {
    // dateStr = '',
    title = '',
    content = '',
    siteMessage, // 跑馬燈是這個值
  } = currentContent

  return {
    // dateStr,
    title,
    content: content || siteMessage,
  }
})

const { noticeIndex, setNoticeIndex } = useNotice(false)
const onContentChange = (index: number) => {
  pageState.select = index
}
const onPageChange = (page: number) => {
  setNoticeIndex(0) // NOTE: [跑馬燈] 模式: 切換頁面將 noticeIndex 歸零
  pageState.select = 0
  pageState.page = page
}

// const toPromotion = (item: any) => {
//   setMcPage('rewardCenter')
//   hide('publicModal')
// }

watch(
  noticeIndex,
  newIndex => {
    if (newIndex) {
      pageState.select = newIndex
      updatePagination()
    }
  },
  { immediate: true }
)
function updatePagination () {
  const selectedIndex = pageState.select // 當前選中的索引
  const currentPage = Math.ceil((selectedIndex + 1) / PAGE_COUNT) // 計算當前頁碼
  const indexInPage = selectedIndex - (currentPage - 1) * PAGE_COUNT // 計算選中索引在當前頁的位置
  pageState.page = currentPage // 更新當前頁碼
  pageState.select = indexInPage // 更新當前頁內的索引
}
</script>

<template>
  <div class="announce-popup-container">
    <div class="popup-bg">
      <div class="popup-title">{{ $t("in_increase_announcement") }}</div>
      <div class="popup-content">
        <div class="popup-main">
          <div class="left-wrap">
            <ul class="content-nav">
              <li
                v-for="(item, index) in currentPageList"
                :key="index"
                :class="{ active: pageState.select === index }"
                @click="onContentChange(index)"
              >
                <i class="icon icon_notice" />
                <div class="nav-title">{{ item.title }}</div>
                <span class="item-arrow">
                  <svg-icon name="common-arrow" />
                </span>
              </li>
            </ul>

            <VantPagination
              v-model="pageState.page"
              class="paginate-wrapper"
              :total-items="popupList.length"
              :show-page-size="publicityList.length"
              @change="onPageChange"
            >
              <template #prev-text>
                <!-- <svg-icon name="common-arrow" /> -->
                <div class="prev-item"><span class="prev-link-item" /></div>
              </template>
              <template #next-text>
                <!-- <svg-icon name="common-arrow" /> -->
                <div class="next-item"><span class="next-link-item" /></div>
              </template>
              <template #page="{ text }">{{ text }}</template>
            </VantPagination>
          </div>

          <div class="content-detail">
            <div class="content-title">
              {{ currentContent.title }}
              <!-- 時間 -->
              <!-- <span style="font-size: 14px; color: #aaa">{{ currentContent.dateStr }}</span> -->
            </div>
            <div class="detail-box">
              <div class="detail-text vhtml" v-html="currentContent.content" />
            </div>

            <!-- 競品。看來沒用到 -->
            <!-- <div class="notice_footer">
              <button
                v-if="currentContent.promotionType"
                class="btn_promo hover"
                @click="toPromotion(currentContent)"
              >
                {{ $t("go_promo") }}
              </button>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '@entrance/ncz-web-pgpc/paginate.scss' as *;
</style>
