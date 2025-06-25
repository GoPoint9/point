<script setup>
import { $t } from '@/languages'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

import PayChannel from '@entrance/ncz-web-pgpc/components/MemberCenter/components/Deposit/components/PayChannel.vue'

// const userStore = useUserStore()
// userStore.GetUserBanlance() // 更新餘額

const siteStore = useSiteStore()
siteStore.getHomeSetting()

const paymentStore = usePaymentStore()
console.log(' v ', paymentStore.newPaymentList)

const currentPay = ref(null)
const viewType = ref('')
const canUsingPay = computed(() => {
  const { payData } = currentPay.value || {}
  console.warn('payData ', payData?.canUsingPay)
  return payData?.canUsingPay
})

paymentStore.initPayment().then(() => {
  console.log(' newPaymentList ', paymentStore.newPaymentList)

  if (paymentStore.newPaymentList.length) {
    choosePay(paymentStore.newPaymentList[0])
  } else {
    Toast.fail({ message: i18n.t('YJ.noRechargeList'), onClose: () => next('/account') })
    window.store.state.common.turning = false
  }
})
const recordStore = useRecordStore()

console.log(' paymentStore ', paymentStore)

const userStore = useUserStore()
function getRechargeRecord (pay) {
  recordStore.fetchRechargeRecord({
    accountName: userStore.userInfo.loginName,
    type: pay.type,
    time: null,
    startDate: null,
    endDate: null,
    pageNo: 1,
    pageSize: 10,
  }).then(() => {
    console.warn('[recordStore] ', recordStore.rechargeRecord)
  })
}

async function choosePay (pay) {
  currentPay.value = pay
  // this.payment = pay // ??????

  // NOTE: 測試擋下
  // if (currentPay) return

  viewType.value = pay.viewType
  // this.canUsingPay = currentPay.value.payData.canUsingPay

  // this.getRechargeRecord(pay)
  getRechargeRecord(pay)

  console.warn('canUsingPay.value ', canUsingPay.value, currentPay.value.payData.canUsingPay)
  // canUsingPay: 判斷是否要顯示下方通道, 0: 不顯示且不打 getNczThirdPayInfo
  if (!canUsingPay.value) return

  const res = await paymentStore.fetchPayData(pay)
  console.warn(' [fetchPayData] res ', res)

  // NOTE: 測試擋下
  if (currentPay) return
  // Offline(線下銀行轉帳)
  if (pay.viewType === 'Offline') {
    window._fetch({
      Action: 'getEbankPayAccList',
      Requirement: {},
    }, false).then((res) => {
      if (res.code === 'success') {
        this.reset()
        this.nowPayData = pay
        // if (common.IsParmReady(pay.isMerge) && pay.isMerge) {
        //   this.isMerge = true
        // }
        this.isDigital = pay.isDigital
        this.currencyType = pay.currencyType

        this.$store.commit(paymentType.SETNOWPAY, pay.type)
        this.resData = res
        this.channels = res.data.ebankPayAccList

        // this.nowPayData = pay.child[0]
      } else {
        Toast.fail({
          message: res.msg,
          onClose: () => this.$router.go(-1),
        })
      }
    })
  }
  // Online(一般線上支付)、Wallet(線上支付-數字幣)
  if (['Online', 'Wallet'].includes(pay.viewType)) {
    // TODO: isOpen之後要吃判斷
    const isOpen = {
      isH5Open: true,
      isFromH5: true,
      isAppOpen: false,
      isTransferOpen: false,
      isTransferCardOpen: false,
    }
    window._fetch({
      Action: 'getNczThirdPayInfo',
      Requirement: {
        type: pay.type,
        bankId: pay.payData.bankId,
        payTypeSortVersion: this.payTypeSortVersion,
        isFromH5: isOpen.isFromH5,
        isH5Open: isOpen.isH5Open,
        isAppOpen: isOpen.isAppOpen,
        isTransferOpen: isOpen.isTransferOpen,
        isTransferCardOpen: isOpen.isTransferCardOpen,
      },
    }, false).then((res) => {
      if (res.code === 'success') {
        this.reset()
        this.nowPayData = pay
        if (common.IsParmReady(pay.isMerge) && pay.isMerge) {
          this.isMerge = true
        }
        this.isDigital = pay.isDigital
        this.currencyType = pay.currencyType

        this.$store.commit(paymentType.SETNOWPAY, pay.type)
        this.resData = res
        this.channels = res.data.thirdPayInfoH5List

        // this.nowPayData = pay.child[0]
      } else {
        Toast.fail({ message: res.msg, onClose: () => this.$router.go(-1) })
      }
    })
  }
}

