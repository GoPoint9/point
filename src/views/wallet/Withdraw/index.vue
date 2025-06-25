<template>
  <div class="withdraw__container">
    <NavBar
      :title="$t('withdraw')"
      left-arrow
      @click-left="onBack"
      @click-right="router.push({ name: 'WithdrawHistory' })"
    >
      <template #right>
        <span> {{ $t('withdrawRecords') }}</span>
      </template>
    </NavBar>
    <div class="withdraw__container-content">
      <!--资产余额-->
      <BalanceAssetsW :data_NewSetWithdrawal="data_NewSetWithdrawal" :withdrawalsrule="ResWithdrawalsL.withdrawalsrule" />
      <!--提款方式-->
      <WithdrawalTypes
        :data_NewSetWithdrawal="data_NewSetWithdrawal"
        :withdrawal-typeslist="withdrawalTypeslist"
        :c2c-award="c2cAward"
        @on-select-withdrawal-type="onSelectWithdrawalType"
      />
      <!-- upi -->
      <template v-if="data_NewSetWithdrawal.type == 2">
        <c2cUpi :withdrawalslist="ResWithdrawalsL.withdrawalslist" :bid="data_NewSetWithdrawal.bid" />
      </template>
      <!-- c2cupi -->
      <template v-if="data_NewSetWithdrawal.type == 20">
        <c2cUpi :withdrawalslist="ResWithdrawalsL.withdrawalslist" :bid="data_NewSetWithdrawal.bid" />
        <c2cField
          :c2crule="ResWithdrawalsL.withdrawalsrule"
          :c2c-award="c2cAward"
          :c2c-name="withdrawalTypeslist.find((item) => item.withdrawID == 20)?.name || ''"
          @setc2c-amount="setc2cAmount"
        >
          <div class="recycleBtnD c2c">
            <button class="recycleBtn" :class="{ active: isActiveC }" @click="onShowPwdD">
              {{ $t('withdraw') }}
            </button>
          </div>
        </c2cField>
        <c2cRecord ref="c2cRecordRef" />
      </template>
      <template v-else-if="data_NewSetWithdrawal.type == 21">
        <ArCard ref="ArCardRef" @on-show-pwd-d="onShowPwdD()" />
      </template>
      <template v-else-if="data_NewSetWithdrawal.type == 4">
        <wC4Id :withdrawalslist="ResWithdrawalsL.withdrawalslist" :bid="data_NewSetWithdrawal.bid" :name="activeName" />
        <wC4Field
          :rule="ResWithdrawalsL.withdrawalsrule"
          :award="c2cAward"
          :name="withdrawalTypeslist.find((item) => item.withdrawID == 20)?.name || ''"
          @setc2c-amount="setc2cAmount"
        >
          <div class="recycleBtnD c2c">
            <button class="recycleBtn" :class="{ active: isActiveC }" @click="onShowPwdD">
              {{ $t('withdraw') }}
            </button>
          </div>
        </wC4Field>
        <!--提现记录-->
        <WithdrawHistory ref="withdrawHistory" />
      </template>
      <template v-else>
        <!--银行卡模块-->
        <div v-if="ResWithdrawalsL.withdrawalslist.length" class="bankInfo" @click="ontoBankCard()">
          <div
            v-if="[1, 5].includes(data_NewSetWithdrawal.type)"
            class="bankInfoItem"
            :class="`type${data_NewSetWithdrawal.type}`"
          >
            <div>
              <svg-icon :name="data_NewSetWithdrawal.type" />

              <span>{{ bankCardList.bankName }}</span>
            </div>
            <div>
              <span>{{ bankCardList.beneficiaryName }}</span>
              <span>{{ bankCardList.accountNo }}</span>
            </div>
            <van-icon name="arrow" />
          </div>
          <div v-if="[3, 10].includes(data_NewSetWithdrawal.type)" class="bankInfoItem usdt">
            <div>
              <img :src="getIcons('wallet/withdrawType', `${data_NewSetWithdrawal.type}`)">
              <span>{{ bankCardList.bankName }}</span>
            </div>
            <div>
              <span>{{ bankCardList.accountNo }}</span>
              <van-icon name="arrow" />
            </div>
            <div>
              <span>{{ bankCardList.usdtRemarkName }}</span>
            </div>
          </div>
          <div v-if="[6, 8].includes(data_NewSetWithdrawal.type)" class="bankInfoItem usdt KBZ">
            <div>
              <img :src="getIcons('wallet/withdrawType', `${data_NewSetWithdrawal.type}`)">
              <span v-if="data_NewSetWithdrawal.type == 6">{{ bankCardList.bankName }}</span>
              <span v-if="data_NewSetWithdrawal.type == 8">{{ bankCardList.walletName }}</span>
            </div>
            <div>
              <span v-if="data_NewSetWithdrawal.type == 6">{{ bankCardList.accountNo }}</span>
              <span v-if="data_NewSetWithdrawal.type == 8">{{ bankCardList.mobileNO }}</span>
            </div>
          </div>
        </div>
        <AddWithdrawType
          v-show="[1, 3, 6, 8, 5, 10].includes(data_NewSetWithdrawal.type) && ResWithdrawalsL.withdrawalslist.length == 0"
          :type="data_NewSetWithdrawal.type"
          :is-showhint-text-o="true"
        />
        <!--输入区-->
        <WithdrawField
          ref="withdrawField"
          :data_NewSetWithdrawal="data_NewSetWithdrawal"
          :withdrawalsrule="ResWithdrawalsL.withdrawalsrule"
        />

        <div class="recycleBtnD">
          <button class="recycleBtn" :class="{ active: isActiveC }" @click="onShowPwdD">{{ $t('withdraw') }}</button>
        </div>
        <!--提现说明组件-->
        <InstructionsW :withdraw-type="data_NewSetWithdrawal.type" :withdrawalsrule="ResWithdrawalsL.withdrawalsrule" />
        <!--提现记录-->
        <WithdrawHistory ref="withdrawHistory" />
      </template>
    </div>

    <!--提现成功弹窗-->
    <van-dialog v-model:show="succeedDialogShow" :show-confirm-button="false" z-index="100">
      <img v-lazy="getIcons('public', 'succeed')" class="succeed">
      <div class="van-dialog__content-title">{{ $t('tipWithdrawalApplicationSuccess') }}</div>
      <div class="van-dialog__content-note">
        <span>{{ $t('tipWithdrawWillBeCompletedIn2Hours') }}</span><span>{{ $t('tipPlaWaitPaciently') }}...</span>
      </div>
      <div class="van-dialog__content-btn" @click="onConfirm()">{{ $t('confirm') }}</div>
    </van-dialog>
    <Dialog
      v-model:show="succeedDialogShowC2c"
      class="c2c"
      :show-cancel-btn="false"
      :title="$t('withdrawTip2')"
      @confirm="onConfirm('c2c')"
    >
      <template #header>
        <img v-lazy="getIcons('public', 'succeed')" class="succeedImg">
      </template>
      <template #content>
        <div class="c2cTip">
          <h1 v-html="$t('withdrawTip3')" />
          <p v-html="$t('withdrawTip4')" />
        </div>
      </template>
    </Dialog>
    <!--输入密码弹窗-->
    <van-popup
      v-if="showBottom"
      v-model:show="showBottom"
      position="bottom"
      closeable
      round
    >
      <div class="pwd">
        <div class="pwd-head ar-1px-b">
          <svg-icon name="safeIcon" />
          <h1>{{ $t('withdrawDialogDesc1') }}</h1>
        </div>
        <input type="text" class="is-hidden">
        <input type="password" class="is-hidden">
        <PasswordInput v-model:value="data_NewSetWithdrawal.pwd" :label="$t('withdrawDialogPh')" :maxlength="32" />
        <span class="red">{{ $t('withdrawDialogDesc3') }}</span>
        <div class="forgetPwd">
          <span v-if="isOpenForgetPasswordSMSState" @click="forgetPwd">{{ $t('withdrawDialogDesc4') }}</span>
          <div class="red" @click="onservice">{{ $t('withdrawDialogDesc5') }}</div>
        </div>
        <div class="btnD">
          <button @click="() => (showBottom = false)">{{ $t('withdrawDialogDesc6') }}</button>
          <button @click="onNewSetWithdrawal">{{ $t('withdrawDialogDesc7') }}</button>
        </div>
      </div>
    </van-popup>
    <!--不在提现时间内提示-->
    <van-dialog v-model:show="noRightTimeDialogShow" :show-confirm-button="false" z-index="100">
      <NoRightTimeDialog />
    </van-dialog>
    <van-dialog
      v-model:show="showC2c"
      :show-confirm-button="false"
      class="c2cconfirm"
      width="100%"
    >
      <C2cConfirm v-if="showC2c" v-model:show-c2c="showC2c" />
    </van-dialog>
    <Dialog
      v-model:show="showAllowWithdraw"
      :show-cancel-btn="false"
      :show-close-icon="true"
      :click-out-side="true"
      @confirm="() => (showAllowWithdraw = false)"
    >
      <template #content>
        <h1>{{ $t('withdrwsTip1') }}</h1>
      </template>
    </Dialog>
  </div>

  <van-dialog v-model:show="safeBoxShow" class-name="prompt-dialog">
    <div class="promptContent" v-html="safeBoxText" />
    <template #footer>
      <div class="question">{{ $t('safeG') }}</div>
      <div class="button">
        <div @click="safeBoxShow = false">{{ $t('no') }}</div>
        <div @click="gotoSafe">{{ $t('go') }}</div>
      </div>
    </template>
  </van-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getIcons, AwaitApiResult, fixMsg, currency } from '@/utils'
