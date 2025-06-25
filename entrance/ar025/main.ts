import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'lib-flexible'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from '@/router'
import tools from '@/plugins/tools'
import pointObj from '@/utils/point'
if (import.meta.env.VITE_POINT) {
  pointObj[import.meta.env.VITE_POINT]()
}
router.addRoute({
  path: '/',
  name: 'home',
  component: () => import('@/views/home/other/whiteGoldHome.vue'),
  meta: {
    title: 'home',
    tabBar: true,
    keepAlive: false,
  },
})
const app = createApp(App)
const pinia = createPinia()
tools(app)
pinia.use(piniaPluginPersistedstate)

app.use(router).use(pinia)
app.mount('#app')
