import {
  C2CRechargeConfirm,
  C2CRechargeGetPayingDetail,
  CheckFirstPixRecharge,
  GetBankOrder,
  GetBankOrderInfo,
  GetC2CRechargeAwardAmountList,
  GetC2CRechargeRecord,
  GetPayTypeName,
  GetRechargeRecord,
  GetRechargeTypes,
  GetUpiOrder,
  GetUsdtOrder,
  NewSetRechargesBankOrder,
  RechargesUpiOrder,
  RechargesUsdtOrder,
  UpRechargesBankOrder,
  UpdateRechargesUpiOrder,
  UpdateRechargesUsdtOrder,
  createC2CRecharge,
  getARPayOrder,
  getC2CRechargeDetail,
  ThirdPay,
  NewSetBankQRCodeOrder,
  CreateRechargeOrder
} from '@/api'
import { GlobalStore, SettingStore } from '@/stores'
import type {
  Banklist,
  C2CRechargeRecord,
  CreateUpiOrderRep,
  NewSetRechargesBankOrderData,
  PayTypeName,
  PayTypeNameData,
  RechargeChannelInfo,
  RechargeLocalUsdtInfo,
  RechargeTypesData,
  RechargeUsdtReq,
  Rechargetypelist,
  SellerInfo,
  SuggessList,
  UpRechargesBankOrderQuery,
  UpdateUsdtOrderInfo,
  UpiOrderInfo,
  UsdtOrderInfo,
  chargeRecordList,
  ThirdPayInfo,
  QrcodeBankInfo
} from '@/types/api'
import { AwaitApiResult, AwaitWrap, formatTime, getIcons, partyUrl, getCookie } from '@/utils'
import { closeToast, showFailToast, showLoadingToast, showSuccessToast, showToast } from 'vant'
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useEventBus } from '@/components/common/use'
import html2canvas from 'html2canvas'
import qrcode from 'qrcode'
import { isHybridApp, openBrowser } from '@/utils/jsBridge'
import { ArWalletType } from './useARwallet'
import { useTrigger } from '@/hooks/useTrigger.hook'

interface ThirdPayBankList {
  bankID: number
  bankName: string
  bankCode: string
  sort: number
  payTypeName: string
  type: number
}

interface ReacargeStore {
  rechangeUpiShow: boolean // UPI充值弹窗
  currentMenu: number // 当前充值大类索引
  rechargeSubmitBtnStatus: boolean // 充值提交按钮状态
  rechargeType: PayTypeNameData[] // 充值大类
  bankList: RechargeTypesData['banklist'] // 银行列表
  rechargeTypes: Rechargetypelist[] // 充值渠道
  bank_local: string[] // 本地银行字段信息
  C2CQuickList: SuggessList[] // C2C快速选择金额列表
  quickList: string[] // 快捷金额列表
  currentQuickIndex: number // 当前选中的快捷金额索引
  priceRange: {
    // 金额范围
    min: number
    max: number
  }
  currentPayType: Rechargetypelist // 当前充值渠道
  isRechargeInputDialog: boolean // 是否显示充值弹窗
  amount: number | undefined // 充值金额
  numberPayAmount: number | undefined // 数字货币充值金额
  validateAmount: string
  numberExchangeRate: number | undefined // 数字货币汇率
  rechargeDialogVisible: boolean // 充值弹窗
  bankInfo: {
    [keyof: string]: string
  }
  currentBankIndex: number
  isC2COrder: boolean // 是否C2C订单
  C2COrderInfo: SellerInfo | undefined // C2C订单信息
  isBankOrder: boolean // 是否银行订单
  bankOrderInfo: NewSetRechargesBankOrderData | undefined // 银行订单信息
  currentPayId: number // 当前充值大类ID
  localUsdtInfo: RechargeLocalUsdtInfo[] // 本地USDT充值渠道信息
  currentLocalUsdtIndex: number // 当前本地USDT充值渠道索引
  usdtOrderInfo: UsdtOrderInfo | undefined // usdt订单信息
  isUsdtOrder: boolean // 是否USDT订单
  orderDetail: NewSetRechargesBankOrderData | undefined // 本地银行订单详情
  bankUTR: string // UTR
  localUpiUTR: string // UPI
  upiOrderInfo: UpiOrderInfo | undefined // UPI订单信息
  isUpiOrder: boolean // 是否UPI订单
  CreateUpiOrderRep: CreateUpiOrderRep | undefined // UPI订单信息
  otherBankName: string // 三方银行选择
  thirdPayBankList: ThirdPayBankList[] // 第三方支付银行列表
  selectOtherBank: ThirdPayBankList | undefined // 第三方支付银行选择
  arPayInfo: ArWalletType | undefined
  isArPayOrder: boolean | string // 是否AR订单
  // rechargeQrcodeVisible: boolean // 扫码充值弹窗
}

const store = reactive<ReacargeStore>({
  rechangeUpiShow: false,
  rechargeSubmitBtnStatus: false,
  currentMenu: 0,
  rechargeType: [],
  bankList: [],
  rechargeTypes: [],
  bank_local: [],
  quickList: [],
  C2CQuickList: [],
  priceRange: {
    min: 0,
    max: 0,
  },
  currentPayType: {} as Rechargetypelist,
  isRechargeInputDialog: JSON.parse(localStorage.getItem('userInfo') || '{}').isOpenOfficialRechargeInputDialog === '1',
  amount: undefined,
  numberPayAmount: undefined,
  numberExchangeRate: 0,
  validateAmount: '',
  currentQuickIndex: -1,
  rechargeDialogVisible: false,
  bankInfo: {},
  currentBankIndex: 0,
  isC2COrder: false,
  C2COrderInfo: undefined,
  isBankOrder: false,
  bankOrderInfo: undefined,
  isUsdtOrder: false,
  currentPayId: 0,
  localUsdtInfo: [],
  currentLocalUsdtIndex: 0,
  usdtOrderInfo: {} as UsdtOrderInfo,
  orderDetail: {} as NewSetRechargesBankOrderData,
  bankUTR: '',
  localUpiUTR: '',
  upiOrderInfo: undefined,
  isUpiOrder: false,
  CreateUpiOrderRep: undefined,
  otherBankName: '',
  thirdPayBankList: [],
  selectOtherBank: undefined,
  arPayInfo: undefined,
  isArPayOrder: false,
  // rechargeQrcodeVisible: false
})

const locakBankList = [9, 18, 19]
const numberPayList = [11, 16, 19]
const countdownRef = ref<HTMLElement>() // 倒计时dom
const transfer = ref(1) // 转账类型 1 银行  2钱包
const countdown = ref<NodeJS.Timer | any>() // 倒计时
const isFirstPixRecharge = ref(false) // 是否首次pix充值

