import { computed, ref } from 'vue'
import { showFailToast } from 'vant'
import { SettingStore } from '@/stores'
import unorm from 'unorm'
import { removeVietnameseDiacritics } from '@/utils'
import type { ReqNewSetWithdrawal, ResWithdrawlist } from '@/types/api'

// 提现接口参数
const data_NewSetWithdrawalH = ref<ReqNewSetWithdrawal>({
  amount: 0,
  pwd: '',
  type: 0,
  bid: 0,
  name: '',
})

const withdrawalsrule = ref<any>({})
const withdrawalTypeslist = ref<ResWithdrawlist[]>([])

export function useWithdraw () {
  const getupperOrLower = computed(() => SettingStore().getUpperOrLower)
  const iseditor = ref(false)
  const lastBandCarkName = localStorage.getItem('lastBandCarkName') || ''

  // 限制只能输入数字
  const onInput = (obj: any, target: string) => {
    obj[target] = obj[target].replace(/[^\d]+/g, '')
  }
  // 校验账号8-12位数字
  function checkAccoutNo (obj: any, hint: string) {
    const regex = /^[0-9]{8,12}$/
    if (!regex.test(obj)) {
      showFailToast({
        message: hint,
        wordBreak: 'break-word',
      })
      return false
    }
    return true
  }
  const projectName = import.meta.env.VITE_BASE_PROJECTNAME
  const makeTxt = (obj: any, target: string) => {
    const regex = /[0-9`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\f\n\r\t\v\d]/g
    let str = obj[target].replace(regex, '').replace(/ {2,}/g, ' ')
    if (['ar020'].includes(projectName)) {
      str = str.replace(/[^a-zA-Z\s]/g, '')
    }
    // 去除越南语中大写字母的重音
    obj[target] = unorm.nfd(removeVietnameseDiacritics(str.replace(/[\u0300-\u036f]/g, '')))
    setUL(obj, target)
  }

  // 设置大小写
  function setUL (obj: any, target: string) {
    // 0大写 1小写
    const isUpper = getupperOrLower.value || ''
    if (isUpper === '1') {
      obj[target] = obj[target].toLowerCase()
    } else if (isUpper === '0') {
      obj[target] = obj[target].toUpperCase()
    }
  }

  // 获取已有的用户名，转换大小写
  function onLoad (obj: any, target: string) {
    if (lastBandCarkName.length > 0) {
      obj[target] = lastBandCarkName
      setUL(obj, target)
      iseditor.value = true
    } else {
      iseditor.value = false
    }
  }

  function setWithdrawal (obj: any) {
    data_NewSetWithdrawalH.value = obj
  }
  function setWithdrawalsrule (obj: any) {
    withdrawalsrule.value = obj
  }
  function setWithdrawalTypeslist (obj: any) {
    withdrawalTypeslist.value = obj
  }

  const setc2cAmount = (amount: number) => {
    data_NewSetWithdrawalH.value.amount = amount
  }

  return {
    iseditor,
    lastBandCarkName,
    onInput,
    checkAccoutNo,
    setUL,
    onLoad,
    makeTxt,
    data_NewSetWithdrawalH,
    setWithdrawal,
    setWithdrawalsrule,
    withdrawalsrule,
    setWithdrawalTypeslist,
    withdrawalTypeslist,
    setc2cAmount,
  }
}