import { GetSettingByKey, GetWithdrawalTypes, GetWithdrawals, NewSetWithdrawal } from '@/api'
import type {
  ResWithdrawlist,
  ReqNewSetWithdrawal,
  ResWithdrawals,
  withdrawalsruleList,
  withdrawalslist,
  UserInfo
} from '@/types/api'
import { useCommonStore, useWalletStore, useUserStore, GlobalStore } from '@/stores'
import { showFailToast } from 'vant'
import PasswordInput from '@/components/Login/PasswordInput.vue'
import BalanceAssetsW from '@/components/Wallet/Withdraw/BalanceAssetsW.vue'
import WithdrawHistory from '@/components/Wallet/Withdraw/WithdrawHistory.vue'
import WithdrawalTypes from '@/components/Wallet/Withdraw/withdrawalTypes.vue'
import WithdrawField from '@/components/Wallet/Withdraw/withdrawField.vue'
import AddWithdrawType from '@/components/Wallet/Withdraw/AddWithdrawType.vue'
import InstructionsW from '@/components/Wallet/Withdraw/InstructionsW.vue'
import C2cConfirm from '@/components/Wallet/Withdraw/c2cConfirm.vue'
import c2cField from '@/components/Wallet/Withdraw/c2cField.vue'
import c2cUpi from '@/components/Wallet/Withdraw/c2cUpi.vue'
import c2cRecord from '@/components/Wallet/Withdraw/c2cRecord.vue'
import wC4Field from '@/components/Wallet/Withdraw/wC4Field.vue'
import wC4Id from '@/components/Wallet/Withdraw/wC4Id.vue'
import Dialog from '@/components/common/Dialog.vue'
import ArCard from '@/components/Wallet/Withdraw/Ar/card.vue'
import NoRightTimeDialog from '@/components/Wallet/Withdraw/noRightTimeDialog.vue'
import { useWithdraw } from '@/hooks'
import { useI18n } from 'vue-i18n'

