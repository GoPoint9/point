<template>
  <LoadingView :loading="isLoad" type="loading" :is-game="isGame">
    <router-view v-slot="{ Component }" :key="codeKey">
      <keep-alive :max="1">
        <component :is="Component" v-if="route.meta.keepAlive" :key="routeKeyValue" />
      </keep-alive>
      <component :is="Component" v-if="!route.meta.keepAlive" />
    </router-view>
    <!--online custom service-->
    <TabBar v-if="isTabBar" />
  </LoadingView>
  <StartPage v-if="isStart" />
  <AllPageDialog />
</template>

<script setup lang="ts">
import { addMaximumScaleToMetaViewport, checkIsIOS, getBrowserLang, difflanguage, IS_DEV, setHtmlLang } from '@/utils'
import { ref, computed, onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import i18n, { setGlobalLocale } from '@/languages'
import { useI18n } from 'vue-i18n'
import { useUserStore, SettingStore, useCommonStore, GlobalStore } from '@/stores'
import TabBar from '@/components/TabBar/index.vue'
import { useEventBus } from '@/components/common/use'
import { useVisibilityChange } from '@/components/common/use/useVisibilityChange'
import Customer from '@/components/common/Customer.vue'
import StartPage from './StartPage.vue'
import AllPageDialog from '@/components/common/AllPageDialog.vue'
import { changeLange } from '@/utils/selectArr/rootConfig'

import { useDialog } from '@/hooks'
const { openAll } = useDialog()
const eventBus = useEventBus()
const isStart = ref(false)
const isload = ref(false)
const route = useRoute()
const userStore = useUserStore()
const settingS = SettingStore()
const { locale } = useI18n()
const globalStore = GlobalStore()
const isGame = ref(false)
const isTabBar = computed(() => {
  return route.meta.tabBar
})
const VITE_HOME = import.meta.env.VITE_HOME
const isShowCustomer = computed(() => {
  const hidHome = ['electronic', 'blackGoldHome']
  if (hidHome.includes(VITE_HOME)) return false
  const list = [
    '/wallet/Withdraw/C2cDetail',
    '/wallet/RechargeHistory/RechargeUpiDetail',
    '/wallet/Withdraw/Upi',
    '/wallet/Withdraw/AddUpi',
    '/wallet/Withdraw/c2cCancelWithdrawal/index.vue',
    '/wallet/otherPay?type=C2C',
    '/home/game',
  ]
  console.log(!list.includes(route.path))
  return !list.includes(route.path)
})
console.log('router', route.path)
const codeKey = ref(0)
const routeKey = ref(Math.floor(Math.random() * 10000))
const routeKeyValue = computed(() => {
  return (route.name as string) + routeKey.value
})
const changeKeepAliveKey = () => {
  eventBus.on('changeKeepAliveKey', () => {
    routeKey.value = Math.floor(Math.random() * 10000)
  })
}
if (sessionStorage.getItem('isload')) {
  isStart.value = false
} else {
  isload.value = true
  sessionStorage.setItem('isload', isload.value.toString())
  isStart.value = true
}
settingS.getHomeSetting()
// 监听获取到了手机号码参数就赋值
watch(
  () => settingS.getAreacode,
  (val) => {
    if (!val) return
    userStore.setNumberType(val.substring(1))
  }
)
// 监听获取到了手机号码参数就赋值
watch(
  () => settingS.getDL,
  (val) => {
    locale.value = val
    globalStore.updateLanguage(val)
    setGlobalLocale(val)
    changeLange(i18n.global.t)
  }
)
// 启动页遮罩
setTimeout(() => {
  isStart.value = false
}, 2000)
// isLoading监听
const isLoad = ref(false)
const commonStore = useCommonStore()
commonStore.$subscribe((mutation, state) => {
  isLoad.value = state.isLoading
  commonStore.setLoading(isLoad.value)
})
const currentFontFamily = ref('bahnschrift')
const browerlang = getBrowserLang()
const languages = settingS.getLanguage
const userlanguage = difflanguage(browerlang, languages)
const fixLang = async (index?: number) => {
  // 根据语言匹配字体
  // 根据语言动态设置字体类型
  const langFamilys = [
    { title: 'vi', fontStyle: 'bahnschrift' },
    { title: 'else', fontStyle: '\'Roboto\', \'Inter\', sans-serif' },
  ]
  const fontIndex = langFamilys.findIndex((item) => item.title == userlanguage)
  if (fontIndex >= 0) {
    currentFontFamily.value = langFamilys[fontIndex].fontStyle
  } else {
    currentFontFamily.value = langFamilys[langFamilys.length - 1].fontStyle
  }
}

const eventFunc = () => {
  eventBus.on('keyChange', () => {
    console.log(222)
    codeKey.value++
  })
  eventBus.on('changeIsGame', () => {
    isGame.value = !isGame.value
    isLoad.value = !isLoad.value
  })
}

const eventOffs = () => {
  eventBus.off('keyChange')
  eventBus.off('changeKeepAliveKey')
  eventBus.off('changeIsGame')
}
// console.log('66666',settingS.getAreacode)
userStore.setNumberType(settingS.getAreacode.substring(1))
fixLang()
onMounted(() => {
  if (checkIsIOS()) {
    addMaximumScaleToMetaViewport()
  }
  openAll()
  eventOffs()
  eventFunc()
  changeKeepAliveKey()
  if (localStorage.getItem('language')) {
    setHtmlLang(localStorage.getItem('language'))
  }
})

useVisibilityChange()
</script>
<style lang="scss">
$font-family: v-bind(currentFontFamily);

@media screen and (min-width: 800px) {
  html {
    font-size: 2.5rem !important;
  }
}
</style>
