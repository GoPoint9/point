
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
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
              <span
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <svg-icon :icon-class="showPassword ? 'form-icon-eye-open' : 'form-icon-eye-close'" />
              </span>
            </div>
          </div>

          <div class="form_item">
            <div class="label-box">
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
              <span
                class="password-toggle"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <svg-icon :icon-class="showConfirmPassword ? 'form-icon-eye-open' : 'form-icon-eye-close'" />
              </span>
            </div>
          </div>
          <div class="form_item">
            <div class="label-box">
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
              <span
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <svg-icon :icon-class="showPassword ? 'form-icon-eye-open' : 'form-icon-eye-close'" />
              </span>
            </div>
          </div>
          <div class="form_item">
            <div class="label-box">
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
              <span
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <svg-icon :icon-class="showPassword ? 'form-icon-eye-open' : 'form-icon-eye-close'" />
              </span>
            </div>
          </div>
          <div class="form_item">
            <div class="label-box">
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
              <div
                class="label-text"
                :class="{ isRequire: true }"
              >
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
 render = function() {
  var e = this
    , t = e._self._c;
  return t("div", {
      staticClass: "register-form-container"
  }, [e.registerOption.length > 1 ? t("div", {
      staticClass: "method-select"
  }, [e._l(e.registerOption, (function(n) {
      return [t("div", {
          key: n.type,
          class: ["method-item", {
              active: e.regType === n.type
          }],
          on: {
              click: function(t) {
                  return e.loginTabChange(n.type)
              }
          }
      }, [e._v(" " + e._s(e.$t(n.label)) + " ")])]
  }
  ))], 2) : e._e(), t("div", {
      staticClass: "form_container"
  }, [t("form", {
      key: e.regType,
      staticClass: "register-form",
      attrs: {
          autocomplete: "off"
      },
      on: {
          submit: function(t) {
              return t.preventDefault(),
              e.submitRegister.apply(null, arguments)
          }
      }
  }, ["register" === e.regType ? [t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: !0
      }
  }, [e._v(e._s(e.$t("in_increase_username")))]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("username")))])]), t("div", {
      staticClass: "item_box hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-name"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.username,
          expression: "user.username"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              username: !0
          },
          expression: "{ required: true, username: true }"
      }],
      key: "username-input",
      staticClass: "username_input",
      attrs: {
          type: "text",
          spellcheck: "false",
          placeholder: e.getPlaceHolder("username", e.$t("in_increase_username")),
          name: "username",
          autocomplete: "off"
      },
      domProps: {
          value: e.user.username
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "username", t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("username")))])]), t("div", {
      key: "firstPass",
      staticClass: "form_item password"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: !0
      }
  }, [e._v(e._s(e.$t("in_increase_password")))]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("password")))])]), t("div", {
      staticClass: "item_box hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-password"
      }
  })], 1), "checkbox" === (e.showPassword ? "text" : "password") ? t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.password,
          expression: "user.password"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              password: !0
          },
          expression: "{ required: true, password: true }"
      }],
      staticClass: "password_input",
      attrs: {
          name: "password",
          autocomplete: "new-password",
          placeholder: e.getPlaceHolder("password", e.$t("in_increase_password")),
          type: "checkbox"
      },
      domProps: {
          checked: Array.isArray(e.user.password) ? e._i(e.user.password, null) > -1 : e.user.password
      },
      on: {
          change: function(t) {
              var n = e.user.password
                , a = t.target
                , i = !!a.checked;
              if (Array.isArray(n)) {
                  var o = null
                    , s = e._i(n, o);
                  a.checked ? s < 0 && e.$set(e.user, "password", n.concat([o])) : s > -1 && e.$set(e.user, "password", n.slice(0, s).concat(n.slice(s + 1)))
              } else
                  e.$set(e.user, "password", i)
          }
      }
  }) : "radio" === (e.showPassword ? "text" : "password") ? t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.password,
          expression: "user.password"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              password: !0
          },
          expression: "{ required: true, password: true }"
      }],
      staticClass: "password_input",
      attrs: {
          name: "password",
          autocomplete: "new-password",
          placeholder: e.getPlaceHolder("password", e.$t("in_increase_password")),
          type: "radio"
      },
      domProps: {
          checked: e._q(e.user.password, null)
      },
      on: {
          change: function(t) {
              return e.$set(e.user, "password", null)
          }
      }
  }) : t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.password,
          expression: "user.password"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              password: !0
          },
          expression: "{ required: true, password: true }"
      }],
      staticClass: "password_input",
      attrs: {
          name: "password",
          autocomplete: "new-password",
          placeholder: e.getPlaceHolder("password", e.$t("in_increase_password")),
          type: e.showPassword ? "text" : "password"
      },
      domProps: {
          value: e.user.password
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "password", t.target.value)
          }
      }
  }), t("span", {
      staticClass: "password-eyes",
      on: {
          click: function(t) {
              e.showPassword = !e.showPassword
          }
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: e.showPassword ? "show-eyes-default" : "hide-eyes-default"
      }
  })], 1)]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("password")))])])] : e._e(), e.showMobile ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: e.mobileRequired
      }
  }, [e._v(e._s(e.$t("in_increase_mobileNum")))]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("mobileNum")))])]), t("div", {
      staticClass: "item_box country",
      class: {
          hasCountry: e.showRegisterCountryCode
      }
  }, [e.showRegisterCountryCode ? t("CountryCode", {
      on: {
          setCountryCode: e.setCountryCode
      }
  }) : e._e(), t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-phone"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.mobileNum,
          expression: "user.mobileNum"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: e.mobileRequired,
              mobileNum: !0
          },
          expression: "{ required: mobileRequired, mobileNum: true }"
      }],
      key: "mobileNum-input",
      staticClass: "phone_input",
      attrs: {
          type: "text",
          name: "mobileNum",
          autocomplete: "off",
          placeholder: e.getPlaceHolder("mobileNum", e.$t("in_increase_mobileNum"))
      },
      domProps: {
          value: e.user.mobileNum
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "mobileNum", t.target.value)
          }
      }
  })], 1), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("mobileNum")))])]) : e._e(), e.smsEnabled ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: !0
      }
  }, [e._v(" " + e._s(e.$t("in_increase_verificationCode")) + " ")]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("verificationCode")))])]), t("div", {
      staticClass: "item_box capt"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-sms"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.verificationCode,
          expression: "user.verificationCode"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0
          },
          expression: "{ required: true }"
      }],
      staticClass: "sms_input",
      attrs: {
          type: "text",
          name: "sms",
          spellcheck: "false",
          autocomplete: "off",
          placeholder: "".concat(e.$t("in_increase_verificationCode"))
      },
      domProps: {
          value: e.user.verificationCode
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "verificationCode", t.target.value)
          }
      }
  }), e.canSendSms ? t("div", {
      staticClass: "sms-btn",
      on: {
          click: e.getSms
      }
  }, [e._v(e._s(e.$t("in_get_verificationCode")))]) : t("div", {
      staticClass: "sms-btn disabled"
  }, [e._v(e._s("".concat(e.countdown, "s")))])]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("sms")))])]) : e._e(), "registerMobile" === e.regType && e.showMobileRegPass ? [t("div", {
      key: "secondPass",
      staticClass: "form_item password"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: !0
      }
  }, [e._v(e._s(e.$t("in_increase_password")))]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("password")))])]), t("div", {
      staticClass: "item_box hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-password"
      }
  })], 1), "checkbox" === (e.showPassword ? "text" : "password") ? t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.password,
          expression: "user.password"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              password: !0
          },
          expression: "{ required: true, password: true }"
      }],
      staticClass: "password_input",
      attrs: {
          name: "password",
          autocomplete: "new-password",
          placeholder: e.getPlaceHolder("password", e.$t("in_increase_password")),
          type: "checkbox"
      },
      domProps: {
          checked: Array.isArray(e.user.password) ? e._i(e.user.password, null) > -1 : e.user.password
      },
      on: {
          change: function(t) {
              var n = e.user.password
                , a = t.target
                , i = !!a.checked;
              if (Array.isArray(n)) {
                  var o = null
                    , s = e._i(n, o);
                  a.checked ? s < 0 && e.$set(e.user, "password", n.concat([o])) : s > -1 && e.$set(e.user, "password", n.slice(0, s).concat(n.slice(s + 1)))
              } else
                  e.$set(e.user, "password", i)
          }
      }
  }) : "radio" === (e.showPassword ? "text" : "password") ? t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.password,
          expression: "user.password"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              password: !0
          },
          expression: "{ required: true, password: true }"
      }],
      staticClass: "password_input",
      attrs: {
          name: "password",
          autocomplete: "new-password",
          placeholder: e.getPlaceHolder("password", e.$t("in_increase_password")),
          type: "radio"
      },
      domProps: {
          checked: e._q(e.user.password, null)
      },
      on: {
          change: function(t) {
              return e.$set(e.user, "password", null)
          }
      }
  }) : t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.password,
          expression: "user.password"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              password: !0
          },
          expression: "{ required: true, password: true }"
      }],
      staticClass: "password_input",
      attrs: {
          name: "password",
          autocomplete: "new-password",
          placeholder: e.getPlaceHolder("password", e.$t("in_increase_password")),
          type: e.showPassword ? "text" : "password"
      },
      domProps: {
          value: e.user.password
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "password", t.target.value)
          }
      }
  }), t("span", {
      staticClass: "password-eyes",
      on: {
          click: function(t) {
              e.showPassword = !e.showPassword
          }
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: e.showPassword ? "show-eyes-default" : "hide-eyes-default"
      }
  })], 1)]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("password")))])])] : e._e(), e.showPayeeName ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: e.payeeNameValid.required
      }
  }, [e._v(" " + e._s(e.$t("in_increase_payeeName")) + " ")]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("payeeName")))])]), t("div", {
      staticClass: "item_box"
  }, [t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.payeeName,
          expression: "user.payeeName"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: e.payeeNameValid.required,
              payeeName: !0
          },
          expression: "{\n              required: payeeNameValid.required,\n              payeeName: true,\n            }"
      }],
      staticClass: "payeeName_input",
      attrs: {
          type: "text",
          name: "payeeName",
          autocomplete: "off",
          placeholder: e.getPlaceHolder("payeeName", e.$t("in_increase_payeeName"))
      },
      domProps: {
          value: e.user.payeeName
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "payeeName", t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("payeeName")))])]) : e._e(), e.showpaymentPassword ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: !0
      }
  }, [e._v(" " + e._s(e.$t("in_increase_paymentPassword")) + " ")]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("paymentPassword")))])]), t("div", {
      staticClass: "item_box"
  }, [t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.paymentPassword,
          expression: "user.paymentPassword"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: !0,
              paymentPassword: !0
          },
          expression: "{ required: true, paymentPassword: true }"
      }],
      class: {
          hasError: e.errors.has("paymentPassword")
      },
      attrs: {
          type: "password",
          name: "paymentPassword",
          autocomplete: "off",
          placeholder: e.getPlaceHolder("paymentPassword", e.$t("in_increase_paymentPassword"))
      },
      domProps: {
          value: e.user.paymentPassword
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "paymentPassword", t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("paymentPassword")))])]) : e._e(), e.showQQ ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: e.qqValid.required
      }
  }, [e._v(e._s(e.$t("in_increase_qqNum")))]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("qqNum")))])]), t("div", {
      staticClass: "item_box"
  }, [t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.qqNum,
          expression: "user.qqNum"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: e.qqValid.required,
              qqNum: !0
          },
          expression: "{ required: qqValid.required, qqNum: true }"
      }],
      staticClass: "qqNum_input",
      attrs: {
          type: "text",
          name: "qqNum",
          autocomplete: "off",
          placeholder: e.getPlaceHolder("qqNum", e.$t("in_increase_qqNum"))
      },
      domProps: {
          value: e.user.qqNum
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "qqNum", t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("qqNum")))])]) : e._e(), e.showline ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: e.lineValid.required
      }
  }, [e._v(e._s(e.$t("in_increase_qqNum")))]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("line")))])]), t("div", {
      staticClass: "item_box"
  }, [t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.line,
          expression: "user.line"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: e.lineValid.required,
              line: !0
          },
          expression: "{ required: lineValid.required, line: true }"
      }],
      class: {
          hasError: e.errors.has("line")
      },
      attrs: {
          type: "text",
          name: "line",
          autocomplete: "off",
          placeholder: e.getPlaceHolder("line", e.$t("in_increase_line"))
      },
      domProps: {
          value: e.user.line
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "line", t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("line")))])]) : e._e(), e.showwhatsapp ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: e.whatsappValid.required
      }
  }, [e._v(" " + e._s(e.$t("in_increase_qqNum")) + " ")]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("whatsapp")))])]), t("div", {
      staticClass: "item_box"
  }, [t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.whatsapp,
          expression: "user.whatsapp"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: e.whatsappValid.required,
              whatsapp: !0
          },
          expression: "{ required: whatsappValid.required, whatsapp: true }"
      }],
      class: {
          hasError: e.errors.has("whatsapp")
      },
      attrs: {
          type: "text",
          name: "whatsapp",
          autocomplete: "off",
          placeholder: e.getPlaceHolder("whatsapp", e.$t("in_increase_whatsapp"))
      },
      domProps: {
          value: e.user.whatsapp
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "whatsapp", t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("whatsapp")))])]) : e._e(), e.showfacebook ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: e.facebookValid.required
      }
  }, [e._v(" " + e._s(e.$t("in_increase_facebook")) + " ")]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("facebook")))])]), t("div", {
      staticClass: "item_box"
  }, [t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.facebook,
          expression: "user.facebook"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: e.facebookValid.required,
              facebook: !0
          },
          expression: "{ required: facebookValid.required, facebook: true }"
      }],
      class: {
          hasError: e.errors.has("facebook")
      },
      attrs: {
          type: "text",
          name: "facebook",
          autocomplete: "off",
          placeholder: e.getPlaceHolder("facebook", e.$t("in_increase_facebook"))
      },
      domProps: {
          value: e.user.facebook
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "facebook", t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("facebook")))])]) : e._e(), e.showwechat ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: e.wechatValid.required
      }
  }, [e._v(" " + e._s(e.$t("in_increase_wechat")) + " ")]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("wechat")))])]), t("div", {
      staticClass: "item_box"
  }, [t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.wechat,
          expression: "user.wechat"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: e.wechatValid.required,
              wechat: !0
          },
          expression: "{ required: wechatValid.required, wechat: true }"
      }],
      class: {
          hasError: e.errors.has("wechat")
      },
      attrs: {
          type: "text",
          name: "wechat",
          autocomplete: "off",
          placeholder: e.getPlaceHolder("wechat", e.$t("in_increase_wechat"))
      },
      domProps: {
          value: e.user.wechat
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "wechat", t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("wechat")))])]) : e._e(), e.showidNumber ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: e.idNumberValid.required
      }
  }, [e._v(" " + e._s(e.$t("in_increase_idNumber")) + " ")]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("idNumber")))])]), t("div", {
      staticClass: "item_box"
  }, [t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.idNumber,
          expression: "user.idNumber"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: e.idNumberValid.required,
              idNumber: !0
          },
          expression: "{ required: idNumberValid.required, idNumber: true }"
      }],
      class: {
          hasError: e.errors.has("idNumber")
      },
      attrs: {
          type: "text",
          name: "idNumber",
          autocomplete: "off",
          placeholder: e.getPlaceHolder("idNumber", e.$t("in_increase_idNumber"))
      },
      domProps: {
          value: e.user.idNumber
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "idNumber", t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("idNumber")))])]) : e._e(), e.showEmail ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: e.emailValid.required
      }
  }, [e._v(" " + e._s(e.$t("in_increase_emailInfo")) + " ")]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("email")))])]), t("div", {
      staticClass: "item_box"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-email"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.email,
          expression: "user.email"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: e.emailValid.required,
              email: !0
          },
          expression: "{ required: emailValid.required, email: true }"
      }],
      staticClass: "email_input",
      attrs: {
          type: "text",
          name: "email",
          autocomplete: "off",
          placeholder: e.getPlaceHolder("email", e.$t("in_increase_emailInfo"))
      },
      domProps: {
          value: e.user.email
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "email", t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("email")))])]) : e._e(), e.showRecommenderId ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: e.recommenderIdValid.required
      }
  }, [e._v(" " + e._s(e.$t("in_increase_recommenderId")) + " ")]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("recommenderId")))])]), t("div", {
      staticClass: "item_box"
  }, [t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.recommenderId,
          expression: "user.recommenderId"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: e.recommenderIdValid.required,
              recommenderId: !0
          },
          expression: "{\n              required: recommenderIdValid.required,\n              recommenderId: true,\n            }"
      }],
      staticClass: "recommender_input",
      attrs: {
          type: "text",
          name: "recommenderId",
          autocomplete: "off",
          placeholder: e.getPlaceHolder("recommenderId", e.$t("in_increase_recommenderId"))
      },
      domProps: {
          value: e.user.recommenderId
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "recommenderId", t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("recommenderId")))])]) : e._e(), e.hasAffiliate ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: e.affiliateCodeValid.required
      }
  }, [e._v(" " + e._s(e.$t("in_increase_affiliateCode")) + " ")]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("affiliateCode")))])]), t("div", {
      staticClass: "item_box hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-invitation"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.affiliateCode,
          expression: "user.affiliateCode"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: e.affiliateCodeValid.required,
              affiliateCode: !0
          },
          expression: "{\n              required: affiliateCodeValid.required,\n              affiliateCode: true,\n            }"
      }],
      staticClass: "affiliateCode_input",
      attrs: {
          type: "text",
          name: "affiliateCode",
          autocomplete: "off",
          placeholder: e.getPlaceHolder("affiliateCode", e.$t("in_increase_affiliateCode"))
      },
      domProps: {
          value: e.user.affiliateCode
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "affiliateCode", t.target.value)
          }
      }
  })]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("affiliateCode")))])]) : e._e(), e.showCaptcha ? t("div", {
      staticClass: "form_item"
  }, [t("div", {
      staticClass: "label-box"
  }, [t("div", {
      staticClass: "label-text",
      class: {
          isRequire: e.captchaValid.required
      }
  }, [e._v(" " + e._s(e.$t("in_increase_captcha")) + " ")]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("captcha")))])]), t("div", {
      staticClass: "item_box capt hasIcon"
  }, [t("span", {
      staticClass: "input_icon"
  }, [t("svg-icon", {
      attrs: {
          iconClass: "form-icon-verify"
      }
  })], 1), t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.user.captcha,
          expression: "user.captcha"
      }, {
          name: "validate",
          rawName: "v-validate",
          value: {
              required: e.captchaValid.required
          },
          expression: "{ required: captchaValid.required }"
      }],
      staticClass: "captcha_input",
      attrs: {
          id: "captcha_input",
          name: "captcha",
          placeholder: "".concat(e.$t("in_increase_captcha")),
          type: "text"
      },
      domProps: {
          value: e.user.captcha
      },
      on: {
          input: function(t) {
              t.target.composing || e.$set(e.user, "captcha", t.target.value)
          }
      }
  }), t("span", {
      staticClass: "captcha_box",
      on: {
          click: e.changeCaptcha
      }
  }, [t("img", {
      attrs: {
          src: e.captchaSrc,
          alt: ""
      }
  })])]), t("p", {
      staticClass: "errorMsg"
  }, [e._v(e._s(e.errors.first("captcha")))])]) : e._e(), t("div", {
      staticClass: "form_item terms"
  }, [t("div", {
      staticClass: "terms_box",
      class: {
          checked: e.termsUserPass
      }
  }, [t("input", {
      directives: [{
          name: "model",
          rawName: "v-model",
          value: e.termsUserPass,
          expression: "termsUserPass"
      }],
      staticClass: "terms_checkbox",
      attrs: {
          type: "checkbox"
      },
      domProps: {
          checked: Array.isArray(e.termsUserPass) ? e._i(e.termsUserPass, null) > -1 : e.termsUserPass
      },
      on: {
          change: function(t) {
              var n = e.termsUserPass
                , a = t.target
                , i = !!a.checked;
              if (Array.isArray(n)) {
                  var o = null
                    , s = e._i(n, o);
                  a.checked ? s < 0 && (e.termsUserPass = n.concat([o])) : s > -1 && (e.termsUserPass = n.slice(0, s).concat(n.slice(s + 1)))
              } else
                  e.termsUserPass = i
          }
      }
  }), t("span", {
      staticClass: "cheched-bg"
  }), t("span", {
      staticClass: "gougou"
  })]), t("span", [e._v(" " + e._s(e.$t("local_terms_content")) + " "), t("span", {
      staticClass: "link",
      on: {
          click: e.handleTermClick
      }
  }, [e._v(e._s(e.$t("local_terms_link")))])]), e.termsCheck ? t("p", {
      staticClass: "errorMsg"
  }, [e._v("not empty?")]) : e._e()]), t("div", {
      staticClass: "form_item btn-wrap"
  }, [t("button", {
      staticClass: "submit_btn hover",
      attrs: {
          type: "submit"
      }
  }, [e._v(e._s(e.$t("hd_sign_button")))])])], 2), e.firebase ? t("div", {
      staticClass: "firebase-login"
  }, [t("div", {
      staticClass: "tips"
  }, [t("span", {
      staticClass: "or-connect"
  }, [e._v(e._s(e.$t("local_login_way")))])]), t("div", {
      staticClass: "firebase-group"
  }, [e.firebaseFacebook ? t("span", {
      staticClass: "item facebook",
      on: {
          click: function(t) {
              return e.loginByFirebaseDelegate("facebook")
          }
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: "facebook-m"
      }
  })], 1) : e._e(), e.firebaseGoogle ? t("span", {
      staticClass: "item google",
      on: {
          click: function(t) {
              return e.loginByFirebaseDelegate("google")
          }
      }
  }, [t("svg-icon", {
      attrs: {
          iconClass: "google-m"
      }
  })], 1) : e._e()])]) : e._e()])])
}
, te = []
, ne = n(15261)
, ae = [{
  type: "register",
  key: "USERNAMEREG3",
  label: "in_register_user"
}, {
  type: "registerMobile",
  key: "MOBILENUMREG3",
  label: "in_register_mobile"
}]
, registerProp = {
  name: "register",
  components: {
      CountryCode: u.O4
  },
  mixins: [I, u.vE.firebaseMixins, u.vE.geetestMixins],
  data: function() {
      return {
          regType: "register",
          isAgree: !0,
          showAffiliateCode: !1,
          user: {
              username: "",
              password: "",
              confirmPassword: "",
              payeeName: "",
              email: "",
              qqNum: "",
              mobileNum: "",
              recommenderId: "",
              captcha: "",
              verificationCode: "",
              affiliateCode: "",
              paymentPassword: "",
              line: "",
              whatsapp: "",
              facebook: "",
              wechat: "",
              idNumber: "",
              referralCode: null,
              domain: u.h.getCode().domain || ""
          },
          captchaSrc: "",
          time: new Date,
          canSendSms: !0,
          countdown: 60,
          urlInfo: u.h.getCode(),
          countryDialingCode: void 0,
          showPassword: !1,
          showConfirmPassword: !1,
          termsUserPass: !1,
          termsCheck: !1
      }
  },
  computed: {
      whitelabelVal: function() {
          return this.$store.state.Public.whitelabelVal
      },
      registerOption: function() {
          var e = this;
          return ae.filter((function(t) {
              return !!e.whitelabelVal[t.key]
          }
          ))
      },
      hasAffiliate: function() {
          return this.showAffiliateCode && this.affiliateCodeEnabled
      },
      verificationCodeVaild: function() {
          var e = {
              key: "verificationCode"
          };
          return e.acceptedPattern = this.mobileValid.acceptedPattern,
          e.patternId = this.mobileValid.patternId,
          e.maxLength = 255,
          e.minLength = 0,
          e.enabled = this.mobileValid.enabled,
          e.required = this.mobileValid.required,
          e.type = "text",
          e
      },
      hasCountryCode: function() {
          return this.showRegisterCountryCode
      },
      mobileRequired: function() {
          return "registerMobile" === this.regType || !!this.regValid.mobileNum && this.regValid.mobileNum.required
      },
      showMobileRegPass: function() {
          return this.whitelabelVal.MOBILENUMPASSREG3
      },
      smsEnabled: function() {
          return "registerMobile" === this.regType || this.whitelabelVal.REGMOBVERF3
      },
      regValid: function() {
          return this.$store.state.Login.validate
      },
      usernameValid: function() {
          return this.regValid ? this.regValid.username : {}
      },
      passwordValid: function() {
          return this.regValid ? this.regValid.password : {}
      },
      payeeNameValid: function() {
          return this.regValid ? this.regValid.payeeName : {}
      },
      paymentPasswordValid: function() {
          return this.regValid ? this.regValid.paymentPassword : {}
      },
      qqValid: function() {
          return this.regValid ? this.regValid.qqNum : {}
      },
      lineValid: function() {
          return this.regValid ? this.regValid.line : {}
      },
      whatsappValid: function() {
          return this.regValid ? this.regValid.whatsapp : {}
      },
      facebookValid: function() {
          return this.regValid ? this.regValid.facebook : {}
      },
      wechatValid: function() {
          return this.regValid ? this.regValid.wechat : {}
      },
      idNumberValid: function() {
          return this.regValid ? this.regValid.idNumber : {}
      },
      emailValid: function() {
          return this.regValid ? this.regValid.email : {}
      },
      mobileValid: function() {
          return this.regValid ? this.regValid.mobileNum : {}
      },
      affiliateCodeValid: function() {
          return this.regValid ? this.regValid.affiliateCode : {}
      },
      captchaValid: function() {
          return this.regValid ? this.regValid.captcha : {}
      },
      showPayeeName: function() {
          return !!this.regValid.payeeName && this.regValid.payeeName.enabled
      },
      showQQ: function() {
          return !!this.regValid.qqNum && this.regValid.qqNum.enabled
      },
      showEmail: function() {
          return !!this.regValid.email && this.regValid.email.enabled
      },
      showMobile: function() {
          return "registerMobile" === this.regType || !!this.regValid.mobileNum && this.regValid.mobileNum.enabled
      },
      showRecommenderId: function() {
          return !!this.regValid.recommenderId && this.regValid.recommenderId.enabled
      },
      showCaptcha: function() {
          return this.$store.state.Public.showCaptcha
      },
      showpaymentPassword: function() {
          return !!this.regValid.paymentPassword && this.regValid.paymentPassword.enabled
      },
      showline: function() {
          return !!this.regValid.line && this.regValid.line.enabled
      },
      showwhatsapp: function() {
          return !!this.regValid.whatsapp && this.regValid.whatsapp.enabled
      },
      showfacebook: function() {
          return !!this.regValid.facebook && this.regValid.facebook.enabled
      },
      showwechat: function() {
          return !!this.regValid.wechat && this.regValid.wechat.enabled
      },
      showidNumber: function() {
          return !!this.regValid.idNumber && this.regValid.idNumber.enabled
      },
      affiliateCodeEnabled: function() {
          return !!this.regValid.affiliateCode && this.regValid.affiliateCode.enabled
      }
  },
  methods: {
      getConfig: function() {
          var e = this.whitelabelVal.MOBILENUMREG3;
          this.regType = e ? "registerMobile" : "register"
      },
      setCountryCode: function(e) {
          this.countryDialingCode = e
      },
      hideModal: function() {
          this.$modal.hide("registerModal")
      },
      goToPage: function(e) {
          this.$router.push(e)
      },
      getPlaceHolder: function(e, t) {
          return t
      },
      reset: function() {
          for (var e in this.user)
              "countryDialingCode" !== e && (this.user[e] = null)
      },
      getErrorMsg: function(e) {
          return e.minLength === e.maxLength ? this.$t("reg_pattern_".concat(e.patternId)).replace("(min) - (max)", e.minLength) : this.$t("reg_pattern_".concat(e.patternId)).replace("(min)", e.minLength).replace("(max)", e.maxLength)
      },
      getRequired: function(e) {
          return !(!this.regValid[e] || !this.regValid[e].required)
      },
      submitRegister: function() {
          var e = this;
          if (!this.termsUserPass)
              return this.termsCheck = !0;
          this.termsCheck = !1,
          this.$validator.validateAll().then((function(t) {
              t && (e.showAffiliateCode || (e.user.affiliateCode = e.urlInfo.code),
              e.doAffiliate())
          }
          ))
      },
      doAffiliate: function() {
          var e = this;
          this.hasAffiliate && this.user.affiliateCode ? (this.cover.loader(!0),
          this.$store.dispatch("affiliate", {
              data: {
                  code: this.user.affiliateCode,
                  domain: this.urlInfo.domain
              }
          }).then((function(t) {
              t.success ? e.registerMethod() : e.cover.init({
                  html: e.$i18n.t("invitation_code_error"),
                  icon: "warning",
                  btn: {
                      confirm: e.$i18n.t("in_increase_submit")
                  }
              })
          }
          )).finally((function() {
              return e.cover.loader(!1)
          }
          ))) : this.registerMethod()
      },
      registerMethod: function() {
          var e = this;
          return (0,
          i.A)((0,
          a.A)().mark((function t() {
              var n, i, o;
              return (0,
              a.A)().wrap((function(t) {
                  while (1)
                      switch (t.prev = t.next) {
                      case 0:
                          return "registerMobile" === e.regType && (e.user.username = e.user.mobileNum),
                          e.user.confirmPassword = e.user.password,
                          e.cover.loader(!0),
                          t.next = 5,
                          e.geetestVerify("register");
                      case 5:
                          if (n = t.sent,
                          i = (0,
                          p.A)((0,
                          p.A)((0,
                          p.A)({}, e.user), n), {}, {
                              login: !0
                          }),
                          i.countryDialingCode = e.countryDialingCode,
                          !e.smsEnabled || !e.firebaseSms) {
                              t.next = 16;
                              break
                          }
                          return t.next = 11,
                          e.verifyCodeByFirebase(e.user.verificationCode);
                      case 11:
                          if (o = t.sent,
                          o) {
                              t.next = 14;
                              break
                          }
                          return t.abrupt("return", !1);
                      case 14:
                          i.firebaseChannel = "sms",
                          i.firebaseIdToken = o;
                      case 16:
                          e.$store.dispatch(e.regType, {
                              data: i
                          }).then((function(t) {
                              e.$store.dispatch("loginInfo", t.value).then((function(t) {
                                  e.cover.loader(!1),
                                  e.$modal.hide("registerModal"),
                                  e.$router.push("/")
                              }
                              ))
                          }
                          ));
                      case 17:
                      case "end":
                          return t.stop()
                      }
              }
              ), t)
          }
          )))()
      },
      loginByFirebaseDelegate: function(e) {
          var t = this;
          this.loginOrRegister({
              channel: e,
              showLoginModal: function() {
                  t.$modal.show("loginPopupModal")
              },
              afterLogin: this.handleAfterLogin,
              showLoading: function(e) {
                  return t.cover.loader(e)
              }
          })
      },
      handleAfterLogin: function(e) {
          var t = this
            , n = e.formData
            , a = e.res;
          if (n && a) {
              var i = a.value
                , o = i.firstTimeLogin
                , s = i.token;
              sessionStorage.setItem("token", s),
              o && this.$store.dispatch("firstLogin"),
              this.$modal.hide("registerModal"),
              this.$store.dispatch("loginInfo", a.value).then((function(e) {
                  t.cover.loader(!1)
              }
              ))
          }
      },
      getSms: function() {
          var e = this
            , t = {
              countryDialingCode: this.countryDialingCode,
              mobileNo: this.user.mobileNum
          };
          this.$validator.validate("mobileNum").then(function() {
              var n = (0,
              i.A)((0,
              a.A)().mark((function n(i) {
                  var o, s, r;
                  return (0,
                  a.A)().wrap((function(n) {
                      while (1)
                          switch (n.prev = n.next) {
                          case 0:
                              if (!i) {
                                  n.next = 14;
                                  break
                              }
                              if (e.cover.loader(!0),
                              !e.firebaseSms) {
                                  n.next = 10;
                                  break
                              }
                              return o = "+".concat(e.countryDialingCode),
                              n.next = 6,
                              e.sendCodeByFirebase(o, e.user.mobileNum);
                          case 6:
                              return s = n.sent,
                              s && e.startCountDown(1),
                              e.cover.loader(!1),
                              n.abrupt("return");
                          case 10:
                              return n.next = 12,
                              e.geetestVerify("sms");
                          case 12:
                              r = n.sent,
                              e.$store.dispatch("sendRegPhoneCode", {
                                  data: (0,
                                  p.A)((0,
                                  p.A)({}, t), r),
                                  regType: e.regType
                              }).then((function(t) {
                                  t.success ? e.startCountDown(t.value.expiredMinutes) : e.cover.init({
                                      html: t.message,
                                      icon: "warning",
                                      btn: {
                                          confirm: e.$i18n.t("in_increase_submit")
                                      }
                                  })
                              }
                              )).finally((function() {
                                  e.cover.loader(!1)
                              }
                              ));
                          case 14:
                          case "end":
                              return n.stop()
                          }
                  }
                  ), n)
              }
              )));
              return function(e) {
                  return n.apply(this, arguments)
              }
          }())
      },
      startCountDown: function(e) {
          var t = this;
          this.canSendSms = !1,
          this.countdown = 60 * e,
          this.timer = setInterval((function() {
              t.countdown--,
              t.countdown <= 0 && (t.canSendSms = !0,
              clearInterval(t.timer))
          }
          ), 1e3)
      },
      getCaptcha: function() {
          var e = this;
          this.$store.dispatch("captcha").then((function(t) {
              t.success && (e.captchaSrc = "data:image/png;base64," + t.value)
          }
          ))
      },
      changeCaptcha: function() {
          var e = new Date;
          e - this.time > 1e3 && (this.getCaptcha(),
          this.time = e)
      },
      loginTabChange: function(e) {
          this.regType = e,
          this.getCaptcha()
      },
      userProtocol: function() {
          this.$modal.hide("registerModal"),
          this.$router.push("/help")
      },
      checkAffiliate: function() {
          var e = this;
          this.$store.dispatch("affiliate", {
              data: this.urlInfo
          }).then((function(t) {
              t.success ? e.showAffiliateCode = !1 : e.showAffiliateCode = !0
          }
          ))
      },
      forgetPassword: function() {
          this.$modal.hide("registerModal"),
          this.$modal.show("forgetPassModal")
      },
      handleTermClick: function() {
          this.$modal.hide("registerModal"),
          this.$router.push("/help#term"),
          this.$modal.show("helpModal")
      }
  },
  beforeMount: function() {
      var e = this.$route.query.referralCode;
      e && (this.user.referralCode = e)
  },
  created: function() {},
  mounted: function() {
      this.showCaptcha && this.getCaptcha(),
      this.urlInfo.code ? this.checkAffiliate() : this.showAffiliateCode = !0,
      this.getConfig()
  }
}
, RegisterForm = _.A(registerProp, render, [], !1, null, null, null)
</form>
</div>
</div>
</template>
