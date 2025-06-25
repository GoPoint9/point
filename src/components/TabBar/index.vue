<template>
  <div class="tabbar__container">
    <div
      v-for="(item, index) in tabBars"
      :key="item + '' + index"
      class="tabbar__container-item"
      :class="{
        active: item.name === route.name
      }"
      @click="handleClick(item.name)"
    >
      <svg-icon :name="item.name" />
      <div v-if="item.name === 'promotion'" class="promotionBg" />
      <span>
        {{ $t(item.name) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
async function handleClick (name: string) {
  await router.push({ name })
}

const tabBars = [
  {
    name: 'home',
  },
  {
    name: 'activity',
  },
  {
    name: 'promotion',
  },
  {
    name: 'wallet',
  },
  {
    name: 'main',
  },
]
</script>

<style scoped lang="scss">
.tabbar__container {
  position: fixed;
  bottom: 0;
  left: 50%;
  display: flex;
  align-items: flex-end;
  width: 750px;
  transform: translateX(-50%);
  height: 130px;
  padding-block: 0 10px;
  font-size: 22px;
  background: url('@icon/public/tabBarBg.png') no-repeat center center / cover;
  z-index: 100;

  &-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 8.78px;
    color: var(--text4, var(--text_color_L2));

    &:nth-of-type(3) {
      position: relative;

      :deep(svg) {
        position: relative;
        top: -30px;
        width: 56.28px;
        height: 48.75px;
        z-index: 3;

        path {
          fill: #fff !important;
        }
      }

      .promotionBg {
        position: absolute;
        left: 50%;
        bottom: 40px;
        transform: translate(-50%, 0);
        background: var(--bg_color_L2);
        width: 110px;
        height: 110px;
        border-radius: 50%;
        z-index: 2;

        &::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: calc(110px - 8px);
          height: calc(110px - 8px);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: var(--main_gradient-color2);
        }
      }
    }

    svg {
      display: block;
      width: 43.32px;
      height: 44.54px;
    }
    span {
      line-height: 28px;
      height: 28px;
      width: 100%;
      text-align: center;
      overflow: hidden;
    }

    &.active {
      color: var(--main-color) !important;
    }
  }
}

@media screen and (max-width: 500px) {
  .tabbar__container {
    width: 100%;
    left: 0;
    transform: translateX(0);
    html:lang(ar) & {
      left: unset;
      right: 0;
    }
  }
}
</style>
