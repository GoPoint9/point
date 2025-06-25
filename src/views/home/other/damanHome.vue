<template>
  <div class="content-daman content">
    <NavBar>
      <template #left>
        <img :src="projectIcon" alt="">
      </template>
      <template #right>
        <div v-if="!globalStore.getToken" class="content-daman__right">
          <div
            class="nav-btn login-btn"
            @click="
              router.push({
                name: 'login'
              })
            "
          >
            {{ $t('login') }}
          </div>
          <div
            class="nav-btn register-btn"
            @click="
              router.push({
                name: 'register'
              })
            "
          >
            {{ $t('register') }}
          </div>
        </div>
        <div v-else class="content-daman__right">
          <div class="message" @click="onClickRightH">
            <svg-icon name="notification" />
            <Point v-show="!isRead" class="point" />
          </div>
        </div>
      </template>
    </NavBar>
    <!-- 头部轮播图 -->
    <Swiper />

    <!-- 滚动通知栏 -->
    <NoticeDaman />
    <!-- 热门、彩票、游戏选项卡 -->
    <GameScenesDaman />
    <!-- 中奖信息 -->
    <LuckyWinners />

    <!-- 今日盈利排行榜 -->
    <DailyProfitRank />
    <TermsDaman />
    <SettingPanel type="daman" />
    <!--下载PWA应用-->
    <DownloadPWA v-if="showPWA && isAppDownloadIcon" />
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
import Point from '@/components/common/Point.vue'
import DailyProfitRank from '@/components/Home/DailyProfitRank/index.vue'
import LuckyWinners from '@/components/Home/LuckyWinners/index.vue'
import SettingPanel from '@/components/Home/damanHome/SettingPanel/index.vue'
import TermsDaman from '@/components/Home/damanHome/TermsDaman/index.vue'
import GameScenesDaman from '@/components/Home/damanHome/GameScenesDaman/index.vue'
import Swiper from '@/components/Home/Swiper/index.vue'
import DownloadPWA from '@/components/common/DownloadPWA.vue'
import Turntable from '@/components/common/Turntable.vue'
import NoticeDaman from '@/components/Home/NoticeBar/index.vue'
import Dialog from '@/components/common/HomeDialog.vue'
import { GlobalStore, useCommonStore, useHomeStore, SettingStore } from '@/stores'
import { useDialog } from '@/hooks'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSessionStorage } from '@vueuse/core'
const { closeLaundry, closePrompt, store, promptContent } = useDialog()
const { t: $t } = useI18n()
const router = useRouter()
const globalStore = GlobalStore()
const { setLoading } = useCommonStore()
const settingS = SettingStore()
const showPWA = useSessionStorage('show-pwa-download', true)

function onClickRightH () {
  router.push({
    name: 'Messages',
  })
}

// 下载
const isAppDownloadIcon = computed(() => settingS.getIsShowAppDownloadIcon)

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
// 项目图标
const projectIcon = computed(() => settingS.getProjectLogo)
onMounted(() => {
  // 获取通知消息，判断是否已读
  getMessagesData()
  setLoading(false)
})
</script>

<style lang="scss">
.content-daman {
  font-family: $font-family;
  gap: 10px;
  padding-bottom: 200px !important;

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
      svg {
        width: 56px;
        height: 56px;
        color: var(--main-color);
      }
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
  .swiper_box {
    padding: 0;
    margin-bottom: 20px;
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
  box-shadow: none;
  .van-dialog__content {
    position: relative;
    width: 100%;
  }

  .promptHeader {
    background: var(--light-main_gradient-color, var(--bg_color_L2));
    text-align: center;
    height: 88px;
    width: 622px;
    line-height: 88px;
    color: #ffffff;
    font-weight: 700;
    font-size: 36px;
    box-sizing: border-box;
  }

  .promptContent {
    height: 700px;
    width: 622px;
    padding: 30px 20px;
    overflow-y: auto;
    img {
      max-width: 582px !important;
    }
  }

  .van-dialog__footer {
    z-index: 100;
    position: fixed;
    bottom: 30px;
    display: flex;
    flex-grow: 1;
    gap: 20px;
    width: 90%;
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
    color: #151515;
    text-align: center;
  }

  .Landty-Con-tips {
    font-size: 24px;
    font-weight: 400;
    color: #666666;
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
  border: 1px solid var(--main-color);

  &.login-btn {
    font-size: 22px;
    color: var(--main-color);
    font-weight: 400;
  }

  &.register-btn {
    background: var(--main_gradient-color);
    color: #fff;
  }
}
</style>
