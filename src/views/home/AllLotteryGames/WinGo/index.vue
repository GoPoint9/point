<template>
  <div class="WinGo__C">
    <NavBar
      left-arrow
      class="main"
      :head-logo="true"
      @click-left="backGo"
    >
      <template #right>
        <div class="WinGo__C-head-more">
          <div @click="goPath('CustomerService')" />
          <div :class="{ disableVoice: VoiceType == '2' }" @click="setVoice" />
        </div>
      </template>
    </NavBar>
    <!-- 钱包余额 -->
    <Wallte ref="WallteRef" />
    <noTiceBar key="wingo" class="lottery-notice" />
    <!-- 游戏类型 -->
    <GameList :game-list="gameList" :current-game-index="currentGameIndex" @change-game="changeGame" />
    <!-- 游戏开始时间倒计时 -->
    <TimeLeft
      ref="timeLeft"
      :current-info="currentInfo"
      :win-num="winNum"
      :game-name="currentGame.typeName"
      :current-game="currentGame"
    />
    <!-- 投注表 -->
    <Betting
      :current-info="currentInfo"
      :current-game="currentGame"
      :VoiceType="VoiceType"
      :typeid="typeid"
      :betting-api-fun="winGoGameBetting"
      @betting="addBetting"
      @change-betting-p="changeBettingP"
    />
    <!-- 记录导航 -->
    <RecordNav :record="gameComponent" @change-c="(component) => (gameComponent = component)" />
    <!-- 动态展示对应的组件 -->
    <KeepAlive>
      <component
        :is="GameRecordList[gameComponent]"
        ref="RecordComponent"
        class="game-record"
        :typeid="typeid"
        :ApiFun="winGoGetMyEmerdList"
        :list-api="winGoGetNoaverageEmerdList"
        :EmerdApi="winGoGetEmerdList"
        go-path-name="AllLotteryGames-BettingRecordWin"
        @changefive="changeFive"
      />
    </KeepAlive>
    <!-- 弹窗组件 -->
    <Dialog :show="showDialog" @confirm="goPath('/login')">
      <template #content>
        <div>{{ dialogText }}</div>
      </template>
    </Dialog>
    <!-- 中奖提示组件 -->
    <WinningTips ref="WinningTipsRef" />
    <ChangLong v-if="showChanglong" />
    <audioVue />
  </div>
</template>

<script setup lang="ts">
import Wallte from '@/components/Home/AllLotteryGames/WinGo/Wallet.vue'
import GameList from '@/components/Home/AllLotteryGames/WinGo/GameList.vue'
import TimeLeft from '@/components/Home/AllLotteryGames/WinGo/TimeLeft.vue'
import Betting from '@/components/Home/AllLotteryGames/WinGo/Betting.vue'
import RecordNav from '@/components/Home/AllLotteryGames/WinGo/RecordNav.vue'
import GameRecord from '@/components/Home/AllLotteryGames/WinGo/GameRecord.vue'
import noTiceBar from '@/components/Home/NoticeBar/index.vue'
import Trend from '@/components/Home/AllLotteryGames/WinGo/Trend.vue'
import MyGameRecord from '@/components/Home/AllLotteryGames/WinGo/MyGameRecord.vue'
import WinningTips from '@/components/common/WinningTips.vue'
import Dialog from '@/components/common/Dialog.vue'
import ChangLong from '@/components/common/ChangLong.vue'
import audioVue from '@/components/Home/AllLotteryGames/WinGo/audio.vue'
import { GlobalStore, LorreryStore, SettingStore } from '@/stores'
import { ref, onMounted, computed, nextTick, onBeforeUnmount, watch, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  winGoGetGameIssue,
  winGoGetWinTheLotteryResult,
  winGoGameBetting,
  winGoGetMyEmerdList,
  winGoGetNoaverageEmerdList,
  winGoGetEmerdList,
  getLastFiveIssueNumberResult
} from '@/api'
import { AwaitApiResult, AwaitWrap } from '@/utils'

/** ***************变量 *****************/
const route = useRoute()
const type_Id = route.query.typeId

const backGo = () => {
  router.go(-1)
  sessionStorage.setItem('clickedGameType', 'lottery')
  // router.push({path:'/'})
}

