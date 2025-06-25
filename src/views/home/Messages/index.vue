<template>
  <div class="sysMessage__container">
    <NavBar
      :title="$t('notifications')"
      background-color="#f7f8ff"
      left-arrow
      @click-left="onClickLeft"
    />
    <List
      ref="msgWrapperRef"
      v-model:list="messageData"
      v-model:page-query="messageDataQuery"
      :api="getMessages"
      :distance="100"
      :is-auto-load="isAutoLoad"
    >
      <template #content>
        <div v-for="item in messageData" :key="item.messageID" class="sysMessage__container-msgWrapper__item">
          <div class="sysMessage__container-msgWrapper__item-title">
            <!-- <component :is="item.state === 0 ? icons.messageIconRed : icons.messageIconIsRead" /> -->
            <div>
              <svg-icon class="svg" :name="item.state === 0 ? 'messageIconRed' : 'notification'" />
              <span>{{ formatString(item.title, 20) }}</span>
            </div>
            <svg-icon class="svg" name="messageGarbage" @click="onDeleteClick(item)" />
            <!-- <component
							:is="icons.messageGarbage"
							@click="($event: Event) => { $event.stopPropagation(); onDeleteClick(item) }"
						/> -->
          </div>
          <div class="sysMessage__container-msgWrapper__item-time">
            {{ item.addTime }}
          </div>
          <div class="sysMessage__container-msgWrapper__item-content">
            {{ item.messages }}
          </div>
        </div>
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
import { getMessages, setAllMessageState, setMessageState } from '@/api'
import List from '@/components/common/List.vue'
import { GlobalStore, useHomeStore, useCommonStore } from '@/stores'
import type { ResMessageList, UserInfo } from '@/types/api'
import { AwaitApiResult, formatString, getIcons } from '@/utils'
import { showConfirmDialog } from 'vant'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t: $t } = useI18n()

const { setLoading } = useCommonStore()
const msgWrapperRef = ref()
const globalStore = GlobalStore()
const router = useRouter()
const isAutoLoad = ref(false)
const messageData = ref<ResMessageList[]>([])
const homeStore = useHomeStore()

const messageDataQuery = ref({
  pageSize: 25,
})
// const icons = {
// 	readAllIcon: defineAsyncComponent(() => import('@/svg/home/messageReadAll.vue')),
// 	messageIconRed: defineAsyncComponent(() => import('@/svg/home/messageIconRed.vue')),
// 	messageIconIsRead: defineAsyncComponent(() => import('@/svg/home/messageIconIsRead.vue')),
// 	messageGarbage: defineAsyncComponent(() => import('@/svg/home/messageGarbage.vue'))
// }

function onClickLeft () {
  router.back()
}
// 全部已读
async function readAll () {
  const homeStore = useHomeStore()
  // if (homeStore.isRead) return
  await setAllMessageState({
    state: 1, // 1已读 2删除
  })
    .then((res) => {
      if (res) {
        homeStore.setReadState(true)
      }
    })
    .catch((e) => {})
}
// 删除通知
function onDeleteClick (item: ResMessageList) {
  showConfirmDialog({
    title: $t('warning'),
    message: $t('warningTxt1'),
  }).then(async () => {
    const res: ObjResNull<ListRes<ResMessageList>> = await AwaitApiResult(
      setMessageState({
        messageID: item.messageID,
        state: 2,
      })
    )

    if (res) {
      const messagelist = messageData.value
      messageData.value = messagelist.filter((i) => i.messageID !== item.messageID)
    }
  })
}

const userInfo = globalStore.getUserInfo as UserInfo
onMounted(async () => {
  setLoading(true)
  await readAll()
  setLoading(false)
  msgWrapperRef.value.resetRefresh()

  // 设置未读数为0
  userInfo.unRead = 0
  globalStore.setUserInfo({
    ...userInfo,
  })
  homeStore.setReadState(true)
})
</script>
<style lang="scss" scoped>
.sysMessage__container {
  font-family: 'Inter', sans-serif;
  padding: 24px;

  :deep(.navbar) {
    .navbar__content {
      .navbar__content-right {
        display: flex;
        align-items: center;

        svg {
          width: 44px;
          height: 44px;
          margin-right: 5px;
        }

        span {
          color: var(--text_color_L2);
          font-size: 24px;
        }
      }
    }
  }

  &-msgWrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow: hidden;
    overflow-y: scroll;

    &__item {
      /* height: 200px; */
      padding: 20px;
      border-radius: 5px;
      background: var(--bg_color_L2);

      &-title {
        display: flex;
        align-items: center;
        color: var(--text_color_L1);
        > div {
          display: flex;
          align-content: center;
        }
        .svg {
          width: 48px;
          height: 48px;
          &:last-of-type {
            width: 36px;
            height: 36px;
            margin-left: auto;
          }
        }

        span {
          margin-left: 7px;
          font-size: 30px;
          font-weight: 600;
        }
      }

      &-time {
        margin-block: 8px 28px;
        color: var(--text_color_L3);
        font-size: 24px;
        font-weight: 400;
      }

      &-content {
        color: var(--text_color_L2);
        font-size: 24px;
        font-weight: 400;
        word-break: break-word;
      }

      & + div {
        margin-top: 24px;
      }
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
