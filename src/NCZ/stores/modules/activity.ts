import { AwaitApiResult } from '@/utils'
import { $t } from '@/languages'
import * as api from '@/NCZ/api'
// const { post } = api

const initialState = () => ({
  daylevel: '',
  growthLevel: '',
  dayGet: false,
  growthGet: false,
  growthGetText: $t('Common.label_not_claimable'),
  dayGetText: $t('Common.label_not_claimable'),
  dayBet: 0.00, // 昨日投注
  dayPorprotion: 0, // 嘉獎比例
  dayMoney: 0,
  growthMoney: 0,
  monthlyGain: 0,
  monthlyGainDiscrepancy: 0,
  isExpired: null,
  expireTime: null,
  hourlyPrivilegeBetSectionRatios: [], // 返點詳情
  signActivity: {},
  signHistory: {},
  detailList: [],
  isTurntableOpen: 0,

  infoPanelList: [],
  showDialog: false,
  unMissionReceiveCount: 0,
})

export const useActivityStore = defineStore({
  id: 'activityStore',
  state: initialState,
  getters: {
    imgFtpUrl () {
      const siteStore = useSiteStore()
      const { imgFtpUrl } = siteStore.config
      return imgFtpUrl
    },
    activityConfigH5 () {
      const siteStore = useSiteStore()
      return siteStore.activityConfigH5
    },
  },
  actions: {
    ActivityInit () {
      return this.ActivityCentersResult()
    },
    async ActivityCentersResult () {
      const res = await AwaitApiResult(api.activityCentersResult())
      if (!res) return
      // this.$patch
      console.log('[Actions Activitycentersresult res] ', res)

      this.$patch(state => {
        const formatLevel = (level: string) => {
          if (level === '测试组') return level
          return level === '未登录' ? level : `VIP${level}`
        }
        const getClaimStatus = (sw: string) => {
          if (sw === '0') return { canClaim: true, text: $t('FinancialManagement.label_receive') }
          return { canClaim: false, text: $t('Common.label_not_claimable') }
        }
        const { dayAndGrowthInfo, hourlyPrivilegeBetSectionRatios = [], monthlyGain, monthlyGainDiscrepancy } = res.data
        const { dayMoney, growthMoney } = dayAndGrowthInfo

        state.hourlyPrivilegeBetSectionRatios = hourlyPrivilegeBetSectionRatios
        state.dayBet = dayMoney.bet
        state.daylevel = formatLevel(dayMoney.level)
        state.dayPorprotion = `${dayMoney.porprotion}%`
        state.dayMoney = dayMoney.gainValue
        state.isExpired = null
        state.expireTime = null

        state.growthMoney = growthMoney.growthMoney
        state.monthlyGain = monthlyGain
        state.monthlyGainDiscrepancy = monthlyGainDiscrepancy

        // sw: 0 可領取, 1 過期不可, 2 沒資格
        const dayClaimStatus = getClaimStatus(dayMoney.sw)
        state.dayGet = dayClaimStatus.canClaim
        state.dayGetText = dayClaimStatus.text

        if (dayMoney.sw === '2') {
          state.isExpired = dayMoney.isExpired
          state.expireTime = dayMoney.expireTime
        }

        state.growthLevel = formatLevel(growthMoney.level)
        const growthClaimStatus = getClaimStatus(growthMoney.sw)
        state.growthGet = growthClaimStatus.canClaim
        state.growthGetText = growthClaimStatus.text
      })

      return res
    },
    async GetActivitySetting () {
      const res = await AwaitApiResult(api.getActivitySetting())
      if (!res) return

      // this.infoPanelList = getInfoPanelList(res.data.data)
      this.$patch(state => {
        state.infoPanelList = getInfoPanelList(res.data.data)
      })

      const loginName = useUserStore().loginName
      const dailyDateKey = `dailyDate_${loginName}`

      const { unMissionReceiveCount } = res.data.data
      if (unMissionReceiveCount && localStorage.getItem(dailyDateKey) !== new Date().toLocaleDateString()) {
        localStorage.setItem(dailyDateKey, new Date().toLocaleDateString())

        // NOTE: 這邊會顯示領取獎勵彈窗

        this.$patch(state => {
          state.showDialog = true
          state.unMissionReceiveCount = unMissionReceiveCount
          // state.infoPanelList = getInfoPanelList(res.data.data)
        })
      }
    },
    async GetGrowthMoney () {
      const res = await AwaitApiResult(api.getGrowthMoney())
      if (!res) return
      // this.$patch
      console.log('[Actions Getgrowthmoney res] ', res)
    },
    async GetDayMoney () {
      const res = await AwaitApiResult(api.getDayMoney())
      if (!res) return
      // this.$patch
      console.log('[Actions Getdaymoney res] ', res)
    },
    async GetSignInActivity () {
      const res = await AwaitApiResult(api.getSignInActivity())
      if (!res) return
      // this.$patch
      console.log('[Actions Getsigninactivity res] ', res)
    },
    async SignIn () {
      const res = await AwaitApiResult(api.signIn())
      if (!res) return
      // this.$patch
      console.log('[Actions Signin res] ', res)
    },
    async GetSignInHistory () {
      const res = await AwaitApiResult(api.getSignInHistory())
      if (!res) return
      // this.$patch
      console.log('[Actions Getsigninhistory res] ', res)
    },
    async GetReferralRewardSetting () {
      const res = await AwaitApiResult(api.getReferralRewardSetting())
      if (!res) return
      // this.$patch
      console.log('[Actions Getreferralrewardsetting res] ', res)
    },
    async ReceiveAward () {
      const res = await AwaitApiResult(api.receiveAward())
      if (!res) return
      // this.$patch
      console.log('[Actions Receiveaward res] ', res)
    },
    async GetReferralRewardRecord () {
      const res = await AwaitApiResult(api.getReferralRewardRecord())
      if (!res) return
      // this.$patch
      console.log('[Actions Getreferralrewardrecord res] ', res)
    },
    async InvitationRecord () {
      const res = await AwaitApiResult(api.invitationRecord())
      if (!res) return
      // this.$patch
      console.log('[Actions Invitationrecord res] ', res)
    },
    async GetFirstDepositBonus () {
      const res = await AwaitApiResult(api.getFirstDepositBonus())
      if (!res) return
      // this.$patch
      console.log('[Actions Getfirstdepositbonus res] ', res)
    },
    async GetFirstDepositBonusReceiveBonus () {
      const res = await AwaitApiResult(api.getFirstDepositBonusReceiveBonus())
      if (!res) return
      // this.$patch
      console.log('[Actions async res] ', res)
    },
    async GetFirstDepositBonusNoMoreToday () {
      const res = await AwaitApiResult(api.getFirstDepositBonusNoMoreToday())
      if (!res) return
      // this.$patch
      console.log('[Actions async res] ', res)
    },
    async DailyMissionList () {
      const res = await AwaitApiResult(api.dailyMissionList())
      if (!res) return
      // this.$patch
      console.log('[Actions Dailymissionlist res] ', res)
    },
    async ReceieveAll () {
      const res = await AwaitApiResult(api.receieveAll())
      if (!res) return
      // this.$patch
      console.log('[Actions Receieveall res] ', res)
    },
    async Receieve () {
      const res = await AwaitApiResult(api.receieve())
      if (!res) return
      // this.$patch
      console.log('[Actions Receieve res] ', res)
    },
    async DailyMissionRecordList () {
      const res = await AwaitApiResult(api.dailyMissionRecordList())
      if (!res) return
      // this.$patch
      console.log('[Actions Dailymissionrecordlist res] ', res)
    },
    async GetNewMemberGiftPackage () {
      const res = await AwaitApiResult(api.getNewMemberGiftPackage())
      if (!res) return
      // this.$patch
      console.log('[Actions Getnewmembergiftpackage res] ', res)
    },
    async GetNewMemberGiftPackageInfo () {
      const res = await AwaitApiResult(api.getNewMemberGiftPackageInfo())
      if (!res) return
      // this.$patch
      console.log('[Actions Getnewmembergiftpackageinfo res] ', res)
    },
    async GiftPackageApplication () {
      const res = await AwaitApiResult(api.giftPackageApplication())
      if (!res) return
      // this.$patch
      console.log('[Actions Giftpackageapplication res] ', res)
    },
    async GiftPackageReceive () {
      const res = await AwaitApiResult(api.giftPackageReceive())
      if (!res) return
      // this.$patch
      console.log('[Actions Giftpackagereceive res] ', res)
    },
    async AgentRedPacketReceive () {
      const res = await AwaitApiResult(api.agentRedPacketReceive())
      if (!res) return
      // this.$patch
      console.log('[Actions Agentredpacketreceive res] ', res)
    },
    async AgentRedPacketReceiveIndex () {
      const res = await AwaitApiResult(api.agentRedPacketReceiveIndex())
      if (!res) return
      // this.$patch
      console.log('[Actions Agentredpacketreceiveindex res] ', res)
    },
    async IsTurntableOpen () {
      const res = await AwaitApiResult(api.isTurntableOpen())
      if (!res) return
      // this.$patch
      console.log('[Actions Isturntableopen res] ', res)
    },
    async TurntableIndex () {
      const res = await AwaitApiResult(api.turntableIndex())
      if (!res) return
      // this.$patch
      console.log('[Actions Turntableindex res] ', res)
    },
    async TurntableGetSettingData () {
      const res = await AwaitApiResult(api.turntableGetSettingData())
      if (!res) return
      // this.$patch
      console.log('[Actions Turntablegetsettingdata res] ', res)
    },
    async TurntableLottery () {
      const res = await AwaitApiResult(api.turntableLottery())
      if (!res) return
      // this.$patch
      console.log('[Actions Turntablelottery res] ', res)
    },
    async TurntableHistory () {
      const res = await AwaitApiResult(api.turntableHistory())
      if (!res) return
      // this.$patch
      console.log('[Actions Turntablehistory res] ', res)
    },
    async TurntableEvent () {
      const res = await AwaitApiResult(api.turntableEvent())
      if (!res) return
      // this.$patch
      console.log('[Actions Turntableevent res] ', res)
    },
    async TurntableTxSearch () {
      const res = await AwaitApiResult(api.turntableTxSearch())
      if (!res) return
      // this.$patch
      console.log('[Actions Turntabletxsearch res] ', res)
    },

  },
  persist: true, // true即为存储
})

