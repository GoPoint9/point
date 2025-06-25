<template>
  <div v-show="[1, 2, 6, 8, 5].includes(data.type)" class="explain">
    <div class="input">
      <div class="place-div">
        {{ dollarSign }}
      </div>
      <input
        v-model="amount"
        :placeholder="$t('enterAmount')"
        class="inp"
        @input="changeQuickInput()"
        @keypress="onValidatePress($event)"
      >
    </div>
    <div v-if="showValidate" class="verify">
      {{ validateTxt }}
    </div>
    <div class="balance bank">
      <div>
        <span>{{ $t('wfDesc1') }}
          <h6 class="yellow">{{ currency(withdrawalsrule.canWithdrawAmount || 0) }}</h6>
        </span>
        <input type="button" :value="$t('all')" @click="onGetAllAmount">
      </div>
      <div>
        <span>{{ $t('wfDesc2') }}</span>
        <div class="rightD">
          <span class="yellow">{{ currency(dz) }}</span>
        </div>
      </div>
    </div>
  </div>

  <div v-show="[3, 10].includes(data.type)" class="explain usdt">
    <div class="head">
      <img :src="getIcons('wallet/withdrawType', String(data.type))">
      <h1 v-if="data.type == 3">{{ $t('selectUSDTNum') }}</h1>
      <h1 v-if="data.type == 10">{{ $t('selectUSDTAmount') }}</h1>
    </div>
    <div class="input">
      <div class="place-div">
        {{ dollarSign }}
      </div>
      <input
        v-model="amount"
        type="number"
        :placeholder="$t('enterWithdrawAmount')"
        class="inp"
        @input="calculatedCount"
        @keypress="onValidatePress1($event)"
      >
    </div>
    <div v-if="showValidate" class="verify">
      {{ validateTxt }}
    </div>
    <div v-if="showValidateUB" class="verify">{{ $t('wfDesc4') }}</div>
    <div v-if="[3].includes(data.type)" class="input">
      <input
        v-model="usdtCountC"
        type="number"
        :placeholder="$t('enterUSDTAmount')"
        class="inp"
        @input="calculatedAmount"
        @keypress="onValidatePress1($event)"
        @focus="onDelDecimal"
      >
      <div class="place-div">
        <div class="place-icon">
          <img :src="getIcons('wallet/withdrawType', '3')">
        </div>
      </div>
    </div>

    <div class="balance usdt">
      <div>
        <span>{{ $t('wfDesc5') }}
          <h6 class="yellow">{{ currency(withdrawalsrule.canWithdrawAmount || 0) }}</h6>
        </span>
        <input type="button" :value="$t('all')" @click="onGetAllAmount">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef, computed } from 'vue'
import { getIcons, currency } from '@/utils'
import type { ReqNewSetWithdrawal, withdrawalsruleList } from '@/types/api'
import { SettingStore } from '@/stores'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const dollarSign = computed(() => SettingStore().getDollarSign)
const props = withDefaults(
  defineProps<{
    data_NewSetWithdrawal: ReqNewSetWithdrawal // 提现参数
    withdrawalsrule: withdrawalsruleList // 当前提现方式下的提现规则
  }>(),
  {}
)

// usdt数量
const usdtCount = ref(0)
const usdtCountC = computed({
  get (): any {
    return usdtCount.value != 0 ? usdtCount.value : ''
  },
  set (val: any) {
    usdtCount.value = val
  },
})
const data = toRef(props, 'data_NewSetWithdrawal')
const amount = computed({
  get (): any {
    return data.value.amount != 0 ? data.value.amount : ''
  },
  set (val: any) {
    data.value.amount = val
  },
})

// 银行卡方式下，验证可提现余额不足提示文本状态
const showValidate = computed(() => {
  if (data.value.amount != 0) {
    if (data.value.amount > props.withdrawalsrule.canWithdrawAmount) return true
    if (data.value.amount > props.withdrawalsrule.maxPrice || data.value.amount < props.withdrawalsrule.minPrice) return true
    if (props.withdrawalsrule.amountofCode > 0) return true
  }
  return false
})

// 提示文本
const validateTxt = computed(() => {
  if (data.value.amount != 0) {
    if (props.withdrawalsrule.amountofCode > 0) {
      return t('code128')
    } else if (data.value.amount > props.withdrawalsrule.canWithdrawAmount) {
      return t('cashBalanceInsufficient')
    } else if (data.value.amount > props.withdrawalsrule.maxPrice || data.value.amount < props.withdrawalsrule.minPrice) {
      return t('wordWithdrawal', [currency(props.withdrawalsrule.minPrice), currency(props.withdrawalsrule.maxPrice)])
    }
  }
})

// usdt方式下，验证可提现usdt数量不足提示文本状态
const showValidateUB = computed(() => {
  if (data.value.type === 3 && data.value.amount != 0 && Number(data.value.amount) < 10) {
    return true
  } else {
    return false
  }
})

function onValidatePress (oEvent: any) {
  if (oEvent.keyCode != 46 && (oEvent.keyCode < 48 || oEvent.keyCode > 57)) oEvent.returnValue = false
}

function onValidatePress1 (oEvent: any) {
  if (oEvent.keyCode < 48 || oEvent.keyCode > 57) oEvent.returnValue = false
}

// 控制金额的输入
function changeQuickInput () {
  data.value.amount = Number(
    data.value.amount
      .toString()
      .replace(/[^\d.]/g, '')
      .replace(/^\./g, '')
      .replace(/\.{2,}/g, '.')
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.')
  )
  if (data.value.amount.toString().length > 11) {
    data.value.amount = Number(data.value.amount.toString().slice(0, 11))
  }
}

