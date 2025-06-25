import { computed, reactive, inject, provide, ref, Ref } from 'vue'
import type { HomeGameList, AllGameList, Popular } from '@/types'
import { getAllGameList, GetElectronWithChildGame, GetGameCategoryList, getGameUrl, getVideWithChildGame } from '@/api'
import { useI18n } from 'vue-i18n'
import type { InjectionKey, ComputedRef } from 'vue'
import { showDialog } from 'vant'
import { AwaitApiResult, encodeToBase64, getUserAgent, partyUrl } from '@/utils'
import { useRouter } from 'vue-router'
import { isHybridApp, openBrowser } from '@/utils/jsBridge'
import { useLoading } from '@/components/common/use'
import { GlobalStore } from '@/stores'
import popular from '@/assets/homeImg/damanHome/popular.png'
import lottery from '@/assets/homeImg/damanHome/lottery.png'
import video from '@/assets/homeImg/damanHome/video.png'
import slot from '@/assets/homeImg/damanHome/slot.png'
import sport from '@/assets/homeImg/damanHome/sport.png'
import chess from '@/assets/homeImg/damanHome/chess.png'
import fish from '@/assets/homeImg/damanHome/fish.png'
import flash from '@/assets/homeImg/damanHome/flash.png'

interface ElectronItem {
  sort: number
  vendorCode: string
  childList: HomeGameList[]
}
interface GameStore {
  gameList: HomeGameList[]
  categoryList: HomeGameList[]
  allGame: AllGameList | null
  active: number
  loading: boolean
  electron: ElectronItem[]
  video: ElectronItem[]
  imgMap: Map<string, string>
}

const store = reactive<GameStore>({
  gameList: [],
  categoryList: [],
  active: 0,
  allGame: null,
  loading: false,
  electron: [],
  video: [],
  imgMap: new Map(),
})

const gameId: { [key: number]: string[] } = {
  1: ['popular'],
  2: ['sport', 'chess', 'video'],
  3: ['lottery'],
  4: ['slot'],
  5: ['flash', 'fish'],
}
interface GameProvider {
  gameList: ComputedRef<HomeGameList[]>
  allGame: ComputedRef<AllGameList | null>
  loading: ComputedRef<boolean>
  current: ComputedRef<HomeGameList>
  currentGame: ComputedRef<string>
  currentList: ComputedRef<HomeGameList[]>
  platformList: ComputedRef<HomeGameList[]>
  gameTopList: ComputedRef<HomeGameList[]>
  electronList: ComputedRef<ElectronItem[]>
  videoList: ComputedRef<ElectronItem[]>
  active: Ref<number>
  gameType: ComputedRef<number>
  setActive: (value: number) => void
  onGame: (item: HomeGameList) => void | Promise<void>
  goGame: (item: HomeGameList) => void | Promise<void>
  getElectronChildGame: () => Promise<void>
  onItemLottery: (item: any) => void | Promise<void>
  lotteryRoutes: Map<number, any>
  getVideonChildGame: () => Promise<void>
}
export const GAME_PROVIDER_KEY: InjectionKey<GameProvider> = Symbol('GAME_PROVIDER_KEY')

export function useGameContext () {
  return inject<GameProvider>(GAME_PROVIDER_KEY, {} as GameProvider)
}

/*
 首页游戏区 二级页面
 */
