<script setup>
import { useHome } from '@/hooks'
import SvgIcon from '@/components/common/svgIcons.vue'
import CommonLogo from './CommonLogo.vue'
import LanguageSelect from './LanguageSelect.vue'

// import VueQr from 'vue-qr';
import { mediaList } from '../config.js'

const $showSideMenu = inject('$showSideMenu')

const commonStore = useCommonStore()
const siteStore = useSiteStore()

// onMounted(() => {
//   console.log(
//     '%c INFO %c SideMenu ',
//     'color: #298C5B; font-weight: bold; padding: 3px; border: 2px solid #298C5B; border-radius: 3px 0 0 3px;',
//     'color: #fff; background: #298C5B; font-weight: bold; padding: 5px; border-radius: 0 3px 3px 0;',
//     'SideMenu',
//     siteStore
//   )
// })

const showDownload = ref(false)
const showMemberList = ref(false)
const showGameList = ref(false)
// 菜單數據
const menu = reactive([
  { name: 'in_increase_deposit', page: 'depositv2', icon: 'deposit' },
  { name: 'in_increase_withdrawal', page: 'withdraw', icon: 'withdraw' },
  { name: 'activity_up', page: '/promotions', icon: 'promo-2' },
  { name: 'in_reward_center', page: 'rewardCenter', icon: 'reward' },
  { name: 'rebate_promo', page: 'manualRebate', icon: 'cashback' },
])
// 會員導航數據
const memberNav = reactive([
  { name: 'in_betting_record', page: 'personalHistoryCopy', icon: 'bet-record' },
  { name: 'in_my_account', page: 'securityCenter', icon: 'security-center' },
  { name: 'in_increase_deposit', page: 'depositv2', icon: 'deposit_record' },
  { name: 'in_personal_loss', page: 'personalProfit', icon: 'profit-loss' },
  { name: 'in_platform_information', page: 'messageV2', icon: 'mailcen' },
])

// 遊戲列表數據
const { getGameType, gameMenus, currentGameType, setCurrentGameType } = useHome({ changeTitle: true })

// NOTE: 抓遊戲資料
getGameType()

// 媒體數據
const activeMediaList = reactive(mediaList)

// const iosUrl = '...' // iOS 下載鏈接
const resources = reactive({ Android: { url: '...' } }) // Android 資源
const gameTypeName = reactive({
  ELOTT: 'con_lott',
  LOTT: 'con_lott',
  LIVE: 'hd_live_casino',
  SPORTS: 'con_sports',
  FISH: 'con_fish',
  RNG: 'con_rng',
  PVP: 'hd_pvp',
  ESPORTS: 'compete_game',
  COCKFIGHT: 'in_cockfight_nav',
})

const router = useRouter()
const setGameType = type => {
  router.push('/')
  setCurrentGameType(type)
}
function handleItemClick (page) {
  if (page === '/promotions') {
    setCurrentGameType('')
    return router.push(page)
  }
  console.log('Handle item click:', page)
}

function toggleShow (target) {
  console.warn('target ', target)
  if (target === 'showMemberList') showMemberList.value = !showMemberList.value
  if (target === 'showGameList') showGameList.value = !showGameList.value
}

function handleShowDownload (show) {
  showDownload.value = show
}

function openResource (type) {
  console.log('Open resource:', type)
}
</script>
<template>
  <div class="side-wrapper">
    <div class="side-top">
      <div class="switch-icon" :class="{ off: !$showSideMenu }" @click.stop="commonStore.setShowSideMenu('reverse')">
        <svg-icon name="icon-menu" />
      </div>
      <CommonLogo class="logo" :src="siteStore.logoSetting?.h5LogoPath" @logo-click="setGameType('HOME')" />
    </div>
    <div class="side-menu" :class="{ off: !$showSideMenu, show: showDownload }">
      <div class="side-menu-bg">
        <div class="nav-wrapper">
          <div
            v-for="(item, index) in menu"
            :key="index"
            class="nav-item"
            :class="{ style1: item.page === 'depositv2' || item.page === 'withdraw' }"
            @click="handleItemClick(item.page)"
          >
            <svg-icon class="nav-item-icon" :name="item.icon" />
            <div class="label-text">{{ $t(item.name) }}</div>
          </div>
        </div>
        <div class="nav-wrapper">
          <div class="nav-item style1" @click="toggleShow('showMemberList')">
            <svg-icon class="nav-item-icon" name="member" />
            <div class="label-text">{{ $t('hd_member_center') }}</div>
          </div>
          <div class="member-list" :class="{ show: showMemberList }">
            <div
              v-for="(item, index) in memberNav"
              :key="index"
              class="nav-item member"
              @click="handleItemClick(item.page)"
            >
              <div class="label-text">{{ $t(item.name) }}</div>
              <svg-icon class="nav-item-icon" name="side-arrow" />
            </div>
          </div>
        </div>
        <div class="nav-wrapper">
          <div class="nav-item style1" @click="toggleShow('showGameList')">
            <svg-icon class="nav-item-icon" name="game-center" />
            <div class="label-text">{{ $t('in_game_center') }}</div>
          </div>
          <div class="game-list" :class="{ show: showGameList }">
            <!-- TODO: 不匹配不應顯示 -->

            <template v-for="(i, index) in gameMenus" :key="index">
              <!-- <div v-if="gameTypeName[i.gameCategory]" class="game-list-wrap"> -->
              <div class="game-list-wrap">
                <!-- <div class="nav-item" @click="setGameType(i.gameCategory)">
                  <div class="label-text">{{ $t(gameTypeName[i.gameCategory] || '') }}</div> -->
                <div
                  :class="['nav-item', { active: currentGameType === i.categoryCode }]"
                  @click="setGameType(i.categoryCode)"
                >
                  <!-- <div class="nav-item" @click="setGameType(i.categoryCode)"> -->
                  <div class="label-text">{{ i.title }}</div>
                  <svg-icon name="side-arrow" />
                </div>
              </div>
            </template>
          </div>
        </div>

        <!--  -->
        <div class="download-group" @mouseenter="handleShowDownload(true)" @mouseleave="handleShowDownload(false)">
          <svg-icon name="icon-download" />
          <span class="download-text">{{ $t('download_promo') }}</span>
          <div class="download-content-wrapper">
            <div class="download-content">
              <div class="qrcode-ios">
                <div class="qrcode_box">
                  <!-- <VueQr
                    :logo-margin="2"
                    :text="iosUrl"
                    :size="120"
                    :margin="5"
                  /> -->
                </div>
                <div class="qrcode-info">
                  <svg-icon name="icon-apple" />
                  <p>IOS</p>
                </div>
              </div>
              <div v-if="resources.Android" class="qrcode-android">
                <div class="qrcode_box">
                  <!-- <VueQr
                    :logo-margin="2"
                    :text="resources.Android.url || ''"
                    :size="120"
                    :margin="5"
                  /> -->
                </div>
                <div class="qrcode-info">
                  <svg-icon name="icon-android" />
                  <p>Android</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="activeMediaList.length > 1" class="channel-group">
          <div v-for="item in activeMediaList" :key="item.type" class="channel-list">
            <div class="channel-item" @click="openResource(item.type)">
              <img class="channel-img" :src="item.icon">
            </div>
          </div>
        </div>
        <LanguageSelect />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.side-wrapper {
  position: fixed;
  flex-direction: column;
  z-index: 3;

  &,
  .side-top {
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
  }

  .side-top {
    height: 63px;
    position: absolute;
    width: 337.9px;
  }
  .switch-icon {
    width: 62px;
    height: 65px;
    cursor: pointer;
    border-radius: 0 18px 7px 0;
    background: linear-gradient(212deg, #fff 2.86%, #feb705 57.51%, #feb705 108.84%);
    box-shadow: inset -2px 2px 4px 0 rgba(255, 254, 225, 0.83);
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 33px;
      height: 26px;
    }
  }
}