// 动态组件
const GameRecordList = {
  GameRecord,
  Trend,
  MyGameRecord,
}
// 动态组件ref
const RecordComponent = ref()
// 中奖组件
const WinningTipsRef = ref()
// 錢包組件
const WallteRef = ref()
// 倒计时组件
const timeLeft = ref()
// 投注组件是否展示投注界面
const BettingPS = ref(false)
// 动态组件展示
const gameComponent = ref('GameRecord')
// 路由
const router = useRouter()
// 彩票状态
const lottery = LorreryStore()
// 游戏列表 -后端返回
let gameList = reactive<any[]>([])
// 当前选中游戏的index
const currentGameIndex = ref(0)
// 开关音频变量
const VoiceType = ref(localStorage.getItem('volumeShow') || '1')
// 是否展示弹窗
const showDialog = ref(false)
// 倒数定时器
const timeHandle = ref<NodeJS.Timeout | null>(null)
// 选中游戏详情
const currentInfo = ref<{
  gameNo: string
  currentTime: string
  beginTime: string
  passTime: number
  time1: number
  time2: number
  time3: number
  time4: number
}>({
  gameNo: 'loading',
  currentTime: '',
  beginTime: '',
  passTime: 180,
  time1: 0,
  time2: 0,
  time3: 0,
  time4: 0,
})
// 倒计时，多少秒
const ProhibitBuyTime = ref(5)
// 弹窗文案
const dialogText = ref('')
// 投注弹窗
const bettingDialog = ref(false)
// 游戏类型
const typeid = ref<null | number>()
// 选中游戏
const currentGame = computed(() => lottery.wingo[currentGameIndex.value] || {})
// 最近中奖号码
const winNum = ref<number[]>([1000, 0, 0, 0, 0])
// 是否展示长龙
const settingS = SettingStore()
const showChanglong = computed(() => settingS.getIsShowLotteryDragon)
/** ***************生命周期 *****************/

onMounted(() => {
  getGameList()
})

onBeforeUnmount(() => {
  clearInterval(timeHandle.value as NodeJS.Timeout)
  tiemOutList.value.forEach((item: NodeJS.Timeout) => {
    clearInterval(item as NodeJS.Timeout)
  })
  setTime.value && clearTimeout(setTime.value)
})
watch(
  () => GlobalStore().visibility,
  (newVal) => {
    if (newVal === 0) {
      clearInterval(timeHandle.value as NodeJS.Timeout)
    } else {
      getGameList(currentGameIndex.value)
    }
  }
)
/** ***************方法 *****************/

// 开启、关闭音频
const setVoice = () => {
  VoiceType.value == '1' ? (VoiceType.value = '2') : (VoiceType.value = '1')
  localStorage.setItem('volumeShow', VoiceType.value)
}

// 跳转路由
const goPath = (name: string) => {
  router.push({ name })
}

// 获取游戏列表
const getGameList = async (currentGameIndex: any = null) => {
  await lottery.getWinGoData()
  gameList = lottery.getWingo
  const index = gameList.findIndex((item: any) => item.typeID == type_Id)
  if (typeid.value == null && !type_Id) {
    changeGame(0)
  } else {
    changeGame(currentGameIndex != null ? currentGameIndex : index)
  }
}

// 切换游戏
const changeGame = (index: number, is = false) => {
  if (is) timeLeft.value.changeG()
  lottery.getWinGoData()
  currentGameIndex.value = index
  typeid.value = gameList[index].typeID
  getGameIssue(typeid.value)
  nextTick(() => {
    RecordComponent.value.getData(typeid.value)
  })
}

// 获取当前游戏期号
const getGameIssue = async (typeId: number) => {
  if (gameComponent.value == 'MyGameRecord') getLastFive(typeId)
  const [err, res] = await AwaitWrap<any>(winGoGetGameIssue({ typeId }))
  currentInfo.value.gameNo = res.issueNumber
  currentInfo.value.currentTime = res.serviceTime.replace(/-/g, '/')
  currentInfo.value.beginTime = res.startTime.replace(/-/g, '/')
  passTime()
}

