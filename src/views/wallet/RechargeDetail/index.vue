<template>
  <div class="rechargeDetail__container">
    <NavBar
      :left-arrow="true"
      class="main"
      @click-left="router.back()"
      @click-right="handleGoHistory"
    >
      <template #center>{{ $t('recharge') }}</template>
      <template #right>{{ $t('rechargeRecords') }}</template>
    </NavBar>

    <div class="rechargeDetail__container-header">
      <p>{{ $t('rechargeDetailDesc3') }}</p>
      <div ref="countdownRef" class="rechargeDetail__container-header__countdown">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>

    <div class="rechargeDetail__container-main">
      <div v-if="[10].includes(currentPayId)" class="rechargeDetail__container-body">
        <div class="rechargeDetail__container-body__title">
          <h1>
            {{ store.orderDetail?.bankName || $t('rechargeDetailDesc4') }}
          </h1>
        </div>
        <div class="qrcodeCont">
          <p>
            {{ $t('rechageAmount') }} <span>{{ store.orderDetail?.amount || '5,000' }}</span>
          </p>
          <div><img id="qrcode" class="qrcode" :src="codeUrl"></div>
          <div class="save_qrcode" @click="htmlToImage('qrcode')">
            {{ $t('saveTheQRCode') }}
            <p>({{ $t('rechargeQRTip') }})</p>
          </div>
          <div class="qrcode_item">
            <span>{{ serveTime }}</span>
            <div>
              <span>{{ store.orderDetail?.orderNumber }}</span>
              <svg-icon name="copy" @click="copy(store.orderDetail?.orderNumber)" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="rechargeDetail__container-body">
        <div class="rechargeDetail__container-body__title">
          <h1>
            <svg-icon v-if="payTypeId == 157" name="bankKbz" />
            <svg-icon v-else-if="payTypeId == 158" name="bankWave" />
            <svg-icon v-else name="bankTitle" />
            {{ store.orderDetail?.bankName || $t('rechargeDetailDesc4') }}
          </h1>
        </div>
        <div v-for="(item, index) in rechargeDetail" :key="index">
          <div v-if="item.value" class="rechargeDetail__container-body__content">
            <h1>{{ item.title }}</h1>
            <div>
              <span>{{ item.value }}</span>
              <svg-icon name="copy" @click="handleCopy(item.name)" />
            </div>
          </div>
        </div>
        <div v-if="dollarSign === '৳'" class="rechargeDetail__container-body__content">
          <h1>SWIFT CODE</h1>
          <div>
            {{ store.orderDetail?.extend1 }}
            <svg-icon name="copy" @click="copy(store.orderDetail?.extend1)" />
          </div>
        </div>
        <div v-if="dollarSign === '৳'" class="rechargeDetail__container-body__content">
          <h1>Routing Number</h1>
          <div>
            {{ store.orderDetail?.extend2 }}
            <svg-icon name="copy" @click="copy(store.orderDetail?.extend2)" />
          </div>
        </div>
        <div v-if="canshow" class="rechargeDetail__container-body__timestamp">
          <span>{{ orderDetail?.serverTime }}</span>
          <span>
            <span>{{ orderDetail?.orderNumber }}</span>
            <svg-icon name="copy" @click="copy(orderDetail?.orderNumber)" />
          </span>
        </div>
      </div>
      <div v-if="settingStore.getDollarSign === '₹' && currentPayId === 9" class="utr_box">
        <h1>UTR(UPI Ref.ID)</h1>
        <van-field
          v-model="store.bankUTR"
          class="utr_input"
          type="digit"
          :placeholder="$t('bankUTR')"
          :maxlength="12"
        >
          <template #button>
            <div class="paste" @click="paste">{{ $t('paste') }}</div>
          </template>
        </van-field>
      </div>

      <!-- 充值说明组件 -->
      <Instructions :show-type="currentPayId" :is-show-head="true" />
    </div>
    <div v-if="currentPayId === 10" class="rechargeDetail__container-buttons">
      <div>
        <span @click="cancelOrderShow = true">{{ $t('rechargeDetailDesc5') }}</span>
        <span @click="handleFinishOrder()">
          {{ $t('rechargeDetailDesc6') }}
        </span>
        <!-- <span v-else class="disablePayBtn">
					{{ $t('rechargeDetailDesc6') }}
				</span> -->
      </div>
    </div>
    <div v-else class="rechargeDetail__container-buttons">
      <div v-if="!rechargeActionSheetShow">
        <span @click="cancelOrderShow = true">{{ $t('rechargeDetailDesc5') }}</span>
        <span @click="handleFinishPay">{{ $t('rechargeDetailDesc6') }}</span>
      </div>
      <div v-else>
        <span @click="rechargeActionSheetShow = false">{{ $t('rechargeDetailDesc7') }}2</span>
        <span @click="handleFinishOrder()">{{ $t('rechargeDetailDesc8') }}</span>
      </div>
    </div>

    <van-action-sheet v-model:show="rechargeActionSheetShow" :closeable="false">
      <div class="actionSheet__content">
        <div class="title">
          <div v-if="payTypeId == 157" class="img"><svg-icon name="bankKbz" /></div>
          <div v-else-if="payTypeId == 158" class="img"><svg-icon name="bankWave" /></div>
          <div v-else class="img"><svg-icon name="bankTitle" /></div>
          <p>{{ store.orderDetail?.bankName || $t('rechargeDetailDesc4') }}</p>
        </div>

        <div class="divider" />

        <div class="details">
          <span>{{ currentTxt?.text1 }}</span>
          <span>{{ store.orderDetail?.accountName }}</span>
        </div>
        <div class="details">
          <span>{{ currentTxt?.text2 }}</span>
          <span>{{ store.orderDetail?.bankAccountNumber }}</span>
        </div>
        <div class="details">
          <span>{{ currentTxt?.text3 }}</span>
          <span>{{ store.orderDetail?.orderNumber }}</span>
        </div>
        <div class="details">
          <span>{{ currentTxt?.text4 }}</span>
          <span>{{ store.orderDetail?.amount }}</span>
        </div>

        <h1 class="tipTitle">{{ $t('rechargeDetailDesc10') }}</h1>
        <p class="tipText">{{ $t('rechargeDetailDesc11') }}</p>
      </div>
    </van-action-sheet>

    <Dialog
      v-model:show="cancelOrderShow"
      :show-cancel-btn="true"
      :confirm-text="$t('confirmCancel')"
      :cancel-text="$t('cancel')"
      :title="$t('cancelDeal')"
      @confirm="handeCancelOrder(store.orderDetail?.orderNumber as string)"
    >
      <template #content>
        <div class="cancen_model_cnt">{{ $t('orderDesc2') }}</div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { copy } from '@/utils'
