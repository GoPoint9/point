<template>
  <div v-show="tipList.length" class="WinningTip__C" @click="clickMark">
    <div v-show="!isL" ref="animation" class="c" />
    <div class="WinningTip__C-body" :class="{ isL }">
      <div v-if="isL" class="WinningTip__C-body-l1" :class="{ isL }">{{ $t('k3WarningTip1') }}</div>
      <div v-else class="WinningTip__C-body-l1">{{ $t('k3WarningTip2') }}</div>
      <div class="WinningTip__C-body-l2" :class="[`type${tip.number}`]">
        {{ $t('winTips3') }}
        <div>{{ tipColorTextMap[tip.colour] }}</div>
        <div class="WinningNum">{{ tip.number }}</div>
        <div>{{ tip.number > 4 ? $t('big') : $t('small') }}</div>
      </div>
      <div class="WinningTip__C-body-l3">
        <div v-if="isL" class="isLose">{{ $t('winTips4') }}</div>
        <template v-else>
          <div class="head">{{ $t('winTips5') }}</div>
          <div class="bonus">{{ currency(Number(tip.winAmount)) }}</div>
        </template>
        <div class="gameDetail">{{ $t('winTips6') }}{{ tip.typeName }} {{ tip.issueNumber }}</div>
      </div>
      <div class="WinningTip__C-body-l4">
        <div class="acitveBtn" :class="{ active: isThreeS }" @click.stop="clickThreeS" />
        {{ $t('autoShutOff3s') }}
      </div>
      <div class="closeBtn" @click="closeBtn" />
      <van-icon
        v-show="tipList.length > 1"
        name="arrow"
        color="#fff"
        size="30px"
        class="arrowBtn"
        @click.stop="clickMark"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { currency } from '@/utils'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import lottie from 'lottie-web/build/player/lottie_light'

const { t } = useI18n()
const animation = ref()
const isL = computed(() => (tipList.value[0] ? tipList.value[0].state == 0 : false))
const tip = computed(() => tipList.value[0] || {})
const isThreeS = ref<Boolean>(false)
const tipList = ref<any[]>([])
let animat: any = null
const tipColorTextMap = ref<Object>({
  red: t('winColor1'),
  green: t('winColor2'),
  'red,violet': t('winColor3'),
  'green,violet': t('winColor4'),
  violet: t('winColor5'),
})
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

watch(
  () => tipList.value.length,
  (length) => {
    if (length) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

// 三秒禁用
const clickThreeS = () => {
  isThreeS.value = !isThreeS.value
  console.log('clickThreeS')
  if (!isThreeS.value) {
    clearTimeout(timer.value)
  } else {
    timer.value = setTimeout(() => {
      clickMark()
    }, 1000 * 3)
  }
}
// 父组件直接调用
const showMark = (list: any[]) => {
  tipList.value.push(...list)
  console.log('tipList.value', tipList.value)
  animat.stop()
  animat.play()
  setTimeout(() => {
    animat.stop()
  }, 2000)
  if (isThreeS.value) {
    timer.value = setTimeout(() => {
      clickMark()
    }, 1000 * 3)
  }
}
const closeBtn = () => {
  tipList.value = []
}
onMounted(() => {
  animat = lottie.loadAnimation({
    container: animation.value, // the dom element
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/winTip.json',
  })
  animat.stop()
})
defineExpose({
  showMark,
})
</script>
<style lang="scss" scoped>
.WinningTip__C {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  html:lang(ar) & {
    right: 0;
    left: unset;
  }
  &-body {
    position: absolute;
    width: 580px;
    height: 820px;
    background-image: url('@/assets/icons/common/missningBg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    padding-top: 250px;

    &.isL {
      background-image: url('@/assets/icons/common/missningLBg.png');

      .WinningTip__C-body-l1,
      .WinningTip__C-body-l2,
      .WinningTip__C-body-l3,
      .WinningTip__C-body-l4 {
        color: #7190b4;
      }
      .WinningTip__C-body-l2 {
        > div {
          background-color: #6889b1;
        }
      }
    }

    &-l1 {
      font-weight: 700;
      font-size: 48px;
      text-align: center;
      color: #fff;
      height: 58px;
      line-height: 58px;
      margin-bottom: 68px;
    }

    &-l2 {
      height: 44px;
      line-height: 44px;
      display: flex;
      color: #fff;
      font-size: 22px;
      padding-inline-start: 54px;
      display: flex;
      align-items: center;
      margin-bottom: 68px;

      & > div {
        height: 44px;
        background: #fdac32;
        color: #fff;
        border-radius: 10px;
        padding: 0 24px;
        border: 1px solid #fff;
        &:first-child {
          margin-left: 24px;
        }

        &.WinningNum {
          width: 40px;
          height: 40px;
          line-height: 40px;
          margin: 0 14px;
          padding: 0;
          text-align: center;
          border-radius: 50%;
        }
      }

      &.type0 {
        & > div {
          background-image: linear-gradient(135deg, var(--norm_red-color) 50.96%, var(--norm_Purple-color) 50.97%);
        }
      }

      &.type5 {
        & > div {
          background-image: linear-gradient(135deg, var(--norm_green-color) 51.48%, var(--norm_Purple-color) 51.49%);
        }
      }

      &.type1,
      &.type3,
      &.type7,
      &.type9 {
        & > div {
          background-color: var(--norm_green-color);
        }
      }

      &.type2,
      &.type4,
      &.type6,
      &.type8 {
        & > div {
          background-color: var(--norm_red-color);
        }
      }
    }

    &-l3 {
      height: 130px;

      .isLose {
        font-weight: 700;
        font-size: 48px;
        line-height: 58px;
        color: #7190b4;
        text-align: center;
        margin-bottom: 26px;
        padding-top: 30px;
      }

      .head {
        height: 30px;
        line-height: 30px;
        font-weight: 700;
        font-size: 26px;
        color: #fb5b5b;
        text-align: center;
        margin-bottom: 8px;
      }

      .bonus {
        height: 48px;
        line-height: 48px;
        font-weight: 700;
        font-size: 40px;
        color: #fb5b5b;
        text-align: center;
        margin-bottom: 20px;
      }

      .gameDetail {
        height: 28px;
        line-height: 28px;
        font-size: 22px;
        text-align: center;
        color: var(--text_color_L2);
      }
    }

    &-l4 {
      height: 48px;
      line-height: 48px;
      font-size: 24px;
      color: #fff;
      position: absolute;
      left: 56px;
      bottom: 56px;
      display: flex;
      align-items: center;
      html:lang(ar) & {
        left: unset;
        right: 56px;
      }
      .acitveBtn {
        height: 42px;
        width: 42px;
        border-radius: 50%;
        background: var(--winTips);
        border: 1px solid var(--text_color_L1);
        margin-right: 14px;
        position: relative;

        &.active {
          &::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            height: 18px;
            width: 24px;
            display: block;
            background-image: url('@/assets/icons/common/vector.png');
            background-repeat: no-repeat;
            background-size: 24px 18px;
            background-position: center;
          }
        }
      }
    }
  }

  .closeBtn {
    width: 60px;
    height: 60px;
    background-image: url('@/assets/icons/common/close.png');
    background-repeat: no-repeat;
    background-size: 60px;
    background-position: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(100%);
    bottom: -20px;
  }
  .arrowBtn {
    position: absolute;
    right: -28px;
    top: 60%;
    z-index: 500;
  }

  .c {
    width: 750;
    height: 1660px;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    z-index: 10;
    transform: translateY(-50%);
  }
}
</style>
