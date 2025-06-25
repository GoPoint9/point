<template>
  <div class="record__main">
    <div class="record__main-title">
      <svg-icon name="historyHead" />
      <span>{{ store.currentPayId === 20 ? 'C2C' + $t('rechargeRecords') : $t('rechargeRecords') }}</span>
    </div>
    <Empty v-if="RechargeRList.length < 1" class="mgt40" />
    <div v-if="RechargeRList.length > 0">
      <div
        v-for="item in RechargeRList"
        :key="item.rechargeNumber"
        class="record__main-info"
        @click="handleGoDetail(item)"
      >
        <div class="record__main-info__title flex_between">
          <div class="recharge_text">{{ $t('recharge') }}</div>
          <div class="flex_between">
            <div
              v-if="store.currentPayId !== 20"
              :class="{
                danger: item.state === 0,
                success: item.state === 1,
                rechargeFail: item.state === 2,
                cancel: item.state === 6
              }"
            >
              {{ $t(getArrayKey(rootConfig.RechargeState, item.state)) }}
            </div>
            <div v-else :class="getStateColorAndText(item)">
              {{ getArrayKey(rootConfig.RechargeC2CState, item.state) }}
              <ConutDownTimer
                v-if="item.state === 1 || item.state === 0"
                :key="item.id"
                :start-time="item.endTime"
                :end-time="item.serviceTime"
                :class-name="getStateColorAndText(item)"
              />
            </div>
            <img v-if="item.state !== 2" :src="getIconsPublic('wallet/recharge', 'left_arrow')" alt="">
          </div>
        </div>

        <div v-if="store.currentPayId !== 20" class="record__main-info__money item flex_between">
          <span>{{ $t('amount') }}</span>
          <span>{{ currency(item?.price) }}</span>
        </div>
        <div v-else class="record__main-info__money item flex_between">
          <span>{{ $t('amount') }}</span>
          <span>{{ currency(item?.orderAmount) }}</span>
        </div>
        <div v-if="store.currentPayId !== 20" class="record__main-info__type item flex_between">
          <span>{{ $t('type') }}</span>
          <span>{{ item?.payName }}</span>
        </div>
        <div v-else class="record__main-info__type item flex_between">
          <span>UTR</span>
          <div>
            <span>{{ item.transactionNo || '-' }}</span>
            <svg-icon name="copy" alt="" @click.stop="copy(item.transactionNo)" />
          </div>
        </div>
        <div v-if="store.currentPayId !== 20" class="record__main-info__time item flex_between">
          <span>{{ $t('time') }}</span>
          <span>{{ item.addTime }}</span>
        </div>
        <div v-else class="record__main-info__time item flex_between">
          <span>{{ $t('time') }}</span>
          <span>{{ item.createTime }}</span>
        </div>
        <div v-if="store.currentPayId !== 20" class="record__main-info__orderNumber item flex_between">
          <span>{{ $t('orderNo') }}</span>
          <div>
            <span>{{ item?.rechargeNumber }}</span>
            <svg-icon name="copy" alt="" @click.stop="copy(item.rechargeNumber)" />
          </div>
        </div>
        <div v-else class="record__main-info__orderNumber item flex_between">
          <span>{{ $t('orderNo') }}</span>
          <div>
            <span>{{ item.orderNo }}</span>
            <svg-icon name-="copy" alt="" @click.stop="copy(item.orderNo)" />
          </div>
        </div>
        <div v-if="[0, 2].includes(item.state) && isCenterServer" class="report" @click.stop="goToTictek(item, isC2C)">
          {{ $t('report') }}
        </div>
      </div>
      <div v-if="isShowMore" class="record__main-more" @click.stop="handleGoRecord">
        {{ $t('allRecords') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { C2CRechargeRecord, chargeRecordList } from '@/types/api'
import { copy, currency, getIconsPublic, getArrayKey } from '@/utils'
import { rootConfig } from '@/utils/selectArr/rootConfig'
import { computed, ref, onMounted } from 'vue'
import Empty from '@/components/Empty/index.vue'
import ConutDownTimer from '@/components/Wallet/Recharge/CountDownTimer.vue'
import { useRouter } from 'vue-router'
import { useEventBus } from '@/components/common/use'
import { useRecharge } from '@/hooks/useRecharge'
import { useServer } from '@/hooks/useServe.hook'

const eventBus = useEventBus()

const { store, historyToDetail, getRecordList, RechargeRList } = useRecharge()

// const RechargeRList = ref<(chargeRecordList & C2CRechargeRecord)[]>([])
const isShowMore = computed(() => RechargeRList.value.length >= 5)
const router = useRouter()
const { goToTictek, isCenterServer } = useServer({ ServerType: 2 })

const getStateColorAndText = (item: C2CRechargeRecord) => {
  let className = ''
  switch (item.state) {
    case 0:
      className = 'recharge'
      break
    case 1:
      className = 'check'
      break
    case 2:
      className = 'timeout'
      break
    case 3:
      className = 'representation'
      break
    case 4:
      className = 'success'
      break
    case 5:
      className = 'fail'
      break
    case 6:
      className = 'cancel'
      break
    default:
      className = '#FFB800'
      break
  }
  return className
}

/**
 * @description: 进入详情
 * @param {*} item
 * @return {*}
 */
const handleGoDetail = async (item: Partial<chargeRecordList & C2CRechargeRecord>) => {
  historyToDetail(
    (item.payID || item.category) as number,
    item.type as number,
    item.price as number,
    item.state as number,
    item.id
  )
}

const handleGoRecord = () => {
  eventBus.emit('changeKeepAliveKey')
  router.push({
    name: 'RechargeHistory',
  })
}

onMounted(() => {
  getRecordList()
})

defineExpose({
  getRecordList,
})
</script>

<style lang="scss" scoped>
.record__main {
  margin: 20px 0;

  &-title {
    display: flex;
    align-items: center;
    height: 50px;
    margin-bottom: 38px;

    .svg-icon {
      width: 48px;
      height: 48px;
      margin-right: 14px;
    }

    span {
      font-weight: 600;
      font-size: 32px;
      color: var(--darkTextW, var(--text_color_L1));
    }
  }

  &-info {
    padding: 24px 20px 30px;
    background-color: var(--darkBg, var(--bg_color_L2));
    border-radius: 10px;
    margin-bottom: 20px;

    &__title {
      padding-bottom: 24px;
      border-bottom: 1px solid var(--Dividing-line_color);
      margin-bottom: 20px;
      color: var(--darkTextW, var(--text_color_L1));

      .recharge_text {
        width: 150px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #fff;
        background: var(--norm_green-color);
        border-radius: 10px;
        font-size: 28px;
      }

      div {
        font-size: 26px;

        .success {
          color: var(--norm_green-color);
        }
        .danger {
          color: var(--norm_secondary-color);
        }
        .rechargeFail {
          color: var(--norm_red-color);
        }

        .timeout {
          color: #f6a50b;
        }

        .check {
          color: #59c042;
        }

        .representation {
          color: var(--main-color);
        }

        .recharge {
          color: #598ff9;
        }

        .cancel {
          color: var(--text_color_L2);
        }

        .fail {
          color: var(--main-color);
        }

        img {
          width: 36px;
          height: 36px;
        }
      }
    }

    &__money {
      span:first-child {
        font-size: 26px;
        color: var(--text_color_L2);
      }

      span:last-child {
        font-size: 30px;
        color: var(--norm_secondary-color);
      }
    }

    &__type,
    &__time {
      span:last-child {
        font-size: 26px;
        color: var(--text_color_L2);
      }

      div {
        font-size: 24px;
        color: #aeb0c6;

        img {
          width: 32px;
          height: 32px;
          margin-left: 12px;
        }
      }
    }

    &__orderNumber {
      div {
        font-size: 24px;
        color: #aeb0c6;

        img {
          width: 32px;
          height: 32px;
          margin-left: 12px;
        }
      }
    }

    .item {
      margin-bottom: 24px;

      span:first-child {
        font-size: 26px;
        color: var(--text_color_L2);
      }
    }

    .item:last-child {
      margin-bottom: 0;
    }
    .report {
      height: 64px;
      line-height: 64px;
      color: #fff;
      background-color: var(--main-color);
      border-radius: 66px;
      text-align: center;
      font-size: 30px;
      font-weight: 500;
    }
  }

  &-more {
    width: 660px;
    height: 70px;
    border: 1px solid var(--main-color);
    border-radius: 80px;
    margin: 30px auto;
    text-align: center;
    line-height: 70px;
    font-size: 30px;
    color: var(--text_color_L4);
    background: var(--main_gradient-color);
  }
}

.flex_between {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
