import { AwaitApiResult } from '@/utils'
import { getPersonalLevel } from '@/NCZ/api'

export function usePersonalLevel () {
  const allGradeList = ref([])
  const userGrade = ref('')
  const userGradeGrow = ref(0) // EXP

  // state.allGradeList = data.allGradeList   allGradeList: [],
  // state.userGrade = data.userGrade userGrade: '',
  // state.userGradeGrow = data.userGradeGrow   userGradeGrow: '0',
  // state.userGrowGradeList = data.userGrowGradeList // userGrowGradeList: null, 看起來沒用
  // state.userTitle = data.userTitle // null , 看起來沒用

  const fetchPersonalLevel = async () => {
    const res = await AwaitApiResult(getPersonalLevel())
    if (!res) return

    allGradeList.value = res.data.allGradeList
    userGrade.value = res.data.userGrade
    userGradeGrow.value = res.data.userGradeGrow
  }

  onMounted(() => {
    fetchPersonalLevel()
  })

  return {
    fetchPersonalLevel,

    allGradeList,
    userGrade,
    userGradeGrow,
  }
}
