<template>
  <firstSaveDialog v-if="showFirstSave" />
  <van-dialog v-model:show="ActiveSotre.showReceiveDialog" :show-confirm-button="false" class-name="noOverHidden">
    <div class="dialog-window">
      <div class="dialog-wrapper">
        <img v-lazy="getIcons('public', 'succeed')">
        <div class="dialog-title">{{ $t('awardsReceived') }}</div>
        <div class="dialog-content">
          <img v-lazy="getIcons('activity/DailyTask', 'amountIcon')">
          <span>{{ currency(ActiveSotre.receiveAmount) }}</span>
        </div>
        <div class="dialog-btn" @click="ActiveSotre.showReceiveDialog = false">
          {{ $t('confirm') }}
        </div>
      </div>
    </div>
  </van-dialog>
  <van-dialog v-model:show="store.invite" :show-confirm-button="false" class-name="noOverHidden">
    <div class="dialog-window">
      <div class="dialog-wrapper">
        <img v-lazy="getIcons('public', 'succeed')">
        <div class="dialog-title">{{ $t('inviteTips') }}</div>
        <p class="dialog-tips">{{ $t('inviteAmount') }}</p>
        <div class="dialog-content">
          <span class="dialog-tips" style="margin-bottom: 0">{{ $t('commissionAmount') }}</span>
          <span> {{ currency(store.rebateAmount) }}</span>
        </div>
        <div class="dialog-btn" @click="closeInvite()">{{ $t('receive') }}</div>
      </div>
    </div>
  </van-dialog>
  <van-dialog
    v-model:show="store.oldUser"
    :show-confirm-button="false"
    :close-on-click-overlay="true"
    class-name="noOverHidden"
  >
    <div class="dialog-window">
      <div class="dialog-wrapper">
        <img v-lazy="getIcons('public', 'succeed')">
        <p class="dialog-tips" style="margin-top: 10px">{{ $t('oldPromptTip') }}</p>
        <div class="dialog-title" style="margin-top: 0">{{ $t('oldPrompt') }}</div>
        <p class="dialog-tips">{{ $t('oldPromptGift') }}</p>
        <div class="dialog-content">
          <span> {{ currency(store.returnAwards) }}</span>
        </div>
        <div class="dialog-btn" @click="onReturnAwards()">{{ $t('receive') }}</div>
      </div>
    </div>
  </van-dialog>
</template>

<script setup lang="ts">
import firstSaveDialog from '@/components/Activity/FirstRecharge/dialog.vue'
import { useRoute } from 'vue-router'
import { useActive } from './use'
import { currency, getIcons } from '@/utils'
import { useDialog } from '@/hooks'
const route = useRoute()
const { ActiveSotre } = useActive()
const { store, closeInvite, showFirstSave, onReturnAwards } = useDialog()
</script>

<style lang="scss" scoped>
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
    background: var(--GradiantBlue, var(--main_gradient-color));
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
