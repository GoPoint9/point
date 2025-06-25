<!--
 * @Author: Seven
 * @Date: 2024-03-19 13:56:38
 * @LastEditTime: 2024-03-26 16:39:46
 * @LastEditors: Seven
 * @Description:
-->
<template>
  <div class="content bluehome">
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
    <NoticeBar key="home" color="blue" />

    <GameMenu ref="gameMenuRef" :all-game-list="allGameList" @click-menu="handleMenuChange" />

    <GamesList v-if="currentGame" id="gameList" :game-data="currentGame" />

    <!-- 中奖信息 -->
    <LuckyWinners />

    <!-- 今日盈利排行榜 -->
    <DailyProfitRank />
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
import DailyProfitRank from '@/components/Home/DailyProfitRank/index.vue'
import LuckyWinners from '@/components/Home/LuckyWinners/index.vue'
import NoticeBar from '@/components/Home/NoticeBar/index.vue'
import Swiper from '@/components/Home/Swiper/index.vue'
import GamesList from '@/components/Home/BlueHome/AllGames/GameList.vue'
import ChangLong from '@/components/common/ChangLong.vue'
import Turntable from '@/components/common/Turntable.vue'
import DownloadPWA from '@/components/common/DownloadPWA.vue'
import Dialog from '@/components/common/HomeDialog.vue'
import { useCommonStore } from '@/stores'
import { deepCopy } from '@/utils'
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import GameMenu from '@/components/Home/BlueHome/GameMenu/index.vue'

import { useDialog, useHome } from '@/hooks'
const { t: $t } = useI18n()
const router = useRouter()
const { setLoading } = useCommonStore()
const { closeLaundry, closePrompt, store, promptContent } = useDialog()
setLoading(true)
const currentMenu = ref('')
const gameMenuRef = ref()
const allGameList = reactive<AllGame[]>([])
const currentGame = ref<AllGame>()

function onClickRightH () {
  router.push({
    name: 'Messages',
  })
}

type AllGame = {
  isAll: boolean
  img: string
  isShow: boolean
  gameList: any[]
  gameType: string
  title: string
}

const {
  onDown,
  isAppDownload,
  isAppDownloadIcon,
  showChanglong,
  projectIcon,
  isRead,
  getMessagesData,
  showPWA,
  getGameType,
  homeState,
  getAllGame,
} = useHome()

const onLaundy = () => {
  closeLaundry()
  router.push({
    name: 'SuperJackpot',
  })
}

const handleMenuChange = (val: any) => {
  const bannerEle = document.getElementById('banner')
  const noticeBar = document.getElementById('noticeBar')
  const bannerHeight = bannerEle?.offsetHeight as number
  const noticeBarHeight = noticeBar?.offsetHeight as number
  scrollToPosition(bannerHeight + noticeBarHeight + 20)
  sessionStorage.setItem('clickMenu', val.type)
  currentGame.value = allGameList.find((item) => item.gameType === val.type)

  const el: any = document.querySelector('#gameList')
  const offsetTop = el?.offsetTop || 0
  sessionStorage.setItem('clickMenu', val.type)
  store.currentGame = val.gameMenu
  window.scrollTo({
    top: offsetTop - 100,
    behavior: 'smooth',
  })
}

function scrollToPosition (position: number) {
  window.scrollTo({
    top: position,
    behavior: 'smooth', // 平滑滚动
  })
}

/**
 * @description: 获取首页游戏内容，并和大类列表进行匹配
 * @return {*}
 */
const getGameList = async () => {
  await getGameTypeList()
  await getAllGame()
  const gamelist = deepCopy(homeState.allGameList) as any
  allGameList.forEach((item) => {
    if (item.gameType === 'bigaward') {
      return
    }
    if (item.gameType === 'popular') {
      item.gameList = [gamelist[item.gameType].platformList, gamelist[item.gameType].clicksTopList]
    } else {
      item.gameList = gamelist[item.gameType]
    }
    if (item.gameList.length < 1) {
      item.isShow = false
    }
  })
  const clickMenu = sessionStorage.getItem('clickMenu') || ''
  if (clickMenu) {
    currentMenu.value = clickMenu
    currentGame.value = allGameList.find((item) => item.gameType === clickMenu)
  } else {
    currentMenu.value = allGameList[0].gameType
    currentGame.value = allGameList[0]
  }
  sessionStorage.setItem('allGameList', JSON.stringify(allGameList))
}

/**
 * @description: 获取首页游戏大类列表
 * @return {*}
 */
const getGameTypeList = async () => {
  await getGameType()
  homeState.gameTypeList.forEach((item) => {
    if (item.categoryCode === 'BigAward') {
      return
    }
    allGameList.push({
      isAll: false,
      img: item.categoryImg,
      isShow: item.state === 1,
      gameList: [],
      gameType: item.categoryCode.toLocaleLowerCase(),
      title: $t('code' + item.typeNameCode),
    })
  })
}

getGameList()
// 获取通知消息，判断是否已读
getMessagesData()
onMounted(() => {
  setLoading(false)
})
</script>

<style lang="scss" scoped>
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
      top: -2px;
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
      color: var(--text_color_black, var(--text_color_L4));
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
    color: var(--text_color_black, var(--text_color_L4));
  }
}

.message_svg {
  color: #4781ff;
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
.bluehome {
  .noticeBar__container {
    margin-top: 20px;
  }
  .swiper_box {
    padding: 0;
  }
}
</style>