const { setWithdrawal, setWithdrawalsrule, setWithdrawalTypeslist } = useWithdraw()

const { t } = useI18n()
const { setLoading } = useCommonStore()
const { getUserInfo, getRegisterState, $state } = useUserStore()
const router = useRouter()
const walletStore = useWalletStore()
const withdrawField = ref()
const ArCardRef = ref()
const withdrawHistory = ref()
const bankCardList = ref<any>({})
const c2cRecordRef = ref()
const c2cAward = ref<number>(0)
const showC2c = ref(false)
const showAllowWithdraw = ref(false)
const isOpenForgetPasswordSMSState = computed(() => $state.isOpenForgetPasswordSMSState)
function onBack () {
  router.back()
}
const globalStore = GlobalStore()
const userInfo = computed(() => {
  return globalStore.userInfo as UserInfo
})
// 进入保险箱
const safeBoxText = ref('')
const safeBoxShow = ref(false)
// 进入选择银行或选择usdt地址
function ontoBankCard () {
  const map: any = {
    1: 'Withdraw-BankCard',
    3: 'Withdraw-USDT',
    10: 'Withdraw-USDT',
    5: 'Withdraw-PIX',
  }
  router.replace({
    name: map[data_NewSetWithdrawal.type],
  })
}

// 提现按钮显示状态
const isActiveC = computed(() => {
  const ruleType = [4, 20]
  if (ruleType.includes(data_NewSetWithdrawal.type) && data_NewSetWithdrawal.amount > 0) {
    if (ResWithdrawalsL.value.withdrawalslist.length == 0) return false
    if (data_NewSetWithdrawal.bid == 0) return false
    if (data_NewSetWithdrawal.amount < 1) return false
    if (data_NewSetWithdrawal.amount > ResWithdrawalsL.value.withdrawalsrule.canWithdrawAmount) return false
    return true
  }
  const ruleType_2 = [1, 2, 3, 5, 6, 8, 10]
  if (
    data_NewSetWithdrawal.bid == 0 ||
    !ruleType_2.includes(data_NewSetWithdrawal.type) ||
    data_NewSetWithdrawal.amount < 1 ||
    withdrawField.value?.showValidate ||
    withdrawField.value?.showValidateUB ||
    (data_NewSetWithdrawal.type == 1 && data_NewSetWithdrawal.amount.toString().indexOf('.') != -1)
  ) {
    return false
  }
  return true
})

