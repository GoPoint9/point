import { computed, reactive } from 'vue'
import { getSiteMessageList } from '@/api'
import type { MessageDataList } from '@/types'
import { useRouter } from 'vue-router'

const store = reactive<{ list: MessageDataList[]; timer: NodeJS.Timer | number }>({
  list: [],
  timer: -1,
  noticeIndex: 0,
})

// useTimer => false: 不使用 store.timer 相關機制
export function useNotice (useTimer = true) {
  const router = useRouter()
  const noticeList = computed(() => store.list)
  const noticeIndex = computed(() => store.noticeIndex)
  const goNotice = () => router.push({ name: 'Notification' })
  const clearTimer = () => {
    clearInterval(store.timer)
  }
  const startTimer = () => {
    clearTimer()
    store.timer = setInterval(() => {
      store.list.push(store.list.shift() as MessageDataList)
    }, 7000)
  }
  const getNotice = async () => {
    try {
      const { data } = await getSiteMessageList({ pageNo: 1, pageSize: 5 })
      store.list = data.list || []
      if (useTimer && store.list.length) {
        startTimer()
      }
    } catch (e) {
      console.log(e)
    }
  }

  // web 點擊 notice(跑馬燈) 判斷
  const setNoticeIndex = noticeIndex => {
    store.noticeIndex = noticeIndex || 0
  }

  return {
    noticeList,
    startTimer,
    getNotice,
    clearTimer,
    goNotice,

    noticeIndex,
    setNoticeIndex,
  }
}
