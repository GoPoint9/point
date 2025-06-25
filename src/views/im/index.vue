<template>
  <div id="imPage">
    <NavBar class="white">
      <template #left>
        <img :src="projectIcon" alt="">
      </template>
      <template #right>
        <div class="nav-right">
          <svg-icon name="wallet2" />
          <div class="money">
            <div class="text">{{ $t('balance') }}</div>
            <div>{{ currency(Amount) }}</div>
          </div>
        </div>
      </template>
    </NavBar>
    <iframe
      ref="myFrame"
      :src="iframeUrl"
      width="100%"
      class="IM"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHome } from '@/hooks'
import { currency, AwaitApiResult, getIconsPublic } from '@/utils'
import { EnterChatRoom, GetBalance } from '@/api'
import { GlobalStore } from '@/stores'

const { projectIcon } = useHome()
const router = useRouter()
const myFrame = ref()
const iframeUrl = ref('')
const globalStore = GlobalStore()
const userInfo = globalStore.getUserInfo
const avatarUrl = ref(getIconsPublic('main/Avatar', userInfo.userPhoto))
const domain1 = `https://${window.location.hostname}`
// 获取不含参数的域名部分
const domain = computed(() => {
  // 使用 URL 对象来解析 URL
  const url = new URL(iframeUrl.value)
  return url.origin
})
// 钱包金额
const Amount = ref(0)
/**
 * @description:
 * @param {*} isShowT
 * @return {*}
 */
const getWinsUserAmount = async (isShowT: boolean = true) => {
  const res = await AwaitApiResult<any>(GetBalance())
  if (res) {
    Amount.value = res?.data.amount || 0
  }
}

const handleMessage = (event: any) => {
  // 检查消息的来源域
  if (domain.value == event.origin) {
    // 处理来自特定域名的消息
    console.log('Received message from allowed domain:', event.data)
    const data = event.data.data
    if (data.type == 'onload') {
      console.log('已经加载完成')
    } else if (data.type == 'back') {
      onClickLeft()
    }
  }
}

// 返回上一页
const onClickLeft = () => {
  router.go(-1)
}
// 发送消息
const postMessage = (message: any) => {
  myFrame.value.contentWindow.postMessage(JSON.stringify(message), iframeUrl.value)
}
// 获取聊天室登录信息
const getImInfo = async () => {
  const res = await EnterChatRoom({ faceUrl: domain1 + avatarUrl.value })
  if (res.data) {
    const { roomId, userSig, rule, sdkAppID, roomUserId } = res.data
    iframeUrl.value = `https://imsit.22889.club/?userSig=${userSig}&group=${encodeURIComponent(
      roomId
    )}&sdk=${sdkAppID}&userId=${encodeURIComponent(roomUserId)}`
    // iframeUrl.value = `http://localhost:5200/?userSig=${userSig}&group=${encodeURIComponent(roomId)}&sdk=${sdkAppID}&userId=${encodeURIComponent(roomUserId)}`;
  }
}
// 监听 message 事件
window.addEventListener('message', handleMessage)
onMounted(() => {
  getImInfo()
  getWinsUserAmount()
})
onUnmounted(() => {
  // 移除 message 事件监听器，防止内存泄漏
  window.removeEventListener('message', handleMessage)
})
</script>
<style lang="scss" scoped>
#imPage {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  .IM {
    width: 100%;
    flex: 1;
  }

  .navbar {
    &__content {
      &-left {
        img {
          height: 80%;
        }
      }

      &-right {
        svg {
          width: 48px;
        }
      }
    }
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 20px;
    svg {
      width: 48px;
      height: 48px;
    }
    .money {
      color: var(--main-color);
      .text {
        color: var(--text_color_L2);
      }
    }
  }
}
</style>
