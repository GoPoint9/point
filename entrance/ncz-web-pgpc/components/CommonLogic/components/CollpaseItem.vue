<script setup>
import { ref, computed, watch } from 'vue'

// const emit = defineEmits(['selectTag', 'cut'])
const emit = defineEmits(['selectTag'])
const props = defineProps({
  title: String,
  tag: String,
  select: Boolean,
})
const show = ref(false)
const newTag = computed(() => (props.tag ? props.tag.trim() : 'default'))
if (props.select) {
  show.value = true
}
watch(
  () => props.select,
  isSelect => {
    if (!isSelect) show.value = false
  }
)
const onChange = () => {
  // emit('cut', props._uid)
  emit('selectTag', props.tag)
  show.value = !show.value
}
</script>

<template>
  <div class="menuItem_wrap">
    <div class="title" :class="{ active: select, [newTag]: true }" @click="onChange">
      <i class="help-icon">
        <svg>
          <use xlink:href="#helpCenter" />
        </svg>
      </i>
      <span>{{ title }}</span>
    </div>
    <div v-show="show">
      <slot />
    </div>
  </div>
</template>
