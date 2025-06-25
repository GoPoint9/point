/* eslint-disable prefer-promise-reject-errors */

import { fixMsg, getLocalNCZ, isApiSuccess } from '@/utils'
import router from '@/router'
// import { refreshToken } from './modules/user'

import { LOGIN_URL } from '@/config/config'
import { GlobalStore, useCommonStore, useHomeStore, useUserStore } from '@/stores'

import { showFailToast, showLoadingToast } from 'vant'
import { checkStatus } from '@/NCZ/api/helper/checkStatus.ts'
// import { useEventBus } from '@/components/common/use'
import axios, { type AxiosError, type AxiosResponse } from 'axios'

import type { RequestConfig } from '@/types/api'
import { ContentTypeEnum, ResultEnum } from '@/types/enums'
import { addPending, cancelPending, getFetchKey, removePending } from './axiosCancelUtil'
import { $t } from '@/languages'
import { addCache } from './axiosCache'
import url from './url'

// const eventBus = useEventBus()

// const baseURL = window.CONFIG?.VITE_API_URL || (import.meta.env.VITE_API_URL as string)
// const extendURL = '/tools/_ajax'
let refreshTokenLock = false
// const arriveLogin = () => {
//   console.warn('arriveLogin ')
//   localStorage.setItem('isToLogin', '1')
//   useUserStore().reset()
//   GlobalStore().setToken('')
//   router.push('/')
//   // window.location.href = window.location.protocol + '//' + window.location.host + LOGIN_URL
// }

