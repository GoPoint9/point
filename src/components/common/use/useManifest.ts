import { reactive } from 'vue'
import { getProjectName } from '@/utils'
export const PWA = reactive<{
  canIUse: boolean
  download: Function | null
}>({
  canIUse: false,
  download: null,
})
;(function () {
  let deferredPrompt: any
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js').then(() => {
      console.log('Service Worker Registered')
    })
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    // console.log('beforeinstallprompt', e)
    // 防止 Chrome 67 及更早版本自动显示安装提示
    e.preventDefault()
    // 稍后再触发此事件
    deferredPrompt = e
    // 更新 UI 以提醒用户可以将 App 安装到桌面
    PWA.canIUse = true
  })
  PWA.download = function () {
    // 显示安装提示
    deferredPrompt.prompt()
    // 等待用户反馈
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
        PWA.canIUse = false
      } else {
        console.log('User dismissed the A2HS prompt')
      }
    })
  }
})()
;(function () {
  const version = 1.1
  let currency = getProjectName() || ''
  if (/[\u4e00-\u9fa5]+/.test(currency)) {
    currency = 'vxth'
  }
  const link = document.querySelector('link[rel=\'manifest\']')
  link?.setAttribute('href', '/manifest.' + currency?.toLowerCase() + '.json?version=' + version)
})()
