<script setup lang="ts">
import { $t } from '@/languages'
import { useMenuComponents } from '@/NCZ/hooks'

const menuOptions = {
  componentEntries: Object.entries(import.meta.glob('./components/*/index.ts')),
  menus: [
    { name: $t('in_my_account'), page: 'SecurityCenter' },
    { name: $t('in_my_wallet'), page: 'transferFund' },
    { name: $t('in_increase_deposit'), page: 'Deposit' },
    { name: $t('in_increase_withdrawal'), page: 'withdraw' },
    { name: $t('in_transfer_upline'), page: 'transferUpline' },
    { name: $t('in_betting_record'), page: 'BetHistory' },
    { name: $t('in_account_record'), page: 'transactionHistory' },
    { name: $t('in_personal_loss'), page: 'personalProfit' },
    { name: $t('in_bonus_details'), page: 'bonusDetails' },
    { name: $t('in_reward_center'), page: 'rewardCenter' },
    { name: $t('invite_friends'), page: 'referral' },
    { name: $t('mission_activity'), page: 'missionLeaderboard' },
    { name: $t('in_platform_information'), page: 'messageV2' },
    { name: $t('manual_rebate'), page: 'manualRebate' },
  ],
}
const {
  menus, // 響應式菜單數據
  currentMenu, // 當前選中的菜單
  currentComponent, // 當前選中的組件
  onSelectMenu, // 切換菜單的方法
} = useMenuComponents(menuOptions)

const checkMap = {
  playerMRDailySalary: !0,
  transferUpline: !0,
  transferFund: !0,
  rewardCenter: !0,
  messageV2: !0,
  bonusDetails: !0,
  referral: !0,
}
menus.value = menus.value.filter(i => !checkMap[i.page])

const loaded = ref(false)
const missionCount = ref(0)
const messageCount = ref(0)
const rewardCount = ref(0)

const globalStore = GlobalStore()

const closeMc = () => {
  loaded.value = false
  // globalStore.setMcPage(item)
  globalStore.setMcShow(false)
}
</script>

<template>
  <!-- <div v-if="loaded" class="br_acmc_body"> -->
  <div class="br_acmc_body">
    <div class="acmc_content">
      <div class="br_acmc_main">
        <div class="br_acmc_mleft">
          <div class="br_acmc_mltitle">{{ $t("in_personal_center") }}</div>
          <ul class="br_acmc_mlnav">
            <li
              v-for="(menu, index) in menus"
              :key="index"
              :class="{ active: currentMenu === menu.page }"
              :data-mc="menu.page"
              @click="onSelectMenu(menu)"
            >
              <i class="acmc_icon" :class="`icon_${menu.page}`" />
              <i v-if="menu.page === 'missionLeaderboard' && missionCount > 0" class="tip_fixd">
                {{ missionCount }}
              </i>
              <i v-if="menu.page === 'messageV2' && messageCount > 0" class="tip_fixd">
                {{ messageCount }}
              </i>
              <i v-if="menu.page === 'rewardCenter' && rewardCount > 0" class="tip_fixd">
                {{ rewardCount }}
              </i>
              <span>{{ menu.name }}</span>
            </li>
          </ul>
        </div>

        <!--  -->
        <div id="br_proxy_right" class="br_acmc_mright">
          <Component :is="currentComponent" />
        </div>
        <!--  -->
      </div>
      <div class="close_btn" @click="closeMc" />
    </div>
  </div>
</template>

<style lang="scss">
@use '@entrance/ncz-web-pgpc/components/MemberCenter/mc_shanshan.6bea700c.scss' as *;
@use '@entrance/ncz-web-pgpc/components/MemberCenter/iconinf-m.scss' as *;
</style>
<style lang="scss" scoped>

.br_acmc_body {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 3;
}
.acmc_content {
  width: 1290px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.br_acmc_main {
  height: 620px;
  border-radius: 10px;
  user-select: none;
  overflow: hidden;
}
.br_acmc_mleft {
  width: 180px;
  height: 100%;
  float: left;
  background-color: #2b3248;
}
.br_acmc_mltitle {
  width: 100%;
  padding: 30px 0;
  font-size: 27px;
  font-weight: 600;
  justify-content: center;
  text-align: center;
}
.br_acmc_mlnav li,
.br_acmc_mltitle {
  color: #fff;
  display: flex;
  align-items: center;
}
.br_acmc_mlnav li {
  padding-left: 10px;
  height: 50px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}
.br_acmc_mlnav li.active,
.br_acmc_mlnav li:hover {
  color: #fff;
  background: #da394f;
}
.br_acmc_mlnav li span {
  display: inline-block;
  max-width: 136px;
}
.br_acmc_mlnav .acmc_icon {
  display: block;
  width: 25px;
  height: 25px;
  margin-right: 3px;
  margin-top: 3px;
  background-image: url('@/assets/web_pgpc/acmc-icons.png');
}
.br_acmc_mright {
  width: 1110px;
  height: 100%;
  float: right;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: 0 none;
  position: relative;
}
.br_acmc_mlnav li i.tip_fixd {
  display: inline-block;
  padding: 2px 7px;
  line-height: 14px;
  background: red;
  border-radius: 9px;
  position: absolute;
  left: 25px;
  top: 1px;
  font-size: 12px;
  font-style: normal;
}

@mixin set-icon-position($x, $y) {
  background-position: $x $y;
}
.acmc_icon {
  &.icon_agentAnnouncement,
  &.icon_transactionHistory {
    @include set-icon-position(-274px, -53px);
  }
  &.icon_agentTeamOverview,
  &.icon_withdraw {
    @include set-icon-position(-14px, -49px);
  }
  &.icon_linkRegister,
  &.icon_registerCenter {
    @include set-icon-position(-316px, -52px);
  }
  &.icon_downlineManagmentView,
  &.icon_subordinateManagementV2,
  &.icon_SecurityCenter {
    @include set-icon-position(-228px, -15px);
  }
  &.icon_linkManager {
    @include set-icon-position(-225px, -87px);
  }
  &.icon_agentRedRain,
  &.icon_bonusDetails {
    @include set-icon-position(-182px, -85px);
  }
  &.icon_agentDownlineTransactionDetailsCopy,
  &.icon_BetHistory {
    @include set-icon-position(-59px, -48px);
  }
  &.icon_agentHourSalary,
  &.icon_agentRevenueReport,
  &.icon_personalProfit {
    @include set-icon-position(-57px, -84px);
  }
  &.icon_agentDividendRecordCopy,
  &.icon_agentDividendRecordCopy2 {
    @include set-icon-position(-148px, -85px);
  }
  &.icon_agentDailyWages,
  &.icon_agentDailyWages2 {
    @include set-icon-position(-105px, -85px);
  }
  &.icon_palStatementsAgentCopy {
    @include set-icon-position(-14px, -83px);
  }
  &.icon_transferFund,
  &.icon_transferUpline {
    @include set-icon-position(-274px, -15px);
  }
  &.icon_Deposit {
    @include set-icon-position(-316px, -15px);
  }
  &.icon_rewardCenter {
    @include set-icon-position(-106px, -49px);
  }
  &.icon_messageV2 {
    @include set-icon-position(-148px, -48px);
  }
  &.icon_manualRebate {
    @include set-icon-position(-182px, -84px);
  }
  &.icon_referral {
    background-image: url('@/assets/web_pgpc/icon_referral.png') !important;
    background-repeat: no-repeat;
    background-size: 20px 20px;
  }
  &.icon_missionLeaderboard {
    background: url('@/assets/web_pgpc/icon-missionLeaderboard.png') no-repeat !important;
  }
}
</style>
