import { Component } from 'vue' // 用於類型定義
import { extractFileName } from '@/utils'

import LoadingComponent from '@/components/common/LoadingComponent.vue'

// 定義菜單項的類型
export interface MenuItem {
  name: string;
  page: string;
  component?: Component; // 可以是同步或異步組件

  className?: string;
  icon?: string;
}
type ComponentLoader = () => Promise<{ default: Component }>;
// Hook 參數類型
interface UseMenuComponentsOptions {
  componentEntries?: [string, ComponentLoader][];
  menus?: MenuItem[]; // 外部傳入的菜單數據
  initialSelect?: boolean; // 是否預設選第一個
}

const ErrorComponent = defineComponent({
  name: 'ErrorComponent',
  props: {
    message: {
      type: String,
      default: 'Failed to load component',
    },
  },
  render () {
    return h('div', { class: 'error Ｘ' }, this.message)
  },
})

// // NOTE: 共享狀態
// // 是否顯示 modal
// const isShow = ref(false)

export function useMenuComponents ({
  componentEntries = [],
  menus: initialMenus = [],
  initialSelect = true,
}: UseMenuComponentsOptions = {}) {
  // 驗證 componentEntries
  if (!Array.isArray(componentEntries) || componentEntries.length === 0) {
    console.warn('componentEntries is empty or invalid')
  }

  // 從 componentEntries 生成 components 映射
  const components = componentEntries.reduce((acc, [path, loader]) => {
    const name = extractFileName(path)
    // return name ? { ...acc, [name]: defineAsyncComponent(loader) } : acc
    const component = defineAsyncComponent({ loader, loadingComponent: LoadingComponent })
    return name ? { ...acc, [name]: markRaw(component) } : acc
  }, {} as Record<string, ReturnType<typeof defineAsyncComponent>>)

  // 將外部傳入的 menus 轉為響應式數據，並關聯組件
  const menus = ref<MenuItem[]>(
    initialMenus.map(menu => ({
      ...menu,
      component: components[menu.page] || null,
    }))
  )

  // 當前選中的菜單
  const currentMenu = ref<MenuItem | null>(null)

  // 當前渲染的組件，帶錯誤處理
  const currentComponent = computed(() => {
    try {
      const menu = currentMenu.value
      if (!menu) return () => h(ErrorComponent, { message: 'No menu selected' })
      const component = menu.component
      if (!component) return () => h(ErrorComponent, { message: `Component "${menu.page}" not found` })
      return component
    } catch (error) {
      console.error('Error in computing currentComponent:', error)
      const message = `Error loading component: ${error instanceof Error ? error.message : String(error)}`
      return () => h(ErrorComponent, { message })
    }
  })

  // 選擇菜單項的方法
  const onSelectMenu = (menu: MenuItem) => {
    // isShow.value = true
    // console.warn(' [onSelectMenu] menu ', menu, ', isShow: ', unref(isShow))
    currentMenu.value = menu
  }

  // 初始化默認選中第一個菜單
  onMounted(() => {
    // if(!unref(isShow)) return
    console.warn('initialSelect ', initialSelect)
    if (!initialSelect) return
    if (menus.value.length > 0 && !currentMenu.value) {
      currentMenu.value = menus.value[0]
    }
  })

  // 返回 Hook 的公開 API
  return {
    // isShow,
    menus, // 響應式菜單數據
    currentMenu, // 當前選中的菜單
    currentComponent, // 當前選中的組件
    onSelectMenu, // 切換菜單的方法
  }
}
