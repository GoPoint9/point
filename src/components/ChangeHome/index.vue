<template>
  <div class="test">
    <van-button type="primary" @click="show = !show">{{ show ? '隐藏' : '展开' }}</van-button>
    <div v-if="show" class="test_box">
      <van-button v-for="item in nameList" type="primary" @click="dynamicImportComponent(item.pageName)">
        {{
          item.name
        }}
      </van-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const nameList = [
  {
    name: 'blue',
    pageName: 'blueHome',
  },
  {
    name: 'blackGold',
    pageName: 'blackGoldHome',
  },
  {
    name: 'whiteGold',
    pageName: 'whiteGoldHome',
  },
  {
    name: 'electronic',
    pageName: 'electronic',
  },
]

const router = useRouter()
const homeViews = import.meta.glob('@/views/home/other/*.vue')

const dynamicImportComponent = async (componentName: string) => {
  if (router.currentRoute.value.name === componentName) return
  const homeComponent = homeViews[`/src/views/home/other/${componentName}.vue`]
  router.removeRoute('home')

  // 更新路由配置
  router.addRoute({
    path: '/',
    name: 'home',
    component: homeComponent,
    meta: {
      title: 'home',
      tabBar: true,
      KeepAlive: false,
    },
  })

  // 导航到新添加的路由
  router.push('/')
}

const show = ref(false)
</script>
<style lang="scss" scoped>
.test {
  position: fixed;
  bottom: 10%;
  z-index: 9999;
  button {
    margin: 0 10px;
  }
}
.test_box {
  padding: 10px;
  display: flex;
  justify-content: center;
}
</style>
