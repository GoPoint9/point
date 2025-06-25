<script setup lang="ts">
import { useHome } from '@/hooks'

import GameMenu from '@entrance/ncz-web-pgpc/components/GameMenu.vue'
import HomeItem from '@entrance/ncz-web-pgpc/components/HomeItem.vue'
// import VendorGameCenter from '@entrance/ncz-web-pgpc/components/VendorGameCenter.vue'

// import { useGameConfig } from '@entrance/ncz-web-pgpc/hook/useGameConfig.ts'
// const { options } = useGameConfig()

// const { fetchGameCategoryList, allGameList } = useFetchGame()
// fetchGameCategoryList()

// console.log(' [HomeGame] allGameList ', allGameList)

// const { getGameType, getAllGame, getVideonChildGame, getSlotList, homeState, currentGameType } = useHome({ changeTitle: true })
const { gameMenus, currentGameType } = useHome({ changeTitle: true })

// getAllGame()
// getVideonChildGame()
// // homeState.videoGame
// getSlotList()
// // homeState.slotsGame

console.log(
  '%c INFO %c gameMenus ',
  'color: red; font-weight: bold; padding: 3px; border: 2px solid red; border-radius: 3px 0 0 3px;',
  'color: #fff; background: red; font-weight: bold; padding: 5px; border-radius: 0 3px 3px 0;',
  gameMenus.value,
  currentGameType
)

// onMounted(async () => {
//   console.log('  >>> onMounted')
//   getGameType()
//   getAllGame()
// })

// const state = reactive({
//   games: [],
//   recentGames: []
// })

// const store = useStore()

// const gameVendor = computed(() => store.state.gameVendor)
// const hotGames = computed(() => store.state.hotGames)
// const sortingVendor = computed(() => store.state.sortingVendor)
// const isLogin = computed(() => store.getters.isLogin)
// const currentLanguage = computed(() => store.getters.currentLanguage)
// const currentGameType = computed(() => store.state.eGameStore.currentGameType)

// const filterGameVendor = computed(() => {
//   const filtered = Object.keys(gameVendor.value).filter(
//     key => !['SPORTS', 'LOTT', 'ELOTT', 'ESPORTS', 'COCKFIGHT', 'SPB'].includes(key)
//   )
//   return filtered
// })

// const menuList = computed(() => {
//   const categories = [{ gameCategory: 'HOME' }, { gameCategory: 'RUMMY' }, { gameCategory: 'LUDO' }, ...sortingVendor.value]

//   const order = ['HOME', 'SPORTS', 'LIVE', 'RUMMY', 'RNG', 'FISH', 'LUDO', 'PVP', 'ELOTT', 'ESPORTS', 'COCKFIGHT']

//   return categories
//     .filter(category => order.includes(category.gameCategory))
//     .sort((a, b) => order.indexOf(a.gameCategory) - order.indexOf(b.gameCategory))
// })

const showHomeItem = category => {
  return currentGameType.value === 'Popular' ? category !== 'FAV' || isLogin.value : currentGameType.value === category
}
</script>
<template>
  <div class="home-game">
    <GameMenu :menus="gameMenus" />

    <!-- <HomeItem type="popular" :options="options" />
    <VendorGameCenter type="lottery" :options="options" /> -->

    <!--
      lottery, sports, e-sports 使用以下
      <VendorGameCenter type="lottery" :options="options" />
    -->
    <template v-for="(menu, index) in gameMenus" :key="index">
      <HomeItem v-show="showHomeItem(menu.categoryCode)" :menu="menu" :type="menu.categoryCode" />
    </template>
    <!-- <VendorGameCenter />
    <div v-if="menuList">
      <HomeItem v-for="(menu, index) in menuList" :key="index" :menu="menu" :show-item="showHomeItem(menu.gameCategory)" />
    </div> -->
  </div>
</template>
