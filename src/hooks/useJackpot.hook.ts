import { useRouter } from 'vue-router'
import { computed, reactive, ref } from 'vue'
import { useCommonStore } from '@/stores'
import { ThirdGameReceiveGrandPrizeReward, GetReWordConfigList, ReceiveAllGrandAward } from '@/api'
import { AwaitApiResult } from '@/utils'
interface JackpotItem {
  isReceive: number
  createTime: string
  gameName: string
  orderId: number
  bonusAmount: number
  multiple: number
  imgUrl: string
  expirationFormatTime: string
  orderNo: number
}
interface RuleItem {
  multipleName: string
  betAmountName: string
  awardAmount: number
}
interface Store {
  ruleList: RuleItem[]
}
export function useJackpot () {
  const router = useRouter()
  const { setLoading } = useCommonStore()
  const listRef = ref()
  const RewardsRecordPageList = ref<JackpotItem[]>([])
  const DialogShow = ref(false)
  const recivedAll = ref({
    orderCount: 0,
    totalReceiveAmount: 0,
    type: -1,
  })
  const isRecived = computed(() => {
    if (!RewardsRecordPageList.value.length) return true
    const list = RewardsRecordPageList.value.filter((item) => item.isReceive === 0)
    if (!list.length) return true
    return false
  })
  const pageQuery = reactive<any>({
    pageSize: 10,
  })

  // 规则
  const store = reactive<Store>({
    ruleList: [],
  })
  const ruleList = computed(() => store.ruleList)

  const getRuleList = async () => {
    const res = await GetReWordConfigList()
    if (res?.data) {
      store.ruleList = res.data
    }
  }

  const onLaundy = () => {
    DialogShow.value = false
    recivedAll.value.type = -1
    listRef.value.resetRefresh()
  }
  const onRecived = async (orderId: number) => {
    setLoading(true)
    const res = await ThirdGameReceiveGrandPrizeReward({ orderId })
    if (res.msg) {
      setLoading(false)
      DialogShow.value = true
    }
    setLoading(false)
  }
  const onRecivedAll = async () => {
    if (isRecived.value) return
    setLoading(true)
    const res = await AwaitApiResult(ReceiveAllGrandAward())
    if (res) {
      recivedAll.value.orderCount = res.data.orderCount
      recivedAll.value.totalReceiveAmount = res.data.totalReceiveAmount
      DialogShow.value = true
      recivedAll.value.type = 1
      if (!listRef.value) return
      listRef.value.resetRefresh()
    }
    setLoading(false)
  }

  const goStar = () => {
    router.push({
      name: 'SuperJackpot-star',
    })
  }
  const goRule = () => {
    router.push({
      name: 'SuperJackpot-rule',
    })
  }
  const goBack = () => {
    router.go(-1)
  }
  const gotoCustom = () => {
    router.push({ name: 'CustomerService' })
  }
  return {
    goRule,
    goStar,
    onLaundy,
    onRecived,
    goBack,
    gotoCustom,
    getRuleList,
    onRecivedAll,
    RewardsRecordPageList,
    listRef,
    DialogShow,
    pageQuery,
    ruleList,
    recivedAll,
    isRecived,
  }
}
