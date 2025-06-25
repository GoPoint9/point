<script setup lang="ts">
import * as yup from 'yup'
import FormItem, { ACTION_TYPES, FORM_TYPES } from '@entrance/ncz-web-pgpc/components/CommonLogic/components/FormItem.vue'

import { useUserStore, useCommonStore } from '@/stores'

interface Props {
  loginType?: string
}
const { loginType = 'username' } = defineProps<Props>()

// const validationSchema = yup.object({
//   [FORM_TYPES.USERNAME]: yup.string().min(6).max(13).required(),
//   [FORM_TYPES.PASSWORD]: yup.string().min(6).max(12).required(),
//   [FORM_TYPES.EMAIL]: yup.string().required(),
//   [FORM_TYPES.MOBILE]: yup.string().required(),
//   [FORM_TYPES.CAPTCHA]: yup.string().required(),
// })

const validationSchema = computed(() => {
  const schemaMap = new Map([
    [FORM_TYPES.USERNAME, yup.string().min(6).max(13).required()],
    [FORM_TYPES.EMAIL, yup.string().required()],
    [FORM_TYPES.MOBILE, yup.string().required()],
  ])

  const currentValidType = schemaMap.get(loginType)
  if (!currentValidType) console.error(' [validationSchema] currentValidType is ', currentValidType, ', Check it!')

  return {
    [loginType]: currentValidType,
    [FORM_TYPES.PASSWORD]: yup.string().min(6).max(12).required(),
  }
})

// NOTE: 競品有但未完成。
const isHeaderLogin = false

const canSendSms = ref(true)
const countdown = ref(60)

// computed: {
//   showLoginCountryCode () {
//     return !!this.$store.state.Public.whitelabelVal.UPDATEMOBILEICC3 || this.firebaseSms
//   },
//   showRegisterCountryCode () {
//     return !!this.$store.state.Public.whitelabelVal.UPDATEMOBILEICC3 || this.firebaseSms
//   }
// }
const showLoginCountryCode = ref(true)

const registerType = computed(() => {
  const registerTypeMap = new Map([
    [FORM_TYPES.EMAIL, 1],
    [FORM_TYPES.MOBILE, 0],
  ])
  const result = registerTypeMap.get(loginType)
  if (result === undefined) console.error(' [registerType] registerType is ', registerType, loginType, ', Check it!')
  return result
})
const vForm = ref(null)
onMounted(() => {
  // NOTE: 先寫死，記得移除。
  vForm.value.setValues({
    mobile: '2024020101',
    password: 'qwe12345',
  })
  // NOTE: 先寫死，記得移除。
})
const userStore = useUserStore()

