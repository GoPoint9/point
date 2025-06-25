<template>
  <div class="Recharge__content">
    <!--  选择通道  -->
    <div v-if="!isLocakBank && !isArpay && !isHaveOrder && currentPayId !== 10" class="Recharge__content-quickInfo boxStyle">
      <div class="Recharge__content-quickInfo__title">
        <div class="title">
          <svg-icon name="quickpay2" />
          <p>{{ $t('RCTXT1') }}</p>
        </div>
      </div>
      <div class="rechargeTypes_list" :class="{ numberPay: isNumberPay }">
        <div
          v-for="(item, index) in store.rechargeTypes"
          :key="item.payTypeID"
          class="Recharge__content-quickInfo__item"
          :class="{ item_active: currentPayTypeId === item.payTypeID }"
          @click="handleSelectPayType(index)"
        >
          <div v-if="currentPayId !== 11" class="other">
            <div>{{ item.payName }}</div>
            <div>{{ $t('RCTXT2') }}{{ item.miniPrice }} - {{ formatNum(item.maxPrice) }}</div>
            <div v-if="item.rechargeRifts > 0" class="bouns">{{ bouns(item.rechargeRifts * 100) }}% bonus</div>
          </div>
          <div v-else class="usdt_icon">
            <img :src="getIcons('wallet', 'usdt')" alt="">
            <div>
              <div>{{ item.payName }}</div>
              <div>{{ $t('RCTXT2') }}{{ item.miniPrice }} - {{ formatNum(item.maxPrice) }}</div>
              <div v-if="item.rechargeRifts > 0" class="bouns">{{ bouns(item.rechargeRifts * 100) }}% bonus</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isOtherRecharge && store.thirdPayBankList.length > 0 && currentOtherThirdBankList.length > 0" class="other_bank">
      <div class="select_bank_tit"><svg-icon name="bank" />{{ $t('selectBank') }}</div>
      <div class="bank_name" @click="showOtherSelect = true">
        {{ store.selectOtherBank?.bankName }}
        <van-icon name="arrow" class="right_arrow" />
      </div>
    </div>
    <!-- 孟加拉的转账类型选择 -->
    <div v-if="dollarSign === '৳' && !isHaveOrder && currentPayId === 9" class="transfer boxStyle">
      <div class="title">
        <svg-icon name="transf_amount" />
        {{ $t('transferType') }}
      </div>
      <div class="transfer_list">
        <div class="item" :class="{ transfer_active: transfer === 1 }" @click="transfer = 1">
          <img :src="getIconsPublic('wallet/recharge', 'banktobank')" alt="">
          {{ $t('banktobank') }}
        </div>
        <div class="item" :class="{ transfer_active: transfer === 2 }" @click="transfer = 2">
          <img :src="getIconsPublic('wallet/recharge', 'wallettobank')" alt="">
          {{ $t('wallettobank') }}
        </div>
      </div>
    </div>

    <!-- 银行列表 -->
    <div v-if="isLocakBank && isSplitLocalEWallet && IsShowRechargeBankList && !isHaveOrder" class="bank_list">
      <div
        v-for="(item, index) in dollarSign === '৳' ? getTransferBankList : store.bankList"
        class="bank_item"
        :class="{ bank_item_active: store.currentBankIndex === index }"
        @click="handleSelectBank(index)"
      >
        <img v-lazy="item.bankLogo" alt="" :data-img="getIcons('wallet', 'slot_wallet')">
        {{ item.bankName }}
      </div>
    </div>

    <NoActivate v-if="!isArWalletActive && isArpay" page-type="wallet/recharge" />
    <!-- 充值金额选择 -->
    <div v-if="showRechargeMoneyBox" class="Recharge__content-paymoney boxStyle">
      <div class="Recharge__content-paymoney__title">
        <svg-icon v-if="!isNumberPay" name="saveWallet" />
        <img v-else :src="getIcons('wallet', numberKeyObj[currentPayId].icon)" alt="">
        <p v-if="!isNumberPay">{{ isArpay ? $t('arbRecharge') : $t('rechageAmount') }}</p>
        <p v-else>{{ numberKeyObj[currentPayId]?.selectText || '' }}</p>
      </div>
      <div class="Recharge__content-paymoney__money-list">
        <div
          v-for="(item, index) in store.quickList"
          :key="index"
          class="Recharge__content-paymoney__money-list__item"
          :class="store.currentQuickIndex === index ? activeClass : ''"
          @click="handleQuickSelect(index)"
        >
          <div class="amount" :class="{ arAmount: isArpay }">
            <img
              v-if="isNumberPay"
              :src="getIcons('wallet', numberKeyObj[currentPayId].icon)"
              alt=""
              class="usdt"
            >
            <span v-if="!isNumberPay && !isArpay">{{ dollarSign }}</span>
            {{ isArpay ? '₹' + formatNum(Number(item.rechargeAmount)) : formatNum(Number(item.rechargeAmount)) }}
          </div>
          <div v-if="isArpay && store.currentPayType?.rechargeRifts" class="ar_gift">
            {{ $t('k3WarningTip4') }} ₹
            <span>{{ formatNum(Number(store.currentPayType.rechargeRifts * (item || 0))) }}</span>
          </div>
          <div v-else-if="item.giftAmount" class="ar_gift">
            + {{ dollarSign }}
            <span>{{ formatNum(Number(item.giftAmount)) }}</span>
          </div>
        </div>
      </div>
      <div v-if="isNumberPay" class="Recharge__content-paymoney__money-input" :class="{ radius: isNumberPay }">
        <div class="place-div" :class="numberKeyObj[currentPayId].icon" />
        <van-field
          v-model.number="store.numberPayAmount"
          type="digit"
          :placeholder="numberKeyObj[currentPayId].placeholder"
          class="amount-input"
          @input="handleInput($event)"
        />
        <div class="place-right" @click="handleClearInput()">
          <img :src="getIconsPublic('wallet/recharge', 'clean')" alt="">
        </div>
      </div>
      <template v-if="currentPayId != 6">
        <div class="Recharge__content-paymoney__money-input" :class="{ radius: isNumberPay }">
          <div class="place-div">{{ dollarSign }}</div>
          <van-field
            v-if="isNumberPay"
            v-model.number="store.numberExchangeRate"
            :disabled="isNumberPay"
            type="digit"
            :placeholder="$t('enterAmount')"
            class="amount-input"
            @input="handleInput($event)"
          />
          <van-field
            v-else
            v-model.number="store.amount"
            type="digit"
            :placeholder="$t('enterAmount')"
            class="amount-input"
            @input="handleInput($event)"
          />
          <div v-if="currentPayId === 20" class="unit">
            {{ getC2CunitAmount }}
          </div>
          <div v-if="!isNumberPay && !isArpay" class="place-right" @click="handleClearInput()">
            <img :src="getIconsPublic('wallet/recharge', 'clean')" alt="">
          </div>
          <div v-if="isArpay" class="ar_all" @click="handleAll">{{ $t('withdrawStatem1') }}</div>
        </div>
      </template>
      <div v-if="store.validateAmount" class="recharge_tip">{{ store.validateAmount }}</div>

      <div
        v-if="!isHaveOrder || isOtherRecharge"
        v-throttle-click="{ handler: handleRecharge, wait: 2000 }"
        class="Recharge__container-rechageBtn"
        :class="store.rechargeSubmitBtnStatus ? 'rechage_active' : ''"
      >
        {{ $t('recharge') }}
      </div>
    </div>

    <div v-show="isHaveOrder" class="Recharge__content-waitPay boxStyle">
      <img :src="getIcons('wallet', 'tip')" alt="">
      <div class="wait_text">{{ $t('RCTXT3') }}</div>
      <div v-if="!isArpay" ref="countdownRef" class="Recharge__content-waitPay__countdown">
        <span>3</span>
        <span>0</span>
        <span>:</span>
        <span>0</span>
        <span>0</span>
      </div>
      <div class="go_pay" @click="checkCanPay">
        {{ $t('RCTXT4') }}
      </div>
    </div>

    <van-popup v-model:show="showOtherSelect" round position="bottom">
      <van-picker
        :columns-field-names="{ text: 'bankName', value: 'bankCode', children: 'children' }"
        :columns="currentOtherThirdBankList"
        @cancel="showOtherSelect = false"
        @confirm="confirmOtherSelectBank"
      />
    </van-popup>
  </div>
  <van-dialog v-model:show="showAmountError" :show-confirm-button="false" :width="327">
    <div class="showAmountError">
      <div class="title1">{{ $t('arb1') }}</div>
      <div class="title2">{{ $t('arb2') }}</div>
      <div class="title2 red">{{ $t('arb3', [arWallet?.withdrawalRewardRatio || 0]) }}</div>
      <div class="button">
        <div class="clance" @click="showAmountError = false">{{ $t('cancel') }}</div>
        <div class="goBuy" @click="handleWallet">{{ $t('arb4') }}</div>
      </div>
    </div>
  </van-dialog>
