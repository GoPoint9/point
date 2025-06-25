import { getIcons, getIconsPublic } from '@/utils'

import i18n from '@/languages'

const $t = i18n.global.t

export function getStatusImg (index: number) {
  switch (index) {
    case 0:
      return getIconsPublic('activity/PointMall', 'orderPendingImg')
    case 1:
      return getIconsPublic('activity/PointMall', 'orderSentImg')
    case 2:
      return getIconsPublic('activity/PointMall', 'orderCompletedImg')
    case 3:
      return getIconsPublic('activity/PointMall', 'orderCanceledImg')
    default:
      return getIconsPublic('activity/PointMall', 'orderPendingImg')
  }
}

export function statusText (index: number) {
  switch (index) {
    case 0:
      return $t('tobeDelivered')
    case 1:
      return $t('shipped')
    case 2:
      return $t('completed')
    case 3:
      return $t('canceled')
    default:
      return $t('tobeDelivered')
  }
}
