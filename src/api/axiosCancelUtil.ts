import type { RequestConfig } from '@/types/api'
import axios from 'axios'
import apiUrl from './url'
import { deepCopy } from '@/utils'

const pendingList = new Map()

const whiteList = [
  // 'RefreshToken', //重复刷新token
  // 'getWithdrawals', // 提现接口
  'GetRechargeRecord', // 充值记录
  'GetPointMallState', // 是否开启积分商城
  'GetRechargeTypes', // 充值通道列表
  'RegisterState', // 是否开启短信验证码
]

export const getFetchKey = (config: RequestConfig) => {
  const { url, data } = config
  const obj = typeof data === 'string' ? JSON.parse(data) : deepCopy(data)
  delete obj.random
  delete obj.timestamp
  delete obj.signature
  const token = [url, JSON.stringify(obj)].join('&')
  return token
}

export const addPending = (config: RequestConfig) => {
  const { url } = config

  // const urlAddress = url?.split('/') as string[]
  const matchUrl: any = /api\/webapi\/(.+)/.exec(url as string)
  if (matchUrl) {
    if (whiteList.includes(matchUrl[1])) {
      // console.log('包含', whiteList)
      // console.log('包含', matchUrl[1])
      return
    }
  }

  // console.log('whiteList', whiteList)
  // console.log('matchUrl', matchUrl[1])
  // console.log('包含2', whiteList.includes(matchUrl[1]))

  const fetchKey = getFetchKey(config)

  if (fetchKey) {
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingList.has(fetchKey)) {
          pendingList.set(fetchKey, cancel)
        }
      })
  }
}

export const removePending = (config: RequestConfig) => {
  const fetchKey = getFetchKey(config)

  if (fetchKey) {
    if (pendingList.has(fetchKey)) {
      pendingList.delete(fetchKey)
    }
  }
}

export const cancelPending = (config: RequestConfig) => {
  const fetchKey = getFetchKey(config)

  if (fetchKey) {
    if (pendingList.has(fetchKey)) {
      const cancel = pendingList.get(fetchKey)
      cancel('cancel')
      pendingList.delete(fetchKey)
    }
  }
}
