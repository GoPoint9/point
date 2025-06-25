<template>
  <div class="pay_state_step">
    <div
      v-for="(item, index) in setpList"
      :key="index"
      class="item"
      :class="{ appeal: type === 2 }"
    >
      <img :src="item.img" alt="">
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getIcons, getIconsPublic } from '@/utils'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  state: {
    type: Number,
    default: 1,
  },
  type: {
    type: Number,
    default: 1,
  },
})

const setpList = computed(() => {
  if (props.type === 1) {
    return [
      {
        img: getIconsPublic('wallet/recharge', 'setup1'),
        title: t('transfer'),
      },
      {
        img: props.state >= 2 ? getIconsPublic('wallet/recharge', 'setup2_active') : getIconsPublic('wallet/recharge', 'setup2'),
        title: t('uploadproof'),
      },
      {
        img: props.state >= 3 ? getIconsPublic('wallet/recharge', 'setup3_active') : getIconsPublic('wallet/recharge', 'setup3'),
        title: t('waitConfirm'),
      },
      {
        img: props.state === 4 ? getIconsPublic('wallet/recharge', 'setup4_active') : getIconsPublic('wallet/recharge', 'setup4'),
        title: t('completed'),
      },
    ]
  } else {
    return [
      {
        img: getIconsPublic('wallet/recharge', 'appeal_state'),
        title: t('c2cTip32'),
      },
      {
        img: props.state >= 3 ? getIconsPublic('wallet/recharge', 'setup3_active') : getIconsPublic('wallet/recharge', 'setup3'),
        title: t('amountError2'),
      },
      {
        img: props.state === 4 ? getIconsPublic('wallet/recharge', 'setup4_active') : getIconsPublic('wallet/recharge', 'setup4'),
        title: t('completed'),
      },
    ]
  }
})
</script>
<style lang="scss" scoped>
.pay_state_step {
  display: flex;
  justify-content: space-between;
  .item {
    width: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    img {
      width: 50px;
      height: 50px;
      margin-bottom: 14px;
    }
    span {
      font-size: 22px;
      color: var(--text_color_L1);
      white-space: wrap;
      text-align: center;
    }
  }
  .item::after {
    content: '';
    display: block;
    width: 90px;
    height: 1px;
    background: var(--text_color_L2);
    position: absolute;
    top: 25px;
    right: -60%;
  }
  .appeal {
    width: 140px;
  }
  .appeal::after {
    width: 122%;
    right: -110%;
  }
  .item:last-child {
    &::after {
      width: 0;
    }
  }
}
</style>
