import { post, apiUrls } from '@/NCZ/api'

// NCZ
export const activityCentersResult = payload => post(apiUrls.activityCentersResult, payload) // 活動資料
export const getActivitySetting = payload => post(apiUrls.getActivitySetting, payload) // 取得任務開關 & 每日任務未領取次數
export const getGrowthMoney = payload => post(apiUrls.getGrowthMoney, payload)
export const getDayMoney = payload => post(apiUrls.getDayMoney, payload)
export const getSignInActivity = payload => post(apiUrls.getSignInActivity, payload) // 簽到首頁
export const signIn = payload => post(apiUrls.signIn, payload) // 簽到
export const getSignInHistory = payload => post(apiUrls.getSignInHistory, payload) // 簽到歷史記錄
export const getReferralRewardSetting = payload => post(apiUrls.getReferralRewardSetting, payload) // 邀請獎勵設定
export const receiveAward = payload => post(apiUrls.receiveAward, payload) // 邀請獎勵 領取
export const getReferralRewardRecord = payload => post(apiUrls.getReferralRewardRecord, payload) // 邀請紀錄 > 當前開放活動任務
export const invitationRecord = payload => post(apiUrls.invitationRecord, payload) // 查 歷史 紀錄
export const getFirstDepositBonus = payload => post(apiUrls.getFirstDepositBonus, payload) // 首充獎勵活動
export const getFirstDepositBonusReceiveBonus = payload => post(apiUrls.getFirstDepositBonusReceiveBonus, payload) // 首充獎勵活動-領取首充獎勵
export const getFirstDepositBonusNoMoreToday = payload => post(apiUrls.getFirstDepositBonusNoMoreToday, payload) // 首充獎勵活動-今日是否顯示
export const dailyMissionList = payload => post(apiUrls.dailyMissionList, payload) // 每日任務-取得任務清單
export const receieveAll = payload => post(apiUrls.receieveAll, payload) // 每日任務-領取全部
export const receieve = payload => post(apiUrls.receieve, payload) // 每日任務-領取單筆
export const dailyMissionRecordList = payload => post(apiUrls.dailyMissionRecordList, payload) // 每日任務-領取記錄
export const getNewMemberGiftPackage = payload => post(apiUrls.getNewMemberGiftPackage, payload) // 新會員禮包
export const getNewMemberGiftPackageInfo = payload => post(apiUrls.getNewMemberGiftPackageInfo, payload) // 新會員禮包 - event detail
export const giftPackageApplication = payload => post(apiUrls.giftPackageApplication, payload) // 新會員禮包 - Apply
export const giftPackageReceive = payload => post(apiUrls.giftPackageReceive, payload) // 新會員禮包 - Receive
export const agentRedPacketReceive = payload => post(apiUrls.agentRedPacketReceive, payload) // 礼物兑换码 - 領取
export const agentRedPacketReceiveIndex = payload => post(apiUrls.agentRedPacketReceiveIndex, payload) // 礼物兑换码 - 紀錄
export const isTurntableOpen = payload => post(apiUrls.isTurntableOpen, payload) // 大轉盤 - 入口
export const turntableIndex = payload => post(apiUrls.turntableIndex, payload) // 大轉盤主頁 - 次數
export const turntableGetSettingData = payload => post(apiUrls.turntableGetSettingData, payload) // 大轉盤主頁 - 轉盤資料
export const turntableLottery = payload => post(apiUrls.turntableLottery, payload) // 大轉盤 - 抽獎流程
export const turntableHistory = payload => post(apiUrls.turntableHistory, payload) // 大轉盤 - 歷史紀錄
export const turntableEvent = payload => post(apiUrls.turntableEvent, payload) // 大轉盤 - 活動詳情
export const turntableTxSearch = payload => post(apiUrls.turntableTxSearch, payload) // 大轉盤 - 交易紀錄
