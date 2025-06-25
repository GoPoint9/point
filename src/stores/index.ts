// export * from './modules/activity'
// export * from './modules/common'
// export * from './modules/home'
// export * from './modules/user'
// export * from './modules/global'
// export * from './modules/wallet'
// export * from './modules/lorrery'
// export * from './modules/setting'

// BDG
function generatorStoreH5 () {
  const modules = import.meta.glob('./modules/*.ts', { eager: true })
  const exportedModules = Object.entries(modules).reduce((acc, [, currModule]) => {
    return { ...acc, ...currModule }
  }, {})
  return exportedModules
}

// NCZ
// src/NCZ/stores/modules/global.ts
function generatorStoreWeb () {
  const modules = import.meta.glob('@/NCZ/stores/modules/*.ts', { eager: true })
  const exportedModules = Object.entries(modules).reduce((acc, [, currModule]) => {
    return { ...acc, ...currModule }
  }, {})
  return exportedModules
}

// NOTE: 因為直接透過路徑引入， pinia 會吃到別的同檔名 sotre，故直接在此調整來源
// e.g. 使用 import { GlobalStore } from '@/NCZ/stores' 但實際上拿到這路徑('@/stores') 的 GlobalStore
const stores = import.meta.env.VITE_APP_IS_WEB_PGPC ? generatorStoreWeb() : generatorStoreH5()

export const {
  useActivityStore,
  useCommonStore,
  GlobalStore,
  useHomeStore,
  LorreryStore,
  useUserStore,
  userInfo,
  useWalletStore,
  SettingStore = () => ({}),

  // NCZ
  useSkinStore = () => ({}),
  useSiteStore = () => ({}),
  usePaymentStore = () => ({}),
  useRecordStore = () => ({}),
} = stores

console.warn('stores ', stores)
