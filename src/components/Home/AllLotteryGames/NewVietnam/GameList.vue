<!-- 地区，时间和玩法处理 -->
<template>
  <div class="GameList__C-region c-row c-row-between">
    <div
      v-for="(item, index) in gameList"
      :key="index"
      :class="currentGameIndex == index ? 'item action' : 'item'"
      @click="tab(item.id, index)"
    >
      {{ $t(getArrayKey(rootConfig.RegionType, item.name)) }}
    </div>
  </div>
  <div class="GameList__C-time">
    <div
      v-for="(item, index) in weekdays"
      :key="index"
      :class="index == timeType ? 'item active' : 'item'"
      @click="sendTime(index, item)"
    >
      <p v-if="item.week == 'T2'" class="week">{{ $t('monday') }}</p>
      <p v-if="item.week == 'T3'" class="week">{{ $t('tuesday') }}</p>
      <p v-if="item.week == 'T4'" class="week">{{ $t('wednesday') }}</p>
      <p v-if="item.week == 'T5'" class="week">{{ $t('thursday') }}</p>
      <p v-if="item.week == 'T6'" class="week">{{ $t('friday') }}</p>
      <p v-if="item.week == 'T7'" class="week">{{ $t('saturday') }}</p>
      <p v-if="item.week == 'CN'" class="week">{{ $t('sunday') }}</p>
      <span class="time">{{ item.day }}</span>
    </div>
  </div>
  <div class="GameList__C-city">
    <div
      v-for="(item, index) in activeDay"
      :key="index"
      :class="index == cityType ? 'item action' : 'item'"
      @click="sendCity(index, item)"
    >
      {{ item.city }}
    </div>
  </div>

  <div class="GameList__C-bet">
    <ul class="c-row GameList__C-bet-box-1">
      <li id="GameType0" :class="gameTabType == 0 ? 'item action' : 'item'" @click="gameTab(0, 0)">
        {{ $t('lotteryType1') }}
      </li>
      <li :class="gameTabType == 1 ? 'item action' : 'item'" @click="gameTab(1, 1)">{{ $t('lotteryType2') }}</li>
      <li :class="gameTabType == 2 ? 'item action' : 'item'" @click="gameTab(2, 2)">{{ $t('lotteryType3') }}</li>
      <li :class="gameTabType == 3 ? 'item action' : 'item'" @click="gameTab(3, 3)">{{ $t('lotteryType4') }}</li>
      <li :class="gameTabType == 4 ? 'item action' : 'item'" @click="gameTab(4, 0)">{{ $t('lotteryType5') }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getArrayKey } from '@/utils'
import { rootConfig } from '@/utils/selectArr/rootConfig'
const emit = defineEmits(['tab', 'sendTime', 'sendCity', 'gameTab'])
const props = withDefaults(
  defineProps<{
    weekdays: any
    gameType: any
    timeType: any
    cityType: any
    gameTabType: any
    currentGameIndex: any
    gameList: any
  }>(),
  {
    gameList: {
      type: Array,
      default: () => [],
    },
    weekdays: {
      type: Array,
      default: () => [],
    },
    gameType: {
      type: Number,
      default: 1,
    },
    timeType: {
      type: Number,
      default: 0,
    },
    cityType: {
      type: Number,
      default: 0,
    },
    gameTabType: {
      type: Number,
      default: 0,
    },
    currentGameIndex: {
      type: Number,
      default: 0,
    },
  }
)
const activeDay = computed(() => {
  return props.weekdays[props.timeType]?.areIssueNos || []
})
const tab = (id: number, index: number) => {
  emit('tab', id, index)
}
const sendTime = (index: number, item: any) => {
  emit('sendTime', index, item)
}
const sendCity = (index: number, item: any) => {
  emit('sendCity', index, item)
}
const gameTab = (index: number, e: number) => {
  emit('gameTab', index, e)
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/xoxs.scss';
</style>
