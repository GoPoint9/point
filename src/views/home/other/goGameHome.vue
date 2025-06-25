<template id="navbar">
  <div class="content-daman content">
    <div class="homeHead">
      <div v-if="!globalStore.getToken" class="noLogin">
        <div class="logo">
          <img :src="projectIcon" alt="">
        </div>
        <div class="register" @click="goOtherPage('register')">Register</div>
        <svg
          width="2"
          height="18"
          viewBox="0 0 2 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Line 1"
            d="M0.543945 1.44983L0.543946 16.5502"
            stroke="#343A43"
            stroke-linecap="round"
          />
        </svg>
        <div class="login" @click="goOtherPage('login')">Log in</div>
      </div>
      <div v-else class="userInfo">
        <div class="userInfo-container">
          <img :src="avatarUrl" :data-img="getIconsPublic('images', 'avatar1')" class="userAvatar">
          <div class="userInfo-detail">
            <div class="name">{{ globalStore.getUserInfo.nickName }}</div>
            <div class="wallet">{{ currency(money) }}</div>
          </div>
        </div>
        <div class="withdraw" @click="goOtherPage('Withdraw')">Withdraw</div>
        <svg
          width="2"
          height="18"
          viewBox="0 0 2 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Line 1"
            d="M0.543945 1.44983L0.543946 16.5502"
            stroke="#343A43"
            stroke-linecap="round"
          />
        </svg>
        <div class="recharge" @click="goOtherPage('Recharge')">Recharge</div>
      </div>
    </div>

    <!--下载PWA应用-->
    <DownloadPWA v-if="showPWA" />
    <!-- 头部轮播图 -->
    <Swiper />
    <!-- 滚动通知栏 -->
    <NoticeDaman />
    <GameScenesDamanNew />
    <!-- 热门、彩票、游戏选项卡 -->
    <GameScenesDamanHome />
    <TermsDamanNew />
    <SettingPanel type="daman" />
    <Turntable />
    <van-dialog
      v-model:show="store.prompt"
      class-name="prompt-dialog"
      :confirm-button-text="$t('confirm')"
      @confirm="closePrompt"
    >
      <div class="promptHeader">{{ $t('prompt') }}</div>
      <div class="promptContent" v-html="promptContent" />
    </van-dialog>
    <Dialog
      v-model:show="store.laundry"
      :show-cancel-btn="false"
      confirm-text="OK"
      :title="$t('congratulations')"
      @confirm="onLaundy"
    >
      <template #content>
        <div class="Laundry-Con">
          <div class="Laundry-Con_tip">{{ $t('getSuper') }}</div>
          <div class="Landty-Con-tips">{{ $t('getRewards') }}</div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import SettingPanel from '@/components/Main/SettingPanel/index.vue'
import Swiper from '@/components/Home/goGame/Swiper.vue'
import DownloadPWA from '@/components/Home/goGame/DownloadPWA.vue'
import Dialog from '@/components/common/HomeDialog.vue'
import NoticeDaman from '@/components/Home/goGame/NoticeBar/index.vue'
import GameScenesDamanNew from '@/components/Home/goGame/GameScenesDamanNew.vue'
import GameScenesDamanHome from '@/components/Home/goGame/GameScenesDamanHome.vue'
import TermsDamanNew from '@/components/Home/goGame/TermsDamanNew.vue'
import { GlobalStore, useCommonStore, useHomeStore, SettingStore, useWalletStore } from '@/stores'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSessionStorage } from '@vueuse/core'
import { useDialog } from '@/hooks'
import Turntable from '@/components/common/Turntable.vue'
import { currency, getIconsPublic } from '@/utils'
const { t: $t } = useI18n()
const router = useRouter()
const globalStore = GlobalStore()
const { closeLaundry, closePrompt, store, promptContent } = useDialog()
const { setLoading } = useCommonStore()
const settingS = SettingStore()
const walletStore = useWalletStore()
const money = computed(() => walletStore.getAmount)
const showPWA = useSessionStorage('show-pwa-download', true)

const avatarUrl = ref(getIconsPublic('main/Avatar', globalStore.getUserInfo.userPhoto))
setLoading(false)
const onLaundy = () => {
  closeLaundry()
  router.push({
    name: 'SuperJackpot',
  })
}

// 是否已读
const isRead = ref(true)

async function getMessagesData () {
  const homeStore = useHomeStore()
  isRead.value = !(globalStore.getUserInfo.unRead > 0)
  homeStore.setReadState(isRead.value)
}

const goOtherPage = (name: any) => {
  router.push({
    name,
  })
  // GetGrandPrizeReward()
}

// 项目图标
const projectIcon = computed(() => settingS.getProjectLogo)
onMounted(() => {
  // 获取通知消息，判断是否已读
  getMessagesData()
  setLoading(false)
})
</script>

