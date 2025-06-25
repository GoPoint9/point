<template>
  <div class="dropdown">
    <div class="dropdown__value" @click="!disabled ? (active = !active) : null">
      <span>+{{ typeValue }}</span>
      <van-icon name="arrow-down" :class="{ arrowActive: active }" />
    </div>
    <div class="dropdown__list" :class="{ active: active }">
      <template v-if="areaCodeList?.length">
        <div
          v-for="(item, index) in areaCodeList"
          :key="index"
          class="dropdown__list-item"
          :class="{ active: item[1].dialCode.includes(typeValue) }"
          @click="handleClick(item[1].dialCode)"
        >
          <span>{{ item[1].dialCode }}</span>
          {{ item[1].name }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import countryList from './countryList'
import { SettingStore } from '@/stores'
withDefaults(
  defineProps<{
    disabled?: boolean
    typeValue: string
  }>(),
  {
    disabled: false,
  }
)
const settingS = SettingStore()
const emits = defineEmits<{
  (e: 'changeT', val: string): void
}>()
const active = ref(false)
const list = Object.entries(countryList)
function handleClick (e: string) {
  emits('changeT', e.replace('+', ''))
  active.value = !active.value
}

const areaCodeList = computed(() => {
  const areaCodeList = settingS.getAreaPhoneLenList.map(item => item.area)
  if (areaCodeList.length) {
    return list.filter(item => {
      return areaCodeList.includes(item[1].dialCode)
    })
  } else {
    return list
  }
})

const close = () => {
  active.value = false
}
onMounted(async () => {})
defineExpose({ close })
</script>

<style lang="scss" scoped>
.dropdown {
  position: absolute;
  width: 186px;
  height: 88px;
  color: var(--text_color_L2);
  text-align: center;
  line-height: 88px;
  background: var(--bg_color_L2);
  outline: none;
  border-radius: 20px;

  &__value {
    display: flex;
    align-items: center;
    padding-left: 30px;
    font-size: 30px;
    cursor: pointer;

    span {
      width: 68px;
      height: 88px;
    }

    i {
      margin-left: 10px;
      transition: transform 0.3s ease;
    }

    .arrowActive {
      transform: rotate(180deg);
    }
  }

  &__list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 646px;
    font-size: 28px;
    height: 20px;
    text-align: start;
    opacity: 0;
    border-radius: 10px;
    background-color: var(--bg_color_L2);
    overflow: hidden;
    z-index: 1;
    overflow-y: scroll;
    transition: opacity 0.2s ease-in-out, height 0.2s ease-in-out;
    html:lang(ar) & {
      left: unset;
      right: 0;
    }
    &::-webkit-scrollbar {
      width: 0;
    }

    &-item {
      padding-left: 30px;
      cursor: pointer;

      span {
        display: inline-block;
        width: 100px;
      }

      &.active {
        background: var(--main-color);
        color: #fff;
      }
    }

    &.active {
      height: 400px;
      //max-height: 350px;
      opacity: 1;
      z-index: 10;
    }
  }
}

#app.web_pgpc {
  // .dropdown {
  //   width: initial;
  //   height: initial;
  // }
  .dropdown {
    // width: initial;
    // height: initial;
    // line-height: initial;
    width: 80px;
    height: $webInputBaseHeight;
    line-height: $webInputBaseHeight;
    border-radius: 10px;

    &__value {
      display: flex;
      padding-left: $webInputBaseSize;
      font-size: $webInputBaseSize;
      span {
        width: 68px;
        height: $webInputBaseHeight;
        width: initial;
        height: initial;
      }
      i {
        margin-left: 10px;
      }
    }
    &__list {
      position: absolute;
      top: 100%;
      left: 0;
      width: 646px;
      font-size: 28px;
      height: 20px;
      text-align: start;
      opacity: 0;
      border-radius: 10px;
      background-color: var(--bg_color_L2);
      overflow: hidden;
      z-index: 1;
      overflow-y: scroll;
      transition: opacity 0.2s ease-in-out, height 0.2s ease-in-out;
      html:lang(ar) & {
        left: unset;
        right: 0;
      }
      &::-webkit-scrollbar {
        width: 0;
      }
      &-item {
        padding-left: 30px;
        span {
          width: 100px;
        }
      }
      &.active {
        height: 400px;
        opacity: 1;
        z-index: 10;
      }
    }
  }
}
</style>
