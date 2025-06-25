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
      <svg-icon v-if="index !== 2" :name="item.name === route.name ? `p3_${item.name}_a` : `p3_${item.name}`" />
      <div v-if="index == 2" class="promotionBg">
        <svg-icon :name="item.name === route.name ? `p3_${item.name}_a` : `p3_${item.name}`" />
      </div>
      <span v-else>
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
    name: 'promotion',
  },
  {
    name: 'activity',
  },
  {
    name: 'home',
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
  background: #08081c;
  z-index: 100;

  &-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 8.78px;
    color: var(--text_color_L2);

    &:nth-of-type(3) {
      .promotionBg {
        background: var(--main_gradient-color2);
        width: 120px;
        height: 76px;
        border-radius: 38px;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    svg {
      display: block;
      width: 40px;
      height: 40px;
    }

    &.active {
      color: var(--text_color_L1);
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