</template>

<script setup lang="ts">
import { getIcons, getIconsPublic, bouns } from '@/utils'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { SettingStore } from '@/stores'
import { useRecharge } from '@/hooks/useRecharge'
import { useArwallet } from '@/hooks'
import NoActivate from '../Withdraw/Ar/noActivate.vue'

const countdownRef = ref<HTMLElement>() // 倒计时dom

const {
  store,
  currentPayId,
  isLocakBank,
  isArpay,
  isNumberPay,
  isHaveOrder,
  currentPayTypeId,
  handleSelectPayType,
  numberKeyObj,
  handleQuickSelect,
  handleInput,
  getC2CunitAmount,
  handleClearInput,
  formatNum,
  setCountdownRef,
  getElwallett,
  isSplitLocalEWallet,
  handleSelectBank,
  IsShowRechargeBankList,
  showOtherSelect,
  confirmOtherSelectBank,
  isOtherRecharge,
  currentOtherThirdBankList,
  getTransferBankList,
  transfer,
  handleRecharge,
  showAmountError,
} = useRecharge()
const { arWallet, isArWalletActive, goWallet } = useArwallet()
const router = useRouter()
const dollarSign = computed(() => SettingStore().getDollarSign)
const activeClass = computed(() => (isArpay.value ? 'arActive' : 'active'))

