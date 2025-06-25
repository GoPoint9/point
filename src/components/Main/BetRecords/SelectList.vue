<template>
  <van-popup
    v-model:show="showPopup"
    round
    position="bottom"
    @click-overlay="onOverlay"
  >
    <div class="list">
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="index == selectId ? 'item active' : 'item'"
        @click="onSelectClick(item, index)"
      >
        <div v-if="tabId === 0"><img v-lazy="item.img" class="img">{{ item.key }}</div>
        <div v-else>
          <img v-lazy="getIconsPublic(index == selectId ? 'main/BetRecord/acitve' : 'main/BetRecord', item.value)" class="img">
          {{ item.key }}
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { getIconsPublic } from '@/utils'
const emits = defineEmits<{
  (e: 'update:showPopup', val: boolean): void
  (e: 'onClick', val: any, index: number): void
  (e: 'onBack'): void
}>()

const props = defineProps({
  showPopup: {
    // 是否展示弹窗
    type: Boolean,
    default: ref(false),
  },
  list: {
    type: Array,
    default: () => [],
  },
  tabId: {
    type: Number,
    default: 0,
  },
  selectId: {
    type: Number,
    default: 0,
  },
})

const showPopup = computed({
  get (): boolean {
    return props.showPopup || false
  },
  set (val: boolean) {
    emits('update:showPopup', val)
  },
})
const onSelectClick = (item: any, index: number) => {
  emits('onClick', item, index)
}
// 取消，确认
const onOverlay = () => {
  emits('onBack')
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 80px;
  line-height: 55px;
  padding: 35px 30px 0;
  .cancel {
    color: var(--text_color_L2);
  }
  .confirm {
    color: var(--main_gradient-color);
  }
}
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 35px 24px 14px;
  .item {
    width: calc(50% - 21px);
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 100px;
    background: var(--bg_color_L3);
    border-radius: 20px;
    margin-bottom: 20px;
    font-size: 28px;
    color: var(--text_color_L2);
    & > div {
      display: flex;
      align-items: center;
    }
    .img {
      display: block;
      width: 80px;
      height: 80px;
      margin-right: 20px;
    }
    &.active {
      background: var(--main_gradient-color);
      color: var(--text_color_L4);
    }
  }
}
</style>