import { onMounted, ref, reactive, computed } from 'vue'
import Instructions from '@/components/Wallet/Recharge/Instructions.vue'
import type { NewSetRechargesBankOrderData } from '@/types/api'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { showFailToast } from 'vant'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import Dialog from '@/components/common/Dialog.vue'
import { SettingStore } from '@/stores'
import { useRecharge } from '@/hooks/useRecharge'
import { useEventBus } from '@/components/common/use'

const countdownRef = ref<HTMLElement>() // 倒计时dom
const codeUrl = ref('')
const currentPayId = computed(() => Number(router.currentRoute.value.query.currentPayId))
const payTypeId = computed(() => Number(router.currentRoute.value.query.payTypeId))
const serveTime = computed(() => dayjs(store.orderDetail?.serverTime).format('YYYY-MM-DD HH:mm:ss'))
const eventBus = useEventBus()
const dollarSign = computed(() => SettingStore().getDollarSign)

const {
  rechargeActionSheetShow,
  cancelOrderShow,
  store,
  getLoclBankOrderDetail,
  handleFinishOrder,
  handlePaste,
  handeCancelOrder,
  countdownTimeFun,
  setCountdownRef,
  htmlToImage,
  getBankOrderInfo,
} = useRecharge()
const { t } = useI18n()

// const countdown = ref<NodeJS.Timer>()
const router = useRouter()
// const rechargeActionSheetShow = ref(false)
// const cancelOrderShow = ref(false)
const settingStore = SettingStore()
// const UTR = ref('')
const rechargeDetailTitle1 = computed(() => {
  if (router.currentRoute.value.query.bankName === 'KBZpay') {
    return {
      tit1: t('kbzName'),
      tit2: t('kbzMobile'),
      tit3: t('rechageAmount'),
    }
  } else if (router.currentRoute.value.query.bankName === 'WavePay') {
    return {
      tit1: t('waveName'),
      tit2: t('waveMobile'),
      tit3: t('rechageAmount'),
    }
  } else {
    return {
      tit1: t('rechargeDetailTitle1'),
      tit2: t(currentPayId.value === 9 ? 'rechargeDetailTitle2' : 'account'),
      tit3: t('amount'),
    }
  }
})

