import { isRef, onDeactivated, onUnmounted, unref, watch } from 'vue'
import type { Ref } from 'vue'
import { onMountedOrActivated } from './onMountedOrActivated'
type TargetRef = EventTarget | Ref<EventTarget | undefined>

export type UseEventListenerOptions = {
  target?: TargetRef
  capture?: boolean
  passive?: boolean
}

export function useEventListener<K extends keyof DocumentEventMap>(
  type: K,
  listener: (event: DocumentEventMap[K]) => void,
  options?: UseEventListenerOptions
): void
export function useEventListener(type: string, listener: EventListener, options?: UseEventListenerOptions): void
export function useEventListener (type: string, listener: EventListener, options: UseEventListenerOptions = {}) {
  const { target = window, passive = false, capture = false } = options

  let attached: boolean

  const add = (target?: TargetRef) => {
    const element = unref(target)

    if (element && !attached) {
      element.addEventListener(type, listener, {
        capture,
        passive,
      })
      attached = true
    }
  }

  const remove = (target?: TargetRef) => {
    const element = unref(target)

    if (element && attached) {
      element.removeEventListener(type, listener, capture)
      attached = false
    }
  }

  onUnmounted(() => remove(target))
  onDeactivated(() => remove(target))
  onMountedOrActivated(() => add(target))

  if (isRef(target)) {
    watch(target, (val, oldVal) => {
      remove(oldVal)
      add(val)
    })
  }
}
