<!--
 * @Author: Seven
 * @Date: 2023-06-16 09:55:15
 * @LastEditTime: 2023-08-30 17:00:16
 * @LastEditors: Seven
 * @Description:
-->
<template>
  <div class="slot_list">
    <ElectronicWinRate />
    <div v-for="item in homeState.slotsGame" :key="item.vendorCode" class="slot_item">
      <div class="slot_title">
        <!--				<img :src="getIcons('home/slots', item.vendorCode)" alt="" />-->
        <svg-icon :name="item.vendorCode" />
        {{ getSlotTitle(item.vendorCode) }}{{ $t('electric') }}
      </div>
      <div class="slot_img_box">
        <img
          v-for="imgs in item.childList.slice(0, 6)"
          :key="imgs.gameID + item.vendorCode"
          v-lazy="imgs.img"
          @click="onItemClick(imgs)"
        >
      </div>
      <div class="all_slot" @click="() => goAll(item)">{{ $t('allGame') }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ElectronWithChildGame } from '@/types/api'
import { getIcons } from '@/utils'
import { useRouter } from 'vue-router'
import ElectronicWinRate from '@/components/Home/RedHome/GameList/ElectronicWinRate.vue'
import { useHome } from '@/hooks'

const router = useRouter()
const { getSlotList, homeState, onItemClick } = useHome()

// 实现一个方法，传入一个字符串，如果没有下划线，直接返回，如果有下划线，将下划线去掉返回前面的字符串
const getSlotTitle = (str: string) => {
  if (str.indexOf('_') === -1) {
    return str
  } else {
    return str.split('_')[0]
  }
}
const goAll = (item: ElectronWithChildGame) => {
  const clickItem = homeState.allGameList.slot.find((i: any) => i.slotsName === item.vendorCode)
  sessionStorage.setItem('slotGamesList', JSON.stringify(homeState.allGameList.slot))
  sessionStorage.setItem('gameType', JSON.stringify('slot'))
  sessionStorage.setItem('clickedItem', JSON.stringify(clickItem))
  router.push({
    name: 'AllOnlineGames',
    // query: {
    // 	gameType: 'slot',
    // 	currentId: item.childList[0].vendorId
    // }
  })
}

getSlotList()
</script>
<style lang="scss" scoped>
.slot_list {
  .slot_item {
    margin-bottom: 46px;

    .slot_title {
      display: flex;
      flex-direction: row;
      align-items: center;

      font-size: 30px;
      font-weight: bold;
      margin-bottom: 16px;
      color: var(--darkTextW, var(--text_color_L1));

      svg {
        height: 48px;
        font-size: 68px;
        vertical-align: middle;
        color: var(--main-color);
      }
    }
    .slot_img_box {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 18px;
      margin-bottom: 30px;
      img {
        width: 218px;
        height: 294px;
        border-radius: 8px;
      }
    }
    .all_slot {
      margin: auto;
      width: 288px;
      height: 60px;
      background: var(--main_gradient-color);
      box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
      border-radius: 30px;
      line-height: 60px;
      color: #ffffff;
      text-align: center;
      font-size: 24px;
    }
  }
}
</style>
