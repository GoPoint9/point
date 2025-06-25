<script lang="ts" setup>
import SimpleSelect from './SimpleSelect.vue'
import SimpleOption from './SimpleOption.vue'
import NationFlag from './NationFlag.vue'

import countries from '@/NCZ/utils/countries.ts'

interface CountryCode {
  countryDialingCode: string
  countryCode: string
}
const props = defineProps<{
  defaultDialingCode?: string
  disabled?: boolean
}>()
const emit = defineEmits<{(e: 'setCountryCode', code: string): void }>()

onMounted(async () => {
  if (import.meta.env.VITE_APP_IS_WEB_PGPC) {
    const { useSiteStore } = await import('@/stores')
    const siteStore = useSiteStore()
    console.warn('siteStore.config.currencySetting ', siteStore.config.currencySetting)
    currencySetting.value = siteStore.config.currencySetting
  } else {
    // const { useSomeBdgStore } = await import('@/stores')
  }

  initData()
})
// countries: 直接使用競品資料。
// watch(countries, initData, { immediate: true })

const state = reactive({
  countryDialingCode: '',
  activeCountryCode: '',
})

const currencySetting = ref({})
const currentCountryCode = computed(() => ({
  countryCode: unref(currencySetting).currency,
  countryDialingCode: unref(currencySetting).countryCode,
}))
// const hasFirebase = computed(() => {
//   return store.Public?.smsProvider?.firebase || store.Public.whitelabelVal.UPDATEMOBILEICC3
// })
const isDisabled = computed(() => {
  // return props.disabled || store.Public.whitelabelVal.DISABLEDMOBILEICC3
  return true
})
const showCountryCode = computed(() => {
  // return hasFirebase.value && state.countryDialingCode && state.activeCountryCode
  return true
})

const initData = () => {
  console.warn(' -----> currentCountryCode.value ', currentCountryCode.value)
  const defaultCountry = countries.find((country: CountryCode) => country.countryDialingCode === props.defaultDialingCode)
  if (props.defaultDialingCode && defaultCountry) {
    state.countryDialingCode = props.defaultDialingCode
    state.activeCountryCode = defaultCountry.countryCode
  } else {
    state.countryDialingCode = currentCountryCode.value.countryDialingCode
    state.activeCountryCode = currentCountryCode.value.countryCode
  }
  emitCountryCode(state.countryDialingCode)
}
const chooseCountry = (country: CountryCode) => {
  state.countryDialingCode = country.countryDialingCode
  state.activeCountryCode = country.countryCode
  emitCountryCode(country.countryDialingCode)
}
const emitCountryCode = (code: string) => {
  emit('setCountryCode', code)
}
</script>

<template>
  <div v-if="showCountryCode" class="country-code" :class="{ disabled: isDisabled }">
    <SimpleSelect>
      <template #selected>
        <div class="select-val">
          <div class="active-img">
            <NationFlag type="2" :lang="state.activeCountryCode" :country-code="state.activeCountryCode" />
          </div>
          <span class="code-input">+ {{ state.countryDialingCode }}</span>
        </div>
      </template>
      <template v-if="!isDisabled">
        <slot name="arrow" />
        <template v-for="(country, index) in countries" :key="index">
          <SimpleOption :option="country" @option-selected="chooseCountry">
            <NationFlag type="2" :lang="country.countryCode" :country-code="country.countryCode" />
            <span class="code-num">+{{ country.countryDialingCode }}</span>
          </SimpleOption>
        </template>
      </template>
    </SimpleSelect>
  </div>
</template>

<style lang="scss">
.country-code {
  position: absolute;
  left: 0;
  height: 100%;
  font-size: 14px;
  color: #fff;
  // 禁用狀態
  &.disabled {
    pointer-events: none;
    .select-input > .arrow-icon {
      display: none;
    }
  }
  // 選擇器值區域
  .select-val {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0 10px;
  }
  // 國旗圖片容器
  .active-img {
    height: 50%;
    aspect-ratio: 1/1;
    object-fit: contain;
    flex-shrink: 0;
    > img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  // 代碼輸入區
  .code-input {
    flex: 1;
    text-align: center;
    color: inherit;
  }
  // Select 組件相關樣式
  .simple-select {
    width: 100%;
    height: 100%;
  }
  .select-input {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .selected-option {
    min-width: 60px;
    height: 100%;
  }
  .arrow-icon {
    width: 6px;
    height: 6px;
  }

  // 下拉選項列表
  .select-options {
    width: 100px;
    flex-direction: column;
    height: auto;
    max-height: 180px;
    border-radius: 5px;
    background: #333;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background: #666;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }

  .select-option {
    padding: 0 5px 0 10px;
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: hsla(0, 0%, 100%, 0.3);
    }
    img {
      width: 22px;
      height: 22px;
    }
    .code-num {
      margin-left: 5px;
      display: inline-block;
    }
  }
}
</style>
