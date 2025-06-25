import { championEntrance, getChampionTaskDetail, getTop10ChampionTaskDataUserList, getThirdGameListC, getGameUrl } from '@/api'
import { AwaitApiResult, encodeToBase64, getUserAgent, partyUrl } from '@/utils'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { GlobalStore } from '@/stores'
import { useRouter } from 'vue-router'
import { showDialog, type TabsInstance } from 'vant'
import { useLoading } from '@/components/common/use'
import { isHybridApp, openBrowser } from '@/utils/jsBridge'

const serviceNowTime = ref()
export function useChampionship () {
  const { t } = useI18n()
  const router = useRouter()
  const championEntranceVO: any = ref({})
  const championTaskDetailVO = ref<any>({})
  const top10UserListVO = ref<any[]>([])
  const thirdGameListVO = ref<any[]>([])

  // 0-未开始，1-进行中，2-已结束
  const tabList = [
    {
      key: 1,
      title: t('ongoing'),
    },
    {
      key: 0,
      title: t('cpsTip2'),
    },
    {
      key: 2,
      title: t('ended'),
    },
  ]

  // 1=银行卡，2 =UPI，3=USDT,  4=E-Wallet，5=PIX，6=WavePay，7=TRX，8= KBZPay,10=USDT2  20=NewUPI
  const type: any = {
    1: t('bankCard'),
    2: 'UPI',
    3: 'USDT',
    4: 'E-Wallet',
    5: 'PIX',
    6: 'WavePay',
    7: 'TRX',
    8: 'KBZPay',
    10: 'USDT2',
    20: 'NewUPI',
  }
  // 竞标赛入口
  const championEntranceV = async () => {
    const res = await AwaitApiResult(championEntrance())
    if (res?.data) {
      championEntranceVO.value = res?.data
      serviceNowTime.value = res.serviceNowTime
    }
  }

  // 获取赛事详细信
  const getChampionTaskDetailV = async (championId: number) => {
    const res = await AwaitApiResult(getChampionTaskDetail({ championId }))
    if (res?.data) {
      championTaskDetailVO.value = res?.data
      serviceNowTime.value = res.serviceNowTime
      if (championTaskDetailVO.value?.vendorId) {
        getThirdGameListV(championTaskDetailVO.value.vendorId)
      }
    }
  }

  // 赛事前10名会员
  const getTop10UserList = async (championId: number) => {
    const res = await AwaitApiResult(getTop10ChampionTaskDataUserList({ championId }))
    if (res?.data) {
      top10UserListVO.value = res?.data
    }
  }

  // 获取子游戏
  const getThirdGameListV = async (vendorId: number) => {
    const res = await AwaitApiResult(
      getThirdGameListC({
        type: vendorId,
        gameNameEn: '',
        isMiniGame: false,
      })
    )
    if (res?.data) {
      thirdGameListVO.value = res?.data?.gameLists
    }
  }

  // 跳转游戏
  const { start, end, flag } = useLoading()
  function onItemClick (item: { gameID: string; vendorId: number; vendorCode: any; gameNameEn: string; slotsTypeID: any }) {
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
        showDialog({
          title: '',
          message: t('gameLoadTimeOut'),
        }).then(() => {
          router.push({
            path: '/',
          })
        })
      })
      const res = await AwaitApiResult(
        getGameUrl({
          vendorCode:
            item.hasOwnProperty('vendorCode') && item.vendorCode
              ? item.vendorCode
              : Number(item.vendorId) || Number(item.slotsTypeID),
          gameCode: item.gameID,
          phonetype: getUserAgent(),
          returnUrl: location.origin,
        })
      )
      if (res && !flag.value) {
        !flag.value && end(true)
        if ([5].includes(item.vendorId)) {
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
            gameName: item.gameNameEn,
          })
        } else {
          partyUrl(res?.data, 1)
        }
      } else {
        !flag.value && end(true)
        return
      }
      !flag.value && end()
    })
  }

  return {
    tabList,
    championEntranceV,
    championEntranceVO,
    serviceNowTime,
    getChampionTaskDetailV,
    championTaskDetailVO,
    getTop10UserList,
    top10UserListVO,
    thirdGameListVO,
    onItemClick,
    type,
  }
}
