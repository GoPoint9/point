<template>
  <div class="minGame_container" :class="{ all_game: isAll }">
    <div
      v-for="item in getGameList"
      :key="item.gameID"
      class="onlineGamesItem"
      @click="onItemClick(item)"
    >
      <img :key="item.gameID" v-lazy="item.img" :class="gameType === 'fish' ? 'fish_img' : 'min_game_img'">
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Fish } from '@/types/api'
import { computed, onMounted } from 'vue'

const props = withDefaults(
  defineProps<{
    gameData: {
      gameList: Fish[]
      isShow: boolean
      title: string
      img: string
      gameType: string
    }
    isAll: boolean
    gameType: string
  }>(),
  {}
)

const getGameList = computed(() => {
  if (props.isAll) return props.gameData.gameList
  return props.gameData.gameList.length > 8 ? props.gameData.gameList.slice(0, 8) : props.gameData.gameList
})

const emit = defineEmits(['onItemClick'])
const onItemClick = (item: any) => {
  emit('onItemClick', item)
}

onMounted(() => {})
</script>

<style lang="scss" scoped>
.minGame_container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 34px;
  margin-bottom: 30px;
}
.onlineGamesItem {
  width: 244px;
  height: 244px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #f6e3a3 0%, #d2a753 100%);
  grid-gap: 14px;
  .fish_img {
    width: 240px;
    height: 240px;
  }
  .min_game_img {
    width: 244px;
    height: 244px;
  }
}
.all_game {
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 26px;
  .onlineGamesItem {
    width: 222px;
    height: 300px;
    border-radius: 20px;
    .fish_img {
      width: 222px;
      height: 300px;
      border-radius: 20px;
      object-fit: cover;
    }
    .min_game_img {
      width: 222px;
      height: 300px;
      border-radius: 20px;
      object-fit: cover;
    }
  }
}
</style>
