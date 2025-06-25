import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'lib-flexible'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from '@/router'
import tools from '@/plugins/tools'
import pointObj from '@/utils/point'
pointObj.fb({ 38316220667: '2061590324241394', 42318414899: '893342322790796' })
router.addRoute({
  path: '/',
  name: 'home',
  component: () => import('@/views/home/other/redHome.vue'),
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
