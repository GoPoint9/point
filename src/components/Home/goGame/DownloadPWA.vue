<template>
  <div class="container">
    <div class="btn pwa-btn">
      <div class="text"><van-icon name="cross" color="white" @click="show = false" /> {{ $t('downloadMobileApp') }}</div>
      <div class="download" @click="download">Download</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getIcons, AwaitApiResult, isAndroid, partyUrl, getProjectName } from '@/utils'
import { useI18n } from 'vue-i18n'
import { getHomeData } from '@/api'
import { reactive, computed } from 'vue'
import { useSessionStorage } from '@vueuse/core'
const show = useSessionStorage('show-pwa-download', true)
let deferredPrompt: any = null
const { t: $t } = useI18n()
const PWA = reactive<{
  canIUse: boolean
  download: Function | null
}>({
  canIUse: false,
  download: null,
})

window.addEventListener(
  'beforeinstallprompt',
  (e) => {
    // console.log('beforeinstallprompt', e)
    // 防止 Chrome 67 及更早版本自动显示安装提示
    e.preventDefault()
    // 稍后再触发此事件
    deferredPrompt = e
    // 更新 UI 以提醒用户可以将 App 安装到桌面
    PWA.canIUse = true
  },
  { once: true }
)
PWA.download = function () {
  // 显示安装提示
  deferredPrompt.prompt().then((choiceResult: any) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt')
      PWA.canIUse = false
    } else {
      console.log('User dismissed the A2HS prompt')
    }
  })
}

const version = 1.1
let currency = getProjectName() || ''
currency = currency?.toLowerCase()
const iconSrc = computed(() => getIcons('common', 'downloadPWA' + currency))
if (/[\u4e00-\u9fa5]+/.test(currency)) {
  currency = 'vxth'
}
const link = document.querySelector('link[rel=\'manifest\']')
link?.setAttribute('href', '/manifest.' + currency + '.json?version=' + version)

async function download () {
  if (!show.value) return
  if (PWA.canIUse) {
    PWA.download && PWA.download()
  } else {
    const res = await AwaitApiResult(getHomeData())
    if (!res) return
    partyUrl(isAndroid ? res.data.androidUrl : res.data.iosUrl)
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  z-index: 10;
}
.btn {
  width: 100%;
  height: 60px;
  background: rgba(0, 6, 40, 0.9);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 5px;
  color: #fff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  overflow: hidden;

  .text {
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;
    color: var(--text_color_L4, #e4e7ed);
    margin-left: 10px;
    font-family: Inter;
    gap: 15px;
    max-width: fit-content;
  }
  .download {
    border-radius: 10px;
    background: var(--main_gradient-color);
    display: inline-flex;
    height: 42px;
    padding: 16px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    color: var(--text_color_L4, #e4e7ed);
    text-align: center;
    font-family: Inter;
    font-size: 18px;
    font-style: italic;
    font-weight: 600;
  }

  .van-badge__wrapper van-icon van-icon-cross {
    width: 20px;
    height: 20px;
  }
}
</style>