<style lang="scss">
#navbar {
  z-index: 1;
}
.content-daman {
  font-family: $font-family;
  gap: 10px;
  padding-bottom: 280px !important;
  z-index: 1;

  h1:before {
    border-radius: 4px;
  }

  &__right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;

    svg {
      position: relative;
    }

    .message {
      position: relative;
    }

    .point {
      position: absolute;
      top: 2px;
      right: 0px;
    }

    .down {
      font-size: 40px;
      margin-top: -10px;
    }
  }
  .homeHead {
    height: 92px;
    border-radius: 16px;
    background: var(--bg_color_L2);
    padding: 0 24px;
    width: 100%;
    margin-bottom: 20px;
    .noLogin {
      height: 100%;
      display: flex;
      align-items: center;
      .logo {
        flex: 1;
        display: flex;
        align-items: center;
        img {
          height: 64px;
          width: auto;
        }
      }
      .register {
        font-size: 26px;
        background: var(--main-color);
        border-radius: 12px;
        font-weight: 500;
        line-height: 54px;
        padding: 0 18px;
        color: #f6f6f6;
      }
      svg {
        height: 30px;
        margin: 0 20px;
      }
      .login {
        color: var(--text_color_L1);
        font-size: 26px;
        font-weight: 500;
      }
    }
    .userInfo {
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;
      &-container {
        display: flex;
        flex: 1;
        .userAvatar {
          width: 68px;
          height: 68px;
          margin-right: 20px;
        }
      }
      &-detail {
        .name {
          background: var(--Text-effects, linear-gradient(180deg, #f5f6ff -2.72%, rgba(245, 246, 255, 0) 219.64%));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: Lato;
          font-size: 28px;
        }
        .wallet {
          color: #858c96;
          font-size: 24px;
          margin-top: 14px;
        }
      }
      .withdraw,
      .recharge {
        font-size: 22px;
        padding-top: 56px;
        color: var(--text_color_L1);
        background-position: top;
        background-repeat: no-repeat;
        background-size: 50px 56px;
      }
      .withdraw {
        background-image: url('@/assets/svg/withdraw.svg');
      }
      .recharge {
        background-image: url('@/assets/svg/recharge.svg');
      }
      svg {
        height: 40px;
        margin: 0 20px;
      }
    }
  }
}

.navbar {
  &__content {
    &-left {
      img {
        height: 80%;
      }
    }

    &-right {
      svg {
        width: 48px;
      }
    }
  }
}

.van-nav-bar {
  background: #f7f8ff;

  .van-nav-bar__content {
    .van-nav-bar__left {
      img {
        height: 100%;
      }
    }

    .van-nav-bar__right {
      svg {
        width: 48px;
      }
    }
  }
}

.customer {
  position: fixed;
  bottom: 180px;
  right: 30px;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  z-index: 99;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

/**首页公告弹窗样式 */
.prompt-dialog {
  width: 622px;
  height: 930px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  background: var(--bg_color_L2);
  padding-inline: 0 !important;

  .van-dialog__content {
    position: relative;
    width: 100%;
  }

  .promptHeader {
    background: var(--main_gradient-color, #3c9cf6);
    width: 100%;
    text-align: center;
    height: 88px;
    line-height: 88px;
    color: #ffffff;
    font-weight: 700;
    font-size: 36px;
  }

  .promptContent {
    height: 700px;
    padding: 30px 20px;
    overflow-y: auto;
    color: #fff;
  }

  .van-dialog__footer {
    z-index: 100;
    position: fixed;
    bottom: 30px;
    display: flex;
    flex-grow: 1;
    gap: 20px;
    width: 90%;
    &:after {
      display: none;
    }
  }
  .van-button {
    background: transparent;
  }
  .van-button__text {
    color: #fff;
    width: 80%;
    height: 70px;
    text-align: center;
    line-height: 70px;
    background: var(--main_gradient-color);
    border-radius: 80px;
    z-index: 100;
    font-weight: 700;
    font-size: 32px;
    font-family: 'Inter';
    font-style: normal;
    letter-spacing: 5px;
  }
}

.Laundry-Con {
  .Laundry-Con_tip {
    font-size: 36px;
    font-weight: 700;
    text-align: center;
  }

  .Landty-Con-tips {
    font-size: 24px;
    font-weight: 400;
    margin-top: 32px;
  }
}

.nav-btn {
  width: 140px;
  height: 50px;
  border-radius: 10px;
  text-align: center;
  line-height: 48px;
  font-family: Inter;
  font-size: 22px;
  font-weight: 400;
  z-index: 1;

  &.login-btn {
    color: #f2f7ff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: Inter;
    font-size: 26px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.39px;
  }

  &.register-btn {
    background: #1d6be1;
    color: #fff;
    display: flex;
    padding: 9px;
    justify-content: center;
    align-items: center;
    color: var(--Red-0, #f6f6f6);
    text-align: center;
    font-family: Inter;
    font-size: 26px;
    font-weight: 500;
    letter-spacing: -0.39px;
  }
}
</style>