onMounted(() => {
  setCountdownRef(countdownRef.value as HTMLElement)
})

const handleAll = () => {
  store.amount = 1000
  store.currentQuickIndex = -1
}

const showRechargeMoneyBox = computed(() => {
  if (isArpay.value) {
    if (isArWalletActive.value) {
      return true
    } else {
      return false
    }
  } else {
    return !isHaveOrder.value
  }
})

/**
 * 检查是否能支付
 */
const checkCanPay = async () => {
  const payTypeID = currentPayId.value === 18 ? getElwallett() : store.currentPayType.payTypeID
  if (currentPayId.value === 21) {
    window.location.href = store.isArPayOrder as unknown as string
  } else if (currentPayId.value === 12) {
    router.push({
      name: 'OtherPay',
      query: {
        type: 'upi',
      },
    })
  } else if (currentPayId.value === 19) {
    router.push({
      name: 'RechargeUsdt',
      query: {
        amount: store.numberPayAmount,
      },
    })
  } else {
    router.push({
      name: 'RechargeDetail',
      query: { currentPayId: currentPayId.value, payTypeId: payTypeID, amount: store.amount },
    })
  }
}
const handleWallet = () => {
  goWallet('wallet/recharge')
}
</script>

<style lang="scss" scoped>
:deep(.van-cell:after) {
  border: none;
}
.boxStyle {
  background: var(--darkBg, var(--bg_color_L2));
  border-radius: 20px;
  margin-top: 20px;
  padding: 30px 22px 32px 20px;
  margin-bottom: 30px;
}