// 格式化充值
const formatDeposit = (i) => {
  const thirdHighestFormatted = i.thirdHighestDeposit >= 1000 ? i.thirdHighestDeposit / 1000 + 'K' : i.thirdHighestDeposit

  return `${$t('YJ.balance')}:${i.thirdLowestDeposit} - ${thirdHighestFormatted}`
}
const onSelectChannel = (channel) => {
  console.warn(' [onSelectChannel] channel ', channel)
}

</script>
<template>
  <div id="mc_container" class="CN">
    <div id="deposit">
      <PerfectScrollbar id="depositTab" tag="ul" class="clearfix">
        <li
          v-for="(i, index) in paymentStore.newPaymentList"
          :key="i.type"
          :class="['nav-item', { 'active': currentPay === i }]"
          :data-type="i.type"
          :data-targetid="i.type"
          @click="choosePay(i)"
        >
          <!-- NOTE: 看來沒有存在的意義，先註解。
            :style="`background-image: url(${currentPay === i ? i.imgFileNameActivity : i.imgFileName});`" -->
          <div class="icon" :style="`background-image: url(${i.imgFileName});`" />
          <div class="bankname">
            <div>{{ i.customizeTypeName || i.typeName }}</div>
            <div class="rebate">{{ i.payData.bonus ? `+${i.payData.bonus}%` : '' }}</div>
          </div>
        </li>
      </PerfectScrollbar>

      <div class="deposit_container">
        <div class="deposit_title">
          <div class="txt">{{ $t('label_deposit_info') }}</div>
          <div class="deposit-group">
            <div class="deposit-records">
              <span class="book-icon" />
              <span class="title">{{ $t('label_deposit_history') }}</span>
              <span class="cashIn-count hide" />
            </div>
            <div class="deposit-teaching">
              <span class="book-icon" />
              <span class="title">{{ $t('label_deposit_help') }}</span>
            </div>
          </div>
        </div>

        <div id="deposit_wrp" class="right-panel-height" style="height: 525px">
          <div v-if="!canUsingPay" class="deposit_no_banklist">
            {{ $t('YJ.noChannel') }} <!-- {{ $t('label_no_deposit_bank') }} -->
          </div>
          <div v-else id="mc_container" class="model_child_content">
            <div class="depositForm">
              <span class="bankMessage">
                To apply for discounts, please bind your mobile phone number and you will receive irregular bonuses.
              </span>
              <PayChannel
                :current-pay="currentPay"
                :channels="paymentStore.channels"
              />
            </div>

            <div v-if="!canUsingPay" class="onPayment-Rtcontent-wrp inline-block w-full">
              <div class="onPayment-Rtcontent depositForm scroll-bar">
                <form id="PGMTForm" autocomplete="off">
                  <span class="bankMessage">To apply for discounts, please bind your mobile phone number and you
                    will receive irregular bonuses.</span>
                  <div id="PGMT">
                    <div id="accordionTab" class="dmc_accordionTab">
                      <div class="wap-op">
                        <div class="vendor-container">
                          <ul id="depositAllVendor" class="vendor-list">
                            <!-- paymentStore.channels -->
                            <li
                              v-for="(i, index) in paymentStore.channels"
                              :key="index"
                              @click="onSelectChannel(i)"
                            >
                              <div
                                :class="['channel-wrap',{
                                  'selected': 1,
                                  'other': !['Wallet'].includes(viewType),
                                  'usdt_icon': ['Wallet'].includes(viewType),
                                }]"
                              >
                                <template v-if="['Online', 'Wallet'].includes(viewType)">
                                  <img v-if="['Wallet'].includes(viewType)" :src="currentPay.imgFileName">
                                  <div>
                                    <div>{{ i.moneyTip ? i.moneyTip : i.thirdPayName }}</div>
                                    <div>{{ formatDeposit(i) }}</div>
                                    <div v-if="!!i.bonus">{{ i.bonus }}% bonus</div>
                                  </div>
                                </template>
                                <template v-else>
                                  <div>{{ i.bankName }}</div>
                                  <div>
                                    {{ `(${i.isCustomized ? i.customizedLowest : currentPay.payData?.lowestDeposit} - ${
                                      i.isCustomized ? i.customizedHighest : currentPay.payData?.highestDeposit})` }}
                                  </div>
                                  <div v-if="!!i.rechargeDiscountRatio">
                                    {{ i.rechargeDiscountRatio }}% bonus
                                  </div>
                                </template>

                                <!-- <input value="PGPC(INR 12 300--50000）" class="" type="button"> -->
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div id="MobileVerifiedWrap">
                          <div
                            class="cmg_change_list_banks noHeight"
                            style="display: none"
                          >
                            <span
                              class="cmg_list_banks_title colon"
                              translate="label_bank_select"
                            >选择银行</span>
                            <div id="opTab2" class="cmg_list_banks_content">
                              <ul id="bankList" class="bankList-OpTab">
                                <li
                                  class="depositBanks opTab-content inline-block form-group bank-PAYTM border-red bank-selected"
                                  data-message="To apply for discounts, please bind your mobile phone number and you will receive irregular bonuses."
                                  data-charges="0|0|0|0"
                                >
                                  <input
                                    data-mindeposit="100"
                                    data-maxdeposit="50000"
                                    value="9129"
                                    data-banktype="PAYTM"
                                    class="bank-list"
                                    type="radio"
                                    name="bankName"
                                  >
                                  <span class="bankRadioBtn mem-icon2 crcl-ch inline-block hide selected-red">&nbsp;</span><span class="no-img">PAYTM</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="hag_register_commun hac_link_mangslc10 account-form hide">
                            <span
                              class="hag_regcom_lt hag_reg_fc142 colon"
                              translate="label_deposit_account"
                            >充值账户</span>
                            <div class="hag_regcom_nameinp dmc_accordion_pr">
                              <input
                                type="text"
                                name="account"
                                required=""
                                data-valid="account"
                                class="form-control ch-input"
                                placeholder="充值账户"
                                translate="label_deposit_account"
                              >
                            </div>
                          </div>
                          <div class="hag_register_commun hac_link_mangslc10 account-form deposit-idNumber hide">
                            <span
                              class="hag_regcom_lt hag_reg_fc142 colon"
                              translate="label_id"
                            >身份证号码</span>
                            <div class="hag_regcom_nameinp dmc_accordion_pr">
                              <input
                                type="text"
                                name="idNumber"
                                required=""
                                data-valid="idNumber"
                                class="form-control ch-input"
                                placeholder="身份证号码"
                                translate="label_id"
                              >
                            </div>
                          </div>
                          <div class="hag_register_commun hac_link_mangslc10 account-form deposit-payee hide">
                            <span
                              class="hag_regcom_lt hag_reg_fc142 colon"
                              translate="label_payer_name"
                            >汇款人姓名</span>
                            <div class="hag_regcom_nameinp dmc_accordion_pr">
                              <input
                                type="text"
                                name="payee"
                                required=""
                                data-valid="payee"
                                class="form-control ch-input"
                                placeholder="汇款人姓名"
                                translate="label_payer_name"
                              >
                            </div>
                          </div>
                          <div class="hag_register_commun hac_link_mangslc10 account-form hide">
                            <span
                              class="hag_regcom_lt hag_reg_fc142 colon"
                              translate="deposit_label_name"
                            >汇款姓名</span>
                            <div class="hag_regcom_nameinp dmc_accordion_pr">
                              <input
                                type="text"
                                name="manualName"
                                required=""
                                data-valid="account"
                                class="form-control ch-input"
                                placeholder="汇款姓名"
                                translate="deposit_label_name"
                              >
                            </div>
                          </div>
                          <div class="hag_register_commun hac_link_mangslc10 account-form hide">
                            <span
                              class="hag_regcom_lt hag_reg_fc142 colon"
                              translate="label_phone_number"
                            >手机号码</span>
                            <div class="hag_regcom_nameinp dmc_accordion_pr">
                              <input
                                type="text"
                                name="manualMobileNumber"
                                required=""
                                data-valid="account"
                                class="form-control ch-input"
                                placeholder="手机号码"
                                translate="label_phone_number"
                              >
                            </div>
                          </div>
                          <div class="hag_register_commun hac_link_mangslc10 account-form hide">
                            <span
                              class="hag_regcom_lt hag_reg_fc142 colon"
                              translate="deposit_account_num"
                            >汇款账号</span>
                            <div class="hag_regcom_nameinp dmc_accordion_pr">
                              <input
                                type="text"
                                name="depositAccount"
                                required=""
                                data-valid="account"
                                class="form-control ch-input"
                                placeholder="汇款账号"
                                translate="deposit_account_num"
                              >
                            </div>
                          </div>
                          <div class="hag_register_commun hac_link_mangslc10 manual-number hide">
                            <span
                              class="hag_regcom_lt hag_reg_fc142 colon"
                              translate="label_manual_number"
                            >付款卡号</span>
                            <div class="hag_regcom_nameinp dmc_accordion_pr">
                              <input
                                type="text"
                                name="manual_number"
                                required=""
                                data-valid="manual_number"
                                class="form-control ch-input"
                                placeholder="请输入付款卡号"
                                translate="label_manual_placeholder"
                              >
                            </div>
                          </div>
                          <div class="hag_register_commun hac_link_mangslc10">
                            <span
                              class="hag_regcom_lt hag_reg_fc142 colon"
                              translate="label_deposit_amount"
                            >充值金额</span>
                            <div class="hag_regcom_nameinp dmc_accordion_pr">
                              <div class="input-wrap">
                                <input
                                  type="text"
                                  name="amount"
                                  required=""
                                  data-valid="amount"
                                  class="form-control ch-input number-separator"
                                  placeholder="充值金额"
                                  translate="label_deposit_amount"
                                ><span class="ticket hide" /><span class="bonus-amount hide" />
                                <div class="amount-tip hide" />
                              </div>
                            </div>
                            <div class="hag_validval amount_deposit_range">
                              <span
                                class="colon"
                                translate="info_min_deposit_amount"
                              >单笔最低充值金额</span><span class="min_deposit"><span class="symbol front">₹</span> 100</span>，<span
                                class="colon"
                                translate="info_max_deposit_amount"
                              >单笔最高充值金额</span><span class="max_deposit"><span class="symbol front">₹</span> 50,000</span><span
                                id="data_charges"
                                class="amount_deposit_range hide"
                                data-charges="0|0|0|0"
                              ><span class="colon" translate="label_fee">手续费</span><span
                                class="depost_charges"
                                charges="0|0|0 | 0"
                              >---</span></span>
                            </div>
                            <div class="amount_deposit_info hide">
                              <span
                                translate="label_deposit_info"
                                class="colon"
                              >充值信息</span><span class="info_text" />
                            </div>
                          </div>
                          <div class="hag_register_commun hac_link_mangslc10">
                            <span
                              class="hag_regcom_lt hag_reg_fc142 colon"
                              translate="label_choose_promotion"
                            >选择优惠</span>
                            <div id="hag_reg" class="hag_regcom_nameinp">
                              <input
                                type="text"
                                name="promotions"
                                value=""
                                data-value=""
                                class="hide"
                                readonly="readonly"
                                data-placeholder=""
                                translate="label_have_promotion"
                                placeholder="可选择参加活动"
                              >
                              <div id="opTab1">
                                <ul id="depositAllPromotions" class="chosen-results1">
                                  <li
                                    class="promotion-item disabled"
                                    data-maxdeposit=""
                                    data-mindeposit="100"
                                    data-value="4347115"
                                    data-bonustype="PERCENTAGE"
                                    data-complete="complete"
                                  >
                                    <div class="promo-top">
                                      <div class="promo-info">
                                        <div class="promName">
                                          <span class="title">2% deposit lucky bonus, unlimited games</span><span class="progress-item hide">( undefined/0 )</span>
                                        </div>
                                        <div class="promRemark">
                                          <p><br></p>
                                          <p>
                                            <span
                                              style="
                                                background-color: rgb(248, 249, 250);
                                                color: rgb(31, 31, 31);
                                              "
                                            >2% deposit lucky bonus, unlimited
                                              games</span>
                                          </p>
                                        </div>
                                      </div>
                                      <div class="minDeposit">
                                        <span>≥</span><span class="symbol front">₹</span> 100.<small style="font-size: 70%; color: inherit">00</small>
                                      </div>
                                    </div>
                                    <div class="promo-bottom">
                                      <div class="personal-info hide">
                                        <div class="info-title">
                                          *参加活动需填以下个人信息
                                        </div>
                                      </div>
                                    </div>
                                    <p class="proTips">
                                      <span class="proTips-content">2% deposit lucky bonus, unlimited games</span>
                                    </p>
                                  </li>

                                  <li
                                    class="promotion-item disabled"
                                    data-maxdeposit=""
                                    data-mindeposit="100"
                                    data-value="4183064"
                                    data-bonustype="FIXED"
                                    data-complete="incomplete"
                                  >
                                    <div class="promo-top">
                                      <div class="promo-info">
                                        <div class="promName">
                                          <span class="title">First deposit bonus up to ₹800</span><span class="progress-item">( 0/1 )</span>
                                        </div>
                                        <div class="promRemark">
                                          <p>First deposit bonus up to ₹800</p>
                                        </div>
                                      </div>
                                      <div class="minDeposit">
                                        <span>≥</span><span class="symbol front">₹</span> 100.<small style="font-size: 70%; color: inherit">00</small>
                                      </div>
                                    </div>
                                    <div class="promo-bottom">
                                      <div class="personal-info">
                                        <div class="info-title">
                                          *参加活动需填以下个人信息
                                        </div>
                                        <div class="personal-info-item">
                                          <span class="item-title"> 验证手机号码</span>
                                          <div
                                            class="item-btn"
                                            data-target="mobileVerified"
                                          >
                                            立刻完善
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <p class="proTips">
                                      <span class="proTips-content">First deposit bonus up to ₹800</span>
                                    </p>
                                  </li>
                                  <li
                                    class="promotion-item default active"
                                    data-maxdeposit=""
                                    data-mindeposit=""
                                    data-value=""
                                    data-complete="complete"
                                  >
                                    <div class="promName">不参加任何充值活动</div>
                                  </li>
                                </ul>
                              </div>
                              <div class="remark hide" />
                            </div>
                          </div>
                          <div class="hag_register_commun hac_link_mangslc10">
                            <span class="hag_regcom_lt hag_reg_fc142" />
                            <div id="dmc_accordion_remark" class="dmc_accordion_remark" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="needMobileVerified" class="hide">
                      <div class="bg" />
                      <div class="desc">
                        <p translate="please_bind_mobile">请先绑定手机才能充值</p>
                      </div>
                      <div class="btn go_to_bind_mobile" translate="go_to_bind_mobile">
                        去绑手机
                      </div>
                    </div>
                  </div>
                  <div class="red-btn-bottom">
                    <div class="mem-icon2">
                      <input
                        class="form-reset hide"
                        type="reset"
                        value="Reset Form"
                      ><input
                        class="ch-overyd form-submit"
                        type="button"
                        value="确认提交充值申请"
                        translate="button_confirm_application_for_deposit"
                        data-old-content=""
                        style=""
                      >
                    </div>
                  </div>
                </form>
                <div id="defaultPageQrForm" class="2kAlipay defaultPageQrForm hide" />
                <div
                  id="quickPaymentPostDeposit"
                  class="QuickPayment-Rltcontent row-3 inline-block rs-qckpymnt hide enable"
                >
                  <div class="inline-block top-contner">
                    <div class="tab-tile-sub-ch" translate="label_confirm_deposit_info">
                      确认充值信息
                    </div>
                  </div>
                  <div class="QPayment-content clearfix">
                    <div class="rowTwo-wrp">
                      <div class="po-middle">
                        <div
                          class="inline-block po-middleL colon"
                          translate="label_deposit_amount"
                        >
                          充值金额
                        </div>
                        <div class="inline-block po-middle mg-fix1">
                          <input
                            id="deposit_amount"
                            class="ch-overyd"
                            type="text"
                            value=""
                            readonly=""
                            translate="label_deposit_amount"
                            placeholder="充值金额"
                          >
                        </div>
                      </div>
                      <div class="inline-block po-middle">
                        <input
                          data-clipboard=""
                          data-clipboard-target="deposit_amount"
                          class="mem-icon2 ctie-btn po-middle"
                          type="button"
                          value="复制"
                          translate="label_copy"
                        >
                      </div>
                    </div>
                    <div class="rowTwo-wrp">
                      <div class="po-middle">
                        <div
                          class="inline-block po-middleL colon"
                          translate="label_payee_account_name"
                        >
                          收款账户名
                        </div>
                        <div class="inline-block po-middle mg-fix1">
                          <input
                            id="accountNumber"
                            class="ch-overyd"
                            type="text"
                            value=""
                            readonly=""
                            translate="mc_deposit_qp_post_payeename_placeholder"
                            placeholder=""
                          >
                        </div>
                      </div>
                      <div class="inline-block po-middle">
                        <input
                          data-clipboard=""
                          data-clipboard-target="accountNumber"
                          class="mem-icon2 ctie-btn po-middle"
                          type="button"
                          value="复制"
                          translate="label_copy"
                        >
                      </div>
                    </div>
                    <div class="rowTwo-wrp">
                      <div class="po-middle">
                        <div
                          class="inline-block po-middleL colon"
                          translate="pgmt_title_bank"
                        >
                          收款银行名称
                        </div>
                        <div class="inline-block po-middlec mg-fix1">
                          <input
                            id="bank_name"
                            class="ch-overyd"
                            type="text"
                            value=""
                            readonly=""
                          >
                        </div>
                      </div>
                      <div class="inline-block po-middle">
                        <input
                          data-clipboard=""
                          data-clipboard-target="bank_name"
                          class="mem-icon2 ctie-btn po-middle"
                          type="button"
                          value="复制"
                          translate="label_copy"
                        >
                      </div>
                    </div>
                    <div class="rowTwo-wrp">
                      <div class="po-middle">
                        <div
                          class="inline-block po-middleL colon"
                          translate="pgmt_title_payee"
                        >
                          收款人
                        </div>
                        <div class="inline-block po-middlec mg-fix1">
                          <input
                            id="bankCardName"
                            class="ch-overyd"
                            type="text"
                            value=""
                            readonly=""
                          >
                        </div>
                      </div>
                      <div class="inline-block po-middle">
                        <input
                          data-clipboard=""
                          data-clipboard-target="bankCardName"
                          class="mem-icon2 ctie-btn po-middle"
                          type="button"
                          value="复制"
                          translate="label_copy"
                        >
                      </div>
                    </div>
                  </div>
                  <div class="mem-icon2 red-border-bh pop">
                    <input
                      class="form-reset hide"
                      type="reset"
                      value="Reset Form"
                    ><input
                      id="openBankUrl"
                      class="ch-overyd form-submit openBankUrl"
                      type="button"
                      value="返回"
                      translate="label_return"
                      data-old-content=""
                      style=""
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bankcardMask hide">
      <div class="content">
        <div class="title" translate="label_tips_text">温馨提示</div>
        <div class="tips" translate="info_bind_card_first">
          请先绑定银行账号以使用充值功能
        </div>
        <div class="line" />
        <div id="bindCard" class="btn" translate="go_bind_card">前往绑卡</div>
      </div>
    </div>
    <div class="mobileMask hide">
      <div class="content">
        <div class="title" translate="label_tips_text">温馨提示</div>
        <div class="tips">
          <p translate="please_bind_mobile_first">请先绑定手机或选择其他渠道</p>
        </div>
        <div class="line" />
        <div class="btn-group">
          <div class="cancel" translate="button_cancel">取消</div>
          <div id="bindMobile" class="btn" translate="go_to_bind_mobile">去绑手机</div>
        </div>
      </div>
    </div>
    <div class="allowDepositMask hide">
      <div class="content">
        <div class="title" translate="label_tips_text">温馨提示</div>
        <div class="tips" translate="unallowed_deposit">现在不允许充值，请稍后再尝试</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@entrance/ncz-web-pgpc/components/MemberCenter/components/Deposit/Deposit.scss' as *;

</style>
