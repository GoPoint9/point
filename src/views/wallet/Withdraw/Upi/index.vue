<template>
  <div class="upi_C">
    <NavBar :title="$t('upiPaymentMethod')" left-arrow @click-left="onBack" />
    <div class="upi_C-list">
      <template v-if="upiList.length">
        <div v-for="(item, index) in upiList" :key="index" class="upi_C-item">
          <div class="header">
            <div class="header-title">{{ $t('upiCollectMoney') }}</div>
            <div class="select-btn" :class="{ isSelect: item.bid == selectUpi }" @click="activeUpiClick(item.bid)" />
          </div>
          <div class="upi-body">
            <div class="upi-body-name">{{ item.upiName }}</div>
            <div class="upi-body-id">{{ item.upiAccount }}</div>
            <div class="upi-body-id">{{ item.mobileNo }}</div>
          </div>
        </div>
      </template>
      <template v-else>
        <Empty>
          <template #text>
            <span>{{ $t('noPaymentMethodsYet') }}</span>
          </template>
        </Empty>
      </template>
    </div>
    <div v-throttle-click="{ handler: AddUPI, wait: 1000 }" class="upi_C-addbtn">{{ $t('upiAddPaymentMethod') }}</div>
  </div>
</template>
<script setup lang="ts">
import { GetWithdrawals } from '@/api'
import { AwaitApiResult } from '@/utils'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Empty from '@/components/Empty/index.vue'

const router = useRouter()
const route = useRoute()

const upiList = ref<any[]>([]) // 收款方式列表
const selectUpi = ref<any>(null) // 选中的upi
const onBack = () => {
  const hasSelectUpi = upiList.value.find((item) => {
    item.bid == selectUpi.value
  })
  const bid = hasSelectUpi ? selectUpi.value : 0
  router.replace({ name: 'Withdraw', query: { bid, type: 2 } })
}

const activeUpiClick = (bid: any) => {
  router.replace({ name: 'Withdraw', query: { bid, type: 2 } })
}
/**
 * @description: 查询是否有绑定银行卡，未绑定银行卡则跳转绑定银行卡页面
 * @return {*}
 */
const AddUPI = async () => {
  router.replace({ name: 'Withdraw-AddUpi' })
}

/**
 * @description: 请求数据
 * @return {*}
 */
const onLoad = async () => {
  const res = await AwaitApiResult(GetWithdrawals({ withdrawid: 2 }))
  if (res) {
    upiList.value = res.data?.withdrawalslist || []
  }
}

onMounted(() => {
  selectUpi.value = route.query.bid || 0
  onLoad()
})
</script>
<style lang="scss" scoped>
.upi_C {
  padding: 0 24px 100px 24px;
  height: 100vh;
  position: relative;
  overflow: hidden;
  &-list {
    overflow: auto;
    height: 100%;
    padding-bottom: 70px;
  }
  &-item {
    height: fit-content;
    border-radius: 10px;
    background-color: var(--textW);
    padding: 20px 14px 44px 14px;

    .header {
      height: 68px;
      line-height: 68px;
      position: relative;
      padding-left: 126px;
      background-image: url('@/assets/icons/wallet/withdraw/c2c/upi.png');
      background-size: 100px 42px;
      background-repeat: no-repeat;
      background-position: 8px center;
      padding-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-title {
        font-weight: 700;
        font-size: 32px;
      }

      .select-btn {
        width: 60px;
        height: 60px;
        border: 1px solid var(--text_color_L2);
        border-radius: 50%;

        &.isSelect {
          // background-image: url('@icon/wallet/selectupi.png');
          background-size: 60px;
          background-repeat: no-repeat;
          background-position: center;
          border: 0;
        }
      }

      &::after {
        content: '';
        display: block;
        width: calc(100% - 48px);
        height: 0;
        position: absolute;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid #daddf0;
      }
    }

    .upi-body {
      padding: 34px 8px 40px 8px;

      .upi-body-name {
        height: 32px;
        line-height: 32px;
        font-size: 26px;
        color: var(--text_color_L2);
      }

      .upi-body-id {
        height: 36px;
        line-height: 36px;
        font-size: 26px;
        color: var(--text_color_L2);
        margin-top: 30px;
      }
    }

    & + div {
      margin-top: 20px;
    }
  }

  &-addbtn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70px;
    line-height: 70px;
    width: 100%;
    font-weight: 700;
    font-size: 30px;
    background: var(--main-color);
    color: var(--text_color_L4);
    text-align: center;
  }
}
</style>
