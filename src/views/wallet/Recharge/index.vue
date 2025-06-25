<template>
  <div class="Recharge__box">
    <div class="Recharge__container">
      <NavBar
        class="white"
        :title="$t('recharge')"
        :placeholder="false"
        left-arrow
        @click-left="onClick"
      >
        <template #right>
          <div class="title" @click="handleRechargeRecord">{{ $t('rechargeRecords') }}</div>
        </template>
      </NavBar>
      <!-- 余额组件 -->
      <BalanceAssets />

      <!-- 支付方式选择菜单 -->
      <RechargeMenu />

      <!-- 支付方式组件 -->
      <RechargeContainer />
      <!-- <div
				v-if="!isHaveOrder || isOtherRecharge"
				class="Recharge__container-rechageBtn"
				:class="store.rechargeSubmitBtnStatus ? 'rechage_active' : ''"
				v-throttle-click="{ handler: handleRecharge, wait: 2000 }"
			>
				{{ $t('recharge') }}
			</div> -->
      <!-- 充值说明组件 -->
      <Instructions
        v-if="currentPayId && !hiddenBox"
        :show-type="currentPayId"
        :is-show-head="true"
        :recharge-info="store.currentPayType"
      />

      <RechargeRecord
        v-if="currentPayId && !hiddenBox"
        ref="recordRef"
        :key="currentPayId"
        :pay-i-d="currentPayId"
      />
    </div>
    <!-- <RechargeUpiSheet /> -->

    <Dialog
      v-model:show="dialogShow"
      :show-cancel-btn="true"
      confirm-text="OK"
      :title="$t('c2cLapseOfAmount')"
      @confirm="handleContinueRecharge"
    >
      <template #content>
        <div class="cancen_model_cnt">{{ $t('c2cPCAAmount') }}</div>
      </template>
    </Dialog>

    <van-dialog
      v-if="(store.isRechargeInputDialog && currentPayId !== 19) || [10, 18].includes(currentPayId)"
      v-model:show="store.rechargeDialogVisible"
      :confirm-button-text="$t('confirm')"
    >
      <div class="promptHeader">{{ $t('prompt') }}</div>
      <div class="promptContent">
        <div v-for="(item, index) in store.bank_local" class="input_item">
          <div>{{ item.split(',')[0] }}</div>
          <input
            v-model.trim="store.bankInfo[item.split(',')[1]]"
            class="input_bank"
            :maxlength="index === 0 ? 50 : 30"
            :placeholder="$t('requiredFaild')"
            @input="validateBankForm(store.bankInfo[item.split(',')[1]], index, item.split(',')[1])"
          >
        </div>
        <div v-if="dollarSign === '৳'" class="tip">{{ $t('rechargeBankVailte2') }}</div>
        <div v-else class="tip">
          {{ currentPayId === 9 || currentPayId === 10 ? $t('rechargeBankVailte1') : $t('rechargeBankVailte') }}
        </div>
        <div class="footer_btn">
          <div @click="localBankRecharge">{{ $t('confirm') }}</div>
          <div @click="store.rechargeDialogVisible = false">{{ $t('cancel') }}</div>
        </div>
      </div>
      <template #footer />
    </van-dialog>
    <Dialog
      v-model:show="C2CforbiddenShow"
      :title="$t('C2Cforbidden', [RemainingLimitTime])"
      img-url="forbhidden"
      :show-cancel-btn="false"
      :cancel-text="$t('close')"
      :confirm-text="$t('sure')"
      @confirm="C2CforbiddenShow = false"
    >
      <template #content>
        <div class="forbidden_tip">{{ $t('C2Cforbidden1', [RemainingLimitTime]) }}</div>
        <div class="forbidden1">{{ $t('C2Cforbidden2', [ErrorCount]) }}</div>
        <div class="forbidden2">{{ $t('C2Cforbidden3', [RemainingLimitTime]) }}</div>
        <div class="forbidden3">{{ $t('C2Cforbidden4') }}</div>
      </template>
    </Dialog>

    <Dialog
      v-model:show="isFirstPixRecharge"
      :show-cancel-btn="false"
      :confirm-text="$t('confirm')"
      :cancel-text="$t('cancel')"
      :title="$t('safetyTips')"
      @confirm="isFirstPixRecharge = false"
    >
      <template #content>
        <div class="cancen_model_cnt">{{ $t('safetyTips1') }}</div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Instructions from '@/components/Wallet/Recharge/Instructions.vue'