function redirectToOrigin () {
  window.sessionStorage.clear()
  window.localStorage.clear()

  useUserStore().reset()
  GlobalStore().setToken('')
  // preserveSourceAndClear()
  // const source = window.localStorage.getItem('source')
  // if (source === 'agent') {
  //   window.localStorage.removeItem('source')
  //   window.location.replace(`${window.location.origin}/agent`)
  // } else {
  //   window.location.href = window.location.origin
  // }
  // window.location.href = window.location.origin
  window.location.href = '/'
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
    // 删除请求头中的noLoading，防止出现cors错误
    // delete config.headers.noLoading

    // // 签名需要提前加language
    // config.data.language = getLocal1()
    // // 验签需要random参数,使用Guid
    // config.data['random'] = randomGuid()
    // // 拷贝configData
    // const configData = JSON.parse(JSON.stringify(config.data))
    // // 提取属性名到数组
    // const keysArray = Object.keys(configData)
    // // 按字母升序排序
    // keysArray.sort()
    // // 创建新对象
    // const sortedObject = {}
    // const white = ['signature', 'track', 'xosoBettingData']
    // keysArray.forEach(key => {
    //   if (configData[key] !== null && configData[key] !== '' && !white.includes(key))
    //     sortedObject[key] = configData[key] === 0.0 ? 0.0 : configData[key]
    // })
    // config.data['signature'] = encryptWithMD5(JSON.stringify(sortedObject))
    // config.data['timestamp'] = Math.floor(Date.now() / 1000)

    //
    config.headers.userLocale = getLocalNCZ()

    const globalStore = GlobalStore()
    // 存 config.data
    globalStore.setReqData(config.data)
    // const token = globalStore.getToken
    // const tokenHeader = localStorage.getItem('tokenHeader') || ''
    // const refreshToken = localStorage.getItem('refreshToken') || ''
    // const Authorization = `${tokenHeader}${config.url?.endsWith('/api/webapi/RefreshToken') ? refreshToken : token}`
    // if (Authorization) config.headers['Authorization'] = Authorization

    config.headers['Content-Type'] = ContentTypeEnum.JSON

    //

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

    // console.warn('config ', JSON.parse(JSON.stringify(config)))
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// code= -1 系统错误  7 参数不合法 -2 自定义错误
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.warn(' service.interceptors.response ', { 'response.data': response.data, 'response.data.code': response.data.code })
    switch (response.data.code) {
      case -2:
        return Promise.reject({ msg: response.data.msg })
      case -1:
        return Promise.reject({ msg: 'System Error' })
      case 'duplicateLogin':
      case 'nologin':
      case 4:
        //  localStorage.clear()
        // arriveLogin()
        // setTimeout(() => {}, 500)
        handleApiError(response)
        return Promise.reject({ msg: $t('tokenExpired') })
      case 13:
        return Promise.reject({ msg: 'Network Abnormal' })
      case 14:
        router.push({ name: 'maintenance' })
        return Promise.reject({ msg: 'In maintenance' })
    }
    // if (response.data.code !== 0 && response.data.code !== 1) {
    if (!isApiSuccess(response.data) && response.data.code !== 1) {
      const { alert } = response.config
      if (alert) {
        // showGenericError(response.data.msg)
        handleApiError(response)
        return
      }
      return Promise.reject(response.data)
    }
    removePending(response)
    addCache(response.config, response.data)

    // console.warn(' [axios] res OK ')
    return response.data
  },
  async (error: AxiosError) => {
    // console.warn(' [service.interceptors.response] error ', error.message, error)
    // NOTE: cache: true => 返回缓存
    if ((error as any).cache) {
      return error
    }

    const { response, config } = error
    const globalStore = GlobalStore()
    const commonStore = useCommonStore()

    if (error.message.indexOf('timeout') !== -1) showFailToast($t('requestTimedOut'))
    if (error.code === 'ERR_NETWORK') showLoadingToast({ message: 'loading...', forbidClick: true })

    if (error.message === 'cancel') {
      return Promise.reject(false)
    }
    // tryHideFullScreenLoading()
    // useCommonStore().setLoading(false)
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
            showFailToast($t('tokenExpired'))
            globalStore.setIsOpen(false) // 请求失败 关闭刷新token
            redirectToOrigin()
            console.log('redirectToOrigin')
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
          // refreshToken()
          //   .then((res: any) => {
          //     if (res && res.data) {
          //       const { token, tokenHeader, refreshToken } = res.data
          //       globalStore.setToken(token)
          //       localStorage.setItem('tokenHeader', tokenHeader)
          //       localStorage.setItem('refreshToken', refreshToken)
          //       commonStore.setIsRefreshToken(false) // 设置commonStore.isRefreshToken为false，表示在header里面使用原来的token
          //       eventBus.emit('keyChange')
          //     }
          //   })
          //   .catch((err: any) => {
          //     console.log('refresh_token_err: ', err)
          //     globalStore.setIsOpen(false) // 请求失败 关闭刷新token
          //     commonStore.setIsRefreshToken(false) // 设置commonStore.isRefreshToken为false，表示在header里面使用原来的token

          //     switch (err.code) {
          //       case 12:
          //         fixMsg(err)
          //         arriveLogin()
          //         break
          //     }
          //   })
          //   .finally(() => {
          //     refreshTokenLock = false
          //   })
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
  payload?: object | string = {}

  // ????
  // option?: {
  //   isUploadFile?: boolean
  //   noLoading?: boolean
  //   alert?: boolean
  //   cache?: boolean
  // },
  // header?: { }
) => {
  const { headers, alert = false, cache, ...data } = payload
  const config = getRequestHeaders(headers, alert)
  const query = {
    url,
    method: 'post',
    data: data.data || data || {},
    ...config,
  }

  // console.warn(' [post] payload ', payload)
  // console.warn(' [post] data ', data)
  // console.warn(' [post] config ', config)

  // ????????????????????????????????
  // query.headers = Object.assign(query.headers, header)
  if (cache) {
    query.params = { cache: true }
  }
  return service(query).then(response => {
    // console.warn('[ post response ] ', response)
    return response
  })
}

export { post }
export default service

