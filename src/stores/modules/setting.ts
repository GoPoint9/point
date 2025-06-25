import { GetHomeSettings } from '@/api'
import { AwaitApiResult, setHtmlLang } from '@/utils'
import { defineStore } from 'pinia'
import pointObj from '@/utils/point'
export const SettingStore = defineStore({
  id: 'SettingStore',
  persist: true, // true即为
  state: () => ({
    areaPhoneLenList: [] as any[], // 电话号码校验规则
    areacode: '',
    headLogo: import.meta.env.VITE_BASE_HEADLOGO, // 图片地址
    isShowAppDownloadUp: false, // 是否开启App下载（true:开启，false:关闭）
    isShowAppDownloadDown: false, // 是否显示App下载（true:开启，false:关闭）
    isShowLotteryDragon: false, // 是否开启彩票长龙显示（true:开启，false:关闭）
    jackportMaxReswadAmount: 0, // 大奖奖励最大金额
    projectName: import.meta.env.VITE_BASE_PROJECTNAME, // 前端站点名字
    projectLogo: import.meta.env.VITE_BASE_PROJECTLOGO, // 前台logo
    languages: import.meta.env.VITE_BASE_LANGUAGE, // 语言
    webIco: '', // ico
    dollarSign: import.meta.env.VITE_BASE_DOLLARSIGN, // 货币符号
    upperOrLower: import.meta.env.VITE_BASE_UPPERORLOWER, // 提现人姓名是否大小写
    defaultCurrentLanguage: '',
    isSplitLocalEWallet: false, // 是否分开本地钱包
    isOpenLoginChangeLanguage: '0', // 是否开启登陆注册选择语言
    ossUrl: '',
    rewardValidityTime: 0, // 超级大奖领取过期时间
    winRate: {} as Record<string, any>, // 电子中奖率
    isShowHotGameWinOdds: false, // 热门游戏中奖率开关
    isShowAppHandCodeWashingSwitch: false, // 是否展示一键戏码
    bigTurntableLink: '', // 大转盘
    isOpenTurntable: false,
    isPartnerReward: false,
    isSelfCustomerService: false, // 是否开启客服中心
    webSiteUrl: '',
  }),
  getters: {
    getIsCanAppDownload: state => state.isShowAppDownloadUp,
    getIsShowAppDownloadIcon: state => state.isShowAppDownloadDown,
    getIsShowLotteryDragon: state => state.isShowLotteryDragon,
    getProjectLogo: state => {
      return state.projectLogo
    },
    getHeadLogo: state => {
      return state.headLogo
    },
    getDollarSign: state => state.dollarSign,
    getAreaPhoneLenList: state => state.areaPhoneLenList,
    getAreacode: state => state.areacode,
    getLanguage: state => state.languages,
    getWebIco: state => state.webIco,
    getProjectName: state => state.projectName,
    getUpperOrLower: state => state.upperOrLower,
    getDL: state => state.defaultCurrentLanguage,
    getIsSplitLocalEWallet: state => state.isSplitLocalEWallet,
    getLoginChangeLanguage: state => state.isOpenLoginChangeLanguage,
    getOSSUrl: state => state.ossUrl,
    getRewardValidityTime: state => state.rewardValidityTime,
    getWinRate: state => state.winRate,
    getIsShowAppHandCodeWashingSwitch: state => state.isShowAppHandCodeWashingSwitch,
    getBigTurntableLink: state => state.bigTurntableLink,
    getOpenTurntable: state => state.isOpenTurntable,
    getIsPartnerReward: state => state.isPartnerReward,
    getIsSelfCustomerService: state => state.isSelfCustomerService,
    getWebSiteUrl: state => state.webSiteUrl,
  },
  actions: {
    async getHomeSetting () {
      // TODO:
      // console.log(
      //   '%c INFO %c getHomeSetting ',
      //   'color: orange; font-weight: bold; padding: 3px; border: 2px solid orange; border-radius: 3px 0 0 3px;',
      //   'color: #fff; background: orange; font-weight: bold; padding: 5px; border-radius: 0 3px 3px 0;'
      // )
      // window.cover.loader(true)
      const res = await AwaitApiResult(GetHomeSettings())
      if (res && res.data) {
        const {
          areaPhoneLenList,
          headLogo,
          isShowAppDownloadUp,
          isShowAppDownloadDown,
          isShowLotteryDragon,
          jackportMaxReswadAmount,
          projectName,
          projectLogo,
          languages,
          webIco,
          dollarSign,
          upperOrLower,
          defaultCurrentLanguage,
          isSplitLocalEWallet,
          isOpenLoginChangeLanguage,
          electronicWinRateExternalLink,
          electronicWinRateImgUrl,
          isShowElectronicWinRateExternalLink,
          isShowHotGameWinOdds,
          isShowAppHandCodeWashingSwitch,
          rewardValidityTime,
          ossUrl,
          bigTurntableLink,
          isOpenTurntable,
          isPartnerReward,
          eventRegionConfigList,
          isSelfCustomerService,
          webSiteUrl,
          firstDepositRewardCodeAmount,
        } = res.data
        this.ossUrl = ossUrl
        this.rewardValidityTime = rewardValidityTime
        this.areaPhoneLenList = areaPhoneLenList
        this.headLogo = headLogo
        this.isShowAppDownloadUp = isShowAppDownloadUp
        this.isShowAppDownloadDown = isShowAppDownloadDown
        this.isShowLotteryDragon = isShowLotteryDragon
        this.jackportMaxReswadAmount = jackportMaxReswadAmount
        this.projectLogo = projectLogo
        this.projectName = projectName
        this.languages = languages
        this.webIco = webIco
        this.dollarSign = dollarSign
        this.upperOrLower = upperOrLower
        this.areacode = areaPhoneLenList[0]?.area || ''
        this.isSplitLocalEWallet = isSplitLocalEWallet
        this.isOpenLoginChangeLanguage = isOpenLoginChangeLanguage
        this.isShowHotGameWinOdds = isShowHotGameWinOdds || false
        this.isShowAppHandCodeWashingSwitch = isShowAppHandCodeWashingSwitch
        this.winRate = {
          electronicWinRateExternalLink,
          electronicWinRateImgUrl,
          isShowElectronicWinRateExternalLink,
        }
        this.bigTurntableLink = bigTurntableLink
        this.isOpenTurntable = isOpenTurntable
        this.isPartnerReward = isPartnerReward
        this.isSelfCustomerService = isSelfCustomerService
        this.webSiteUrl = webSiteUrl
        sessionStorage.setItem('dollarSign', dollarSign)
        sessionStorage.setItem('fa1', firstDepositRewardCodeAmount)
        sessionStorage.setItem('areaPhoneLenList', JSON.stringify(areaPhoneLenList))
        if (!localStorage.getItem('language')) {
          this.defaultCurrentLanguage = defaultCurrentLanguage.replace('tha', 'th')
          setHtmlLang(this.defaultCurrentLanguage) // 此时还没存language,设置默认lang
        }
        // 设置ico和title
        document.querySelector('link[rel=\'icon\']')?.setAttribute('href', webIco)
        document.title = projectName
        pointObj.fbNew(eventRegionConfigList || [])
      }

      // TODO: 競品邏輯
      // setTimeout(() => {
      // window.cover.loader(false)
      // }, 3000);
    },
  },
})
