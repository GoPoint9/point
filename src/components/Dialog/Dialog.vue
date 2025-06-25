<script setup lang="ts">
import { useCountDown } from '@vant/use'
import type { PropType } from 'vue'
import { ref, watch } from 'vue'

const props = defineProps({
  // 弹窗显示状态
  show: {
    type: Boolean,
    default: false,
  },
  // 类型
  type: {
    type: String as PropType<'info' | 'success' | 'error'>,
    default: 'info',
  },
  // 取消按钮是否显示
  showCancel: {
    type: Boolean,
    default: true,
  },
  // 取消按钮文字内容
  cancelText: {
    type: String,
    default: '取消',
  },
  // 确定按钮是否显示
  showConfirm: {
    type: Boolean,
    default: true,
  },
  // 确定按钮文字内容
  confirmText: {
    type: String,
    default: '确认',
  },
  // 主标题
  title: {
    type: String,
    default: '',
  },
  // 状态码
  code: {
    type: String,
    default: '',
  },
  // 标题描述
  desc: {
    type: [String, Function],
    default: '',
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  maskClose: {
    type: Boolean,
    default: true,
  },
  time: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['update:show', 'cancel', 'confirm'])
const btn = ref(props.time !== 0)
const mainShow = ref(false)
const onMaskClose = () => {
  if (!props.maskClose) return
  mainShow.value = false
}
const onClose = () => {
  mainShow.value = false
}
const onAfterLeave = () => {
  emit('update:show', false)
}
const countDown = useCountDown({
  // 倒计时 24 小时
  time: props.time * 1000,
  onFinish () {
    btn.value = false
  },
})

watch(
  () => props.show,
  (n) => {
    mainShow.value = n
    if (n && props.time !== 0) {
      countDown.start()
    }
  }
)
</script>

<template>
  <div v-show="{ show }" class="dialog">
    <div class="dialog-bg" @click="onMaskClose" />
    <transition
      name="dialogIn"
      enter-active-class="dialogIn-enter-active"
      leave-active-class="dialogIn-leave-active"
      @after-leave="onAfterLeave"
    >
      <div v-show="mainShow" class="dialog-main">
        <div class="dialog-main-content" />
        <div v-if="showClose" class="dialog-main-close" @click="onClose">
          <div style="width: 30px; height: 30px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
            >
              <path
                d="M30 57C44.9117 57 57 44.9117 57 30C57 15.0883 44.9117 3 30 3C15.0883 3 3 15.0883 3 30C3 44.9117 15.0883 57 30 57Z"
                stroke="white"
                stroke-width="4"
                stroke-linejoin="round"
              />
              <path
                d="M43 17L17 43"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17 17L43 43"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  html:lang(ar) & {
    right: 0;
    left: unset;
  }
  &-bg {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
  }
  &-main {
    position: absolute;
    top: calc(50% - 150px);
    left: 12%;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 76%;
    html:lang(ar) & {
      right: 12%;
      left: unset;
    }
    &-noClose {
      top: calc(50% - 122px);
    }
    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--body);
      border-radius: 50%;
      width: 54px;
      height: 54px;
      z-index: 1;
    }
    &-content {
      padding: 42px 12px 18px;
      background-color: var(--body, var(--bg_color_L2));
      border-radius: 9px;
      width: 100%;
      margin-top: -30px;
      text-align: center;
      &-title {
        font-size: 16px;
        color: var(--text_color_L1);
        font-weight: 500;
      }
      &-code {
        font-size: 11px;
        color: var(--text_color_L1);
      }
      &-desc {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 85px;
        font-size: 14px;
        color: var(--text_color_L1);
        font-weight: 500;
      }
      &-handle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 9px;
        &-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-size: 14px;
          height: 50px;
        }
        &-cancel {
          border: 1px solid #e9e9e9;
          color: #2b2b2b;
        }
        &-confirm {
          background-color: var(--primary);
          color: var(--body);
        }
      }
    }
    &-close {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
  &-btn {
    opacity: 0.6;
  }
  @keyframes dialogIn {
    from {
      transform: scale(0.8);
      opacity: 0.5;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  @keyframes dialogOut {
    from {
      transform: scale(1);
      opacity: 1;
    }
    to {
      transform: scale(0.8);
      opacity: 0.5;
    }
  }
  .dialogIn-enter-active {
    animation: dialogIn 0.2s ease-out;
  }
  .dialogIn-leave-active {
    animation: dialogOut 0.2s ease-in;
  }
}
</style>
