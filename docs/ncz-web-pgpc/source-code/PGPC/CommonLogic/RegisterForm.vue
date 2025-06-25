<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useModal } from '@/composables/useModal'
import { useI18n } from 'vue-i18n'
import CountryCode from '@/components/CountryCode'
import SvgIcon from '@/components/SvgIcon'
import { getCode } from '@/utils'
import { firebaseMixins, geetestMixins } from '@/mixins'

const store = useStore()
const router = useRouter()
const modal = useModal()
const { t } = useI18n()

const regType = ref('register')
const isAgree = ref(true)
const showAffiliateCode = ref(false)
const user = ref({
  username: '',
  password: '',
  confirmPassword: '',
  payeeName: '',
  email: '',
  qqNum: '',
  mobileNum: '',
  recommenderId: '',
  captcha: '',
  verificationCode: '',
  affiliateCode: '',
  paymentPassword: '',
  line: '',
  whatsapp: '',
  facebook: '',
  wechat: '',
  idNumber: '',
  referralCode: null,
  domain: getCode().domain || '',
})

const captchaSrc = ref('')
const time = ref(new Date())
const canSendSms = ref(true)
const countdown = ref(60)
const urlInfo = ref(getCode())
const countryDialingCode = ref(undefined)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const termsUserPass = ref(false)
const termsCheck = ref(false)

const registerOption = [
  {
    type: 'register',
    key: 'USERNAMEREG3',
    label: 'in_register_user',
  },
  {
    type: 'registerMobile',
    key: 'MOBILENUMREG3',
    label: 'in_register_mobile',
  },
]
</script>

