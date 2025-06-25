<template>
  <div class="addtype4_C">
    <NavBar :title="Type4name + t('paymentMethod')" left-arrow @click-left="onBack" />
    <div class="addtype4_C-header">{{ Type4name }}</div>
    <div class="addtype4_C-title">{{ $t('selectType') }}</div>
    <van-field
      v-model="activeBink.bankName"
      class="addtype4-input"
      :readonly="true"
      right-icon="arrow-down"
      :placeholder="$t('tipSelectPls')"
      @click="showPicker = true"
    />
    <div class="addtype4_C-title">{{ $t('name') }}</div>
    <van-field
      v-model="type4Form.beneficiaryName"
      class="addtype4-input"
      :maxlength="50"
      :placeholder="$t('phEnter') + $t('name')"
      :readonly="iseditor"
      @input="makeTxt(type4Form, 'beneficiaryName')"
    />
    <div class="addtype4_C-title">{{ $t('account') }}</div>
    <van-field
      v-model.trim="type4Form.mobileNo"
      class="addtype4-input"
      :maxlength="12"
      type="digit"
      :placeholder="$t('phEnter') + $t('account')"
      @input="onInput(type4Form, 'mobileNo')"
    />
    <div class="sumbitBtn" :class="{ disable: !canSumbit }" @click="onSubmit">{{ $t('save') }}</div>
    <van-toast v-model:show="successTip">
      <template #message>
        <div class="successTip">
          <div>{{ $t('addedSuccessfully') }}</div>
        </div>
      </template>
    </van-toast>
  </div>
  <van-popup v-model:show="showPicker" round position="bottom">
    <van-picker
      :columns="originalBankList"
      :columns-field-names="customFieldName"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>
<script setup lang="tsx">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { AwaitApiResult } from '@/utils'
import { GetBankList, SetWithdrawalWallet } from '@/api'
import { showSuccessToast } from 'vant'
import type { ResBankList } from '@/types/api'
import { useModal } from '@/components/Modal'
import SecurityDialog from '@/components/SecurityDialog/index.vue'
import { CodeType, useBank, useWithdraw } from '@/hooks'

const { iseditor, onInput, checkAccoutNo, onLoad, makeTxt } = useWithdraw()
const { t } = useI18n()
const router = useRouter()
const { isOpenWithdraw } = useBank()
const Type4name = router.currentRoute.value.query.Type4name as string
const successTip = ref<boolean>(false)
const type4Form = reactive({
  withdrawId: 4,
  mobileNo: '',
  bankId: '',
  smsCode: '',
  beneficiaryName: '',
  type: '',
  codeType: CodeType.addEWallet,
})
const activeBink = ref<any>({
  bankName: '',
  bankID: 0,
  reserved: '',
})
const showPicker = ref(false)
const onBack = () => {
  router.replace({
    name: 'Withdraw-Type4',
    query: { type: 'Add', Type4name },
  })
}
const customFieldName = {
  text: 'bankName',
  value: 'bankID',
}
const canSumbit = computed(() => {
  return type4Form.mobileNo && type4Form.bankId && type4Form.beneficiaryName
})
// 获取银行卡列表
const originalBankList = ref<ResBankList[]>([])
async function getBankList () {
  const res = await AwaitApiResult(
    GetBankList({
      withdrawid: 4,
    })
  )
  if (res) {
    originalBankList.value = res.data.banklist
  }
}
onMounted(async () => {
  await getBankList()
})
const onconfirm = async () => {
  const res = await AwaitApiResult(SetWithdrawalWallet(type4Form))
  if (res) {
    showSuccessToast(t('addedSuccessfully'))
    security.close()
    router.replace({
      name: 'Withdraw-Type4',
      query: { type: 'Add', Type4name },
    })
  }
}
const beforeClose = () => {
  type4Form.smsCode = ''
}
const security = useModal({
  content: () => (
    <SecurityDialog
      v-model:type={type4Form.type}
      v-model:code={type4Form.smsCode}
      onConfirm={onconfirm}
      codeType={CodeType.addEWallet}
    />
  ),
  beforeClose,
})
const onConfirm = (val: any) => {
  const value = { ...val.selectedOptions[0] } as any
  activeBink.value = value
  type4Form.bankId = value.bankID
  showPicker.value = false
}
const cheackValue = () => {
  if (type4Form.mobileNo.toString().trim().length > 0) {
    const isCheck = checkAccoutNo(type4Form.mobileNo, t('account') + t('formatErr'))
    if (!isCheck) return
  }
  return true
}
const onSubmit = async () => {
  if (cheackValue() !== true) return
  if (isOpenWithdraw.value) {
    return security.open()
  }
  await onconfirm()
}

onLoad(type4Form, 'beneficiaryName')
</script>
<style lang="scss" scoped>
.addtype4_C {
  padding: 0 20px;
  height: 100vh;
  overflow: auto;

  &-header {
    height: 42px;
    line-height: 42px;
    font-weight: 700;
    font-size: 36px;
    color: var(--darkTextW, var(--text_color_L1));
    padding-inline-start: 122px;
    background-image: url('@/assets/icons/wallet/withdraw/c2c/upi.png');
    background-size: 100px 42px;
    background-repeat: no-repeat;
    background-position: left center;
  }

  .successTip {
    width: 600px;
    height: 140px;
    font-weight: 700;
    font-size: 30px;
    color: var(--textW);
    background-color: var(--main-color);
    border-radius: 20px;
    padding: 40px 0;

    & > div {
      height: 60px;
      line-height: 60px;
      width: fit-content;
      margin: auto;
      padding-left: 75px;
      background-image: url('@assets/icons/wallet/successicon.png');
      background-size: 60px;
      background-position: left center;
      background-repeat: no-repeat;
    }
  }

  &-header {
    height: 60px;
    line-height: 60px;
    font-weight: 700;
    font-size: 36px;
    color: var(--darkTextW, var(--text_color_L1));
    padding-left: 82px;
    background-image: url('@icon/wallet/withdrawType/4.png');
    background-size: 60px;
    background-repeat: no-repeat;
    background-position: left center;
  }

  &-title {
    height: 40px;
    line-height: 40px;
    margin: 50px 0 24px 0;
    font-weight: 500;
    font-size: 32px;
    color: var(--darkTextW, var(--text_color_L1));
  }

  &-Safety {
    height: 48px;
    line-height: 48px;
    font-weight: 600;
    font-size: 36px;
    color: var(--text_color_L1);
    margin-top: 124px;
    padding-left: 65px;
    background-image: url('@icon/wallet/safety.png');
    background-size: 48px;
    background-repeat: no-repeat;
    background-position: left center;

    &-tip {
      margin-top: 48px;
      font-size: 30px;
      color: var(--text_color_L1);
      margin-bottom: 28px;
    }
  }

  .sumbitBtn {
    height: 70px;
    line-height: 70px;
    width: 100%;
    color: var(--text_color_L4);
    font-weight: 700;
    font-size: 30px;
    text-align: center;
    background: var(--main_gradient-color);
    max-width: 750px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    &.disable {
      background: var(--button_dis_color);
      color: var(--text_color_L1);
      pointer-events: none;
    }
  }

  .addtype4-input {
    height: 70px;
    padding: 0 20px;
    font-size: 28px;
    color: var(--text_color_L2);
    width: 100%;

    :deep(.van-field__value) {
      padding: 14px 0;
      width: 100%;

      input {
        width: 100%;

        &::placeholder {
          color: var(--text_color_L3);
        }
      }
    }
  }
}

:deep(.van-toast) {
  overflow: hidden;
  background-color: transparent;
  padding: 0;
}
</style>