const succeedDialogShow = ref(false) // 提现成功弹窗显示状态
const succeedDialogShowC2c = ref(false)
const showBottom = ref(false) // 输入密码弹出层
const noRightTimeDialogShow = ref(false) // 不在提现时间段内提示

// 提现接口参数
const data_NewSetWithdrawal = reactive<ReqNewSetWithdrawal>({
  amount: 0,
  pwd: '',
  type: 0,
  bid: 0,
  name: '',
})

// 缓存提现接口参数
watch(data_NewSetWithdrawal, (newVal) => {
  walletStore.setWithdrawal({ ...newVal })
  setWithdrawal(newVal)
})

// 提现-防抖
const timer = ref(null)
const orderNo = ref('')
async function onNewSetWithdrawal () {
  if (timer.value) {
    clearTimeout(timer.value)
  }
  timer.value = setTimeout(async () => {
    if (userInfo.value.isAllowWithdraw == 0) {
      showAllowWithdraw.value = true
      showBottom.value = false
      return
    }
    const info = ResWithdrawalsL.value.withdrawalsrule
    data_NewSetWithdrawal.amount = Number(data_NewSetWithdrawal.amount)
    const amtreg = /^\d+(\.\d{1,2})?$/
    if (!amtreg.test(data_NewSetWithdrawal.amount.toString())) {
      // 金额格式
      showFailToast(t('showDialogTip1'))
      showBottom.value = false
      return
    }

    // 当提款方式是bankcard时，金额不能超过单次提现范围
    if (data_NewSetWithdrawal.amount > info.maxPrice || data_NewSetWithdrawal.amount < info.minPrice) {
      showFailToast(t('wordWithdrawal', [currency(info.minPrice), currency(info.maxPrice)]))
      showBottom.value = false
      return
    }

    setLoading(true)
    const res = await AwaitApiResultW(NewSetWithdrawal(data_NewSetWithdrawal))
    if (res) {
      if (res.code !== 0 && res.msgCode == 220) {
        // 不在提现时间范围内
        noRightTimeDialogShow.value = true
        setTimeout(function () {
          noRightTimeDialogShow.value = false
        }, 3000)
      } else if (res.code !== 0 && res.msgCode == 280) {
        // 有未完成的订单
        setTimeout(function () {
          if (data_NewSetWithdrawal.type == 20 && res?.data) {
            localStorage.setItem('c2cOrderNo', res?.data)
            router.push({ name: 'Withdraw-C2cDetail', query: { order: res?.data } })
          }
        }, 2000)
      } else {
        if (data_NewSetWithdrawal.type == 20) {
          succeedDialogShowC2c.value = true
          orderNo.value = res?.data
        } else {
          succeedDialogShow.value = true
        }
      }
    }
    showBottom.value = false
    setLoading(false)
  }, 500) as any
}

