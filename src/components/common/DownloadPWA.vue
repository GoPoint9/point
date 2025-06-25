<template>
  <div v-if="isShowDwa" class="btn pwa-btn" @click="download">
    <svg
      class="line"
      width="1"
      height="60"
      viewBox="0 0 1 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0.5"
        x2="0.5"
        y2="60"
        stroke="white"
      />
    </svg>
    <van-icon class="close" name="close" @click="show = false" />
    <img class="icon" :src="settingS.getWebIco">
    <div class="text">{{ $t('addToDesktop') }}</div>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSessionStorage } from '@vueuse/core'
import { SettingStore } from '@/stores'
import { useHome } from '@/hooks'
import { usePwaDownload } from '@/hooks/usePwaDownload'
import { onMounted } from 'vue'
const show = useSessionStorage('show-pwa-download', true)

const { t: $t } = useI18n()
const settingS = SettingStore()

const { homeState } = useHome()
const { PWA, isShowDwa } = usePwaDownload()
function download () {
  if (!show.value) return
  if (PWA.value.canIUse) {
    PWA.value.download && PWA.value.download()
  } else {
    homeState.iosDialog = true
  }
}
</script>
<style lang="scss" scoped>
.btn {
  position: fixed;
  left: 50%;
  bottom: 180px;
  transform: translateX(-50%);
  width: 366px;
  height: 80px;
  background: var(--downBg, var(--main_gradient-color2));
  border-radius: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  padding-right: 80px;
  z-index: 2;
  .line {
    position: absolute;
    top: 10px;
    right: 75px;
    height: 60px;
  }
  .close {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 50px;
    margin: 10px;
    color: rgb(255, 255, 255);
  }
  .icon {
    width: 48px;
    height: 48px;
    margin-left: 10px;
  }

  .text {
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;
    color: var(--text_color_L4);
    text-shadow: 0px 2px 1px rgba(71, 129, 255, 0.5);
    margin-left: 10px;
    max-width: 216px;
    word-wrap: break-word;
  }
}
</style>