// 点全部按钮，填充全部金额到金额输入框
function onGetAllAmount () {
  data.value.amount = Math.floor(props.withdrawalsrule.canWithdrawAmount)
  if (data.value.type === 3) {
    calculatedCount()
  }
}

function onDelDecimal () {
  usdtCount.value = Math.floor(usdtCount.value)
}
// 输入金额计算数量
function calculatedCount () {
  data.value.amount = Number(
    data.value.amount
      .toString()
      .replace(/[^\d.]/g, '')
      .replace(/\.{2,}/g, '.')
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.')
      .replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      .replace(/^\./g, '')
  )

  if (data.value.amount.toString().length > 11) {
    data.value.amount = Number(data.value.amount.toString().slice(0, 11))
  }

  if (data.value.amount > 0) {
    const countN = Number(data.value.amount) / props.withdrawalsrule.uRate
    usdtCount.value = Math.floor(countN * 100) / 100
  } else {
    usdtCount.value = 0
  }
}

// 输入数量计算金额
function calculatedAmount () {
  if (usdtCount.value.toString().length > 11) {
    usdtCount.value = Number(usdtCount.value.toString().slice(0, 11))
  }
  if (usdtCount.value > 0) {
    const amountN = usdtCount.value * props.withdrawalsrule.uRate
    data.value.amount = Math.floor(Math.floor(amountN * 100) / 100)
  } else {
    data.value.amount = 0
  }
}

// 到账项目
const dz = computed(() => {
  if (!data.value.amount) return 0
  const { withMinPrice = 0, withMaxPrice = 0, fee } = props.withdrawalsrule
  if (fee > 0 && withMinPrice <= data.value.amount && data.value.amount <= withMaxPrice) {
    return data.value.amount - data.value.amount * fee
  }
  return data.value.amount
})
defineExpose({
  usdtCount,
  data,
  showValidate,
  showValidateUB,
})
</script>
<style lang="scss" scoped>
input {
  outline: none;
}

h6 {
  display: inline;
}

span.yellow,
h6.yellow {
  color: var(--norm_secondary-color);
}

span.red,
h6.red {
  color: var(--norm_red-color);
}

.explain {
  background: var(--darkBg, var(--bg_color_L2));
  box-shadow: var(--BoxShadowColor-9);
  border-radius: 20px 20px 0 0;
  padding: 25px 20px 0;

  .input {
    justify-content: space-between;
    background: var(--bg_color_L1);
    border-radius: 60px;
    height: 88px;
    padding: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    span {
      color: var(--main-color);
      letter-spacing: 0.04em;
      font-weight: 900;
      font-size: 42px;
      line-height: 42px;
      width: 90px;
      position: relative;

      &::after {
        position: absolute;
        content: '';
        height: 40px;
        display: inline-block;
        margin: 0 10px 2px;
        vertical-align: middle;
        border-right: 2px solid var(--darkLight2, var(--gray-color-1));
        top: 2px;
        right: -10px;
      }
    }

    .place-div {
      position: absolute;
      height: 88px;
      width: 60px;

      color: var(--main-color);
      font-weight: 900;
      font-size: 42px;
      line-height: 88px;

      &::after {
        position: absolute;
        content: '';
        height: 40px;
        display: inline-block;
        margin: 0 10px 2px;
        vertical-align: middle;
        border-right: 2px solid var(--darkLight2, var(--gray-color-1));
        top: 26px;
        right: -30px;
        html:lang(ar) & {
          left: -30px;
          right: auto;
        }
      }
    }

    img {
      width: auto;
      height: 45px;
      margin-top: 20px;
      //margin-left: 10px;
    }

    input {
      width: 70%;
      height: 30px;
      background: none;
      border: none;
      //color: var(--gray-color-1);
      color: var(--main-color);
      letter-spacing: 0.04em;
      font-weight: 700;
      //font-size: 30px;
      line-height: 30px;
      margin-inline-start: 100px;
      padding-left: 20px;
      padding-bottom: 0px;

      &::placeholder {
        color: var(--gray-color-1);
        line-height: 30px;
        font-size: 28px;
        font-weight: 400;
      }
    }
  }

  .balance {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    align-items: center;
    font-weight: 400;
    font-size: 22px;

    flex-direction: column;
    margin-left: 5px;

    > div {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin: 5px 0;
      align-items: center;

      span {
        text-align: left;
        //margin-left: 40px;
      }

      input {
        border: 1px solid var(--main-color);
        border-radius: 10px;
        width: 146px;
        height: 36px;
        line-height: 22px;
        background: none;
        color: var(--main-color);
      }

      .rightD {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 30px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;

        img {
          width: 32px;
          height: auto;
          margin-right: 10px;
        }
      }
    }

    &.bank {
      color: var(--text_color_L2);

      // >div:nth-of-type(1) {
      // 	span {
      // 		margin-left: 30px;
      // 		color: var(--main-color);
      // 	}
      // }
    }

    &.usdt {
      color: var(--main-color);
    }
  }

  .verify {
    color: var(--norm_red-color);
    font-size: 22px;
    letter-spacing: 0.04em;
    //background-size: cover;
    height: 40px;
    text-align: left;
    margin: 10px 40px;
    align-items: center;
    display: flex;

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
}

.explain.usdt {
  .head {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;

    img {
      width: 48px;
      height: auto;
      margin-right: 20px;
    }

    h1 {
      color: var(--text_color_L1);
      font-weight: 400;
      font-size: 32px;
    }
  }

  .input {
    border-radius: 10px;
  }
}
</style>
