<script setup lang="ts">
import { onCopyText, onLogout } from '@/NCZ/utils'
import { $t } from '@/languages'

const userStore = useUserStore()
const globalStore = GlobalStore()

const userInfo = computed(() => userStore.userInfo)
const showBalance = ref(true)
const onRefreshBalance = () => userStore.GetUserBanlance() // 更新餘額
onMounted(() => {
  onRefreshBalance()
})

// 會員: VIP 等級
const vipLabelName = computed(() => userStore.userInfo.userLevel)
const hasVip = computed(() => !!unref(vipLabelName))

const handleError = e => console.error('Avatar loading error:', e)
// const router = useRouter()

// 會員登出
// const onLogout = () => {
//   const confirmLogout = async (action) => {
//     if (action !== 'confirm') return
//     window.cover.loader(true)
//     await userStore.loginOutNCZ()
//     window.cover.loader(false)
//     router.replace('/')
//   }

//   window.cover.init({
//     title: $t('in_popup_prompt'),
//     html: $t('in_sure_logout'),
//     icon: 'info',
//     btn: { cancel: $t('in_more_cancel'), confirm: $t('in_increase_submit') },
//   }, confirmLogout)
// }

const changeUserAvatar = () => {}
const getService = () => {}
const setAcPage = () => {}
const setMcPage = () => {}

// NOTE: 這邊看起來是進入全屏的遊戲會隱藏 餘額區塊
const isGamePage = computed(() => {
  // return ['/seamless', '/lottert', '/vnlottery', '/sealottery'].includes(g.path)
  return false
})
</script>