export function useGame () {
  const router = useRouter()
  const { start, end, flag } = useLoading()
  const { t } = useI18n()
  const KeyMap: any = {
    popular: {
      isShow: true,
      key: 'popular',
      title: t('hot'),
      image: popular,
      img: '',
      state: 1,
    },
    video: {
      isShow: true,
      key: 'video',
      title: t('live'),
      image: video,
      img: '',
    },
    slot: {
      isShow: true,
      key: 'slot',
      title: t('electronic'),
      image: slot,
      img: '',
    },
    sport: {
      isShow: true,
      key: 'sport',
      title: t('sport'),
      image: sport,
      img: '',
    },
    chess: {
      isShow: true,
      key: 'chess',
      title: t('chess'),
      image: chess,
      img: '',
    },
    fish: {
      isShow: true,
      key: 'fish',
      title: t('fishing'),
      image: fish,
      img: '',
    },
    flash: {
      isShow: true,
      key: 'flash',
      title: t('miniGame'),
      image: flash,
      img: '',
    },
    lottery: {
      isShow: true,
      key: 'lottery',
      title: t('lottery'),
      image: lottery,
      img: '',
    },
  }
  const gameList = computed<HomeGameList[]>(() =>
    store.categoryList.map((item) => {
      const key = item.categoryCode?.toLowerCase()
      const data = KeyMap[key] || {}
      return Object.assign(data, { img: item.categoryImg })
    })
  )
  const active = ref<number>(0)
  const gameListKey = computed(() => gameList.value.map((item) => item.key))
  const allGame = computed(() => store.allGame)
  const electronList = computed(() => store.electron)
  const videoList = computed(() => store.video)
  // 当前选中类型
  const current = computed(() => gameList.value[active.value])
  const currentGame = computed(() => gameList.value[active.value]?.key || '')
  const currentList = computed<HomeGameList[]>(() => store.allGame?.[currentGame.value] || [])
  const platformList = computed(() => {
    if (!store.allGame) return []
    if (!store.allGame) return []
    if (!store.allGame.popular) return []
    return (store.allGame.popular as any)[0]
  })
  const gameTopList = computed(() => {
    if (!store.allGame) return []
    if (!store.allGame.popular) return []
    return (store.allGame.popular as any)[1]
  })
  const lotteryType = computed(() => {
    if (!store.allGame) return []
    return store.allGame.lottery || []
  })
  const loading = computed(() => store.loading)

  const gameType = computed(() => {
    let id = -1
    for (const [key, value] of Object.entries(gameId)) {
      if (value.includes(currentGame.value)) {
        id = Number(key)
      }
    }
    return id
  })
  const lotteryRoutes: Map<number, any> = new Map(
    [
      {
        value: 1,
        path: 'WinGo',
        rule: 'winGoRule',
      },
      {
        value: 3,
        path: '5D',
        rule: 'd5Rule',
      },
      {
        value: 2,
        path: 'K3',
        rule: 'k3Rule',
      },
      {
        value: 4,
        path: 'WinTrx',
        rule: 'trxRule',
      },
      {
        value: 5,
        path: 'XoSo',
        rule: 'xosoRule',
      },
      {
        value: 6,
        path: 'XoSo',
        rule: 'xosoRule',
      },
      {
        value: 7,
        path: 'Binguo',
        rule: '',
      },
      {
        value: 8,
        path: '4D',
        rule: '',
      },
    ].map((item: any) => [item.value, item])
  )
  const setActive = (index: number) => {
    active.value = index
  }
  const goGame = async (item: HomeGameList) => {
    const globalStore = GlobalStore()
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
          message: t('gameLoadTimeOut'), /** 游戏加载超时 */
        }).then(() => {
          router.push({
            path: '/',
          })
        })
      })
      const query = {
        gameCode: item.gameCode || item.gameID,
        vendorCode:
          item.hasOwnProperty('vendorCode') && item.vendorCode
            ? item.vendorCode
            : Number(item.vendorId) || Number(item.slotsTypeID),
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
        if (['5'].includes(`${item.vendorId}`)) {
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
            gameName: item.slotsName || item.gameNameEn || '',
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
  const onItemLottery = (item: any) => {
    const lotteryRoute = lotteryRoutes.get(item.id || item.categoryId)
    if (!lotteryRoute) return console.error('no found id path')
    router.push({
      name: 'AllLotteryGames-' + lotteryRoute.path,
      query: {
        typeId: item.typeId,
        id: item.id,
      },
    })
  }
  const onGame = async (item: HomeGameList) => {
    const globalStore = GlobalStore()
    if (!globalStore.token) {
      await router.push({ name: 'login' })
      return
    }
    if (['chess', 'slot', 'video'].includes(item.key || currentGame.value)) {
      const list = store.allGame?.[item.key || currentGame.value] || []
      sessionStorage.setItem('slotGamesList', JSON.stringify(list))
      sessionStorage.setItem('gameType', JSON.stringify(item.key || currentGame.value))
      sessionStorage.setItem('clickedItem', JSON.stringify(item))
      await router.push({
        name: 'AllOnlineGames',
        query: {
          game: item.key || currentGame.value,
          vendorCode: item.slotsName,
        },
      })
      return
    }
    await goGame(item)
  }
  const formatAllGame = (data: AllGameList) => {
    const otherList = ['slot', 'video', 'chess', 'sport', 'lottery']
    const game: AllGameList = {} as AllGameList
    for (const [key, value] of Object.entries(data)) {
      const k = key.toLocaleLowerCase()
      if (otherList.includes(k)) {
        game[k] = value.filter((suc: any) => suc.state === 1)
      } else if (k === 'popular') {
        const popular = data[k] as Popular
        game[k] = [popular.platformList, popular.clicksTopList] as any
        game.clicksVideoTopList = popular.clicksVideoTopList as any
      } else {
        game[k] = value
      }
    }
    return game
  }

  const getGameList = async (isCategory: boolean = true) => {
    const none = async () => ({ data: null })
    if (store.loading) return
    store.loading = true
    const [{ data }, { data: allGame }] = await Promise.all([isCategory ? GetGameCategoryList() : none(), getAllGameList()])
    const categoryList = (data || []).filter((item: HomeGameList) => item.state === 1)
    store.imgMap = new Map(categoryList.map((item) => [item.categoryCode.toLowerCase(), item.categoryImg]))
    store.categoryList = categoryList.filter((item) => item.categoryCode !== 'BigAward')
    store.allGame = formatAllGame(allGame) || {}
    store.loading = false
    sessionStorage.setItem('gameData', JSON.stringify(allGame))
  }
  // 电子 含子类游戏
  const getElectronChildGame = async () => {
    const { result, data } = await GetElectronWithChildGame()
    if (!data) return
    store.electron = data
  }
  // 电子 含子类游戏
  const getVideonChildGame = async () => {
    const { result, data } = await getVideWithChildGame()
    if (!data) return
    store.video = data
  }
  const setMenu = (data: any) => {
    store.gameList = data
  }
  const useProvid = () => {
    provide(GAME_PROVIDER_KEY, {
      gameList,
      currentGame,
      current,
      platformList,
      loading,
      active,
      gameType,
      currentList,
      gameTopList,
      allGame,
      lotteryRoutes,
      videoList,
      electronList,
      onGame,
      goGame,
      setActive,
      getElectronChildGame,
      getVideonChildGame,
      onItemLottery,
    })
  }
  return {
    store,
    gameList,
    currentGame,
    platformList,
    current,
    loading,
    active,
    gameType,
    currentList,
    gameTopList,
    allGame,
    lotteryType,
    gameListKey,
    setMenu,
    goGame,
    onItemLottery,
    onGame,
    getGameList,
    setActive,
    useProvid,
    getElectronChildGame,
    getVideonChildGame,
  }
}
