<template>
  <div>
    <div v-if="languagesShow" class="right" @click="show = true">
      <div class="img">
        <img v-lazy="getIconsPublic('languages', locale)">
      </div>
      {{ getLangName(locale) }}
    </div>

    <van-popup
      v-model:show="show"
      class="popup"
      position="bottom"
      teleport="body"
    >
      <LangList :type="2" />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import LangList from '@/components/Main/LanguageList/index.vue'
import { useLang } from '@/hooks/useLanguage.hook'
import { getIconsPublic } from '@/utils'
import { SettingStore } from '@/stores'
import { computed } from 'vue'
const { getLangName, locale, show } = useLang()
const settingS = SettingStore()
const languagesShow = computed(() => Boolean(settingS.getLoginChangeLanguage == '1'))
</script>

<style lang="scss" scoped>
.right {
  display: flex;
  align-items: center;
  font-size: 30px;
  color: var(--text_color_L4);
  .img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 10px;
    overflow: hidden;
    position: relative;
    display: block;
    img {
      display: block;
      height: 45px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
.popup {
  border-radius: 20px 20px 0 0;
}
</style>
