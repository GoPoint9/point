<template>
  <div class="content_home">
    <NavBar class="main">
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
    <NoticeBar key="home" />

    <HomeMenu v-model:current-menu="currentMenu" v-model:current-title="currentTitle" @change-menu="changeMenu" />

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
import HomeMenu from '@/components/Home/Red92Home/HomeMenu/index.vue'
import HomeContainer from '@/components/Home/Red92Home/HomeContainer/index.vue'
import Turntable from '@/components/common/Turntable.vue'
import DownloadPWA from '@/components/common/DownloadPWA.vue'
import Dialog from '@/components/common/HomeDialog.vue'
import LuckyWinners from '@/components/Home/LuckyWinners/index.vue'
import DailyProfitRank from '@/components/Home/DailyProfitRank/index.vue'
import { getHomeData } from '@/api'
import { GlobalStore, useCommonStore, useHomeStore, SettingStore } from '@/stores'
import { AwaitApiResult, partyUrl } from '@/utils'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSessionStorage } from '@vueuse/core'
import { useDialog } from '@/hooks'
const { t: $t } = useI18n()
const router = useRouter()
const { setLoading } = useCommonStore()
const settingS = SettingStore()

// 下载

setLoading(false)
const { closeLaundry, closePrompt, store, promptContent } = useDialog()
const showChanglong = computed(() => settingS.getIsShowLotteryDragon)
const currentMenu = ref(sessionStorage.getItem('currentMenu') || '')
const currentTitle = ref('')
const showPWA = useSessionStorage('show-pwa-download', true)
function onClickRightH () {
  router.push({
    name: 'Messages',
  })
}

// 下载
const isAppDownload = computed(() => settingS.getIsCanAppDownload) // 是否开启下载开关
const isAppDownloadIcon = computed(() => settingS.getIsShowAppDownloadIcon) // 是否开启下载开关
async function onDown () {
  const res = await AwaitApiResult(getHomeData())
  if (res) {
    const ua = navigator.userAgent.toLowerCase()
    let url = ''
    if (ua.indexOf('windows') != -1 || ua.indexOf('android') != -1) {
      url = res.data.androidUrl
    } else if (ua.indexOf('iphone') != -1 || ua.indexOf('mac') != -1 || ua.indexOf('ipad') != -1) {
      url = res.data.iosUrl
    } else {
      url = res.data.androidUrl
    }
    partyUrl(url)
    // window.open(url, '_blank')
  }
}
const onLaundy = () => {
  closeLaundry()
  router.push({
    name: 'SuperJackpot',
  })
}

const globalStore = GlobalStore()
// 是否已读
const isRead = ref(true)
// const gameListRef = ref()

async function getMessagesData () {
  const homeStore = useHomeStore()
  isRead.value = !(globalStore.getUserInfo.unRead > 0)
  homeStore.setReadState(isRead.value)
}

const changeMenu = (key: string) => {
  // console.log('key', key)
}

// 项目图标
const projectIcon = computed(() => {
  return settingS.getProjectLogo
})

onMounted(() => {
  // getMessage()
  // 获取通知消息，判断是否已读
  getMessagesData()
  // openAll()
  setLoading(false)
})
</script>

<style lang="scss" scoped>
.content_home {
  font-family: $font-family;
  padding-bottom: 120px;

  .content__right {
    display: flex;
    flex-direction: row;
    align-items: center;

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
      width: 48px;
      height: 48px;
      margin-left: 24px;
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
</style>
