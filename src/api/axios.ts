import { encryptWithMD5, fixMsg, getLocal1, randomGuid } from './../utils'
import router from '@/router'
import { refreshToken } from './modules/user'

import { LOGIN_URL } from '@/config/config'
import { GlobalStore, useCommonStore, useHomeStore } from '@/stores'
import { showFailToast, showLoadingToast } from 'vant'
import { checkStatus } from './helper/checkStatus'
import { useEventBus } from '@/components/common/use'
import axios, { type AxiosError, type AxiosResponse } from 'axios'

import type { RequestConfig } from '@/types/api'
import { ContentTypeEnum, ResultEnum } from '@/types/enums'
import { addPending, cancelPending, getFetchKey, removePending } from './axiosCancelUtil'
import i18n from '@/languages'
import { addCache } from './axiosCache'
import url from './url'
const { t } = i18n.global
const eventBus = useEventBus()

const baseURL = window.CONFIG?.VITE_API_URL || (import.meta.env.VITE_API_URL as string)
const extendURL = '/tools/_ajax'
let refreshTokenLock = false
const arriveLogin = () => {
  localStorage.setItem('isToLogin', '1')
  GlobalStore().setToken('')
  router.push({
    path: LOGIN_URL,
  })
  // window.location.href = window.location.protocol + '//' + window.location.host + LOGIN_URL
}

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // 设置超时时间（10s）
  timeout: ResultEnum.TIMEOUT,
  // 跨域时候允许携带凭证
  // withCredentials: true,
})