@mixin list-styles {
  height: 0;
  transition: all 0.2s linear;
  overflow: hidden;
  &.show {
    height: auto;
  }
  .nav-item {
    background: transparent;
    border: none;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    transition: all 0.3s ease;
    svg {
      width: 12px;
      height: 12px;
      color: #787878;
    }
    &.active,
    &.active svg,
    &:hover,
    &:hover svg {
      background: transparent;
      color: #feb705;
    }
  }
}
@mixin nav-item-base {
  padding: 7px 10px;
  height: 35px;
  display: flex;
  gap: 5px;
  align-items: center;
  position: relative;
  margin-top: 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 400;
  text-align: center;
  z-index: 1;
  border-radius: 11.3px;
  overflow: hidden;
  cursor: pointer;
  border: 0.5px solid #ef9595;
  background: linear-gradient(265deg, rgba(254, 183, 5, 0.8) 8.31%, hsla(0, 92%, 70%, 0.8) 106.6%);
  &:hover {
    background: linear-gradient(265deg, rgba(255, 224, 145, 0.8) 8.31%, hsla(0, 92%, 70%, 0.8) 106.6%);
  }
}
@mixin nav-item-style1 {
  border: none;
  background: linear-gradient(270deg, #632b85 36.05%, #402177 103.05%);
  &:hover {
    background: linear-gradient(270deg, #b27ad3 36.05%, #402177 103.05%);
  }
}
@mixin nav-item-member {
  background: transparent;
  border: none;
  padding: 0 10px;
  transition: all 0.3s ease;
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  .nav-item-icon {
    width: 12px;
    height: 12px;
    color: #787878;
  }
  &:hover,
  &:hover .nav-item-icon {
    color: #feb705;
  }
}
@mixin nav-item-icon($size) {
  width: $size;
  height: $size;
}
@mixin classify-list-item {
  margin-top: 10px;
  padding: 0 20px;
  width: 90%;
  height: 50px;
  border-radius: 11.3px;
  cursor: pointer;
  background: linear-gradient(180deg, #398cd6, #317ab9 53.65%, #2b6aa0);
  font-size: 17.3px;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}
@mixin game-classify-icon($width: 30px, $height: 30px) {
  width: $width;
  height: $height;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
}

.side-wrapper .nav-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;

  .game-list,
  .member-list {
    @include list-styles;
  }

  .nav-item {
    @include nav-item-base;
    &.style1 { @include nav-item-style1; }
    &.member { @include nav-item-member; }
    .nav-item-icon {
      @include nav-item-icon(20px);
      &.RNG { @include nav-item-icon(35px); }
      &.LIVE { @include nav-item-icon(40px); }
    }
    .label-text {
      flex: 1;
      text-align: left;
    }
  }

  .classify-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    .classify-list-item {
      @include classify-list-item;
      .game-classify-icon {
        @include game-classify-icon();
        &.arc { background-image: url(@/assets/web_pgpc/icon-arc.png); }
        &.jp { background-image: url(@/assets/web_pgpc/icon-jp.png); }
        &.fish { background-image: url(@/assets/web_pgpc/icon-fish-color.png); }
        &.bac {
          @include game-classify-icon(35px, 35px);
          background-image: url(@/assets/web_pgpc/icon-bac.png);
        }
        &.sic {
          @include game-classify-icon(35px, 35px);
          background-image: url(@/assets/web_pgpc/icon-sic.png);
        }
      }
    }
  }
}

</style>
