import { computed, reactive, ref, watch } from 'vue'
import { AwaitApiResult } from '@/utils'
import {
  GetBalance,
  winGoGameBetting,
  winGoGetGameIssue,
  winGoGetNoaverageEmerdList,
  winGoGetTypeList,
  winGoGetWinTheLotteryResult
} from '@/api'
import { closeToast, showLoadingToast, showToast } from 'vant'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { GlobalStore } from '@/stores'
import lottie from 'lottie-web/build/player/lottie_light'
const GameStore: any = reactive({
  amount: 0,
  history10: [1000],
  typeid: 30,
  winGoLock: false,
  issue: '',
  currentTime: '',
  beginTime: '',
  typeList: [],
  passTime: 180,
  time1: 0,
  time2: 0,
  time3: 0,
  time4: 0,
  threeClose: false,
})

const betInfo = reactive({
  coin: 0, // 下注金额
  count: 0, // 下注倍数
  allCoin: 0, // 下注总额
  gametype: 0, // 类型 0 颜色 1数字 2大小
  typeid: 1, // 台号1Min 3Min 5Min 10Min
  issuenumber: '', // 期号
  selecttype: 1, // 下注内容
  show: false,
})
const componentNum = ref(0)

const betHistory: any = ref({})
// 中将弹窗部分
const tipList = ref<any>([])
export const wingoHook = () => {
  let animat01: any = null
  const opMiss = ref(false)
  let lock = 0
  // 路由
  const router = useRouter()
  const { t } = useI18n()
  // 钱包金额
  const ProhibitBuyTime = 5
  const getComponentNum = computed(() => componentNum.value)
  // 倒数定时器
  const timeHandle = ref<NodeJS.Timeout | null>(null)
  // 随机投注参数
  const randomNum = ref(0)
  // 随机投注加锁
  const randomLock = ref(false)
  const randomIntv = ref<NodeJS.Timeout | null>(null)
  const amount = computed(() => GameStore.amount)
  const typeid = computed(() => GameStore.typeid)
  const history1 = computed(() => GameStore.history10[0] || '')
  const history2 = computed(() => GameStore.history10.slice(1, 9) || [])
  const issue = computed(() => GameStore.issue)
  const typeList = computed(() => GameStore.typeList)
  const currentGame = computed(() => GameStore.typeList.find((item: any) => item.typeID == GameStore.typeid) || {})
  const multipleList = computed(() => currentGame.value.betMultiple?.split('|') || [])
  const coinList = computed(() => currentGame.value.scope?.split('|') || [])
  const countdown = computed(() => `${GameStore.time1}${GameStore.time2}:${GameStore.time3}${GameStore.time4}`)
  const banBet = computed(() => GameStore.passTime - 5 < 0)
  const winTipList = computed(() => tipList.value)
  const lastTime = computed(() => GameStore.passTime <= 5)
  const pTime = computed(() => GameStore.passTime)
  const nowBet = computed(() => betHistory.value[issue.value] || [])
  // 初始化动画组件啊
  const initA1 = (o: any) => {
    animat01 = lottie.loadAnimation(o)
    animat01.stop()
  }
  // 下注
  const bettingPopupShow = computed({
    get (): boolean {
      return betInfo.show || false
    },
    set (val: boolean) {
      betInfo.show = val
    },
  })
  // 游戏内容，颜色，游戏类型 0颜色，1数字，2大小
  const betting = (con: any, type: any) => {
    if (GameStore.passTime <= ProhibitBuyTime) return
    betInfo.gametype = type // 选择的是 颜色1 数字2 大小3
    betInfo.selecttype = con // 选择游戏内容
    betInfo.count = betInfo.count || multipleList.value[0]
    betInfo.issuenumber = issue.value // 期号
    betInfo.typeid = typeid.value // 几分钟的游戏
    betInfo.coin = coinList.value[0]
    betInfo.show = true
  }
  // 随机买数字
  const random = () => {
    if (randomLock.value) return
    randomLock.value = true
    if (!randomIntv.value) {
      randomIntv.value = setInterval(function () {
        randomNum.value = Math.floor(Math.random() * 11)
      }, 50)
    }
    setTimeout(function () {
      if (randomNum.value > 9) randomNum.value = 9
      clearInterval(randomIntv.value as NodeJS.Timeout)
      randomLock.value = false
      randomIntv.value = null
      betting(randomNum.value, 1)
    }, 5000)
  }
  // 关闭投注弹窗，并清理相关数据。
  const clearBetting = () => {
    if (!betInfo.show) return
    betInfo.show = false
    betInfo.coin = coinList.value[0]
    betInfo.count = multipleList.value[0]
    // setAllCoin()
  }
  // 提交投注参数。
  const submitBettingData = async () => {
    const res = await AwaitApiResult<any>(
      winGoGameBetting({
        typeId: betInfo.typeid,
        issuenumber: betInfo.issuenumber,
        amount: Number(betInfo.coin),
        betCount: Number(betInfo.count),
        gameType: betInfo.gametype,
        selectType: betInfo.selecttype,
      })
    )
    if (res?.code === 0) {
      addHistory({
        issuenumber: betInfo.issuenumber,
        amount: Number(betInfo.coin) * Number(betInfo.count),
        selecttype: betInfo.selecttype,
      })
      showToast(t('code' + res.msgCode))
      addBetting(betInfo.issuenumber)
      clearBetting()
      getWinsUserAmount()
    }
  }
  // 添加当期投注
  const addHistory = (o: any) => {
    const { issuenumber = '1', amount, selecttype } = o
    if (!betHistory.value[issuenumber]) betHistory.value[issuenumber] = []
    betHistory.value[issuenumber].push({ amount, selecttype })
  }
  // 跳转路由
  const goPath = (name: string) => {
    router.push({ name })
  }

  // 获取钱包金额
  /**
   * @description:
   * @param {*} isShowT
   * @return {*}
   */
  const getWinsUserAmount = async (isShowT: boolean = false) => {
    const res = await AwaitApiResult<any>(GetBalance())
    if (res) {
      GameStore.amount = res?.data.amount || 0
      isShowT && showToast(t('refreshSuccess'))
    }
  }
  // 获取游戏类型列表
  const getType = async () => {
    showLoadingToast({
      overlay: true,
      type: 'loading',
    })
    const res = await AwaitApiResult(winGoGetTypeList())
    if (res && res.data) {
      GameStore.typeList = res.data.map((item: any) => {
        item.gamePresentation = null
        return item
      })
      GameStore.typeid = res.data[0].typeID
      GameStore.winGoLock = true
      betInfo.count = multipleList.value[0]
    }
    closeToast()
  }

  // 切换游戏
  const changeGame = async (typeID: any) => {
    clearInterval(timeHandle.value as NodeJS.Timeout)
    GameStore.typeid = typeID
    lock = 1
    await getGameIssue()
    await getHistory10()
    componentNum.value++
  }
  const getGameIssue = async () => {
    const res = await AwaitApiResult<any>(winGoGetGameIssue({ typeId: GameStore.typeid }))
    if (res) {
      GameStore.issue = res.data.issueNumber
      GameStore.currentTime = res.data.serviceTime.replace(/-/g, '/')
      GameStore.beginTime = res.data.startTime.replace(/-/g, '/')
      passTime()
    }
  }
  // 获取最近10期
  const getHistory10 = async () => {
    const res = await AwaitApiResult<any>(
      winGoGetNoaverageEmerdList({
        pageSize: 10,
        pageNo: 1,
        typeId: GameStore.typeid,
      })
    )
    if (res?.data) {
      const { list } = res.data
      GameStore.history10 = list.map((item: any) => item.number)
    }
  }
  // 过期时间处理
  const passTime = () => {
    const currentTime = new Date(GameStore.currentTime).getTime()
    const beginTime = new Date(GameStore.beginTime).getTime()
    let gameTime = (currentTime - beginTime) / 1000 // 游戏时间 = 服务器时间-游戏开始时间 如果大于
    if (gameTime > currentGame.value.intervalM * 60) {
      gameTime = currentGame.value.intervalM * 60
    }
    GameStore.passTime = currentGame.value.intervalM * 60 - gameTime // 游戏剩余的时间，秒
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
    if (GameStore.passTime <= ProhibitBuyTime) {
      betInfo.show = false
    }
    // if (VoiceType.value == '1') {
    //     if (GameStore.passTime <= ProhibitBuyTime.value && GameStore.passTime > 1) {
    //         voicePlay(1)
    //     } else if (GameStore.passTime == 1) {
    //         voicePlay(2)
    //     }
    // }
    if (GameStore.passTime > 0) {
      const subTime = GameStore.passTime - ProhibitBuyTime
      GameStore.time2 = Math.floor(subTime / 60)
      GameStore.time3 = Math.floor((subTime % 60) / 10)
      GameStore.time4 = Math.floor(subTime % 10)
      GameStore.passTime--
    } else {
      clearInterval(timeHandle.value as NodeJS.Timeout)
      if (reload) {
        getNewData()
      }
    }
  }
  // 购买份数切换
  const TaskCount = (item: number) => {
    betInfo.count = item
  }
  // 获取最新数据
  const getNewData = async () => {
    await getGameIssue() // 期号
    await getWinsUserAmount()
    await getHistory10()
    componentNum.value++
  }
  // 投注監視定時器Obj
  const checkObj = ref<any>({})
  const tiemOutList = ref<any>([])
  const isThreeS = computed(() => GameStore.threeClose)
  const timer = ref<any>()
  const clickMark = () => {
    clearTimeout(timer.value)
    tipList.value.shift()
    if (isThreeS.value && tipList.value.length) {
      timer.value = setTimeout(() => {
        clickMark()
      }, 1000 * 3)
    }
  }

  // 三秒禁用
  const clickThreeS = () => {
    GameStore.threeClose = !GameStore.threeClose
    if (!GameStore.threeClose) {
      clearTimeout(timer.value)
    } else {
      timer.value = setTimeout(() => {
        clickMark()
      }, 1000 * 3)
    }
  }

  const closeBtn = () => {
    tipList.value = []
  }
  // 父组件直接调用
  const showMark = (list: any[]) => {
    tipList.value.push(...list)
    if (isThreeS.value) {
      timer.value = setTimeout(() => {
        clickMark()
      }, 1000 * 3)
    }
  }
  // 缓存投注记录
  const addBetting = (issuenumber: string) => {
    if (checkObj.value[issuenumber]) return
    checkObj.value[issuenumber] = true
    const { time1, time2, time3, time4 } = GameStore
    const outTime =
      (time1 * 10 * 60 + time2 * 60 + time3 * 10 + time4 + ProhibitBuyTime) * 1000 + Math.floor(Math.random() * 2000) + 1000
    tiemOutList.value[currentGame.value.intervalM] = setTimeout(() => {
      checkWinTheLottery(issuenumber)
    }, outTime)
  }
  // 查询 中奖记录
  const checkWinTheLottery = async (issueNumber: string) => {
    const res = await AwaitApiResult<any>(winGoGetWinTheLotteryResult({ issueNumber: [issueNumber] }))
    if (res?.data) {
      const isLottery = res.data.filter((item: { state: number }) => item.state != 2)
      if (!isLottery.length) {
        return
      }
      showMark(isLottery)
      delete checkObj.value[issueNumber]
    }
  }
  watch(
    () => GlobalStore().visibility,
    async (newVal) => {
      lock = 1
      if (newVal === 0) {
        if (timeHandle.value) clearInterval(timeHandle.value as NodeJS.Timeout)
      } else {
        await getType()
        await getGameIssue()
        getWinsUserAmount()
        getHistory10()
      }
    }
  )

  watch(
    () => lastTime.value,
    (n) => {
      if (n) {
        animat01 && animat01.stop()
        opMiss.value = false
        animat01 && animat01.play()
      }
    }
  )
  watch(
    () => GameStore.history10,
    async (n, o) => {
      console.log('触发我了')
      if (lock) {
        animat01 && animat01.stop()
        lock = 0
        if (lastTime.value) {
          console.log('小于5秒', animat01.frameRate)
          animat01 && animat01.goToAndPlay(GameStore.time4 * animat01.frameRate, true)
        }
        return
      }
      if (o[0] === 1000) {
        animat01 && animat01.stop()
        return
      }
      if (n) {
        opMiss.value = await true
        animat01 && animat01.stop()
        setTimeout(() => {
          opMiss.value = false
        }, 2000)
      }
    },
    { immediate: false }
  )

  return {
    amount,
    randomNum,
    history1,
    history2,
    issue,
    multipleList,
    typeid,
    typeList,
    currentGame,
    countdown,
    banBet,
    betInfo,
    bettingPopupShow,
    coinList,
    getComponentNum,
    winTipList,
    isThreeS,
    lastTime,
    opMiss,
    pTime,
    nowBet,
    betting,
    getWinsUserAmount,
    goPath,
    changeGame,
    getType,
    getGameIssue,
    getHistory10,
    submitBettingData,
    clearBetting,
    random,
    TaskCount,
    clickMark,
    closeBtn,
    clickThreeS,
    initA1,
  }
}
