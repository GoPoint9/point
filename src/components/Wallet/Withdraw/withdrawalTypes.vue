<template>
  <div class="withdrawWay">
    <div
      v-if="hasShowUPI"
      class="c2c"
      :class="{ active: data_NewSetWithdrawal.type == 20 }"
      @click="onselectWithdrawalType({ withdrawID: 20 })"
    >
      <img v-if="data_NewSetWithdrawal.type != hasShowUPI.withdrawID" :src="hasShowUPI.withBeforeImgUrl">
      <img v-else :src="hasShowUPI.withAfterImgUrl">
      <div>
        <div>{{ hasShowUPI.name }}</div>
        <template v-if="c2cAward > 0"> {{ $t('c2cEGReward', [c2cAward ? accMul(c2cAward, 100) : 0]) }}</template>
      </div>
    </div>
    <div
      v-if="hasShowAr"
      class="c2c Ar"
      :class="{ active: data_NewSetWithdrawal.type == 21 }"
      @click="onselectWithdrawalType({ withdrawID: 21 })"
    >
      <img v-if="data_NewSetWithdrawal.type != hasShowAr.withdrawID" :src="hasShowAr.withBeforeImgUrl">
      <img v-else :src="hasShowAr.withAfterImgUrl">
      <div>
        <div>{{ hasShowAr.name }}</div>
        <p>
          {{ $t('withdrawTip5') }}
        </p>
      </div>
    </div>
    <template v-for="item in withdrawalTypeslist" :key="item.withdrawID">
      <div
        v-if="![20, 21].includes(item.withdrawID)"
        :class="{ select: data_NewSetWithdrawal.type == item.withdrawID }"
        @click="onselectWithdrawalType(item)"
      >
        <div>
          <img v-if="data_NewSetWithdrawal.type != item.withdrawID" :src="item.withBeforeImgUrl">
          <img v-else :src="item.withAfterImgUrl">
        </div>
        <span>{{ item.name }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { accMul } from '@/utils'
import type { ResWithdrawlist, ReqNewSetWithdrawal } from '@/types/api'

const props = withDefaults(
  defineProps<{
    data_NewSetWithdrawal: ReqNewSetWithdrawal // 提现参数
    withdrawalTypeslist: Array<ResWithdrawlist> // 该提款方式下的银行列表
    c2cAward: number
  }>(),
  {}
)
const hasShowUPI = computed(() => {
  return props.withdrawalTypeslist.find((item) => item.withdrawID == 20)
})

const hasShowAr = computed(() => {
  return props.withdrawalTypeslist.find((item) => item.withdrawID == 21)
})
const emits = defineEmits<{
  (e: 'onSelectWithdrawalType', item: ResWithdrawlist): void
}>()

function onselectWithdrawalType (item: any) {
  emits('onSelectWithdrawalType', item)
}
</script>
<style lang="scss" scoped>
.withdrawWay {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  margin: 25px 0;

  .c2c {
    min-height: 120px;
    width: 100%;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding-left: 18px;
    background-color: var(--bg_color_L2);
    & > img {
      height: 80px;
      margin-right: 20px;
    }

    & > div {
      color: var(--text_color_L2);
      text-align: left;
      font-size: 24px;
      line-height: 44px;

      & > div {
        font-size: 30px;
        color: var(--text_color_L1);
      }
    }

    &.active {
      background: var(--main_gradient-color);

      & > div {
        color: var(--text_color_L4);

        & > div {
          color: var(--text_color_L4);
        }
      }
    }
  }

  > div:not(.c2c) {
    border-radius: 10px;
    background: var(--bgDark-2, var(--bg_color_L2));
    width: 31%;
    height: 160px;
    padding: 20px 20px;
    flex-direction: column;
    display: flex;
    justify-content: space-between;

    img {
      width: auto;
      height: 70px;
    }

    > div {
      flex-direction: row;
      display: flex;
      justify-content: center;
    }
  }

  > div.select {
    background: var(--main_gradient-color);
    color: var(--text_color_L4);
    span {
      line-height: 24px;
    }
  }
}
</style>
