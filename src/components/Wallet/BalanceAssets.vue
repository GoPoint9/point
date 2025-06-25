<template>
  <div class="balanceAssets">
    <div class="balanceAssets__header">
      <div class="balanceAssets__header__left">
        <img :src="getIcons('wallet', 'balance')">
        {{ $t('balance') }}
      </div>
    </div>
    <div class="balanceAssets__main">
      <p>{{ currency(walletStore.getAmount) }}</p>
      <img :src="getIconsPublic('wallet/recharge', 'refresh')" alt="" @click="walletStore.resetData()">
    </div>
    <!-- <div class="balanceAssets__tip">
			<img :src="getIconsPublic('wallet/recharge', 'cip')" alt="" />
		</div> -->
  </div>
</template>

<script setup lang="ts">
import { useWalletStore } from '@/stores'
import { getIcons, getIconsPublic, currency } from '@/utils'
const walletStore = useWalletStore()
</script>

<style lang="scss" scoped>
.balanceAssets {
  width: 100%;
  height: 260px;
  background-image: url('@icon/wallet/TotalAssetsBg.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  border-radius: 20px;
  color: var(--text_color_L4);
  padding: 29px 25px 0 25px;
  position: relative;
  html:lang(ar) & {
    background-image: url('@icon/wallet/ar-TotalAssetsBg.png');
  }
  &__header {
    display: flex;
    justify-content: space-between;
    height: 40px;

    &__left {
      font-weight: 400;
      font-size: 26px;

      img {
        margin-right: 16px;
      }
    }

    &__left {
      display: flex;
      align-items: center;

      img {
        width: 30px;
        height: 30px;
        margin-right: 16px;
      }
    }
  }

  &__main {
    height: 55px;
    display: flex;
    align-items: center;
    margin: 16px 28px 28px 0;
    font-weight: 700;
    font-size: 48px;

    p {
      margin-left: 20px;
    }

    img {
      width: 44px;
      height: 28px;
      margin-left: 18px;
    }
  }

  &__tip {
    img {
      width: 50px;
      height: 32px;
      position: absolute;
      bottom: 26px;
      left: 29px;
      html:lang(ar) & {
        left: unset;
        right: 29px;
      }
    }
  }
}
</style>
