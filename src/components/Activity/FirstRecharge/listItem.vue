<template>
  <div v-for="(item, index) in list" :key="index" class="first_list-item">
    <div class="head">
      <div class="title">
        {{ $t('firstSave') }}<span>{{ item.rechargeAmount }}</span>
      </div>
      <div class="orange">+ {{ currency(item.rewardAmount) }}</div>
    </div>
    <div class="description">
      {{ $t('firstSaveT', [item.rechargeAmount, item.rewardAmount]) }}
    </div>
    <div class="foot">
      <arProgress
        :stroke-width="16"
        color="var(--norm_secondary-color)"
        :total="item.rechargeAmount"
        :numerical="item.canReceive ? item.rechargeAmount : 0"
      />
      <div class="btn" :class="[getClass(item, isRule)]" @click="clickBtn(item)">
        {{ getText(item) }}
      </div>
    </div>
  </div>
  <van-dialog v-model:show="showDialog" :show-confirm-button="false" class-name="noOverHidden">
    <div class="dialog-wrapper">
      <img v-lazy="getIcons('public', 'succeed')">
      <div class="dialog-title">{{ $t('awardsReceived') }}</div>
      <div class="dialog-content">
        <img v-lazy="getIcons('wallet', 'balance')">
        <span>{{ currency(bonus) }}</span>
      </div>
      <div class="dialog-btn" @click="showDialog = false">{{ $t('confirm') }}</div>
      <div class="dialog-footer" @click="showDialog = false">
        <img v-lazy="getIconsPublic('activity/DailyTask', 'close')">
      </div>
    </div>
  </van-dialog>
</template>

<script setup lang="ts">
import { currency, getIcons, getIconsPublic } from '@/utils'
import arProgress from '@/components/common/Progress.vue'
import { useActive } from '@/components/common/use'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useDialog } from '@/hooks/useDialog.hook'
const { t } = useI18n()
const emit = defineEmits(['gorecharge'])
const showDialog = ref(false)
const bonus = ref('')
let lock = false
defineProps({
  list: {
    type: Array,
    default: () => [
      {
        rewardAmount: 123,
      },
    ],
  },
  isRule: {
    type: Boolean,
    default: false,
  },
})
const { receiveFirstRechargeReward, ActiveSotre } = useActive()
const { closeFirstSave } = useDialog()

const getClass = (item: any, isRule: Boolean) => {
  const { canReceive, isFinshed } = item
  if (!canReceive) return 'n2' + (isRule ? ' rule' : '')
  if (canReceive && !isFinshed) return 'n1' + (isRule ? ' rule' : '')
  if (isFinshed) return 'n3' + (isRule ? ' rule' : '')
  if (!isFinshed) return 'n2' + (isRule ? ' rule' : '')
}
const getText = (item: any) => {
  const { canReceive, isFinshed } = item
  if (!canReceive) return t('torecharge')
  if (isFinshed) return t('claimed')
  return t('receive')
}
const clickBtn = async (item: any) => {
  const { canReceive, isFinshed } = item
  if (!canReceive) {
    return emit('gorecharge')
  }
  if (isFinshed || lock) return
  lock = true
  const res = await receiveFirstRechargeReward(item.id)
  lock = false
  if (res) {
    ActiveSotre.value.receiveAmount = item.rewardAmount
    ActiveSotre.value.showReceiveDialog = true
    closeFirstSave()
  }
}
</script>

<style lang="scss" scoped>
.first_list-item {
  padding: 20px;
  border-radius: 20px;
  background: var(--bg_color_L2);
  .head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
    .title {
      font-size: 28px;
      color: var(--text_color_L1);
      & > span {
        color: var(--norm_secondary-color);
      }
    }
    .orange {
      font-size: 26px;
      color: var(--norm_secondary-color);
    }
  }
  .description {
    font-size: 22px;
    color: var(--text_color_L2);
    margin-bottom: 20px;
  }
  .foot {
    display: flex;
    align-items: center;
    & > div {
      flex: 1;
    }
    .btn {
      width: 160px;
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
      font-size: 24px;
      margin-left: 42px;
      border-radius: 10px;
      padding: 0 10px;
      color: var(--text_color_L4);
      &.n1 {
        background: var(--main_gradient-color);
        &.rule {
          opacity: 0;
          pointer-events: none;
        }
      }
      &.n2 {
        border: 1px solid var(--norm_secondary-color);
        color: var(--norm_secondary-color);
        &.rule {
          opacity: 0;
          pointer-events: none;
        }
      }
      &.n3 {
        box-shadow: var(--BoxShadowColor-12);
        background: var(--linearGradien-17);
      }
    }
  }
  & + .first_list-item {
    margin-top: 20px;
  }
}

.dialog-wrapper {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 280px;
    height: 162px;
    position: relative;
    margin-top: -56px;
  }
  .dialog-title {
    color: var(--text_color_L1);
    margin: 30px 0 20px;
    font-size: 36px;
    font-weight: bold;
  }
  .dialog-tips {
    color: var(--text_color_L2);
    font-size: 24px;
    margin: 0 0 24px 0;
  }
  .dialog-para {
    color: var(--text_color_L2);
    font-size: 24px;
  }

  .dialog-btn {
    width: 420px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    background: var(--main_gradient-color);
    border-radius: 80px;
    font-weight: bold;
    color: var(--text_color_L4);
    font-size: 32px;
    margin-top: 40px;
  }
  .dialog-content {
    display: flex;
    align-items: center;
    color: var(--norm_secondary-color);
    img {
      width: 30px;
      height: 30px;
      margin: 0 10px 0 0;
    }
  }

  .dialog-footer {
    position: relative;
    bottom: -110px;
    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
