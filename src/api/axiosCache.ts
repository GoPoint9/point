/*
 * @Author: Seven
 * @Date: 2023-03-30 17:29:53
 * @LastEditTime: 2023-03-31 11:27:22
 * @LastEditors: Seven
 * @Description: 接口请求缓存
 */

import type { RequestConfig } from '@/types/api'
import { getFetchKey } from './axiosCancelUtil'
import { useHomeStore } from '@/stores'
import axios from 'axios'

const cancelToken = axios.CancelToken
const cancel = cancelToken.source()
export const requestCache = (config: RequestConfig) => {
  const homeStore = useHomeStore()
  const { getCacheValue } = homeStore
  if (config.params && config.params.cache) {
    const fetchKey = getFetchKey(config)
    const cacheData = getCacheValue(fetchKey)
    if (cacheData) {
      console.log('cacheData', cacheData)
      cancel.cancel(cacheData)
    }
  }
}

export const addCache = (config: RequestConfig, data: any) => {
  const homeStore = useHomeStore()
  const { setCacheData } = homeStore
  if (config.params && config.params.cache) {
    const fetchKey = getFetchKey(config)
    setCacheData(fetchKey, data)
  }
}