import RechargeMenu from '@/components/Wallet/Recharge/RechargeMenu.vue'
import RechargeContainer from '@/components/Wallet/Recharge/RechargeContainer.vue'
import BalanceAssets from '@/components/Wallet/BalanceAssets.vue'
import RechargeRecord from '@/components/Wallet/Recharge/RechargeRecord.vue'
import { computed, onMounted, ref } from 'vue'
import { SettingStore, useWalletStore } from '@/stores'
// import RechargeUpiSheet from '@/components/Wallet/Recharge/RechargeUpiSheet.vue'
import { useRecharge } from '@/hooks/useRecharge'
import { useEventBus } from '@/components/common/use'
import Dialog from '@/components/common/Dialog.vue'
import { useArwallet } from '@/hooks'
// import { nextTick } from 'vue'
// import { getIcons } from '@/utils'
// import type { Rechargetypelist, Banklist } from '@/types/api'

const {
  store,
  C2CforbiddenShow,
  ErrorCount,
  RemainingLimitTime,
  currentPayId,
  validateBankForm,
  localBankRecharge,
  getRechargeTypeName,
  getAmountList,
  isFirstPixRecharge,
  isArpay,
  // qrcodeBankRecharge
} = useRecharge()
const { isArWalletActive } = useArwallet()

const router = useRouter()
const walletStore = useWalletStore()
const eventBus = useEventBus()
const dialogShow = ref(false)
const dollarSign = computed(() => SettingStore().getDollarSign)

const hiddenBox = computed(() => {
  if (isArpay.value) {
    if (!isArWalletActive.value) {
      return true
    } else {
      return false
    }
  }
  return false
})

const handleRechargeRecord = () => {
  eventBus.emit('changeKeepAliveKey')
  router.push({ name: 'RechargeHistory' })
}

function onClick () {
  router.go(-1)
}

const handleContinueRecharge = () => {
  getAmountList()
  dialogShow.value = false
  console.log('继续充值')
}

onMounted(async () => {
  walletStore.resetData(true)
  getRechargeTypeName()
  // await getPayTypeName()
  // if (tabList.value.length > 0) recordRef.value.getRecordList(tabList.value[currentMenu.value].payID)
})

// watch(
// 	() => thirdRechargeDialog.value,
// 	(val) => {
// 		if (val) {
// 			let iframe = document.createElement('iframe')
// 			iframe.src = thirdRechargeUrl.value
// 			iframe.style.width = '100%'
// 			iframe.style.height = '100%'
// 			nextTick(() => {
// 				document.getElementById('third_content')?.appendChild(iframe)
// 			})
// 		} else {
// 			let content = document.getElementById('third_content')
// 			if (content?.firstChild) {
// 				content.removeChild(content.firstChild)
// 			}
// 		}
// 	}
// )
</script>

<style lang="scss" scoped>
::v-deep(.van-action-sheet) {
  max-height: 90%;
}

::v-deep(.van-action-sheet__header) {
  background: linear-gradient(180deg, #ff6c6b 0%, #ff4a4a 68.59%);
  color: var(--textW);
}

::v-deep(.van-action-sheet__close) {
  top: 1.5%;
}

#third_content {
  height: 90vh;
}

