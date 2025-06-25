<template>
  <div class="TimeLeft__C">
    <div class="TimeLeft__C-rule" @click="showRule">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
      >
        <path
          d="M23.67 3H12.33C6.66 3 5.25 4.515 5.25 10.56V27.45C5.25 31.44 7.44 32.385 10.095 29.535L10.11 29.52C11.34 28.215 13.215 28.32 14.28 29.745L15.795 31.77C17.01 33.375 18.975 33.375 20.19 31.77L21.705 29.745C22.785 28.305 24.66 28.2 25.89 29.52C28.56 32.37 30.735 31.425 30.735 27.435V10.56C30.75 4.515 29.34 3 23.67 3ZM11.67 18C10.845 18 10.17 17.325 10.17 16.5C10.17 15.675 10.845 15 11.67 15C12.495 15 13.17 15.675 13.17 16.5C13.17 17.325 12.495 18 11.67 18ZM11.67 12C10.845 12 10.17 11.325 10.17 10.5C10.17 9.675 10.845 9 11.67 9C12.495 9 13.17 9.675 13.17 10.5C13.17 11.325 12.495 12 11.67 12ZM24.345 17.625H16.095C15.48 17.625 14.97 17.115 14.97 16.5C14.97 15.885 15.48 15.375 16.095 15.375H24.345C24.96 15.375 25.47 15.885 25.47 16.5C25.47 17.115 24.96 17.625 24.345 17.625ZM24.345 11.625H16.095C15.48 11.625 14.97 11.115 14.97 10.5C14.97 9.885 15.48 9.375 16.095 9.375H24.345C24.96 9.375 25.47 9.885 25.47 10.5C25.47 11.115 24.96 11.625 24.345 11.625Z"
          fill="currentColor"
        /></svg>{{ $t('winTrxIndicate') }}
    </div>
    <div class="TimeLeft__C-name">{{ props.gameName.replace('<br />', ' ') }}</div>
    <div class="TimeLeft__C-num" :class="{ opMiss }">
      <div
        v-for="(item, key) in winNum"
        v-show="key != 0 || (key == 0 && !opMiss)"
        :key="key"
        :class="['n' + item]"
      />
    </div>
    <div class="TimeLeft__C-id">{{ props.currentInfo.gameNo }}</div>
    <div class="TimeLeft__C-text">{{ $t('timeLeftToBuy') }}</div>
    <div class="TimeLeft__C-time">
      <div>{{ currentInfo.time1 }}</div>
      <div>{{ currentInfo.time2 }}</div>
      <div>:</div>
      <div>{{ currentInfo.time3 }}</div>
      <div>{{ currentInfo.time4 }}</div>
    </div>
    <div v-show="opMiss || lastTime" class="zhongjiang">
      <!-- <div class="zhongjiang"> -->
      <div ref="animation" class="c" :class="{ opMiss }">
        <div
          v-for="(item, index) in list"
          v-show="item != winNum[0]"
          :key="index"
          :class="['n' + item]"
        />
      </div>
      <div v-show="opMiss" :class="['n' + winNum[0], 'winN']" />
    </div>
  </div>
  <!-- 规则弹层 begin-->
  <rule :how-play-show="howPlayShow" :game-presentation="currentGame.gamePresentation" @close="howPlayShow = false" />
</template>
<script setup lang="ts">
import rule from '@/components/Home/AllLotteryGames/WinGo/rule.vue'
import lottie from 'lottie-web/build/player/lottie_light'
import { LorreryStore, GlobalStore } from '@/stores'
import { computed, onMounted, ref, watch } from 'vue'
const list = [0, 1, 2, 3, 4, 9, 8, 7, 6, 5]
const props = defineProps({
  currentInfo: {
    type: Object,
    default: () => ({
      gameNo: 'loading',
      currentTime: '',
      beginTime: '',
      passTime: 180,
      time1: 0,
      time2: 0,
      time3: 0,
      time4: 0,
    }),
  },
  winNum: {
    type: Array,
    default: [1000, 0, 0, 0, 0],
  },
  gameName: {
    type: String,
    default: '',
  },
  currentGame: {
    // 当前选中游戏
    type: Object,
    default: () => ({}),
  },
})
const howPlayShow = ref(false)
const lottery = LorreryStore()
const animation = ref()
let animat: any = null
const showRule = () => {
  howPlayShow.value = true
  lottery.getWinGoRule(props.currentGame.typeID)
}
const lastTime = computed(() => {
  if (props.currentInfo.time1 + props.currentInfo.time2 + props.currentInfo.time3) return false
  if (props.currentInfo.time4 <= 6) return true
  return false
})
const isShowA = ref(false)
const opMiss = ref(false)
let lock = 0
const changeG = () => {
  lock = 1
}
watch(
  () => lastTime.value,
  (n) => {
    if (n) {
      console.log('lastTime')
      opMiss.value = false
      isShowA.value = true
      animat && animat.play()
    }
  }
)