function getRequestHeaders (params = {}, showAlert = true, options = {}) {
  const headers = {}
  // const token = window.sessionStorage.getItem('token')
  // if (token) headers.Authorization = tokenㄉ

  for (const key in params) {
    if (params[key]) headers[key] = params[key]
    if (params[key] === false) delete headers[key]
  }

  if (options.language) headers.Language = options.language
  return { headers, alert: showAlert }
}

function showGenericError (message) {
  window.cover.loader(false)
  window.cover.init({
    html: message,
    icon: 'warning',
    btn: { confirm: $t('in_increase_submit') },
  }, (confirmed) => confirmed && redirectToOrigin())
}

function handleApiError (response) {
  console.warn('response ', response)
  const { code, msg } = response.data
  const status = response?.status

  // NOTE: 競品的、有需要用再改。
  const specialErrors = [
    'merchant.acct.setup.err',
    'login_verify_required',
    'TOO_MANY_REQUEST',
    'TOO_MANY_REQUESTS',
    'bind_customer_required',
  ]
  const sessionErrors = [
    // 'token_ip_different',
    // 'user.or.token.invalid',
    // 'login.not.session',
    // 'CUSTOMER_NOT_LOGIN',
    'duplicateLogin',
    'nologin',
    4,
  ]

  if (specialErrors.includes(code)) return
  const timeoutMessage = status === 504 ? (msg || code || $t('timeout_retry_please')) : null
  if (status === 504 && window.location.protocol === 'https:') return

  window.cover.loader(false)
  window.cover.init({
    html: timeoutMessage || msg || code || response?.statusText,
    icon: 'warning',
    btn: { confirm: $t('in_increase_submit') },
  }, (confirm) => {
    if (sessionErrors.includes(code)) redirectToOrigin()
  })
}

function showMaintenanceError (data) {
  window.cover.loader()
  const html = `
    <p style="text-align:center;margin-bottom: 8px;">${data.message}</p>
    <p style="text-align:center">${h()(data.value.content.data.maintainTime).format('YYYY-MM-DD HH:mm:ss')} - 
    ${h()(data.value.content.data.endTime).format('YYYY-MM-DD HH:mm:ss')}</p>`
  window.cover.init({
    html,
    icon: 'warning',
    btn: { confirm: $t('in_increase_submit', '确定') },
  })
}

function showBalanceError (message) {
  window.cover.loader()
  if (location.pathname.includes('seamless')) window.history.back()
  const html = `<p style="text-align:center;margin-bottom: 8px;">${message}</p>`
  window.cover.init({
    html,
    icon: 'warning',
    btn: {
      cancel: $t('label_cancel'),
      confirm: $t('hd_deposit_button'),
    },
  }, (action) => {
    if (action === 'confirm') window.shellAPI.openMc('depositv2')
  })
}

function showModalError ({ message }) {
  const modalDiv = document.createElement('div')
  modalDiv.id = 'modal-api'
  document.body.appendChild(modalDiv)

  // https://v3-migration.vuejs.org/zh/breaking-changes/global-api#vue-extend-%E7%A7%BB%E9%99%A4
  const ModalComponent = Vue.extend(CustomService) // 假設 O 是某個 Vue 組件

  // NOTE: Vue3
  // TODO:
  // TODO:
  // Vue.createApp(CustomService).mount('#mount-point')

  const modal = new ModalComponent({
    i18n: window.i18n || window.$i18n,
    data: {
      message,
      hide: function () {
        setTimeout(() => {
          modal.$destroy()
          document.body.removeChild(modal.$el)
        }, 0)
      },
    },
  })
  modal.$mount('#modal-api')
}

/**
async post(endpoint, options = {}) {
  const { data = {}, headers, alert = endpoint.alert } = options;
  const { encrypted, RSA, DES } = await prepareRequest(endpoint, data);
  const config = getRequestHeaders(headers, alert);

  if (encrypted) {
    config.headers['Encryption'] = RSA;
    return apiClient.post(endpoint.link, { value: DES }, config);
  }
  return apiClient.post(endpoint.link, data, config);
},
 */
