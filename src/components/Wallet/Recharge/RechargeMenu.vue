<template>
  <div>
    <div
      v-if="arPay"
      class="new_upi"
      :class="{ upi_active: store.currentMenu === -1 }"
      @click="handleChangeMenu(-1)"
    >
      <img :src="arPay.payNameUrl" alt="">
      <div class="upi_item">
        <div class="title">{{ arPay.payName }}</div>
        <div v-if="arPay?.maxRechargeRifts" class="upi_image">+{{ arPay?.maxRechargeRifts * 100 }}%</div>
        <div v-if="arPay.maxRechargeRifts" class="gift">
          {{ t('arGift', [accMul(arPay.maxRechargeRifts || 0, 100) + '%']) }}
        </div>
        <div v-if="arPay?.maxRechargeRifts" class="upi_image">+{{ arPay?.maxRechargeRifts * 100 }}%</div>
      </div>
    </div>
    <div class="Recharge__container-tabcard">
      <div
        v-for="(item, index) in getPayTabList"
        :key="index"
        class="Recharge__container-tabcard__items"
        :class="{ active: index === store.currentMenu }"
        @click="handleChangeMenu(index)"
      >
        <div class="centers">
          <div v-if="item.maxRechargeRifts && item.maxRechargeRifts > 0" class="gift">
            <span>+{{ bouns(item?.maxRechargeRifts * 100) }}%</span>
          </div>
          <div class="Recharge__container-tabcard__top">
            <img class="img" :src="index === store.currentMenu ? item.payNameUrl2 : item.payNameUrl" alt="">
          </div>
          <div class="Recharge__container-tabcard__bot">
            {{ item.payName }}
            <!-- <span v-if="item.maxRechargeRifts && item.maxRechargeRifts > 0">{{ item?.maxRechargeRifts * 100 }}%</span> -->
          </div>
        </div>
      </div>
    </div>

    <div v-if="arPay && store.currentMenu === -1">
      <div class="rule" @click="onTradRule()">
        <div class="left">
          <svg-icon name="arpay1" />
          <p>{{ $t('arbTip1') }}</p>
        </div>
        <div class="right">{{ $t('checkOver') }}<van-icon name="arrow" /></div>
      </div>
      <div class="ar_wallet">
        <div class="info">
          <img :src="arPay.payNameUrl" alt="">
          <div>
            <div v-if="isArWalletActive" class="tit">
              {{ t('arbTip13') }}
            </div>
            <div v-if="!isArWalletActive" class="tip">{{ $t('arNoActive') }}</div>
            <div v-else class="wallet_amount">{{ arWallet?.balance || 0 }}<span>ARB</span></div>
          </div>
        </div>
        <div class="ar_btn" @click="handleWallet">{{ isArWalletActive ? t('comminWallet') : t('arActive') }}</div>
      </div>
      <!-- <div class="ar_wallet_tip">{{ $t('arTip') }}</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { accMul, bouns, getIcons } from '@/utils'
import { useRecharge } from '@/hooks/useRecharge'
import { useArwallet } from '@/hooks'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { closeToast, showLoadingToast } from 'vant'
import { useI18n } from 'vue-i18n'

const { store, handleChangeMenu, getPayTabList, arPay, currentPayId } = useRecharge()

const { isArWalletActive, arWallet, getInfo, goWallet, goActive } = useArwallet()
const { t } = useI18n()
const router = useRouter()

const handleWallet = () => {
  if (isArWalletActive.value) {
    goWallet('wallet/recharge')
  } else {
    goActive('wallet/recharge')
  }
}

const onTradRule = () => {
  const returnUrl = encodeURIComponent('https://' + window.location.host + '/#/' + 'main')
  const language = localStorage.getItem('language')
  const url = `https://arbpay.me/#/TradRules?lang=${language}&returnUrl=${returnUrl}`
  window.location.href = url
}

watch(
  () => currentPayId.value,
  async (val) => {
    if (val === 21) {
      showLoadingToast({
        message: t('loading') + '...',
        forbidClick: true,
      })
      await getInfo()
      store.arPayInfo = arWallet.value
      closeToast()
    }
  },
  {
    immediate: true,
  }
)
</script>

