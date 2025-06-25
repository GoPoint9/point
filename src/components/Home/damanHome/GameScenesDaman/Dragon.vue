<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { SettingStore } from '@/stores'
import { computed } from 'vue'
import { useHome } from '@/hooks'
const { t } = useI18n()
const settingS = SettingStore()
const showChanglong = computed(() => settingS.getIsShowLotteryDragon)
const router = useRouter()
// 跳转入口页面
const { isAlowGame } = useHome()
const changlongEnter = () => {
  isAlowGame('', () => {
    router.push({ name: 'AllLotteryGames-ChangLong' })
  })
}
</script>

<template>
  <div v-if="showChanglong" class="daman-dragon" @click="changlongEnter">
    <img class="daman-dragon-image" src="./assets/dragon.png" alt="">
    <div class="daman-dragon-right">
      <h3>Win Go {{ $t('loongAssistant') }}</h3>
      <p>{{ t('dragonTips') }}</p>
      <div class="daman-dragon-btn">{{ t('dragonEntry') }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.daman-dragon {
  display: flex;
  min-height: 200px;
  background: url('@icon/home/bj.png') no-repeat center/100%;
  padding: 16px 0 0 10px;
  margin-bottom: 20px;
  &-image {
    width: 180px;
    height: 148px;
  }
  &-right {
    padding-left: 25px;
    color: #fff;
    padding-bottom: 20px;
    h3 {
      text-shadow: 0px 2px 2px #fd4646;
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 5px;
    }
    p {
      border-radius: 60px;
      background: var(--darkLight, var(--main-color));
      padding: 6px 20px;
      line-height: 25px;
      max-width: 400px;
      text-align: center;
    }
  }
  &-btn {
    margin-top: 30px;
    width: 200px;
    height: 50px;
    border-radius: 100px;
    text-align: center;
    background: linear-gradient(180deg, #ffbd40 0%, #ff7f3d 100%);
    box-shadow: 0px 2px 0px 0px #ffec75 inset;
    filter: drop-shadow(0px 2px 0px #f24b16);
    text-shadow: 0px 2px 2px rgba(253, 70, 70, 0.5);
    font-family: Roboto;
    font-size: 26px;
    font-weight: 700;
    line-height: 50px;
  }
}
</style>
