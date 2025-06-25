<script setup>
import { computed } from 'vue'

const props = defineProps({
  game: {
    type: Object,
    required: true,
  },
})

const { game } = props
// console.warn('game ', game)

// vendorImg: chess, sport
// img: fish, flash, video
// imgUrl: popular, bigaward
// categoryImg: lottery
const itemImg = computed(() => {
  if (import.meta.env.VITE_APP_IS_WEB_PGPC) return props.game.logoPath

  const { imgUrl, img, vendorImg, categoryImg } = props.game
  return imgUrl || img || vendorImg || categoryImg
})
// const itemName = game.gameName ?? game.nodeName

// const isFav = computed(() => store.state.eGameStore.favGameIds.includes(`${game.nodeId}`))

// NOTE: 競品是 lodash + api，先 pass。
// const toggleFav = throttle(
//   () => {
//     const action = isFav.value ? 'removeFavGame' : 'addFavGame'
//     const payload = {
//       nodeId: game.nodeId,
//       vendor: game.vassalage,
//       gameType: game.gameType
//     }
//     store.dispatch(action, payload)
//   },
//   1000,
//   { trailing: false }
// )
</script>

<template>
  <div class="game-list-item">
    <div class="game-img">
      <img v-lazy="itemImg" alt="">
      <span v-show="props.game.vendorCode" class="game-vassalage">{{ props.game.vendorCode }}</span>
    </div>
    <div class="action-wrap">
      <div class="action-btn start-btn" @click="startGameV2(game)">
        {{ $t('in_immediate_game') }}
      </div>
      <div class="action-btn free-btn" @click="startGameV2(game, true)">
        {{ $t('in_free_trial') }}
      </div>
    </div>
    <div class="game-info">
      <div class="game-name">{{ props.game.gameNameEn }}</div>

      <!--  -->
      <!-- <div class="fav-btn" @click="toggleFav">
        <svg-icon name="game-fav-default" :class="{ isFav }" />
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-game-fav-default {
  color: #fff;

  &.isFav {
    color: #ff9a02;
  }
}
</style>
