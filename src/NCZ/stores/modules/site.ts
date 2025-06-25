import { getSiteInitData } from '@/NCZ/api'
import { AwaitApiResult, utilsNCZ, setHtmlLang } from '@/utils'
import { defineStore } from 'pinia'
// import pointObj from '@/utils/point'

import { $t as t } from '@/languages'

import { useLocalStorage } from '@vueuse/core'

import { useUserStore } from '@/stores'

window.TEST_123 = useLocalStorage('TEST_123', 'TEST_123')

// const CACHE_KEYS = [
//   'footerConfig',
//   'helpConfig',
//   'h5BannerList',
//   'gradeList',
//   'noticeData',
//   'rankingList',
//   'activityConfigH5',
//   'defaultPhotoList',
//   'lotteryConfig',
//   'lotteryList',
//   'rewardData',
//   'config',
//   'pubSiteAnalysis',
//   'extGameConfig',
//   'h5GameMenu',
//   'logoSetting',
//   'appDownload'
// ]

const CACHE_KEYS = [
  'footerConfig',
  'helpConfig',

  // 'h5BannerList',
  'bannerList', //  #2756 後台》平台管理》輪播管理》PC輪播海報的自定義無作用

  // web 的，沒給值，看起來沒用處
  // 'hallBanner', // 3790 【platform】新增購彩大廳輪播圖更換 member相對應更新
  // 'activityConfigWeb', // 需求 #20276 【前端】活动中心只传对应装置启用中的活动
  // 'floatingList', // #4236 【Web】首頁新增浮動窗
  // 'serviceRating', // serviceRating

  'gradeList',
  'noticeData',
  'rankingList',
  'activityConfigH5',
  'defaultPhotoList',
  'lotteryConfig',
  'lotteryList',
  'rewardData',
  'config',
  'pubSiteAnalysis',
  'extGameConfig',
  'h5GameMenu',
  'logoSetting',
  'appDownload',
]

