<template>
  <div class="totalSavings__container">
    <div class="totalSavings__container-header">
      <div class="totalSavings__container-header-box ar-1px-b">
        <div class="totalSavings__container-header__title">
          <span>{{ $t('totalBalance') }}</span>
          <!-- <img v-lazy="getIcons('main', 'balanceIcon')" alt="" /> -->
        </div>
        <p class="totalSavings__container-header__subtitle">
          <span>{{ currency(money) }}</span>
          <svg-icon v-throttle-click="{ handler: onGetWallet, wait: 500 }" name="refreshBalance" />
        </p>
      </div>
    </div>
    <div class="totalSavings__container-content">
      <div v-if="isARPay" class="totalSavings__container-content-item" @click="handleArWallet">
        <div>
          <svg-icon name="wallets" />
          <span>AR{{ $t('wallet') }}</span>
        </div>
      </div>
      <div v-else class="totalSavings__container-content-item" @click="goPath('wallet')">
        <div>
          <svg-icon name="wallets" />
          <span>{{ $t('wallet') }}</span>
        </div>
      </div>
      <div class="totalSavings__container-content-item" @click="goPath('Recharge')">
        <div>
          <svg-icon name="rechargeIcon" />
          <span>{{ $t('recharge') }}</span>
        </div>
      </div>
      <div class="totalSavings__container-content-item" @click="goPath('Withdraw')">
        <div>
          <svg-icon name="widthdrawBlue" />
          <span>{{ $t('withdraw') }}</span>
        </div>
      </div>
      <div class="totalSavings__container-content-item" @click="goPath('vip')">
        <div>
          <svg-icon name="VipIcon" />
          <span>VIP</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserInfo } from '@/types/api'
import { currency, getIcons } from '@/utils'
import { useRouter } from 'vue-router'
import { useWalletStore } from '@/stores'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useArwallet } from '@/hooks'
const router = useRouter()
const walletStore = useWalletStore()
const { t: $t } = useI18n()
const props = withDefaults(
  defineProps<{
    userInfo: UserInfo
  }>(),
  {}
)

const { goWallet, isArWalletActive, goActive, getInfo } = useArwallet()
const isARPay = ref(false)
const goPath = (name: string) => {
  router.push({
    name,
  })
}

const handleArWallet = async () => {
  if (isARPay.value) {
    await getInfo()
  } else {
    return
  }
  if (isArWalletActive.value) {
    goWallet('main')
  } else {
    goActive('main')
  }
}

const money = computed(() => walletStore.getAmount)
async function onGetWallet () {
  walletStore.resetData(false, true) // 参数1，是否弹提示，参数2，是否可以回收余额
}
onMounted(() => {
  isARPay.value = sessionStorage.getItem('ar_pay') === '1'
})
</script>

<style lang="scss" scoped>
.totalSavings__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 100%;
  height: 315px;
  border-radius: 20px;
  background: var(--light-bg_white, var(--bg_color_L3));

  &-content {
    display: flex;
    align-items: center;
    width: 100%;
    padding-block: 26px;
  }

  &-header {
    width: 100%;
    padding: 28px 39px 0 27px;

    &-box {
      padding-bottom: 20px;
      /* border-bottom: 1px solid #e6e8e8; */
    }

    &__title {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;

      span {
        font-weight: 400;
        font-size: 28px;
        color: var(--text_color_L2);
      }

      img {
        width: 40px;
        height: 40px;
      }
    }

    &__subtitle {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      column-gap: 24px;
      width: 100%;
      margin-top: 15px;
      font-size: 36px;
      font-weight: bold;
      color: var(--text_color_L1);

      /* span {
				margin: 0 15px;
			} */

      img {
        width: 38px;
      }
    }
  }

  &-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    padding: 30px 20px;

    &-item {
      // width: 25%;
      display: flex;
      justify-content: center;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;

        svg {
          min-width: 60px;
          min-height: 60px;
        }

        span {
          margin: 10px 0;
          font-size: 28px;
          color: var(--text_color_L1);
          text-align: center;
        }
      }
    }
  }
}
</style>
