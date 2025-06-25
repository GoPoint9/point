<script setup>
import { Form, Field, ErrorMessage, useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { ref, onMounted, inject } from 'vue'

import { useRouter } from 'vue-router'

// import { localize } from '@vee-validate/i18n'

const router = useRouter()

console.log(' Form, Field, ErrorMessage ', Form, Field, ErrorMessage)
const $modal = inject('$modal')

const loginType = ref('username')
const showPassword = ref(false)
const showCaptcha = ref(false)
const canSendSms = ref(true)
const countdown = ref(60)
const captchaSrc = ref('/path/to/captcha')

// values: { username, password, ... }
const { handleSubmit, errors, setFieldValue, defineField } = useForm({
  name: 'LoginForm', // Defaults to "Form"
  validationSchema: yup.object({
    username: yup.string().min(6).max(13).required(),
    password: yup.string().min(6).max(12).required(),
    captcha: yup.string().required(),
    mobileNum: yup.string().required(),
    verificationCode: yup.string().required(),
  }),
  initialValues: {
    userName: '',
    email: '',
  },
})
const [username, usernameProps] = defineField('username')
const [password, passwordProps] = defineField('password')
const [captcha, captchaProps] = defineField('captcha')
const [mobileNum, mobileNumProps] = defineField('mobileNum')
const [verificationCode, verificationCodeProps] = defineField('verificationCode')
console.warn('setFieldValue ', setFieldValue)
// const fields = {
//   username: useField('username'),
//   password: useField('password'),
//   captcha: useField('captcha'),
//   mobileNum: useField('mobileNum'),
//   verificationCode: useField('verificationCode')
// }

console.warn('username, usernameProps ', username, usernameProps)
// const { values, defineField } = useForm();
// const [username, usernameProps] = defineField('username');
// console.warn(' --- fields ', fields)
// onMounted(() => {
//   console.warn('fields.username.value ', fields.username, fields.username.value)
// })
console.warn('{ handleSubmit, errors, defineField } ', { handleSubmit, errors, defineField })

const isHeaderLogin = false

const onSubmit = handleSubmit(values => {
  console.log('Form submitted', values)
})

const forgetPassword = () => {
  console.log('Forgot password clicked')
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const changeCaptcha = () => {
  console.log('Change captcha')
}

const getSms = () => {
  console.log('Get SMS code')
}

const rememberUserPass = ref(false)
const handleCheckboxChange = event => {
  const target = event.target
  const checked = !!target.checked

  if (Array.isArray(rememberUserPass.value)) {
    const index = rememberUserPass.value.indexOf(null)
    if (checked && index === -1) {
      rememberUserPass.value = [...rememberUserPass.value, null]
    } else if (!checked && index !== -1) {
      rememberUserPass.value = rememberUserPass.value.filter(item => item !== null)
    }
  } else {
    rememberUserPass.value = checked
  }
}

function handleTermClick () {
  $modal.hide('loginPopupModal')
  router.push('/help#term')
  $modal.show('helpModal')
}
</script>

<template>
  <div class="form_container">
    <form
      :key="loginType"
      class="login-form"
      autocomplete="off"
      @submit.prevent="onSubmit"
    >
      <!-- {{ errors }} -->
      <template v-if="loginType === 'username'">
        <div class="form_item">
          <!-- <div class="label-box">
            <p class="label-text">{{ $t('in_increase_username') }}</p>
            <p class="errorMsg">{{ errors.username }}</p>
          </div> -->
          <div class="item_box user hasIcon">
            <span class="input_icon">
              <SvgIcon name="form-icon-name" />
            </span>
            <input
              v-model="username"
              class="username_input"
              :class="{ err: errors.username }"
              :placeholder="$t('in_increase_username')"
              type="text"
              name="username"
            >
            <!-- @blur="fields.username.handleBlur" -->
          </div>
          <p class="errorMsg" :class="{ showIcon: errors.username }">{{ errors.username }}</p>
        </div>

        <div class="form_item password">
          <!-- <div class="label-box">
            <p class="label-text">{{ $t('in_increase_password') }}</p>
            <p class="errorMsg">{{ errors.password }}</p>
          </div> -->
          <div class="item_box pass hasIcon">
            <span class="input_icon">
              <SvgIcon name="form-icon-password" />
            </span>
            <input
              v-model="password"
              v-bind="passwordProps"
              class="password_input"
              :class="{ err: errors.password }"
              :placeholder="$t('in_increase_password')"
              :type="showPassword ? 'text' : 'password'"
              name="password"
            >
            <!-- @blur="fields.password.handleBlur" -->
            <span v-if="isHeaderLogin" class="forget header-forget" @click="forgetPassword">
              <SvgIcon name="header-forget" />
            </span>
            <span class="password-eyes" @click="togglePassword">
              <SvgIcon :name="`eyes-default-${showPassword ? 'show' : 'hide'}`" />
            </span>
          </div>
          <p class="errorMsg" :class="{ showIcon: errors.password }">{{ errors.password }}</p>
        </div>

        <div v-if="showCaptcha" class="form_item">
          <!-- <div class="label-box">
            <p class="label-text">{{ $t('in_increase_captcha') }}</p>
            <p class="errorMsg">{{ errors.captcha }}</p>
          </div> -->
          <div class="item_box capt hasIcon">
            <span class="input_icon">
              <SvgIcon name="login-modal-capt" />
            </span>
            <input
              v-model="captcha"
              v-bind="captchaProps"
              class="captcha_input"
              :class="{ err: errors.captcha }"
              :placeholder="$t('in_increase_captcha')"
              type="text"
              name="captcha"
            >
            <!-- @blur="fields.captcha.handleBlur" -->
            <div class="captcha_box" @click="changeCaptcha">
              <img :src="captchaSrc" alt="">
            </div>
          </div>
          <p class="errorMsg" :class="{ showIcon: errors.captcha }">{{ errors.captcha }}</p>
        </div>
      </template>

      <template v-else-if="loginType === 'sms'">
        <div class="form_item">
          <!-- <div class="label-box">
            <p class="label-text">{{ $t('in_increase_mobileNum') }}</p>
            <p class="errorMsg">{{ errors.mobileNum }}</p>
          </div> -->
          <div class="item_box country" :class="{ hasCountry: showLoginCountryCode }">
            <span class="input_icon">
              <SvgIcon name="form-icon-phone" />
            </span>
            <input
              v-model="mobileNum"
              v-bind="mobileNumProps"
              class="password_input"
              :class="{ err: errors.mobileNum }"
              :placeholder="$t('in_increase_mobileNum')"
              type="text"
              name="mobileNum"
            >
            <!-- @blur="fields.mobileNum.handleBlur" -->
          </div>
          <p class="errorMsg" :class="{ showIcon: errors.mobileNum }">{{ errors.mobileNum }}</p>
        </div>

        <div class="form_item">
          <!-- <div class="label-box">
            <p class="label-text">{{ $t('in_increase_verificationCode') }}</p>
            <p class="errorMsg">{{ errors.verificationCode }}</p>
          </div> -->
          <div class="item_box capt hasIcon">
            <span class="input_icon">
              <SvgIcon name="form-icon-sms" />
            </span>
            <input
              v-model="verificationCode"
              v-bind="verificationCodeProps"
              class="captcha_input"
              :class="{ err: errors.verificationCode }"
              :placeholder="$t('in_increase_verificationCode')"
              type="text"
              name="verificationCode"
            >
            <!-- @blur="fields.verificationCode.handleBlur" -->
            <div v-if="canSendSms" class="sms-btn" @click="getSms">
              {{ $t('in_get_verificationCode') }}
            </div>
            <div v-else class="sms-btn disabled">
              {{ `${countdown}s` }}
            </div>
          </div>
          <p class="errorMsg" :class="{ showIcon: errors.verificationCode }">{{ errors.verificationCode }}</p>
        </div>
      </template>

      <div class="form_item rem-wrap">
        <div class="remember-item">
          <div class="remPass_box" :class="{ checked: rememberUserPass }">
            <input
              v-model="rememberUserPass"
              class="remPass_checkbox"
              type="checkbox"
              @change="handleCheckboxChange"
            >
            <span class="cheched-bg" />
            <span class="gougou" />
          </div>
          <span class="jzmm">{{ $t('in_remember_password') }}</span>
        </div>
        <span class="forget" @click="forgetPassword">
          {{ $t('in_forget_password') }}
        </span>
      </div>

      <div v-if="!isHeaderLogin" class="form_item btn-wrap">
        <button type="submit" class="submit_btn hover">{{ $t('hd_login_button') }}</button>
        <!-- <div v-if="!agentPage && firebase" class="firebase-login">
          <div class="tips">
            <span class="or-connect">{{ $t('local_login_way') }}</span>
          </div>
          <div class="firebase-group">
            <span v-if="firebaseFacebook" class="item facebook" @click="loginByFirebaseDelegate('facebook')">
              <svg-icon iconClass="facebook-m" />
            </span>
            <span v-if="firebaseGoogle" class="item google" @click="loginByFirebaseDelegate('google')">
              <svg-icon iconClass="google-m" />
            </span>
          </div>
        </div> -->
      </div>

      <div class="form_item terms">
        <div class="terms_box login">
          <input v-model="rememberUserPass" type="checkbox" class="terms_checkbox">
          <span class="cheched-bg" />
          <span class="gougou" />
        </div>
        <span>
          {{ $t('local_terms_content') }}
          <span class="link" @click="handleTermClick">{{ $t('local_terms_link') }}</span>
        </span>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
