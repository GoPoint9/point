<template>
  <div :class="['header-game-container', { large: isLarge }]">
    <div class="header-game-list">
      <div
        v-for="(game, index) in games"
        :key="`${game.gameType}_${index}`"
        class="header-game-item"
        @click="gameClick(game)"
      >
        <img class="vendor-img" :src="getNavVendorIcon(game)" alt="">
        <p class="vendor-name">{{ game.displayName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'HeaderGame',
  // mixins: [kt.z],
  props: {
    games: {
      type: Array,
      required: true,
    },
  },
  setup (props) {
    const { getNavVendorIcon } = h.fC()
    const { proxy: instance } = o.nI()

    const isLarge = computed(() => props.games.length > 10)

    const gameClick = (game) => {
      instance.launchGameVendor(game)
    }

    return {
      getNavVendorIcon,
      isLarge,
      gameClick,
    }
  },
}
</script>

<style scoped>
.header-game-container.large {
  /* Styles for large containers */
}

.header-game-list {
  /* Styles for game list */
}

.header-game-item {
  /* Styles for individual game items */
}

.vendor-img {
  /* Styles for vendor images */
}

.vendor-name {
  /* Styles for vendor names */
}
</style>