const getLastFive = async (typeId: number) => {
  const res = await AwaitApiResult<any>(getLastFiveIssueNumberResult({ typeId }))
  if (res) {
    winNum.value = res.data.number.split(',')
  }
}
// 过期时间处理
const passTime = () => {
  const currentTime = new Date(currentInfo.value.currentTime).getTime()
  const beginTime = new Date(currentInfo.value.beginTime).getTime()

  let gameTime = (currentTime - beginTime) / 1000 // 游戏时间 = 服务器时间-游戏开始时间 如果大于
  const currentGame = gameList[currentGameIndex.value]
  if (gameTime > currentGame.intervalM * 60) {
    gameTime = currentGame.intervalM * 60
  }
  currentInfo.value.passTime = currentGame.intervalM * 60 - gameTime // 游戏剩余的时间，秒
  if (currentInfo.value.passTime < 0) {
    dialogText.value =
      'An error occurred, please contact customer service。' +
      'The game time is ' +
      currentGame.intervalM +
      ' minutes,' +
      'start time is ' +
      currentInfo.value.beginTime +
      ',current time is' +
      currentInfo.value.currentTime +
      '!'
    showDialog.value = true
    return
  }
  timeOutSubTime()
}
// 倒计时定时器
const timeOutSubTime = () => {
  clearInterval(timeHandle.value as NodeJS.Timeout)
  subTime(false)
  timeHandle.value = setInterval(function () {
    subTime()
  }, 1000)
}
// 每秒钟处理倒计时
const subTime = (reload = true) => {
  if (currentInfo.value.passTime <= ProhibitBuyTime.value) {
    bettingDialog.value = false
  }
  if (VoiceType.value == '1') {
    if (currentInfo.value.passTime <= ProhibitBuyTime.value && currentInfo.value.passTime > 1) {
      voicePlay(1)
    } else if (currentInfo.value.passTime == 1) {
      voicePlay(2)
    }
  }
  if (currentInfo.value.passTime > 0) {
    const subTime = currentInfo.value.passTime
    currentInfo.value.time2 = Math.floor(subTime / 60)
    currentInfo.value.time3 = Math.floor((subTime % 60) / 10)
    currentInfo.value.time4 = Math.floor(subTime % 10)
    currentInfo.value.passTime--
  } else {
    clearInterval(timeHandle.value as NodeJS.Timeout)
    if (reload) {
      reLoadAmonut()
    }
  }
}
// 播放音频
const voicePlay = (action = 1) => {
  const ttsAudio: any = document.getElementById(`voice${action}`)
  if (ttsAudio) {
    ttsAudio.pause()
    ttsAudio.load()
    ttsAudio.play().catch((err: any) => {
      console.error('播放音频出错:', err)
    })
  }
}
// 重新加载钱包
const reLoadAmonut = () => {
  getGameIssue(typeid.value || 0) // 期号
  WallteRef.value.getWinsUserAmount(false)
  RecordComponent.value.getData(true)
}
// 投注監視定時器Obj
const checkObj = ref<Object>({})
const tiemOutList = ref<any>([])
// 缓存投注记录
const addBetting = (issuenumber: string) => {
  WallteRef.value.getWinsUserAmount(false)
  RecordComponent.value.getData()
  if (checkObj.value[issuenumber]) return
  checkObj.value[issuenumber] = true
  const { time1, time2, time3, time4 } = currentInfo.value
  const outTime = (time1 * 10 * 60 + time2 * 60 + time3 * 10 + time4) * 1000 + Math.floor(Math.random() * 2000) + 1000
  tiemOutList.value[currentGame.value.intervalM] = setTimeout(() => {
    checkWinTheLottery(issuenumber)
  }, outTime)
}

// 设置
const changeBettingP = (value: boolean) => {
  BettingPS.value = value
}
// 返回最近5期参数
const changeFive = (value: any) => {
  winNum.value = value
}
const setTime = ref<any>(null)
// 查询 中奖记录
const checkWinTheLottery = async (issueNumber: string) => {
  const [err, res] = await AwaitWrap<any>(winGoGetWinTheLotteryResult({ issueNumber: [issueNumber] }))
  if (res) {
    const isLottery = res.filter((item: { state: number }) => item.state != 2)
    if (!isLottery.length) {
      // setTime.value = setTimeout(() => {
      // 	checkWinTheLottery(issueNumber)
      // }, 2000)
      return
    }
    WinningTipsRef.value.showMark(isLottery)
    delete checkObj.value[issueNumber]
  }
}
</script>

<style lang="scss" scoped>
.WinGo__C {
  padding-bottom: 26px;

  &-head {
    height: 94px;
    background: linear-gradient(90deg, #de2325 0%, #ff504a 100%);
    padding: 0 26px;
    position: relative;

    div {
      background-repeat: no-repeat;
      background-position: center;
    }

    &-bcak {
      position: absolute;
      width: 48px;
      height: 48px;
      background-image: url('@/assets/icons/home/AllLotteryGames/WinGo/bcakIcon.png');
      background-size: 48px;
      left: 26px;
      top: 50%;
      transform: translateY(-50%);
    }

    &-logo {
      // background: url($headLogoUrl);
      background-size: 224px 84px;
      height: 84px;
      width: 224px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    &-more {
      position: absolute;
      width: 116px;
      height: 48px;
      right: 26px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
      html:lang(ar) & {
        right: unset;
        left: 26px;
      }
      & > div {
        width: 48px;
        height: 48px;
        background-image: url('@/assets/icons/home/AllLotteryGames/WinGo/kefu.png');
        background-size: 48px;

        &:last-child {
          background-image: url('@/assets/icons/home/AllLotteryGames/WinGo/voice.png');

          &.disableVoice {
            background-image: url('@/assets/icons/home/AllLotteryGames/WinGo/voice-off.png');
          }
        }
      }
    }
  }

  :deep(.noticeBar__container) {
    width: calc(100% - 52px) !important;
    margin: 34px auto;
    position: relative;
    z-index: 1;
    top: 0;
  }
}
</style>
