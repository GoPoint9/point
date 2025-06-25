<template>
  <div class="fish_game">
    <NavBar
      :title="$t('fishing')"
      background-color="linear-gradient(90deg, #CF0305 0%, #F23F3A 100%)"
      :placeholder="false"
      left-arrow
      @click-left="onClick"
    />
    <div class="fish_list">
      <img
        v-for="item in gameList"
        :key="item.vendorId"
        v-lazy="item.img"
        class="gameImg"
        @click="onItemClick(item)"
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getGameUrl, getThirdGameList } from '@/api'
import router from '@/router'
import type { Fish } from '@/types/api'
import { AwaitApiResult, getUserAgent, partyUrl } from '@/utils'
import { showDialog } from 'vant'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const gameList = reactive<Fish[]>([])
const { t } = useI18n()

const onClick = () => {
  router.back()
}

const getFishList = async () => {
  const res = await AwaitApiResult(getThirdGameList({ type: 11 }))
  if (res) {
    gameList.push(...res.data.gameLists)
  }
}

const onItemClick = (item: any) => {
  showDialog({
    title: t('tips'),
    message: t('tipsPlayGame'),
    cancelButtonText: t('cancel'),
    showCancelButton: true,
  }).then(async () => {
    const query = {
      gameCode: item.gameCode || item.gameID,
      vendorCode:
        item.hasOwnProperty('vendorCode') && item.vendorCode ? item.vendorCode : Number(item.vendorId) || Number(item.slotsTypeID),
    }
    const res = await AwaitApiResult(
      getGameUrl({
        ...query,
        phonetype: getUserAgent(),
      })
    )
    if (res) {
      partyUrl(res?.data, 1)
    }
  })
}

getFishList()
</script>
<style lang="scss" scoped>
.fish_game {
  padding: 24px;
  .fish_list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
    margin-bottom: 62px;
    .gameImg {
      width: 216px;
      height: 216px;
    }
  }
}
</style>
