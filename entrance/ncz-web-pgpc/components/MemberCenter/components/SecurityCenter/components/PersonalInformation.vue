<script setup lang="tsx">
import { $t } from '@/languages'
import { onCopyText } from '@/NCZ/utils'
// import { usePersonalLevel } from '@/NCZ/hooks'

import { currency } from '@/utils'

// const { allGradeList, userGrade, userGradeGrow } = usePersonalLevel()

const userStore = useUserStore()
const globalStore = GlobalStore()
const userInfo = computed(() => userStore.userInfo)

const showBalance = ref(true)
const onRefreshBalance = () => userStore.GetUserBanlance() // 更新餘額
const onToggleEyes = () => { showBalance.value = !showBalance.value }
const BanlanceAmount = defineComponent({
  render () {
    const [integer, decimal] = (userStore.balance ?? '0.00').split('.')
    const vNode = showBalance.value
      ? [`${integer}.`, <small style="font-size:70%;color:inherit;">{ decimal }</small>]
      : '-'
    return <span class="balance-amount">{ vNode }</span>
  },
})

</script>
<template>
  <div
    class="PersonalInformation information-wrap personal-information js_personal"
    :class="[`lv${userInfo.vipUserLevel}`]"
  >
    <div class="information-top">
      <div class="vipicon hide_XXXXXXXXX" />
      <div class="upper-right">
        <div class="first-name active">
          <img class="w-full" :src="userInfo.userImgPath">
        </div>
        <div class="info-left">
          <div class="info-level-wrap">
            <div class="vip-label hide_XXXXXXXXX">
              <span class="vipicon" />
              <span class="level-name">{{ userInfo.userLevel }}</span>
            </div>
            <span class="info-siginin hide_XXXXXXXXX" />
          </div>
          <div class="nickname-wrap">
            <label class="ellipsis information-nickname">{{ userInfo.nickName }}</label>
            <div class="edit-icon" />
          </div>
          <div class="loginname-wrap">
            <span>UID:{{ userInfo.loginName }}</span>
            <div class="copy-btn cursor-pointer" @click="onCopyText(userInfo.loginName)">
              <svg-icon name="icon-edit" />
            </div>
          </div>

          <!-- 加入時間 -->
          <!-- <div class="regdate-wrap">
            <span class="regdate-icon" />
            <span class="join-title">{{ $t('activity_signed') }}</span>
            <label data-key="regDate" class="ellipsis information-regDate">{{ userInfo.lastLoginTime }}</label>
          </div> -->
        </div>
      </div>
    </div>
    <div class="copy-wrap">
      <div class="copy-btn">
        <label class="username-copy">{{ userInfo.nickName }}</label>
        <div class="copy-icon" />
      </div>
    </div>
    <div class="information-money">
      <div class="amount-wrap">
        <div class="money-view js_sumBalance">
          <span class="symbol front">{{ globalStore.currencySymbol }}</span>
          <BanlanceAmount />
        </div>
        <div id="refresh" :class="['refresh', { 'processing': userStore.isLoadingBalance }]" @click="onRefreshBalance" />
        <div :class="['eyes-icon', { 'icon-eyes-close': !showBalance }]" @click="onToggleEyes" />
      </div>
    </div>

    <div class="safe_wrap">
      <img src="@/assets/web_pgpc/safe.png">
      <div class="safe_right">
        <div>
          <span class="safe_title">{{ $t('YJ.vault') }}</span>
          <div class="flex justify-end content-center items-center">
            <!-- <h4>{{ formatCurrency(yuebaoTotalMoney) }}</h4> -->
            <h4 class="safe_money">{{ currency(0) }}</h4>
            <svg-icon name="arrow-right" />
          </div>
        </div>
        <!-- <span>{{ $t('YJ.dailyRateReturn', [baseInterestRate, 1]) }}</span> -->
        <span>{{ $t('YJ.dailyRateReturn', [0, 1]) }}</span>
      </div>
    </div>

    <!-- <div id="money-plan" class="money-plan">
      <div class="plan-item">
        <div class="plan-wrap ellipsis">
          <label id="pendingDepositCount">-</label>
          <label>{{ $t('info_handle_deposit') }}</label>
          <div class="now js_now">-</div>
        </div>
      </div>
      <div class="plan-item">
        <div class="plan-wrap ellipsis">
          <label id="pendingWithdrawCount">-</label>
          <label>{{ $t('info_handle_withdrawals') }}</label>
          <div class="now js_now">-</div>
        </div>
      </div>
    </div> -->
    <div class="last-login hide_XXXXXXXXX">
      <div class="item-text">
        <label class="colon">{{ $t('label_login_lastTime') }}：</label>
        <label>{{ userInfo.lastLoginTime }}</label>
      </div>
      <!-- <div class="item-text">
        <label class="colon">{{ $t('label_login_lastIP') }}：</label>
        <label>-</label>
      </div>
      <div class="item-text js_login_location hide_XXXXXXXXX">
        <label class="colon">{{ $t('last_login_location') }}：</label>
        <label>-</label>
      </div> -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
