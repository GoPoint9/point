import { isIOS } from './is'

export function clearCache () {
  const u = navigator.userAgent
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isIOS) {
    window.webkit.messageHandlers.clearCache.postMessage(null)
  }
}

export function isHybridApp () {
  if (window.webkit?.messageHandlers?.callNativeMethod) return true
  if (window.external && window.external?.callNativeMethod) return true
  return false
}
export function isAnalysisHybridApp () {
  if (window.webkit?.messageHandlers?.callAnalysisEvents) return true
  if (window.external && window.external?.callAnalysisEvents) return true
  return false
}
export function openAnalysisHybrid (type: string, data: any) {
  if (isIOS) {
    window.webkit.messageHandlers.callAnalysisEvents.postMessage({
      type,
      data,
    })
  } else {
    window.external.callAnalysisEvents(JSON.stringify({ type, data }))
  }
}
export function openHybrid (type: string, data: any) {
  if (isIOS) {
    window.webkit.messageHandlers.callNativeMethod.postMessage({
      type,
      data,
    })
  } else {
    window.external.callNativeMethod(JSON.stringify({ type, data }))
  }
}
export function openBrowser (type: string, data: any) {
  if (!type || !data.url) return
  if (!isHybridApp()) window.location.href = data.url
  openHybrid(type, data)
}
