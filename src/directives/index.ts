import { getIconsPublic } from '@/utils'
import type { App } from 'vue'

import debounce from './modules/debounce'
import throttle from './modules/throttle'
import onlyNum from './modules/onlynum'
import vLazy from './modules/lazy'
import throttleClick from './modules/debounceClick'
import haspermission from './modules/permission'

const directivesList: any = {
  debounce,
  throttle,
  onlyNum,
  throttleClick,
  haspermission,
}

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key])
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          if (item.isIntersecting) {
            // 开始加载图片，把 data-origin 的值放到 src
            const el = item.target as HTMLImageElement
            el.src = (el.dataset.origin as string) || getIconsPublic('images', 'avatar')
            el.onerror = () => {
              observer.unobserve(el)
              const dataImg = el.dataset.img || getIconsPublic('images', 'avatar')
              if (!dataImg || dataImg?.includes('undefined')) {
                el.onerror = null
                return
              }
              el.src = dataImg
              el.style.objectFit = 'contain'
              // 判断是否加载过，防止无限加载
              // const time = new Date().getTime()
              // el.attributes['isLoad'] = time
            }
            el.classList.remove('ar-lazyload')
            // 停止监听
            observer.unobserve(el)
          }
        })
      },
      {
        // 交叉视图的 100ps，才开始派发事件
        rootMargin: '0px 0px -50px 0px',
      }
    )
    app.directive('lazy', vLazy(observer))
  },
}

export default directives
