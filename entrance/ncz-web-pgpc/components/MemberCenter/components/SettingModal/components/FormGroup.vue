<script setup>
import { FORM_TYPES } from '@entrance/ncz-web-pgpc/components/CommonLogic/components/FormItem.vue'
import { useField } from 'vee-validate'

// 禁用自動繼承，改為手動綁定
defineOptions({ inheritAttrs: false })

// 使用 v-model 雙向綁定
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  // yup/defineField 生成的 event
  // inputAttrs: {
  //   type: Object,
  //   required: true,
  // },
  name: {
    type: String,
    default: 'text',
  },
  type: {
    type: String,
    default: 'text',
  },
  // errorMessage: {
  //   type: String,
  //   default: '',
  // },
})
// const attrs = useAttrs()
// 合併一些 name placeholder autocomplete 等，給 input 原生屬性的
// const mergedAttrs = computed(() => ({ ...props.inputAttrs, ...attrs }))

const { value, errorMessage, resetField, handleReset } = useField(
  () => props.name,
  undefined,
  { syncVModel: true }
)

const showPassword = ref(false)
const fieldType = computed(() => {
  if (props.type === FORM_TYPES.PASSWORD) {
    return unref(showPassword) ? 'text' : 'password'
  }
  return 'text'
})

const onUpdateValue = (value) => {
  emit('update:modelValue', value)
}
const onClearValue = () => {
  // emit('update:modelValue', '')
  // resetField({ value: '' })
  handleReset()
  // emit('reset')
}
</script>

<template>
  <div class="form-group">
    <label class="form-label colon">{{ label }}</label>
    <div :class="['input-case fr', { 'input-case-error': errorMessage }]">
      <!-- v-bind="mergedAttrs" -->
      <!-- @input="onUpdateValue($event.target.value)" -->
      <!-- :value="modelValue" -->
      <input
        v-bind="$attrs"
        v-model="value"
        class="input-control fr js_paste_disabled"
        :type="fieldType"
      >
      <div
        v-if="props.type === FORM_TYPES.PASSWORD"
        :class="['mcac-icon', {
          'right-more': errorMessage,
          'icon-eyes': showPassword,
          'icon-eyes-close': !showPassword,
        }]"
        @click="showPassword = !showPassword"
      />
      <div class="mcac-icon clear-btn" :class="{ 'hide': !errorMessage }" @click="handleReset()" />
      <div class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.error-message {
  position: absolute;
  margin-bottom: 7px;
  // white-space: normal;
  padding-top: 2px;
  border-radius: 8px;
  font-size: 12px;
  color: #ed5650;

  top: 100%;
}
</style>