const rechargeDetail: any = reactive([
  {
    title: rechargeDetailTitle1.value.tit1,
    value: '',
    name: 'accountName',
  },
  {
    title: rechargeDetailTitle1.value.tit2,
    value: '',
    name: 'bankAccountNumber',
  },
  {
    title: 'IFSC',
    value: '',
    name: 'ifscCode',
  },
  {
    title: rechargeDetailTitle1.value.tit3,
    value: '',
    name: 'amount',
  },
])

const handleGoHistory = () => {
  eventBus.emit('changeKeepAliveKey')
  router.replace({ name: 'RechargeHistory' })
}

const orderDetail = ref<NewSetRechargesBankOrderData>()

const canshow = computed(() => {
  return SettingStore().getProjectName === 'vn168'
})
const currentTxt = computed(() => {
  if (currentPayId.value === 9) {
    return {
      text1: t('accountName'),
      text2: t('bankNumber'),
      text3: t('orderNumber'),
      text4: t('rechageAmount'),
    }
  } else if (payTypeId.value === 157) {
    return {
      text1: t('kbzName'),
      text2: t('kbzMobile'),
      text3: t('orderNumber'),
      text4: t('rechageAmount'),
    }
  } else if (payTypeId.value === 158) {
    return {
      text1: t('waveName'),
      text2: t('waveMobile'),
      text3: t('orderNumber'),
      text4: t('rechageAmount'),
    }
  } else {
    return {
      text1: t('name'),
      text2: t('account'),
      text3: t('orderNumber'),
      text4: t('rechageAmount'),
    }
  }
})

/**
 * @description: 粘贴
 * @return {*}
 */
const paste = async () => {
  store.bankUTR = await handlePaste()
}

const handleFinishPay = () => {
  const payId = Number(router.currentRoute.value.query.currentPayId)
  if ((!store.bankUTR || store.bankUTR.length < 12) && settingStore.getDollarSign === '₹' && payId === 9) {
    showFailToast({ message: t('bankUTR'), wordBreak: 'break-word' })
    return
  }
  rechargeActionSheetShow.value = true
}

/**
 * @description: 点击复制
 * @param {*} key
 * @return {*}
 */
const handleCopy = (key: keyof NewSetRechargesBankOrderData): any => {
  let val = store.orderDetail ? store.orderDetail[key] : ''
  if (key === 'bankAccountNumber') val = val?.replaceAll(' ', '')
  copy(val)
}

onMounted(async () => {
  // console.log('store.orderDetail',store, store.orderDetail)

  setCountdownRef(countdownRef.value as HTMLElement)
  const payId = currentPayId.value === 10 ? currentPayId.value : router.currentRoute.value.query.payTypeId
  await getBankOrderInfo(Number(payId))
  await getLoclBankOrderDetail(store.orderDetail?.orderNumber + '')
  rechargeDetail[0].value = store.orderDetail?.accountName || ''
  rechargeDetail[1].value = store.orderDetail?.bankAccountNumber || ''
  if (settingStore.getDollarSign === '₹' && currentPayId.value === 9) {
    rechargeDetail[2].value = store.orderDetail?.ifscCode || ''
  }
  rechargeDetail[3].value = store.orderDetail?.amount || ''
  if (currentPayId.value === 10) {
    // const code = await createQrCode(store.orderDetail?.bankCardQRCodeUrl || '')
    codeUrl.value = store.orderDetail?.bankCardQRCodeUrl || ''
  }
  countdownTimeFun(store.orderDetail?.serverTime as string, store.orderDetail?.addTime1 as string, () => {
    store.orderDetail = undefined
    store.isBankOrder = false
    router.back()
  })
})
onBeforeRouteLeave((to: any, from: any, next) => {
  // 清除缓存
  // sessionStorage.removeItem('localOrder')
  next()
})
</script>

