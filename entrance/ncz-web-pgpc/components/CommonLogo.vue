<script lang="ts" setup>
import { computed } from 'vue'
import { useHome } from '@/hooks'
const { projectIcon } = useHome()

const emit = defineEmits(['logoClick'])
const props = defineProps({
  src: {
    type: String,
  },
})

const showSrc = computed(() => {
  console.log(' projectIcon ', projectIcon)
  return projectIcon.value || props.src || null
})

const logoClick = event => {
  emit('logoClick', event)
}
</script>

<template>
  <img
    v-if="showSrc"
    class="common-logo"
    :src="showSrc"
    alt="Logo"
    @click="logoClick"
  >
</template>
