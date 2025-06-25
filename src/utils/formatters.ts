import { getLocal, getLocal1 } from './util'
import i18n from '@/languages'

const $t = i18n.global.t

/**
 * @description format time
 * @param {number | string | Date} timestamp
 * @param {string} format
 * @return {string} date
 * @example formatTime(timestamp, 'yyyy-MM-dd hh:mm:ss') // 2023-02-24 00:00:00
 * @example formatTime(timestamp, 'yyyy-MM-dd') // 2023-02-24
 * @example formatTime(timestamp, 'hh:mm:ss') // 00:00:00
 * @example formatTime(timestamp, 'w') // 一 二 三 四 五 六 日
 */
export const formatTime = (timestamp: number | string | Date, format: string): string => {
  const date = new Date(timestamp)
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const weekday = date.getUTCDay()
  const day = date.getUTCDate()
  const hour = date.getUTCHours()
  const minute = date.getUTCMinutes()
  const second = date.getUTCSeconds()
  // TODO: implement i18n / 国际化星期天数
  const week = [$t('sunday'), $t('monday'), $t('tuesday'), $t('wednesday'), $t('thursday'), $t('friday'), $t('saturday')]
  return format
    .replace('yyyy', year.toString())
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('M', month.toString())
    .replace('dd', day.toString().padStart(2, '0'))
    .replace('hh', hour.toString().padStart(2, '0'))
    .replace('mm', minute.toString().padStart(2, '0'))
    .replace('ss', second.toString().padStart(2, '0'))
    .replace('w', week[weekday])
}

/**
 * @description format string
 * @param {string} str
 * @param {number} len
 * @return {string}
 */
export const formatString = (str: string, len: number): string => {
  if (str.length > len) {
    return str.slice(0, len) + '...'
  }
  return str.toUpperCase()
}

/**
 * @description format points
 * @param {number} points
 * @return {string}
 */
export const formatPoints = (points: number): string => {
  const array = points.toString().split('')
  const length = array.length
  if (length > 3) {
    for (let i = length - 3; i > 0; i -= 3) {
      array.splice(i, 0, '\'')
    }
  }
  return array.join('')
}

// 文件大小
/**
 * @description format file size
 * @param {number} fileSize
 * @returns {string}
 */
export const formatFileSize = (fileSize: number): string => {
  let temp: number | undefined | string
  if (fileSize < 1024) {
    return fileSize + 'B'
  } else if (fileSize < 1024 * 1024) {
    temp = fileSize / 1024
    temp = temp.toFixed(2)
    return temp + 'KB'
  } else if (fileSize < 1024 * 1024 * 1024) {
    temp = fileSize / (1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'MB'
  } else {
    temp = fileSize / (1024 * 1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'GB'
  }
}

/**
 * @description 格式化货币
 * @param value 金额
 * @param _currency 货币符号
 * @param decimals 小数位数
 * @returns {string}
 * @example formatCurrency(1000, '$', 2) // $1,000.00
 */

export const formatCurrency = (value: number, _currency: string, decimals: number) => {
  const newVal = new Intl.NumberFormat(getLocal()).format(value)
  const newDecimals = []
  for (let i = 0; i < decimals; i++) {
    newDecimals.push('0')
  }
  return `${_currency}${newVal}.${newDecimals.join('')}`
}

// 货币过滤器
export const currency = (value: any, _currency = '', decimals = 2) => {
  const digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  _currency = _currency || sessionStorage.getItem('dollarSign') || '' // 加默认值是因为如果没有获取到后台数据会显示null
  decimals = decimals != null ? decimals : 2
  const stringified = Math.abs(value).toFixed(decimals)
  const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  const i = _int.length % 3
  const head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
  const _float = decimals ? stringified.slice(-1 - decimals) : ''
  const sign = value < 0 ? '-' : ''
  const Language = getLocal1()
  if (Language == '2') {
    return sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float + _currency
  } else {
    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float
  }
}
// 过滤号码
export const filterNum = (value: string) => {
  if (value) {
    return `${value.substr(0, 4)}    ****    ****    ${value.substr(value.length - 4)}`
  } else {
    return ''
  }
}

export const hidePhoneNumber = (mobile?: string) => {
  const phoneNumber = localStorage.getItem('number') || ''
  const are = localStorage.getItem('numberType') || ''
  const phone = mobile || are + phoneNumber
  if (phone) {
    // 使用正则表达式将手机号中的数字替换为星号
    if (phone.length > 9) {
      return '+' + phone.replace(/^(\d{5})\d+(\d{4})$/, '$1****$2')
    } else {
      return '+' + phone.replace(/^(\d{4})\d+(\d{2})$/, '$1****$2')
    }
  }
  return ''
}

export const hideEmail = (email: string) => {
  // 使用正则表达式将邮箱中的字符替换为星号
  return email.replace(/^([\w]{0,4})[\w\d]*@([\w\d]{0,15}[\w\d\.]*)$/, (match, p1, p2) => {
    // 获取@符号前的字符数
    const prefixLength = p1.length
    // 获取@符号后的字符数
    const suffixLength = p2.length
    // 如果@符号后的字符数大于15，则截取最后15个字符
    const suffix = suffixLength > 15 ? p2.substring(suffixLength - 15) : p2
    // 返回隐藏后的邮箱地址
    return `${prefixLength > 4 ? p1.substring(0, 4) + '****' : p1 + '****'}${suffixLength > 15 ? '' : '@'}${suffix}`
  })
}
