// src/stores/record.js
import { defineStore } from 'pinia'
import { AwaitApiResult } from '@/utils'
import { post, apiUrls } from '@/NCZ/api'

// 定義 API 方法
const recordAPI = {
  queryBillRecord: (data) => post(apiUrls.queryBillRecord, data),
  queryRechargeRecord: (data) => post(apiUrls.queryRechargeRecord, data),
  queryWithdrawRecord: (data) => post(apiUrls.queryWithdrawRecord, data),
  queryCashLockRecord: (data) => post(apiUrls.queryCashLockRecord, data),
  getPayTypeName: (data) => post(apiUrls.getPayTypeName, data), // 取得充值類型
  getDrawTypeName: (data) => post(apiUrls.getDrawTypeName, data), // 取得提現類型
}

export const useRecordStore = defineStore({
  id: 'record',
  state: () => ({
    billRecord: null,
    rechargeRecord: null,
    withdrawRecord: null,
    lockRecord: null,
    payList: [], // 充值銀行
    drawList: [], // 提款銀行
    statusList: [], // 狀態
    vanDateMin: new Date(2022, 1, 1), // van-datetime-picker 限制最小日期
  }),
  getters: {
    // 如果需要 getter，可以在這裡添加，例如：
    getBillRecord: (state) => state.billRecord || [],
    getRechargeRecord: (state) => state.rechargeRecord || [],
    getWithdrawRecord: (state) => state.withdrawRecord || [],
  },
  actions: {
    async fetchBillRecord (params) {
      const data = { ...params, device: 0 }
      const res = await AwaitApiResult(recordAPI.queryBillRecord(data))
      if (res.code === 'success') {
        this.billRecord = res.data.records
        this.setVanDateMin(res.data.starDate) // 注意：原始碼中是 starDate，可能應為 startDate
        return res.data.records
      }
      throw new Error(res.msg || 'Failed to fetch bill record')
    },

    async fetchRechargeRecord (params) {
      const { type, ...otherParams } = params
      const data = { ...otherParams, payType: type }
      const res = await AwaitApiResult(recordAPI.queryRechargeRecord(data))
      if (res.code === 'success') {
        this.rechargeRecord = res.data.records
        return res.data.records
      }
      throw new Error(res.msg || 'Failed to fetch recharge record')
    },

    async fetchWithdrawRecord (params) {
      const requirement = {
        accountName: params.accountName,
        drawType: params.type,
        time: params.time,
        startDate: params.startDate,
        endDate: params.endDate,
        pageNo: params.pageNo,
        pageSize: params.pageSize,
        status: params.status,
        statusList: params.statusList,
      }
      const res = await AwaitApiResult(recordAPI.queryWithdrawRecord({ Requirement: requirement }))
      if (res.code === 'success') {
        this.withdrawRecord = res.data.records
        return res.data.records
      }
      throw new Error(res.msg || 'Failed to fetch withdraw record')
    },

    async fetchLockRecord (params) {
      const requirement = {
        accountName: params.accountName,
        tradeType: params.type,
        time: params.time,
        pageNo: params.pageNo,
        pageSize: params.pageSize,
      }
      const res = await AwaitApiResult(recordAPI.queryCashLockRecord({ Requirement: requirement }))
      if (res.code === 'success') {
        this.lockRecord = res.data.records
        return res.data.records
      }
      throw new Error(res.msg || 'Failed to fetch lock record')
    },

    async fetchPayTypeName () {
      const res = await AwaitApiResult(recordAPI.getPayTypeName({ Requirement: {} }))
      if (res.code === 'success') {
        this.payList = res.data.payList
        this.statusList = res.data.statusList
        return res.data
      }
      if (res?.msg) {
        window.layer.alert(res.msg)
      }
      throw new Error(res.msg || 'Failed to fetch pay type name')
    },

    async fetchDrawTypeName () {
      const res = await AwaitApiResult(recordAPI.getDrawTypeName({ Requirement: {} }))
      if (res.code === 'success') {
        this.drawList = res.data.drawList
        this.statusList = res.data.statusList
        return res.data
      }
      if (res?.msg) {
        window.layer.alert(res.msg)
      }
      throw new Error(res.msg || 'Failed to fetch draw type name')
    },

    // 內部工具函數
    setVanDateMin (dateString) {
      const [year, month, day] = dateString.split('-').map(Number)
      this.vanDateMin = new Date(year, month - 1, day)
    },
  },
})
