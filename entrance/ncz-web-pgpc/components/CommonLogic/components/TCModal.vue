<script lang="ts" setup>
import { inject, ref } from 'vue'

// NOTE: name: "tmodal"
const emit = defineEmits(['beforeOpen', 'beforeClose'])
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  mtitle: {
    type: String,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  scrollable: {
    type: Boolean,
    default: true,
  },
})

const $modal = inject('$modal')
const close = () => {
  $modal.hide(props.name)
}

const scrollTop = ref(0)
const beforeOpen = () => {
  if (props.scrollable) {
    scrollTop.value = document.scrollingElement.scrollTop
    document.body.style.position = 'fixed'
    document.body.style.top = `${-scrollTop.value}px`
    emit('beforeOpen')
  }
}
const beforeClose = () => {
  if (props.scrollable) {
    document.body.style.position = ''
    document.body.style.top = ''
    document.scrollingElement.scrollTop = scrollTop.value
    emit('beforeClose')
  }
}
</script>
<template>
  <modal
    :name="name"
    transition="nice-modal-fade"
    :width="200"
    :height="200"
    adaptive
    :delay="100"
    draggable
    :click-to-close="false"
    class="TCModal"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="popup_modal_wrap">
      <div v-if="showClose" :class="['popup_modal_close', name]" @click="close">
        <slot name="close">
          <svg-icon name="popup-close" />
        </slot>
      </div>
      <div class="popup_modal_body">
        <slot />
      </div>
    </div>
  </modal>
</template>

<style lang="scss">
// FIX
#app {
  .vm--modal {
    background-color: transparent;
    overflow: visible;
  }
  .vm--overlay {
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>
<style lang="scss" scoped>
.popup_modal_wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.zoom-in-top-enter-active,
.zoom-in-top-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}
.zoom-in-top-enter,
.zoom-in-top-leave-active {
  opacity: 0;
  transform: scaleY(0);
}
.zoom-in-bottom-enter-active,
.zoom-in-bottom-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center bottom;
}
.zoom-in-bottom-enter,
.zoom-in-bottom-leave-active {
  opacity: 0;
  transform: scaleY(0);
}
</style>
