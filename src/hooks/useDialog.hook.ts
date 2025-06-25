import { computed, reactive, ref } from 'vue'
import { useAsyncQueue } from '@vueuse/core'
import { useActive } from '@/components/common/use'
import { useRoute } from 'vue-router'
import { AwaitApiResult } from '@/utils'
import { GetLoadedSetting, getReceiveReturnAwards, getSiteMessage } from '@/api'
import { GlobalStore } from '@/stores'
import { showSuccessToast } from 'vant'
import { useI18n } from 'vue-i18n'
interface DialogStore {
  // 公告弹窗
  prompt: boolean
  // 超级大奖弹窗
  laundry: boolean
  // 邀请奖励
  invite: boolean
  // 首冲
  firstSave: boolean
  // 老用户
  oldUser: boolean
  rebateAmount: number
  returnAwards: number
  isARPay: boolean
}

const store = reactive<DialogStore>({
  prompt: false,
  laundry: false,
  invite: false,
  firstSave: false,
  oldUser: false,
  rebateAmount: 0,
  returnAwards: 0,
  isARPay: false,
})
type Keys = keyof Omit<DialogStore, 'rebateAmount' | 'returnAwards'>
const dialog: Map<Keys, (value?: any) => void> = new Map()
const promptContent = ref('')
const controller = new AbortController()
export function useDialog () {
  const route = useRoute()
  const { t } = useI18n()
  const user = GlobalStore()
  const { ActiveSotre, setShowFirstSaveDialog } = useActive()
  const createDialog = (key: Keys) => {
    return () =>
      new Promise((resolve) => {
        dialog.set(key, resolve)
        store[key] = true
      })
  }
  const closeDialog = (key: Keys) => {
    return (isStop?: boolean) => {
      const cb = dialog.get(key)
      if (!cb) return
      if (key === 'prompt') sessionStorage.setItem('promptShowCount', '1')
      if (key === 'firstSave' && ActiveSotre.value.isShowFirstSaveDialog) {
        store[key] = true
      } else {
        store[key] = false
      }
      if (['prompt', 'laundry'].includes(key)) sessionStorage.setItem(`pop_${key}`, '1')
      cb()
      if (isStop === true) controller.abort()
    }
  }
  const closeInvite = closeDialog('invite')
  const closePrompt = closeDialog('prompt')
  const closeLaundry = closeDialog('laundry')
  const closeFirstSave = closeDialog('firstSave')
  const closOldPrompt = closeDialog('oldUser')
  const showFirstSave = computed(() => {
    const RouteNameList = ['activity', 'home', 'main', 'wallet', 'promotion']
    return RouteNameList.includes(route.name as string) && store.firstSave
  })
  const onReturnAwards = async () => {
    const data = await AwaitApiResult(getReceiveReturnAwards())
    if (data) {
      store.returnAwards = 0
      showSuccessToast(t('receiveSuccess'))
    }
    closOldPrompt()
  }
  const openAll = async () => {
    store.firstSave = false
    store.prompt = false
    store.invite = false
    store.laundry = false
    store.oldUser = false
    dialog.clear()
    const token = localStorage.getItem('token')
    const promptShow = sessionStorage.getItem('pop_prompt')
    const promptLaundry = sessionStorage.getItem('pop_laundry')
    let isPrizeReward = false
    if (token) {
      const result = await AwaitApiResult(GetLoadedSetting())
      const data = result.data || {}
      setShowFirstSaveDialog(data?.needPopupFirstRecharge || false)
      isPrizeReward = data?.isExistGrandAward || false
      store.rebateAmount = data?.children_Lv_RebateAmount_Yesterday || 0
      store.returnAwards = data?.returnAwards || 0
      store.isARPay = data?.isARPay
      sessionStorage.setItem('ar_pay', `${data?.isARPay ? 1 : 0}`)
      if (route.name == 'home' && !promptShow) {
        await GetSiteMessage()
      }
    }
    const list: any[] = []
    if (!promptShow && token && promptContent.value && route.name == 'home') {
      list.push(createDialog('prompt'))
    }

    if (ActiveSotre.value.isShowFirstSaveDialog) {
      list.push(createDialog('firstSave'))
    }
    if (user.getUserInfo.isPopupCommissionSwitch == '1' && !promptShow && store.rebateAmount > 0 && token) {
      list.push(createDialog('invite'))
    }
    if (!promptLaundry && token && isPrizeReward) {
      list.push(createDialog('laundry'))
    }
    if (store.returnAwards > 0) {
      list.push(createDialog('oldUser'))
    }
    useAsyncQueue(list, {
      signal: controller.signal,
    })
  }

  async function GetSiteMessage () {
    const res = await AwaitApiResult(getSiteMessage())
    if (res.data) {
      promptContent.value = res.data
    }
  }

  return {
    store,
    closeInvite,
    closePrompt,
    closeLaundry,
    closeFirstSave,
    showFirstSave,
    closOldPrompt,
    onReturnAwards,
    openAll,
    promptContent,
  }
}
