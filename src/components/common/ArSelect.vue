<template>
  <div class="ar-searchbar__selector">
    <div @click="onClickSelectS">
      <span class="ar-searchbar__selector-default">
        {{ selectName }}
      </span>
      <van-icon name="arrow-down" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @description: 选中下拉弹出
 * @param {*} selectName 选中数据
 */
const props = defineProps({
  selectName: {
    type: String,
    default: '',
  },
})
//  抛出其方法
const emits = defineEmits<{
  (e: 'click-select'): void
}>()
const onClickSelectS = () => {
  emits('click-select')
}
</script>
<style scoped lang="scss">
.ar-searchbar__selector {
  position: relative;
  display: flex;
  width: 340px;
  height: 80px !important;
  // color: var(--text_color_L2);

  div {
    line-height: 1.06667rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  div:first-of-type {
    padding: 0 0.8rem 0 0.26667rem;
  }
}
</style>
