<template>
  <!-- 投注内容 begin -->
  <van-popup
    v-model:show="bettingPopupShow"
    position="bottom"
    :round="true"
    :close-on-click-overlay="false"
  >
    <div class="bet">
      <div class="bet-body">
        <div class="l1">
          {{ $t('nw3') }}<span>{{ issue }}</span>
        </div>
        <div class="l2">
          {{ $t('nw1') }} <span>{{ countdown }}</span>
        </div>
        <div class="l3">
          <div class="title">Choice</div>
          <div v-if="betInfo.selecttype < 10" :class="['ball', 'b' + betInfo.selecttype]" />
          <div v-else :class="['b' + betInfo.selecttype]">{{ selectName }}</div>
        </div>
        <div class="l3">
          <div class="title">{{ $t('amount') }}</div>
          <div class="amount">
            <div
              v-for="(c, k) in coinList"
              :key="k"
              :class="{ active: c == betInfo.coin }"
              @click="changeCoin(c)"
            >
              {{ c }}
            </div>
          </div>
        </div>
        <div class="l3">
          <div class="title">{{ $t('multiple') }}</div>
          <div class="m">
            <div @click="Stepper(1)">-</div>
            <input v-model="betInfo.count" type="text">
            <div @click="Stepper(2)">+</div>
          </div>
        </div>
        <div class="l3">
          <div class="title" />
          <div class="multiples">
            <div
              v-for="(m, k) in multipleList"
              :key="k"
              :class="{ active: m == betInfo.count }"
              @click="TaskCount(m)"
            >
              {{ m }}
            </div>
          </div>
        </div>
        <div class="l4">
          <div class="true" :class="{ active: isCheckPreSale }" @click="isCheckPreSale = !isCheckPreSale">
            <svg
              width="24"
              height="17"
              viewBox="0 0 24 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Rectangle 34625849"
                d="M22.2522 1.63623L9.52427 14.3642L1.74609 6.58598"
                stroke="currentColor"
                stroke-width="4"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span @click="isShowPreSale = true">{{ $t('agree') + $t('presaleRules') }}</span>
        </div>
      </div>
      <div class="bet-foot">
        <div class="bet-foot-c" @click="clearBetting">{{ t('cancel') }}</div>
        <div v-throttle-click="{ handler: submitBetting, wait: 2000 }" class="bet-foot-s">
          {{ t('totalAmount') }} <span>{{ currency(betInfo.count * betInfo.coin || 0) }}</span>
        </div>
      </div>
    </div>
  </van-popup>

  <!-- 规则弹层 begin-->
  <van-popup v-model:show="isShowPreSale" :close-on-click-overlay="false" round>
    <div class="bet-PreSale">
      <div class="bet-PreSale-head">{{ t('presaleRules') }}</div>
      <div class="bet-PreSale-body">
        {{ $t('betPopTXT') }}
      </div>
      <div class="bet-PreSale-foot">
        <div class="bet-PreSale-foot-btn" @click="knowPreSale">{{ t('iKonw') }}</div>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { showFailToast, showToast } from 'vant'
import { currency } from '@/utils'
import { useI18n } from 'vue-i18n'
import { wingoHook } from '../wingo.hook'
const { t } = useI18n()
const { betInfo, bettingPopupShow, coinList, multipleList, issue, countdown, submitBettingData, clearBetting, TaskCount } =
  wingoHook()
// 是否展示预售规则
const isShowPreSale = ref(false)
// 是否同意预售规则
const isCheckPreSale = ref(true)

// 选中投注展示
const selectName = computed(() => {
  switch (betInfo.selecttype) {
    case 13:
      return t('big')
    case 14:
      return t('small')
    case 10:
      return t('redColor')
    case 11:
      return t('greenColor')
    case 12:
      return t('purpleColor')
    default:
      return betInfo.selecttype
  }
})

// 份数加减
const Stepper = (e: number) => {
  switch (e) {
    case 1:
      if (betInfo.count > 1) {
        betInfo.count--
      }
      break
    case 2:
      betInfo.count++
      break
    default:
  }
}
// 输入框设置数量
const changeStep = (e: any) => {
  if (e > 0) {
    betInfo.count = parseInt(e)
    setAllCoin()
  }
}
// 购买金额切换
const changeCoin = (item: any) => {
  betInfo.coin = item
}
// 知道预售规则
const knowPreSale = () => {
  isShowPreSale.value = false
  isCheckPreSale.value = true
}
// 点击提交金额
const submitBetting = () => {
  if (betInfo.count == 0) {
    return showFailToast(t('bteNoCount'))
  }
  if (!isCheckPreSale.value) {
    return showToast(t('agreePresaleRules'))
  }
  submitBettingData()
}
</script>

