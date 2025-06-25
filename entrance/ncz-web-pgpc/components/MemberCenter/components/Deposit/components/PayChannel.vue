<script setup>
import { $t } from '@/languages'
const props = defineProps({
  currentPay: {
    type: Object,
    default: () => {},
  },
  channels: {
    type: Array,
    default: () => [],
  },
})

// 當前類型: e.g. Wallet, Online
const viewType = computed(() => props.currentPay.viewType)

// 格式化充值
const formatDeposit = (i) => {
  const thirdHighestFormatted = i.thirdHighestDeposit >= 1000 ? i.thirdHighestDeposit / 1000 + 'K' : i.thirdHighestDeposit
  return `${$t('YJ.balance')}:${i.thirdLowestDeposit} - ${thirdHighestFormatted}`
}

const currentChannel = ref(null)

const isChoosing = ref(false)

const onSelectChannel = (channel) => {
  console.warn(' [onSelectChannel] channel ', channel, ', viewType: ', viewType.value)
  currentChannel.value = channel

  // this.curItem = passage
  // this.selectMoney = passage.selectMoneys
  // this.selectedMoney = null

  // const diffChannel =
  //       this.viewType === 'Offline'
  //         ? this.nowPassage.bankId !== passage.bankId
  //         : this.nowPassage.thirdPayId !== passage.thirdPayId

  if (isChoosing.vlaue) {
    console.warn('isChoosing.vlaue 載入中捏', isChoosing.vlaue)
    return
  }

  isChoosing.vlaue = true
  // this.nowPassage = JSON.parse(JSON.stringify(passage))

  // if (this.viewType === 'Offline') {
  //   // 線下充值
  //   this.companyAccountId = passage.id
  //   this.lowestDeposit = passage.isCustomized
  //     ? passage.customizedLowest
  //     : this.payment.payData.lowestDeposit
  //   this.highestDeposit = passage.isCustomized
  //     ? passage.customizedHighest
  //     : this.payment.payData.highestDeposit
  //   this.rechargeDiscountRatio = passage.rechargeDiscountRatio.toString()
  // } else {
  //   // 線上充值
  //   if (this.isMerge) {
  //     // 要合併的話 要更改depositId & onlinePayType
  //     const passageType = passage.type.slice(passage.type.indexOf('-') + 1)
  //     if (passageType === 'pay') {
  //       this.depositId = this.payData.payData.depositId
  //       this.onlinePayType = this.payData.payData.onlinePayType
  //     } else if (passageType === 'app') {
  //       this.depositId = this.payDataApp[this.nowPay].payData.depositId
  //       this.onlinePayType = this.payDataApp[this.nowPay].payData.onlinePayType
  //     }
  //   }
  //   if (!this.rate && this.nowPay === 'cgpay') {
  //     this.$store.dispatch('GetexchangeRateStr', passage.thirdPayId)
  //   }
  //   this.digitalRate = passage.digitalRate
  //   this.depositFee = passage.depositFee
  //   this.pointStatus = passage.pointStatus
  //   if (!isInit) {
  //     this.isNeedPayerName = passage.isNeedPayerName || false
  //   }
  //   this.allowZero = passage.allowZero
  //   this.lowestDeposit = passage.thirdLowestDeposit
  //   this.highestDeposit = passage.thirdHighestDeposit
  //   this.rechargeDiscountRatio = passage.bonus.toString()
  // }

  // this.initMoney(passage)
  // this.selectMoney = passage.selectMoneys
  // this.moneyRemark = passage.moneyRemarkMap?.moneyRemark
  // this.moneyRemarkTip = passage.moneyRemarkMap?.moneyTip

  // this.showSelfPoint = false
  // this.selfPoint = ''
  // this.colorful = false
  // this.depositMoney = ''
  // this.inputUDST = ''

  isChoosing.vlaue = false
}

watch(
  () => props.channels,
  channels => {
    onSelectChannel(channels[0])
  }
)

onMounted(() => {
  console.warn(' --------- onMounted ')
})

</script>
<template>
  <div class="PayChannels">
    <div class="vendor-container">
      <ul id="depositAllVendor" class="vendor-list">
        <li
          v-for="(i, index) in channels"
          :key="index"
          @click="onSelectChannel(i)"
        >
          <div
            :class="['channel-wrap',{
              'selected': currentChannel === i,
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
  </div>
</template>
<style lang="scss" scoped>
#mc_container .vendor-container {
  margin-bottom: 1em;

  .vendor-list {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    display: inline-block;
    margin-bottom: 5px;
    .channel-wrap {
      // display: inline-block;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      // line-height: 46px;
      // height: 48px;
      // text-align: center;
      color: #8f8f8f;
      margin-right: 15px;
      padding: 0 25px;
      min-width: 72px;
      border-radius: 6px;
      border: 1px solid #eee;
      vertical-align: middle;
      position: relative;
      .rebate {
        height: 16px;
        line-height: 16px;
        padding: 0 5px;
        font-size: 12px;
        background-color: #ff2f34;
        color: #fff;
        border-radius: 0 6px 0 6px;
        position: absolute;
        right: -1px;
        top: -1px;
        white-space: nowrap
      }
      input[type=button] {
        color: inherit
      }
      img {
        height: 37px;
        vertical-align: middle;
        width: auto;
        margin: 0
      }
      &.selected {
        // line-height: 46px;
        border: 1px solid #ff2f34!important;
        color: #646464!important;
        background-color: transparent;
      }
      &.recommend::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 24px;
        background: url(@/assets/web_pgpc/memberCenter/recommend.png);
        background-size: 100% 100%;
        left: 0;
        top: 0
      }

      &.other {
        padding-left: 13px;
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 10px 13px;
        line-height: 1.5;
      }

      &.usdt_icon {
        padding: 5px 15px 5px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        line-height: 1.5;
        img {
          margin-left: 13px;
          margin-right: 13px;
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}

#mc_container .rowTwo-wrp>.po-middle:first-child {
  line-height: 34px;
  margin-right: 8px
}
#mc_container .tab-tile-sub-ch {
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 27px;
  width: 400px
}
</style>
