<script setup lang="ts">
import { useHome } from '@/hooks/useHome.hook'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import axios from 'axios'
import router from '@/router'

const baseURL = window.CONFIG?.VITE_API_URL || (import.meta.env.VITE_API_URL as string)
const extendURL = '/tools/_ajax'
const { projectIcon } = useHome()
const countDownS = ref(0)
const countDown = computed(() => {
  // 计算小时、分钟和秒
  const hours = Math.floor(countDownS.value / 3600)
  const minutes = Math.floor((countDownS.value % 3600) / 60)
  const seconds = Math.floor(countDownS.value % 60)

  // 将小时、分钟和秒补齐为两位数
  const hoursStr = String(hours).padStart(2, '0')
  const minutesStr = String(minutes).padStart(2, '0')
  const secondsStr = String(seconds).padStart(2, '0')
  return {
    h1: parseInt(hoursStr[0], 10),
    h2: parseInt(hoursStr[1], 10),
    m1: parseInt(minutesStr[0], 10),
    m2: parseInt(minutesStr[1], 10),
    s1: parseInt(secondsStr[0], 10),
    s2: parseInt(secondsStr[1], 10),
  }
})
const notesList = ref('')
let timer: any = null
const getData = async () => {
  axios
    .get(baseURL + extendURL + '/GetMaintenanceInfo')
    .then(res => {
      if (res.data.enabled === false) {
        return router.push({
          name: 'login',
        })
      }
      notesList.value = res.data?.notifyTip || ''
      countDownS.value = calculateTimeDifference(res.data?.serverTime, res.data?.endTime)
      if (countDownS.value > 0) {
        countDownF()
      } else {
        router.push({
          name: 'login',
        })
      }
    })
    .catch(err => {
      console.log('err', err)
    })
}
const countDownF = () => {
  clearInterval(timer)
  timer = setTimeout(() => {
    countDownS.value--
    console.log('countDownS.value', countDownS.value)
    if (countDownS.value > 0) countDownF()
  }, 1000)
}
const calculateTimeDifference = (addTime: any, endTime: any) => {
  // 将时间字符串转换为 Date 对象
  const addTimeDate = new Date(addTime.replace(' ', 'T'))
  const endTimeDate = new Date(endTime.replace(' ', 'T'))
  // 计算时间差（毫秒）
  const timeDifferenceMs = endTimeDate - addTimeDate
  // 将毫秒转换为秒
  const timeDifferenceSeconds = timeDifferenceMs / 1000
  return timeDifferenceSeconds
}
onMounted(() => {
  getData()
})

onUnmounted(() => {
  clearInterval(timer)
  console.log('离开页面，清空定时器')
})
</script>
<template>
  <div class="maintain-wrap">
    <div class="content-wrap">
      <div class="right-wrap">
        <div class="logo-wrap">
          <CommonLogo :src="logoSrc" />
        </div>
        <h2>{{ $t('game_maintenance') }}</h2>
        <div class="error-info">
          <p>{{ $t('info_maintenance') }}</p>
        </div>
        <a class="service-btn" href="javascript:void(0)" @click="getService">
          <i />
          <span>{{ $t('in_customer_service') }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add relevant styles here */
</style>
