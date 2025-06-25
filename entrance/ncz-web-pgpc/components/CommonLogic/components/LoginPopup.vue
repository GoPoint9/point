<script lang="ts" setup>
import { useUserStore } from '@/stores'
import CommonLogo from '@entrance/ncz-web-pgpc/components/CommonLogo.vue'
// vee-v4
// import LoginForm from '@entrance/ncz-web-pgpc/components/CommonLogic/components/LoginForm2.vue'
import LoginForm from '@entrance/ncz-web-pgpc/components/CommonLogic/components/LoginForm.vue'

// vee-v2
// import LoginForm from '@entrance/ncz-web-pgpc/components/CommonLogic/components/LoginForm1.vue'

const $modal = inject('$modal')

// 登录和注册页
// const router = useRouter()
const userStore = useUserStore()
// 获取是否开启短信相关功能
userStore.getRegisterState()
const tab = ref('mobile')
userStore.userForm.logintype = tab.value
// function onClickLeft() {
//   router.replace('/')
// }
const handle = (item: string) => {
  tab.value = item
  userStore.userForm.logintype = item
  userStore.userForm.password = ''
  userStore.remember(true)
}
// const { openAll } = useDialog()
// onBeforeRouteLeave((to, from, next) => {
//   next()
//   if (to.name === 'home') {
//     openAll()
//   }
// })
onMounted(() => {
  userStore.remember(true)
  // userStore.getIp() ?? api 404
})

/**
<div class="login_container-tab">
  <div class="tab" :class="[tab == 'mobile' ? 'active' : '']" @click="handle('mobile')">
    <svg-icon name="phone" />
    <div>
      {{ $t('phoneN') }}
    </div>
  </div>
  <div class="tab" :class="[tab == 'email' ? 'active' : '']" @click="handle('email')">
    <div>
      <svg-icon name="email" />
      <svg-icon v-show="userStore.isOpenExternalAccount" name="user" />
    </div>
    <div>
      {{ userStore.isOpenExternalAccount ? $t('otherlogin') : $t('emaillogin') }}
    </div>
  </div>
</div>
 */

const loginOption = ref([
  // { type: 'username', label: 'username_login' },
  // { type: 'phone', label: 'phone_login' }
  // { type: 'email', label: userStore.isOpenExternalAccount ? 'otherlogin' : 'emaillogin' },
  { type: 'mobile', label: 'phoneN' },
  { type: 'email', label: 'emaillogin' },
  // { type: 'sms', label: 'phoneN' }
])
const loginType = ref(unref(loginOption)[0].type)

const setLoginType = type => {
  loginType.value = type
}

const goRegister = () => {
  $modal.hide('loginPopupModal')
  $modal.show('registerModal')
}

// const showVerCodeLogin = computed(() => store.state?.Login?.showVerCodeLogin)
// const banners = computed(() => {
//   const bannerGroup = store.state.Public.banners?.find(banner => banner.groupName === 'w_login')
//   return bannerGroup || {}
// })
</script>

<template>
  <div class="form-popup-container">
    <!-- <img class="form-popup-banner" :src="require('path/to/banner')" alt="" /> -->

    <div class="form-popup-bg">
      <div class="form-title">
        <CommonLogo class="form-logo" />
      </div>
      <!-- <div v-if="showVerCodeLogin" class="method-select"> -->
      <div class="method-select">
        <div
          v-for="option in loginOption"
          :key="option.type"
          :class="['method-item', { active: loginType === option.type }]"
          @click="setLoginType(option.type)"
        >
          {{ $t(option.label) }}
        </div>
      </div>
      <div class="form-type">
        <div class="form-type-item active">{{ $t('hd_login_button') }}</div>
        <div class="form-type-item" @click="goRegister">
          {{ $t('hd_sign_button') }}
        </div>
      </div>

      <LoginForm :login-type="loginType" />

      <div class="form-tip">
        <span>{{ $t('no_account') }}</span>
        <a @click="goRegister">{{ $t('in_register_now') }}</a>
      </div>
    </div>
  </div>
</template>
