<script setup>
import EditAvatar from '@entrance/ncz-web-pgpc/components/MemberCenter/components/SettingModal/components/EditAvatar.vue'
import FormGroup from '@entrance/ncz-web-pgpc/components/MemberCenter/components/SettingModal/components/FormGroup.vue'

import { $t } from '@/languages'

import { useForm } from 'vee-validate'
import * as yup from 'yup'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const currentAvator = ref(userStore.userInfo.imgName)
const isShowEditAvator = ref(false)
const onOpenEditAvator = () => {
  isShowEditAvator.value = !isShowEditAvator.value
}

// 定義表單
const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    userNickName: yup
      .string()
      .required($t('YJ.tipDoNotEnterUnvalideNickname'))
      .min(3, $t('YJ.tipDoNotEnterUnvalideNickname'))
      .max(12, $t('YJ.tipDoNotEnterUnvalideNickname'))
      .label($t('nickName')),
  }),
})
// 定義欄位
// const [userNickName, userNickNameAttrs] = defineField('userNickName')
// https://vee-validate.logaretm.com/v4/guide/composition-api/custom-inputs#v-model-support
const userNickName = ref('')
// 提交處理
const onSubmit = handleSubmit((values, actions) => {
  userStore.SaveNickName(values.userNickName).then(() => {
    // 清空輸入框、重置表單
    userNickName.value = ''
    actions.resetForm()
  })
})

</script>

<template>
  <div id="js_profile_from" class="ProfileFrom info-model setting-item ">
    <div class="info-model-left">
      <div class="caption-text border-blue">{{ $t('label_setting_data') }}</div>

      <div class="wrap">
        <div class="username">
          <div :class="['my-icon hasClick', { 'active': isShowEditAvator }]" @click="onOpenEditAvator">
            <img class="w-full" :src="userStore.userImgs[currentAvator]">
            <div class="mask">
              <div class="edit-icon" />
            </div>
          </div>
          <div class="fr account">{{ userInfo.nickName }}</div>
        </div>
        <FormGroup
          v-model="userNickName"
          name="userNickName"
          :label="$t('label_nickname')"
          :placeholder="$t('enter_nickname')"
        />
      </div>
      <div class="setting-item-footer">
        <div class="button btn-submit" @click="onSubmit">{{ $t('button_submit') }}</div>
      </div>
    </div>

    <EditAvatar v-model="isShowEditAvator" @update="currentAvator = $event" />
  </div>
</template>
<style lang="scss" scoped>
.error-message {
  position: absolute;
  margin-bottom: 7px;
  white-space: normal;
  padding: 5px;
  border-radius: 8px;
  font-size: 12px;
  color: #ed5650;
}
</style>