const AwaitApiResultW = async <T = any>(promise: Promise<any>): Promise<T | null> => {
  const result: IRes | any = await promise
    .then((res: IRes) => {
      if (res && res.code !== 0) {
        if ([220].includes(res.msgCode)) {
          return res
        } else if ([280].includes(res.msgCode)) {
          fixMsg(res)
          return res
        }
        fixMsg(res)
        return null
      }
      return res
    })
    .catch((error) => {
      fixMsg(error)
      return null
    })
  return result
}

// 提现成功弹窗确认按钮点击事件
async function onConfirm (type?: string) {
  if (type == 'c2c') {
    succeedDialogShowC2c.value = false
    if ((data_NewSetWithdrawal.type == 20 || data_NewSetWithdrawal.type == 2) && orderNo.value) {
      localStorage.setItem('c2cOrderNo', orderNo.value)
      router.push({ name: 'Withdraw-C2cDetail', query: { order: orderNo.value } })
    }
  } else {
    succeedDialogShow.value = false
    await router.push({ name: 'WithdrawHistory' })
  }
}

// 展示密码弹窗
function onShowPwdD () {
  if (data_NewSetWithdrawal.type == 21) {
    if (ArCardRef.value?.isActiveC) {
      data_NewSetWithdrawal.pwd = ''
      showBottom.value = true
    }
  } else {
    if (isActiveC.value) {
      data_NewSetWithdrawal.pwd = ''
      showBottom.value = true
    }
  }
}

// 获取提款方式
const withdrawalTypeslist = ref<ResWithdrawlist[]>([])
async function getWithdrawalTypes () {
  setLoading(true)
  const res = await AwaitApiResult(GetWithdrawalTypes())
  if (res) {
    withdrawalTypeslist.value = res?.data.withdrawlist || []
    setWithdrawalTypeslist(withdrawalTypeslist.value)
    // 重新进入页面时选中上次选择的提款方式
    if (
      walletStore.getWithdrawal.type &&
      withdrawalTypeslist.value.find((item) => item.withdrawID == walletStore.getWithdrawal.type)
    ) {
      data_NewSetWithdrawal.type = walletStore.getWithdrawal.type
    } else if (!withdrawalTypeslist.value.find((item) => item.withdrawID == walletStore.getWithdrawal.type)) {
      data_NewSetWithdrawal.type = 0
    }
    if (data_NewSetWithdrawal.type == 0) {
      data_NewSetWithdrawal.type = withdrawalTypeslist.value[0].withdrawID
      activeName.value = withdrawalTypeslist.value[0].name
      if (data_NewSetWithdrawal.type == 20) showC2c.value = true
    }
    // 电子钱包带名称
    if (data_NewSetWithdrawal.type == 4) {
      activeName.value = withdrawalTypeslist.value.find((item: any) => item.withdrawID == 4)?.name || ''
    }
    // 是否展示引导弹窗
    safeBoxShow.value = res.data.isOpenSafeGuide || false
    safeBoxText.value = res.data.safeGuideContent || ''
  }
  setLoading(false)
}

const activeName = ref('')

// 切换提款方式，清空金额和usdt数量
async function onSelectWithdrawalType (item: any) {
  if (data_NewSetWithdrawal.type != item.withdrawID) {
    if (item.withdrawID == 20) {
      showC2c.value = true
    }
    data_NewSetWithdrawal.type = item.withdrawID
    bankCardList.value = {}
    await GetWithdrawalsV()
    activeName.value = item.name || ''
    data_NewSetWithdrawal.bid =
      ResWithdrawalsL.value.withdrawalslist.length > 0 ? ResWithdrawalsL.value.withdrawalslist[0].bid : 0
    data_NewSetWithdrawal.amount = 0
    withdrawField.value && (withdrawField.value.usdtCount = 0)
  }
}

// #region  获取该提款方式下的银行信息和提款规则
const ResWithdrawalsL = ref<ResWithdrawals>({
  withdrawalslist: [] as Array<withdrawalslist>,
  withdrawalsrule: {} as withdrawalsruleList,
})

function acitveBank () {
  bankCardList.value = ResWithdrawalsL.value.withdrawalslist.find((item: any) => {
    return item.bid == data_NewSetWithdrawal.bid
  })
  if (!bankCardList.value) {
    data_NewSetWithdrawal.bid = ResWithdrawalsL.value.withdrawalslist[0].bid
    bankCardList.value = ResWithdrawalsL.value.withdrawalslist[0]
  }
}

