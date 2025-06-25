/*
 * @Author: Seven
 * @Date: 2024-03-14 17:00:09
 * @LastEditTime: 2024-03-22 16:05:51
 * @LastEditors: Seven
 * @Description:
 */

import {
  GetElectronWithChildGame,
  GetGameCategoryList,
  getAllGameList,
  getBannerList,
  getDailyProfitRank,
  getGameUrl,
  getHomeData,
  getVideWithChildGame,
  GetAllowBetSetting
} from '@/api'
import router from '@/router'
import { GlobalStore, SettingStore, useHomeStore } from '@/stores'
import { AllGameList, ElectronWithChildGame, Home, HomeGameList, VideoListType } from '@/types/api'
import { AwaitApiResult, AwaitWrap, currency, encodeToBase64, getIcons, getUserAgent, partyUrl, getGameTitle } from '@/utils'
import { isHybridApp, openBrowser } from '@/utils/jsBridge'
import { useSessionStorage } from '@vueuse/core'
import { useLoading } from '@/components/common/use'
import { showDialog, showFailToast } from 'vant'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePwaDownload } from '@/hooks/usePwaDownload'

import { useFetchGame } from '@/NCZ/hooks'

export type WinInfoType = {
  type: string
  userPhoto: string
  nickName: string
  betAmount: number
  amount: number
  winTime: string
  showType: number
  imgUrl: string
}
export type RankLiskType = {
  nickName: string
  price: number
  time: string
  typeName: string
  userPhoto: string
}

const homeState = reactive<{
  banner: Array<Home.SwiperProps>
  winInfoList: Array<WinInfoType>
  rankList: Array<RankLiskType>
  gameTypeList: Array<HomeGameList>
  allGameList: AllGameList | undefined
  slotsGame: Array<ElectronWithChildGame>
  videoGame: Array<VideoListType>
  slotsGameMap: Object
  videoGameMap: Object
  iosDialog: boolean
}>({
  banner: [],
  winInfoList: [],
  rankList: [],
  gameTypeList: [],
  allGameList: undefined,
  slotsGame: [],
  videoGame: [],
  slotsGameMap: {},
  videoGameMap: {},
  iosDialog: false,
})

// NOTE: for web: 當前的選中遊戲(active)
const currentGameType = ref('')
const setCurrentGameType = code => {
  currentGameType.value = code
}

