<script setup lang="ts">
import { MenuItem } from '@/NCZ/hooks/useMenuComponents.ts'

const emit = defineEmits(['update:modelValue', 'tab-click'])

const props = defineProps<{
  modelValue: MenuItem
  navItems: MenuItem[];
}>()
const currentActive = useVModel(props, 'modelValue', emit)

const onTabClick = (i) => {
  if (props.isLoading) return
  emit('update:modelValue', i)
  emit('tab-click', i)
}

// TODO: 有需要可以加上 disabled 狀態，否則預設 active
const isDisabled = false
</script>

<template>
  <div class="SettingNav setting-nav">
    <div
      v-for="i in navItems"
      :key="i.className"
      :class="['nav-item', i.className, { 'active': currentActive.className === i.className }]"
      @click="onTabClick(i)"
    >
      <i :class="['iconinf-m',i.icon, { 'active': !isDisabled }]" />
      <div class="item-tips">{{ i.name }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.setting-nav {
  position: absolute;
  top: 85px;
  left: -52px;
  .nav-item {
    position: relative;
    margin-bottom: 14px
  }
  .nav-item:hover .item-tips {
    display: block
  }
  .nav-item.active .item-tips {
    display: block
  }
  .nav-item .item-tips {
    display: none;
    position: absolute;
    padding: 0 10px;
    line-height: 30px;
    transform: translateX(-100%);
    margin-left: -12px;
    top: 50%;
    margin-top: -15px;
    white-space: nowrap;
    color: #fff;
    font-size: 13px;
    background: linear-gradient(to top,rgba(46,42,66,.92),rgba(81,78,98,.92));
    border-radius: 5px;
    box-shadow: 0 8px 21px rgba(0,0,0,.39)
  }
  .nav-item .item-tips::after {
    content: "";
    position: absolute;
    right: -11px;
    top: 50%;
    margin-top: -6px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-left-color: #4c4a5e
  }
}
</style>