async function GetWithdrawalsV () {
  setLoading(true)
  const res = await AwaitApiResult(GetWithdrawals({ withdrawid: data_NewSetWithdrawal.type }))
  setLoading(false)
  if (res) {
    ResWithdrawalsL.value = res.data
    setWithdrawalsrule(res.data?.withdrawalsrule)
    if (res.data.lastBandCarkName) {
      localStorage.setItem('lastBandCarkName', res.data?.lastBandCarkName)
    } else {
      localStorage.removeItem('lastBandCarkName')
    }
    if (!ResWithdrawalsL.value.withdrawalslist.length) return
    if (data_NewSetWithdrawal.bid == 0) {
      data_NewSetWithdrawal.bid = ResWithdrawalsL.value.withdrawalslist[0]?.bid || 0
    }
    acitveBank()
    walletStore.setWithdrawalslist(res.data.withdrawalslist)
  }
}

onMounted(async () => {
  // 重新进入页面时选中上次选择的提款方式
  if (walletStore.getWithdrawal.type) data_NewSetWithdrawal.type = walletStore.getWithdrawal.type
  // 接收BankCard，USDT选中传过来的值
  data_NewSetWithdrawal.bid = (Number(router.currentRoute.value?.query?.bid || 0) as unknown as number) || 0
  getUserInfo({ signature: globalStore.token })
  getRegisterState()
  // 获取提现类别
  await getWithdrawalTypes()
  await GetWithdrawalsV()
  await getAward()
})

// 联系客服
function onservice () {
  router.push({
    name: 'CustomerService',
  })
}

// 进入重置密码页面
function forgetPwd () {
  router.push({ name: 'rpwd' })
}
// 跳转去保险箱
const gotoSafe = () => {
  router.push({ name: 'StrongBox' })
}
/** ****** c2c提现 **********/

/**
 * @description: 获取奖励比例
 * @return {*}
 */
const getAward = async () => {
  const res = await AwaitApiResult(GetSettingByKey({ key: 'C2CWithdrawRewardRate' }))
  const value = res?.data.value1 || 0
  c2cAward.value = Number(value)
}

const setc2cAmount = (amount: number) => {
  data_NewSetWithdrawal.amount = amount
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/extend';
@import '@/assets/styles/withdraw';

.withdraw__container {
  font-family: 'Inter';
  font-style: normal;
  color: var(--text_color_L2);
  //padding-bottom: 60px;
  font-weight: 400;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  letter-spacing: 0.04em;

  :deep(.navbar__content-left > .van-icon) {
    font-size: 40px;
  }
  span.red {
    color: var(--norm_red-color);
  }

  &-content {
    margin-top: 30px;
    padding-inline: 30px;
  }

  .pwd {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ::-webkit-input-placeholder {
      /* WebKit browsers */
      color: var(--text_color_L3);
    }

    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: var(--text_color_L3);
    }

    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: var(--text_color_L3);
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: var(--text_color_L3);
    }

    > div:nth-of-type(2) {
      margin-top: 25px;
    }

    &-head {
      padding: 30px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 90%;

      svg {
        width: 48px;
        height: 48px;
        margin-right: 5px;
        color: var(--main-color);
      }

      h1 {
        color: var(--text_color_L1);
        font-weight: 600;
        font-size: 32px;
      }

      h2 {
        color: var(--text_color_L1);
        font-weight: 500;
        font-size: 32px;
      }
    }

    input {
      border-radius: 10px;
      height: 88px;
      width: 90%;
      background: none;
      //padding: 27px 26px;
      font-size: 28px;
      // color: #acafc2;
      padding-left: 20px;
    }

    > span {
      text-align: left;
      width: 90%;
      margin-top: 20px;
    }

    .forgetPwd {
      width: 90%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 40px;

      span {
        color: var(--text_color_L1);
        font-weight: 400;
        font-size: 28px;
      }

      button {
        border: 1px solid var(--text_color_L2);
        border-radius: 10px;
        width: 195px;
        height: 50px;
        background: none;
      }
    }

    .btnD {
      width: 100%;
      margin-top: 60px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      button {
        flex: 1;
        height: 120px;
        font-size: 34px;

        &:nth-of-type(1) {
          background: transparent;
          color: var(--main-color);
          border: 1px solid var(--main-color);
        }

        &:nth-of-type(2) {
          background: var(--main-color);
          color: var(--text_color_L4);
          border: none;
        }
      }
    }
  }

  :deep(.passwordInput__container) {
    padding: 0 40px;
    width: 100%;
  }

  :deep(.van-dialog.c2cconfirm) {
    .van-dialog__content {
      padding-block: 0px !important;
      height: auto !important;
    }
  }

  :deep(.explain) {
    box-shadow: none;
  }
}