<template>
  <div class="member-info-container">
    <div class="group">
      <div v-if="!isGamePage" class="member-info-item">
        <div class="balance-container">
          <div class="symbol">{{ globalStore.currencySymbol }}</div>
          <span class="balance">{{ showBalance ? (userStore.balance || '--') : '***' }}</span>
          <span class="refresh" @click="onRefreshBalance">
            <svg-icon name="icon-refresh" :class="{ 'processing': userStore.isLoadingBalance }" />
          </span>
        </div>
      </div>
      <div class="member-info-item" @click="setMcPage('depositv2')">
        <svg-icon name="btn-deposit" />
      </div>
      <div class="member-info-item" @click="setMcPage('withdraw')">
        <svg-icon name="btn-withdraw" />
      </div>
    </div>
    <div class="group member">
      <div class="member-account">
        <div class="user-avatar" @click.stop="changeUserAvatar">
          <img :src="userInfo.userImgPath" alt="" @error="handleError">
          <div v-if="hasVip" class="vip">{{ vipLabelName }}</div>
        </div>
        <div class="icon-down">
          <svg-icon name="common-arrow" />
        </div>
        <transition name="zoom-in-top" appear>
          <div class="member-menu">
            <div class="member-menu-bg">
              <div class="main-info">
                <div class="avatar-wrap">
                  <img
                    class="avatar"
                    :src="userInfo.userImgPath"
                    alt=""
                    @error="handleError"
                  >
                  <div v-if="hasVip" class="vip-content">
                    <div class="vip-text">{{ vipLabelName }}</div>
                  </div>
                </div>
                <div class="info-content">
                  <div class="account">{{ userInfo.nickName }}</div>
                  <div class="id">
                    <span>UID:{{ userInfo.loginName }}</span>
                    <div class="copy-btn" @click="onCopyText(userInfo.loginName)">
                      <svg-icon name="icon-edit" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="member-menu-item account" @click="setMcPage('securityCenter')">
                <svg-icon class="account" name="icon-account" />
                <span>{{ $t('in_my_account') }}</span>
              </div>
              <div class="member-menu-item betting-record" @click="setMcPage('personalHistoryCopy')">
                <svg-icon class="betting-record" name="icon-betting-record" />
                <span>{{ $t('in_betting_record') }}</span>
              </div>
              <div class="member-menu-item message" @click="setMcPage('messageV2')">
                <svg-icon class="message" name="icon-message" />
                {{ $t('in_platform_information') }}
              </div>
              <div class="member-menu-item cs" @click="getService">
                <svg-icon class="cs" name="icon-cs" />
                <span>{{ $t('in_customer_services') }}</span>
              </div>
              <div v-if="userStore.userInfo.isAgent" class="member-menu-item agent" @click="setAcPage('agentTeamOverview')">
                <svg-icon class="agent" name="icon-agent" />
                <span>{{ $t('hd_agent') }}</span>
              </div>
              <div class="member-menu-item logout" @click="onLogout">
                <svg-icon class="logout" name="icon-logout" />
                <span>{{ $t('in_sign_out') }}</span>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.member-info-container {
  height: 43px;
  display: flex;
  gap: 10px;
  .group {
    padding: 0 4px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 8px;
    border: 1px solid #7d7666;
    background: #323131;
  }
  .group.member:hover {
    border-radius: 8px;
    border: 1px solid #b1aca0;
    background: #323131;
  }
  .group.member:hover .icon-down svg {
    stroke: #b1aca0;
  }
  .member-info-item {
    cursor: pointer;
    svg {
      width: 35px;
      height: 35px;
    }
    .balance-container {
      height: 40px;
      padding: 0 5px 0 9px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 20px;
      color: #dadada;
      .symbol {
        font-weight: 900;
      }
      .balance {
        color: #fff;
        flex-shrink: 0;
      }
      .eyes {
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        transition: 0.2s;
        cursor: pointer;
        width: 16.5px;
        height: 10.7px;
        color: #fff;
      }
      .eyes:hover {
        opacity: 0.8;
      }
      .refresh {
        white-space: nowrap;
        transition: 0.2s;
        cursor: pointer;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        svg.processing { @include processing_animation; }
      }
      .refresh:hover {
        opacity: 0.8;
      }
      .refresh svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  .member-account {
    margin: 0 5px 0 3px;
    position: relative;
    display: flex;
    align-items: center;
    gap: 13px;
  }
  .member-account:hover .member-menu {
    visibility: visible;
    opacity: 1;
  }
  .member-account .user-avatar {
    position: relative;
    flex-shrink: 0;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #f0c343;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .member-account .user-avatar > img {
    width: 30px;
    height: 30px;
    // object-fit: contain;
    object-fit: fill;
    border-radius: 50%;
    cursor: pointer;
  }
  .member-account .user-avatar .vip {
    padding: 0 5px 0 2px;
    height: 18.5px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    border-radius: 4px;
    background-image: linear-gradient(278deg, #e8a31d 87%, #dcb05b 0, #ebbb5e 0, #d1992c 0);
    color: #543c00;
    font-size: 20px;
    font-weight: 700;
    font-style: italic;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .member-account .icon-down {
    flex-shrink: 0;
    width: 16.8px;
    height: 8px;
  }
  .member-account .icon-down svg {
    transition: all 0.3s ease;
    stroke: #575d67;
  }
  .member-account .member-menu {
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s;
    position: absolute;
    left: 50%;
    top: 100%;
    padding-top: 19px;
    transform: translateX(-50%);
    .member-menu-bg {
      width: 304px;
      padding: 20px 22px;
      border-radius: 21px;
      background: #1c1c1c;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      .main-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }
      .main-info .avatar-wrap {
        position: relative;
        width: 68.7px;
        height: 68.7px;
        border-radius: 50%;
        background-color: #f0c343;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .main-info .avatar-wrap .avatar {
        width: 62px;
        height: 62px;
        border-radius: 50%;
        // object-fit: contain;
        object-fit: fill;
      }
      .main-info .avatar-wrap .vip-content {
        padding: 2px 8px 0 6px;
        height: 21.8px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);
        border-radius: 4px;
        background-image: linear-gradient(278deg, #e8a31d 87%, #dcb05b 0, #ebbb5e 0, #d1992c 0);
        color: #543c00;
        font-size: 20px;
        font-weight: 700;
        font-style: italic;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .main-info .info-content {
        color: #fff;
        max-width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .main-info .info-content .account {
        color: #fff;
        font-size: 20px;
        font-weight: 400;
      }
      .main-info .info-content .id {
        color: #959375;
        font-size: 20px;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        align-items: center;
      }
      .main-info .info-content .id svg {
        margin-left: 15px;
        width: 18px;
        height: 18px;
        pointer-events: none;
      }
      .main-info .info-content .copy-btn {
        cursor: pointer;
      }

      .member-menu-item {
        padding-left: 25.4px;
        width: 100%;
        height: 48px;
        font-size: 17px;
        color: #c4c7ae;
        white-space: nowrap;
        border-radius: 10px;
        background: #393734;
        cursor: pointer;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 28.4px;
        transition: all 0.3s ease;
        &:hover {
          background: #5d5954;
        }
        .svg-icon {
          &.account {
            width: 22.7px;
            height: 21.8px;
          }
          &.betting-record {
            width: 25.1px;
            height: 28.6px;
          }
          &.message {
            width: 20.5px;
            height: 19px;
          }
          &.cs {
            width: 24.3px;
            height: 25.9px;
          }
          &.agent {
            width: 22.8px;
            height: 29.6px;
          }
          &.logout {
            width: 21.3px;
            height: 24.2px;
          }
        }
      }
    }
  }
}

</style>
