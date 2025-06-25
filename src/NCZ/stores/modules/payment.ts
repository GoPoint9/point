import { defineStore } from 'pinia'
import { AwaitApiResult, AwaitWrap, isParamReady, windowToPath } from '@/utils'

import { post, apiUrls } from '@/NCZ/api'

const paymentAPI = {}
paymentAPI.initPayment = (data) => post(apiUrls.initPayment, data)
paymentAPI.checkPaymentTypeUse = (data) => post(apiUrls.checkPaymentTypeUse, data)
paymentAPI.getDepositRandom = (data) => post(apiUrls.getDepositRandom, data)
paymentAPI.getPrepaySetting = (data) => post(apiUrls.getPrepaySetting, data)
paymentAPI.getThirdPayInfo = (data) => post(apiUrls.getThirdPayInfo, data)
paymentAPI.getExchangeRateStr = (data) => post(apiUrls.getExchangeRateStr, data)
paymentAPI.setDigitalWallet = (data) => post(apiUrls.setDigitalWallet, data)
paymentAPI.updateDigitalWallet = (data) => post(apiUrls.updateDigitalWallet, data)
paymentAPI.getWalletType = (data) => post(apiUrls.getWalletType, data)
paymentAPI.getBindUrl = (data) => post(apiUrls.getBindUrl, data)
paymentAPI.getUSDTCurrency = (data) => post(apiUrls.getUSDTCurrency, data)
paymentAPI.getNewEbankRecommend = (data) => post(apiUrls.getNewEbankRecommend, data)
paymentAPI.getEbankPayAccList = (data) => post(apiUrls.getEbankPayAccList, data)
paymentAPI.getNczThirdPayInfo = (data) => post(apiUrls.getNczThirdPayInfo, data)

const isOpenOptions = {
  isH5Open: true,
  isFromH5: true,
  isAppOpen: false,
  isTransferOpen: false,
  isTransferCardOpen: false,
}

