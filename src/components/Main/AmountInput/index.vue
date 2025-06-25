<template>
  <div class="amountInput__container">
    <div class="amountInput__container-input">
      <input
        v-model="inputValue"
        type="text"
        auto-complete="new-password"
        autocomplete="off"
        :placeholder="$t('phEnter') + label"
      >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getIcons } from '@/utils'

const prop = withDefaults(
  defineProps<{
    value?: string
    label: string
  }>(),
  {}
)

const isShowPlaceholder = ref(false)
const emit = defineEmits<{
  (e: 'update:value', val: string): void
}>()

const inputValue = computed({
  get () {
    return prop.value
  },
  set (val) {
    emit('update:value', val as string)
  },
})

const isVisible = ref(false)
const getEyecon = computed(() => getIcons('main', `${isVisible.value ? 'eyeInvisible' : 'eyeVisible'}`))
</script>

<style lang="scss" scoped>
.amountInput__container {
  height: 70px;
  line-height: 70px;
  border: 1px solid #b0b5d2;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  position: relative;

  &-input {
    width: 100%;

    input {
      border: 0;
      width: 100%;
      height: 100%;
      border-radius: 12px;

      &::placeholder {
        color: #a8abc0;
        font-weight: 400;
        font-size: 24px;
        position: relative;
        top: -2px;
      }
    }
  }
}
</style>
