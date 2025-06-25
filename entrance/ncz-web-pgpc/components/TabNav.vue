
<script setup lang="ts">
import { MenuItem } from '@/NCZ/hooks/useMenuComponents.ts'

interface Props {
  modelValue: MenuItem,
  tabs: array,
  isLoading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  tabs: () => [],
  isLoading: false,
})

const currentActive = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const emit = defineEmits(['update:modelValue', 'tab-click'])

const onTabClick = ({ item, index }) => {
  if (props.isLoading) return
  emit('update:modelValue', index)
  emit('tab-click', { item, index })
}
</script>
<template>
  <div id="switchTab" class="TabNav tab-nav bet-record">
    <div class="switch-wrapper">
      <div
        v-for="(i, index) in tabs"
        :key="index"
        :class="['nav-item', { active: currentActive === index }]"
        :game-type="i.imgFileName"
        @click="onTabClick({ item: i, index })"
      >
        {{ i.name }}
      </div>
    </div>
    <!-- <div class="exclude-btn">排除游戏列表</div> -->
  </div>
</template>
<style lang="scss" scoped>

#mc_container .tab-nav {
  height: 47px;
  line-height: 46px;
  border-bottom: 1px solid #efefef;
  background-color: #fff;
  padding-left: 30px;
  font-size: 0;
  display: flex;
  white-space: nowrap;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden
}
#mc_container .tab-nav .nav-item {
  cursor: pointer;
  color: #666;
  font-size: 14px;
  height: 46px;
  line-height: 44px;
  display: inline-block;
  margin-right: 20px;
  padding: 0 10px
}
#mc_container .tab-nav .nav-item.active {
  color: #fd2f2f;
  border-bottom: 3px solid #fd2f2f
}
#mc_container .tab-nav .nav-item:last-child {
  margin-right: 0
}
</style>
