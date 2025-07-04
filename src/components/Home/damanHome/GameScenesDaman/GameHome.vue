<script setup lang="ts">
import { onMounted, PropType } from 'vue'
import { HomeGameList } from '@/types'
import { useGameContext, useHome } from '@/hooks'

const props = defineProps({
  platformList: {
    type: Array as PropType<HomeGameList[]>,
    default: [],
  },
  isAll: {
    type: Boolean,
    default: false,
  },
  enterGame: {
    type: Boolean,
    default: false,
  },
  odd: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  code: {
    type: String,
    default: '',
  },
})
const { onGame, goGame } = useGameContext()
const { isAlowGame } = useHome()
</script>

<template>
  <div class="daman__container" :class="{ allGame: isAll }">
    <div
      v-for="item in platformList"
      :key="`${item.slotsTypeID || item.vendorId}-${item.gameID}`"
      class="item"
      @click="enterGame ? isAlowGame(item, goGame) : onGame(Object.assign({}, item, { key: props.code }))"
    >
      <img v-lazy="item.vendorImg || item.img || item.imgUrl" class="gameImg">
      <div v-if="title" class="game-type">{{ title }}</div>
      <div v-if="odd" class="game-odd">
        <span>{{ $t('winOdds') }}</span>
        <span>{{ item.winOdds }}%</span>
        <div class="win-p" :style="{ width: `${Math.min(item.winOdds, 100)}%` }" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.daman__container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
  margin-bottom: 62px;
  &.allGame {
    grid-template-columns: repeat(3, 1fr);
    .item {
      width: 222px;
      min-height: 300px;
      height: auto;
      .gameImg {
        width: 222px;
        height: 300px;
      }
    }
  }
  .cms-icon {
    color: #f95959;
    margin-right: 8px;
  }
  .item {
    position: relative;
    width: 340px;
    height: 300px;
    border-radius: 20px;
    .gameImg {
      width: 340px;
      height: 300px;
      border-radius: 20px;
      background: var(--main_gradient-color2);
    }
    .game-type {
      position: absolute;
      bottom: 6px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 24px;
      font-weight: 600;
    }
  }
  .gameImg {
    object-fit: cover;
  }
  h2 {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 26px;
    font-size: 36px;
    font-weight: bold;
    &.daman-line {
      padding-left: 20px;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 6px;
        height: 30px;
        background: #f64646;
        border-radius: 4px;
      }
    }
  }
  .game-odd {
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
      background: var(--main-color);
      position: absolute;
      left: 0;
      height: 100%;
    }
  }
}
</style>
