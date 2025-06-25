import { createRouter, createWebHashHistory } from 'vue-router'
import { GlobalStore } from '@/stores'
import { LOGIN_URL, ROUTER_WHITE_LIST, TAB_BAR_WHITE_LIST } from '@/config/config'

// h5 routes
export default function generatorRoutes () {
  const routes = []
  let views = import.meta.glob('../views/*/index.vue')
  let subViews = import.meta.glob('../views/*/*/index.vue')
  let subSubViews = import.meta.glob('../views/*/*/*/index.vue')
  const keepAliveList = ['AllGames']
  for (const path in views) {
    const name = path.split('/')[2]
    if (name === 'home') continue
    routes.push({
      path: name === 'home' ? '/' : `/${name}`,
      name,
      component: views[path],
      meta: {
        title: name,
        tabBar: TAB_BAR_WHITE_LIST.includes(name),
        keepAlive: keepAliveList.includes(name),
      },
    })
  }
  views = null
  for (const path in subViews) {
    const subPath = '/' + path.split('/')[2] + '/' + path.split('/')[3]
    const name = path.split('/')[3]
    if (subPath.includes('components')) break
    routes.push({
      path: subPath,
      name,
      component: subViews[path],
      meta: {
        title: path.split('/')[3],
        parent: path.split('/')[2],
        tabBar: false,
        keepAlive: keepAliveList.includes(name),
      },
    })
  }
  subViews = null
  for (const path in subSubViews) {
    const subPath = '/' + path.split('/')[2] + '/' + path.split('/')[3] + '/' + path.split('/')[4]
    const name = path.split('/')[3] + '-' + path.split('/')[4]
    if (subPath.includes('components')) break
    routes.push({
      path: subPath,
      name,
      component: subSubViews[path],
      meta: {
        title: path.split('/')[4],
        parent: path.split('/')[3],
        tabBar: false,
        keepAlive: keepAliveList.includes(name),
      },
    })
  }
  subSubViews = null
  const asyncRouter = [
    {
      path: '/:pathMatch(.*)',
      redirect: '/',
      meta: {
        title: 'NotFound',
        tabBar: false,
        keepAlive: false,
      },
    },
  ]

  routes.push(...asyncRouter)
  const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior (to, from, savedPosition) {
      return { top: 0 }
    },
  })

  router.beforeEach((to, from, next) => {
    const globalStore = GlobalStore()
    // 允许修改登录密码页 跳转到 登录页
    const toLoginPaths = [
      '/',
      '/main',
      '/activity',
      '/promotion',
      '/wallet',
      '/main/About/AboutDetail',
      '/main/SettingCenter/LoginPassword',
      '/main/SettingCenter',
      '/maintenance',
    ]
    // 是否允许跳转登录页
    if (Number(localStorage.getItem('isToLogin')) == 1 || (toLoginPaths.includes(from.path) && to.path === LOGIN_URL)) {
      localStorage.setItem('isToLogin', '2')
      return next()
    }

    if (to.path === LOGIN_URL) {
      console.log('11111111_from.fullPath', from.fullPath)
      if (globalStore.token) {
        return next('/')
      }
      console.log('22222222_from.fullPath', from.fullPath)
      return next()
    }
    if (ROUTER_WHITE_LIST.includes(to.path)) return next()

    if (!globalStore.token) return next({ path: LOGIN_URL, replace: true })

    next()
  })

  return router
}
