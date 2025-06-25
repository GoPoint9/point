import { ref } from 'vue'
import { getProjectName } from '@/utils'

const PWA = ref<{
  canIUse: boolean
  download: Function | null
}>({
  canIUse: false,
  download: null,
})
const deferredPrompt = ref<any | null>(null)
const isShowDwa = ref(true)

export const usePwaDownload = () => {
  const version = 1.1
  const ua = navigator.userAgent.toLowerCase()
  let currency = getProjectName() || ''
  currency = currency?.toLowerCase()
  if (/[\u4e00-\u9fa5]+/.test(currency)) {
    currency = 'vxth'
  }
  const link = document.querySelector('link[rel=\'manifest\']')
  link?.setAttribute('href', '/manifest.' + currency + '.json?version=' + version)
  if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1) {
    if ((navigator as any).standalone) {
      isShowDwa.value = false
    } else {
      isShowDwa.value = true
    }
  } else {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      isShowDwa.value = false
    } else {
      isShowDwa.value = true
    }
  }

  window.addEventListener(
    'beforeinstallprompt',
    (e) => {
      // console.log('beforeinstallprompt', e)
      // 防止 Chrome 67 及更早版本自动显示安装提示
      e.preventDefault()
      // 稍后再触发此事件
      deferredPrompt.value = e
      // 更新 UI 以提醒用户可以将 App 安装到桌面
      PWA.value.canIUse = true
    },
    { once: true }
  )

  PWA.value.download = function () {
    // 显示安装提示
    deferredPrompt.value.prompt().then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
        PWA.value.canIUse = false
      } else {
        console.log('User dismissed the A2HS prompt')
        location.reload()
      }
    })
  }
  return { PWA, deferredPrompt, isShowDwa }
}
