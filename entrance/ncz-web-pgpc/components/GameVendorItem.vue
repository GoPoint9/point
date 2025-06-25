<script setup>
import { ref, computed } from 'vue'
// import { useGameVendorMixin } from 'path/to/mixin'
// import { useSomeUtility } from 'path/to/utility'

const props = defineProps({
  game: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})

const gameType = computed(() => props.type)

// const { lagerIcon: itemImg, displayName: itemName, gameType } = game

console.warn('props.game ', props.game)

// <img v-lazy="props.game.imgUrl" alt="" />
// <span class="game-vassalage">{{ props.game.vendorCode }}</span>
// const { proxy: instance } = useSomeUtility()

const gameClick = selectedGame => {
  instance.launchGameVendor(selectedGame)
}

// const startGameV2 = useGameVendorMixin().startGame
</script>

<template>
  <div :class="['game-vendor-item', gameType]" @click="gameClick(game)">
    <div class="game-img">
      <img v-lazy="props.game.imgUrl" alt="">
    </div>
    <div v-if="gameType !== 'RNG'" class="action-wrap">
      <div class="action-btn start-btn" @click.stop="startGameV2(game)">
        {{ $t('in_immediate_game') }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add relevant styles */
</style>
