<template>
  <div class="login__C">
    <NavBar :left-arrow="true" @click-left="onClickLeft">
      <template #right>
        <LangPop />
      </template>
    </NavBar>
    <loginTypeNav :active-login="activeLogin" @active-login="changeActive" />
    <div class="login__C-form">
      <div ref="formWrapperRef" class="login__C-form__wrapper">
        <SignIn ref="signIn" :login-type="activeLogin" />
      </div>
      <div v-if="isRegisterState" class="login__C-heading__subTitle">
        <span>{{ t('noAccount') }}</span>
        <span @click="handleRegister">{{ t('registerNow') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LangPop from '@/components/Login/LangPopup.vue'
import SignIn from '@/components/Login/SignInBra.vue'
import loginTypeNav from '@/components/common/loginTypeNav.vue'
import { useUserStore } from '@/stores'
import { onMounted, ref, computed } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { useDialog } from '@/hooks'
import i18n from '@/languages'
const { t } = i18n.global
const router = useRouter()
const userStore = useUserStore()
const { openAll } = useDialog()
const activeLogin = ref('mobile')
const signIn = ref()
const isRegisterState = computed(() => userStore.isOpenRegisterEmailState || userStore.isOpenRegisterSMSState)
function onClickLeft () {
  router.replace('/')
}
const handleRegister = () => {
  router.replace('/register')
}
const changeActive = (val: any) => {
  activeLogin.value = val
  userStore.userForm.password = ''
  userStore.remember(true)
}

userStore.getRegisterState()
onBeforeRouteLeave((to, from, next) => {
  next()
  if (to.name === 'home') {
    openAll()
  }
})
onMounted(() => {
  userStore.remember(true)
  userStore.getIp()
})
</script>

<style lang="scss" scoped>
.login__C {
  height: 100vh;
  padding-inline: 40px;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  background-image: url('@/assets/icons/login/dl_bg.png');
  background-size: 690px 546px;
  background-repeat: no-repeat;
  background-position: center 940px;

  &::-webkit-scrollbar {
    width: 0;
  }
  :deep(.navbar-fixed) {
    background: transparent;
  }
  .van-nav-bar {
    background-color: #f7f8ff;

    .leftArrow {
      width: 34px;
      height: auto;
    }
  }
  &-heading {
    padding: 0 40px;
    min-height: 200px;
    &__title {
      font-size: 32px;
      font-weight: 700;
      color: #ffffff;
      padding-top: 20px;
    }

    &__subTitle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 24px;
      margin-top: 24px;

      span {
        &:nth-of-type(1) {
          color: #7e7e7e;
        }

        &:nth-of-type(2) {
          color: #f00;
          font-weight: 700;
          cursor: pointer;
        }
      }
    }
  }

  &-form {
    position: relative;
    width: 100%;
    margin: auto;
    margin-top: 40px;
    overflow: hidden;
    border-radius: 12px;
    padding: 40px 28px;
    background: var(--bg_color_L3);

    &__wrapper {
      position: relative;
      display: flex;
      gap: 50px;
      width: 100%;
      height: 100%;
      box-sizing: content-box;

      & > div {
        flex-shrink: 0;
        width: 100%;
        backface-visibility: hidden;
      }
    }
    :deep(.phoneInput__container) {
      margin-bottom: 30px;
    }
    :deep(.emailinput__container) {
      margin-bottom: 30px;
    }
    :deep() {
      .emailinput__container-label,
      .emailinput__container-label,
      .phoneInput__container-label,
      .passwordInput__container-label {
        svg {
          display: none;
        }
      }
    }
  }
}
</style>
