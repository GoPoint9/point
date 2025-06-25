<template>
  <div>
    <div class="homeNav">
      <div class="title">
        <div><b />{{ $t('popularTitle') }}</div>
      </div>
      <div class="tip">{{ $t('popularText1') }}</div>
      <div class="picContainer">
        <img
          v-for="(game, i) in picList1"
          :key="i"
          v-lazy="game.imgUrl"
          alt=""
          @click="onItemClick(game)"
        >
      </div>
    </div>
    <div class="homeNav">
      <div class="title">
        <div><b />{{ $t('popular') }}</div>
        <div class="right_btn">
          <svg-icon name="p3a_l" @click="handleOffset('left')" />
          <svg-icon name="p3a_r" @click="handleOffset('right')" />
        </div>
      </div>
      <div class="tip">{{ $t('popularText') }}</div>
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
              v-lazy="game.imgUrl"
              alt=""
              @click="onItemClick(game)"
            >
          </div>
        </SwipeItem>
      </Swipe>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Swipe, SwipeItem } from 'vant'
import { useHome } from '@/hooks'
import { splitIntoGroups } from '@/utils'
import { computed, ref } from 'vue'

const { homeState, onItemClick } = useHome()
const swipeIndex = ref(0)
const swipeRef = ref()
const picList1 = computed(() => {
  return homeState.allGameList?.popular.platformList || []
})
const picList2 = computed(() => {
  return splitIntoGroups(homeState.allGameList?.popular.clicksTopList || [], 3)
})
const swipeChange = (index: number) => {
  swipeIndex.value = index
}

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
    height: 300px;
  }
}
.homeNav + .homeNav {
  margin-top: 40px;
}
</style>
