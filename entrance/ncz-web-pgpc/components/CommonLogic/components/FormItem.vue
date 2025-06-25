<script lang="ts">
export const FORM_TYPES = {
  USERNAME: 'username',
  EMAIL: 'email',
  PASSWORD: 'password',
  MOBILE: 'mobile',
  CAPTCHA: 'captcha',
} as const

export const ACTION_TYPES = {
  SET_COUNTRY_CODE: 'setCountryCode',
  FORGET_PASSWORD: 'forgetPassword',
  TOGGLE_PASSWORD: 'togglePassword',
  GET_SMS: 'getSms',
} as const
</script>
<script lang="ts" setup>
// eslint-disable-next-line import/first
import CountryCode from '@entrance/ncz-web-pgpc/components/CountryCode.vue'

// svg icon 映射
const iconMap = {
  [FORM_TYPES.USERNAME]: 'form-icon-username',
  [FORM_TYPES.EMAIL]: 'form-icon-email',
  [FORM_TYPES.PASSWORD]: 'form-icon-password',
  [FORM_TYPES.MOBILE]: 'form-icon-mobile',
  [FORM_TYPES.CAPTCHA]: 'form-icon-sms',
}
// placeholder 映射
const placeholderMap = {
  [FORM_TYPES.USERNAME]: 'in_increase_username',
  [FORM_TYPES.EMAIL]: 'in_increase_email',
  [FORM_TYPES.PASSWORD]: 'in_increase_password',
  [FORM_TYPES.MOBILE]: 'in_increase_mobileNum',
  [FORM_TYPES.CAPTCHA]: 'in_increase_verificationCode',
}

const emit = defineEmits(['action'])
const props = defineProps({
  formType: {
    type: String,
    required: true,
    validator: value => Object.values(FORM_TYPES).includes(value),
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
  hasIcon: {
    type: Boolean,
    default: true,
  },
  // 競品有但未完成。
  // isHeaderLogin: {
  //   type: Boolean,
  //   default: false
  // },
  showCountryCode: {
    type: Boolean,
    default: false,
  },
  canSendSms: {
    type: Boolean,
    default: true,
  },
  countdown: {
    type: Number,
    default: 0,
  },
})

// 統一處理事件發送
const onAction = (type, value) => {
  emit('action', { type, value })
}

const showPassword = ref(false)
const fieldType = computed(() => {
  if (props.formType === FORM_TYPES.PASSWORD) {
    return unref(showPassword) ? 'text' : 'password'
  }
  return 'text'
})
</script>

<template>
  <div :class="['form_item', { has_error: errors[formType] }]">
    <div :class="['item_box', formType, { hasIcon, hasCountry: showCountryCode }]">
      <CountryCode v-if="showCountryCode" @set-country-code="onAction('setCountryCode', $event)" />

      <span v-if="hasIcon" class="input_icon">
        <SvgIcon :name="iconMap[formType]" />
      </span>

      <!-- INPUT -->
      <VField
        :name="formType"
        :type="fieldType"
        :class="[`${formType}_input`, { err: errors[formType] }]"
        :placeholder="$t(placeholderMap[formType])"
        v-bind="$attrs"
      />

      <!-- 密碼相關按鈕 -->
      <template v-if="formType === FORM_TYPES.PASSWORD">
        <!-- <span v-if="isHeaderLogin" class="forget header-forget" @click="onAction('forgetPassword')">
          <SvgIcon name="header-forget" />
        </span> -->
        <span class="password-eyes" @click="showPassword = !showPassword">
          <SvgIcon :name="`eyes-default-${showPassword ? 'show' : 'hide'}`" />
        </span>
      </template>

      <!-- 驗證碼按鈕 -->
      <template v-if="formType === FORM_TYPES.CAPTCHA">
        <div :class="['sms-btn', { disabled: !canSendSms }]" @click="canSendSms && onAction('getSms')">
          {{ canSendSms ? $t('in_get_verificationCode') : `${countdown}s` }}
        </div>
      </template>
    </div>
    <VErrorMessage class="errorMsg" :name="formType" />
  </div>
</template>

<style lang="scss" scoped>
@use '@entrance/ncz-web-pgpc/form_container.scss' as *;
</style>
