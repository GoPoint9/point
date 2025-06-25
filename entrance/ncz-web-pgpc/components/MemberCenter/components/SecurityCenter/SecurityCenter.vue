<script setup lang="ts">
import PersonalInformation from '@entrance/ncz-web-pgpc/components/MemberCenter/components/SecurityCenter/components/PersonalInformation.vue'
import AccountInformation from '@entrance/ncz-web-pgpc/components/MemberCenter/components/SecurityCenter/components/AccountInformation.vue'

import SettingModal from '@entrance/ncz-web-pgpc/components/MemberCenter/components/SettingModal'

import {
  settingModalMenus,
  settingModalComponentEntries
} from '@entrance/ncz-web-pgpc/components/MemberCenter/components/SettingModal/components/menuConfig.ts'
import { useMenuComponents } from '@/NCZ/hooks'

const {
  menus, // 響應式菜單數據
  currentMenu, // 當前選中的菜單
  currentComponent, // 當前選中的組件
  onSelectMenu, // 切換菜單的方法
} = useMenuComponents({ componentEntries: settingModalComponentEntries, menus: settingModalMenus })
const isShow = ref(false)

const onTabClick = i => {
  isShow.value = true
  onSelectMenu(i)
}

provide('$SettingModal', {
  isShow,
  menus,
  currentMenu,
  currentComponent,
  onTabClick,
})

</script>
<template>
  <div id="mc_container" class="mc_container security-center clear-float">
    <div class="outer-casing overflow flex">
      <PersonalInformation />
      <AccountInformation />
    </div>
    <SettingModal />

    <!-- 忘記密碼 右側彈窗 -->
    <!-- <div class="forget-password popup">
      <div class="model-mask" />
      <div id="forget-password-content" class="content">
        <div class="close-info" translate="label_close" />
        <div class="setting-nav">
          <div class="nav-item js_bindGA hide" data-page="forgetByGa">
            <i class="iconinf-m icon-google active" />
            <div class="item-tips" translate="ga_reset_pwd" />
          </div>
          <div class="nav-item js_mobileVerified hide" data-page="forgetByPhone">
            <i class="iconinf-m icon-phone active" />
            <div class="item-tips" translate="phone_reset_pwd" />
          </div>
          <div class="nav-item js_email hide" data-page="forgetByEmail">
            <i class="iconinf-m icon-message active" />
            <div class="item-tips" translate="email_reset_pwd" />
          </div>
          <div class="nav-item js_customer" data-page="forgetByCustomer">
            <i class="iconinf-m icon-customer active" />
            <div class="item-tips" translate="customer_reset_pwd" />
          </div>
        </div>
        <div class="forget-password-wrap" />
      </div>
    </div> -->
  </div>
</template>
<style lang="scss">
.mc_container {
  height: 100%;
  width: 1110px;
  text-align: left;
  * {
    box-sizing: border-box;
    font-size: inherit;
    color: inherit;
    font-family: inherit;
    line-height: 1;
  }
}
</style>
<style lang="scss" scoped>
@use '@entrance/ncz-web-pgpc/components/MemberCenter/components/SecurityCenter/SecurityCenter.scss' as *;
</style>