const getInfoPanelList = (resDataData) => {
  const {
    unMissionReceiveCount,
    isOpenMission,
    isOpenNewMemberGift,
    isOpenPrivilege,
    isOpenReferralBet,
  } = resDataData

  const activityMap = {
    // 每日任務
    activityCenter: { count: unMissionReceiveCount, show: !!isOpenMission },
    // 新會員禮包
    NewMemberGift: { show: !!isOpenNewMemberGift },
    // 邀請獎勵
    invitation: { show: !!isOpenReferralBet },
    // 時時返水
    betting: { show: !!isOpenPrivilege },
  }

  const infoPanelList = [
    { img: 'activityCenter', title: $t('YJ.label_activity_award'), path: '/activity/DailyTasks', count: 0, show: false },
    { img: 'invitation', title: $t('YJ.invitationBonus'), path: '/invitationBonus', show: false },
    { img: 'betting', title: $t('YJ.code8028'), path: '/account/rebate', show: false },
    { img: 'NewMemberGift', title: $t('YJ.newMemeberGift'), path: '/activity/NewMemberGiftPackage', show: false },
  ]

  const result = infoPanelList
    .map(i => {
      const hasConfig = activityMap[i.img]
      return hasConfig ? Object.assign(i, hasConfig) : null
    })
    .filter(i => i && i.show)

  return result
}
