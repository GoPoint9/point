import { AwaitApiResult } from '@/utils'
import { getGiftPackUserRewardRecord, getReceiveGiftPackUserReward } from '@/api'
import { computed, reactive } from 'vue'
import { showSuccessToast } from 'vant'
import { useI18n } from 'vue-i18n'

export function usePackage () {
  const { t } = useI18n()
  const store = reactive({
    firstDepositConfig: {
      activityStartDate: '',
      bonusLimit: 0,
      firstDeposiSendBonust: 0,
    },
    giftPackConfigList: [],
    rewardRecordList: [],
  })
  const time = computed<string>(() => store.firstDepositConfig?.activityStartDate)
  const bonusLimit = computed<number>(() => store.firstDepositConfig?.bonusLimit)
  const firstDeposiSendBonust = computed<number>(() => store.firstDepositConfig?.firstDeposiSendBonust)
  const giftPackConfigList = computed(() => store.giftPackConfigList || [])
  const rewardRecordList = computed(() => store.rewardRecordList || [])
  const getConfig = async () => {
    const data = await AwaitApiResult(getGiftPackUserRewardRecord())
    if (data) {
      store.firstDepositConfig = data.data.firstDepositConfig
      store.giftPackConfigList = data.data.giftPackConfigAwardList
      store.rewardRecordList = data.data.newUserRewardRecordList
    }
  }
  const onReceive = async (orderId: number) => {
    const data = await AwaitApiResult(
      getReceiveGiftPackUserReward({
        orderId,
        optType: 2,
      })
    )
    if (data) {
      showSuccessToast(t('receiveSuccess'))
      await getConfig()
    }
  }
  const onApply = async (orderId: number) => {
    const data = await AwaitApiResult(
      getReceiveGiftPackUserReward({
        orderId,
        optType: 1,
      })
    )
    if (data) {
      showSuccessToast(t('applySuccess'))
      await getConfig()
    }
  }
  return {
    store,
    time,
    bonusLimit,
    firstDeposiSendBonust,
    giftPackConfigList,
    rewardRecordList,
    onReceive,
    onApply,
    getConfig,
  }
}
