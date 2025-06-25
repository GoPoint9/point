<!--
 * @Author: Seven
 * @Date: 2023-06-09 17:34:53
 * @LastEditTime: 2024-03-25 18:12:15
 * @LastEditors: Seven
 * @Description:
-->
<template>
  <div class="instructions">
    <div class="instructions_img">
      <img :src="getIconsPublic('home', 'u18')" alt="" class="u18">
      <img :src="headDfaultUrl" class="logo">
    </div>
    <div class="desc">
      {{ $t('instructions', [settingS.getProjectName]) }}<br>
      {{ $t('instructions2') }} <br>
      {{ $t('instructions3', [settingS.getProjectName]) }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { SettingStore } from '@/stores'
import { getIconsPublic } from '@/utils'
import { computed } from 'vue'
const settingS = SettingStore()
const headDfaultUrl = computed(() => settingS.getHeadLogo)
</script>
<style lang="scss" scoped>
.instructions {
  margin-bottom: 60px;
  .instructions_img {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 24px;
    .u18 {
      width: 44px;
      height: 44px;
      margin-right: 16px;
    }
    .logo {
      width: auto;
      height: 60px;
    }
  }
  .desc {
    color: #848486;
    font-size: 22px;
  }
}
</style>
