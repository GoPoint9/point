export const apiUrls = {
  // 首页
  frontSkinSetting: 'frontSkinSetting',
  getSiteInitData: 'getSiteInitData',
  getAllMyEmerdList: 'getAllMyEmerdList',
  getGameCategoryList: 'getGameCategoryList',
  getNotices: 'getNotices', // 公告信息

  login: 'login',
  loginOut: 'loginOut',
  getUserBanlance: 'getUserBanlance', // 取得會員餘額

  activityCentersResult: 'activityCentersResult', // 活動資料
  getActivitySetting: 'getActivitySetting', // 取得任務開關 & 每日任務未領取次數
  getGrowthMoney: 'getGrowthMoney',
  getDayMoney: 'getDayMoney',
  getSignInActivity: 'signinActivity/index', // 簽到首頁
  signIn: 'signinActivity/signIn', // 簽到
  getSignInHistory: 'signinActivity/history', // 簽到歷史記錄
  getReferralRewardSetting: 'getReferralRewardSetting', // 邀請獎勵設定
  receiveAward: 'receiveAward', // 邀請獎勵 領取
  getReferralRewardRecord: 'getReferralRewardRecord', // 邀請紀錄 > 當前開放活動任務
  invitationRecord: 'invitationRecord', // 查 歷史 紀錄
  getFirstDepositBonus: 'firstDepositBonusSetting/getActivity', // 首充獎勵活動
  getFirstDepositBonusReceiveBonus: 'firstDepositBonusSetting/receiveBonus', // 首充獎勵活動-領取首充獎勵
  getFirstDepositBonusNoMoreToday: 'firstDepositBonusSetting/noMoreToday', // 首充獎勵活動-今日是否顯示
  dailyMissionList: 'mission/dailyMissionList', // 每日任務-取得任務清單
  receieveAll: 'mission/receieveAll', // 每日任務-領取全部
  receieve: 'mission/receieve', // 每日任務-領取單筆
  dailyMissionRecordList: 'mission/dailyMissionRecordList', // 每日任務-領取記錄
  getNewMemberGiftPackage: 'getNewMemberGiftPackage', // 新會員禮包
  getNewMemberGiftPackageInfo: 'getNewMemberGiftPackageInfo', // 新會員禮包 - event detail
  giftPackageApplication: 'giftPackageApplication', // 新會員禮包 - Apply
  giftPackageReceive: 'giftPackageReceive', // 新會員禮包 - Receive
  agentRedPacketReceive: 'ncz/activity/agentRedPacket/receive', // 礼物兑换码 - 領取
  agentRedPacketReceiveIndex: 'ncz/activity/agentRedPacket/receiveIndex', // 礼物兑换码 - 紀錄
  isTurntableOpen: 'ncz/act/turntable/isTurntableOpen', // 大轉盤 - 入口
  turntableIndex: 'ncz/act/turntable/index', // 大轉盤主頁 - 次數
  turntableGetSettingData: 'ncz/act/turntable/getSettingData', // 大轉盤主頁 - 轉盤資料
  turntableLottery: 'ncz/act/turntable/lottery', // 大轉盤 - 抽獎流程
  turntableHistory: 'ncz/act/turntable/history/search', // 大轉盤 - 歷史紀錄
  turntableEvent: 'ncz/act/turntable/event/search', // 大轉盤 - 活動詳情
  turntableTxSearch: 'ncz/act/turntable/tx/search', // 大轉盤 - 交易紀錄

  getCpGameCategory: 'getCpGameCategory', // 彩票類別查詢
  getNewMyEmerdList: 'getNewMyEmerdList', // 彩票投注查詢
  getExtGameCategory: 'getExtGameCategory', // 第三方類別查詢
  getExtNewMyEmerdList: 'ext/getNewMyEmerdList', // 第三方投注查詢

  getPersonalLevel: 'getPersonalLevel', // 取得等级头衔资料
  getPubSiteSafe: 'getPubSiteSafe', // NCZ 保險箱
  getSafeOrderRecordHistory: 'getSafeOrderRecordHistory', // NCZ 保險箱-交易明细
  safeToPlatform: 'safeToPlatform', // NCZ 保險箱轉出

  saveNickName: 'saveNickName', // 修改使用者暱稱
  savePersonalImg: 'savePersonalImg', // 修改使用者頭像
  updateLoginMemberPassword: 'updateLoginMemberPassword', // 修改登入密碼

  // payment
  initPayment: 'cache/paymentCache',
  checkPaymentTypeUse: 'checkPaymentTypeUse',
  getDepositRandom: 'cache/depositRandomCache',
  getPrepaySetting: 'getPrepaySetting',
  getThirdPayInfo: 'getThirdPayInfo',
  getExchangeRateStr: 'getExchangeRate',
  setDigitalWallet: 'memberCenter/setDigitalWallet', // 數字錢包 新增
  updateDigitalWallet: 'memberCenter/updateDigitalWallet', // 數字錢包 修改
  getWalletType: 'memberCenter/getWalletType', // 拿錢包類型
  getBindUrl: 'memberCenter/getBindUrl', // 重新扫码
  getUSDTCurrency: 'getCurrencytoCNYRate',
  getNewEbankRecommend: 'getNewEbankRecommend',

  getEbankPayAccList: 'getEbankPayAccList', // Offline(線下銀行轉帳)
  getNczThirdPayInfo: 'getNczThirdPayInfo', // Online(一般線上支付)、Wallet(線上支付-數字幣)

  //
  //
  //

  queryBillRecord: 'queryBillRecord',
  queryRechargeRecord: 'queryRechargeRecord',
  queryWithdrawRecord: 'queryWithdrawRecord',
  queryCashLockRecord: 'queryCashLockRecord',
  getPayTypeName: 'getPayTypeName', // 取得充值類型
  getDrawTypeName: 'getDrawTypeName', // 取得提現類型

}

export default apiUrls

// BILL_RECORD_ACTION: 'queryBillRecord',
// RECHARGE_RECORD_ACTION: 'queryRechargeRecord',
// getWithdrawRecord: 'queryWithdrawRecord',
// LOCK_RECORD_ACTION: 'queryCashLockRecord',
// getPayTypeName: 'getPayTypeName',  // 取得充值類型
// getDrawTypeName: 'getDrawTypeName',  // 取得提現類型
