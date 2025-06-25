<template>
  <div :class="['drop-menu-container', { active: show }]" @mouseenter.stop.prevent="showMenu" @mouseleave.stop.prevent="hideMenu">
    <div class="drop-menu-bg">
      <template v-for="(item, index) in navItems" :key="'drop_' + index">
        <div v-if="activeIndex === index && !['HOME', 'PROMO'].includes(item.gameType)" class="drop-menu-item">
          <HeaderGame :games="gameVendor[item.gameType]" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderGame from './HeaderGame.vue'

// export default {
//   name: "dropMenu",
//   components: {
//     HeaderGame,
//   },

// const props = defineProps({
defineProps({
  activeIndex: {
    type: Number,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
})
// setup(props, { emit }) {
// const { navItems, gameVendor } = h.OW(); // store
const gameVendor = {}

// Footer
const navItems = [
  { name: 'hd_home', gameType: 'HOME', page: '/' },
  { name: 'con_rng', gameType: 'RNG', page: '/rng' },
  { name: 'con_lott', gameType: 'ELOTT', page: '/elott' },
  { name: 'con_live', gameType: 'LIVE', page: '/live' },
  { name: 'con_fish', gameType: 'FISH', page: '/fish' },
  { name: 'con_sports', gameType: 'SPORTS', page: '/sports' },
  { name: 'compete_game', gameType: 'ESPORTS', page: '/esports' },
  { name: 'con_pvp', gameType: 'PVP', page: '/pvp' },
  { name: 'hd_event', gameType: 'PROMO', page: '/promotions' },
]

const showMenu = () => {
  emit('showMenu')
}

const hideMenu = () => {
  emit('hideMenu')
}

//     return {
//       navItems,
//       gameVendor,
//       showMenu,
//       hideMenu,
//     };
//   },
// };
</script>

<style scoped>
.drop-menu-container {
  /* Styles for the drop menu container */
}

.drop-menu-container.active {
  /* Styles when menu is active */
}

.drop-menu-bg {
  /* Background styles for drop menu */
}

.drop-menu-item {
  /* Styles for individual menu items */
}
</style>
