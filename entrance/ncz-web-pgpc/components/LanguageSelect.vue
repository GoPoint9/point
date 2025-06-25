<!-- LanguageSelect.vue -->
<template>
  <div class="language-select">
    <SimpleSelect drop-animation-name="zoom-in-bottom">
      <template #selected>
        <div class="language-selected">
          <NationFlag type="2" :lang="locale" />
          <span class="selected-name">{{ languagesMap[locale] }}</span>
        </div>
      </template>
      <template #arrow>
        <svg-icon name="common-arrow" />
      </template>
      <template v-for="(language, index) in languagesList" :key="'lang_' + index">
        <SimpleOption
          :class-name="language.name === locale ? 'selected' : ''"
          :option="language.name"
          @option-selected="onClick(language.key, 1)"
        >
          <NationFlag type="2" :lang="language.key" />
          <span>{{ language.name }}</span>
        </SimpleOption>
      </template>
    </SimpleSelect>
  </div>
</template>

<script lang="ts" setup>
import NationFlag from './NationFlag.vue'
import SimpleSelect from './SimpleSelect.vue'
import SimpleOption from './SimpleOption.vue'

import { languagesMap } from '@/languages/languages.ts'
// import { getIconsPublic } from "@/utils";
import { useLang } from '@/hooks/useLanguage.hook'
const { onClick, languagesList, locale } = useLang()

// // i18n
// const languangeLocale = import.meta.glob('./modules/web-pgpc/i18n.ts', { import: 'default', eager: true })
// console.warn('languangeLocale ', languangeLocale)

defineProps({
  type: {
    // 是否展示弹窗
    type: Number,
    default: 1,
  },
})
</script>
