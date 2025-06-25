<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { chunk } from 'lodash'

const store = useStore()
const list = ref([])
const page = ref(1)
const select = ref(1)
const h = 9

const noticeProps = {
  name: 'notice',
  setup () {
    const select = ref(1)
    const page = ref(1)
    const list = ref([])
    const store = useStore()
    const noticeIndex = computed(() => store.state.home.noticeIndex)
    const publicNotice = computed(() => store.state.Public.notice)

    const s = (t) => {
      select.value = select.value === t ? 0.5 : t
    }

    const r = (e) => {
      const date = new Date(+e)
      return date.format('yyyy-MM-dd hh:mm:ss')
    }

    const c = () => {
      const n = chunk(publicNotice.value, h)
      const i = Math.ceil((select.value + 1) / h)
      const o = select.value - (i - 1) * h
      list.value = n
      page.value = i
      select.value = o
    }

    const l = (t) => {
      page.value = t
      select.value = 1
    }

    const u = (t) => {
      select.value = t
    }

    watch(noticeIndex, (t) => {
      if (t || t === 0) {
        select.value = t
        c()
      }
    }, { immediate: true })

    return {
      notice: publicNotice,
      unfold: s,
      formatTime: r,
      changePage: l,
      tabChange: u,
    }
  },
}

const NoticePopup = defineProps({
  ...noticeProps,
})
</script>

<template>
  <div class="announce-popup-container">
    <div class="popup-bg">
      <div class="popup-content">
        <div class="popup-main">
          <div class="left-wrap">
            <ul class="content-nav">
              <li
                v-for="(n, i) in list[page - 1]"
                :key="i"
                :class="{ active: select === i }"
                @click="tabChange(i)"
              >
                <i class="icon icon_notice" />
                <div class="nav-title">{{ n.title }}</div>
                <span class="item-arrow">
                  <svg-icon icon-class="common-arrow" />
                </span>
              </li>
            </ul>
            <div class="paginate-wrapper">
              <paginate
                v-model="page"
                :page-count="list.length"
                :page-range="1"
                :click-handler="changePage"
                :prev-text="''"
                :next-text="''"
                :container-class="'pagination-container'"
                :page-class="'page-item'"
                :page-link-class="'page-link-item'"
                :prev-class="'prev-item'"
                :prev-link-class="'prev-link-item'"
                :next-class="'next-item'"
                :next-link-class="'next-link-item'"
                :break-view-class="'break-view'"
                :break-view-link-class="'break-view-link'"
              />
            </div>
          </div>
          <div class="content-detail">
            <div class="content-title">{{ ((list[page - 1] || {})[select] || {}).title || '' }}</div>
            <div class="detail-box">
              <div class="detail-text vhtml" v-html="((list[page - 1] || {})[select] || {}).content || ''" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
