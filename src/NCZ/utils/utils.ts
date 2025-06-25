import router from '@/router'

import { useClipboard } from '@vueuse/core'
import { $t } from '@/languages'

/**
 * 取代字串中所有符合的字
 * @param content 內容
 * @param target 被取代的字串
 * @param replacement 取代後的字串
 * @returns 替換後的字串
 */
export const stringReplace = (content: string, target: string, replacement: string): string => {
  if (!content) return content
  return content.split(target).join(replacement)
}

// 複製文字
export const onCopyText = (text) => {
  const { copy } = useClipboard()
  copy(text)
  window.cover.loader(!0)
  window.cover.init({
    html: $t('copy_success'),
    icon: 'success',
    btn: { confirm: $t('in_increase_submit', '确定') },
  })
  window.cover.loader(!1)
}

// 會員登出
export const onLogout = () => {
  const confirmLogout = async (action) => {
    if (action !== 'confirm') return

    window.cover.loader(true)
    const userStore = useUserStore()
    await userStore.loginOutNCZ()
    window.cover.loader(false)
    router.replace('/')
  }

  window.cover.init({
    title: $t('in_popup_prompt'),
    html: $t('in_sure_logout'),
    icon: 'info',
    btn: { cancel: $t('in_more_cancel'), confirm: $t('in_increase_submit') },
  }, confirmLogout)
}

/**
 * NOTE: 跟 H5 版的 [IsParmReady] 唯一不同，'null', 'undefined' 返回 false
 * @param param
 * @returns
 */
export function isParamReady (param) {
  if ([undefined, null, 'undefined', 'null'].includes(param)) return false
  if (typeof param === 'boolean') return true
  return param === 0 ? true : !!param
}
