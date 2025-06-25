import { deepCopy } from '@/utils'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore({
  id: 'commonStore',
  state: () => ({
    showSideMenu: true,
    isLoading: false,
    isRefreshToken: false,
    teleportTarget: null,
    keepAliveList: ['RechargeHistory'] as any,
  }),
  getters: {
    getLoading: state => state.isLoading,
    getIsRefreshToken: state => state.isRefreshToken,
    getKeepAliveList: state => state.keepAliveList,
  },
  actions: {
    setShowSideMenu (type) {
      this.showSideMenu = type === 'reverse' ? !this.showSideMenu : type
    },
    setLoading (item: any) {
      this.isLoading = item
    },
    setIsRefreshToken (item: any) {
      this.isRefreshToken = item
    },
    setKeepAliveList (item: any) {
      if (this.keepAliveList.includes(item)) return
      this.keepAliveList.push(item)
    },
    reastKeepAliveList () {
      this.keepAliveList = []
    },
    removeKeepAliveList (item: any) {
      const list = deepCopy(this.keepAliveList)
      const index = list.indexOf(item)
      if (index > -1) {
        list.splice(index, 1)
        this.keepAliveList = list
      }
    },
  },
})
