// import { showFailToast } from 'vant'

export const extend = Object.assign
export const splitStr = (str: string) => {
  return str.slice(1, str.length)
}
export function encodeToBase64 (string: string) {
  return btoa(string)
}
export function decodeFromBase64 (encodedString: string) {
  return atob(encodedString)
}