@media screen and (max-width: 500px) {
  .withdraw__container .recycleBtnD {
    max-width: none;
  }
}

.bankInfo {
  margin-top: 20px;
  margin-bottom: 20px;

  > div {
    border-radius: 20px;
    padding: 20px 20px;
    display: flex;
  }

  .bankInfoItem {
    background: var(--bg_color_L2);

    flex-direction: row;
    display: flex;
    align-items: center;
    .svg-icon {
      width: 62px;
      height: 59px;
    }
    img {
      width: 62px;
      height: 59px;
    }

    > div:nth-of-type(1) {
      width: 29%;
      align-items: center;
    }

    > div:nth-of-type(2) {
      width: 70%;
      background: url('@/assets/icons/wallet/withdraw/line.png') no-repeat left;
      background-size: contain;
      padding-left: 50px;
      text-align: left;
    }

    > div {
      display: flex;
      flex-direction: column;
      //justify-content: space-between;
      //text-align: left;

      span {
        font-size: 28px;
        color: var(--text_color_L2);
        max-width: 95%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      > span:nth-of-type(1) {
        margin: 5px 0px;
      }
    }

    i {
      font-size: 30px;
    }
  }

  .bankInfoItem.usdt {
    flex-direction: column;

    > div {
      flex-direction: row;
      width: 100%;
      align-items: center;
      font-weight: 400;
      font-size: 24px;

      &:nth-of-type(1) {
        img {
          width: 48px;
          height: 48px;
          margin-right: 15px;
        }
      }

      &:nth-of-type(2) {
        padding-left: 0px;
        background: none;
        color: var(--text_color_L2);

        position: relative;

        > i {
          position: absolute;
          right: 0px;
        }
      }

      &:nth-of-type(3) > span {
        color: var(--norm_secondary-color);
      }
    }
  }

  .bankInfoItem.KBZ {
    background: var(--main_gradient-color);

    span {
      color: var(--text_color_L4);
    }
  }

  &.e-wallet {
    span:last-of-type {
      color: var(--text_color_L2) !important;
    }
  }
}

.is-hidden {
  position: absolute;
  left: -10000px;
  top: -10000px;
}
.c2c {
  .succeedImg {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -38px;
    width: 280px;
    height: 180px;
  }
  h1 {
    color: var(--text_color_L2);
    margin-bottom: 20px;
  }
  p {
    font-size: 22px;
    // color: #888;
    margin-bottom: 50px;
    // background: #F6F6F6;
    border-radius: 10px;
    padding: 20px 30px;
    :deep(span) {
      color: var(--main-color);
    }
  }
}

/**引导去保险箱弹窗样式 */
.prompt-dialog {
  width: 660px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  background: #fff;
  padding-bottom: 22px;

  .promptContent {
    width: 100%;
    margin: auto;
    max-height: 700px;
    padding: 30px 20px;
    overflow-y: auto;
    :deep(img) {
      width: 100% !important;
    }
    img {
      width: 100% !important;
    }
  }
  .question {
    text-align: center;
    color: var(--text_color_L1);
    border-top: 1px solid var(--Dividing-line_color);
    padding: 20px 0;
  }
  .button {
    display: flex;
    padding-bottom: 24px;
    justify-content: center;
    gap: 50px;
    & > div {
      color: var(--text_color_L1);
      width: 240px;
      line-height: 60px;
      height: 60px;
      text-align: center;
      border-radius: 60px;
      color: var(--main-color);
      border: 1px solid var(--main-color);
      &:last-child {
        background: var(--main-color);
        color: #fff;
      }
    }
  }
}
</style>
