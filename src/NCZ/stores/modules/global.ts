import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { ClientConfig, GlobalState, UserInfo } from '@/types/api'
import { getLocal, getIconsPublic } from '@/utils'
import languages from '@/languages/languages'
import { useUserStore, useSiteStore } from '@/stores'

export const GlobalStore = defineStore({
  id: 'GlobalState',
  state: (): GlobalState => ({
    // token
    token: useLocalStorage('token', ''),
    // userInfo: useStorage('userInfo', {}),
    // language
    language: getLocal(),
    // client config
    clientConfig: useLocalStorage('clientConfig', {}),
    requsetData: '',
    isOpen: true,
    apiUrl: localStorage.getItem('ApiUrl') || '',
    visibility: 1,
    deferredPrompt: null,
    dollarSign: '',
    projectLogo: '',
    headLogo: '',
    areaCode: null,
    messageList: null,

    mcShow: false,
    mcPage: 'securityCenter',

  }),
  getters: {
    // ref: [Accessing other stores getters](https://pinia.vuejs.org/core-concepts/getters.html#Accessing-other-stores-getters)
    userInfo: () => {
      const userStore = useUserStore()
      return userStore.userInfo
    },
    isLogin: () => {
      const userStore = useUserStore()
      return Boolean(userStore.isLogin)
    },
    currencySetting () {
      const siteStore = useSiteStore()
      return siteStore.config.currencySetting
    },
    // 幣種符號
    currencySymbol (): string {
      return this.currencySetting.currencySymbol || ''
    },
    // 幣種單位
    currencyUnit (): string {
      return this.currencySetting.currency || ''
    },

    // config: state => {

    //     currencySymbol: state => state.config.currencySetting.currencySymbol || '',
    //     currencyUnit: state => state.config.currencySetting.currency || '',
    // },

    getToken: state => state.token,
    getLanguage: state => state.language,
    getLanguageIcon: state => {
      return getIconsPublic('languages', `${state.language}`)
    },
    getLanguageName: state => {
      for (const item of languages) {
        if (item.key == state.language) {
          return item.name
        }
      }
    },
    getUserInfo: (state): UserInfo => state.userInfo as UserInfo,
    getClientConfig: (state): ClientConfig => state.clientConfig as ClientConfig,
    getReqData: state => state.requsetData,
    getIsOpen: state => state.isOpen,
    getApiUrl: state => state.apiUrl,
    getDollarSign: state => state.dollarSign,
    getMessage: state => state.messageList,
  },
  actions: {
  /**
    acLoaded: function(e) {
      e.acLoaded = !0
    },
    mcLoaded: function(e) {
      e.mcLoaded = !0
    },
    setAcShow: function(e, t) {
      e.acShow = t
    },
    setMcShow: function(e, t) {
      t || (window["pointMall"] = null),
      e.mcShow = t
    },
    setMcPage: function(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "securityCenter";
      e.mcPage = t
    },
    setAcPage: function(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "agentTeamOverview";
      e.acPage = t
    },
    setRewardMcDate: function(e, t) {
      e.rewardMcPageData = t
    },
    setPrizeDetail: function(e, t) {
      e.prizeDetail = t
    }
   */
    setMcPage (mcPage = 'securityCenter') {
      this.mcPage = mcPage
    },
    setMcShow (mcShow) {
      // if (!mcShow) window.pointMall = null
      this.mcShow = mcShow
    },

    // setToken
    setToken (token: string) {
      this.token = token
      localStorage.setItem('token', token)
      sessionStorage.removeItem('pop_prompt')
      sessionStorage.removeItem('pop_laundry')
    },
    // setUserInfo
    setUserInfo (userInfo: GlobalState['userInfo']) {
      this.userInfo = userInfo
      if (userInfo.groupDataShowAuth && userInfo.groupDataShowAuth.length) {
        const groupP = {}
        userInfo.groupDataShowAuth.forEach((item, index) => {
          groupP[item.id] = item.isShow
        })
        sessionStorage.setItem('permission', JSON.stringify(groupP))
      } else {
        sessionStorage.removeItem('permission')
      }
      useLocalStorage('userInfo', userInfo)
    },
    // updateLanguage
    updateLanguage (language: string) {
      this.language = language
    },
    setPrompt (value: any) {
      this.deferredPrompt = value
    },
    SET_HTML_ATTR (webIco: any, projectName: any) {
      document.querySelector('link[rel=\'icon\']')?.setAttribute('href', webIco)
      document.title = projectName
    },
    // setReqData
    setReqData (ReqData: string | {}) {
      this.requsetData = ReqData
    },
    // getIsOpen
    setIsOpen (item: boolean) {
      this.isOpen = item
    },
    setvisibility (value: number | null = null) {
      if (typeof value === 'number') {
        this.visibility = value
      } else {
        this.visibility++
      }
    },
    setMessage (value: any) {
      this.messageList = value
    },
  },
})