service.interceptors.request.use(
  (config: RequestConfig) => {
    const globalStore = GlobalStore()

    // 删除请求头中的noLoading，防止出现cors错误
    // delete config.headers.noLoading

    const token = globalStore.getToken
    // 签名需要提前加language
    config.data.language = getLocal1()
    // 验签需要random参数,使用Guid
    config.data.random = randomGuid()
    // 拷贝configData
    const configData = JSON.parse(JSON.stringify(config.data))
    // 提取属性名到数组
    const keysArray = Object.keys(configData)

    // 按字母升序排序
    keysArray.sort()
    // 创建新对象
    const sortedObject = {}
    const white = ['signature', 'track', 'xosoBettingData']
    keysArray.forEach(key => {
      if (configData[key] !== null && configData[key] !== '' && !white.includes(key)) { sortedObject[key] = configData[key] === 0.0 ? 0.0 : configData[key] }
    })
    config.data.signature = encryptWithMD5(JSON.stringify(sortedObject))
    config.data.timestamp = Math.floor(Date.now() / 1000)
    const tokenHeader = localStorage.getItem('tokenHeader') || ''
    const refreshToken = localStorage.getItem('refreshToken') || ''

    const resq = config.data
    // 存 resq.data
    globalStore.setReqData(resq)
    const homeStore = useHomeStore()
    const { getCacheValue } = homeStore
    if (config.params && config.params.cache) {
      const fetchKey = getFetchKey(config)
      const cacheData = getCacheValue(fetchKey)
      if (cacheData) {
        return Promise.reject({ ...cacheData, cache: true })
      }
    }
    // 发送请求前首先检查该请求是否已经重复，重复则进行取消并移除
    cancelPending(config)
    // 添加该请求到pendingList中
    addPending(config)
    return {
      ...config,
      headers: {
        'Content-Type': 'application/problem+json; charset=utf-8',
        ...config.headers,
        Authorization: config.url?.endsWith('/api/webapi/RefreshToken') ? tokenHeader + refreshToken : tokenHeader + token,
      },
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// code= -1 系统错误  7 参数不合法 -2 自定义错误
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.warn('response.data.code ', response.data.code)
    switch (response.data.code) {
      case -2:
        return Promise.reject({ msg: response.data.msg })
      case -1:
        return Promise.reject({ msg: 'System Error' })
      case 4:
        //  localStorage.clear()
        arriveLogin()
        // setTimeout(() => {}, 500)
        return Promise.reject({ msg: t('tokenExpired') })
      case 13:
        return Promise.reject({ msg: 'Network Abnormal' })
      case 14:
        router.push({
          name: 'maintenance',
        })
        return Promise.reject({ msg: 'In maintenance' })
    }
    if (response.data.code !== 0 && response.data.code !== 1) {
      return Promise.reject(response.data)
    }
    removePending(response)
    addCache(response.config, response.data)
    return response.data
  },
  async (error: AxiosError) => {
    // 是否命中缓存，命中则直接返回
    if ((error as any).cache) {
      return error
    }
    const { response, config } = error
    const globalStore = GlobalStore()
    const commonStore = useCommonStore()
    if (error.code === 'ERR_NETWORK') {
      showLoadingToast({
        message: 'loading...',
        forbidClick: true,
      })
    }
    if (error.message === 'cancel') {
      return Promise.reject(false)
    }
    // tryHideFullScreenLoading()
    // useCommonStore().setLoading(false)
    if (error.message.indexOf('timeout') !== -1) showFailToast(t('requestTimedOut'))
    if (response) {
      // 刷新token 失败则返回登录页
      if (response.status === 401) {
        globalStore.setIsOpen(true) // 开启刷新token

        const urls = config?.url as string
        // 判斷是否有關鍵字'tools/_ajax'
        let match_url: any = /tools\/_ajax(.+)/.exec(urls)
        if (match_url) {
          match_url = match_url[1]
          if (match_url === url.RefreshToken) {
            // refreshToken 过期 返回首页
            showFailToast(t('tokenExpired'))
            globalStore.setIsOpen(false) // 请求失败 关闭刷新token
            arriveLogin()
            console.log('arriveLogin')
            //  localStorage.clear()
            return
          }
        }
        const getIsOpen = globalStore.isOpen // 判断是否开启刷新token
        if (refreshTokenLock) {
          console.log('refreshTokenLock重复请求拦截')
          return
        }
        if (getIsOpen) {
          commonStore.setIsRefreshToken(true) // 设置commonStore.isRefreshToken为true，表示使用refreshToken替换token
          refreshTokenLock = true
          refreshToken()
            .then((res: any) => {
              if (res && res.data) {
                const { token, tokenHeader, refreshToken } = res.data
                globalStore.setToken(token)
                localStorage.setItem('tokenHeader', tokenHeader)
                localStorage.setItem('refreshToken', refreshToken)
                commonStore.setIsRefreshToken(false) // 设置commonStore.isRefreshToken为false，表示在header里面使用原来的token
                eventBus.emit('keyChange')
              }
            })
            .catch((err: any) => {
              console.log('refresh_token_err: ', err)
              globalStore.setIsOpen(false) // 请求失败 关闭刷新token
              commonStore.setIsRefreshToken(false) // 设置commonStore.isRefreshToken为false，表示在header里面使用原来的token

              switch (err.code) {
                case 12:
                  fixMsg(err)
                  arriveLogin()
                  break
              }
            })
            .finally(() => {
              refreshTokenLock = false
            })
        }
        return
      } else {
        checkStatus(response.status)
      }
    }
    removePending(error.response as AxiosResponse)
    return Promise.reject(error)
  }
)

const post = (
  url: string,
  data?: object | string,
  option?: {
    isUploadFile?: boolean
    noLoading?: boolean
    cache?: boolean
  },
  header?: {}
) => {
  const query = {
    // url: url.startsWith('https://') ? url : baseURL + extendURL + url,
    url,
    method: 'post',
    headers: {
      // 'Content-Type': ContentTypeEnum.JSON,
      noLoading: option?.noLoading || false,
    },
    data: data || {},
  }

  // console.warn(' [post] ', url.startsWith('https://') ? url : baseURL + extendURL + url)
  // console.warn(' [post] query ', query, { baseURL, extendURL, url })

  query.headers = Object.assign(query.headers, header)
  if (option?.cache) {
    (query as any).params = {
      cache: true,
    }
  }
  return service(query).then(response => {
    // console.warn('[ post response ] ', response)
    return response
  })
}

export { post }
export default service
