<template>
  <div class="hot_container">
    <div v-for="item in gameList" class="hot_container-item">
      <img v-lazy="item.imgUrl || item.img" @click="handleSelect(item)">
      <div v-if="['popular'].includes(gameType) && store.isShowHotGameWinOdds" class="win-odds">
        <span>{{ $t('winOdds') }}</span>
        <span>{{ item.winOdds }}%</span>
        <div class="win-p" :style="{ width: `${Math.min(item.winOdds || 0, 100)}%` }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Fish, PopularList } from '@/types/api'
import { SettingStore } from '@/stores'

const props = withDefaults(
  defineProps<{
    gameList: Partial<PopularList & Fish>[]
    gameType: string
  }>(),
  {}
)
const emit = defineEmits(['onItemClick'])
const store = SettingStore()
const handleSelect = (item: Partial<PopularList & Fish>) => {
  emit('onItemClick', { item, gameType: props.gameType })
}
</script>

<style lang="scss" scoped>
.hot_container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  &-item {
    width: 218px;
  }
  img {
    width: 218px;
    height: 218px;
  }
  .win-odds {
    display: flex;
    height: 36px;
    background: #e6e6e6;
    color: #333;
    width: 100%;
    border-radius: 10px;
    font-size: 22px;
    overflow: hidden;
    margin-top: 6px;
    margin-bottom: 10px;
    position: relative;
    span {
      position: relative;
      z-index: 1;
      display: block;
      height: 100%;
      flex: 1;
      line-height: 40px;
      &:first-child {
        padding-left: 10px;
      }
      &:last-child {
        text-align: right;
        padding-right: 10px;
      }
    }
    .win-p {
      background: linear-gradient(90deg, #ff8e8a 15.38%, #ffbfa1 86.26%);
      position: absolute;
      left: 0;
      height: 100%;
    }
  }
}
</style>