export const useRecharge = () => {
  const { t } = useI18n()
  const eventBus = useEventBus()

  const isC2CRecharge = computed(() => currentPayId.value === 20) // 是否C2C充值
  const isArpay = computed(() => currentPayId.value === 21) // 是否arpay充值
  const globalStore = GlobalStore()
  const userInfo = globalStore.getUserInfo
  const usdtRate = computed(() => userInfo.uRate) // usdt汇率
  const trxRate = computed(() => userInfo.trxRate) // trx汇率
  const isOpenOfficialRechargeInputDialog = computed(() => userInfo.isOpenOfficialRechargeInputDialog === '1') // trx汇率
  const IsShowRechargeBankList = computed(() => userInfo.isShowRechargeBankList === '1' || currentPayId.value !== 9) // trx汇率
  const isNumberPay = computed(() => numberPayList.includes(currentPayId.value)) // 是否数字货币充值
  const router = useRouter()
  const rechargeActionSheetShow = ref(false) // 充值弹窗
  const cancelOrderShow = ref(false) // 取消订单弹窗
  const RechargeRList = ref<(chargeRecordList & C2CRechargeRecord)[]>([])
  const showOtherSelect = ref(false) // 其他选择弹窗
  const C2CforbiddenShow = ref(false) // 禁止C2C充值弹窗
  const ErrorCount = ref(0) // 错误计数
  const RemainingLimitTime = ref(0) // 禁止交易时间
  const C2COrderTimeOutStatus = ref(false) // C2C订单超时状态
  const thirdRechargeDialog = ref(false) // 第三方充值弹窗
  const thirdRechargeUrl = ref('') // 第三方充值链接
  const pixFlag = ref(false) // pix充值弹窗

  const dollarSign = computed(() => SettingStore().getDollarSign)

  const showAmountError = ref(false) // 展示金额错误弹窗

  const setCountdownRef = (el: HTMLElement) => {
    countdownRef.value = el
  }

  const numberKeyObj: {
    [key: number]: {
      [key: string]: string
    }
  } = {
    11: {
      key: 'USDT',
      unit: 'USDT',
      selectText: t('selectUSDTNum'),
      placeholder: t('enterUSDTAmount'),
      icon: 'usdt',
    },
    16: {
      key: 'TRX',
      unit: 'TRX',
      selectText: t('selectTRXNum'),
      placeholder: t('enterTRXAmount'),
      icon: 'trx',
    },
    19: {
      key: 'USDT',
      unit: 'USDT',
      selectText: t('selectUSDTNum'),
      placeholder: t('enterUSDTAmount'),
      icon: 'usdt',
    },
  }
  /**
   * @description: 获取C2C充值单位,例如100则填充为00，1000则填充为000
   * @param {*} computed
   * @return {*}
   */
  const getC2CunitAmount = computed(() => {
    const c2cUnitAmount = store.rechargeTypes[0]?.c2cUnitAmount
    if (c2cUnitAmount) {
      return c2cUnitAmount.toString().substring(1)
    } else {
      return '00'
    }
  })

  const getTransferBankList = computed(() => {
    if (store.bankList?.length < 1) return []
    return store.bankList?.filter((item) => item.transferType === transfer.value)
  })

  const isUpi = computed(() => currentPayId.value === 12)

  /**
   * @description: 当前充值大类ID
   */
  const currentPayId = computed(() => store.currentPayId)

  /**
   * @description: 是否本地银行
   */
  const isLocakBank = computed(() => locakBankList.includes(currentPayId.value))
  /**
   * @description: 是否扫码银行卡
   */
  const isQrcodeBank = computed(() => currentPayId.value === 10)

  /**
   * @description: 当前充值渠道类型ID
   */
  const currentPayTypeId = computed(() => store.currentPayType.payTypeID || -1)

  /**
   * @description: 是否三方充值
   */
  const isOtherRecharge = computed(() => !isLocakBank.value && !isArpay.value && !isUpi.value && !isQrcodeBank.value)

  /**
   * @description: 当前银行名称
   */
  const currentBankName = computed(() => {
    const bankName =
      dollarSign.value === '৳'
        ? getTransferBankList.value[store.currentBankIndex].bankName
        : store.bankList[store.currentBankIndex].bankName
    return bankName
  })

  const currentBankList = computed(() => {
    return dollarSign.value === '৳' ? getTransferBankList.value : store.bankList
  })

  const currentOtherThirdBankList = computed(() => {
    if (store.thirdPayBankList.length > 0) {
      return store.thirdPayBankList.filter((item) => item.type === store.currentPayType.payTypeID)
    }
    return []
  })

  /**
   * @description: 判断是否拆分本地电子钱包且当前充值大类为电子钱包是否展示银行卡列表
   * @param {*} computed
   * @return {*}
   */
  const isSplitLocalEWallet = computed(() => {
    if (currentPayId.value !== 18) return true
    return !SettingStore().getIsSplitLocalEWallet
  })
  /**
   * @description: 设置当前tab，从store中读取
   */
  const getRechargeTab = async () => {
    store.rechargeType.unshift({
      payNameUrl2: getIcons('wallet/withdraw/withdrawHistory', 'all_NS'),
      payNameUrl: getIcons('wallet/withdraw/withdrawHistory', 'all'),
      payID: -1,
      payName: t('all'),
      minPrice: 0,
      maxPrice: -0,
      scope: '',
      typeName: t('all'),
      payTypeID: 0,
      paySysName: '',
    })

    store.currentMenu = 0
    // return walletStore.getPayTabList
  }

  /**
   * @description: 是否有订单
   */
  const isHaveOrder = computed(() => {
    if (isUpi.value) {
      return !!store.isUpiOrder
    }
    if (isLocakBank.value || isQrcodeBank.value) {
      return !!store.isBankOrder || !!store.isUsdtOrder
    }
    if (isArpay.value) {
      return !!store.isArPayOrder
    }
    return false
  })

  /**
   * @description: 数字货币汇率
   */
  const currentUate = computed(() => {
    if (currentPayId.value === 11 || currentPayId.value === 19) {
      return usdtRate.value
    }
    if (currentPayId.value === 16) {
      return trxRate.value
    }
    return 0
  })

  /**
   * @description: AR wallet
   */
  const arPay = computed(() => {
    return store.rechargeType.find((item) => item.payID === 21)
  })

  /**
   * @description: 获取支付大类，除了upi
   */
  const getPayTabList = computed(() => {
    return store.rechargeType.filter((item) => item.payID !== 21)
  })

  /**
   * @description: 获取本地USDT充值渠道信息
   */
  const getLocalUsdtInfo = computed(() => store.localUsdtInfo[store.currentLocalUsdtIndex])

  /**
   * @description: 获取充值大类
   */
  const getRechargeTypeName = async (isHistory?: boolean): Promise<void> => {
    restRechargeType()
    store.currentMenu = 0
    store.rechargeType = []
    const result: ObjResNull<PayTypeName> = await AwaitApiResult(GetPayTypeName())
    if (result) {
      store.rechargeType = result.data.typelist
      store.currentMenu = 0
      store.currentPayId = getPayTabList.value[0].payID
      !isHistory && handleChangeMenu(0)
      isHistory && getRechargeTab()
    }
  }

  /**
   * @description: 电子钱包获取当前通道ID
   * @return {*}
   */
  const getElwallett = () => {
    const payTypeId = store.rechargeTypes.find((item) => item.paySysName === currentBankName.value)?.payTypeID as number
    return payTypeId
  }

  /**
   * @description: 改变充值菜单
   * @param {number} index 菜单索引
   * @return {*}
   */
  const handleChangeMenu = async (index: number) => {
    if (store.currentMenu === index && store.currentMenu !== 0) return
    store.currentMenu = index
    if (index !== -1) {
      // console.log(getPayTabList.value, '---===--')
      store.currentPayId = getPayTabList.value[index].payID
      // console.log(store.currentPayId, '-----')
    } else {
      store.currentPayId = 21
    }
    restIsHaveOrder()
    await getRechargeTypes()
    if (isUpi.value) {
      getUpiOrderInfo()
    } else if (isArpay.value) {
      getArpayOrderInfo()
    } else if (isLocakBank.value || isQrcodeBank.value) {
      if (currentPayId.value === 19) {
        getUsdtOrderInfo()
      } else if (currentPayId.value === 18 && !SettingStore().getIsSplitLocalEWallet) {
        // console.log(currentBankName.value)
        // let payTypeId = store.rechargeTypes.find(item => item.paySysName === currentBankName.value)?.payTypeID as number
        getBankOrderInfo(getElwallett())
      } else {
        const payId = getPayTabList.value[store.currentMenu].payTypeID
        getBankOrderInfo(isQrcodeBank.value ? currentPayId.value : payId || -1)
      }
    }

    restAmount() // 重置金额
  }

  const restIsHaveOrder = () => {
    store.isArPayOrder = false
    store.isC2COrder = false
    store.isUpiOrder = false
    store.isBankOrder = false
    store.isUsdtOrder = false
  }

  /**
   * @description: 获取充值渠道
   */
  const getRechargeTypes = async (payid?: number, payTypeID?: number): Promise<void> => {
    const res: ObjResNull<RechargeTypesData> = await AwaitApiResult(
      GetRechargeTypes({
        payid: currentPayId.value || (payid as number),
        payTypeId: getPayTabList.value[store.currentMenu]?.payTypeID || payTypeID,
      })
    )
    if (res) {
      if (currentPayId.value === 19) {
        store.localUsdtInfo = res.data.localUsdtlist
      }
      store.rechargeTypes = res.data.rechargetypelist
      store.bankList = res.data.banklist
      if (isLocakBank.value && store.bankList?.length > 0) {
        store.currentBankIndex = 0
      }
      if (isQrcodeBank.value) {
        if (store.bankList?.length > 1) {
          store.currentBankIndex = getRandomBank()
        }
        store.bank_local = res.data.rechargetypelist[0].parameters.split('|')
      }
      if (isLocakBank.value) {
        if (currentPayId.value === 18) {
          const initBankName = store.bankList[0].bankName
          const initBankType = res.data.rechargetypelist?.find((res) => res.paySysName === initBankName)
          if (initBankType && initBankType.parameters) {
            store.bank_local = initBankType.parameters.split('|')
          }
        } else {
          store.bank_local = res.data.rechargetypelist[0].parameters.split('|')
        }
        console.log('bank_local', store.bank_local)
      }
      if (res.data?.rechargetypelist.length > 0) {
        store.quickList = res.data.rechargetypelist[0]?.quickConfigList
        store.currentPayType = res.data.rechargetypelist[0]
        store.priceRange = {
          min: Number(res.data.rechargetypelist[0]?.miniPrice),
          max: Number(res.data.rechargetypelist[0]?.maxPrice),
        }
      }
      if (isOtherRecharge.value) {
        store.thirdPayBankList = res.data.thirdPayBankList || []
        if (store.thirdPayBankList.length > 0) {
          store.selectOtherBank = currentOtherThirdBankList.value[0]
        }
      }
    }
  }

  const getArpayOrderInfo = async () => {
    const res = await AwaitApiResult(getARPayOrder())
    if (res.code === 0) {
      store.isArPayOrder = res.data
    }
    console.log(res)
  }

  /**
   * @description: 选择充值渠道
   */
  const handleSelectPayType = (index: number) => {
    store.currentPayType = store.rechargeTypes[index]
    store.quickList = store.rechargeTypes[index]?.quickConfigList
    store.priceRange = {
      min: Number(store.rechargeTypes[index]?.miniPrice),
      max: Number(store.rechargeTypes[index]?.maxPrice),
    }
    if (store.thirdPayBankList.length > 0) {
      store.selectOtherBank = currentOtherThirdBankList.value[0] || ''
    }
    restAmount()
  }

  /**
   * @description: 数字类型充值金额校验
   */
  const validateAmountNumber = (): boolean => {
    const unit = currentPayId.value === 11 || currentPayId.value === 19 ? 'USDT' : 'TRX'

    // 当前是数字货币充值，且金额小于0
    if ((store.numberPayAmount || store.numberPayAmount === 0) && store.numberPayAmount <= 0) {
      store.validateAmount = t('rangeDesc1')
      return false
    }

    // 当前是数字货币充值，且金额大于最大值
    if (store.numberPayAmount && store.numberPayAmount > store.priceRange.max) {
      store.validateAmount = t('rangeDesc3') + store.priceRange.max + unit
      return false
    }

    // 当前是数字货币充值，且金额小于最小值
    if (store.numberPayAmount && store.numberPayAmount < store.priceRange.min) {
      store.validateAmount = t('rangeDesc2') + store.priceRange.min + unit
      return false
    }
    store.validateAmount = ''
    return true
  }

  /**
   * @description: 三方充值，本地银行、upi充值类型金额校验
   */
  const validateAmountOther = () => {
    // 当前不是数字货币充值，且金额小于0
    if ((store.amount || store.amount === 0) && store.amount <= 0) {
      store.validateAmount = t('rangeDesc1')
      return false
    }
    // 当前不是数字货币充值，且金额大于最大值
    if (store.amount && store.amount > store.priceRange.max) {
      store.validateAmount = t('rangeDesc3') + store.priceRange.max
      return false
    }

    // 当前不是数字货币充值，且金额小于最小值
    if (store.amount && store.amount < store.priceRange.min) {
      store.validateAmount = t('rangeDesc2') + store.priceRange.min
      return false
    }
    store.validateAmount = ''
    return true
  }

  /**
   * @description: 点击快速选择金额
   * @param {number} index
   * @return {*}
   */
  const handleQuickSelect = (index: number): any => {
    store.currentQuickIndex = index
    if (isNumberPay.value) {
      store.numberPayAmount = Number(store.quickList[index].rechargeAmount)
      store.numberExchangeRate = currentUate.value * Number(store.quickList[index].rechargeAmount)
      if (validateAmountNumber()) {
        store.numberPayAmount = Number(toDecimal2(store.numberPayAmount.toString()))
        store.numberExchangeRate = store.numberPayAmount * currentUate.value
      }
      return
    }
    store.amount = Number(store.quickList[index].rechargeAmount)

    if (validateAmountOther()) {
      store.amount = Number(toDecimal2(store.amount.toString()))
    }
  }

  const toDecimal2 = (str: string) => {
    str = str + ''
    if (str.indexOf('.') > -1) {
      return str.split('.')[0]
    } else {
      return str
    }
  }

  /**
   * @description: 充值提交
   * @return {*}
   */
  const handleRecharge = async (): Promise<any> => {
    if (!store.rechargeSubmitBtnStatus) return
    const { onTriggerRecharege } = useTrigger()
    onTriggerRecharege({ amount: store.amount })
    if (isArpay.value) return arPayRecharge()
    if (isOtherRecharge.value) return otherRecharge()

    if (isUpi.value) return upiRecharge()

    if (isLocakBank.value || isQrcodeBank.value) {
      if ([10, 18].includes(currentPayId.value) || (store.isRechargeInputDialog && currentPayId.value !== 19)) {
        if (!store.bankList) {
          showFailToast('The payment channel is empty')
          return
        }
        store.bank_local.map((item) => {
          const keys = item.split(',')[1] as keyof Banklist
          store.bankInfo[keys] = currentBankList.value[store.currentBankIndex][keys] as string
        })
        //   console.log('store.bankInfo', store.currentBankIndex, store.bankInfo)
        store.rechargeDialogVisible = true
      } else if (currentPayId.value === 19) {
        usdtRecharge()
      } else {
        // 不弹窗直接跳转
        localBankRecharge()
      }
    }
  }

  const arPayRecharge = async () => {
    if (store.arPayInfo?.walletActivationStatus === 0) {
      showFailToast(t('arNoActive2')) /** 钱包未激活 */
      return
    }
    //   if (store.arPayInfo?.balance as number >= Number(store.amount)) {
    showLoadingToast({
      message: t('loading') + '...',
      forbidClick: true,
    })
    const returnUrl = 'https://' + window.location.host + '/#/main'
    const pixelId = sessionStorage.getItem('pixel') || localStorage.getItem('fb_dynamic_pixel') || ''
    const fbcId = getCookie('_fbc') || getCookie('_fbp') || ''
    // let str = '&returnUrl=' + encodeURIComponent('https://' + window.location.host + '/#/main')
    // let url =
    //   store.currentPayType.paySendUrl +
    //   '?tyid=' +
    //   currentPayTypeId.value +
    //   '&amount=' +
    //   store.amount +
    //   '&uid=' +
    //   userInfo.userId +
    //   '&sign=' + encodeURIComponent(userInfo.sign) + str
    // window.location.href = url
    // closeToast()
    const params = {
      payTypeId: store.currentPayType.payTypeID,
      amount: store.amount || 0,
      returnUrl,
      pixelId,
      vendorId: 1,
      fbcId,
    }
    const arpayData = await AwaitApiResult(CreateRechargeOrder(params))
    console.log('arpayData', arpayData)
    if (arpayData && arpayData.code === 0) {
      const {
        data: { submitUrl, submitType },
      } = arpayData
      if (submitType && submitType === 1) {
        // submitType 为 1  跳转
        const url = submitUrl
        if (isHybridApp()) {
          openBrowser('recharge', {
            url,
            recharegeName: store.currentPayType.payName,
          })
        } else {
          partyUrl(url)
        }
      }
    }
    //   } else {
    // 	showAmountError.value = true;
    //   }
  }

  /**
   * @description: 充值记录跳转到充值详情
   * @param {number} payID
   * @param {number} type
   * @param {number} amount
   * @param {number} state
   * @return {*}
   */
  const historyToDetail = async (payID: number, type: number, amount: number, state: number, orderNo?: number) => {
    store.currentPayId = payID
    if (isArpay.value && state === 0) {
      if (!store.isArPayOrder) {
        await getArpayOrderInfo()
      }
      if (store.isArPayOrder) {
        window.location.href = store.isArPayOrder as unknown as string
      } else {
        showFailToast(t('C2Ctimeout2'))
      }
      return
    }
    if (isUpi.value && state === 0) {
      router.push({
        name: 'OtherPay',
        query: {
          type: 'upi',
        },
      })
      return
    }
    if (state === 0 && payID === 19) {
      return router.push({
        name: 'RechargeUsdt',
      })
    }
    if ((isLocakBank.value || isQrcodeBank.value) && state === 0) {
      return router.push({
        name: 'RechargeDetail',
        query: {
          currentPayId: payID,
          payTypeId: type,
          amount,
        },
      })
    }
  }

  /**
   * @description: 点击upi充值
   * @return {*}
   */
  const upiRecharge = async () => {
    await createUpiOrder()
    router.push({
      name: 'OtherPay',
      query: {
        type: 'upi',
      },
    })
  }

  /**
   * @description: 前往USDt充值
   */
  const usdtRecharge = () => {
    router.push({
      name: 'RechargeUsdt',
      query: {
        amount: store.numberPayAmount,
      },
    })
  }

  /**
   * @description: 提交USDT充值
   * @param {string} address
   * @return {*}
   */
  const submitUsdtRecharge = async (query: RechargeUsdtReq) => {
    const res = await AwaitApiResult(RechargesUsdtOrder(query))
    if (res) {
      showSuccessToast(t('success'))
      eventBus.emit('changeKeepAliveKey')
      router.replace({
        name: 'RechargeHistory',
      })
    }
  }

  /**
   * @description: 三方充值
   */
  const otherRecharge = async () => {
    if (currentPayId.value === 15 && !pixFlag.value) {
      const isFirst = await AwaitApiResult(CheckFirstPixRecharge())
      if (isFirst.data) {
        isFirstPixRecharge.value = true
        pixFlag.value = true
        return
      }
      pixFlag.value = true
    }
    let amount = 0
    if (isNumberPay.value) {
      amount = store.numberPayAmount as number
    } else {
      amount = store.amount as number
    }
    const info = window.location.origin + ',status/rechargeStatus'
    const pixelId = sessionStorage.getItem('pixel') || localStorage.getItem('fb_dynamic_pixel') || ''
    const fbcId = getCookie('_fbc') || getCookie('_fbp') || ''
    const isBankCode = store.thirdPayBankList.length > 0 && store.selectOtherBank
    if (store.currentPayType.payTypeID >= 10000) {
      // payTypeID大于10000走接口 其他用之前
      thirdPayHandle(amount, info, pixelId, fbcId, isBankCode)
    } else {
      const sendUrl = store.currentPayType.paySendUrl
      let url = ''
      if (sendUrl.indexOf('tyid') === -1) {
        url =
          sendUrl +
          '?tyid=' +
          store.currentPayType.payTypeID +
          '&amount=' +
          amount +
          '&uid=' +
          userInfo.userId +
          '&sign=' +
          userInfo.sign +
          (isBankCode ? '&bankCode=' + store.selectOtherBank?.bankCode : '') +
          '&urlInfo=' +
          info +
          `&pixelId=${pixelId}&fbcId=${fbcId}`
      } else {
        url =
          sendUrl +
          '&amount=' +
          amount +
          '&uid=' +
          userInfo.userId +
          '&sign=' +
          userInfo.sign +
          (isBankCode ? '&bankCode=' + store.selectOtherBank?.bankCode : '') +
          '&urlInfo=' +
          info +
          `&pixelId=${pixelId}&fbcId=${fbcId}`
      }
      if (isHybridApp()) {
        openBrowser('recharge', {
          url,
          recharegeName: store.currentPayType.payName,
        })
      } else {
        partyUrl(url)
      }
    }
  }

  // 三方充值接口请求
  const thirdPayHandle = async (amount: number, info: string, pixelId: string, fbcId: string, isBankCode?: any) => {
    const vendorId = 1
    const params: ThirdPayInfo = {
      payTypeId: store.currentPayType.payTypeID,
      bankCode: isBankCode ? store.selectOtherBank?.bankCode : '',
      urlInfo: info,
      amount,
      pixelId,
      vendorId,
      fbcId,
    }
    store.rechargeSubmitBtnStatus = false
    // console.log('isBankCode', isBankCode, params)
    const thirdData = await AwaitApiResult(ThirdPay(params))
    store.rechargeSubmitBtnStatus = true
    // console.log('充值数据====', thirdData)
    if (thirdData && thirdData.code === 0) {
      const {
        data: { redirectUrl, scanCodePay, formUrl, formBody },
      } = thirdData
      if (!scanCodePay && redirectUrl) {
        // scanCodePay 为 false  直接跳转
        const url = redirectUrl
        if (isHybridApp()) {
          openBrowser('recharge', {
            url,
            recharegeName: store.currentPayType.payName,
          })
        } else {
          partyUrl(url)
          // thirdRechargeUrl.value = url
          // thirdRechargeDialog.value = true
        }
      } else {
        // scanCodePay 为 true  通过表单提交
        // 创建 一个表单 请求
        const form = document.createElement('form')
        form.action = formUrl
        form.method = 'POST'
        form.target = '_blank'
        for (const key in formBody) {
          if (formBody.hasOwnProperty(key)) {
            // 确保只遍历对象自身的属性，而不是原型链上的属性
            const input = document.createElement('input')
            input.name = key
            input.value = formBody[key]
            input.type = 'hidden'
            form.appendChild(input)
          }
        }
        document.body.appendChild(form)
        form.submit()
      }
    }
  }

  /**
   * @description: C2C充值
   * @return {*}
   */
  const C2CRecharge = async () => {
    const amount = store.amount?.toString() + getC2CunitAmount.value
    const params = {
      category: currentPayId.value,
      orderAmount: Number(amount),
    }
    const [, result] = await AwaitWrap(createC2CRecharge(params))

    // console.log(result)
    // let res = await AwaitApiResult<ObjResNull<CreateC2CRechargeData>>(createC2CRecharge(params))
    if (result) {
      if (result?.msgCode === 260 && result.code !== 0) {
        showFailToast(result.msg)
        setTimeout(() => {
          router.push({
            name: 'RechargeHistory-RechargeUpiDetail',
            query: {
              type: 'C2C',
              orderNo: result.data.orderId,
              state: result.data.state,
            },
          })
        }, 2000)
        return
      }
      if (result.data.state === 1) {
        store.rechangeUpiShow = false
        router.push({
          name: 'OtherPay',
          query: {
            type: 'C2C',
          },
        })
      } else if (result.data.state === 2) {
        C2CforbiddenShow.value = true
        ErrorCount.value = result.data.errorCount
        RemainingLimitTime.value = result.data.remainingLimitTime
      } else {
        store.currentPayType.paySendUrl = result.data.rechargeChannelInfo?.paySendUrl as string
        // 当前没有可选金额，走三方充值
        store.currentPayType = result.data.rechargeChannelInfo as RechargeChannelInfo

        if (!result.data.suggessList.length) {
          return otherRecharge()
        }
        store.rechangeUpiShow = true
        store.C2CQuickList = result.data.suggessList
      }
    }
  }

  /**
   * @description: 刷新2C快速充值列表
   * @param {number} amount
   * @return {*}
   */
  const getAmountList = async () => {
    const res = await AwaitApiResult<ObjResNull<SuggessList[]>>(GetC2CRechargeAwardAmountList({ amount: store.amount as number }))
    if (res) {
      store.C2CQuickList = res.data
    }
  }

  /**
   * @description: 本地银行充值
   * @return {*}
   */
  const localBankRecharge = async () => {
    if (isQrcodeBank.value) {
      // 扫码充值
      return qrcodeBankRecharge()
    }
    if (currentPayId.value !== 9) {
      const mobile = store.bankInfo[store.bank_local[1].split(',')[1]]
      if (mobile && mobile.length && mobile.trim().length < 7) {
        showFailToast({
          message: t('wrongTel'),
          wordBreak: 'break-word',
        })
        return
      }
    }

    // 判断query对象里面是否有空值， 有空值则不跳转
    if (isOpenOfficialRechargeInputDialog.value) {
      for (const key in store.bankInfo) {
        if (!store.bankInfo[key]) {
          showFailToast(t('rechargeBankTip'))
          return
        }
      }
    }

    // console.log(query)
    store.rechargeDialogVisible = false
    // 创建本地银行订单
    const flag = await createLocalBankOrder()
    if (flag) {
      let payTypeID = getPayTabList.value[store.currentMenu].payTypeID
      if (currentPayId.value === 18) {
        payTypeID = getElwallett()
      }
      router.push({
        name: 'RechargeDetail',
        query: {
          currentPayId: currentPayId.value,
          payTypeId: payTypeID,
          amount: store.amount,
        },
      })
    }
  }

  const qrcodeBankRecharge = async () => {
    // console.log('store.bankInfo：', store.bankList)

    if (Object.keys(store.bankInfo).length < 2) {
      showFailToast(t('requiredFaild'))
      return
    }
    for (const key in store.bankInfo) {
      if (!store.bankInfo[key]) {
        showFailToast(t('rechargeBankTip'))
        return
      }
    }
    // store.rechargeQrcodeVisible = false
    store.rechargeDialogVisible = false
    const payTypeID = getPayTabList.value[store.currentMenu].payTypeID
    //   console.log('getPayTabList.value', getPayTabList.value, store.currentMenu)
    const flag = await createqrcodeBankOrder()
    //   console.log('flag', flag)
    if (flag) {
      router.push({
        name: 'RechargeDetail',
        query: {
          currentPayId: currentPayId.value,
          payTypeId: payTypeID,
          amount: store.amount,
        },
      })
    }
  }

  /**
   * @description: 支付页面获取C2C订单详情
   * @param {*} orderNo
   * @return {*}
   */
  const getOrderDetail = async (orderNo: number) => {
    const res = await AwaitApiResult<ObjResNull<SellerInfo>>(getC2CRechargeDetail({ orderId: orderNo }))
    if (res) {
      store.C2COrderInfo = res.data
    }
  }

  /**
   * @description: 充值页面获取C2C充值订单信息
   * @return {*}
   */
  const getC2COrderInfo = async () => {
    const res = await AwaitApiResult<ObjResNull<SellerInfo>>(C2CRechargeGetPayingDetail())
    if (res) {
      if (res.data && res.data?.orderNo) {
        store.isC2COrder = true
        countdownTimeFun(res.data.serviceTime as string, res.data.endTime as string, () => {
          store.C2COrderInfo = undefined
          store.isC2COrder = false
        })
        store.C2COrderInfo = res.data
      }
    } else {
      store.C2COrderInfo = undefined
      store.isC2COrder = false
    }
  }

  /**
   * @description: 获取银行订单信息
   * @param {number} payID
   * @return {*}
   */
  const getBankOrderInfo = async (payID: number) => {
    const res = await AwaitApiResult<ObjResNull<NewSetRechargesBankOrderData>>(GetBankOrder({ payTypeId: payID }))
    if (res) {
      store.orderDetail = res.data
      if (res.data && res.data?.orderNumber) {
        store.bankUTR = res.data.refNo
        store.isBankOrder = true
        countdownTimeFun(res.data.serverTime as string, res.data.addTime1 as string, () => {
          store.bankOrderInfo = undefined
          store.isBankOrder = false
        })
        store.bankOrderInfo = res.data
      } else {
        store.bankOrderInfo = undefined
        store.isBankOrder = false
      }
    }
  }

  /**
   * @description: 获取当前是否有UPI订单
   * @return {*}
   */
  const getUpiOrderInfo = async () => {
    const res = await AwaitApiResult(GetUpiOrder({ type: 82 }))
    if (res) {
      if (res.data && res.data.orderNumber) {
        store.localUpiUTR = res.data.transferUTR
        store.isUpiOrder = true
        countdownTimeFun(res.data.serverTime as string, res.data.addTime1 as string, () => {
          store.upiOrderInfo = undefined
          store.isUpiOrder = false
        })
        store.upiOrderInfo = res.data
      } else {
        store.upiOrderInfo = undefined
        store.isUpiOrder = false
      }
    }
  }

  /**
   * @description: 创建UPI订单
   * @return {*}
   */
  const createUpiOrder = async () => {
    const res = await AwaitApiResult(RechargesUpiOrder({ amount: store.amount as number }))
    if (res) {
      store.CreateUpiOrderRep = res.data
    }
  }

  /**
   * @description: otherPay页面完成按钮事件
   * @param {string} type
   * @param {number} id
   * @return {*}
   */
  const handleFinishUpiOrder = async (type: string, id: number, fileObj?: any) => {
    if (type === 'upi') {
      const query: UpRechargesBankOrderQuery = {
        type: 1,
        tranrefId: store.localUpiUTR,
        orderNo: id + '',
        isBankQRCodeOrder: isQrcodeBank.value,
      }
      const res = await AwaitApiResult(UpdateRechargesUpiOrder(query))
      if (res) {
        eventBus.emit('changeKeepAliveKey')
        router.replace({
          name: 'RechargeHistory',
        })
      }
    } else {
      const res = await AwaitApiResult(
        C2CRechargeConfirm({
          orderId: id,
          transactionNo: store.localUpiUTR,
          ossUrls: fileObj,
        })
      )
      if (res) {
        router.replace({
          name: 'RechargeHistory-RechargeUpiDetail',
          query: {
            orderNo: store.C2COrderInfo?.id,
            state: 1,
          },
        })
      }
    }
  }

  /**
   * @description: 获取Usdt订单信息
   * @return {*}
   */
  const getUsdtOrderInfo = async () => {
    const res = await AwaitApiResult<ObjResNull<UsdtOrderInfo>>(GetUsdtOrder({ type: 3 }))
    if (res) {
      if (res.data && res.data?.orderNumber) {
        store.isUsdtOrder = true
        store.isBankOrder = false
        countdownTimeFun(res.data.serverTime as string, res.data.addTime1 as string, () => {
          store.usdtOrderInfo = undefined
          store.isUsdtOrder = false
        })
        store.usdtOrderInfo = res.data
      } else {
        store.usdtOrderInfo = undefined
        store.isUsdtOrder = false
        store.isBankOrder = false
      }
    }
  }

  const handleUpdateUsdtOrder = async (query: UpdateUsdtOrderInfo) => {
    const res = await AwaitApiResult(UpdateRechargesUsdtOrder(query))
    if (res) {
      showSuccessToast(t('success'))
      eventBus.emit('changeKeepAliveKey')
      router.replace({
        name: 'RechargeHistory',
      })
    }
  }

  /**
   * @description: 创建本地银行订单，本地银行、kbz、wave
   * @return { *}
   */
  const createLocalBankOrder = async () => {
    let payTypeID = getPayTabList.value[store.currentMenu].payTypeID
    if (currentPayId.value === 18) {
      payTypeID = getElwallett()
    }
    const query: any = {
      payTypeId: payTypeID,
      amount: store.amount,
      bankName: currentBankName.value,
      transferType: currentBankList.value[store.currentBankIndex].transferType,
      ...store.bankInfo,
    }
    if (!IsShowRechargeBankList.value) {
      delete query.bankName
    }
    const res: ObjResNull<NewSetRechargesBankOrderData> = await AwaitApiResult(NewSetRechargesBankOrder(query))
    if (res?.data) {
      store.orderDetail = res.data
      store.bankUTR = res.data.refNo
      return true
    }
    return false
    // NewSetRechargesBankOrder
  }
  /**
   * @description: 创建本地银行订单，本地银行、kbz、wave
   * @return { *}
   */
  const createqrcodeBankOrder = async () => {
    // let payTypeID = getPayTabList.value[store.currentMenu].payTypeID
    const query: QrcodeBankInfo = {
      payTypeId: currentPayId.value,
      amount: store.amount || 0,
      bankName: currentBankName.value,
      //   transferType: currentBankList.value[store.currentBankIndex].transferType,
      ...store.bankInfo,
    }
    console.log('query', query)
    const res: ObjResNull<NewSetRechargesBankOrderData> = await AwaitApiResult(NewSetBankQRCodeOrder(query))
    if (res?.data) {
      store.orderDetail = res.data
      store.bankUTR = res.data.refNo
      return true
    }
    return false
    // NewSetRechargesBankOrder
  }

  /**
   * @description: 倒计时
   * @param {string} startTime
   * @param {string} endTime
   * @param {function} callBack
   * @return {*}
   */
  const countdownTimeFun = (startTime: string, endTime: string, callBack: () => void) => {
    clearInterval(countdown.value as any)
    countdown.value = undefined
    let countdownTimestamp = getDownTime(startTime, endTime)
    countdown.value = setInterval(() => {
      countdownTimestamp -= 1000

      if (countdownTimestamp < 0) {
        clearInterval(countdown.value as any)
        callBack()
        return
      }

      const time = formatTime(countdownTimestamp, 'mm:ss')
      const spanList = countdownRef.value?.querySelectorAll('span')
      spanList?.forEach((item, index) => {
        item.innerHTML = time[index]
      })
    }, 1000)
  }

  /**
   * @description: 查询订单状态，本地银行、kbz、wave，如果已支付或者已取消返回上一个页面
   * @param {string} orderNumber 订单号
   */
  const getLoclBankOrderDetail = async (orderNumber: string) => {
    if (currentPayId.value === 99) return
    const detail = await AwaitApiResult(GetBankOrderInfo({ rechargeNumber: orderNumber }))
    if (detail.data?.state !== 0) {
      showToast(detail.data?.state === 1 ? t('orderpay') : t('ordercancle'))
      sessionStorage.removeItem('localOrder')
      router.go(-1)
    }
  }

  /**
   * @description: 本地银行、kbz、wave完成订单
   * @return {*}
   */
  const handleFinishOrder = async () => {
    const settingStore = SettingStore()
    if ((settingStore.getDollarSign === '₹' && currentPayId.value === 9) || isQrcodeBank.value) {
      const query: UpRechargesBankOrderQuery = {
        type: 1,
        tranrefId: store.bankUTR,
        orderNo: store.orderDetail?.orderNumber as string,
        isBankQRCodeOrder: isQrcodeBank.value,
      }
      const res = await AwaitApiResult(UpdateRechargesUpiOrder(query))
      if (res.code === 0) {
        showSuccessToast(t('success'))
      } else {
        showSuccessToast(res.msg)
        return
      }
    }
    eventBus.emit('changeKeepAliveKey')
    router.replace({ name: 'RechargeHistory' })
  }

  /**
   * @description: 取消订单
   * @param {*} id
   * @return {*}
   */
  const handeCancelOrder = async (orderNo: string, isUpi?: boolean) => {
    const res = await AwaitApiResult(UpRechargesBankOrder({ orderNo }))
    if (res) {
      store.isBankOrder = false
      rechargeActionSheetShow.value = false
      cancelOrderShow.value = false
      showSuccessToast(t('cancelSucceed'))
      eventBus.emit('changeKeepAliveKey')
      router.back()
    }
  }

  /**
   * @description: 获取时间戳
   * @param {string} start
   * @param {string} end
   * @return {*}
   */
  const getDownTime = (start: string, end: string) => {
    const BirthDay = new Date(start)
    // 获取当前时间
    const today = new Date(end)
    const timeold = today.getTime() - BirthDay.getTime() // 总豪秒数
    return timeold
  }

  /**
   * @description: 清空输入框
   * @return {*}
   */
  const handleClearInput = () => {
    store.rechargeSubmitBtnStatus = false
    store.amount = undefined
    store.numberPayAmount = undefined
    store.numberExchangeRate = undefined
    store.currentQuickIndex = -1
    store.validateAmount = ''
  }

  /**
   * @description: 获取充值记录
   * @param {*} store.currentId
   * @return {*}
   */
  const getRecordList = async () => {
    const query: any = {
      pageNo: 1,
      pageSize: 5,
      startDate: '',
      endDate: '',
      state: -1,
      type: -1,
      payId: store.currentPayId,
      category: store.currentPayId,
    }
    if (!isC2CRecharge.value) {
      delete query.category
      delete query.type
      query.payTypeId = getPayTabList.value[store.currentMenu]?.payTypeID || -1
    } else {
      query.type = -1
      delete query.payId
    }
    const result: any = await AwaitApiResult(isC2CRecharge.value ? GetC2CRechargeRecord(query) : GetRechargeRecord(query))
    if (result) {
      RechargeRList.value = result.data.list
    }
  }

  /**
   * @description: 充值弹出窗验证规则校验
   * @param {string} val
   * @param {number} index
   * @param {string} key
   * @return {*}
   */
  const validateBankForm = (val: string, index: number, key: string) => {
    // 手机号码只能为数字
    if (index !== 0 && currentPayId.value !== 9) {
      val.replace(/\D/g, '')
      store.bankInfo[key] = val.replace(/\D/g, '')
    }
    // 本地银行输入框去除空格
    if (index === 0) {
      const str = store.bankInfo[store.bank_local[0].split(',')[1]].replace(/\s*/g, '')
      store.bankInfo[store.bank_local[0].split(',')[1]] = str
    }
  }

  /**
   * @description: 选择银行卡时，查找对应的通道，获取通道id
   * @param {number} index
   * @return {*}
   */
  const handleSelectBank = (index: number) => {
    store.currentBankIndex = index
    if (store.currentPayId === 18 && store.bankList.length) {
      const bankName = dollarSign.value === '৳' ? getTransferBankList.value[index].bankName : store.bankList[index].bankName
      const Elwallet = store.rechargeTypes.find((item) => {
        return item.paySysName === bankName
      }) as Rechargetypelist
      store.bank_local = Elwallet?.parameters.split('|') || []
      store.bank_local.map((item) => {
        const keys = item.split(',')[1] as keyof Banklist
        store.bankInfo[keys] = store.bankList[store.currentBankIndex][keys] as string
      })
      store.quickList = Elwallet.quickConfigList
      // console.log(store.rechargeTypes.find(item => item.paySysName === store.bankList[val].bankName) as Rechargetypelist)
      // store.currentPayType = store.rechargeTypes.find(item => item.paySysName === store.bankList[val].bankName) as Rechargetypelist
    }
    store.currentPayId === 18 && getBankOrderInfo(getElwallett())
  }

  /**
   * @description: 重置数据
   * @param {*} void
   * @return {*}
   */
  const restAmount = (): void => {
    store.rechargeSubmitBtnStatus = false
    store.amount = undefined
    store.numberPayAmount = undefined
    store.numberExchangeRate = undefined
    store.validateAmount = ''
    store.currentQuickIndex = -1
    if (isQrcodeBank.value && store.bankList?.length > 1) {
      store.currentBankIndex = getRandomBank()
    } else {
      store.currentBankIndex = 0
    }
    store.localUpiUTR = ''
    store.bankUTR = ''
  }

  /**
   * @description: input输入框输入完成回调changeQuickInput事件,添加节流
   * @param {Event} e
   * @return {*}
   */
  const handleInput = (e: Event) => {
    clearTimeout((e.target as any).timer)
    ;(e.target as any).timer = setTimeout(() => {
      store.validateAmount = ''
      store.currentQuickIndex = -1
      // if (isC2CRecharge.value) {
      //   validateAmountC2C()
      //   return
      // }
      if (isNumberPay.value) {
        if (validateAmountNumber()) {
          store.numberExchangeRate = store.numberPayAmount ? store.numberPayAmount * currentUate.value : 0
        }
        return
      }
      validateAmountOther()
    }, 500)
  }

  /**
   * @description: 将超过1000的数字转换为1K
   */
  const formatNum = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    } else {
      return num + ''
    }
  }

  /**
   * @description: 粘贴
   */
  const handlePaste = async (): Promise<string> => {
    const res = await navigator.clipboard.readText()
    return res
  }

  /**
   * @description: 生成图片
   * @param {*} id
   * @return {*}
   */
  const htmlToImage = (id: string) => {
    const myDiv = document.getElementById(id) as HTMLElement
    html2canvas(myDiv, {
      useCORS: true,
      x: 0,
      y: 0,
      width: myDiv.offsetWidth,
      height: myDiv.offsetHeight,
    }).then((canvas) => {
      canvas.toDataURL('image/jpeg')
      const downloadLink = document.createElement('a')
      downloadLink.href = canvas.toDataURL('image/jpeg')
      downloadLink.download = 'qrcode.jpeg'
      document.body.appendChild(downloadLink)
      downloadLink.click()
    })
  }

  /**
   * @description: 生成二维码
   * @param {string} url
   * @return {*}
   */
  const createQrCode = async (url: string) => {
    // let url = 'upi://pay?pa=' + orderDetail.value?.sellerAccountNo + '&am=' + orderDetail.value?.orderAmount + '&cu=INR'
    try {
      return qrcode.toDataURL(url)
      console.log(url)
      // const qrCode = await
      // codeUrl.value = qrCode
    } catch (error) {
      console.log('生成二维码失败')
    }
  }

  const restRechargeType = () => {
    store.isBankOrder = false
    store.isUsdtOrder = false
    store.localUpiUTR = ''
    store.bankUTR = ''
  }
  // 随机获取银行卡
  const getRandomBank = () => {
    const index = Math.floor(Math.random() * store.bankList.length)
    return index
  }

  /**
   * @description: 三方银行确认选择
   * @param {any} param1
   * @return {*}
   */
  const confirmOtherSelectBank = ({ selectedOptions }: any) => {
    showOtherSelect.value = false
    store.selectOtherBank = selectedOptions[0]
  }

  const C2CTimeOut = (startTime: string, endTimt: string): void => {
    const start = new Date(startTime.replace(/-/g, '/')).getTime()
    const end = new Date(endTimt.replace(/-/g, '/')).getTime()
    const distance = start - end
    if (distance <= 0) {
      C2COrderTimeOutStatus.value = true
    }
  }

  // 切换渠道清空金额
  watch(
    () => currentPayTypeId.value,
    () => {
      restAmount()
    }
  )

  onBeforeUnmount(() => {
    // 取消定时器
    clearInterval(countdown.value as any)
  })

  watch([() => store.amount, () => store.numberPayAmount], () => {
    if (!store.amount && !store.numberPayAmount) {
      store.rechargeSubmitBtnStatus = false
      return
    }
    // if (isC2CRecharge.value && store.amount) {
    //   store.rechargeSubmitBtnStatus = validateAmountC2C()
    //   return
    // }
    if (isNumberPay.value && store.numberPayAmount) {
      store.rechargeSubmitBtnStatus = validateAmountNumber()
      return
    }
    if (!isNumberPay.value) {
      store.rechargeSubmitBtnStatus = validateAmountOther() && store.rechargeTypes.length > 0
      return
    }
    store.rechargeSubmitBtnStatus = false
  })

  return {
    store,
    confirmOtherSelectBank,
    showOtherSelect,
    getRechargeTypeName,
    handleChangeMenu,
    getRechargeTypes,
    restAmount,
    handleInput,
    formatNum,
    handleRecharge,
    handleQuickSelect,
    isHaveOrder,
    currentPayId,
    numberKeyObj,
    isC2CRecharge,
    isArpay,
    isLocakBank,
    isNumberPay,
    getC2CunitAmount,
    usdtRate,
    trxRate,
    currentBankName,
    currentPayTypeId,
    handleSelectPayType,
    handleClearInput,
    getPayTabList,
    arPay,
    validateBankForm,
    localBankRecharge,
    submitUsdtRecharge,
    getUsdtOrderInfo,
    getLocalUsdtInfo,
    handlePaste,
    createLocalBankOrder,
    getLoclBankOrderDetail,
    handeCancelOrder,
    getAmountList,
    cancelOrderShow,
    rechargeActionSheetShow,
    handleFinishOrder,
    countdownTimeFun,
    countdownRef,
    setCountdownRef,
    getBankOrderInfo,
    getUpiOrderInfo,
    handleFinishUpiOrder,
    getRechargeTab,
    historyToDetail,
    getC2COrderInfo,
    otherRecharge,
    getRecordList,
    htmlToImage,
    createQrCode,
    C2CRecharge,
    getTransferBankList,
    transfer,
    isFirstPixRecharge,
    isSplitLocalEWallet,
    RechargeRList,
    handleSelectBank,
    getElwallett,
    IsShowRechargeBankList,
    handleUpdateUsdtOrder,
    getOrderDetail,
    isOtherRecharge,
    currentOtherThirdBankList,
    C2CforbiddenShow,
    ErrorCount,
    RemainingLimitTime,
    C2COrderTimeOutStatus,
    C2CTimeOut,
    thirdRechargeDialog,
    thirdRechargeUrl,
    getDownTime,
    currentBankList,
    userInfo,
    showAmountError,
  }
}
