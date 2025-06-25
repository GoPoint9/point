import { createVNode, render, getCurrentInstance, reactive, ref, watch } from 'vue'
import type { Component, ComponentPublicInstance, WatchSource } from 'vue'
import { isPromise, noon } from '@/utils'
let globalZIndex = 100
export type ComponentInstance = ComponentPublicInstance<{}, any>
export function useExpose<T = Record<string, any>> (apis: T) {
  const instance = getCurrentInstance()
  if (instance) {
    Object.assign(instance.proxy as object, apis)
  }
}
export function usePopupState () {
  const state = reactive<{
    show: boolean
    [key: string]: any
  }>({
    show: false,
  })

  const toggle = (show: boolean) => {
    state.show = show
  }

  const open = (props?: Record<string, any>) => {
    if (props) {
      Object.assign(state, props, { transitionAppear: true })
    }
    toggle(true)
  }

  const close = () => toggle(false)

  useExpose({ open, close, toggle })

  return {
    open,
    close,
    state,
    toggle,
  }
}
export function useMount (RootComponent: Component) {
  const int = getCurrentInstance()
  const app = createVNode(RootComponent)
  app.appContext = int?.appContext || null

  const root = document.createElement('div')
  document.body.appendChild(root)
  render(app, root)
  const proxy = app.component?.proxy || {}
  return {
    instance: proxy as ComponentInstance,
    unmount () {
      render(null, root)
      document.body.removeChild(root)
    },
  }
}

export const useGlobalZIndex = () => ++globalZIndex

export function useLazyRender (show: WatchSource<boolean | undefined>) {
  const inited = ref(false)

  watch(
    show,
    value => {
      if (value) {
        inited.value = value
      }
    },
    { immediate: true }
  )

  return (render: () => JSX.Element) => () => inited.value ? render() : null
}

export type Interceptor = (...args: any[]) => Promise<boolean> | boolean | undefined | void | null

export function useInterceptor (
  interceptor: Interceptor | undefined,
  {
    args = [],
    done,
    canceled,
  }: {
    args?: unknown[]
    done: () => void
    canceled?: () => void
  }
) {
  if (interceptor) {
    // eslint-disable-next-line prefer-spread
    const returnVal: any = interceptor.apply(null, args)
    if (isPromise(returnVal)) {
      returnVal
        .then((value: unknown) => {
          if (value) {
            done()
          } else if (canceled) {
            canceled()
          }
        })
        .catch(noon)
    } else if (returnVal) {
      done()
    } else if (canceled) {
      canceled()
    } else {
      done()
    }
  } else {
    done()
  }
}
