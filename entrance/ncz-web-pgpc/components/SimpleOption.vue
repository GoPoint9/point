<!-- SimpleOption.vue -->
<template>
  <div class="select-option" :class="className" @click="selectOption">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SimpleOption',
  props: {
    option: {
      type: [String, Number, Object],
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  emits: ['option-selected'],
  methods: {
    selectOption () {
      this.$emit('option-selected', this.option)
    },
  },
}
</script>
