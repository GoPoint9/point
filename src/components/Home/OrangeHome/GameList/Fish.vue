<template>
  <div class="fish_game">
    <div
      v-for="item in gameList"
      :key="item.vendorId"
      class="item"
      @click="onItemClick(item)"
    >
      <img :src="item.img" alt="" :data-img="getIcons('images', 'avatar')">
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Fish } from '@/types/api'
import { getIcons } from '@/utils'

withDefaults(
  defineProps<{
    gameList: Fish[]
  }>(),
  {}
)

const emit = defineEmits(['onItemClick'])
const onItemClick = (item: any) => {
  emit('onItemClick', item)
}
</script>

<style lang="scss" scoped>
.fish_game {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 14px;
  .item {
    width: 220px;
    position: relative;
    height: 220px;
    background: linear-gradient(157deg, #ff9902 0%, #ffd058 100%);
    box-shadow: 0px 8px 16px rgba(208, 208, 237, 0.36), inset 0px -4px 10px #fff6f4;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
    img {
      width: 200px;
      height: 200px;
      border-radius: 16px;
    }
    .hot_bage {
      position: absolute;
      right: -6px;
      top: -8px;
      width: 38px;
      height: 36px;
    }
  }
}
</style>
