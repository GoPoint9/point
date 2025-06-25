<script lang="ts" setup>
import { reactive, ref } from 'vue'

// State variables
const username = ref('')
const password = ref('')
const captcha = ref('')
const mobileNum = ref('')
const verificationCode = ref('')
const loginType = ref('username') // example: 'username' or 'sms'
const showCaptcha = ref(false)
const showPassword = ref(false)
const errors = reactive({}) // Mock of errors object
const initDialingCode = ref('+1')
const showLoginCountryCode = ref(true)
const countdown = ref(60)
const canSendSms = ref(true)

// Mock functions
const handleLogin = () => {}
const forgetPassword = () => {}
const changeCaptcha = () => {}
const getSms = () => {}
const setCountryCode = () => {}
</script>

<template>
  <div class="form_container">
    <form
      :key="loginType"
      class="login-form"
      autocomplete="off"
      data-vv-scope="login-form"
      @submit.prevent="handleLogin"
    >
      <template v-if="loginType === 'username'">
        <div class="form_item">
          <div class="label-box">
            <p class="label-text">{{ $t('in_increase_username') }}</p>
            <p class="errorMsg">{{ errors.first('login-form.username') }}</p>
          </div>
          <div class="item_box user hasIcon">
            <span class="input_icon">
              <svg-icon icon-class="form-icon-name" />
            </span>
            <input
              v-model.trim="username"
              v-validate="{ required: true }"
              class="username_input"
              :class="{ err: errors.first('login-form.username') }"
              :placeholder="$t('in_increase_username')"
              type="text"
              name="username"
              @blur="$forceUpdate"
            >
          </div>
          <p class="errorMsg" :class="{ showIcon: errors.first('login-form.username') }">
            {{ errors.first('login-form.username') }}
          </p>
        </div>
        <div class="form_item password">
          <div class="label-box">
            <p class="label-text">{{ $t('in_increase_password') }}</p>
            <p class="errorMsg">{{ errors.first('login-form.password') }}</p>
          </div>
          <div class="item_box pass hasIcon">
            <span class="input_icon">
              <svg-icon icon-class="form-icon-password" />
            </span>
            <input
              v-model.trim="password"
              v-validate="{ required: true }"
              class="password_input"
              :class="{ err: errors.first('login-form.password') }"
              :placeholder="$t('in_increase_password')"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              @blur="$forceUpdate"
            >
            <span v-if="isHeaderLogin" class="forget header-forget" @click="forgetPassword">
              <svg-icon icon-class="header-forget" />
            </span>
            <span v-else class="password-eyes" @click="showPassword = !showPassword">
              <svg-icon :icon-class="showPassword ? 'show-eyes-default' : 'hide-eyes-default'" />
            </span>
          </div>
          <p class="errorMsg" :class="{ showIcon: errors.first('login-form.password') }">
            {{ errors.first('login-form.password') }}
          </p>
        </div>
        <div v-if="showCaptcha" class="form_item">
          <div class="label-box">
            <p class="label-text">{{ $t('in_increase_captcha') }}</p>
            <p class="errorMsg">{{ errors.first('login-form.captcha') }}</p>
          </div>
          <div class="item_box capt hasIcon">
            <span class="input_icon">
              <svg-icon icon-class="login-modal-capt" />
            </span>
            <input
              v-model.trim="captcha"
              v-validate="{ required: true }"
              class="captcha_input"
              :class="{ err: errors.first('login-form.captcha') }"
              :placeholder="$t('in_increase_captcha')"
              type="text"
              name="captcha"
              @blur="$forceUpdate"
            >
            <div class="captcha_box" @click="changeCaptcha">
              <img :src="captchaSrc" alt="">
            </div>
          </div>
          <p class="errorMsg" :class="{ showIcon: errors.first('login-form.captcha') }">
            {{ errors.first('login-form.captcha') }}
          </p>
        </div>
      </template>
      <template v-else-if="loginType === 'sms'">
        <div class="form_item">
          <div class="label-box">
            <p class="label-text">{{ $t('in_increase_mobileNum') }}</p>
            <p class="errorMsg">{{ errors.first('login-form.mobileNum') }}</p>
          </div>
          <div class="item_box country" :class="{ hasCountry: showLoginCountryCode }">
            <!-- <country-code v-if="showLoginCountryCode" :initDialingCode="initDialingCode" @set-country-code="setCountryCode" /> -->
            <span class="input_icon">
              <svg-icon icon-class="form-icon-phone" />
            </span>
            <input
              v-model.trim="mobileNum"
              v-validate="{ required: true, mobileNum: true }"
              class="password_input"
              :class="{ err: errors.first('login-form.mobileNum') }"
              :placeholder="$t('in_increase_mobileNum')"
              type="text"
              name="mobileNum"
              autocomplete="off"
              @blur="$forceUpdate"
            >
          </div>
          <p class="errorMsg" :class="{ showIcon: errors.first('login-form.mobileNum') }">
            {{ errors.first('login-form.mobileNum') }}
          </p>
        </div>
        <div class="form_item">
          <div class="label-box">
            <p class="label-text">{{ $t('in_increase_verificationCode') }}</p>
            <p class="errorMsg">{{ errors.first('login-form.sms') }}</p>
          </div>
          <div class="item_box capt hasIcon">
            <span class="input_icon">
              <svg-icon icon-class="form-icon-sms" />
            </span>
            <input
              v-model="verificationCode"
              v-validate="{ required: true }"
              class="captcha_input"
              :class="{ err: errors.first('login-form.sms') }"
              :placeholder="$t('in_increase_verificationCode')"
              type="text"
              name="sms"
              autocomplete="off"
            >
            <div v-if="canSendSms" class="sms-btn" @click="getSms">
              {{ $t('in_get_verificationCode') }}
            </div>
            <div v-else class="sms-btn disabled">
              {{ `${countdown}s` }}
            </div>
          </div>
          <p class="errorMsg" :class="{ showIcon: errors.first('login-form.sms') }">
            {{ errors.first('login-form.sms') }}
          </p>
        </div>
      </template>
    </form>
  </div>
</template>
