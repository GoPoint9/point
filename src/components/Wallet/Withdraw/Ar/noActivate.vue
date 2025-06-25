<template>
  <div v-if="pageType !== 'wallet/recharge'" class="arCard">
    <div class="left">
      <img :src="getIcons('wallet/withdrawType', `21`)">
      {{ $t('arbTip3') }}
    </div>
    <div class="right" @click="goActive(pageType)">{{ $t('arbActive') }}</div>
  </div>
  <div class="features">
    <div class="title">
      <svg-icon name="arpay2" />
      {{ $t('arbTip4') }}
    </div>
    <p>{{ $t('arbTip5') }}</p>
    <p class="t1">{{ $t('arbTip6') }}</p>
    <p class="t2" @click="onActivaRule()">{{ $t('arbTip7') }}<van-icon name="arrow" /></p>
    <p class="t3">{{ $t('arbTip8') }}</p>
    <p v-html="$t('abbTip9', [projectName])" />
    <p v-html="$t('arbTip10', [projectName])" />
    <p>{{ $t('arbTip11') }}</p>
    <p>{{ $t('arbTip12') }}</p>
    <div class="toActive" @click="goActive(pageType)">{{ $t('arActive') }}</div>
  </div>
</template>
<script setup lang="ts">
import { getIcons } from '@/utils'
import { useArwallet } from '@/hooks'
import { SettingStore } from '@/stores'
import { computed } from 'vue'

const onActivaRule = () => {
  const returnUrl = encodeURIComponent('https://' + window.location.host + '/#/' + 'main')
  const language = localStorage.getItem('language')
  const url = `https://arbpay.me/#/ActivaRules?lang=${language}&returnUrl=${returnUrl}`
  window.location.href = url
}

const props = withDefaults(
  defineProps<{
    pageType: string
  }>(),
  {}
)

const { goActive } = useArwallet()
const projectName = computed(() => SettingStore().getProjectName)
</script>
<style lang="scss" scoped>
@import '@/assets/styles/withdraw';
.features {
  @include baseBox;
  padding: 20px;
  text-align: left;
  color: var(--text_color_L1);
  margin-bottom: 32px;
  .title {
    font-size: 32px;
    font-weight: 600;
    display: flex;
    gap: 20px;
    svg {
      width: 44px;
      height: 44px;
    }
  }
  > p {
    font-size: 28px;
    margin: 20px 0;
    line-height: 50px;
    :deep(span) {
      font-size: 28px;
      font-weight: 500;
      margin: 0px 10px;
    }
  }
  .t1 {
    margin: 20px 0;
  }

  .t1,
  .t2 {
    font-size: 28px;
    font-weight: 500;
  }
  .t2 {
    color: var(--main_gradient-color);
  }
  .t3 {
    font-size: 32px;
    font-weight: 600;
    margin: 40px 0px 20px;
  }
  .toActive {
    background: var(--main-color);
    border-radius: 10px;
    color: var(--text_color_L4);
    padding: 20px 0;
    text-align: center;
    font-size: 28px;
    font-weight: 500;
  }
}
</style>