<style lang="scss" scoped>
.Recharge__container-tabcard {
  margin-top: 30px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  .centers {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__items {
    width: 100%;
    height: 180px;
    background: var(--bgDark-2, var(--bg_color_L2));
    color: var(--text_color_L2);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    /* justify-content: center; */

    .gift {
      width: 71px;
      height: 64px;
      position: absolute;
      right: 4px;
      top: 0;
      background: url('@icon/wallet/gift.png') no-repeat center center;
      background-size: 71px auto;
      span {
        display: block;
        color: #fff;
        font-size: 22px;
        letter-spacing: -0.88px;
        text-align: center;
        padding-top: 24px;
      }
    }
    &.active {
      background: var(--main_gradient-color);
      color: var(--text_color_L4);
    }

    .Recharge__container-tabcard__bot {
      font-size: 24px;
      text-align: center;
    }

    .mgt24 {
      margin-top: 24px;
    }

    /* &:nth-child(5) img {
    width: 62px;
    height: 62px;
  } */
  }

  &__top {
    flex: none;
    width: 70px;
    height: 70px;
    margin: 23px auto 10px;

    img {
      width: 100%;
      height: 100%;
    }

    .lists {
      display: flex;
      align-items: center;

      svg {
        /* margin-right: 12px; */
        width: 42px;
        margin-right: 10px;
      }

      svg:nth-child(2) {
        width: 33px;
        height: 52px;
      }
    }
  }
}

.new_upi {
  margin-top: 30px;
  display: flex;
  align-items: center;
  background: var(--bgDark-2, var(--bg_color_L2));
  border-radius: 20px;
  padding: 20px 18px;
  position: relative;

  img {
    width: 80px;
    height: 80px;
    margin-right: 30px;
  }

  .upi_item {
    color: var(--text_color_L1);
    display: flex;
    height: 100px;
    width: auto;
    flex-direction: column;
    // justify-content: space-between;

    // align-items: center;

    .title {
      font-size: 30px;
      margin-bottom: 18px;
    }

    .upi_image {
      display: flex;
      justify-content: center;
      align-items: center;
      background: url('@/assets/icons/svg/ArPayBackground.svg') no-repeat center center;
      background-size: cover;
      width: fit-content;
      height: 46px;
      color: #fff;
      font-size: 22px;
      position: absolute;
      right: 10px;
      top: 0;
      padding: 5px 20px;
      &::before {
        content: '';
        display: block;
        width: 22px;
        height: 22px;
        background: url('@icon/wallet/Ar_Gift.svg') no-repeat center center;
        background-size: cover;
        margin-right: 10px;
      }
    }
  }
}

.upi_active {
  background: var(--main_gradient-color);

  .upi_item {
    color: #fff;

    .gift {
      color: #fff;
    }
  }
}

.ar_wallet {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  border-radius: 10px;
  background: var(--bg_color_L2);
  margin-bottom: 32px;
  padding: 10px 24px;
  .info {
    display: flex;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      margin-right: 10px;
    }
    .tip {
      color: var(--text_color_L1);
      font-size: 24px;
    }
    .tit {
      color: var(--text_color_L1);
      span {
        color: #999;
        font-size: 24px;
        font-weight: 400;
      }
    }
    .wallet_amount {
      color: var(--text_color_L1);
      font-size: 28px;
      font-weight: 700;
      vertical-align: bottom;
      span {
        color: var(--text_color_L1);
        font-size: 24px;
        font-weight: 700;
      }
    }
  }
  .ar_btn {
    padding: 18px;
    border-radius: 10px;
    background: var(--main_gradient-color);
    color: var(--text_color_L4);
    font-size: 24px;
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    flex: none;
  }
}
.ar_wallet_tip {
  background: url('@icon/wallet/hint.png') no-repeat 0px 4px;
  background-size: 22px 22px;
  padding-left: 26px;
  color: var(--main-color);
  font-size: 20px;
  font-weight: 400;
}
.rule {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 10px;
  background: var(--bg_color_L2);
  color: var(--text_color_L1);
  .left {
    display: flex;
    align-items: center;
    gap: 20px;
    color: var(--text_color_L1);
    svg {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
