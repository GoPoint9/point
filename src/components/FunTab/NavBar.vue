<template>
  <FunTabs
    ref="funtabRef"
    v-model="currentActive"
    :class="tabClassName"
    line-width="0"
  >
    <fun-tab-item
      v-for="(item, index) in list"
      v-show="item.isShow !== undefined ? item.isShow : true"
      :key="index"
      :name="index"
      :class="[tabItemClassName, { activeClassName: active === index }]"
      @click="handleClickItem(item, index)"
    >
      <slot :item="item" :index="index" />
    </fun-tab-item>
  </FunTabs>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { FunTabs, FunTabItem } from '@/components/FunTab'
import '@/components/FunTab/index.css'

const props = withDefaults(
  defineProps<{
    list: any[]
    tabClassName: string
    active: number
    tabItemClassName?: string
  }>(),
  {
    active: 0,
  }
)
const funtabRef = ref()
const currentActive = ref(0)

const emit = defineEmits(['update:active', 'onClickTab'])

const handleClickItem = (item: any, index: number) => {
  emit('update:active', currentActive.value)
  emit('onClickTab', { item, index })
}

watch(
  () => props.active,
  (val) => {
    currentActive.value = val
  }
)
defineExpose({
  funtabRef,
})
</script>

<style lang="scss"></style>