.Recharge__content {
  &-paymoney {
    &__title {
      display: flex;
      font-weight: 600;
      font-size: 36px;
      margin-bottom: 26px;
      color: var(--darkTextW, var(--text_color_L1));

      .svg-icon,
      img {
        width: 48px;
        height: 48px;
        margin-right: 23px;
      }
    }

    &__money-list {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20px;

      &__item {
        margin-bottom: 20px;
        margin-right: 30px;
        width: calc((100% - 60px) / 3);
        border: 1px solid var(--Dividing-line_color);
        padding: 12px 0;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: var(--main-color);
        background-color: var(--bg_color_L2);

        .amount {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          font-size: 32px;
          gap: 10px;
          span {
            position: absolute;
            left: 16px;
            color: var(--text_color_L3);
            font-size: 32px;
            html:lang(ar) & {
              right: 16px;
              left: unset;
            }
          }

          .usdt {
            width: 36px;
            height: 36px;
          }

          .unit {
            width: 20px;
            height: 40px;
            margin-top: -20px;
          }
        }
        .arAmount {
          font-weight: 700;
        }
        .ar_gift {
          font-size: 20px;
          span {
            color: #ff5a58;
          }
        }

        &.active {
          background: var(--main_gradient-color);
          border-radius: 10px;
          color: var(--text_color_L4);
          border: none;
          span {
            color: #fff;
          }
        }
        &.arActive {
          background: var(--main_gradient-color);
          color: var(--text_color_L4);
          border: 1px solid var(--bg_color_L3);
          span {
            color: var(--text_color_L4);
          }
        }
      }

      &__item:nth-child(3n) {
        margin-right: 0;
      }
    }

    & .recharge_tip {
      margin-top: 10px;
      color: var(--norm_red-color);
      font-size: 22px;
    }

    &__money-input {
      position: relative;
      height: 88px;
      width: 100%;
      display: flex;
      background: var(--bg_color_L1);
      border-radius: 44px;

      &.radius {
        border-radius: 10px;
      }

      .unit {
        position: absolute;
        right: 80px;
        top: 26px;
        font-size: 28px;
        color: var(--text_color_L2);
        width: fit-content;
        flex: none;
        html:lang(ar) & {
          right: unset;
          left: 80px;
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
        html:lang(ar) & {
          right: 10px;
        }

        &::before {
          content: '';
          height: 40px;
          position: absolute;
          border-left: 1px solid #bdbdbd;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          html:lang(ar) & {
            right: unset;
            left: 0;
          }
        }

        &.usdt {
          background: url('@icon/wallet/usdt.png') no-repeat center;
          background-size: 48px;
        }
        &.trx {
          background: url('@icon/wallet/trx.png') no-repeat center;
          background-size: 48px;
        }
      }
      .amount-input {
        background-color: transparent;
        margin-left: 100px;
        :deep(input) {
          color: var(--main-color);
          font-weight: 700;

          &::placeholder {
            font-weight: 400;
          }
        }
      }
      .inp {
        width: 70%;
        height: 88px;
        background: none;
        border: none;
        //color: #A6A6A6;
        color: var(--main-color);
        letter-spacing: 0.04em;
        font-weight: 700;
        font-size: 30px;
        line-height: 88px;
        margin-left: 100px;
        padding-left: 20px;
        padding-bottom: 0px;

        &:focus {
          outline: none;
        }
      }

      .place-div {
        height: 88px;
        width: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--main-color);
        img {
          width: 28px;
          height: 46px;
        }

        .place-icon {
          width: 28px;
          height: 46px;
          position: relative;

          .usdt {
            width: 48px;
            height: 48px;
            margin-left: -10px;
          }
        }
      }

      .place-div::after {
        position: absolute;
        content: '';
        height: 40px;
        display: inline-block;
        margin: 0 10px 2px;
        vertical-align: middle;
        border-right: 2px solid var(--text_color_L3);
        top: 26px;
        right: -10px;
        html:lang(ar) & {
          right: unset;
          left: -10px;
        }
      }
      .ar_all {
        width: 100px;
        line-height: 88px;
        color: var(--main-color);
        font-size: 28px;
        margin-right: 40px;
      }
      .place-right {
        position: absolute;
        right: 24px;
        top: 24px;
        display: flex;
        align-content: center;
        justify-content: center;
        html:lang(ar) & {
          right: unset;
          left: 24px;
        }
        img {
          width: 40px;
          height: 40px;
        }
      }

      + .Recharge__content-paymoney__money-input {
        margin-top: 20px;
      }
    }
  }

  &-quickInfo {
    margin-bottom: 40px;
    &__title {
      width: 100%;
      display: flex;
      margin-bottom: 26px;
      align-items: center;

      .title {
        display: flex;
        font-weight: 400;
        font-size: 32px;
        color: var(--darkTextW, var(--text_color_L1));

        .svg-icon {
          width: 48px;
          height: 48px;
          margin-right: 23px;
        }
      }
    }

    .item_active {
      background: var(--main_gradient-color);

      div {
        color: var(--text_color_L4);
      }
    }
    .rechargeTypes_list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 20px;
    }
    .numberPay {
      grid-template-columns: repeat(1, 1fr);
    }
    &__item {
      background: var(--bg_color_L3);
      max-width: 98%;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 20px;

      div {
        font-size: 28px;
        color: var(--text_color_L2);
      }

      .other {
        padding-left: 26px;
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 20px 26px;
        line-height: 1.5;

        .bouns {
          font-size: 30px;
        }
      }

      .usdt_icon {
        padding: 20px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        line-height: 1.5;

        img {
          margin-left: 26px;
          width: 80px;
          height: 80px;
          margin-right: 26px;
        }
      }
    }
  }

  &-history {
    &__title {
      display: flex;
      font-weight: 600;
      font-size: 36px;
      margin-bottom: 56px;

      img {
        width: 48px;
        height: 48px;
        margin-right: 23px;
      }
    }

    &__item {
      padding-bottom: 24px;
      border-bottom: 1px solid #daddf0;
      margin-bottom: 26px;

      .info1 {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 22px;

        .left {
          display: flex;
          align-items: flex-end;

          span {
            margin-right: 18px;
          }

          span:nth-child(1) {
            width: 160px;
            height: 40px;
            background: #ff8581;
            border-radius: 10px;
            color: #fff;
            line-height: 40px;
            text-align: center;
          }

          span:nth-child(2),
          span:nth-child(3) {
            font-weight: 400;
            font-size: 24px;
            line-height: 28px;
            color: #aeb0c6;
          }
        }

        .right {
          font-weight: 500;
          font-size: 28px;
          line-height: 34px;
        }

        .danger {
          color: #f65c5c;
        }

        .success {
          color: #49ce9b;
        }

        .cancle {
          color: var(--text_color_L2);
        }
      }

      .info2 {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .orderCode {
          display: flex;
          font-weight: 400;
          font-size: 24px;
          line-height: 28px;
          color: var(--text_color_L2);

          img {
            margin-left: 50px;
            width: 32px;
            height: 32px;
          }
        }

        .money {
          font-weight: 500;
          font-size: 28px;
          line-height: 34px;
          color: var(--text_color_L1);
        }
      }
    }

    &__item:last-child {
      border: none;
      margin-bottom: 0;
    }
  }

  &-waitPay {
    padding-bottom: 40px;

    img {
      display: block;
      width: 80px;
      height: 80px;
      margin: 0 auto 14px;
    }

    & .wait_text {
      height: 68px;
      line-height: 34px;
      text-align: center;
      font-size: 28px;
      color: var(--text_color_L1);
      margin-bottom: 20px;
    }

    &__countdown {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      width: 100%;
      margin-bottom: 30px;

      span {
        display: inline-block;
        width: 60px;
        height: 80px;
        color: var(--norm_red-color);
        font-size: 48px;
        line-height: 80px;
        border-radius: 10px;
        background: var(--bg_color_L3);
        text-align: center;

        &:nth-of-type(3) {
          width: 40px;
        }
      }
    }

    & .go_pay {
      width: 474px;
      height: 70px;
      margin: 0 auto;
      background: var(--main_gradient-color);
      border-radius: 80px;
      color: #fff;
      font-size: 30px;
      text-align: center;
      line-height: 70px;
    }
  }
  .other_bank {
    margin-bottom: 40px;
    .select_bank_tit {
      color: var(--text_color_L1);
      line-height: 48px;
      margin-bottom: 20px;

      .svg-icon {
        width: 48px;
        height: 48px;
        margin-right: 23px;
      }
    }
    .bank_name {
      background: var(--main_gradient-color);
      height: 80px;
      line-height: 80px;
      color: var(--text_color_L4);
      padding-left: 20px;
      font-size: 28px;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .right_arrow {
        margin-right: 20px;
      }
    }
  }

  .transfer {
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 22px;
      img,
      svg {
        width: 48px;
        height: 48px;
        margin-right: 18px;
      }
      color: var(--text_color_L1);
      font-weight: 600;
      font-size: 36px;
    }
    .transfer_list {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item {
        width: 320px;
        height: 120px;
        background: #e1e1e1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        font-size: 28px;
        color: var(--text_color_L2);
        img {
          width: 126px;
          height: 42px;
          margin-bottom: 8px;
        }
      }
      .transfer_active {
        background: var(--main_gradient-color);
        color: #fff;
      }
    }
  }
}
.bank_list {
  width: 100%;
  .bank_item {
    height: 88px;
    border-radius: 10px;
    margin-bottom: 16px;
    line-height: 88px;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    padding-left: 20px;
    background-color: var(--bgDark-3, var(--bg_color_L2));
    display: flex;
    align-items: center;
    color: var(--text_color_L1);
    img {
      width: 48px;
      height: 48px;
      margin-right: 10px;
    }
  }
  .bank_item_active {
    background: var(--main_gradient-color);
    color: var(--text_color_L4);
    font-weight: 700;
  }
}
.Recharge__container-rechageBtn {
  margin-top: 50px;
  font-size: 30px;
  z-index: 88;
  background: var(--button_dis_color);
  width: 100%;
  max-width: 750px;
  height: 70px;
  line-height: 70px;
  color: var(--text_color_L2);
  text-align: center;
  border-radius: 50px;
  margin-bottom: 30px;
}
.rechage_active {
  background: var(--main_gradient-color);
  color: var(--text_color_L4);
}
.showAmountError {
  padding: 60px 30px 30px 30px;
  width: 100%;
  .title1 {
    font-size: 48px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
  }
  .title2 {
    font-size: 28px;
    text-align: center;
    line-height: 36px;
    &.red {
      color: var(--main_gradient-color);
    }
  }
  .button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    & > div {
      width: calc((100% - 20px) / 2);
      height: 96px;
      line-height: 96px;
      border-radius: 50px;
      font-size: 30px;
      text-align: center;
      &.clance {
        border: 1px solid var(--main-color);
        color: var(--main-color);
      }
      &.goBuy {
        background: var(--main-color);
        color: #fff;
      }
    }
  }
}
</style>
