<template>
  <div id="home" class="orange_content">
    <NavBar background-color="var(--main_gradient-color)">
      <template #left>
        <img :src="projectIcon" alt="">
      </template>
      <template #right>
        <div class="content_right">
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

    <!-- 头部轮播图 -->
    <Swiper />

    <!-- 滚动通知栏 -->
    <NoticeBar key="home" color="red" />

    <HomeMenu v-model:current-menu="currentMenu" v-model:current-title="currentTitle" />

    <HomeContainer :current-menu="currentMenu" :current-title="currentTitle" />

    <LuckyWinners />

    <DailyProfitRank />
    <!-- 长龙-->
    <ChangLong v-if="showChanglong" />
    <!--下载PWA应用-->
    <DownloadPWA v-if="isAppDownloadIcon && showPWA" />
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
import NoticeBar from '@/components/Home/NoticeBar/index.vue'
import Swiper from '@/components/Home/Swiper/index.vue'
import ChangLong from '@/components/common/ChangLong.vue'
import HomeMenu from '@/components/Home/OrangeHome/HomeMenu/index.vue'
import HomeContainer from '@/components/Home/OrangeHome/HomeContainer/index.vue'
import Turntable from '@/components/common/Turntable.vue'
import DownloadPWA from '@/components/common/DownloadPWA.vue'
import Dialog from '@/components/common/HomeDialog.vue'
import LuckyWinners from '@/components/Home/LuckyWinners/index.vue'
import DailyProfitRank from '@/components/Home/DailyProfitRank/index.vue'
import { useCommonStore } from '@/stores'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useDialog, useHome } from '@/hooks'

const { t: $t } = useI18n()
const router = useRouter()
const { setLoading } = useCommonStore()
const { onDown, isAppDownload, isAppDownloadIcon, showChanglong, projectIcon, isRead, getMessagesData, showPWA } = useHome()
const { closeLaundry, closePrompt, store, promptContent } = useDialog()
const currentMenu = ref(sessionStorage.getItem('currentMenu') || '')
const currentTitle = ref('')
function onClickRightH () {
  router.push({
    name: 'Messages',
  })
}
setLoading(false)
const onLaundy = () => {
  closeLaundry()
  router.push({
    name: 'SuperJackpot',
  })
}
onMounted(() => {
  getMessagesData()
  setLoading(false)
})
</script>

<style lang="scss" scoped>
.orange_content {
  width: 100%;
  padding-bottom: 170px;
  .content_right {
    display: flex;
    flex-direction: row;
    align-items: center;

    .message {
      position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;

      svg {
        width: 56px;
        height: 56px;
        color: #fff;
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
      width: 48px;
      height: 48px;
      margin-left: 14px;
      color: var(--text_white);
    }
  }

  .navbar {
    &__content {
      &-left {
        img {
          height: 80%;
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
    }

    .van-nav-bar__content {
      .van-nav-bar__left {
        img {
          height: 100%;
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
    .Laundry-Con {
      .Laundry-Con_tip {
        font-size: 36px;
        font-weight: 700;
        color: #151515;
      }

      .Landty-Con-tips {
        font-size: 24px;
        font-weight: 400;
        color: #666666;
        margin-top: 32px;
      }
    }
  }

  /**首页公告弹窗样式 */
  :deep() .van-dialog {
    width: 622px;
    height: 930px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;

    &__content {
      position: relative;
      width: 100%;

      .promptHeader {
        background: var(--main_gradient-color);
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
  }

  .dailyProfitRank,
  .luckyWinners__container {
    padding: 0 30px;
  }
  :deep(.swiper_box) {
    padding: 0;
    img {
      border-radius: 0;
    }
  }
  :deep(.navbar-fixed) {
    background: var(--main_gradient-color);
    color: var(--text_white);
  }
}
</style>
