<template>
  <div class="onlineGameList__container">
    <div class="onlineGameList__container-gamesList">
      <div v-for="(item, index) in gamesList.list" class="onlineGameList__container-gamesList__item">
        <img v-lazy="getIcons('home/AllOnlineGames/gameList', 'cover')" alt="">
        <span>
          {{ gamesList.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getIcons } from '@/utils'
import { onMounted } from 'vue'
const props = withDefaults(
  defineProps<{
    gamesList: any
  }>(),
  {}
)

onMounted(() => {
  console.log(props.gamesList)
})
</script>

<style lang="scss" scoped>
.onlineGameList__container {
  padding-inline: 12px;
  font-family: 'Inter', sans-serif;

  &-heading {
    display: flex;
    align-items: center;
    color: var(--text_color_L1);
    font-size: 30px;
    font-weight: 600;

    &::before {
      content: '';
      display: block;
      width: 6px;
      height: 30px;
      background: var(--main-color);
      margin-right: 10px;
    }
  }

  &-gamesList {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    gap: 20px 10px;
    margin-top: 0.875rem;

    &__item {
      width: 217px;
      height: 297px;
      border-radius: 5px;
      background: #e6e8f2;
      overflow: hidden;

      img {
        width: 217px;
        height: 217px;
        object-fit: cover;
        border-radius: 5px;
      }

      span {
        display: block;
        width: 100%;
        text-align: center;
        line-height: 297px-217px-16px;
      }
    }
  }
}
</style>
