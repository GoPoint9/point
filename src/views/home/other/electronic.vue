<template>
  <div id="home">
    <NavBar>
      <template #left>
        <img style="height: 40px" :src="projectIcon" alt="">
      </template>
      <template #right>
        <div class="content__right">
          <svg-icon
            v-if="isAppDownload"
            name="down"
            class="home_down"
            @click.stop="onDown"
          />
          <!-- <div v-if="isAppDownload" class="homeIcon down" @click="onDown"></div> -->
          <svg-icon name="server" @click="goToCustomer" />
        </div>
      </template>
    </NavBar>

    <!-- 未登录提示 -->
    <div class="content">
      <!-- 头部轮播图 -->
      <Swiper />

      <!-- 滚动通知栏 -->
      <NoticeBar key="home" :is-home="true" />

      <!-- 游戏栏 -->
      <Tabs
        ref="tabsRef"
        v-model:current-menu="currentMenu"
        :tab-list="tabs as any"
        @tab-change="tabChange"
      />

      <Slot v-show="tabs[currentMenu].type === 'slot'" key="slots" />
      <Video v-show="tabs[currentMenu].type === 'video'" key="video" />
      <div id="game_content" />
      <!-- <GameItem type="2" :game-type="3" :game-item="test" /> -->
      <div v-show="!['slot', 'video'].includes(tabs[currentMenu].type)">
        <div v-for="item in allGameList" :key="item.gameType + currentMenu">
          <AloneGame
            v-show="getIsShow(item)"
            :key="item.gameType"
            :title="item.showTitle"
            :game-type="item.gameType"
            :game-list="item.gameList"
            :is-all="getIsAll(item.gameType)"
            :is-show-more="currentMenu !== 0"
            :current-menu-type="currentMenu"
            :is-show-btn="showBtn(item)"
            @go-all="handleGoAll"
          />
        </div>
      </div>

      <!-- 热门、彩票、游戏选项卡 -->

      <!-- 中奖信息 -->
      <Winning />

      <!-- 今日盈利排行榜 -->
      <Profit />

      <!-- 说明 -->
      <Instructions />

      <!-- 长龙-->
      <!-- <ChangLong /> -->
      <!--下载PWA应用-->
      <DownloadPWA v-if="showPWA && isAppDownloadIcon" />
      <Turntable />
      <!--			<van-popup v-model:show="store.prompt" round :confirm-button-text="$t('confirm')">-->
      <!--				<div class="TimeLeft__C-PreSale">-->
      <!--					<div class="TimeLeft__C-PreSale-head">{{ $t('prompt') }}</div>-->
      <!--					<div class="TimeLeft__C-PreSale-body">-->
      <!--						<div v-html="promptContent"></div>-->
      <!--					</div>-->
      <!--					<div class="TimeLeft__C-PreSale-foot">-->
      <!--						<div class="TimeLeft__C-PreSale-foot-btn" @click="closePrompt()">{{ $t('winTrxClose') }}</div>-->
      <!--					</div>-->
      <!--				</div>-->
      <!--			</van-popup>-->
      <van-dialog v-model:show="store.prompt" class="prompt-dialog" :show-confirm-button="false">
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
            <div class="Laundry-Con_tips">{{ $t('getRewards') }}</div>
          </div>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import NoticeBar from '@/components/Home/NoticeBar/index.vue'
import Swiper from '@/components/Home/Swiper/index.vue'
import Dialog from '@/components/common/HomeDialog.vue'
import DownloadPWA from '@/components/common/DownloadPWA.vue'
import Turntable from '@/components/common/Turntable.vue'
import { getSiteMessageList } from '@/api'
import type { MessageDataList } from '@/types/api'
import { AwaitApiResult, deepCopy } from '@/utils'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Tabs from '@/components/Home/Electronic/Tabs/index.vue'
import AloneGame from '@/components/Home/Electronic/AloneGame/index.vue'
import Winning from '@/components/Home/Electronic/Winning/index.vue'
import Profit from '@/components/Home/Electronic/Profit/index.vue'
import { useI18n } from 'vue-i18n'
import Instructions from '@/components/Home/Electronic/Instructions/index.vue'
import { useDialog, useHome } from '@/hooks'
import Slot from '@/components/Home/Electronic/Slot/index.vue'
import Video from '@/components/Home/Electronic/Video/index.vue'
const { onDown, isAppDownload, isAppDownloadIcon, getMessagesData, showPWA, homeState, getAllGame, getGameType, projectIcon } =
  useHome()
const { t } = useI18n()
const { closeLaundry, closePrompt, store, promptContent } = useDialog()
type AllGame = {
  isAll: boolean
  img: string
  isShow: boolean
  gameList: any[]
  gameType: string
  title: string
  showTitle: string
}[]

const router = useRouter()
const sitemsg = ref<MessageDataList[]>([])
const tabsRef = ref()
const allGameList = reactive<AllGame>([])
const currentMenu = ref(0)

