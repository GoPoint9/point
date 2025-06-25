import { getCurrentInstance, h, render } from 'vue'
import type { VNode } from 'vue'
import DialogMain from './Dialog.vue'
interface Options {
  show?: boolean
  type?: 'info' | 'success' | 'error'
  showCancel?: boolean
  cancelText?: string
  showConfirm?: boolean
  confirmText?: string
  title?: string
  code?: string
  desc?: string | Function
  cancel?: () => void
  confirm?: () => void
  close?: () => void
  showClose?: boolean
  time?: number
  maskClose?: boolean
}

interface InstanceObj {
  isUnmounted: boolean
  vm: VNode
  open: () => void
  unmount: () => void
}

const dialog = (option: Options) => {
  const ctx = getCurrentInstance()
  const { cancel, confirm, close, ...opt } = option
  const dialogBox = document.createElement('div')
  let instance: InstanceObj
  const vm: VNode = h(DialogMain, {
    ...opt,
    onCancel: cancel,
    onConfirm: confirm,
    'onUpdate:show' () {
      vm.component && (vm.component.props.show = false)
      close?.()
      instance?.unmount?.()
    },
  })
  instance = {
    isUnmounted: false,
    vm,
    open () {
      document.body.appendChild(dialogBox)
      render(vm, dialogBox)
      vm.component?.props && (vm.component.props.show = true)
      console.log(ctx, 'ctx')
      vm.appContext = ctx?.appContext || null
    },
    unmount () {
      if (vm.component?.isUnmounted) return
      instance.isUnmounted = true // 设置销毁标记
      render(null, dialogBox)
      dialogBox?.parentNode?.removeChild(dialogBox)
    },
  }
  return instance
}
export default dialog