.Recharge__box {
  position: relative;
  width: 100%;
  font-family: 'Inter', sans-serif;
  overflow: hidden;

  .Recharge__container {
    position: relative;
    width: 100%;
    padding: 0 24px 24px 24px;

    .title {
      font-weight: 400;
      font-size: 26px;
    }
    &-balanceAssets {
      width: 100%;
      height: 260px;
      background-image: url('@icon/main/TotalAssetsBg.png');
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;
      border-radius: 20px;
      color: var(--textW);
      padding: 29px 25px 0 25px;
      position: relative;

      &__header {
        display: flex;
        justify-content: space-between;
        height: 40px;

        &__left {
          font-weight: 400;
          font-size: 26px;

          img {
            margin-right: 16px;
          }
        }

        &__left {
          display: flex;
          align-items: center;

          img {
            width: 36px;
            height: 36px;
            margin-right: 16px;
          }
        }
      }

      &__main {
        height: 55px;
        display: flex;
        align-items: center;
        margin: 16px 28px 28px 0;
        font-weight: 700;
        font-size: 48px;
        text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.12);

        img {
          width: 44px;
          height: 28px;
          margin-left: 18px;
        }
      }

      &__tip {
        img {
          width: 50px;
          height: 32px;
          position: absolute;
          bottom: 26px;
          left: 29px;
        }
      }
    }

    &-paymoney {
      background: var(--bg_color_L2);
      border-radius: 20px;
      margin-top: 20px;
      padding: 30px 22px 32px 20px;

      &__title {
        display: flex;
        font-weight: 600;
        font-size: 36px;
        margin-bottom: 26px;

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
          width: 200px;
          height: 70px;
          color: #ff5a58;
          border: 1px solid #dfdede;
          display: flex;
          align-items: center;
          justify-content: center;

          &.active {
            background: var(--main_gradient-color);
            border-radius: 10px;
            color: var(--textW);
            border: none;
          }
        }
      }

      &__money-input {
        display: flex;
        position: relative;

        .inp {
          height: 88px;
          flex: 1;
          background: #f2f2f2;
          border-radius: 60px;
          position: relative;
          padding-left: 112px;
          padding-right: 80px;
          color: var(--main-color);
          border: none;
          font-weight: 700;
        }

        .place-div {
          position: absolute;
          height: 88px;
          width: 90px;
          /* display: flex;
				align-items: center;
				justify-content: center; */

          img {
            width: 28px;
            height: 46px;
            margin-top: 21px;
            margin-left: 40px;
          }

          .place-icon {
            width: 28px;
            height: 46px;
            position: relative;
          }
        }

        .place-div::after {
          position: absolute;
          content: '';
          height: 40px;
          display: inline-block;
          margin: 0 10px 2px;
          vertical-align: middle;
          border-right: 2px solid #bdbdbd;
          top: 26px;
          right: -10px;
        }

        .place-right {
          position: absolute;
          right: 24px;
          top: 24px;
          display: flex;
          align-content: center;
          justify-content: center;

          img {
            width: 40px;
            height: 40px;
          }
        }
      }
    }

    &-rechageBtn {
      // position: fixed;
      // bottom: 0;
      // left: 50%;
      // transform: translateX(-50%);
      font-size: 30px;
      z-index: 88;
      background: var(--button_dis_color);
      width: 100%;
      max-width: 750px;
      height: 70px;
      line-height: 70px;
      color: var(--textW);
      text-align: center;
      border-radius: 50px;
      margin-bottom: 30px;
    }
  }
  .forbidden_tip {
    color: #f95959;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px; /* 150% */
    margin-bottom: 40px;
    text-align: center;
  }
  .forbidden1,
  .forbidden2 {
    width: 100%;
    color: var(--text_color_L2);
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 100% */
    padding: 10px 0;
    text-align: center;
  }
  .forbidden3 {
    width: 100%;
    color: var(--text_color_L2);
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px; /* 150% */
    padding-top: 40px;
    margin-bottom: 40px;
    text-align: center;
  }

  .rechage_active {
    background: var(--main-color);
    color: var(--text_color_L4);
  }
}

@media screen and (max-width: 500px) {
  .Recharge__box {
    position: relative;
    width: 100%;
    font-family: 'Inter', sans-serif;
    overflow: hidden;

    .Recharge__container {
      &-rechageBtn {
        max-width: none;
      }
    }
  }
}

