import {
  computed,
  defineComponent,
  nextTick,
  onActivated,
  onDeactivated,
  onMounted,
  provide,
  ref,
  Teleport,
  Transition,
  watch
} from 'vue'
import type { TeleportProps, PropType, CSSProperties } from 'vue'
import { useScrollLock } from '@vueuse/core'
import { useExpose, useGlobalZIndex, useInterceptor, useLazyRender } from './modal.hook'
import type { Interceptor } from './modal.hook'
import { noon, isDef, getZIndexStyle, preventDefault } from '@/utils'
import { useEventListener } from '@/components/common/use'
import { POPUP_TOGGLE_KEY, overlayProps } from './constant'

export const Overlay = defineComponent({
  props: overlayProps,
  setup (props, { emit, slots }) {
    const root = ref<any>()
    const lazyRender = useLazyRender(() => props.show || !props.lazyRender)
    const onTouchMove = (event: TouchEvent) => {
      if (props.lockScroll) {
        preventDefault(event, true)
      }
    }
    const renderOverlay = lazyRender(() => {
      const style: CSSProperties = Object.assign(getZIndexStyle(props.zIndex), props.customStyle)

      // if (props.duration) {
      //   style.animationDuration = `${props.duration}s`;
      // }

      return (
        <div v-show={props.show} ref={root} style={style} class={[props.className, 'popup-overlay']}>
          {slots.default?.()}
        </div>
      )
    })
    // @ts-expect-error
    useEventListener('touchmove', onTouchMove, {
      target: root,
    })
    return () => <Transition v-slots={{ default: renderOverlay }} name={props.transition || 'fade'} appear />
  },
})
export const CommonProps = {
  show: Boolean,
  zIndex: Number,
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body',
  },
  duration: { type: Number },
  lockScroll: {
    type: Boolean,
    default: true as const,
  },
  lazyRender: {
    type: Boolean,
    default: true as const,
  },
  overlay: {
    type: Boolean,
    default: false as const,
  },
  transitionAppear: {
    type: Boolean,
    default: true as const,
  },
  content: Function as PropType<any>,
  transition: String,
  destroyOnClose: {
    type: Boolean,
    default: true as const,
  },
  beforeClose: Function as PropType<Interceptor | any>,
  overlayStyle: Object as PropType<CSSProperties>,
  closeOnClickOverlay: {
    type: Boolean,
    default: false as const,
  },
}
export const popupSharedProps = Object.assign({}, CommonProps, {
  position: {
    type: String,
    default: '',
  },
  safeAreaInsetTop: Boolean,
  safeAreaInsetBottom: Boolean,
  safeArea: Boolean,
  overlayClass: String,
  closeOnPopstate: Boolean,
})
export default defineComponent({
  inheritAttrs: false,
  props: popupSharedProps,
  emits: ['open', 'close', 'opened', 'closed', 'keydown', 'update:show', 'clickOverlay'],

  setup (props, { emit, attrs, slots }) {
    let opened: boolean
    let shouldReopen: boolean
    const isLocked = useScrollLock(document.body)
    const zIndex = ref<number>()
    const rendered = ref<boolean>(false)
    const popupRef = ref<HTMLElement>()
    const lazyRender = useLazyRender(() => props.show || !props.lazyRender)
    const style = computed(() => {
      const style: CSSProperties = {
        zIndex: zIndex.value,
      }

      if (isDef(props.duration)) {
        const key = props.position === 'center' ? 'animationDuration' : 'transitionDuration'
        style[key] = `${props.duration}m`
      }

      return style
    })
    const open = () => {
      if (!opened) {
        opened = true
        isLocked.value = true
        zIndex.value = props.zIndex !== undefined ? +props.zIndex : useGlobalZIndex()
        rendered.value = true
        emit('open')
      }
    }
    const close = () => {
      if (opened) {
        useInterceptor(props.beforeClose, {
          done () {
            opened = false
            emit('close')
            emit('update:show', false)
            isLocked.value = false
            if (props.destroyOnClose) {
              rendered.value = false
            }
          },
        })
      }
    }
    const onOpened = () => emit('opened')
    const onClosed = () => emit('closed')
    const onKeydown = (event: KeyboardEvent) => emit('keydown', event)
    const onClickOverlay = (event: MouseEvent) => {
      emit('clickOverlay', event)
      if (props.closeOnClickOverlay) {
        close()
      }
    }
    watch(
      () => props.show,
      (show) => {
        if (show && !opened) {
          open()

          if (attrs.tabindex === 0) {
            nextTick(() => {
              popupRef.value?.focus()
            })
          }
        }
        if (!show && opened) {
          close()
        }
      }
    )
    useExpose({ popupRef })
    useEventListener('popstate', () => {
      if (props.closeOnPopstate) {
        close()
        shouldReopen = false
      }
    })

    onMounted(() => {
      if (props.show) {
        open()
      }
    })

    onActivated(() => {
      if (shouldReopen) {
        emit('update:show', true)
        shouldReopen = false
      }
    })

    onDeactivated(() => {
      // teleported popup should be closed when deactivated
      if (props.show && props.teleport) {
        close()
        shouldReopen = true
      }
    })
    provide(POPUP_TOGGLE_KEY, { close })
    const renderPopup = lazyRender(() => {
      const { position, safeAreaInsetTop, safeAreaInsetBottom } = props
      const content = props.content || slots.default || noon
      return (
        <div
          v-show={props.show}
          ref={popupRef}
          style={style.value}
          role="dialog"
          tabindex={0}
          class={[
            'popup',
            position === 'center' ? 'popup-center' : null,
            {
              'van-safe-area-top': safeAreaInsetTop,
              'van-safe-area-bottom': safeAreaInsetBottom,
            },
          ]}
          onKeydown={onKeydown}
          {...attrs}
        >
          {rendered.value && content()}
        </div>
      )
    })
    const renderOverlay = () => {
      if (props.overlay) {
        return (
          <Overlay
            v-slots={{ default: slots['overlay-content'] }}
            show={props.show}
            class={props.overlayClass}
            zIndex={zIndex.value}
            duration={props.duration}
            customStyle={props.overlayStyle}
            role={props.closeOnClickOverlay ? 'button' : undefined}
            tabindex={props.closeOnClickOverlay ? 0 : undefined}
            // @ts-expect-error
            onClick={onClickOverlay}
          />
        )
      }
    }
    const renderTransition = () => {
      const { position, transition, transitionAppear } = props
      const name = position === 'center' ? 'fade' : `popup-slide-${position}`

      return (
        <Transition
          v-slots={{ default: renderPopup }}
          name={transition || name}
          appear={transitionAppear}
          onAfterEnter={onOpened}
          onAfterLeave={onClosed}
        />
      )
    }

    return () => {
      if (props.teleport) {
        return (
          <Teleport to={props.teleport}>
            {renderOverlay()}
            {renderTransition()}
          </Teleport>
        )
      }
      return (
        <>
          {renderOverlay()}
          {renderTransition()}
        </>
      )
    }
  },
})
