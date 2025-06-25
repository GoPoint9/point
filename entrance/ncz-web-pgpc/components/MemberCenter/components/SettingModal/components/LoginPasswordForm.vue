<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { $t } from '@/languages'

import FormGroup from '@entrance/ncz-web-pgpc/components/MemberCenter/components/SettingModal/components/FormGroup.vue'

// 自訂密碼格式的正則表達式：必須包含字母和數字
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/

// 定義表單
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    password: yup
      .string()
      .required($t('pswRule'))
      .min(8, $t('pswRule'))
      .max(32, $t('pswRule'))
      .matches(passwordRegex, $t('pswRule')),
    newPassword: yup
      .string()
      .required($t('pswRule'))
      .min(8, $t('pswRule'))
      .max(32, $t('pswRule'))
      .notOneOf([yup.ref('password')], $t('change_password_new_old_same')) // 添加此規則
      .matches(passwordRegex, $t('pswRule')),
    checkPassword: yup
      .string()
      .required($t('pswRule'))
      .min(8, $t('pswRule'))
      .max(32, $t('pswRule'))
      .matches(passwordRegex, $t('pswRule'))
      .oneOf([yup.ref('newPassword')], $t('change_password_confirm_failed')),
  }),
})

// 定義欄位
// const [loginPwd, loginPwdAttrs] = defineField('loginPwd')
// const [newPwd, newPwdAttrs] = defineField('newPwd')
// const [confirmPwd, confirmPwdAttrs] = defineField('confirmPwd')

const userStore = useUserStore()

const onSubmit = handleSubmit(async (values, actions) => {
  console.warn('values, actions ', values, actions)
  const res = await userStore.UpdateLoginMemberPassword(values)
  if (!res || res.code !== 'success') {
    return
  }

  console.warn('res ', res)
})
//  data-error="{required:'error_input_right_value'}"
</script>
<template>
  <div id="js_loginPassword_from" class="LoginPasswordForm pwd-model setting-item">
    <div class="caption-text border-blue">{{ $t("label_pwd_login_title") }}</div>
    <FormGroup
      :label="$t('label_pwd_old')"
      :placeholder="$t('enter_old_pwd')"
      type="password"
      name="password"
      autocomplete="new-password"
    />
    <FormGroup
      :label="$t('label_pwd_new')"
      :placeholder="$t('enter_new_pwd')"
      type="password"
      name="newPassword"
      autocomplete="new-password"
    />
    <FormGroup
      :label="$t('label_pwd_confirm')"
      :placeholder="$t('enter_old_pwd')"
      type="password"
      name="checkPassword"
      autocomplete="new-password"
    />

    <div class="setting-item-footer">
      <div class="button btn-submit" @click="onSubmit">{{ $t("button_submit") }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