#mc_container.security-center .personal-information {
  box-shadow: 0 7px 62px 0 rgba(170, 106, 226, 0.19);
}
#mc_container.security-center .personal-information .last-login .mcac-icon.icon-shield {
  position: absolute;
  top: 20px;
  left: 23px;
}
#mc_container.security-center .personal-information .last-login div.item-text {
  line-height: 20px;
}

#mc_container.security-center .personal-information {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 7px 62px 0 rgba(170, 106, 226, 0.19);
  .information-top {
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    background: linear-gradient(0deg, #f1f9ff00 0, #b3bcc880 100%);
  }
  .information-top::before {
    left: 0;
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-image: url(@/assets/web_pgpc/level-bg.png);
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
    mask-image: linear-gradient(to bottom, #000, rgba(0, 0, 0, 0));
  }
  .information-top .upper-left {
    float: left;
    width: 40px;
    height: 40px;
    background: url(@/assets/web_pgpc/sign.png) no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    visibility: hidden;
  }
  .information-top .upper-right {
    z-index: 1;
    padding-top: 32px;
    color: #f8ffff;
    font-size: 16px;
    flex: 1;
    display: flex;
    align-items: center;
    width: 0;
    margin-bottom: 8px;
  }
  .information-top .upper-right .info-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 10px;
    width: 0;
    gap: 4px;
    .loginname-wrap {
      .copy-btn svg {
        margin-left: 8px;
        width: 12px;
        height: 12px;
        pointer-events: none;
      }
    }
    .loginname-wrap,
    .nickname-wrap {
      color: #666;
      font-size: 16px;
      display: flex;
      font-weight: 600;
      flex: 1;
      width: 100%;
      text-align: right;
      // margin-top: 4px;
      // margin-bottom: 8px;
    }
    .nickname-wrap .information-nickname {
      height: 16px;
      font-size: 14px;
      font-weight: 900;
    }
    .nickname-wrap .edit-icon {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(@/assets/icons/svg/edit-icon.svg);
      width: 12px;
      height: 12px;
      min-width: 12px;
      min-height: 12px;
      margin-left: 8px;
    }
    .regdate-wrap {
      width: 100%;
      color: #b2b2b2;
      font-size: 10px;
      font-weight: 500;
      text-align: left;
      display: flex;
      justify-content: flex-start;
    }
    .regdate-wrap .join-title {
      margin-right: 3px;
      text-align: center;
      display: flex;
      align-items: center;
    }
    .regdate-wrap .regdate-icon {
      background-image: url(@/assets/icons/svg/Web/icon-date.svg);
      background-repeat: no-repeat;
      background-size: contain;
      margin-right: 2px;
      display: block;
      min-width: 12px;
      width: 12px;
      height: 12px;
    }
    .info-level-wrap {
      display: flex;
      width: 100%;
      align-items: center;
      flex: 1;
    }
    .info-level-wrap .info-siginin {
      cursor: pointer;
      display: block;
      width: 26px;
      height: 26px;
      background-repeat: no-repeat;
      background-image: url(@/assets/web_pgpc/vip/signin.png);
    }
    .info-level-wrap .info-siginin:hover {
      filter: contrast(110%);
    }
    .info-level-wrap .vip-label {
      cursor: pointer;
      padding: 4px 8px;
      display: flex;
      max-width: 173px;
      border-radius: 60px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: linear-gradient(
        180deg,
        rgba(102, 102, 102, 0.7) 0,
        rgba(67, 72, 81, 0.7) 100%
      );
      backdrop-filter: blur(10px);
      margin-right: 5px;
    }
    .info-level-wrap .vip-label:hover {
      filter: brightness(120%);
    }
    .info-level-wrap .vip-label .vipicon {
      position: static;
      width: 16px;
      height: 18px;
      margin-right: 8px;
      display: block;
      mask-image: none;
      filter: initial;
      opacity: 1;
    }
    .info-level-wrap .vip-label .level-name {
      align-items: center;
      display: flex;
      max-width: 173px;
      text-align: left;
      padding: 0 8px;
      color: #fff;
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
      font-family: Inter;
      font-size: 12px;
      font-weight: 700;
    }
  }
  .information-top .upper-right .information-nickname {
    display: inline-block;
    line-height: 16px;
    text-align: left;
  }
  .information-top .upper-right .first-name {
    overflow: hidden;
    display: inline-block;
    background: #b1b8b6;
    width: 80px;
    height: 80px;
    text-align: center;
    color: transparent;
    background-size: 100% 100%;
    border-radius: 50%;
    line-height: 40px;
    font-weight: 700;
    font-size: 22px;
    margin-right: 8px;
    position: relative;
  }
  .information-top .vipicon {
    background-image: url(@/assets/web_pgpc/vip/spe-icon.png);
    mask-image: linear-gradient(to bottom, #000, rgba(0, 0, 0, 0));
    filter: blur(0.5px);
    opacity: 0.5;
    width: 81px;
    height: 90px;
    position: absolute;
    background-size: 100% 100%;
    right: 23px;
    top: 5px;
    z-index: 0;
  }

  .copy-wrap {
    padding-left: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 12px;
    width: 100%;
  }
  .copy-wrap .copy-title {
    font-size: 12px;
    color: #fff;
    margin-right: 5px;
    padding-right: 5px;
    position: relative;
    word-break: keep-all;
  }
  .copy-wrap .copy-title:before {
    position: absolute;
    content: ":";
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .copy-wrap .copy-btn {
    margin-right: 6px;
    height: 24px;
    border-radius: 35px;
    color: #979797;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .copy-wrap .copy-btn .username-copy {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    min-width: 0;
    max-width: 110px;
  }
  .copy-wrap .copy-btn .copy-icon {
    cursor: pointer;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    display: block;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(@/assets/web_pgpc/icon-copy.png);
    margin-left: 5px;
  }
  .information-money {
    color: #434851;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    margin-top: 8px;
    padding: 0 16px;
  }
  .information-money .money-view {
    flex: 1;
    display: flex;
    font-size: 24px;
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
  }
  .information-money .money-view span {
    font-size: 34px;
    font-weight: 600;
  }
  .information-money .eyes-icon {
    cursor: pointer;
    display: block;
    width: 18px;
    height: 18px;
    background: url(@/assets/icons/svg/Web/eyes-icon-open.svg) no-repeat center/contain;
  }
  .information-money .eyes-icon.icon-eyes-close {
    background: url(@/assets/icons/svg/Web/eyes-icon-close.svg) no-repeat center/contain;
  }
  .information-money .amount-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .information-money .amount-wrap .refresh {
    width: 18px;
    height: 18px;
    background: url(@/assets/icons/svg/Web/refresh-icon.svg) no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    margin: 0 10px;
  }
  .information-money .amount-wrap .balance-amount {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .information-money .amount-wrap .processing {
    @include processing_animation;
  }
  .lastDeposit {
    padding: 20px 26px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #f8ffff;
  }
  .lastDeposit > div {
    display: flex;
    align-items: center;
    height: 36px;
  }
  .lastDeposit > div .icon {
    width: 36px;
    height: 36px;
    background: url(@/assets/web_pgpc/up-arrow.png) no-repeat;
    background-size: 100% 100%;
    flex-shrink: 0;
  }
  .lastDeposit > div .amount {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    font-size: 14px;
  }
  .lastDeposit > div .amount .tip {
    font-size: 12px;
    color: #8b94a2;
  }
  .lastDeposit .lastWithdrawal > .icon {
    transform: rotate(180deg);
  }
  .money-event {
    color: #fff;
    text-align: center;
    margin-top: 34px;
  }
  .money-event .btn-events {
    width: 130px;
    display: inline-block;
    line-height: 38px;
    cursor: pointer;
    border-radius: 43px;
    font-size: 18px;
  }
  .money-event .btn-events.deposit-money {
    background-color: #22d72a;
    box-shadow: 0 3px 10px rgba(82, 230, 69, 0.32);
  }
  .money-event .btn-events.deposit-money:hover {
    background-color: #25ed2f;
  }
  .money-event .btn-events.deposit-money:active {
    background-color: #1ebd25 !important;
    box-shadow: 0 2px 5px rgba(82, 230, 69, 0.23);
  }
  .money-event .btn-events.withdraw-money {
    border: 1px solid #ccc;
    margin-left: 10px;
    color: #9f9f9f;
  }
  .money-event .btn-events.withdraw-money:hover {
    background-color: rgba(255, 255, 255, 0.3);
    border: 1px solid #ccc;
    box-shadow: 0 2px 5px rgba(177, 67, 58, 0.15);
  }
  .money-event .btn-events.withdraw-money:active {
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 2px 5px rgba(177, 67, 58, 0.15);
  }

  .safe_wrap,
  .money-plan {
    margin-top: 0;
    color: #666;
    font-size: 14px;
    padding-left: 30px;
  }

  .safe_wrap {
    align-items: center;
    background: linear-gradient(270deg, #f5b73b 0%, #f5853b 100%);
    border-radius: 0.26667rem;
    color: #442b0d;
    display: flex;
    margin: 20px 15px 0;
    padding: 13px;
    // width: 100%;
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .safe_right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 8px;
      width: 84%;
      padding: 5 0;
      .safe_title {
        font-weight: 700;
      }
      .safe_money {
        color: #FFF;
        border-radius: 10px;
        background: #8F5206;
        padding: 3px 6px;
      }
      .svg-icon {
        width: 15px;
        height: 15px;
        color: #787878;
      }
      > div {
        display: flex ;
        justify-content: space-between;
        align-items: center;
        padding: 0 5 0 0;
      }
    }
  }
  .money-plan .plan-wrap {
    width: 210px;
  }
  .money-plan .plan-item {
    margin-top: 20px;
    background: url(@/assets/web_pgpc/security-deposit.png) no-repeat left center;
    height: 38px;
    padding-left: 55px;
    position: relative;
    font-size: 14px;
  }
  .money-plan .plan-item:nth-child(2) {
    background-image: url(@/assets/web_pgpc/security-withdrawal.png);
  }
  .money-plan .plan-item .now {
    padding-top: 8px;
    font-size: 12px;
    color: #aaa;
  }
  .money-plan .plan-item::after {
    content: "";
    width: 210px;
    position: absolute;
    border-top: 1px dashed #efeff1;
    bottom: -18px;
  }
  .money-plan .plan-item #pendingDepositCount,
  .money-plan .plan-item #pendingWithdrawCount {
    margin-right: 5px;
  }
  .vipcard {
    width: 266px;
    height: 134px;
    background: url(@/assets/web_pgpc/vipcard.png) no-repeat;
    background-size: 100% 100%;
    margin: 6px auto 0;
    padding-top: 17px;
    display: none;
    position: relative;
    z-index: 1;
    padding-left: 117px;
    color: #fff;
    box-shadow: 0 6px 10px 2px rgba(234, 197, 123, 0.19);
  }
  .vipcard.auto {
    border-radius: 6px;
  }
  .vipcard.auto .member-level-progress-bar {
    background: rgba(102, 102, 102, 0.3) !important;
  }
  .vipcard.auto .member-level {
    z-index: 10;
    position: relative;
  }
  .vipcard.auto::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    background: url(@/assets/web_pgpc/auto_bg.png) no-repeat;
  }
  .vipcard .vipicon {
    width: 70px;
    height: 78px;
    position: absolute;
    background-size: 100% 100%;
    left: 20px;
    top: 50%;
    z-index: 10;
    margin-top: -39px;
  }
  .vipcard .level-up {
    line-height: 22px;
    height: 22px;
  }
  .vipcard .member-progress-warp {
    width: 120px;
    padding: 5px 0 16px;
  }
  .vipcard .member-progress-warp .member-level-progress-bar {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background-color: rgba(102, 102, 102, 0.3);
  }
  .vipcard .member-progress-warp .member-level-progress-bar .cur-progress-bar {
    width: 0%;
    height: 6px;
    border-radius: 3px;
    background-color: #fff;
    transition: width 1s ease;
  }
  .vipcard .member-interests {
    width: 78px;
    height: 30px;
    border-radius: 15px;
    background-color: #fff;
    color: #d09b34;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
  }
  .vipcard .member-interests:active {
    box-shadow: 0 2px 5px rgba(177, 67, 58, 0.15);
  }
  .last-login {
    display: flex;
    align-items: center;
    min-height: 60px;
    // margin: 36px 0 0 30px;
    margin: 20px 0 0 30px;
    padding-left: 55px;
    line-height: 20px;
    font-size: 12px;
    color: #5e5e5e;
    background: url(@/assets/web_pgpc/lastlogin.png) no-repeat left center;
  }
}

@mixin vipIconStyle($level) {
  &.lv#{$level} .vipicon {
    mask-image: linear-gradient(to bottom, #000, rgba(0, 0, 0, 0));
    filter: blur(0.5px);
    opacity: 0.5;
    background-image: url(@/assets/web_pgpc/vip/lv#{$level}.png);
  }
}

#mc_container.security-center .personal-information {
  &.hasVip.auto .lastDeposit {
    display: none;
  }
  &.hasVip.auto .money-event {
    display: none;
  }
  &.hasVip.auto .vipcard {
    display: block;
  }
  &.hasVip.special .info-left .info-level-wrap .vip-label {
    cursor: initial;
  }
  &.hasVip.special .info-left .info-level-wrap .vip-label:hover {
    filter: initial;
  }
  &.hasVip.special .lastDeposit {
    display: none;
  }
  &.hasVip.special .money-event {
    display: none;
  }
  &.hasVip.special .vipcard {
    display: block;
    background-image: url(@/assets/web_pgpc/spe-bg.png) !important;
  }
  &.hasVip.special .vipcard .member-level > div {
    display: none;
  }
  &.hasVip.special .vipcard .member-level > .level-name {
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  &.hasVip.special .vipcard .member-level > .level-name.MEMCLUB3-close {
    margin-top: 0;
  }
  &.hasVip.special .vipcard:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    background: url(@/assets/web_pgpc/auto_bg.png) no-repeat;
  }
  #mc_container.security-center .personal-information::after {
    content: "";
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90px;
    position: absolute;
    background: linear-gradient(180deg, rgba(241, 249, 255, 0) 0, rgba(179, 188, 200, 0.2) 100%);
    backdrop-filter: blur(2px);
    border-radius: 0 0 10px 10px;
  }

  @for $i from 1 through 18 {
    @include vipIconStyle($i);
  }
}

</style>
