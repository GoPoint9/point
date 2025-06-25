<script setup lang="ts">
import DropMenu from './DropMenu.vue'
import MemberInfo from './MemberInfo.vue'

import { useHome } from '@/hooks'

const { setCurrentGameType } = useHome({ changeTitle: true })

const $modal = inject('$modal')
const globalStore = GlobalStore()
const router = useRouter()

const headerMenu = computed(() => [
  { name: 'local_header_games', path: '/' },
  { name: 'local_header_promotions', path: '/promotions' },
  // ...(globalStore.isLogin ? [{ name: 'rewards', path: '', page: 'rewardCenter' }] : []),
  { name: 'local_share', path: '', page: 'referral' },
])
const path = computed(() => router.currentRoute.value.path)

// TODO:
// 是否為試玩模式
const isTrial = ref(false)

const checkLogin = () => {
  return globalStore.isLogin
    ? !isTrial.value || (
        window.cover.init({
          html: m('in_need_true_account'),
          icon: 'warning',
          btn: { confirm: m('in_increase_submit') },
        }),
        false
      )
    : (showLoginPopupModal(), false)
}

const handleMenuClick = item => {
  if (item.path) {
    setCurrentGameType('')
    router.push(item.path)
    return
  }

  if (checkLogin()) {
    globalStore.setMcPage(item)
    globalStore.setMcShow(true)
  }
}

const showLoginPopupModal = () => {
  $modal.show('loginPopupModal')
}

// TODO:
const goRegister = () => {
  // store.dispatch('showModal', 'registerModal')
}

const activeIndex = ref(0)
const showDropMenu = ref(false)
const showMenu = index => {
  activeIndex.value = index
  showDropMenu.value = true
}
const hideMenu = () => {
  showDropMenu.value = false
}

// TODO:
const getService = () => {
  // store.dispatch('getService')
}

onMounted(() => {
  // if (!["/pvp", "/fish", "/rng"].includes(path.value)) {
  //   store.dispatch("getGameVendor", { merchantCode: "merchantCode" })
  // }
})
</script>

<template>
  <div>
    <div class="header-container">
      <div class="header-content page-center">
        <div class="header-left">
          <div class="header-menu-list">
            <div
              v-for="(i, index) in headerMenu"
              :key="index"
              class="header-menu-item"
              :class="{ on: i.path === path }"
              @click="handleMenuClick(i)"
            >
              {{ $t(`${i.name}`) }}
            </div>
          </div>
        </div>
        <div class="header-right">
          <div class="right-content">
            <MemberInfo v-if="globalStore.isLogin" />
            <div v-else class="login-register">
              <span class="btn-login" @click="showLoginPopupModal">{{ $t('hd_login_button') }}</span>
              <span class="btn-register" @click="goRegister">{{ $t('hd_sign_button') }}</span>
            </div>
            <div class="notice" @click="$modal.show('noticeModal')">
              <svg-icon name="notice" />
            </div>
            <div class="service" @click="getService">
              <svg-icon name="service" />
            </div>
          </div>
        </div>
      </div>
      <DropMenu
        :show="showDropMenu"
        :active-index="activeIndex"
        @show-menu="showMenu"
        @hide-menu="hideMenu"
      />
    </div>
    <div class="header-holder" />
  </div>
</template>

<style lang="scss" scoped>

</style>
