<template>
  <div class="homeNav">
    <div class="title">
      <div>
        <b />{{ $t('code9307Chess') }}
        <div class="allMore" @click="gol2('chess')">{{ $t('More') + ' ' + (homeState.allGameList?.chess.length || '0') }}</div>
      </div>
      <div class="right_btn">
        <svg-icon name="p3a_l" @click="handleOffset('left')" />
        <svg-icon name="p3a_r" @click="handleOffset('right')" />
      </div>
    </div>
    <div class="tip">{{ $t('chessText') }}</div>
    <Swipe
      ref="swipeRef"
      class="my-swipe"
      :autoplay="3000"
      :lazy-render="false"
      :show-indicators="false"
      @change="swipeChange"
    >
      <SwipeItem v-for="(item, x) in picList2" :key="x">
        <div class="picContainer">
          <img
            v-for="(game, i) in item"
            :key="i"
            v-lazy="game.vendorImg"
            alt=""
            @click="gol2chess(game, picList)"
          >
        </div>
      </SwipeItem>
    </Swipe>
  </div>
</template>
<script setup lang="ts">
import { useHome } from '@/hooks'
import { computed, ref } from 'vue'
import { Swipe, SwipeItem } from 'vant'
import { splitIntoGroups } from '@/utils'

const { homeState, gol2, gol2chess } = useHome()
const swipeRef = ref()
const picList = computed(() => {
  return homeState.allGameList?.chess || []
})
const picList2 = computed(() => {
  return splitIntoGroups(homeState.allGameList?.chess || [], 3)
})
/**
 * @description: 左右滚动游戏
 * @param {*} type
 * @return {*}
 */
const handleOffset = (type: string): void => {
  if (type === 'left') {
    swipeRef.value?.prev()
  } else {
    swipeRef.value?.next()
  }
}
</script>
<style scoped lang="scss">
.title {
  height: 42px;
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 10px;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  b {
    display: block;
    height: 26px;
    width: 8px;
    border-radius: 4px;
    background-color: var(--main-color);
  }
  .right_btn {
    svg {
      width: 58px;
      height: 32px;
    }
  }
  .allMore {
    height: 32px;
    padding: 0 14px;
    width: fit-content;
    line-height: 32px;
    color: var(--main-color);
    font-size: 20px;
    background: var(--bg_color_L2);
    border-radius: 8px;
  }
}
.tip {
  font-size: 20px;
  color: var(--text_color_L2);
  margin-bottom: 24px;
}
.picContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  img {
    width: calc((100% - 24px) / 3);
  }
}
</style>