<style lang="scss" scoped>
.rechargeDetail__container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;

  :deep(.navbar) {
    .navbar-fixed {
      background: var(--light-main-color, var(--bg_color_L2));
    }
    .navbar__content-left {
      i {
        color: #fff;
      }
    }

    .navbar__content-center,
    .navbar__content-right {
      color: #fff;
    }

    .navbar__content-center {
      font-size: 36px;
      line-height: 36px;
    }

    .navbar__content-right {
      font-size: 26px;
    }
  }

  &-header {
    position: relative;
    top: 0;
    width: 100%;
    min-height: 330px;
    padding: 0 99px 140px;
    text-align: center;
    display: flex;
    align-items: center;
    background: var(--light-main-color);

    p {
      bottom: 151px;
      width: 552px;
      color: #fff;
      font-size: 24px;
    }

    &__countdown {
      position: absolute;
      left: 50%;
      bottom: 37px;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      width: 100%;

      span {
        display: inline-block;
        width: 60px;
        height: 80px;
        color: var(--norm_red-color);
        font-size: 48px;
        line-height: 80px;
        border-radius: 10px;
        background: var(--bg_color_L3);

        &:nth-of-type(3) {
          width: 40px;
        }
      }
    }
  }

  &-main {
    padding: 20px 24px 140px;
  }

  &-body {
    padding: 30px 20px;
    background: var(--bg_color_L2);
    border-radius: 20px;
    margin-bottom: 20px;

    &__title {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 36px;

      h1 {
        display: inline-block;
        color: var(--text_color_L1);
        height: 48px;
        line-height: 48px;
        font-size: 30px;
        font-weight: 600;
        background-repeat: no-repeat;
        background-position: left center;
        background-size: 48px 48px;
        svg {
          width: 48px;
          height: 48px;
        }
      }
    }

    &__content {
      width: 100%;

      h1 {
        margin-bottom: 10px;
        color: var(--text_color_L1);
        font-size: 30px;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        margin-bottom: 44px;
        padding-inline: 19px;
        color: var(--text_color_L2);
        font-size: 28px;
        border-radius: 10px;
        background: var(--bg_color_L1);

        svg {
          width: 32px;
          height: 32px;
        }
      }
    }

    &__timestamp {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #b8b8b8;
      font-size: 24px;

      svg {
        width: 24px;
        height: 24px;
        margin-left: 11px;
      }
    }
    .qrcodeCont {
      text-align: center;
      > p {
        color: var(--text_color_L1);
      }
      .qrcode {
        width: 280px;
        height: 280px;
        margin: 10px 0;
      }
      .save_qrcode {
        width: 280px;
        display: inline-block;
        padding: 10px 8px 10px 8px;
        border-radius: 10px;
        border: 1px solid #f95959;
        color: #f95959;
        font-size: 26px;
        p {
          font-size: 20px;
        }
      }
      .qrcode_item {
        color: var(--text_color_L1);
        margin-top: 30px;
        text-align: left;
        svg {
          width: 24px;
          height: 24px;
        }
        > div {
          float: right;
          span {
            display: inline-block;
            vertical-align: 2px;
            margin-right: 10px;
          }
        }
      }
    }
  }

  &-buttons {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 750px;
    height: 120px;
    z-index: 3000;

    & > div {
      display: flex;
      width: 100%;
      height: 100%;

      & > span {
        flex: 1;
        font-size: 34px;
        display: grid;
        place-items: center;

        &:first-of-type {
          color: var(--text_color_L2);
          background: var(--bg_color_L3);
        }

        &:last-of-type {
          color: var(--text_color_L4);
          background: var(--main-color);
        }
        &.disablePayBtn {
          background: #b6bad0;
        }
      }
    }
  }

  :deep(.van-action-sheet) {
    padding: 40px 25px;
    height: 796px;

    .title {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;

      svg {
        width: 48px;
        height: 48px;
      }

      h1 {
        color: var(--text_color_L1);
        font-size: 32px;
        height: 48px;
        line-height: 48px;
        background-repeat: no-repeat;
        background-position: left center;
        background-size: 48px 48px;
        padding-left: 66px;
      }
    }

    .divider {
      border-top: 1px solid #dbdbdb;
      margin-block: 33px;
    }

    .details {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 33px;
      color: var(--main-color);
      font-size: 26px;

      span {
        &:last-of-type {
          color: var(--text_color_L2);
        }
      }

      &:last-of-type {
        margin-bottom: 77px;

        span {
          &:last-of-type {
            color: var(--norm_secondary-color);
          }
        }
      }
    }

    .tipTitle {
      height: 36px;
      color: var(--text_color_L1);
      font-size: 36px;
      font-weight: 600;
      line-height: 36px;
    }

    .tipText {
      margin-top: 30px;
      color: var(--text_color_L2);
      font-size: 26px;
    }
  }
}
.utr_box {
  margin-bottom: 30px;
  h1 {
    color: var(--text_color_L1);
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 6px;
  }
  .utr_input {
    padding: 0;
    height: 80px;
    line-height: 80px;
    padding-left: 20px;
    background-color: var(--bg_color_L2);
    color: var(--text_color_L2);
    border-radius: 6px;
  }
  .paste {
    width: 190px;
    height: 70px;
    border-radius: 10px;
    color: var(--text_color_L4);
    text-align: center;
    font-size: 26px;
    line-height: 70px;
    margin-right: 20px;
    margin-top: 5px;
    border-radius: 10px;
    background: var(--main_gradient-color);
  }
}

@media screen and (max-width: 500px) {
  .rechargeDetail__container-buttons {
    max-width: none;
  }
}
</style>
