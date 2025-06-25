import { GlobalStore, useUserStore } from '@/stores'
import type { PickerChangeEventParams } from 'vant'
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

let mounted: boolean = false

export function useMounted (fn: Function) {
  onMounted(async () => {
    if (mounted) return
    await fn()
    mounted = true
  })
}

export interface VerifyItem {
  text: string
  title: string
  value: string

  [key: string]: any
}

// 绑定银行卡安全验证
// 后续可拆分其他绑定功能
export function useBank () {
  const globalStore = GlobalStore()
  const userStore = useUserStore()
  const { t } = useI18n()
  const store = reactive({
    active: 0,
  })
  const verifyModal = ref(false)
  const userInfo = computed(() => globalStore.getUserInfo)
  // 是否开启忘记密码开关
  const isOpenForgetPasswordSMSState = computed(
    () => userStore.isOpenForgetPasswordSMSState || userStore.isOpenForgetPasswordEmailState
  )
  // 谷歌验证个人开启
  const isgoogle = computed(() => userInfo.value?.verifyMethods?.google !== '0')
  // 短信验证个人开启
  const issmssend = computed(() => userInfo.value?.verifyMethods?.mobile !== '')
  // 邮箱验证个人开启
  const isemailsend = computed(() => userInfo.value?.verifyMethods?.email !== '')
  //
  const isOpenAddBankCardOpenEmail = computed(() => userStore.isOpenAddBankCardOpenEmail)
  // 全局开启邮箱并且用户也开启
  const isOpenWithdrawEmail = computed(() => isemailsend.value && userStore.isOpenAddWithdrawEmailState)

  // 全局开启短信并且用户也开启
  const isOpenWithdrawSms = computed(() => userStore.isOpenAddWithdrawSMSState && issmssend.value)
  // 开启密码验证 当其他三种都关闭情况
  // const isOpenPwd=computed(()=>[isgoogle.value, isOpenWithdrawEmail.value, isOpenWithdrawSms.value,].every((item)=>!item))
  // 是否有开启验证方式 包含短信 谷歌验证码邮箱其中一项
  const isOpenWithdraw = computed(() => {
    return [isgoogle.value, isOpenWithdrawEmail.value, isOpenWithdrawSms.value].some((item) => item === true)
  })

  // 验证列表
  // 密码验证作为兜底验证 当谷歌 短信 邮箱 都未开启时存在
  const verifyList = computed(() => {
    const data: VerifyItem[] = []
    if (isOpenWithdrawSms.value) {
      data.push({ text: t('phoneverification'), title: t('SMSVerify'), value: 'mobile' })
    }
    if (isOpenWithdrawEmail.value) {
      data.push({ text: t('emailverification'), title: t('EmailVerify'), value: 'email' })
    }
    if (isgoogle.value) {
      data.push({ text: t('googleverificate'), title: t('googleVerify'), value: 'google' })
    }
    // if (isOpenPwd.value) {
    //     data.push({text: t('pwdVerify'), title: t('pwdVerify'), value: 'pwd'})
    // }
    return data
  })

  // 当前选中的验证
  const verifyActive = computed(() => verifyList.value[store.active] || ({} as VerifyItem))

  const openVerify = () => {
    verifyModal.value = true
  }
  const onSelectVerify = (data: PickerChangeEventParams) => {
    store.active = data.selectedIndexes[0]
    verifyModal.value = false
  }
  useMounted(async () => {
    await userStore.getRegisterState()
    userStore.getUserInfo({ signature: globalStore.token })
  })

  return {
    verifyList,
    verifyActive,
    verifyModal,
    isOpenWithdraw,
    isOpenForgetPasswordSMSState,
    isOpenAddBankCardOpenEmail,
    userInfo,
    openVerify,
    onSelectVerify,
  }
}