<style lang="scss" scoped>
.bet {
  &-body {
    padding: 25px 54px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    font-size: 24px;
    color: #323536;
    .l1 {
      font-size: 28px;
      color: #929292;
      span {
        color: #323536;
        font-weight: 500;
      }
    }
    .l2 {
      height: 50px;
      border-radius: 8px;
      line-height: 50px;
      text-align: center;
      border: 2px solid #cbebd6;
      background: #e6f2ea;
      color: #07962f;
      font-size: 28px;
      margin-bottom: 24px;
      span {
        font-weight: 500;
      }
    }
    .l3 {
      height: fit-content;
      display: flex;
      & > div {
        &.title {
          width: 138px;
          height: auto;
          display: flex;
          align-items: center;
        }
      }
      .amount {
        display: flex;
        gap: 24px;
        & > div {
          height: 72px;
          width: 108px;
          border-radius: 8px;
          border: 2px solid #e1e3f2;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .multiples {
        display: flex;
        gap: 14px;
        & > div {
          height: 72px;
          width: 72px;
          border-radius: 8px;
          border: 2px solid #e1e3f2;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .m {
        display: flex;
        gap: 24px;
        & > div {
          height: 72px;
          width: 108px;
          border-radius: 8px;
          border: 2px solid #e1e3f2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          &:active {
            background: #fd565c;
            color: #fff;
            border-color: #fd565c !important;
          }
        }
        & > input {
          width: 240px;
          height: 72px;
          border-radius: 8px;
          outline: none;
          border: none;
          color: #323536;
          font-weight: 500;
          background: #f3f4fa;
          text-align: center;
        }
      }
      .ball {
        width: 104px;
        height: 104px;
        background-size: 104px;
        background-position: center;
        background-repeat: no-repeat;
        $list: 0 1 2 3 4 5 6 7 8 9;
        @each $i in $list {
          &.b#{$i} {
            background-image: url('../img/b#{$i}.png');
          }
        }
      }
      .b10,
      .b11,
      .b12,
      .b13,
      .b14 {
        width: 120px;
        height: 80px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
      .b10 {
        background-color: #f0484b;
        box-shadow: 0px 4px 0px 0px #d5191d;
      }
      .b11 {
        background-color: #13c164;
        box-shadow: 0px 4px 0px 0px #08aa61;
      }
      .b12 {
        background-color: #b76bf2;
        box-shadow: 0px 4px 0px 0px #a043e8;
      }
      .b13 {
        background-color: #f8b460;
        box-shadow: 0px 4px 0px 0px #f49c30;
      }
      .b14 {
        background-color: #609dec;
        box-shadow: 0px 4px 0px 0px #2d7fe9;
      }
    }
    .l4 {
      display: flex;
      align-items: center;
      height: fit-content;
      gap: 24px;
      font-size: 28px;
      color: #323536;
      .true {
        border-radius: 8px;
        border: 1px solid #e1e3f2;
        background: #f2f1f1;
        color: #f2f1f1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        svg {
          width: 20px;
          height: 13px;
        }
      }
    }
    .active {
      background: #fd565c !important;
      color: #fff;
      border-color: #fd565c !important;
    }
  }
  &-foot {
    height: 100px;
    display: flex;
    text-align: center;
    font-size: 28px;
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-c {
      flex: 1;
      background: #eeeff5;
      color: #323536;
    }

    &-s {
      flex: 2;
      background: #fd565c;
      color: #fff;
      span {
        font-size: 32px;
        font-weight: 700;
        color: #fff;
      }
    }
  }
  &-PreSale {
    width: 600px;
    &-head {
      height: 88px;
      line-height: 88px;
      color: #fff;
      font-size: 32px;
      text-align: center;
      background: #fd565c;
      background-image: url('../img/bg1.png');
      background-position: top;
      background-size: contain;
    }

    &-body {
      max-height: 680px;
      overflow-y: auto;
      color: #323536;
      padding: 24px 30px;
      font-weight: 500;
      line-height: 40px;
      :deep(p) {
        line-height: 40px;
      }
    }

    &-foot {
      height: 140px;
      display: flex;
      justify-content: center;
      align-items: center;

      &-btn {
        width: 320px;
        background: #f3f4fa;
        border-radius: 40px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 28px;
        color: #323536;
        font-weight: 500;
      }
    }
  }
}
</style>
