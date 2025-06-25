import { useEventBus } from '@vueuse/core'
import { isHybridApp, isAnalysisHybridApp, openAnalysisHybrid, openHybrid } from '@/utils/jsBridge'
type TriggerEvent = 'login' | 'register' | 'purchase' | 'first_purchase' | 'recharge'
// 自定义事件
const mapEvent: any = {
  login: 'Login',
  register: 'Register',
  purchase: 'Purchase',
  first_purchase: 'FirstPurchase',
  recharge: 'Recharge',
}
// fb标准事件
const fbEvent: any = {
  login: 'FbLogin',
  register: 'CompleteRegistration',
  recharge: 'AddToCart',
  first_purchase: 'AddToCart',
  purchase: 'Purchase',
}

const bus = useEventBus<TriggerEvent, any>('gtag')

const isGoogle = () => {
  return 'dataLayer' in window
}
const isFacebook = () => {
  return 'fbq' in window
}
const banfbSelf = Boolean(import.meta.env.VITE_BAN_FBSELF === '1')
bus.on((event, payload) => {
  if (isGoogle()) {
    window.gtag('event', event, payload)
  }
  if (isFacebook()) {
    if (!banfbSelf) window.fbq('track', mapEvent[event], payload)
    window.fbq('track', fbEvent[event], payload)
  }
  try {
    if (isAnalysisHybridApp()) {
      openAnalysisHybrid(event, payload)
    } else {
      if (isHybridApp()) openHybrid(event, payload)
    }
    if (!window.android || !window.android.onEvent) return
    if (payload) {
      window.android.onEvent(event, JSON.stringify(payload))
    } else {
      window.android.onEvent(event)
    }
  } catch (e) {
    console.log(e, 'error')
  }

  console.log(event)
})
export function useTrigger () {
  const onTriggerLogin = (data: any) => {
    console.log('onTriggerLogin', data)
    bus.emit('login', { content_name: data })
  }
  const onTriggerRegister = (data: any) => {
    console.log('register', data)
    bus.emit('register', { content_name: data })
  }
  const onTriggerRecharege = (data: any) => {
    bus.emit('recharge', {
      currency: import.meta.env.VITE_BASE_DOLLARSIGN || '',
      value: data.amount || 0,
      content_name: (localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).userId : '') || '',
    })
  }

  const onTriggerPurchase = (data: any, isFirst: boolean) => {
    bus.emit(isFirst ? 'first_purchase' : 'purchase', {
      currency: import.meta.env.VITE_BASE_DOLLARSIGN || '',
      value: 0,
      content_name: (localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).userId : '') || '',
    })
  }
  return {
    onTriggerLogin,
    onTriggerRegister,
    onTriggerPurchase,
    onTriggerRecharege,
  }
}