<template>
  <div class="register-form-container">
    <div v-if="registerOption.length > 1" class="method-select">
      <template v-for="option in registerOption">
        <div
          :key="option.type"
          :class="['method-item', { active: regType === option.type }]"
          @click="loginTabChange(option.type)"
        >
          {{ t(option.label) }}
        </div>
      </template>
    </div>

    <div class="form_container">
      <form
        :key="regType"
        class="register-form"
        autocomplete="off"
        @submit.prevent="submitRegister"
      >
        <template v-if="regType === 'register'">
          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_username') }}
              </div>
              <p class="errorMsg">{{ errors.first('username') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon />
              </span>
              <input
                v-model="user.username"
                v-validate="{ required: true }"
                name="username"
                :placeholder="t('in_increase_username')"
                type="text"
              >
            </div>
          </div>

          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_password') }}
              </div>
              <p class="errorMsg">{{ errors.first('password') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon icon-class="form-icon-password" />
              </span>
              <input
                v-model="user.password"
                v-validate="{ required: true }"
                name="password"
                :placeholder="t('in_increase_password')"
                :type="showPassword ? 'text' : 'password'"
              >
              <span class="password-toggle" @click="showPassword = !showPassword">
                <svg-icon :icon-class="showPassword ? 'form-icon-eye-open' : 'form-icon-eye-close'" />
              </span>
            </div>
          </div>

          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_confirm_password') }}
              </div>
              <p class="errorMsg">{{ errors.first('confirmPassword') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon icon-class="form-icon-password" />
              </span>
              <input
                v-model="user.confirmPassword"
                v-validate="{ required: true }"
                name="confirmPassword"
                :placeholder="t('in_increase_confirm_password')"
                :type="showConfirmPassword ? 'text' : 'password'"
              >
              <span class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
                <svg-icon :icon-class="showConfirmPassword ? 'form-icon-eye-open' : 'form-icon-eye-close'" />
              </span>
            </div>
          </div>
          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_payment_password') }}
              </div>
              <p class="errorMsg">{{ errors.first('paymentPassword') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon icon-class="form-icon-password" />
              </span>
              <input
                v-model="user.paymentPassword"
                v-validate="{ required: true }"
                name="paymentPassword"
                :placeholder="t('in_increase_payment_password')"
                :type="showPassword ? 'text' : 'password'"
              >
              <span class="password-toggle" @click="showPassword = !showPassword">
                <svg-icon :icon-class="showPassword ? 'form-icon-eye-open' : 'form-icon-eye-close'" />
              </span>
            </div>
          </div>
          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_payee_name') }}
              </div>
              <p class="errorMsg">{{ errors.first('payeeName') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon icon-class="form-icon-user" />
              </span>
              <input
                v-model="user.payeeName"
                v-validate="{ required: true }"
                name="payeeName"
                :placeholder="t('in_increase_payee_name')"
                type="text"
              >
            </div>
          </div>

          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_id_number') }}
              </div>
              <p class="errorMsg">{{ errors.first('idNumber') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon icon-class="form-icon-id" />
              </span>
              <input
                v-model="user.idNumber"
                v-validate="{ required: true }"
                name="idNumber"
                :placeholder="t('in_increase_id_number')"
                type="text"
              >
            </div>
          </div>
          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_email') }}
              </div>
              <p class="errorMsg">{{ errors.first('email') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon icon-class="form-icon-email" />
              </span>
              <input
                v-model="user.email"
                v-validate="{ required: true, email: true }"
                name="email"
                :placeholder="t('in_increase_email')"
                type="text"
              >
            </div>
          </div>

          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_mobile') }}
              </div>
              <p class="errorMsg">{{ errors.first('mobileNum') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon icon-class="form-icon-mobile" />
              </span>
              <input
                v-model="user.mobileNum"
                v-validate="{ required: true }"
                name="mobileNum"
                :placeholder="t('in_increase_mobile')"
                type="text"
              >
            </div>
          </div>
          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_payeeName') }}
              </div>
              <p class="errorMsg">{{ errors.first('payeeName') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon icon-class="form-icon-user" />
              </span>
              <input
                v-model="user.payeeName"
                v-validate="{ required: true }"
                name="payeeName"
                :placeholder="t('in_increase_payeeName')"
                type="text"
              >
            </div>
          </div>

          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_paymentPassword') }}
              </div>
              <p class="errorMsg">{{ errors.first('paymentPassword') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon icon-class="form-icon-password" />
              </span>
              <input
                v-model="user.paymentPassword"
                v-validate="{ required: true }"
                name="paymentPassword"
                :placeholder="t('in_increase_paymentPassword')"
                :type="showPassword ? 'text' : 'password'"
              >
              <span class="password-toggle" @click="showPassword = !showPassword">
                <svg-icon :icon-class="showPassword ? 'form-icon-eye-open' : 'form-icon-eye-close'" />
              </span>
            </div>
          </div>
          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_email') }}
              </div>
              <p class="errorMsg">{{ errors.first('email') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon icon-class="form-icon-email" />
              </span>
              <input
                v-model="user.email"
                v-validate="{ required: true, email: true }"
                name="email"
                :placeholder="t('in_increase_email')"
                type="text"
              >
            </div>
          </div>

          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_mobile') }}
              </div>
              <p class="errorMsg">{{ errors.first('mobileNum') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon icon-class="form-icon-mobile" />
              </span>
              <country-code v-model="countryDialingCode" />
              <input
                v-model="user.mobileNum"
                v-validate="{ required: true, mobile: true }"
                name="mobileNum"
                :placeholder="t('in_increase_mobile')"
                type="text"
              >
            </div>
          </div>

          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_password') }}
              </div>
              <p class="errorMsg">{{ errors.first('password') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon icon-class="form-icon-password" />
              </span>
              <input
                v-model="user.password"
                v-validate="{ required: true, min: 6 }"
                name="password"
                :placeholder="t('in_increase_password')"
                type="password"
              >
            </div>
          </div>

          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_confirm_password') }}
              </div>
              <p class="errorMsg">{{ errors.first('confirmPassword') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon icon-class="form-icon-password" />
              </span>
              <input
                v-model="user.confirmPassword"
                v-validate="{ required: true, confirmed: 'password' }"
                name="confirmPassword"
                :placeholder="t('in_increase_confirm_password')"
                type="password"
              >
            </div>
          </div>
          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_payment_password') }}
              </div>
              <p class="errorMsg">{{ errors.first('paymentPassword') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon icon-class="form-icon-password" />
              </span>
              <input
                v-model="user.paymentPassword"
                v-validate="{ required: true, min: 6 }"
                name="paymentPassword"
                :placeholder="t('in_increase_payment_password')"
                type="password"
              >
            </div>
          </div>

          <div class="form_item">
            <div class="label-box">
              <div class="label-text" :class="{ isRequire: true }">
                {{ t('in_increase_payee_name') }}
              </div>
              <p class="errorMsg">{{ errors.first('payeeName') }}</p>
            </div>
            <div class="item_box hasIcon">
              <span class="input_icon">
                <svg-icon icon-class="form-icon-user" />
              </span>
              <input
                v-model="user.payeeName"
                v-validate="{ required: true }"
                name="payeeName"
                :placeholder="t('in_increase_payee_name')"
                type="text"
              >
            </div>
          </div>
        </template>
      </form>
    </div>
  </div>
</template>
