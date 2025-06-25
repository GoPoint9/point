<!-- 彩种及玩法 -->
<template>
  <div class="ColorsContainer">
    <NavTab
      v-slot="{ item, index }"
      v-model:active="active"
      :list="gameCategoryList"
      tab-class-name="ColorsMethod"
      @on-click-tab="onClickTab"
    >
      <div class="coloritem" :class="{ active: index === active }">
        {{ $t('code' + item.categoryNameCode) }}
      </div>
    </NavTab>
    <NavTab
      v-slot="{ item, index }"
      v-model:active="playActive"
      :list="playsList"
      tab-class-name="PlayMethod"
      @on-click-tab="onClickPlayTab"
    >
      <div class="playitem" :class="{ active: index === playActive }">
        {{ $t('code' + item.playNameCode) }}
      </div>
    </NavTab>
  </div>
</template>

<script setup lang="ts">
import NavTab from '@/components/FunTab/NavBar.vue'
import { computed, PropType, ref, watch } from 'vue'
const props = defineProps({
  gameCategoryList: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  colortab: {
    type: Number,
    default: 0,
  },
  playtab: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['colorupdate', 'update'])
const active = ref<number>(props.colortab)
const playActive = ref<number>(props.playtab)
const playsList = computed(() => props.gameCategoryList[active.value]?.gamePlayList || [])

function onClickTab (data: any) {
  emit('colorupdate', data.item.categoryId, data.index)
}
function onClickPlayTab ({ item, index }: any) {
  emit('update', item.playId, index, item.playNameCode, item.betType)
}
watch(
  () => props.playtab,
  () => {
    playActive.value = props.playtab
  }
)
watch(
  () => props.colortab,
  () => {
    active.value = props.colortab
  }
)
</script>
<style lang="scss">
.ColorsContainer {
  display: flex;
  flex-direction: column;
  padding: 20px 24px;

  .ColorsMethod {
    height: 70px;
    margin-bottom: 5px;
    background-color: transparent;
    .coloritem {
      width: 240px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      background-image: url('@icon/public/play.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      font-weight: 400;
      color: var(--text_color_L2);
      font-size: 26px;
      flex: none;
    }
    .active {
      background-image: url('@icon/public/playactive.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      color: #fff;
      font-weight: 700;
    }
  }
  .PlayMethod {
    height: 70px;
    border-radius: 10px;
    background-color: #fff;
    .playitem {
      width: 320px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      font-size: 26px;
      font-weight: 400;
      color: var(--text_color_L2);
      flex: none;
    }
    .active {
      background: var(--linerGradien-94, linear-gradient(125deg, #ff8e89 12.38%, #ffc3a2 87.13%));
      border-radius: 10px;
      color: #fff;
      font-weight: 700;
    }
  }
  .fun-tab-item {
    padding: 0;
  }
}
</style>
