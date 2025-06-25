<template>
  <div class="addupi_C">
    <NavBar :title="$t('paymentMethod')" left-arrow @click-left="onBack" />
    <div class="addupi_C-header wallet_18"><svg-icon name="upi" />{{ $t('UPIInformation') }}</div>
    <div class="addupi_C-title">UPI Name</div>
    <van-field
      v-model.trim="UPIForm.beneficiaryName"
      class="upi-input"
      :maxlength="30"
      :placeholder="$t('phEnterUPIName')"
      :readonly="iseditor"
      :rules="[{ required: true, message: $t('phEnterUPIName') }]"
      @input="makeTxt(UPIForm, 'beneficiaryName')"
    />

    <div class="addupi_C-title">UPI ID</div>
    <van-field
      v-model.trim="UPIForm.accountNo"
      class="upi-input"
      :maxlength="30"
      type="text"
      :placeholder="$t('phEnterUPIID')"
    />

    <!-- <div class="addupi_C-title">{{$t('phoneN') }}</div>
        <div class="addupi_C_number">
            <DropDown v-model:typeValue="numberType" ref="dropDown" @changeT="changeT"/>
            <van-field class="upi-input number" v-model.number.trim="number"  type="digit" :placeholder="$t('plsEnterTel')"/>
        </div>
        <div class="tip"><van-icon name="warning-o" size="14" />{{ $t('upiTip1') }}</div> -->
    <div class="bind-bank-sumbit" :class="{ disable: !canSumbit }" @click="bindSumbit">{{ $t('save') }}</div>
  </div>
</template>
<script setup lang="tsx">
import { computed, onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
// import DropDown from '@/components/Login/DropDown.vue'
import { AwaitApiResult, copy, maxlength } from '@/utils'
import { GetNewUPIBindMobileNo, SetWithdrawalNewUPI } from '@/api'
import { useI18n } from 'vue-i18n'
import { showSuccessToast, showFailToast } from 'vant'
import { useModal } from '@/components/Modal'
// import SecurityDialog from '@/components/SecurityDialog/index.vue'
import { CodeType, useWithdraw } from '@/hooks'

const router = useRouter()
const userStore = useUserStore()
const numberType = ref(userStore.getUserForm.numberType)
const number = ref('')
const { t } = useI18n()
const issmssend = ref('')
const allNumber = computed(() => numberType.value + '' + number.value)
const { iseditor, onLoad, makeTxt } = useWithdraw()
const onBack = () => {
  router.replace({
    name: 'Withdraw-Upi',
    query: { type: 'Add' },
  })
}

const UPIForm = reactive<any>({
  beneficiaryName: '',
  accountNo: '',
  // smsCode: '',
  // type:'c2c',
  // codeType:CodeType.addNewUPI_N
})

const changeT = (value: string) => {
  numberType.value = value
}

// 填充已经绑定的手机号码
function getCurrentNumberType (numNo: string) {
  const disctionlist = sessionStorage.getItem('areaPhoneLenList')
  const dictionary: any = JSON.parse(disctionlist as string)
  const area = dictionary.find((item: any) => numNo.indexOf(item.area.replace('+', '')) == 0)?.area.replace('+', '')
  if (area) {
    numberType.value = area
    number.value = numNo.substring(area.length)
  }
}

const canSumbit = computed(() => {
  return UPIForm.beneficiaryName && UPIForm.accountNo && number && numberType
})
/**
 * @description: 获取用户绑定手机号
 * @return {*}
 */
const getCardList = async () => {
  const res = await AwaitApiResult(GetNewUPIBindMobileNo())
  issmssend.value = res?.data || ''
  if (issmssend.value != '') {
    getCurrentNumberType(issmssend.value)
  }
}
onMounted(() => {
  getCardList()
})
onLoad(UPIForm, 'beneficiaryName')
console.log('UPIForm', UPIForm)
const bindSumbit = async () => {
  if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+$/.test(UPIForm.accountNo)) {
    return showFailToast(t('UPIID'))
  }
  const res = await AwaitApiResult(SetWithdrawalNewUPI(UPIForm))
  if (res) {
    showSuccessToast(t('addedSuccessfully'))
    // security.close();
    await router.replace({ name: 'Withdraw-Upi' })
  }
}
</script>
<style lang="scss" scoped>
.addupi_C {
  padding: 20px 20px 130px;
  height: 100vh;
  overflow: auto;

  &-header {
    height: 42px;
    line-height: 42px;
    font-weight: 700;
    font-size: 36px;
    color: var(--text_color_L1);
    padding-left: 0;
    background-size: 100px 42px;
    background-repeat: no-repeat;
    background-position: left center;
    svg {
      width: 102px;
      height: 42px;
    }
  }
  &-title {
    height: 40px;
    line-height: 40px;
    margin: 50px 0 24px 0;
    font-weight: 500;
    font-size: 32px;
    color: var(--text_color_L1);
  }
  .upi-input {
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
          color: var(--text_color_L2);
        }
      }
    }
  }
  &_number {
    display: flex;
    justify-content: space-between;
    > span {
      border-radius: 10px;
      height: 70px;
      line-height: 70px;
      font-size: 28px;
      padding-left: 20px;
      width: 100%;
      background: var(--button_dis_color);
    }
    .dropdown {
      position: relative;
      height: 70px;
      line-height: 70px;
      border-radius: 5px;
      :deep(.dropdown__value) {
        span {
          height: 70px;
        }
      }
    }
    .number {
      width: calc(100% - 200px);
    }
  }
  .tip {
    color: var(--main-color);
    font-size: 22px;
    margin: 20px 10px 40px;
  }
}

.bind-bank-sumbit {
  height: 120px;
  line-height: 120px;
  width: 100%;
  max-width: 750px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--main-color);
  color: var(--text_color_L4);
  font-size: 30px;
  text-align: center;
  letter-spacing: 1.2px;

  &.disable {
    background: var(--button_dis_color);
    pointer-events: none;
  }
}

@media screen and (max-width: 500px) {
  .bind-bank-sumbit {
    max-width: none;
  }
}
</style>
