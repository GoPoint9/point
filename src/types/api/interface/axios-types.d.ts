import { extend } from '@/utils/basic'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface RequestConfig extends AxiosRequestConfig {
  noLoading?: boolean
  headers?: any
}
export interface AxiosResponseConfig extends AxiosResponse {
  code?: number
  msg?: string
  msgCode?: number
}

export interface Result {
  code: number
  msg: string
  success: boolean
  data: any
}
