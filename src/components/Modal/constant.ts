import type { InjectionKey, CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { ComponentPublicInstance, inject } from 'vue'
interface Injection {
  close: () => void
}
// eslint-disable-next-line
export const POPUP_TOGGLE_KEY: InjectionKey<Injection> = Symbol()
export const overlayProps = {
  show: Boolean,
  zIndex: Number,
  role: String,
  duration: {
    type: Number,
    default: 1,
  },
  className: {
    type: String,
  },
  lockScroll: {
    type: Boolean,
    default: true as const,
  },
  lazyRender: {
    type: Boolean,
    default: true as const,
  },
  transition: String,
  tabindex: Number,
  customStyle: Object as PropType<CSSProperties>,
}
export type OverlayProps = ExtractPropTypes<typeof overlayProps>
export type PopupWrapperInstance = ComponentPublicInstance<{
  close: () => void
  open: () => void
}>
export function useModelCtx () {
  return inject(POPUP_TOGGLE_KEY, { close: () => {} })
}
