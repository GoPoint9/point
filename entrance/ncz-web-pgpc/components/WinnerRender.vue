<script setup>
import { ref, computed } from 'vue'
import { Kh, EW, QW } from '7866'
import { vueSeamless } from 'some-vue-seamless-package'

const classOption = ref({
  step: 0.5,
  limitMoveNum: 3,
})

const store = useStore()
const winner = computed(() => store.home.winnerBoard)
const currencySymbol = computed(() => store.Public.currencySymbol)

const startGameV2 = winnerData => {
  // your start game logic
}
</script>

<template>
  <div class="winner-wrapper">
    <div class="winner-title">
      <img class="icon-winner-board" :src="require('84614')" alt="">
      <span>{{ $t('br_tuikje_lbeuhf') }}</span>
    </div>
    <div class="winner-board">
      <div class="list-title">
        <span class="list-title-item">{{ $t('rank_promo') }}</span>
        <span class="list-title-item">{{ $t('winner_game') }}</span>
        <span class="list-title-item">{{ $t('winner_money') }}</span>
      </div>
      <div class="list-warp-container">
        <div
          v-for="(a, i) in winner.slice(0, 3)"
          :key="i"
          class="win-item"
          @click="startGameV2(a)"
        >
          <div class="rank">
            <img v-if="i === 0" :src="require('27892')" alt="rank1">
            <img v-if="i === 1" :src="require('18735')" alt="rank2">
            <img v-if="i === 2" :src="require('79718')" alt="rank3">
          </div>
          <div class="custom-name">{{ a.customerName }}</div>
          <div class="win-amount">
            <span class="symbol">{{ currencySymbol }}</span>
            {{ a.winAmount }}
          </div>
        </div>
      </div>
      <vueSeamless class="list-warp" :data="winner" :class-option="classOption">
        <div
          v-for="(n, a) in winner.slice(3)"
          :key="a"
          class="win-item"
          @click="startGameV2(n)"
        >
          <div class="rank">
            <span>{{ a + 4 }}</span>
          </div>
          <div class="custom-name">{{ n.customerName }}</div>
          <div class="win-amount">
            <span class="symbol">{{ currencySymbol }}</span>
            {{ n.winAmount }}
          </div>
        </div>
      </vueSeamless>
    </div>
  </div>
</template>