export const usePaymentStore = defineStore({
  id: 'payment',
  state: () => ({
    payLimitMap: null,
    paymentUseMap: null,
    prePaySetting: null,
    thirdPayMap: null,
    bank: '',
    ebankPayAccList: [],
    thirdPayDepositList: {},
    newPaymentList: [],
    nowPay: '',
    nowPayType: '',
    payTypeSortVersion: '',
    rate: 0,
    walletType: [],
    currencyTypeList: [],
    bankUSDT: [],

    channels: [],
  }),
  getters: {
    getPaymentUseMap: (state) => state.paymentUseMap || {},
    getPayLimitMap: (state) => state.payLimitMap || {},
    getThirdPayDepositList: (state) => state.thirdPayDepositList || {},
  },
  actions: {
    async fetchPayData (pay) {
      console.warn(' [fetchPayData] ', pay.viewType, '\n', pay.currencyType, '\n', pay)
      let res = null

      const isOffline = pay.viewType === 'Offline'
      if (isOffline) {
        res = await AwaitApiResult(paymentAPI.getEbankPayAccList())
      }
      if (['Online', 'Wallet'].includes(pay.viewType)) {
        const data = {
          type: pay.type,
          bankId: pay.payData.bankId,
          payTypeSortVersion: this.payTypeSortVersion,
          ...isOpenOptions,
        }
        res = await AwaitApiResult(paymentAPI.getNczThirdPayInfo(data))
      }

      if (res.code !== 'success') throw new Error(res.msg)

      this.channels = isOffline
        ? res.data.ebankPayAccList
        : res.data.thirdPayInfoH5List

      console.warn('res ', res)
      console.warn('this.channels ', this.channels)
      return res
    },

    async initPayment () {
      const res = await AwaitApiResult(paymentAPI.initPayment())

      this.updatePaymentData(res.data)
      return res
    },

    async checkPaymentTypeUse () {
      const res = await AwaitApiResult(paymentAPI.checkPaymentTypeUse())

      if (res.code === 'success') {
        this.paymentUseMap = res.data.paymentUseMap
      } else if (res.code === 'other') {
        window.router.push('/login')
      } else {
        window.layer.msgWarn(res.msg)
      }
    },

    async getDepositRandom () {
      const res = await AwaitApiResult(paymentAPI.getDepositRandom())
      return res
    },

    async getPrepaySetting () {
      const res = await AwaitApiResult(paymentAPI.getPrepaySetting())

      this.prePaySetting = res.data.status
    },

    async getThirdPayInfo ({ currencyType, isOnline, offlinePayType, onlinePayType }) {
      const getPayTypeFor = (obj) => {
        const getOfflinePayType = ({ offlinePayType }) => (offlinePayType ? { offlinePayType } : '')
        const getOnlinePayType = ({ onlinePayType }) => {
          if (Number(onlinePayType) === 28) {
            return onlinePayType ? { onlinePayType, currencyType } : ''
          }
          return onlinePayType ? { onlinePayType, isOnline } : ''
        }
        return getOnlinePayType(obj) || getOfflinePayType(obj)
      }

      const Requirement = getPayTypeFor({ offlinePayType, onlinePayType })
      const res = await window._fetch({ Action: '/getThirdPayInfo', Requirement }, false)

      if (res.code === 'success') {
        const data = { offlinePayType, ...res.data }
        this.updateThirdPayInfo(data)
        return res
      } else {
        window.layer.confirm(res.msg, [window.$t('Common.label_confirm')], () => {
          location.reload()
          window.location.href = '/userCenter/rechargeWay'
        })
      }
    },

    async getExchangeRateStr (thirdPayId) {
      try {
        const res = await AwaitApiResult(paymentAPI.getThirdPayInfo({ thirdPayId }))

        if (res.code === 'error') {
          window.layer.alert(window.i18n.t('Error.label_third_rate'))
          return
        }
        this.rate = res.data
      } catch (err) {
        window.layer.alert(window.i18n.t('Error.label_third_rate'))
        throw err
      }
    },

    async setDigitalWallet (data) {
      const res = await AwaitApiResult(paymentAPI.setDigitalWallet(data))
      return res
    },

    async updateDigitalWallet (data) {
      const res = await AwaitApiResult(paymentAPI.updateDigitalWallet(data))
      return res
    },

    async getWalletType (data) {
      const res = await AwaitApiResult(paymentAPI.getWalletType(data))
      this.walletType = res.data.walletType
      return res
    },

    async getBindUrl (walletId) {
      const res = await AwaitApiResult(paymentAPI.getBindUrl({ walletId }))
      if (res.code === 'error') {
        window.layer.alert(res.msg)
        return
      }
      return res
    },

    // { payId }
    async getUSDTCurrency (payId) {
      const res = await AwaitApiResult(paymentAPI.getUSDTCurrency({ payId }))
      return res
    },

    async getNewEbankRecommend () {
      const res = await AwaitApiResult(paymentAPI.getNewEbankRecommend())
      return res
    },

    // 內部工具函數
    updatePaymentData (data) {
      if (!isParamReady(data) || !isParamReady(data.backData)) return

      this.payLimitMap = data.backData.payLimitMap
      this.thirdPayMap = data.backData.thirdPayMap
      const newPaymentListData = isParamReady(data.backData.newPaymentList)
        ? [...data.backData.newPaymentList]
        : []

      const userStore = useUserStore()
      // 不確定會不會拿到字串，於是都判斷
      if ([2, '2'].includes(userStore.userInfo.testAccountType) && newPaymentListData.length > 0) {
        this.newPaymentList = newPaymentListData.filter(payment => payment.type !== 'fourthpay')
      } else {
        this.newPaymentList = newPaymentListData
      }

      this.payTypeSortVersion = data.backData.payTypeSortVersion

      console.warn('this.payTypeSortVersion ', this.payTypeSortVersion)

      for (const payment of this.newPaymentList) {
        if (payment.type === 'cgpay' && payment.child[0]?.payData) {
          this.currencyTypeList = payment.child[0].payData.currencyTypeList
          localStorage.setItem('currencyTypeList', this.currencyTypeList)
          break
        }
      }

      this.thirdPayDepositList = this.handleThirdPayMap(data.backData.thirdPayMap)
    },

    updateThirdPayInfo (data) {
      if (data.offlinePayType === 'OF_25' && data.ebankPayAccListmap[0]?.ebankPayAccList?.length > 0) {
        this.bankUSDT = data.ebankPayAccListmap
        this.bank = data.ebankPayAccListmap[0].ebankPayAccList.map(item => ({
          ...item,
          bankAccount: decodeURIComponent(item.bankAccount),
          openAccountName: decodeURIComponent(item.openAccountName),
        }))
      } else if (data.ebankPayAccList?.length > 0) {
        this.bank = data.ebankPayAccList.map(item => ({
          ...item,
          bankAccount: decodeURIComponent(item.bankAccount),
          openAccountName: decodeURIComponent(item.openAccountName),
        }))
      }
    },

    handleThirdPayMap (payments) {
      const result = {
        IS_ALIPAY: [],
        IS_BAIDU: [],
        IS_CLOUD: [],
        IS_QQ: [],
        IS_JDPAY: [],
        IS_WECHAT: [],
        IS_UNION: [],
      }
      for (const pay in payments) {
        if (Object.prototype.hasOwnProperty.call(payments, pay)) {
          const payItem = payments[pay]
          if (!payItem) continue
          const depositList = getPayDepositList(payItem)
          if (pay.includes('ALIPAY')) result.IS_ALIPAY.push(...depositList)
          if (pay.includes('BAIDU')) result.IS_BAIDU.push(...depositList)
          if (pay.includes('CLOUD')) result.IS_CLOUD.push(...depositList)
          if (pay.includes('JDPAY')) result.IS_JDPAY.push(...depositList)
          if (pay.includes('QQ')) result.IS_QQ.push(...depositList)
          if (pay.includes('UNION')) result.IS_UNION.push(...depositList)
          if (pay.includes('WECHAT')) result.IS_WECHAT.push(...depositList)
        }
      }
      return handleMinAndMax(removeEmptyProp(result))
    },
  },
})

function getPayDepositList (payItem) {
  payItem.depositList = []
  for (const key in payItem) {
    if (checkMoneyProp(key)) payItem.depositList.push(payItem[key])
  }
  return payItem.depositList
}
function removeEmptyProp (obj) {
  const result = {}
  for (const key in obj) {
    if (obj[key].length > 0) result[key] = obj[key]
  }
  return result
}
function handleMinAndMax (depositList) {
  for (const key in depositList) {
    depositList[key] = {
      lowest: Math.min(...depositList[key]),
      highest: Max(...depositList[key]),
    }
  }
  return depositList
}
function checkMoneyProp (money) {
  return ['lowestDeposit', 'lowestDepositH5', 'highestDeposit', 'highestDepositH5'].includes(money)
}
