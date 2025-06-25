import { useMount, usePopupState } from './modal.hook'
import Popup, { popupSharedProps } from './ModalMain'
import { PopupWrapperInstance } from './constant'
type PopupOptions = typeof popupSharedProps
const defaultOptions = {
  overlay: true,
  teleport: 'body',
  position: 'center',
  transition: 'van-fade',
}
const queue: PopupWrapperInstance[] = []
const allowMultiple = true
function createInstance (option: any) {
  const { onClosed: closed, ...other } = option
  const Wrapper = {
    setup () {
      const { state, toggle } = usePopupState()
      return () => <Popup {...state} {...other} onUpdate:show={toggle} />
    },
  }
  return useMount(Wrapper).instance as PopupWrapperInstance
}
function getInstance (option: any) {
  if (!queue.length || allowMultiple) {
    const instance = createInstance(option)
    queue.push(instance)
  }
  return queue[queue.length - 1]
}
export function useModal (options: Partial<PopupOptions> = {} as PopupOptions) {
  const option = Object.assign({}, defaultOptions, options)
  return getInstance(option)
}
export function closeModal () {
  queue.forEach((item) => {
    item.close()
  })
}
export * from './constant'