.cancen_model_cnt {
  font-size: 24px;
  text-align: center;
  color: var(--text_color_L2);
}

/**首页公告弹窗样式 */
:deep() .van-dialog {
  width: 700px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  background: var(--main_gradient-color);
  padding: 0 24px 24px;

  &__content {
    position: relative;
    width: 100%;
    .promptHeader {
      text-align: center;
      height: 88px;
      line-height: 88px;
      color: var(--textW);
      font-weight: 700;
      font-size: 36px;
      position: relative;
    }
    .promptHeader::before {
      content: '';
      position: absolute;
      left: 0;
      top: 40px;
      display: inline-block;
      width: 110px;
      height: 2px;
      margin-right: 10px;
      background: linear-gradient(-90deg, #fff -2.73%, rgba(255, 255, 255, 0) 91.36%);
      html:lang(ar) & {
        left: 20px;
        right: unset;
      }
    }
    .qrcodeHeader {
      background: none;
    }
    .qrcodeHeader::before {
      width: 80px;
      height: 2px;
      background: linear-gradient(90deg, #ffffff -2.73%, rgba(255, 255, 255, 0) 91.36%);
      transform: rotate(180deg);
      margin-bottom: 10px;
      margin-right: 100px;
    }
    .promptHeader::after {
      content: '';
      position: absolute;
      right: 0;
      top: 40px;
      display: inline-block;
      width: 110px;
      height: 2px;
      margin-left: 10px;
      background: linear-gradient(90deg, #fff -2.73%, rgba(255, 255, 255, 0) 91.36%);
      html:lang(ar) & {
        left: unset;
        right: 20px;
      }
    }
    .qrcodeHeader::after {
      width: 80px;
      height: 2px;
      background: linear-gradient(90deg, #ffffff -2.73%, rgba(255, 255, 255, 0) 91.36%);
      margin-bottom: 10px;
      margin-left: 100px;
    }
    .promptContent {
      padding: 30px 20px;
    }
  }
  &.qrcodeDialog {
    background: linear-gradient(180deg, #ff6c6b 0%, #ff4a4a 74.07%);
    padding: 0 20px 20px;
    .promptContent {
      height: 600px;
      background: #fff;
      box-shadow: 0px 4px 4px 0px #e53636;
      border-radius: 20px;
    }
    .qrcodeFooter {
      width: 100%;
      padding: 40px 0;
      div {
        height: 70px;
        border-radius: 70px;
        text-align: center;
        line-height: 70px;
      }
      div:nth-child(1) {
        background-color: #f13f39;
        color: #fff;
        margin-bottom: 30px;
      }
      div:nth-child(2) {
        color: #f13f39;
        border: 1px solid #f13f39;
      }
    }
  }
}
.promptContent {
  width: 100%;
  padding: 24px;
  margin: auto;
  border-radius: 20px;
  background: var(--bg_color_L2);
  .input_item {
    margin-bottom: 40px;
    div {
      color: var(--text_color_L1);
      font-size: 28px;
      font-family: Inter;
      font-weight: 500;
      line-height: 36px;
      margin-bottom: 10px;
    }
    input {
      width: 100%;
      background: var(--bg_color_L1);
      height: 80px;
      color: var(--text_color_L1);
      font-size: 24px;
      line-height: 80px;
      padding: 22px;
      border: none;
      border-radius: 10px;
    }
    input::placeholder {
      color: #b0b0b0;
      font-size: 24px;
      line-height: 80px;
    }
  }
  .tip {
    color: var(--norm_red-color);
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
  }
}
.footer_btn {
  padding-top: 36px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-bottom: 34px;
  div {
    width: 100%;
    height: 70px;
    border-radius: 70px;
    text-align: center;
    line-height: 70px;
  }
  div:nth-child(1) {
    background: var(--main_gradient-color);
    color: #fff;
    margin-bottom: 24px;
  }
  div:nth-child(2) {
    color: var(--main-color);
    border: 1px solid var(--main-color);
  }
}
</style>
