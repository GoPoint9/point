<template>
  <div class="lotteryGamesList__container">
    <div class="lotteryGamesList__container-item" @click="onItemClick">
      <img v-lazy="getIcons('home/AllLotteryGames', 'cover')" alt="">
      <span class="lotteryGamesList__container-item__time">
        {{ gamesList.title }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getIcons } from '@/utils'

const router = useRouter()

const props = defineProps({
  gamesList: {
    type: Object,
    default: () => {},
  },
})

function onItemClick () {
  router.push({
    name: 'AllLotteryGames-VietnamLottery',
  })
}
</script>

<style lang="scss" scoped>
.lotteryGamesList__container {
  width: 326px;
  height: 160px;

  &-item {
    width: 100%;
    height: 100%;
    position: relative;

    img {
      width: 100%;
    }

    &__time {
      position: absolute;
      bottom: 30px;
      left: 40px;
      width: 88px;
      height: 36px;
      color: #ff6e68;
      font-size: 24px;
      text-align: center;
      line-height: 36px;
      border-radius: 9rem;
      background: var(--bg_color_L2);
      html:lang(ar) & {
        right: 40px;
        left: unset;
      }
    }
  }
}
</style>
