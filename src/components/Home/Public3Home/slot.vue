<template>
  <div>
    <div class="title"><b />{{ $t('electronic') }}</div>
    <div class="tip">{{ $t('elecText') }}</div>
    <van-tabs v-model:active="active" animated class="homeNav">
      <van-tab v-for="(type, i) in soltGameType" :key="i" :name="type">
        <template #title>
          <div class="tabs-btn"><svg-icon class="gameIcon" :name="type" />{{ type }}</div>
        </template>
        <div class="picContainer">
          <template v-if="soltGameList[active]">
            <img
              v-for="(game, i) in soltGameList[active]"
              :key="i"
              v-lazy="game.img"
              alt=""
              @click="onItemClick(game)"
            >
            <div class="more" @click="gol2('slot')">
              <div class="more-l1">
                <svg-icon name="p3more" />
                {{ $t('more') }}
              </div>
              <div class="more-l2">{{ active }}</div>
            </div>
          </template>
        </div>
      </van-tab>
    </van-tabs>

    <Card
      v-if="ActiveSotre.isOpenChampion == 1 && globalStore.token"
      v-model:is-refresh="isRefresh"
      :item-d="championEntranceVO"
      :state="championEntranceVO.state"
      bg-img-width="100%"
      bg-img-height="150px"
      @click="() => router.push({ name: 'Championship' })"
    />
  </div>
</template>
<script setup lang="ts">
import Card from '@/components/Activity/Championship/card.vue'
import { useChampionship, useHome } from '@/hooks'
import { useActive } from '@/components/common/use'
import { onMounted, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { GlobalStore } from '@/stores'

const { homeState, getSlotList, onItemClick, gol2 } = useHome()
const { championEntranceV, championEntranceVO } = useChampionship()
const globalStore = GlobalStore()
const { ActiveSotre, getActive } = useActive()
const active = ref('')
const router = useRouter()
const soltGameType: any = ref([])
const soltGameList: any = ref({})
const isRefresh = ref(false)
watch(isRefresh, (val) => {
  console.log('val', val)
  if (isRefresh.value) {
    championEntranceV()
  }
})
onMounted(async () => {
  await getSlotList()
  soltGameType.value = homeState.slotsGame.map((item) => {
    soltGameList.value[item.vendorCode] = item.childList.slice(0, 5)
    return item.vendorCode
  })
  if (globalStore.token) {
    active.value = soltGameType.value[0]
    await getActive()
    if (ActiveSotre.value.isOpenChampion) championEntranceV()
  }
})
</script>
<style scoped lang="scss">
.title {
  height: 42px;
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 10px;
  b {
    display: block;
    height: 26px;
    width: 8px;
    border-radius: 4px;
    background-color: var(--main-color);
    margin-inline-end: 10px;
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
  height: fit-content;
  img {
    width: calc((100% - 24px) / 3);
    height: 300px;
  }
}
.gameIcon {
  width: 100px;
  height: 50px;
}
:deep(.item) {
  margin-top: 40px;
}
</style>
