<template>
  <div class="tabbar__container">
    <div
      v-for="(item, index) in tabBars"
      :key="item + '' + index"
      class="tabbar__container-item"
      :class="{
        active: item.name === route.name,
        noShowBgC: index == 2
      }"
      @click="handleClick(item.name)"
    >
      <svg-icon :name="`p4_${item.name}`" />
      <div v-if="item.name === 'promotion'" class="promotionBg">
        <svg-icon :name="`p4_${item.name}`" />
      </div>
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
  width: 750px;
  transform: translateX(-50%);
  height: 138px;
  font-size: 22px;
  background: var(--bg_color_L3);
  z-index: 100;
  align-items: center;
  border-radius: 20px 20px 0 0;

  &-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8.78px;
    color: rgba(255, 255, 255, 0.5);
    height: 100%;
    margin: 0 15px;
    text-align: center;

    &:nth-of-type(3) {
      position: relative;

      img {
        opacity: 0;
      }

      .promotionBg {
        position: absolute;
        left: 50%;
        bottom: 65px;
        transform: translate(-50%, 0);
        width: 104px;
        height: 104px;
        border-radius: 50%;
        z-index: 2;
        background: var(--main_gradient-color2);
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          display: block;
          width: 50px;
          height: 50px;
        }
      }

      &.active {
        border-top: none;
      }
    }
    svg {
      display: block;
      width: 40px;
      height: 40px;
      fill: #7e8997;
    }

    &.active {
      color: #fff;
      background: linear-gradient(180deg, rgba(236, 170, 0, 0.5) 0%, rgba(250, 35, 103, 0) 100%);
      border-radius: 0px 0px 0px 0px;
      border-top: 6px solid #ecaa00;
      svg {
        fill: #fff;
      }
    }

    &.noShowBgC {
      background: none;
    }
  }
}

@media screen and (max-width: 500px) {
  .tabbar__container {
    width: 100%;
    left: 0;
    transform: translateX(0);
  }
}
</style>
