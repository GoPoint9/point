<template>
  <div id="gameList" class="gamesList__container">
    <div v-if="gameData.gameList.length > 0 && gameData.isShow" class="gamesList__container-title">
      {{ gameData.title }}
    </div>

    <GameList v-if="gameData.isShow" :current-game="gameData" :is-all="true" />
  </div>
</template>

<script setup lang="ts">
import GameList from '../GameList/GameListGrid.vue'
withDefaults(
  defineProps<{
    gameData: {
      isAll: boolean
      img: string
      isShow: boolean
      gameList: any[]
      gameType: string
      title: string
    }
  }>(),
  {}
)
</script>

<style lang="scss" scoped>
.gamesList__container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  &-title {
    margin-top: 26px;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    color: #fff;
    font-size: 30px;
    font-weight: 600;

    &::before {
      content: '';
      display: block;
      width: 6px;
      height: 30px;
      background: linear-gradient(180deg, #f6dc88 0%, #daad51 100%);
      margin-right: 10px;
    }
  }

  &-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    gap: 31px 20px;

    &__item {
      width: 216px;
      min-height: 160px;
      max-height: 260px;
      background: linear-gradient(124.32deg, #50a1f2 12.08%, #85daff 85.02%);
      border-radius: 40px;
      position: relative;

      .lottery_text {
        color: #fff;
        font-size: 30px;
        font-weight: 700px;
        position: absolute;
        top: 28px;
        left: 20px;
        html:lang(ar) & {
          left: unset;
          right: 22px;
        }
      }

      .item_default {
        width: 100%;
        height: 100%;
        border-radius: 40px;
        object-fit: fill !important;
      }

      .item_img {
        height: 150px;
        object-fit: cover;
        position: absolute;
        border-radius: 40px;
        left: 20px;
        html:lang(ar) & {
          left: unset;
          right: 20px;
        }
      }

      .lottery_img {
        max-width: 150px;
        height: 150px;
        object-fit: cover;
        position: absolute;
        border-radius: 40px;
        right: 20px;
        html:lang(ar) & {
          right: unset;
          left: 20px;
        }
      }

      .logo_img {
        position: absolute;
        top: 10px;
        right: 28px;
        width: 98px;
        html:lang(ar) & {
          right: unset;
          left: 28px;
        }
      }
    }
  }

  &-other {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    color: #999;
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;

    &__item {
      width: 100%;
      height: 200px;
    }
  }
}
</style>
