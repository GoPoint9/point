<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import lottie from 'lottie-web/build/player/lottie_light'
import { useHome } from '@/hooks'

interface IProps {
  loading: boolean
  type: 'loading' | 'skeleton'
  isGame: boolean
}
const props = defineProps<IProps>()
const element = ref()
let animat: any = null
const { homeState, downloadIcon, webSiteUrl } = useHome()
const href = computed(() => location.origin || '')
onMounted(async () => {
  const name = import.meta.env.VITE_BASE_PROJECTNAME
  if (!name) return
  await nextTick()
  animat = lottie.loadAnimation({
    container: element.value, // the dom element
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/data.json',
  })
})
watch(
  () => props.loading,
  () => {
    const isDefault = props.type === 'loading' && !props.isGame
    if (!isDefault) return
    if (props.loading) {
      animat && animat.play()
    } else {
      animat && animat.stop()
    }
  }
)
onBeforeUnmount(() => {
  animat && animat.destroy()
  animat = null
})
</script>

<template>
  <div v-show="loading" class="ar-loading-view">
    <slot name="template">
      <div v-show="type === 'loading'" class="loading-wrapper">
        <!-- <VanLoading /> -->
        <div v-show="!isGame" ref="element" class="loading-animat" />
        <div v-show="isGame" class="com__box">
          <!-- loading -->
          <div class="loading">
            <div class="shape shape-1" />
            <div class="shape shape-2" />
            <div class="shape shape-3" />
            <div class="shape shape-4" />
          </div>

          <!-- 说明：组件名 -->
        </div>
        <!-- <div class="animation"></div> -->
      </div>
      <div v-show="type === 'skeleton'" class="skeleton-wrapper">
        <VanSkeleton :row="10" />
        <VanSkeleton title avatar :row="5" />
        <VanSkeleton title :row="5" />
      </div>
    </slot>
  </div>

  <slot />

  <van-popup
    v-model:show="homeState.iosDialog"
    round
    closeable
    position="bottom"
    :style="{ height: '40%' }"
  >
    <div class="iosDialog">
      <div class="title">{{ $t('pwaInstall') }}</div>
      <div class="websit_info">
        <img class="icon" :src="downloadIcon">
        <div class="link">
          <div>{{ href.split('://')[1] }}</div>
          <div>{{ href }}</div>
        </div>
      </div>
      <div class="text">1. {{ $t('pwaText1') }} <svg-icon name="share" /></div>
      <div class="text">
        2. {{ $t('pwaText2') }} <span>{{ $t('pwaText3') }} <svg-icon name="add_icon" /></span>
      </div>
      <div class="text">3. {{ $t('pwaText4') }} <img class="icon" :src="downloadIcon"></div>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.ar-loading-view {
  /* background: white; */
  /* background: transparent; */
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 999;
  left: 0;
  position: fixed;
  .loading-animat {
    width: 300px;
    height: 300px;
  }
  .loading-wrapper {
    pointer-events: none;

    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 100px; */
    height: 100%;
    position: absolute;
    width: 100%;

    img {
      width: 200px;
    }

    .van-loading {
      z-index: 999;
    }
  }

  .skeleton-wrapper {
    padding: 20px 10px;
  }
}
.com__box {
  position: relative;
  width: 200px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.loading {
  width: 120px;
  height: 120px;
  position: relative;
  transform: rotate(45deg);
  animation: animationContainer 1s ease infinite;
}

.shape {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
}

.shape-1 {
  background-color: rgb(12, 103, 215, 1);
  left: 0;
  animation: animationShape1 0.3s ease infinite alternate;
  html:lang(ar) & {
    right: 0;
    left: unset;
  }
}

.shape-2 {
  background-color: rgb(205, 55, 28, 1);
  right: 0;
  animation: animationShape2 0.3s ease infinite 0.3s alternate;
  html:lang(ar) & {
    right: unset;
    left: 0;
  }
}

.shape-3 {
  background-color: rgb(44, 157, 63, 1);
  bottom: 0;
  animation: animationShape3 0.3s ease infinite 0.3s alternate;
}

.shape-4 {
  background-color: rgb(236, 167, 18, 1);
  right: 0;
  bottom: 0;
  animation: animationShape4 0.3s ease infinite alternate;
}

@keyframes animationContainer {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes animationShape1 {
  0% {
    transform: translate(10px, 10px);
  }

  100% {
    transform: translate(-6px, -6px);
  }
}

@keyframes animationShape2 {
  0% {
    transform: translate(-10px, 10px);
  }

  100% {
    transform: translate(6px, -6px);
  }
}

@keyframes animationShape3 {
  0% {
    transform: translate(10px, -10px);
  }

  100% {
    transform: translate(-6px, 6px);
  }
}

@keyframes animationShape4 {
  0% {
    transform: translate(-10px, -10px);
  }

  100% {
    transform: translate(6px, 6px);
  }
}
</style>

<!-- <style lang="scss" scoped>
$imgCount: 20;

.animation {
	position: absolute;
	width: 200px;
	height: 200px;
	animation: animation 2s infinite;
}

@keyframes animation {
	@for $i from 1 through $imgCount {
		#{(($i * 100%)/$imgCount)} {
			background-image: url('../../assets/icons/images/loadings/Loading_#{$i}.png');
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
		}
	}
}
</style> -->