const showBtn = (item: any) => {
  return currentMenu.value === 0 && item.gameType !== 'slot' && item.gameType !== 'bigaward'
}

const getIsAll = (type: string) => {
  if (type === 'popular' && currentMenu.value === 0) {
    return true
  } else if (type === 'slot' && currentMenu.value === 0) {
    return true
  }
  if (currentMenu.value === 0) {
    return false
  }
  return true
}

const onLaundy = () => {
  closeLaundry()
  router.push({
    name: 'SuperJackpot',
  })
}
const currentGame = computed(() => {
  const index = allGameList.findIndex((item) => item.gameType === tabs[currentMenu.value].type)
  return index < 0 ? -1 : index
})

const getIsShow = (item: { gameType: string; gameList: string | any[]; isShow: any }) => {
  if (item.gameType === 'bigaward' && currentGame.value === -1) {
    return item.isShow
  }
  return (currentMenu.value === 0 || allGameList[currentGame.value]?.gameType === item.gameType) && item.gameList.length > 0
}
const tabChange = (val: any) => {
  const { item } = val
  sessionStorage.setItem('currentMenu', item.type)
}

function goToCustomer () {
  router.push({ name: 'CustomerService' })
}
/**
 * @description: 获取游戏数据
 * @return {*}
 */
const getGameList = async () => {
  await getGameTypeList()
  const activeMenu = sessionStorage.getItem('currentMenu')
  currentMenu.value = activeMenu ? tabs.findIndex((item) => item.type === activeMenu) : 0
  await getAllGame()
  const gamelist: any = deepCopy(homeState.allGameList)
  allGameList.forEach((item) => {
    if (item.gameType === 'clicksTopList') {
      item.gameList = gamelist.popular.clicksTopList
    } else if (item.gameType === 'platformList') {
      item.gameList = gamelist.popular.platformList
    } else if (item.gameType === 'bigaward') {
      item.gameList = gamelist.awardRecordList || []
    } else if (item.gameType === 'video') {
      item.gameList = gamelist.popular.clicksVideoTopList || []
    } else {
      item.gameList = gamelist[item.gameType]
    }
    console.log(item.gameList)
    if (!item.gameList) {
      item.isShow = false
    }
  })
  console.log(allGameList, 'allGameList')
  sessionStorage.setItem('allGameList', JSON.stringify(allGameList))
  sessionStorage.setItem('gameData', JSON.stringify(homeState.allGameList))
}

const handleGoAll = (type: number) => {
  router.push({
    name: 'AllGames',
    query: {
      type,
    },
  })
}

const tabs = reactive<
  {
    title: string
    type: string
    isShow: boolean
    img: string
  }[]
>([
  {
    title: t('all'),
    type: 'all',
    img: 'all',
    isShow: true,
  },
])

const getGameTypeList = async () => {
  await getGameType()
  homeState.gameTypeList.forEach((item) => {
    tabs.push({
      title: t('code' + item.typeNameCode + item.categoryCode),
      type: item.categoryCode.toLocaleLowerCase(),
      isShow:
        item.state === 1 &&
        item.categoryCode.toLocaleLowerCase() !== 'popular' &&
        item.categoryCode.toLocaleLowerCase() !== 'bigaward',
      img: item.categoryImg,
    })
    if (item.categoryCode.toLocaleLowerCase() === 'popular') {
      allGameList.push({
        isAll: false,
        img: item.categoryImg,
        isShow: true,
        gameList: [],
        gameType: 'platformList',
        title: t('characteristical'),
        showTitle: t('characteristical'),
      })
    }
    allGameList.push({
      isAll: false,
      img: item.categoryImg,
      isShow: item.state === 1,
      gameList: [],
      gameType: item.categoryCode.toLocaleLowerCase() === 'popular' ? 'clicksTopList' : item.categoryCode.toLocaleLowerCase(),
      title: t('code' + item.typeNameCode),
      showTitle: t('code' + item.typeNameCode + item.categoryCode),
    })
  })
}
const init = async () => {
  await getGameList()
  // 获取通知消息，判断是否已读
  await getMessagesData()
}
init()

onMounted(async () => {
  // 获取系统消息
  const res = await AwaitApiResult(getSiteMessageList({ pageNo: 1, pageSize: 5 }))
  if (res) {
    sitemsg.value = res.data.list
  }
})
</script>

<style lang="scss" scoped>
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
    font-style: normal;
    letter-spacing: 5px;
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

.content__right {
  display: flex;
  gap: 20px;
  .homeIcon {
    width: 48px;
    height: 48px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .customerIcon {
    width: 58px;
    background-image: url('@/assets/homeImg/electronic/customerIcon.svg');
  }
  svg {
    width: 48px;
    height: 48px;
  }
}
#home {
  padding-bottom: 100px;
  .swiper_box {
    padding: 0;
    margin-bottom: 10px;
  }
}
</style>