export const useSiteStore = defineStore({
  id: 'site',
  persist: true, // 使用 pinia-plugin-persistedstate 預設的持久性設置進行保存。
  state: initialState,
  getters: {
    getIsCanAppDownload: state => state.isShowAppDownloadUp,
    getIsShowAppDownloadIcon: state => state.isShowAppDownloadDown,
    getIsShowLotteryDragon: state => state.isShowLotteryDragon,
    getProjectLogo: state => state.projectLogo,
    getHeadLogo: state => state.headLogo,
    getDollarSign: state => state.dollarSign,
    getAreaPhoneLenList: state => state.areaPhoneLenList,
    getAreacode: state => state.areacode,
    getDL: state => state.defaultCurrentLanguage,
    getLanguage: state => state.languages,
    getWebIco: state => state.webIco,
    getProjectName: state => state.projectName,
    getUpperOrLower: state => state.upperOrLower,
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
    async getHomeSetting (requirement = CACHE_KEYS) {
      let localCacheData = localStorage.getItem('site.cacheData')
      localCacheData = localCacheData === null ? {} : JSON.parse(localCacheData)

      // 發布可能會發生已有cache但未有資料
      // 要用的資料寫這裡 才會檢查
      const siteInitData = ['tnGameConfig']
      // if (IsParmReady(localCacheData) && IsEmpty(localCacheData)) {
      for (const key in localCacheData) {
        const isTargetKey = siteInitData.includes(key) && Object.prototype.hasOwnProperty.call(localCacheData, key)
        if (isTargetKey && localStorage.getItem(`site.${key}`) === null) {
          localCacheData[key] = 'nodata'
        }
      }

      // TODO:
      // window.cover.loader(true)

      // const res = await AwaitApiResult(getSiteInitData(requirement))
      const res = await AwaitApiResult(getSiteInitData({ requirement, cacheData: localCacheData }))
      // console.log(
      //   '%c INFO %c getHomeSetting ',
      //   'color: orange; font-weight: bold; padding: 3px; border: 2px solid orange; border-radius: 3px 0 0 3px;',
      //   'color: #fff; background: orange; font-weight: bold; padding: 5px; border-radius: 0 3px 3px 0;',
      //   res
      // )

      if (!(res && res.data)) return
      const { cacheData, backData } = res.data
      // console.warn(' res.data ', res.data)

      // NOTE: 將 res.data 更新到 state 中
      this.$patch(state => {
        // 更新 backData
        // const undefined_list = []
        for (const [key, value] of Object.entries(backData)) {
          // NOTE: 這邊很怪，為啥 state 有 key 才塞
          if (state[key] !== undefined) {
            // console.warn(' for of backData this[key] ', this[key])
            state[key] = value
            localStorage.setItem(`site.${key}`, JSON.stringify(value))
            // } else {
            // undefined_list.push(key)
          }
        }
        // undefined_list: ['floatingList', 'activityConfigWeb', 'recommendLotteryCache', 'serviceRating']
        // console.log(' undefined_list ', undefined_list)

        const STORAGE_KEY = 'site.cacheData'
        // 更新 localStorage 版本
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cacheData))

        // local刪除無使用資料 (#20276 要從local刪除activityConfig)
        // if (IsParmReady(cacheData) && IsEmpty(cacheData)) {
        for (const key in cacheData) {
          if (state[key] === undefined) {
            // console.warn('state[key] === undefined, key: ', key, state[key])
            localStorage.removeItem(`site.${key}`)
          }
        }

        // NOTE: 將 ncz 換成 BDG 格式。
        const { langSet, defaultLang, currencySetting } = state.config
        state.languages = utilsNCZ.getLanguagesBDG(langSet)
        if (!localStorage.getItem('language')) {
          state.defaultCurrentLanguage = utilsNCZ.getLanguageBDG(defaultLang).replace('tha', 'th')
          setHtmlLang(state.defaultCurrentLanguage) // 此时还没存l anguage, 设置默认lang
        }

        state.dollarSign = currencySetting.currencySymbol
        sessionStorage.setItem('dollarSign', state.dollarSign)

        // NOTE: ncz_h5 寫死 20 (#28141 | 提現功能)
        state.areaPhoneLenList = [{ area: `+${currencySetting.countryCode}`, len: '20' }]
        // state.areaPhoneLenList = [{ area: '+91', len: '9-12' }] // => BDG 版本

        state.areacode = state.areaPhoneLenList[0]?.area || ''

        const userStore = useUserStore()
        if (state.areacode) userStore.setNumberType(state.areacode.substring(1))

        // console.warn('[locale setting]', { langSet, defaultLang, defaultCurrentLanguage, languages })
        // window.store.commit('Language/SET_SUPPORT_LANG_LIST', langSet)

        // if (
        //   !localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY) ||
        //   (langSet.length && !langSet.includes(localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY)))
        // ) {
        //   window.store.commit('Language/SET_CURRENT_LANGUAGE', defaultLang)
        //   await window.store.dispatch('Language/ChangeLanguage', defaultLang)
        // }

        //
        console.log(
          '%c INFO %c state ',
          'color: orange; font-weight: bold; padding: 3px; border: 2px solid orange; border-radius: 3px 0 0 3px;',
          'color: #fff; background: orange; font-weight: bold; padding: 5px; border-radius: 0 3px 3px 0;',
          state
        )
      })
      console.log(
        '%c INFO %c this ',
        'color: orange; font-weight: bold; padding: 3px; border: 2px solid orange; border-radius: 3px 0 0 3px;',
        'color: #fff; background: orange; font-weight: bold; padding: 5px; border-radius: 0 3px 3px 0;',
        this
      )

      // const {
      //   areaPhoneLenList,
      //   headLogo,
      //   isShowAppDownloadUp,
      //   isShowAppDownloadDown,
      //   isShowLotteryDragon,
      //   jackportMaxReswadAmount,
      //   projectName,
      //   projectLogo,
      //   languages,
      //   webIco,
      //   dollarSign,
      //   upperOrLower,
      //   defaultCurrentLanguage,
      //   isSplitLocalEWallet,
      //   isOpenLoginChangeLanguage,
      //   electronicWinRateExternalLink,
      //   electronicWinRateImgUrl,
      //   isShowElectronicWinRateExternalLink,
      //   isShowHotGameWinOdds,
      //   isShowAppHandCodeWashingSwitch,
      //   rewardValidityTime,
      //   ossUrl,
      //   bigTurntableLink,
      //   isOpenTurntable,
      //   isPartnerReward,
      //   eventRegionConfigList,
      //   isSelfCustomerService,
      //   webSiteUrl,
      //   firstDepositRewardCodeAmount
      // } = res.data
      // this.ossUrl = ossUrl
      // this.rewardValidityTime = rewardValidityTime
      // this.areaPhoneLenList = areaPhoneLenList
      // this.areacode = areaPhoneLenList[0]?.area || ''
      // this.headLogo = headLogo
      // this.isShowAppDownloadUp = isShowAppDownloadUp
      // this.isShowAppDownloadDown = isShowAppDownloadDown
      // this.isShowLotteryDragon = isShowLotteryDragon
      // this.jackportMaxReswadAmount = jackportMaxReswadAmount
      // this.projectLogo = projectLogo
      // this.projectName = projectName
      // this.languages = languages
      // this.webIco = webIco
      // this.dollarSign = dollarSign
      // this.upperOrLower = upperOrLower
      // this.isSplitLocalEWallet = isSplitLocalEWallet
      // this.isOpenLoginChangeLanguage = isOpenLoginChangeLanguage
      // this.isShowHotGameWinOdds = isShowHotGameWinOdds || false
      // this.isShowAppHandCodeWashingSwitch = isShowAppHandCodeWashingSwitch
      // this.winRate = {
      //   electronicWinRateExternalLink,
      //   electronicWinRateImgUrl,
      //   isShowElectronicWinRateExternalLink
      // }
      // this.bigTurntableLink = bigTurntableLink
      // this.isOpenTurntable = isOpenTurntable
      // this.isPartnerReward = isPartnerReward
      // this.isSelfCustomerService = isSelfCustomerService
      // this.webSiteUrl = webSiteUrl
      // sessionStorage.setItem('dollarSign', dollarSign)
      // sessionStorage.setItem('fa1', firstDepositRewardCodeAmount)
      // sessionStorage.setItem('areaPhoneLenList', JSON.stringify(areaPhoneLenList))
      // if (!localStorage.getItem('language')) {
      //   this.defaultCurrentLanguage = defaultCurrentLanguage.replace('tha', 'th')
      //   setHtmlLang(this.defaultCurrentLanguage) //此时还没存language,设置默认lang
      // }
      // // 设置ico和title
      // document.querySelector("link[rel='icon']")?.setAttribute('href', webIco)
      // document.title = projectName
      // pointObj.fbNew(eventRegionConfigList || [])
      // }

      // TODO: 競品邏輯
      // setTimeout(() => {
      // window.cover.loader(false)
      // }, 3000);
    },
  },
})

