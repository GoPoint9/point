<template>
  <div class="notification-container">
    <NavBar :title="$t('notification')" left-arrow @click-left="router.go(-1)" />

    <List
      ref="listRef"
      v-model:list="messageData.list"
      class="sysMessage__container-msgWrapper"
      :page-query="{}"
      :is-auto-load="true"
      :api="getSiteMessageList"
      :distance="250"
    >
      <template #content>
        <div v-for="item in messageData.list" :key="item.title" class="notification-container-content">
          <div class="notification-container-content-title">
            <svg-icon name="notificationIcon" />
            <span>{{ item.title }}</span>
          </div>
          <div class="notification-container-content-desc">{{ item.siteMessage }}</div>
          <h5>{{ item.addtime }}</h5>
        </div>
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
import { getSiteMessageList } from '@/api'
import List from '@/components/common/List.vue'
import type { ResSiteMessageList } from '@/types/api'
import { getIcons } from '@/utils'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// 公告列表
const messageData = ref<ResSiteMessageList>({
  list: [],
  pageNo: 0,
  totalPage: 0,
  totalCount: 0,
})

const listRef = ref<
  HTMLElement & {
    resetRefresh:() => void
  }
>()
</script>

<style lang="scss" scoped>
.notification-container {
  padding: 0 24px 30px;

  &-content {
    //height: 330px;
    min-height: 200px;
    background: var(--bg_color_L2);
    border-radius: 20px;
    padding: 26px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 24px;
    color: var(--text_color_L1);

    //margin-top: 130px;
    &-desc {
      margin-top: 24px;
      word-break: break-all;
      color: var(--text_color_L2);
    }
    &-title {
      display: flex;
      justify-content: flex-start;
      span {
        font-size: 32px;
        color: var(--text_color_L1);
      }

      svg {
        min-width: 50px;
        min-height: 50px;
        margin-inline-end: 12px;
      }
    }

    &-detail {
      height: 100%;
      font-size: 26px;
      line-height: 50px;
      color: var(--text_color_L2);
      padding: 30px 45px 30px 60px;
    }

    h5 {
      margin-top: 26px;
      font-size: 24px;
      color: var(--text_color_L3);
    }
  }

  &-empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
