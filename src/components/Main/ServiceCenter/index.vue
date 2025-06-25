<template>
  <div class="serviceCenter-wrap">
    <div class="serviceCenter__container">
      <h1>{{ $t('serviceCenter') }}</h1>
      <div class="serviceCenter__container-items">
        <div
          v-for="item in serviceCenterItems"
          :key="item.title"
          class="serviceCenter__container-items__item"
          @click="onItemClick(item.link)"
        >
          <svg-icon :name="`${item.name}`" />
          <!-- <img v-lazy="getIcons('main', `${item.icon}`)" /> -->
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>

    <div class="serviceCenter-wrap-header">
      <button @click="CheckLogOut">
        <svg-icon name="logout" />
        <!-- <img v-lazy="getIcons('home', 'logout')" /> -->
        {{ $t('logout') }}
      </button>
    </div>

    <!--退出登录弹窗-->
    <Dialog
      v-model:show="LogoutDialogShow"
      :confirm-text="t('confirm')"
      :cancel-text="t('cancel')"
      :show-cancel-btn="true"
      :title="$t('tipLogout1')"
      @confirm="onLogout"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { GlobalStore, useWalletStore, useUserStore } from '@/stores'
import { computed, ref } from 'vue'
import { LoginOff } from '@/api'
import { showFailToast } from 'vant'
import Dialog from '@/components/common/Dialog.vue'
import { useI18n } from 'vue-i18n'
import { useServer } from '@/hooks/useServe.hook'

const { t } = useI18n()
const { getSelfCustomerServiceLink, isCenterServer } = useServer({ ServerType: 2 })
const router = useRouter()
const globalStore = GlobalStore()
const walletStore = useWalletStore()
const userStore = useUserStore()
const serviceCenterItems = computed(() => {
  return [
    {
      name: 'settingCenter',
      title: t('setting'),
      link: 'SettingCenter',
    },
    {
      name: 'feedback',
      title: t('feedback'),
      link: 'Feedback',
    },
    {
      name: 'notificationCenter',
      title: t('noti'),
      link: 'Notification',
    },
    {
      name: isCenterServer.value ? 'serverTicket' : 'server',
      title: isCenterServer.value ? t('serverTicket') : t('wholeTimeService'),
      link: 'CustomerService',
    },
    {
      name: 'guide',
      title: t('guide'),
      link: 'Guide',
    },
    {
      name: 'about',
      title: t('about'),
      link: 'About',
    },
  ]
})

const LogoutDialogShow = ref(false)

function onItemClick (link: string) {
  if (link == 'CustomerService') {
    return getSelfCustomerServiceLink()
  }
  router.push({
    name: link,
  })
}

function CheckLogOut () {
  LogoutDialogShow.value = true
}

// 退出登录
function onLogout () {
  LoginOff({})
    .then(async (res) => {
      globalStore.token = ''
      LogoutDialogShow.value = false
      walletStore.setTimestampLast(0)
      userStore.userForm.vCode = ''
      userStore.loginout()
    })
    .catch((err) => {
      showFailToast({
        message: err.msg,
        wordBreak: 'break-word',
      })
    })
    .finally(() => {
      localStorage.setItem('isToLogin', '1')
      GlobalStore().setToken('')
      router.push({ name: 'login' })
    })
}
</script>

<style lang="scss" scoped>
.serviceCenter-wrap {
  &-header {
    margin: 80px 0 20px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding-block: 10px;
      color: var(--main-color);
      background: var(--bg_color_L1);
      border: 1px solid var(--main-color);
      border-radius: 50px;
      font-size: 30px;
      gap: 24px;

      svg {
        width: 48px;
        height: 48px;
      }
    }
  }
}

.serviceCenter__container {
  padding: 40px 24px;
  border-radius: 20px;
  background: var(--darkBg, var(--bg_color_L2));
  height: 400px;
  box-shadow: var(--BoxShadowColor-9);

  h1 {
    margin-bottom: 44px;
    color: var(--darkTextW, var(--text_color_L1));
    font-size: 30px;
  }

  &-items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    gap: 24px;
    color: var(--text_color_L2);

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      font-size: 24px;

      svg {
        width: 60px;
        height: 60px;
      }
      span {
        text-align: center;
      }
    }
  }
}

:deep(.cancelOrderDialog) {
  padding: 40px 20px;
  border-radius: 20px;

  .van-dialog__content {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      margin-top: 26px;
      font-size: 36px;
      font-weight: bold;
    }
  }

  .dialog-btnWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    margin-top: 3rem;
    padding: 0 1rem;

    button {
      &:last-of-type {
        width: 326px;
        color: var(--textW);
        background: var(--main_gradient-color);
      }
    }
  }

  &.cancelOrderDialogSuccess {
    .dialog-btnWrapper {
      justify-content: center;
    }
  }
}
</style>
