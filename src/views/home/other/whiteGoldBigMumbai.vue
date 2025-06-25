<template>
  <div class="content">
    <NavBar background-color="#fff">
      <template #left>
        <img :src="projectIcon" alt="">
      </template>
      <template #right>
        <div class="content__right">
          <div class="message" @click="onClickRightH">
            <svg-icon name="notification" />
            <Point v-show="!isRead" class="point" />
          </div>
          <svg-icon
            v-if="isAppDownload"
            name="down"
            class="down"
            @click.stop="onDown"
          />
        </div>
      </template>
    </NavBar>

    <LoginTip v-if="isShowLoginTip" />
    <!-- 头部轮播图 -->
    <Swiper />

    <div class="whiteGLing" />
    <!-- 滚动通知栏 -->
    <NoticeBar key="home" />
    <div class="whiteGLing mb" />
    <div class="box1">
      <!-- 游戏菜单 -->
      <GameMenu />
      <GameContainer />
      <!-- 中奖信息 -->
      <LuckyWinners />

      <!-- 今日盈利排行榜 -->
      <DailyProfitRank />
    </div>

    <!-- 长龙-->
    <ChangLong v-if="showChanglong" />
    <!--下载PWA应用-->
    <DownloadPWA v-if="showPWA && isAppDownloadIcon" />
    <Turntable />
    <van-dialog v-model:show="store.prompt" :show-confirm-button="false">
      <div class="promptHeader">{{ $t('prompt') }}</div>
      <div class="promptContent" v-html="promptContent" />
      <div class="promptBtn" @click="closePrompt">{{ $t('confirm') }}</div>
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
import DailyProfitRank from '@/components/Home/WhiteGoldHome/DailyProfitRank/index.vue'
import LuckyWinners from '@/components/Home/WhiteGoldHome/LuckyWinners/index.vue'
import NoticeBar from '@/components/Home/WhiteGoldHome/NoticeBar/index.vue'
import Swiper from '@/components/Home/Swiper/index.vue'
import ChangLong from '@/components/common/ChangLong.vue'
import Turntable from '@/components/common/Turntable.vue'
import DownloadPWA from '@/components/common/DownloadPWA.vue'
import Dialog from '@/components/common/HomeDialog.vue'
import { GlobalStore, useCommonStore } from '@/stores'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useDialog, useHome } from '@/hooks'
import GameMenu from '@/components/Home/WhiteGoldHome/GameMenu/index.vue'
import GameContainer from '@/components/Home/WhiteGoldHome/GameContainer/bigMumbai.vue'
import LoginTip from '@/components/Home/WhiteGoldHome/LoginTip/index.vue'

const { onDown, isAppDownload, isAppDownloadIcon, showChanglong, projectIcon, isRead, getMessagesData, showPWA } = useHome()

const globalState = GlobalStore()
const { t: $t } = useI18n()
const router = useRouter()
const { setLoading } = useCommonStore()
const { closeLaundry, closePrompt, store, promptContent } = useDialog()

function onClickRightH () {
  router.push({
    name: 'Messages',
  })
}

const isShowLoginTip = computed(() => {
  return !globalState.getToken
  // return true
})

setLoading(false)
const onLaundy = () => {
  closeLaundry()
  router.push({
    name: 'SuperJackpot',
  })
}
onMounted(() => {
  // getMessage()
  // 获取通知消息，判断是否已读
  getMessagesData()
  // openAll()
  setLoading(false)
})
</script>
<style lang="scss" scoped>
.content {
  font-family: $font-family;
  gap: 10px;
  padding: 0;
  padding-bottom: 180px;
  background: #f7f8ff !important;
  &__right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    svg {
      position: relative;
      width: 52px;
      height: 52px;
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
      color: var(--main-color);
      font-size: 62px;
      margin-top: -10px;
    }
  }
}
::v-deep(.navbar-fixed) {
  box-shadow: 0px 4px 10px 0px rgba(217, 217, 217, 0.68);
}
.navbar {
  background: #fff;
  &__content {
    &-left {
      img {
        height: 80%;
      }
    }

    &-right {
      svg {
        width: 58px;
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
:deep() .van-dialog {
  width: 622px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  background: #fff;
  padding-bottom: 22px;

  &__content {
    position: relative;
    width: 100%;

    .promptHeader {
      text-align: center;
      height: 88px;
      line-height: 88px;
      color: #ffffff;
      font-weight: 700;
      font-size: 36px;
      position: relative;
      background: var(--main_gradient-color);
    }
    .promptContent {
      width: 660px;
      margin: auto;
      min-height: 700px;
      padding: 30px 20px;
      overflow-y: auto;
      img {
        max-width: 580px;
      }
    }
  }

  .promptBtn {
    margin: 20px auto 20px;
    width: 300px;
    height: 80px;
    border-radius: 80px;
    background: var(--main_gradient-color);
    line-height: 80px;
    text-align: center;
    color: #fff;
  }

  &__footer {
    z-index: 100;
    position: fixed;
    bottom: 30px;
    display: flex;
    flex-grow: 1;
    gap: 20px;
    width: 90%;
  }

  .van-button--default {
    background-color: transparent;
  }
  .van-button__text {
    color: #fff;
    width: 80%;
    height: 70px;
    text-align: center;
    line-height: 70px;
    background: var(--main_gradient-color);
    filter: drop-shadow(0px 4px 0px #896646);
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
.box1 {
  padding: 0 24px;
}
.message_icon {
  width: 52px;
  height: 52px;
  background: url('@icon/goldWHome/notify.png') no-repeat center;
  background-size: contain;
  display: inline-block;
}
.whiteGLing {
  border-bottom: 1px solid #e5e8f5;
  &.mb {
    margin-bottom: 20px;
  }
}
:deep(.noticeBar__container) {
  margin-bottom: 0;
  margin: 0 24px 0 24px;
  width: calc(100% - 48px);
}
</style>