function initialState () {
  return {
    // BDG 的，沿用。
    languages: import.meta.env.VITE_BASE_LANGUAGE, // 语言
    defaultCurrentLanguage: '',

    cacheData: null,
    footerConfig: null,
    config: {
      service: { url: null },
      currencySetting: {},
    },
    appDownload: null,
    extGameConfig: null,
    tnGameConfig: null,
    hallBanner: [
      { url: '/lottery', image: '/system/pc/lottery/banner1.png?019d' },
      { url: '/lottery', image: '/system/pc/lottery/banner2.png?019d' },
    ],
    bannerList: [
      { url: '/activity.html', image: '/yingjia/pc/banner/banner1.png?abd8' },
      { url: 'http://www.yjvippay.com', image: '/yingjia/pc/banner/banner2.png?abd8' },
      { url: '/activity.html', image: '/yingjia/pc/banner/banner3.png?abd8' },
    ],
    activityConfigH5: [
      // {
      //   type: 0,
      //   name: t('Activity.label_configH5_name'),
      //   img: '/yingjia/pc/activity/20170325034711506535.jpg?abd8',
      //   intro: t('Activity.label_configH5_intro'),
      //   content: t('Activity.label_configH5_content'),
      // },
      // {
      //   type: 0,
      //   name: t('Activity.label_configH5_name1'),
      //   img: '/yingjia/pc/activity/20170507083533828779.jpg?abd8',
      //   intro: t('Activity.label_configH5_intro1'),
      //   content: t('Activity.label_configH5_content1'),
      // },
      // {
      //   type: 0,
      //   name: t('Activity.label_configH5_name2'),
      //   img: '/yingjia/pc/activity/20170515022325750148.jpg?abd8',
      //   intro: t('Activity.label_configH5_intro2'),
      //   content: t('Activity.label_configH5_content2'),
      // },
    ],
    noticeData: '',
    defaultPhotoList: [
      { id: 1, imageUrl: '0A472675E5E5AF50.jpg', imageName: t('Store.label_imgList_title1') },
      { id: 2, imageUrl: 'A9734CC321C8B363.jpg', imageName: t('Store.label_imgList_title2') },
      { id: 3, imageUrl: '9A9C9E1A719CE536.jpg', imageName: t('Store.label_imgList_title3') },
      { id: 4, imageUrl: 'EED50A5799E76E58.jpg', imageName: t('Store.label_imgList_title4') },
      { id: 5, imageUrl: 'F0E57CF931E45118.jpg', imageName: t('Store.label_imgList_title5') },
      { id: 6, imageUrl: 'F95FE943163DAF92.jpg', imageName: t('Store.label_imgList_title6') },
      { id: 7, imageUrl: '1EF6FC3ACCBCD762.jpg', imageName: t('Store.label_imgList_title7') },
      { id: 8, imageUrl: 'EF01C8BED7B70053.jpg', imageName: t('Store.label_imgList_title8') },
      { id: 9, imageUrl: 'CA64E00C3F9FD5F3.jpg', imageName: t('Store.label_imgList_title9') },
      { id: 10, imageUrl: '6F1A99A3D02A6DEC.jpg', imageName: t('Store.label_imgList_title10') },
      { id: 11, imageUrl: 'C6021F3486D2B2DB.jpg', imageName: t('Store.label_imgList_title11') },
      { id: 12, imageUrl: '1B6A214FF62BD91F.jpg', imageName: t('Store.label_imgList_title12') },
      { id: 13, imageUrl: '9816F54B27A9BF48.jpg', imageName: t('Store.label_imgList_title13') },
      { id: 14, imageUrl: '6EC9EDCC7B3BD70D.jpg', imageName: t('Store.label_imgList_title14') },
      { id: 15, imageUrl: 'C7BB5088540C8040.jpg', imageName: t('Store.label_imgList_title15') },
      { id: 16, imageUrl: '831CA133362DE10D.jpg', imageName: t('Store.label_imgList_title16') },
      { id: 17, imageUrl: '4D73D09EC5D7BFE3.jpg', imageName: t('Store.label_imgList_title17') },
      { id: 18, imageUrl: '4A2E3EA214381904.jpg', imageName: t('Store.label_imgList_title18') },
      { id: 19, imageUrl: 'D38F599DF12CD206.jpg', imageName: t('Store.label_imgList_title19') },
      { id: 20, imageUrl: 'E6CA6EB9F492879E.jpg', imageName: t('Store.label_imgList_title20') },
      { id: 21, imageUrl: '3578E1EB410B49C7.jpg', imageName: t('Store.label_imgList_title21') },
      { id: 22, imageUrl: 'C707188A6E10AED4.jpg', imageName: t('Store.label_imgList_title22') },
      { id: 23, imageUrl: 'C362F2B1E0EA389A.jpg', imageName: t('Store.label_imgList_title23') },
      { id: 24, imageUrl: '367498B6A748D910.jpg', imageName: t('Store.label_imgList_title24') },
      { id: 25, imageUrl: '5C5A53823438F2CD.jpg', imageName: t('Store.label_imgList_title25') },
    ],
    rewardData: [
      { grade: 'VIP3', title: ['100+', '10000+', '200000+'], rewards: ['0.1%', '0.2%', '0.3%'] },
      { grade: 'VIP4', title: ['100+', '10000+', '200000+'], rewards: ['0.2%', '0.3%', '0.4%'] },
      { grade: 'VIP5', title: ['100+', '10000+', '200000+'], rewards: ['0.3%', '0.4%', '0.5%'] },
      { grade: 'VIP6', title: ['100+', '10000+', '200000+'], rewards: ['0.4%', '0.5%', '0.6%'] },
      { grade: 'VIP7', title: ['100+', '10000+', '200000+'], rewards: ['0.5%', '0.6%', '0.7%'] },
      { grade: 'VIP8', title: ['100+', '10000+', '200000+'], rewards: ['0.6%', '0.7%', '0.8%'] },
      { grade: 'VIP9', title: ['100+', '10000+', '200000+'], rewards: ['0.7%', '0.8%', '0.9%'] },
    ],
    gradeList: [
      { grade: 1, gradeName: t('Activity.label_gradeList1'), gradeGrow: 0, bonus: 0, jumpBonus: 0 },
      { grade: 2, gradeName: t('Activity.label_gradeList2'), gradeGrow: 10, bonus: 1, jumpBonus: 1 },
      { grade: 3, gradeName: t('Activity.label_gradeList3'), gradeGrow: 200, bonus: 5, jumpBonus: 6 },
      { grade: 4, gradeName: t('Activity.label_gradeList4'), gradeGrow: 1000, bonus: 10, jumpBonus: 16 },
      { grade: 5, gradeName: t('UNKNOWN.label_home_levelName'), gradeGrow: 10000, bonus: 58, jumpBonus: 74 },
      { grade: 6, gradeName: t('Activity.label_gradeList6'), gradeGrow: 50000, bonus: 318, jumpBonus: 392 },
      { grade: 7, gradeName: t('Activity.label_gradeList7'), gradeGrow: 250000, bonus: 1688, jumpBonus: 2080 },
      { grade: 8, gradeName: t('Activity.label_gradeList8'), gradeGrow: 1000000, bonus: 6888, jumpBonus: 8968 },
      { grade: 9, gradeName: t('Activity.label_gradeList9'), gradeGrow: 5000000, bonus: 38888, jumpBonus: 47856 },
    ],
    lotteryList: null,
    lotteryConfig: null,
    h5GameMenu: null,
    sysActivity: [
      {
        type: 1,
        name: t('AccountManagement.label_promotion_reward'),
        img: '/system/pc/activity/20160924084334202069.png?abd8',
        intro: t('Store.label_sysActivity_promotion_intro'),
        content: t('Store.label_sysActivity_promotion_content'),
      },
      {
        type: 1,
        name: t('Activity.label_daily_bonus'),
        img: '/system/pc/activity/20160924082726681336.png?abd8',
        intro: t('Activity.label_activityCon5'),
        content: t('Store.label_sysActivity_daily_content'),
      },
    ],
    helpConfig: [
      {
        index: 0,
        dataCount: 0,
        data: null,
        id: 125,
        title: t('Store.label_helpConfig_title'),
      },
    ],
    // rankingList: [{'UserId': 112400, 'UserName': 'liyupeng', 'NickName': '必胜', 'UserPhoto': '0A472675E5E5AF50.jpg', 'Bonus': '5514762', 'Ranking': '1'}, {'UserId': 293277, 'UserName': 'zz51642', 'NickName': 'zz***2', 'UserPhoto': 'F0E57CF931E45118.jpg', 'Bonus': '4641363', 'Ranking': '2'}, {'UserId': 255118, 'UserName': 'cjandtina', 'NickName': '混世魔王', 'UserPhoto': '5C5A53823438F2CD.jpg', 'Bonus': '3473394', 'Ranking': '3'}, {'UserId': 137889, 'UserName': 'lilu890925', 'NickName': '苑苑', 'UserPhoto': 'A9734CC321C8B363.jpg', 'Bonus': '1077240', 'Ranking': '4'}, {'UserId': 132532, 'UserName': 'zz686868', 'NickName': 'zz***8', 'UserPhoto': '1B6A214FF62BD91F.jpg', 'Bonus': '1060272', 'Ranking': '5'}, {'UserId': 228938, 'UserName': '40885748', 'NickName': '康忙北鼻', 'UserPhoto': 'EF01C8BED7B70053.jpg', 'Bonus': '982458', 'Ranking': '6'}, {'UserId': 247740, 'UserName': 'yyyg3344', 'NickName': '淫钱', 'UserPhoto': '3578E1EB410B49C7.jpg', 'Bonus': '906912', 'Ranking': '7'}, {'UserId': 289174, 'UserName': '198162', 'NickName': '19***2', 'UserPhoto': '6EC9EDCC7B3BD70D.jpg', 'Bonus': '684898', 'Ranking': '8'}, {'UserId': 95941, 'UserName': 'z686868', 'NickName': 'z6***8', 'UserPhoto': '0A472675E5E5AF50.jpg', 'Bonus': '648374', 'Ranking': '9'}, {'UserId': 146844, 'UserName': '15689526515', 'NickName': '啊龙', 'UserPhoto': '831CA133362DE10D.jpg', 'Bonus': '626307', 'Ranking': '10'}],
    rankingList: [],
    verify: 0,
    diffTime: 0,
    tmpDiffTime: '',
    showBasket: false,
    maintain: false,
    tpl: {
      noData: ['<div class=\'fullPageMsg\'><div class=\'fullPageIcon iconfont\'>&#xe63c;</div><p>\',\'</p></div>'],
      load: '<svg class="svgLoad" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(0 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(30 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.08333333333333333s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(60 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.16666666666666666s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(90 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(120 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.3333333333333333s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(150 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.4166666666666667s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(180 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(210 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5833333333333334s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(240 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.6666666666666666s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(270 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(300 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.8333333333333334s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(330 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.9166666666666666s" repeatCount="indefinite"/></rect></svg>',
    },
    h5BannerList: [],
    abstractType: null,
    lotteryVerify: false,
    noIssueNeed: ['OGMMC', 'K3MMC', 'LHCMMC', 'BSCMMC'],
    serialNumberIssue: [
      'BJKL8',
      'BJPK10',
      'HLJSSC',
      'TWBINGO',
      'TWFFC',
      'FC3D',
      'PL3CP',
      'XGLHC',
      'MOLHC',
      'NMOLHC',
      'LK28',
      'SGLK28',
      'CTBJPK10',
      'AUXY5',
      'AUXY10',
      'CTAUXY10',
      'SG1BJPK',
      'SG2BJPK',
      'SG1AUXY10',
      'SG2AUXY10',
      'SG1AUXY5',
      'SG2AUXY5',
    ],
    jumpFlag: false,
    showLog: false,
    autoFixTimeNum: 0,
    yingjiaSiteId: [141, 171, 172, 173, 174, 175, 954, 20003, 20004, 20005], // 141 A006 赢发彩票,171 A009 快彩网,172 A010 中华彩票,173 A011 中福彩票,174 A012 中彩彩票,175 A016 赢家彩票
    typeCtcp: ['CTSSC', 'CTBSC', 'CTK3', 'CTXYNC'], // 传统彩
    lotteryListMode: '', // 更多彩種
    menuType: '', // 遊戲種類
    platformType: null, // 遊戲種類 > 選擇平台(Object)
    gameType: '', // 遊戲種類 > 選擇平台 > 平台遊戲分類
    isShowMaintain: false,
    KLLotteryArray: [
      'BJKL8',
      'FCKL8',
      'SLFKKL8',
      'TWBINGO',
      'JLPK10',
      'BJPK10',
      'TSPK10',
      'TFPK10',
      'CTBJPK10',
      'CTOG1BSC',
      'CF1PK10',
      'XY1PK10',
      'OG15PK10',
      'CTOG15PK10',
      'CTCF10PK10',
      'OG15FT',
      'NE5PK10',
      'NE15PK10',
      'SG1BJPK',
      'SG2BJPK',
    ], // 开奖号码有[详情]的
    isNeedZero: [
      'BJPK10',
      'JLPK10',
      'CTBJPK10',
      'CTOG1BSC',
      'XYFT',
      'NXYFT',
      'CTXYFT',
      'TSPK10',
      'TFPK10',
      'CF1PK10',
      'XY1PK10',
      'CTOG3BSC',
      'CTOG5BSC',
      'CTXY1BSC',
      'CTXY3BSC',
      'CTXY5BSC',
      'CTCF1BSC',
      'CTCF3BSC',
      'CTCF5BSC',
      'OG15PK10',
      'CTOG15PK10',
      'PH1PK10',
      'PH15PK10',
      'PH3PK10',
      'PH5PK10',
      'OG10PK10',
      'CF10PK10',
      'XY10PK10',
      'PH10PK10',
      'AUXY10',
      'CTOG10PK10',
      'CTCF10PK10',
      'CTXY10PK10',
      'CTPH10PK10',
      'NE1PK10',
      'NE15PK10',
      'NE3PK10',
      'NE5PK10',
      'NE10PK10',
      'CTNE1PK10',
      'CTNE15PK10',
      'CTNE3PK10',
      'CTNE5PK10',
      'CTNE10PK10',
      'OG15FT',
      'CTOG15FT',
      'CTAUXY10',
      'SG1BJPK',
      'SG2BJPK',
      'SG1AUXY10',
      'SG2AUXY10',
    ], // 獎號補0
    mainTainMsg: '',
    mainTainTime: '',
    ltColseLayer: false,
    sideMenuOpen: false,
    isShowFullAnnounce: true,
    noNeedYearFilter: ['AUXY5', 'AUXY10'],
    longDragon: {},
    chatroom: {},
    chatRoomIsOpened: false, // 聊天室 iframe
    chatRoomIframeUrl: '', // 聊天室 iframe URL
    chatRoomMaintain: {},
    reopenChatroom: false, // 其他 iframe 按叉叉是否要打開聊天室
    assistiveBeforeEntryCR: true /** 紀錄進入聊天室之前的狀態 */,
    assistiveIframeUrl: '',
    iframeChangLong: null, // iframw window
    iframePrecisePlan: null, // iframw window
    iframePrecisePlanUrl: '', // 購彩助手 iframe url
    iframeChangLongUrl: '', // 長龍 iframe url
    assistantFlag: true, // 購彩助手開關
    precision: {},
    music_lobby: { id: 'menuClick', src: '/static/local/music/menu-click.mp3' },
    isEnter: false, // 繼續遊戲提示框
    music: {}, // 聲音src
    source: {}, // 預載lottery,
    hideLotterySiteId: [172, 174, 175, 20003, 20005],
    customLotteryHide: false,
    hasGuestChatroom: false,
    assistChatroomOpen: 1,
    /** 前台隐藏『官方幸运飞艇』的【大小单双】玩法和『传统幸运飞艇』的【双面盘】玩法
     * A010 172 中华彩票, A012 174 中彩彩票, A016 175 中发彩票, B318 20003 鸿乐彩票, B720 20005 中国福利彩票 */
    isChatRoomGameOn: false,
    chatRoomID: '',
    isFirstInGame: true,
    chatRoomIframeInitUrl: '',
    isAssistActive: false,
    QZGameIsOpened: false,
    QZgameIframeUrl: '',
    QZgame: '',
    isOpenChatroom: false, // 是否打開 聊天室
    currencySymbol: '', // 幣別符號
    isAppDownload: true,
    lotteryCard: [],
    pubSiteAnalysis: [],
    lotteryCardFold: true,
    alreadyGetFirst: false,
    isFromQZ: false,
    isHJCP: [
      'HJHLSX',
      'CTHJHLSX', // 怀旧欢乐生肖
      'HJBJPK',
      'CTHJBJPK', // 怀旧北京赛车
      'HJJLK3',
      'CTHJJLK3', // 怀旧吉林快3
      'HJSHK3',
      'CTHJSHK3', // 怀旧上海快3
      'HJGZK3',
      'CTHJGZK3', // 怀旧贵州快3
      'HJJSK3',
      'CTHJJSK3', // 怀旧江苏快3
      'HJHUBK3',
      'CTHJHUBK3', // 怀旧湖北快3
      'HJHEBK3',
      'CTHJHEBK3', // 怀旧河北快3
      'HJGXK3',
      'CTHJGXK3', // 怀旧广西快3
      'HJGSK3',
      'CTHJGSK3', // 怀旧甘肃快3
      'HJAHK3',
      'CTHJAHK3', // 怀旧安徽快3
      'HJBJK3',
      'CTHJBJK3', // 怀旧北京快3
    ],
    isAloneWeichatAppPath: null,
    regData: {},
    bindEmail: '',
    updatePhone: '',
    logoSetting: {},
    // extGameOpen: false
  }
}
