<template>
  <div id="home" class="red-home content">
    <NavBar class="white">
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

    <!-- 头部轮播图 -->
    <Swiper />

    <!-- 滚动通知栏 -->
    <NoticeBar key="home" color="red" />

    <!-- 热门、彩票、游戏选项卡 -->
    <GameList ref="gameListRef" />

    <!-- 中奖信息 -->
    <LuckyWinners />

    <!-- 今日盈利排行榜 -->
    <DailyProfitRank />
    <!-- 长龙-->
    <ChangLong v-if="showChanglong" />
    <!--下载PWA应用-->
    <DownloadPWA v-if="showPWA && isAppDownloadIcon" />
    <Turntable />
    <van-dialog v-model:show="store.prompt" :confirm-button-text="$t('confirm')" @confirm="closePrompt">
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
import GameList from '@/components/Home/RedHome/GameList/index.vue'
import LuckyWinners from '@/components/Home/LuckyWinners/index.vue'
import NoticeBar from '@/components/Home/NoticeBar/index.vue'
import Swiper from '@/components/Home/Swiper/index.vue'
import ChangLong from '@/components/common/ChangLong.vue'
import Turntable from '@/components/common/Turntable.vue'
import DownloadPWA from '@/components/common/DownloadPWA.vue'
import Dialog from '@/components/common/HomeDialog.vue'
import { SettingStore, useCommonStore } from '@/stores'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useDialog, useHome } from '@/hooks'

const { t: $t } = useI18n()
const router = useRouter()
const { setLoading } = useCommonStore()
const settingS = SettingStore()
const { onDown, isAppDownloadIcon, showChanglong, projectIcon, isRead, getMessagesData, showPWA } = useHome()

const { closeLaundry, closePrompt, store, promptContent } = useDialog()
function onClickRightH () {
  router.push({
    name: 'Messages',
  })
}

const isAppDownload = computed(() => settingS.getIsCanAppDownload) // 是否开启下载开关
setLoading(false)
const onLaundy = () => {
  closeLaundry()
  router.push({
    name: 'SuperJackpot',
  })
}
const gameListRef = ref()

onMounted(() => {
  // getMessage()
  // 获取通知消息，判断是否已读
  getMessagesData()
  setLoading(false)
})
</script>

<style lang="scss" scoped>
.red-home {
  :deep(.swiper_box) {
    padding: 0;
    margin-bottom: 20px;
  }
}
.content {
  font-family: $font-family;
  gap: 10px;
  padding-bottom: 280px;

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
      color: var(--main-color);
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
:deep() .van-dialog {
  width: 622px;
  height: 930px;
  border-radius: 15px;
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

  &__footer {
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
</style>
