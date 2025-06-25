import {
  GetActiveSetting,
  GetFirstRechargeList,
  NeedPopupFirstRecharge,
  ReceiveFirstRechargeReward,
  SaveUserDayRequest,
  SaveUserGuidelines,
  GetDailyAwardCount
} from '@/api'
import { AwaitApiResult } from '@/utils'
import { computed, reactive } from 'vue'

const ActiveObj = reactive({
  isTaskState: false, // 是否开启邀请人任务
  isOpenJackpotReward: false, // 是否开启超级大奖
  isOpenWashCode: false, // 是否开启洗码量
  unJackpotCount: 0, // 未领取超级大奖数
  isOpenActivityAward: false, // 是否开启活动奖励
  unWeeklyAwardCount: 0, // 未领取每周奖励数
  unDayAwardCount: 0, // 未领取每日奖励数
  isFinishUserGuidelines: false, // 只提示一次是否需要弹窗，后台参数 true:已完成，false：未完成，前端展示取反后端参数
  isFirstUserDayRequest: false, // 是否弹窗每日提示，后台参数true：首次，false：不是首次
  isShowFirstSaveDialog: false, // 是否展示首充活动弹窗
  FirstRechargeList: [], // 首存奖励任务列表
  showReceiveDialog: false,
  receiveAmount: 0,
  newbieGiftPackCount: 0, // 未领取新手礼包奖励数
  isOpenChampion: 0, // 是否展示锦标赛入口
  newMemberGiftPackageSwitch: false, // 新会员礼包
  firstDepositRewardCodeAmount: '', // 首充戏码量倍数
})
const ActiveTaskMap = {
  A1: { goPath: 'Recharge', icon: 'weeklyType1' }, // Recharge amount
  A2: { goPath: 'Recharge', icon: 'weeklyType1' }, // Recharge times
  A3: { goPath: 'Withdraw', icon: 'weeklyType2' }, // withdraw amount
  A4: { goPath: 'Withdraw', icon: 'weeklyType2' }, // withdraw times
  B5: { goPath: 'home', homeType: 'lottery', icon: 'weeklyType3' }, // bit lotterry amount
  B6: { goPath: 'home', homeType: 'lottery', icon: 'weeklyType3' }, // bit lotterry times
  B7: { goPath: 'home', homeType: 'slot', icon: 'weeklyType4' }, // bit Electronic game amount
  B8: { goPath: 'home', homeType: 'slot', icon: 'weeklyType4' }, // bit Electronic game times
  B9: { goPath: 'home', homeType: 'video', icon: 'weeklyType5' }, // bit video game amount
  B10: { goPath: 'home', homeType: 'video', icon: 'weeklyType5' }, // bit video game amount
  B11: { goPath: 'home', homeType: 'sport', icon: 'weeklyType6' }, // bit sport amount
  B12: { goPath: 'home', homeType: 'sport', icon: 'weeklyType6' }, // bit sport times
  B13: { goPath: 'home', homeType: 'chess', icon: 'weeklyType7' }, // bit chess amount
  B14: { goPath: 'home', homeType: 'chess', icon: 'weeklyType7' }, // bit chess times
  C15: { goPath: 'PromotionShare', icon: 'weeklyType8' }, // Number of invites
  D16: { goPath: 'DailySignIn', icon: 'weeklyType9' }, // Active continuous check-in
  D17: { goPath: 'SuperJackpot', icon: 'weeklyType10' }, // super jackpot
  D18: { goPath: 'StrongBox', icon: 'weeklyType11' }, // recharge amount in the safety box
  D19: { goPath: 'Laundry', icon: 'weeklyType12' }, // recharge amount in the Amount of laundry
}
const translateBoolean = (val: string) => {
  return val === '1'
}
export function useActive () {
  async function getActive () {
    const res: any = await AwaitApiResult(GetActiveSetting())
    if (res.code === 0 || res.data) {
      ActiveObj.isTaskState = translateBoolean(res.data.isTaskState)
      ActiveObj.isOpenJackpotReward = translateBoolean(res.data.isOpenJackpotReward)
      ActiveObj.isOpenWashCode = translateBoolean(res.data.isOpenWashCode)
      ActiveObj.isOpenActivityAward = translateBoolean(res.data.isOpenActivityAward)
      ActiveObj.unJackpotCount = res.data.unJackpotCount
      ActiveObj.unWeeklyAwardCount = res.data.unWeeklyAwardCount || 0
      ActiveObj.isFinishUserGuidelines = !res.data.isFinishUserGuidelines
      ActiveObj.isFirstUserDayRequest = res.data.isFirstUserDayRequest
      ActiveObj.newbieGiftPackCount = res.data.newbieGiftPackCount || 0
      ActiveObj.isOpenChampion = res.data.isOpenChampion
      ActiveObj.newMemberGiftPackageSwitch = translateBoolean(res.data.newMemberGiftPackageSwitch)
    }
  }
  async function saveUserGuidelines () {
    const res = await AwaitApiResult(SaveUserGuidelines())
    if (res.code == 0) ActiveObj.isFinishUserGuidelines = false
  }
  async function saveUserDayRequest () {
    const res = await AwaitApiResult(SaveUserDayRequest())
    if (res.code == 0) ActiveObj.isFirstUserDayRequest = false
  }
  async function needPopupFirstRecharge () {
    const res = await AwaitApiResult(NeedPopupFirstRecharge())
    if (res.code == 0) ActiveObj.isShowFirstSaveDialog = res.data
  }
  async function getFirstRechargeList (val: boolean = false) {
    if (!localStorage.getItem('token')) return
    const res = await AwaitApiResult(GetFirstRechargeList({ getAll: val }))
    if (res?.code == 0) {
      let isFinish = false
      ActiveObj.FirstRechargeList = res.data.map((item: any) => {
        if (isFinish) item.canReceive = false
        if (item.canReceive) isFinish = true
        return item
      })
      return new Promise((resolve) => {
        resolve(res.data)
      })
    }
  }
  async function receiveFirstRechargeReward (taskId: any) {
    const res = await AwaitApiResult(ReceiveFirstRechargeReward({ taskId }))
    if (res?.code == 0) {
      ActiveObj.isShowFirstSaveDialog = false
      getFirstRechargeList()
      return new Promise((resolve) => {
        resolve(true)
      })
    }
    return new Promise((resolve) => {
      resolve(res?.data || null)
    })
  }
  async function getDailyAwardCount () {
    const res = await AwaitApiResult(GetDailyAwardCount())
    if (res.code == 0) ActiveObj.unDayAwardCount = res?.data || 0
  }
  const setShowFirstSaveDialog = (value: boolean = false) => {
    ActiveObj.isShowFirstSaveDialog = value
  }
  const ActiveSotre = computed(() => ActiveObj)
  const allUnAwardCount = computed(
    () => ActiveSotre.value.unWeeklyAwardCount + ActiveSotre.value.unDayAwardCount + ActiveSotre.value.newbieGiftPackCount
  )
  return {
    // ActiveTaskMap,
    ActiveSotre,
    allUnAwardCount,
    setShowFirstSaveDialog,
    getActive,
    saveUserGuidelines,
    saveUserDayRequest,
    needPopupFirstRecharge,
    getFirstRechargeList,
    receiveFirstRechargeReward,
    getDailyAwardCount,
  }
}
