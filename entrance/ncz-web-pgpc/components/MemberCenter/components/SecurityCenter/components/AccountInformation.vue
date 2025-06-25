<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

import { onLogout } from '@/NCZ/utils'
import { $t } from '@/languages'
const {
  menus,
  onTabClick,
} = inject('$SettingModal')

const detailMap = {
  js_profile: $t('info_setting_profile'),
  js_idVerification: $t('info_setting_idverification'),
  js_cpfVerification: $t('info_setting_cpfverification'),
  js_loginPassword: $t('info_setting_loginPwd'),
  js_bindGA: $t('info_setting_google'),
  js_bankCards: $t('info_setting_bank'),
  js_eWallet: $t('bind_ewallet_card_title'),
  js_vitualWallet: $t('info_setting_virtual'),
  js_withdrawPassword: $t('info_setting_payPwd'),
  js_securityQuestions: $t('info_setting_secret'),
  js_mobileVerified: $t('info_setting_phone'),
  js_logout: $t('info_setting_logout'),
}

</script>
<template>
  <PerfectScrollbar class="AccountInformation information-wrap account-information js_platformList ml-auto!">
    <div
      v-for="menu in menus"
      :key="menu.name"
      :class="['account-bind-item', menu.name]"
      @click="onTabClick(menu)"
    >
      <div :class="['iconinfo', menu.icon, 'active']" />
      <div class="item-text">
        <label>{{ menu.name }}</label>
      </div>
      <div class="item-detail">{{ detailMap[menu.className] }}</div>
    </div>

    <!-- 登出 -->
    <div class="account-bind-item js-logout" @click="onLogout">
      <div class="iconinfo icon-logout active" />
      <div class="item-text">{{ $t('label_logout') }}</div>
      <div class="item-detail">{{ $t('info_setting_logout') }}</div>
    </div>
  </PerfectScrollbar>
</template>

<style lang="scss">
@use 'vue3-perfect-scrollbar/style.css' as *;
</style>

<style lang="scss" scoped>
@use '@entrance/ncz-web-pgpc/components/MemberCenter/iconinfo.scss' as *;

#mc_container.security-center .AccountInformation.account-information {
  box-shadow: none;
  height: 580px;
  padding-left: 20px;
  width: 340px;
  padding-right: 25px;
  .account-bind-item {
    min-height: 61px;
    margin-bottom: 24px;
    padding-left: 74px;
    position: relative;
    label {
      margin-right: 5px
    }
    .iconinfo {
      position: absolute;
      left: 0;
      top: 2px
    }
    .item-text {
      color: #666;
      font-size: 16px;
      line-height: 18px;
      margin-bottom: 8px
    }
    .item-detail {
      line-height: 18px;
      font-size: 13px;
      color: #979797
    }
    .tag {
      line-height: 18px;
      font-size: 13px;
      color: #979797
    }
  }
}
</style>