async function onSubmit (values) {
  console.log('Form submitted', values)
  // window.cover.loader(true)
  const commonStore = useCommonStore()
  commonStore.setLoading(true)

  const payload = {
    username: values[loginType],
    countryCode: 91,
    password: values.password,
    // token: this.password,
    registerType: unref(registerType),
  }
  // console.warn('payload ', payload)
  const res = await userStore.loginNCZ(payload)

  if (!res) {
    console.warn('res ', res)
    return
  }

  // 登入成功
  userStore.setUserInfo(res)
  $modal.hide('loginPopupModal')
  commonStore.setLoading(false)

  // this.$store.commit("setUserInfo", a);
  // var o = i.value
  //   , s = o.firstTimeLogin
  //   , r = o.passwordExpired
  //   , c = o.token;
  // sessionStorage.setItem("token", c),
  // s && this.$store.dispatch("firstLogin"),
  // this.$modal.hide("loginPopupModal"),
  // ("123456" === this.password || r && this.pwdEnabled) && !["sms", "firebase"].includes(n.type) ? (this.cover.loader(!1),
  // this.$modal.show("changePassModal")) : this.$store.dispatch("loginInfo", i.value).then((function(e) {
  //     t.cover.loader(!1),
  //     t.$store.commit("setAfterLoginModal", !0),
  //     t.agentPage && t.$router.push("/agentHome")
  // }

  // window.store.state.user.siteId = window.store.state.site.config.siteId
  // window.store.state.common.turning = true

  // console.log({
  //   username: this.isMobile ? this.phoneStr : this.emailStr,
  //   countryCode: this.countryCode,
  //   password: md5(this.password),
  //   token: this.password,
  //   registerType: this.isMobile ? 0 : 1,

  //   scope: -1,
  // })

  // {
  //   "username": "2024020101",
  //   "countryCode": 91,
  //   "password": "bd4f881f9422e07ed3ee9da1284e4ef3",
  //   "token": "qwe12345",
  //   "registerType": 0,
  //   "scope": -1
  // }
  // this.$store
  //   .dispatch(type.LOGIN_ACTION, {
  //     username: this.isMobile ? this.phoneStr : this.emailStr,
  //     countryCode: this.countryCode,
  //     password: md5(this.password),
  //     token: this.password,
  //     registerType: this.isMobile ? 0 : 1,
  //   })
  //   .then((res) => {
  //     sessionStorage.setItem('openFull', true) // 登入後再彈一次公告
  //     this.$store.dispatch('GetNotReadMsgNumH5')
  //     // 刪除對戰iframe
  //     window.store.state.site.QZgameIframeUrl = ''
  //     window.store.state.site.QZGameIsOpened = false
  //     // PWD分數
  //     window.store.state.user.score = this.score
  //     localStorage.setItem('score', this.score)

  //     const openMeeLine = () => {
  //       if (
  //         this.isLogin &&
  //             !this.isMeeLine &&
  //             !this.$store.state.meelineState.meeline &&
  //             this.hasVapImStatus &&
  //             !this.isSiteFK
  //       ) {
  //         // 打開微聊
  //         this.$store.state.meelineState.serviceNum = null
  //         this.$store.state.meelineState.accToken = ''
  //         this.$store.state.meelineState.minimodel = 1
  //         this.$store.state.meelineState.meeline = 1
  //         this.$store.state.meelineState.chatId = null
  //       }
  //     }
  //     // 導入會員方式的會員，登入時，需要先修改密碼即可，作操作
  //     if (this.$store.state.user.pwdEncodeType === 1) {
  //       window.router.push({ name: 'LoginPassword' })
  //     } else {
  //       // 需登入的頁面轉導
  //       // const loginToPath = this.$store.state.user.loginToPath
  //       this.$store.dispatch(type.PRE_SET_LOGIN_NAME_ACTION, res.data.user.loginName)
  //       // if (this.score <= 3) {
  //       //   if (!this.changePasswordSetting && !this.isMeeLine) {
  //       //     window.layer.strength(loginToPath, this.sitePwdSetting, openMeeLine)
  //       //   }
  //       // } else {
  //       openMeeLine()
  //       if (!this.isAloneWeichatAppPath) window.router.push('/home')
  //       // window.router.push('/home')
  //       // if (loginToPath) {
  //       //   window.router.push(loginToPath)
  //       // } else {
  //       //   if (!this.isMeeLine) {
  //       //     window.router.push('/')
  //       //   }
  //       // }
  //     }
  //     const ar_account = {
  //       email: this.isMobile ? '' : this.emailStr,
  //       logintype: this.isMobile ? 'mobile' : 'email',
  //       number: this.isMobile ? this.phoneStr : '',
  //       numberType: this.countryCode,
  //       password: this.pwdRemember ? this.password : '',
  //     }
  //     const itemString = this.isMobile ? 'ar_account_mobile' : 'ar_account_email'
  //     localStorage.setItem(itemString, JSON.stringify(ar_account))
  //     localStorage.setItem('curLoginType', this.isMobile ? 'mobile' : 'email')
  //     localStorage.setItem('cashUserOpen', res.data.user.cashUserOpen)
  //     localStorage.setItem('userLevelOpen', res.data.user.userLevelOpen)
  //     localStorage.setItem('userTags', JSON.stringify(res.data.user.userTags))
  //     // localStorage account & password
  //     localStorage.setItem('user.info', JSON.stringify(res.data.user.userDetail))
  //     window.store.state.user.isOverFiveTimes = false
  //   })
  //   .catch((res) => {
  //     Toast.fail(res.msg)
  //   })
  // if (this.capchaType === 1) common.resetCutom()
  // this.$store.commit('MOBILE_OPEN_CHATROOM', false) // 點擊返回後，清除返回聊天室store，以免影響正常login返回功能
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

const countryDialingCode = ref('')
const setCountryCode = code => {
  countryDialingCode.value = code
}

const onAction = ({ type, value }) => {
  console.warn(' [onAction] { type, value } ', { type, value })
  switch (type) {
    case ACTION_TYPES.FORGET_PASSWORD:
      handleForgetPassword()
      break
    case ACTION_TYPES.SET_COUNTRY_CODE:
      setCountryCode(value)
      break
    // ... 其他處理
  }
}

const router = useRouter()
const $modal = inject('$modal')
const onTermClick = () => {
  $modal.hide('loginPopupModal')
  router.push('/help#term')
  $modal.show('helpModal')
}
const onForgetPassword = () => {
  console.log('Forgot password clicked')
  $modal.hide('loginPopupModal')
  $modal.show('forgetPassModal')
}

// 記住我
// handleAfterLogin setPwdAndChk
</script>

<template>
  <div class="form_container">
    <VForm
      ref="vForm"
      :key="loginType"
      v-slot="{ errors, meta }"
      :validation-schema="validationSchema"
      @submit="onSubmit"
    >
      <FormItem
        v-if="loginType === 'mobile'"
        :form-type="FORM_TYPES.MOBILE"
        :errors="errors"
        :show-country-code="showLoginCountryCode"
        @action="onAction"
      />
      <!-- <FormItem
          :form-type="FORM_TYPES.CAPTCHA"
          :errors="errors"
          @action="onAction"
        /> -->

      <!-- 郵箱登入 / 帳號登入 -->
      <FormItem
        v-if="['email', 'username'].includes(loginType)"
        :form-type="loginType === 'email' ? FORM_TYPES.EMAIL : FORM_TYPES.USERNAME"
        :errors="errors"
        @action="onAction"
      />
      <FormItem
        :form-type="FORM_TYPES.PASSWORD"
        :errors="errors"
        @action="onAction"
      />

      <!-- 記住我 / 忘記密碼 -->
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
        <span class="forget" @click="onForgetPassword">
          {{ $t('in_forget_password') }}
        </span>
      </div>

      <div v-if="!isHeaderLogin" class="form_item btn-wrap">
        <button type="submit" class="submit_btn hover">{{ $t('hd_login_button') }}</button>
      </div>

      <div class="form_item terms">
        <div class="terms_box login">
          <input v-model="rememberUserPass" type="checkbox" class="terms_checkbox">
          <span class="cheched-bg" />
          <span class="gougou" />
        </div>
        <span>
          {{ $t('local_terms_content') }}
          <span class="link" @click="onTermClick">{{ $t('local_terms_link') }}</span>
        </span>
      </div>
    </VForm>
  </div>
</template>

<style lang="scss" scoped>
/* Add your styles here */
@use '@entrance/ncz-web-pgpc/form_container.scss' as *;
</style>

    <!--
/**
var y, C = ["matchList"], k = {
sms: {
  acceptedPattern: ".*",
  message: "enter_verification_code",
  maxLength: 10,
  minLength: 1,
  required: !0,
  updateRequired: !0
},
verificationCode: {
  acceptedPattern: ".*",
  message: "enter_verification_code",
  maxLength: 10,
  minLength: 1,
  required: !0,
  updateRequired: !0
},
loginUsername: {
  acceptedPattern: "^[a-zA-Z0-9]+$",
  message: "reg_pattern_4",
  maxLength: 13,
  minLength: 6,
  required: !0,
  updateRequired: !0
},
loginPassword: {
  acceptedPattern: ".+",
  message: "error_password",
  maxLength: 16,
  minLength: 6,
  required: !0,
  updateRequired: !0
},
loginMobileNum: {
  acceptedPattern: "^[0-9]+$",
  message: "error_phone_number_limit",
  maxLength: 16,
  minLength: 10,
  required: !0,
  updateRequired: !0
},
countryDialingCode: {
  acceptedPattern: "^[0-9]+$",
  message: "error_country_code_limit",
  maxLength: 3,
  minLength: 1,
  required: !1,
  updateRequired: !1
}
 */ -->