watch(
  () => props.winNum,
  async (n, o) => {
    if (lock) {
      animat && animat.stop()
      lock = 0
      if (lastTime.value) {
        console.log('小于5秒', animat.frameRate)
        animat && animat.goToAndPlay(props.currentInfo.time4 * animat.frameRate, true)
      }
      return
    }
    if (o[0] === 1000) {
      animat && animat.stop()
      return
    }
    if (n) {
      opMiss.value = await true
      animat && animat.stop()
      setTimeout(() => {
        isShowA.value = false
        opMiss.value = false
      }, 2000)
    }
  },
  { immediate: false }
)
onMounted(async () => {
  animat = lottie.loadAnimation({
    container: animation.value, // the dom element
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/win.json',
  })
  await animat.stop()
})
watch(
  () => GlobalStore().visibility,
  (newVal) => {
    if (newVal !== 0) {
      lock = 1
    }
  }
)
defineExpose({
  changeG,
})
</script>
<style lang="scss" scoped>
.TimeLeft__C {
  width: calc(100% - 52px);
  height: 200px;
  margin: 36px auto 0;
  background-image: url('@icon/home/wingoissue.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 1px center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: var(--text_color_L4);
  z-index: 10;

  &-rule {
    position: absolute;
    top: 22px;
    left: 22px;
    height: 46px;
    width: 300px;
    font-size: 22px;
    text-align: center;
    border: 1px solid var(--bg_color_L2);
    border-radius: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    html:lang(ar) & {
      left: unset;
      right: 22px;
    }
    svg {
      height: 36px;
      width: 36px;
      color: var(--text_color_L4);
    }
  }

  &-name {
    position: absolute;
    top: 72px;
    left: 22px;
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
    font-size: 22px;
    padding: 0 12px;
    html:lang(ar) & {
      left: unset;
      right: 22px;
    }
  }

  &-num {
    position: absolute;
    height: 50px;
    display: flex;
    left: 22px;
    bottom: 23px;
    padding-left: 0;
    transition: all 0s;
    html:lang(ar) & {
      left: unset;
      right: 22px;
    }
    & > div {
      width: 50px;
      height: 50px;
      $list: 0 1 2 3 4 5 6 7 8 9;
      background-repeat: no-repeat;
      background-size: 50px;
      & + div {
        margin-left: 12px;
      }

      @each $i in $list {
        &.n#{$i} {
          background-image: url('@/assets/icons/home/AllLotteryGames/WinGo/n#{$i}.png');
        }
      }
    }
    &.opMiss {
      padding-inline-start: 50px;
      transition: all 1s;
    }
  }

  &-id {
    position: absolute;
    bottom: 17px;
    right: 22px;
    font-weight: 700;
    font-size: 32px;
    height: 39px;
    line-height: 39px;
    color: var(--textM3);
  }

  &-text {
    height: 30px;
    line-height: 30px;
    font-weight: 700;
    font-size: 24px;
    position: absolute;
    top: 26px;
    right: 24px;
  }

  &-time {
    height: 60px;
    line-height: 60px;
    position: absolute;
    bottom: 76px;
    right: 26px;
    display: flex;

    & > div {
      background-color: var(--darkLight2, var(--bg_color_L2));
      color: var(--text_color_L1);
      font-weight: 700;
      font-size: 36px;
      text-align: center;
      padding: 0 8px;

      & + div {
        margin-left: 9px;
      }

      &:first-child {
        background: var(--bg_color_L1);
      }

      &:last-child {
        background: var(--bg_color_L1);
      }
    }
  }

  .zhongjiang {
    position: absolute;
    width: 100%;
    height: 665px;
    top: 123px;
    .c {
      position: absolute;
      top: 98px;
      width: 100%;
      height: 571px;
      z-index: 1;
      border-radius: 20px;
      opacity: 1;
      background-image: url('@/assets/icons/home/AllGames/w1.png');
      background-size: 0;
      &.opMiss {
        background-size: 100%;
        background-repeat: no-repeat;
        animation: fadeOut 2s ease-out;
        & > div {
          display: block;
          z-index: 10;
          animation: fadeOut1 2s ease-out;
        }
      }
      & > div {
        position: absolute;
        $list: 0 1 2 3 4 9 8 7 6 5;
        width: 110px;
        height: 110px;
        display: none;
        z-index: 0;
        opacity: 1;
        @each $i in $list {
          &.n#{$i} {
            background-image: url('@/assets/icons/home/AllLotteryGames/WinGo/n#{$i}.png');
            background-repeat: no-repeat;
            background-size: 110px;
          }
        }
        &.n0 {
          left: 42px;
          top: 176px;
        }
        &.n1 {
          left: 162px;
          top: 80px;
        }
        &.n2 {
          left: 298px;
          top: 30px;
        }
        &.n3 {
          left: 427px;
          top: 82px;
        }
        &.n4 {
          left: 550px;
          top: 174px;
        }
        &.n5 {
          left: 40px;
          top: 306px;
        }
        &.n6 {
          left: 161px;
          top: 378px;
        }
        &.n7 {
          left: 296px;
          top: 434px;
        }
        &.n8 {
          left: 432px;
          top: 380px;
        }
        &.n9 {
          left: 550px;
          top: 306px;
        }
      }
    }
    .winN {
      position: absolute;
      top: 8px;
      left: 24px;
      width: 50px;
      height: 50px;
      background-repeat: no-repeat;
      background-size: 50px;
      $list: 0 1 2 3 4 5 6 7 8 9;
      z-index: 100;
      opacity: 1;
      @each $i in $list {
        &.n#{$i} {
          background-image: url('@/assets/icons/home/AllLotteryGames/WinGo/n#{$i}.png');
          animation: moveAndResize#{$i} 2s infinite;
        }
      }
    }
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fadeOut1 {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
@keyframes moveAndResize0 {
  0% {
    top: 260px;
    left: 42px;
    width: 110px;
    height: 110px;
    background-size: 110px;
  }
  50% {
    top: 260px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 8px;
    left: 24px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize1 {
  0% {
    left: 162px;
    top: 164px;
    width: 110px;
    height: 110px;
    background-size: 110px;
  }
  50% {
    top: 260px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 8px;
    left: 24px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize2 {
  0% {
    left: 298px;
    top: 114px;
    width: 110px;
    height: 110px;
    background-size: 110px;
  }
  50% {
    top: 260px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 8px;
    left: 24px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize3 {
  0% {
    left: 427px;
    top: 170px;
    width: 110px;
    height: 110px;
    background-size: 110px;
  }
  50% {
    top: 260px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 8px;
    left: 24px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize4 {
  0% {
    left: 550px;
    top: 260px;
    width: 110px;
    height: 110px;
    background-size: 110px;
  }
  50% {
    top: 260px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 8px;
    left: 24px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize5 {
  0% {
    left: 40px;
    top: 390px;
    width: 110px;
    height: 110px;
    background-size: 110px;
  }
  50% {
    top: 260px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 8px;
    left: 24px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize6 {
  0% {
    left: 161px;
    top: 460px;
    width: 110px;
    height: 110px;
    background-size: 110px;
  }
  50% {
    top: 260px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 8px;
    left: 24px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize7 {
  0% {
    left: 296px;
    top: 518px;
    width: 110px;
    height: 110px;
    background-size: 110px;
  }
  50% {
    top: 260px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 8px;
    left: 24px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize8 {
  0% {
    left: 432px;
    top: 462px;
    width: 110px;
    height: 110px;
    background-size: 110px;
  }
  50% {
    top: 260px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 8px;
    left: 24px;
    width: 50px;
    height: 50px;
  }
}
@keyframes moveAndResize9 {
  0% {
    left: 550px;
    top: 390px;
    width: 110px;
    height: 110px;
    background-size: 110px;
  }
  50% {
    top: 260px;
    left: 260px;
    width: 200px;
    height: 200px;
    background-size: 200px;
  }
  100% {
    top: 8px;
    left: 24px;
    width: 50px;
    height: 50px;
  }
}
</style>
