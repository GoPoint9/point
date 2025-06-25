<template>
  <div class="changlongEnter changlong" @click="changlongEnter" />
</template>

<script setup lang="ts">
import { useHome } from '@/hooks/useHome.hook'
import { useRouter } from 'vue-router'

const router = useRouter()
// 跳转入口页面
const { isAlowGame } = useHome()
const changlongEnter = async () => {
  isAlowGame('', () => {
    router.push({ name: 'AllLotteryGames-ChangLong' })
  })
}
</script>

<style lang="scss" scoped>
.changlongEnter {
  position: fixed;
  z-index: 99;
  width: 112px;
  height: 112px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 112px;
  background-image: url('@icon/blueHome/changlong.svg');
  bottom: 320px;
  right: 30px;
  box-shadow: 0 0.02667rem 0.48rem 0 rgba(203, 202, 220, 0.56);
  border-radius: 50%;
}
</style>
