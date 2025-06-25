import { defineStore } from 'pinia'
import { GetUserInfo, login, Register, RegisterState } from '@/api'
import { GlobalStore, SettingStore, useWalletStore, useCommonStore } from '@/stores'
import type { RegisterReq, ResRegisterState, UserState } from '@/types/api'
import { AwaitApiResult, fixMsg, windowToPath } from '@/utils'
import axios from 'axios'
import { useTrigger } from '@/hooks'

import '@/plugins/md5.min.js'

export const useUserStore = defineStore({
  id: 'userStore',

  state: (): UserState => ({
    currentView: 'SignIn',
    userForm: {
      number: '',
      password: '',
      verify: '',
      rePassword: '',
      invitation: '',
      numberType: '',
      email: '',
      remember: false,
      termAndPolicy: false,
      vCode: '',
      logintype: '',
      rememberpwd: false,
    },
    rPwdForm: {
      number: '',
      numberType: '',
      email: '',
      verify: '',
      password: '',
      rePassword: '',
    },
    ARIP: '',
    numberTypes: [],
    countDown: 0,
    countEmailDown: 0,
    remember: false,
    messageDetail: {} as UserState['messageDetail'],
    isShowSMS: false, // 是否开放短信注册 取值字段：registerSMSState
    isRegisterState: false, // 是否开注册 取值字段：registerState
    isAddBankCardSMS: false, // 是否开启银行卡短信验证 取值字段：isOpenAddBankCardSMS
    isOpenForgetPasswordSMSState: false, // 是否开启忘记密码短信开关 取值字段：smsForgetPasswordState
    isOpenForgetPasswordEmailState: false, // 是否开启邮箱开关
    isOpenRegisterEmailState: false,
    isOpenRegisterSMSState: false,
    isOpenCaptcha: false, // 是否开登陆启图片验证
    isOpenRegisterCaptcha: false, // 是否开启注册图片验证
    isOpenAddWithdrawEmailState: false, // 银行卡手机提现验证码处理
    isOpenAddWithdrawSMSState: false, // 银行卡邮件提现验证码处理,
    isOpenAddBankCardOpenEmail: false, // 绑定银行卡是否展示邮件
    isOpenExternalAccount: false,
    state: null,
    isOpenRegisterSMS: false,
    isOpenRegisterEmail: false,
  }),
  getters: {
    getCurrentView: state => state.currentView,
    getUserForm: state => state.userForm,
    getNumberTypes: state => state.numberTypes,
    getMessagesDetail: (state): UserState['messageDetail'] => state.messageDetail,
  },

  actions: {
    setCurrentView (view: string) {
      this.currentView = view
    },

    setUserForm (form: UserState['userForm']) {
      this.userForm = form
    },

    setNumberTypes (types: string[]) {
      this.numberTypes = types
    },
    setTermAndPolicy (v: boolean) {
      this.userForm.termAndPolicy = v
    },
    setNumberType (type: string) {
      this.userForm.numberType = type
      this.rPwdForm.numberType = type
    },

    setCountDown (count: number) {
      this.countDown = count
    },
    setCountEmailDown (count: number) {
      this.countEmailDown = count
    },
    setMessageDetail (detail: UserState['messageDetail']) {
      this.messageDetail = detail
    },
    loginout () {
      localStorage.removeItem('tokenHeader')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('numberType')
      localStorage.removeItem('number')
      localStorage.removeItem('email')
      localStorage.removeItem('isToLogin')
      sessionStorage.removeItem('ar_pay')
    },
    remember (isInit = false) {
      const logintype = this.userForm.logintype
      const storeKey = `ar_account_${logintype}`
      const str = localStorage.getItem(storeKey) || ''
      const getValue = (value: string) => {
        try {
          return JSON.parse(value)
        } catch (e) {
          return null
        }
      }
      if (isInit) {
        const form = getValue(str)
        if (!form) return
        if (logintype === 'email') {
          this.userForm.email = form.email
        } else {
          this.userForm.number = form.number
          if (form.numberType) this.userForm.numberType = form.numberType
        }
        if (form.password) {
          this.userForm.rememberpwd = true
          this.userForm.password = form.password
        }
        return
      }
      const numberType = this.userForm.numberType
      const number = this.userForm.number
      const email = this.userForm.email
      const password = this.userForm.rememberpwd ? this.userForm.password : ''
      localStorage.setItem(storeKey, JSON.stringify({ email, numberType, number, password, logintype }))
    },
    async signIn (params: {
      number?: string
      password?: string
      email?: string
      numberType: string
      logintype: string
      captchaId?: string
      track?: Object
      vCode?: string
    }) {
      let data: any = {}
      if (params.logintype == 'email') {
        data = {
          username: params.email,
          captchaId: params.captchaId,
          track: params.track,
          pwd: md5(params.password),
          phonetype: -1,
          logintype: params.logintype,
        }
      } else {
        data = {
          username: params.numberType + params.number,
          captchaId: params.captchaId,
          track: params.track,
          pwd: md5(params.password),
          // pwd: params.password,
          phonetype: -1,
          logintype: params.logintype,
        }
      }
      if (params.vCode) data.vCode = params.vCode
      const globalStore = GlobalStore()
      const { onTriggerLogin } = useTrigger()
      return new Promise(async (resolve, reject) => {
        const res: any = await login(data, { 'AR-REAL-IP': this.ARIP })
        if (res.data && res.code === 0) {
          const { token, tokenHeader, refreshToken } = res.data
          globalStore.setToken(token)
          this.remember()
          localStorage.setItem('tokenHeader', tokenHeader)
          localStorage.setItem('refreshToken', refreshToken)
          localStorage.setItem('numberType', params.numberType)
          localStorage.setItem('number', params.number || '')
          localStorage.setItem('email', params.email || '')
          localStorage.setItem('isToLogin', '1')
          // useActive().needPopupFirstRecharge()
          console.log('跳转至/')
          const userInfo = await this.getUserInfo({ signature: token })
          onTriggerLogin(userInfo?.data?.userId)
          windowToPath('/home')
          const { setLoading } = useCommonStore()
          setLoading(false)
          return resolve({})
        }
        // 登录错误提示豁免
        const whitelist = [122, 33]
        if (!whitelist.includes(res.msgCode)) fixMsg(res)
        reject(res)
      })
    },

    async getUserInfo (params: { signature: string }) {
      const globalStore = GlobalStore()
      const walletStore = useWalletStore()
      const res = await AwaitApiResult(GetUserInfo(params))
      if (res) {
        globalStore.setUserInfo(res?.data)
        walletStore.setAmount(res?.data?.amount)
        walletStore.setUSDTCanAdd(res?.data)
        return res
      }
    },
    async register (regParam: RegisterReq) {
      const res = await AwaitApiResult(Register(regParam, { 'AR-REAL-IP': this.ARIP }))
      return new Promise(async (resolve, reject) => {
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    },
    async getIp () {
      if (this.ARIP) return
      try {
        // https://tosma.lhlasjdanc.com/
        const res = await axios.post('http://testplan.abozsmgppfp.com')
        const ipRegex =
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        if (res.data && ipRegex.test(res.data)) {
          console.log('getIp', res.data)
          this.ARIP = res.data || ''
        }
      } catch (error) {}
    },
    sendCode () {
      this.countDown = 120
      const timer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--
        } else {
          clearInterval(timer)
        }
        if (this.countDown === 0) {
          clearInterval(timer)
        }
      }, 1000)
    },
    sendEmailCode () {
      this.countEmailDown = 300
      const emailtimer = setInterval(() => {
        if (this.countEmailDown > 0) {
          this.countEmailDown--
        } else {
          clearInterval(emailtimer)
        }
        if (this.countEmailDown === 0) {
          clearInterval(emailtimer)
        }
      }, 1000)
    },
    setRemember (remember: boolean) {
      this.remember = remember
    },
    setICode (code: string) {
      this.userForm.invitation = code
    },
    clearRpwdData () {
      this.rPwdForm = {
        number: '',
        numberType: SettingStore().getAreacode.replace('+', '') || '',
        verify: '',
        password: '',
        rePassword: '',
        email: '',
      }
      this.userForm.number = ''
    },
    async getRegisterState () {
      const res: ObjResNull<ResRegisterState> = await AwaitApiResult(RegisterState())
      if (res) {
        const {
          registerSMSState,
          registerState,
          isOpenAddBankCardSMS,
          isOpenForgetPasswordSMS,
          isOpenForgetPasswordEmail,
          registerEmailState,
          registerMobileState,
          isOpenAddWithdrawEmail,
          isOpenAddWithdrawSMS,
          isOpenCaptcha = '0',
          isOpenRegisterCaptcha = '0',
          addBankCardOpenEmail,
          isOpenExternalAccount,
          isOpenRegisterSMS,
          isOpenRegisterEmail,
        } = res.data
        this.state = res.data
        const hasOpen = (num: string = '0') => {
          return Boolean(num === '1')
        }
        // 重置手机号和短信注册是同一个开关
        this.isShowSMS = hasOpen(registerSMSState)
        this.isRegisterState = hasOpen(registerState)
        this.isAddBankCardSMS = hasOpen(isOpenAddBankCardSMS)
        this.isOpenForgetPasswordSMSState = hasOpen(isOpenForgetPasswordSMS)
        this.isOpenForgetPasswordEmailState = hasOpen(isOpenForgetPasswordEmail)
        this.isOpenRegisterEmailState = hasOpen(registerEmailState)
        this.isOpenRegisterSMSState = hasOpen(registerMobileState)
        this.isOpenCaptcha = hasOpen(isOpenCaptcha)
        this.isOpenRegisterCaptcha = hasOpen(isOpenRegisterCaptcha)
        // 是否开启邮箱体现验证
        this.isOpenAddWithdrawEmailState = hasOpen(isOpenAddWithdrawEmail)
        // 是否开启短信体现验证
        this.isOpenAddWithdrawSMSState = hasOpen(isOpenAddWithdrawSMS)
        this.isOpenAddBankCardOpenEmail = hasOpen(addBankCardOpenEmail)
        this.isOpenExternalAccount = hasOpen(isOpenExternalAccount)
        this.isOpenRegisterSMS = hasOpen(isOpenRegisterSMS)
        this.isOpenRegisterEmail = hasOpen(isOpenRegisterEmail)

        return res
      }
      return {}
    },
  },
})
