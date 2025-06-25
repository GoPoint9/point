import { defineStore } from 'pinia'
// import { asyncTo } from '@/utils'

import { frontSkinSetting } from '@/NCZ/api'
import { AwaitApiResult } from '@/utils'

// 吃緩存或黑橘版
const DEFAULT_SKIN = localStorage.getItem('skinType') ?? 'layout7'

export const useSkinStore = defineStore({
  id: 'skin',
  state: () => ({
    skinList: [DEFAULT_SKIN],
    skinType: DEFAULT_SKIN,
  }),
  getters: {
    isNczSkin: state => ['layout5', 'layout6', 'layout7', 'layout9'].includes(state.skinType),
    isBdgSkin: state => ['layout9'].includes(state.skinType),
    themeImagePath: state => `~@/assets/themes/${state.skinType}`,
  },
  actions: {
    setSkinList (skinList) {
      this.skinList = skinList
    },
    setSkinType (skinType) {
      document.querySelector('html').classList.remove(this.skinType)

      this.skinType = skinType
      localStorage.setItem('skinType', skinType)

      document.querySelector('html').setAttribute('data-skin', skinType)
      document.querySelector('html').classList.add(skinType)
    },
    async frontSkinSetting () {
      if (localStorage.getItem('skinType')) {
        this.setSkinType(localStorage.getItem('skinType'))
      }

      // const [err, res] = await asyncTo(window._fetch({ Action: 'frontSkinSetting', Requirement: {} }))
      const res = await AwaitApiResult(frontSkinSetting())

      console.warn('res ', res)
      // if (err) {
      //   this.setSkinType(DEFAULT_SKIN)
      //   this.setSkinList([DEFAULT_SKIN])
      //   return
      // }

      if (res.code === 'success') {
        const { skinList } = res.data
        this.setSkinType(skinList[0])
        this.setSkinList(skinList)
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    },
  },
})
