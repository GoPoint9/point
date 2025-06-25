<script setup>
import { onMounted } from 'vue'
// import McHelp from '@entrance/ncz-web-pgpc/components/CommonLogic/components/HelpContent.vue'
import HelpContent from '@entrance/ncz-web-pgpc/components/CommonLogic/components/HelpContent.vue'
onMounted(() => {
  document.body.scrollTo(0, 0) || window.scrollTo(0, 0)
})
</script>

<template>
  <div class="br_help_wrap">
    <div class="help_nav_body">
      <div class="top-title">{{ $t('in_help_center') }}</div>
      <!-- <McHelp /> -->
      <HelpContent />
    </div>
  </div>
</template>

<!--
/**
 * NOTE: HelpContent: 應該是 McHelp, 如以下，可以根據 type 切換。這邊省略此段邏輯。
<script setup>
// ... 省略
const rendorComponent = computed(() => {
  switch (props.type) {
    case 'menu':
      return Om
    case 'content':
      return ep
    default:
      return ep
  }
})
// ... 省略
</script>
<template>
  <component :is="rendorComponent" tag="components" :include="include" :exclude="exclude">
    <template v-for="(_, name) in $slots" :key="name" #[name]>
      <slot :name="name"></slot>
    </template>
  </component>
</template>
 */
-->
