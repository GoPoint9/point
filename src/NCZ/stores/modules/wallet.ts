/*
 * @Description:
 */
import { defineStore } from 'pinia'
import type { withdrawalslist, ResBankList, ReqNewSetWithdrawal, PayTypeNameData, PayTypeName } from '@/types/api'
import { GetPayTypeName, GetBalance, RecoverBalance } from '@/api'
import { AwaitApiResult, getIcons } from '@/utils'
import { showSuccessToast } from 'vant'
import i18n from '@/languages'
import { useSiteStore } from './site'
const { t } = i18n.global

interface WalletStoreProps {
  bankName: any
  withdrawalslist: withdrawalslist[]
  bankList: ResBankList[]
  withdrawals: ReqNewSetWithdrawal | any
  payTabList: PayTypeNameData[]
  amount: number
  timestampLast: number
  allwallets: string
  isAllowUserAddUSDT: any
}

export const useWalletStore = defineStore({
  id: 'walletStore',
  state: (): WalletStoreProps => ({
    bankName: {},
    withdrawalslist: [],
    bankList: [],
    withdrawals: {
      amount: 0,
      pwd: '',
      type: 0,
      bid: 0,
    },
    payTabList: [],
    amount: 0,
    timestampLast: 0, // 上次时间戳
    allwallets: '', // 钱包页面的请求数据
    isAllowUserAddUSDT: true, // 是否能添加USTD
  }),
  getters: {
    getBankName: state => state.bankName,
    getWithdrawalslist: (state): withdrawalslist[] => state.withdrawalslist, // getOrderItem: (state): OrderItem => state.orderItem,
    getBankList: (state): ResBankList[] => state.bankList,
    getWithdrawal: state => state.withdrawals,
    getPayTabList: (state): PayTypeNameData[] => state.payTabList,
    getAmount: state => state.amount,
    getTimestampLast: state => state.timestampLast,
    getAllwallets: state => state.allwallets,
    getADDUSTD: state => state.isAllowUserAddUSDT,
  },
  actions: {
    setBankName (item: any) {
      this.bankName = item
    },
    setWithdrawalslist (item: withdrawalslist[]) {
      this.withdrawalslist = item
    },
    setBankList (item: ResBankList[]) {
      this.bankList = item
    },
    setWithdrawal (item: any) {
      this.withdrawals = item
    },
    setPayTabList (item: PayTypeNameData[]) {
      this.payTabList = item
    },
    setAmount (item: number) {
      this.amount = item
    },
    setUSDTCanAdd (item: any) {
      this.isAllowUserAddUSDT = item?.isAllowUserAddUSDT === undefined ? true : Boolean(item?.isAllowUserAddUSDT === '1')
    },
    setTimestampLast (item: number) {
      this.timestampLast = item
    },
    setAllwallets (item: string) {
      this.allwallets = item
    },
    // 刷新余额数据  参数1，是否弹提示，参数2，是否可以回收第三方游戏余额
    async resetData (noTip?: boolean, Recover?: boolean) {
      const res = await AwaitApiResult(Recover ? RecoverBalance() : GetBalance())
      if (res) {
        this.amount = res?.data.amount
        if (noTip) return
        showSuccessToast(t('refreshSuccess'))
      }
    },
    async getPayTypeName () {
      const result: ObjResNull<PayTypeName> = await AwaitApiResult(GetPayTypeName())
      if (result) {
        if (useSiteStore().getIsSplitLocalEWallet) {
          const typelist = result.data.typelist.map(item => {
            if (item.payID === 18 && item.paySysName === 'KBZPay') {
              item.payNameUrl = getIcons('wallet/detail', 'kbz_icon')
              item.payNameUrl2 = getIcons('wallet/detail', 'kbz_icon')
            }
            if (item.payID === 18 && item.paySysName === 'WavePay') {
              item.payNameUrl = getIcons('wallet/detail', 'wave_icon')
              item.payNameUrl2 = getIcons('wallet/detail', 'wave_icon')
            }
            // item.typeName = t(`code${item.typeNameCode}`)
            return item
          })
          this.setPayTabList(typelist)
          result
        }
        this.setPayTabList(result.data.typelist)
      }
    },
  },
  persist: true, // true即为存储qq
})
