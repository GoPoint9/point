<!-- SimpleSelect.vue -->
<template>
  <div class="simple-select">
    <div ref="selectInput" class="select-input" @click="toggleOptions">
      <div class="selected-option">
        <slot name="selected" />
      </div>
      <i class="arrow-icon" :class="{ up: showOptions, down: !showOptions }">
        <slot name="arrow">
          <svg-icon class-name="arrow-down" name="arrow-down" />
        </slot>
      </i>
    </div>
    <Transition :name="dropAnimationName">
      <div v-show="showOptions" class="select-options">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'SimpleSelect',
  props: {
    dropAnimationName: {
      type: String,
      default: 'zoom-in-top',
    },
  },
  data () {
    return {
      showOptions: false,
    }
  },
  methods: {
    toggleOptions () {
      this.showOptions = !this.showOptions
      if (this.showOptions) {
        document.addEventListener('click', this.closeOptions)
      } else {
        document.removeEventListener('click', this.closeOptions)
      }
    },
    closeOptions (event) {
      if (!this.$refs.selectInput.contains(event.target)) {
        this.showOptions = false
        document.removeEventListener('click', this.closeOptions)
      }
    },
  },
}
</script>