export const useHome = ({ changeTitle = false } = {}) => {
  const settingS = SettingStore() as any
  const globalStore = GlobalStore()
  const userInfo = globalStore.getUserInfo
  const { start, end, flag } = useLoading()
  const { t } = useI18n()
  const { PWA } = usePwaDownload()
  const isRead = ref(true)
  const showPWA = useSessionStorage('show-pwa-download', true)
  const showChanglong = computed(() => settingS.getIsShowLotteryDragon) // 是否展示长龙
  const isAppDownload = computed(() => settingS.getIsCanAppDownload) // 是否开启下载开关
  const isAppDownloadIcon = computed(() => settingS.getIsShowAppDownloadIcon) // 是否开启下载开关
  const projectIcon = computed(() => settingS.getProjectLogo) // 项目图标
  const getBanner = computed(() => homeState.banner) // 轮播图
  const getWinInfo = computed(() => homeState.winInfoList) // 中奖信息
  const downloadIcon = computed(() => settingS.getWebIco) // 下载图标
  const webSiteUrl = computed(() => settingS.getWebSiteUrl) // 网站url
  const gameMenus = computed(() => homeState.gameTypeList) // NCZ WEB 遊戲資料

  const isAlowNoRechargeGame = computed(() => {
    if (userInfo.allowNoRechargeGame === '1') return false
    if (userInfo.canDirectToGame) return false
    return true
  })

  /**
   * @description: 获取消息是否已读
   * @return {*}
   */
  function getMessagesData (): void {
    const homeStore = useHomeStore()
    isRead.value = !(globalStore.getUserInfo.unRead > 0)
    homeStore.setReadState(isRead.value)
  }

  /**
   * @description: 获取首页顶部轮播图
   * @return {*}
   */
  const getBannerApi = async (): Promise<void> => {
    const res = await AwaitApiResult(getBannerList())
    if (res) {
      homeState.banner = res.data
      if (homeState.banner.length === 0) {
        homeState.banner.push({
          bannerUrl: getIcons('home', 'banner'),
          url: '',
        })
      }
    }
  }

  /**
   * @description: app下载
   * @return {*}
   */
  async function onDown (): Promise<void> {
    const res = await AwaitApiResult(getHomeData())
    if (res) {
      const ua = navigator.userAgent.toLowerCase()
      let url = ''
      if (ua.indexOf('windows') != -1 || ua.indexOf('android') != -1) {
        url = res.data.androidUrl
      } else if (ua.indexOf('iphone') != -1 || ua.indexOf('mac') != -1 || ua.indexOf('ipad') != -1) {
        if (res.data.iosUrl) {
          url = res.data.iosUrl
        } else {
          const isSafari = /safari/.test(ua) && !/chrome|crios|fxios|edgios/.test(ua)
          if (isSafari) {
            homeState.iosDialog = true
            return
          }
          if (PWA.value.canIUse) {
            PWA.value.download && PWA.value.download()
          } else {
            homeState.iosDialog = true
          }
          return
        }
      } else {
        url = res.data.androidUrl
      }
      partyUrl(url)
      // window.open(url, '_blank')
    }
  }

  /**
   * @description: 获取中奖信息和盈利
   * @return {*}
   */
  async function getWinInfoDetail (): Promise<void> {
    const [err, res] = await AwaitWrap(getDailyProfitRank())
    if (err) {
      showFailToast({
        message: err.msg,
        wordBreak: 'break-word',
      })
    } else if (res) {
      homeState.winInfoList = res.dataList || []
      const dailyProfitList = res.penarikanList || []
      if (dailyProfitList.length > 0) {
        homeState.rankList = dailyProfitList
      }
    }
  }
  /**
   * @description: 游戏大类获取，页面展示的大类显示隐藏和顺序都根据这个接口
   * @return {*}
   */
  const getGameType = async () => {
    // NCZ 這部分處理。
    if (import.meta.env.VITE_APP_IS_WEB_PGPC) {
      const { fetchGameCategoryList, allGameList } = useFetchGame()
      await fetchGameCategoryList()
      homeState.gameTypeList = allGameList.value
    } else {
      const res = await AwaitApiResult<ObjResNull<HomeGameList[]>>(GetGameCategoryList())
      if (res) {
        homeState.gameTypeList = res.data || []
        if (changeTitle) homeState.gameTypeList.forEach(i => (i.title = getGameTitle(i.categoryCode)))
      }
    }

    // 設定第一個 type
    if (unref(currentGameType) === '' && homeState.gameTypeList.length > 0) {
      setCurrentGameType(homeState.gameTypeList[0].categoryCode)
    }
  }

  /**
   * @description: 获取所有游戏
   * @return {*}
   */
  const getAllGame = async () => {
    const res = await AwaitApiResult<ObjResNull<AllGameList>>(getAllGameList())
    const otherList = ['slot', 'video', 'chess', 'sport', 'lottery']
    if (res) {
      const gameData: {
        [key: string]: any
      } = {}
      for (const [key, value] of Object.entries(res.data)) {
        const k = key.toLocaleLowerCase()
        if (key !== 'popular' && otherList.includes(k)) {
          gameData[k] = (value as Array<any>).filter((suc: any) => suc.state === 1)
        } else {
          gameData[k] = value
        }
      }
      homeState.allGameList = gameData as AllGameList
    }
  }

  /**
   * @description: 获取电子游戏厂商及其子游戏
   * @return {*}
   */
  const getSlotList = async () => {
    const res = await AwaitApiResult(GetElectronWithChildGame())
    if (res) {
      homeState.slotsGame = res.data
      homeState.slotsGameMap = res.data.reduce((acc, curr) => ({ ...acc, [curr.vendorCode]: curr.childList }), {})
    }
  }

  // 电子 含子类游戏
  const getVideonChildGame = async () => {
    const res = await AwaitApiResult(getVideWithChildGame())
    if (!res) return
    homeState.videoGame = res.data
    homeState.videoGameMap = res.data.reduce((acc, curr) => ({ ...acc, [curr.vendorCode]: curr.childList }), {})
  }
  // 跳转二级页面
  const gol2 = (type: any) => {
    router.push({
      name: 'AllGames',
      query: {
        type,
      },
    })
  }

  // 跳转二级页面棋牌

  const gol2chess = (info: any, list: any) => {
    sessionStorage.setItem('gameType', JSON.stringify('chess'))
    sessionStorage.setItem('clickedItem', JSON.stringify(info))
    sessionStorage.setItem('slotGamesList', JSON.stringify(list))
    router.push({
      name: 'AllOnlineGames',
    })
  }

  /**
   * @description: 打开三方游戏
   * @param {any} info
   * @return {*}
   */
  const openThirdGame = (info: any) => {
    if (!globalStore.token) {
      router.push({ name: 'login' })
      return
    }

    showDialog({
      title: t('tips'),
      message: t('tipsPlayGame'),
      cancelButtonText: t('cancel'),
      showCancelButton: true,
    }).then(async () => {
      start(() => {
        // source.cancel('cancel')
        showDialog({
          title: '',
          message: t('gameLoadTimeOut'),
        }).then(() => {
          router.push({
            path: '/',
          })
        })
      })
      const query = {
        gameCode: info.gameCode || info.gameID,
        vendorCode:
          info.hasOwnProperty('vendorCode') && info.vendorCode
            ? info.vendorCode
            : Number(info.vendorId) || Number(info.slotsTypeID),
        returnUrl: location.origin,
      }
      const res = await AwaitApiResult(
        getGameUrl({
          ...query,
          phonetype: getUserAgent(),
        })
      )
      if (res && !flag.value) {
        !flag.value && end(true)
        if (['5'].includes(`${info.vendorId}`)) {
          // pg游戏处理
          return router.push({
            name: 'game',
            query: {
              url: encodeToBase64(res?.data?.url),
            },
          })
        }
        if (isHybridApp()) {
          openBrowser('game', {
            ...(res?.data || {}),
            gameName: info.slotsName || info.gameNameEn || '',
          })
        } else {
          partyUrl(res?.data, 1)
        }
      } else {
        !flag.value && end(true)
      }
      // !flag.value && end()
    })
  }

  // 三方游戏判断容许首充才能进入游戏
  const onItemClick = (info: any) => {
    isAlowGame(info, openThirdGame)
  }
  // 判断彩票容许首充才能进入游戏
  const isAlowGame = async (item: any, callFn: any) => {
    if (isAlowNoRechargeGame.value) {
      const res = await AwaitApiResult(GetAllowBetSetting())
      const {
        data: { allowNoRechargeGame, userRechargeTimes, lowestRechargeAmountToGame, userRechargeAmount, canDirectToGame },
      } = res
      if (allowNoRechargeGame == '1') return callFn(item)
      if (canDirectToGame) return callFn(item)
      if (Number(lowestRechargeAmountToGame) && Number(lowestRechargeAmountToGame) > userRechargeAmount) {
        return showDialog({
          title: t('tips'),
          message: `${t('gameT', [currency(lowestRechargeAmountToGame)])}`,
          showCancelButton: true,
        }).then(() => {
          router.push({ name: 'Recharge' })
        })
      }
      if (Number(lowestRechargeAmountToGame) === 0 && userRechargeTimes === 0) {
        return showDialog({
          title: t('tips'),
          message: `${t('code1003')}\n${t('rechargeNow')}`,
          showCancelButton: true,
        }).then(() => {
          router.push({ name: 'Recharge' })
        })
      }
      callFn(item)
    } else {
      callFn(item)
    }
  }

  return {
    getBannerApi,
    onDown,
    getMessagesData,
    getWinInfoDetail,
    gameMenus,
    getGameType,
    currentGameType,
    setCurrentGameType,
    getAllGame,
    onItemClick,
    getSlotList,
    getVideonChildGame,
    isRead,
    getBanner,
    getWinInfo,
    showChanglong,
    isAppDownload,
    isAppDownloadIcon,
    showPWA,
    projectIcon,
    homeState,
    gol2,
    gol2chess,
    downloadIcon,
    webSiteUrl,
    isAlowGame,
  }
}
