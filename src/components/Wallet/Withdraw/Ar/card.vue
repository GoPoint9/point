<template>
  <div class="arType">
    <div class="rule" @click="onTradRule()">
      <div class="left">
        <svg-icon name="arpay1" />
        <p>{{ $t('arbTip1') }}</p>
      </div>
      <div class="right">{{ $t('checkOver') }}<van-icon name="arrow" /></div>
    </div>
    <template v-if="arWallet?.walletActivationStatus == 1">
      <div v-if="[21].includes(data_NewSetWithdrawalH.type)" class="arCard">
        <div class="left">
          <img :src="getIcons('wallet/withdrawType', `${data_NewSetWithdrawalH.type}`)">
          <p>
            <span>{{ $t('arbTip13') }}</span>
            <span class="amount">{{ arWallet?.balance || 0 }} ARB</span>
          </p>
        </div>
        <div class="right" @click="goWallet('wallet/withdraw')">{{ $t('comminWallet') }}</div>
      </div>
      <arField ref="arFieldRef">
        <div class="recycleBtnD c2c">
          <button
            class="recycleBtn"
            :class="{ active: isActiveC }"
            @click="
              () => {
                emit('onShowPwdD')
              }
            "
          >
            {{ $t('withdraw') }}
          </button>
        </div>
      </arField>
      <WithdrawHistory />
    </template>
    <NoActivate v-else page-type="wallet/Withdraw" />
  </div>
</template>
<script setup lang="ts">
import { getIcons } from '@/utils'
import arField from '@/components/Wallet/Withdraw/Ar/arField.vue'
import NoActivate from '@/components/Wallet/Withdraw/Ar/noActivate.vue'
import WithdrawHistory from '@/components/Wallet/Withdraw/WithdrawHistory.vue'
import { useWithdraw, useArwallet } from '@/hooks'
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['onShowPwdD'])
const { data_NewSetWithdrawalH, withdrawalTypeslist } = useWithdraw()
const { getInfo, arWallet, goWallet } = useArwallet()
const arFieldRef = ref()
const isActiveC = computed(() => {
  const ruleType_3 = [21]
  if (ruleType_3.includes(data_NewSetWithdrawalH.value.type) && data_NewSetWithdrawalH.value.amount > 0) {
    if (data_NewSetWithdrawalH.value.amount < 1) return false
    if (arFieldRef.value?.validateTxt.length > 0) return false
    if (data_NewSetWithdrawalH.value.bid == 0) return false
    if (arWallet.value?.walletActivationStatus != 1) return false
    return true
  }
})

const onTradRule = () => {
  const returnUrl = encodeURIComponent('https://' + window.location.host + '/#/' + 'main')
  const language = localStorage.getItem('language')
  const url = `https://arbpay.me/#/TradRules?type=1&lang=${language}&returnUrl=${returnUrl}`
  window.location.href = url
}

onMounted(() => {
  getInfo()
})

defineExpose({
  isActiveC,
})
</script>
<style lang="scss" scoped>
@import '@/assets/styles/withdraw';
.arType {
  .rule {
    @include baseBox;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    margin-bottom: 30px;
    .left {
      display: flex;
      align-items: center;
      gap: 20px;
      svg {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
