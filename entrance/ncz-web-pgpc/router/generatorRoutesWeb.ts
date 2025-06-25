import { createRouter, createWebHistory } from 'vue-router'

import WebHome from '@entrance/ncz-web-pgpc/views/WebHome.vue'
import SideMenu from '@entrance/ncz-web-pgpc/components/SideMenu.vue'

import PageHeader from '@entrance/ncz-web-pgpc/components/PageHeader.vue'
import Footer from '@entrance/ncz-web-pgpc/components/Footer.vue'

// name: 'Promotions',
// components: {
//   default: () => import('@entrance/ncz-web-pgpc/views/Promotion/Promotion.vue'),

const homeLayout = {
  default: WebHome,
  SideMenu,
  header: PageHeader,
  footer: Footer,
}

// web routes
export default function generatorRoutesWeb () {
  const routes = [
    {
      path: '/:path(index|index.html|home|)',
      name: 'index',
      components: homeLayout,
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   components: homeLayout,
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   components: homeLayout,
    // },
    {
      path: '/help',
      name: 'Help',
      components: homeLayout,
    },

    // {
    //   path: '/:path(index|index.html|home|)',
    //   name: 'index',
    //   components: {
    //     default: home_view,
    //     header: Jn,
    //     footer: ta,
    //     sideMenu: sideMenu,
    //   },
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   components: {
    //     default: home_view,
    //     header: Jn,
    //     footer: ta,
    //     sideMenu: sideMenu
    //   }
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   components: {
    //     default: home_view,
    //     header: Jn,
    //     footer: ta,
    //     sideMenu: sideMenu
    //   }
    // },
    // {
    //   path: '/agent',
    //   name: 'Agent',
    //   components: {
    //     agent: agent_components
    //   }
    // },
    // {
    //   path: '/agentHome',
    //   name: 'AgentHome',
    //   components: {
    //     agent: wn
    //   }
    // },
    // {
    //   path: '/member',
    //   name: 'member',
    //   components: {
    //     default: Ya,
    //     header: Jn,
    //     footer: ta,
    //     sideMenu: sideMenu
    //   }
    // },
    // {
    //   path: '/help',
    //   name: 'Help',
    //   components: {
    //     default: home_view,
    //     header: Jn,
    //     footer: ta,
    //     sideMenu: sideMenu
    //   }
    // },
    // {
    //   path: '/:gameType(\\b|sports|esports|lott|elott\\b)',
    //   name: 'GameCenter',
    //   components: {
    //     default: ja,
    //     header: Jn,
    //     footer: ta,
    //     sideMenu: sideMenu
    //   }
    // },
    // {
    //   path: '/:gameType(\\b|live|fish|rng|pvp\\b)',
    //   name: 'GameListCenter',
    //   components: {
    //     default: Za,
    //     header: Jn,
    //     footer: ta,
    //     sideMenu: sideMenu
    //   }
    // },
    // {
    //   path: '/:type(\\b|favorite|recent\\b)',
    //   name: 'accountGame',
    //   components: {
    //     default: Xa,
    //     header: Jn,
    //     footer: ta,
    //     sideMenu: sideMenu
    //   }
    // },
    // {
    //   path: '/lottery',
    //   name: 'lottery',
    //   components: {
    //     default: Ka,
    //     header: Jn,
    //     sideMenu: sideMenu
    //   },
    //   meta: {
    //     requireAuth: !0
    //   }
    // },
    // {
    //   path: '/seaLottery',
    //   name: 'seaLottery',
    //   components: {
    //     default: Ka,
    //     header: Jn,
    //     sideMenu: sideMenu
    //   },
    //   meta: {
    //     requireAuth: !0
    //   }
    // },
    // {
    //   path: '/vnLottery',
    //   name: 'vnLottery',
    //   components: {
    //     default: Ka,
    //     header: Jn,
    //     sideMenu: sideMenu
    //   },
    //   meta: {
    //     requireAuth: !0
    //   }
    // },
    {
      path: '/promotions',
      name: 'Promotions',
      components: {
        default: () => import('@entrance/ncz-web-pgpc/views/Promotion'),
        SideMenu,
        header: PageHeader,
        footer: Footer,
      },
    },
    // {
    //   path: '/promotions',
    //   name: 'Promotions',
    //   components: {
    //     default: Qa,
    //     header: Jn,
    //     footer: ta,
    //     sideMenu: sideMenu
    //   }
    // },
    // {
    //   path: '/pointMall',
    //   name: 'pointMall',
    //   components: {
    //     default: Ja,
    //     header: Jn,
    //     footer: ta,
    //     sideMenu: sideMenu
    //   }
    // },
    // {
    //   path: '/seamless',
    //   name: 'Seamless',
    //   components: {
    //     default: Wa,
    //     header: Jn,
    //     sideMenu: sideMenu
    //   }
    // }
  ]
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
  console.log('[entrance/ncz-web-pgpc/router/index.ts]routes', routes)
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior (to, from, savedPosition) {
      return { top: 0 }
    },
  })

  const body = document.querySelector('body')
  router.beforeEach((to, from, next) => {
    // console.log(' [beforeEach] ', to, from)
    // if(to.hash) debugger
    next()
  })
  router.afterEach((to, from) => {
    // console.log(' [afterEach] ', to, from)
    if (to.name !== from.name) {
      body.scrollTop = 0
      // console.warn(' [afterEach] window.cover.loader false ')
      window.cover.loader(false)
    }
  })

  return router
}

/**

da = [{
  path: "/:path(index|index.html|home|)",
  name: "index",
  components: { default: dn, header: ri, footer: pi, sideMenu: na }
},
{
  path: "/login",
  name: "login",
  components: { default: dn, header: ri, footer: pi, sideMenu: na }
},
{
  path: "/register",
  name: "register",
  components: { default: dn, header: ri, footer: pi, sideMenu: na }
},
{
  path: "/help",
  name: "Help",
  components: { default: dn, header: ri, footer: pi, sideMenu: na }
},
{
  path: "/agent",
  name: "Agent",
  components: { agent: Pn }
},
{
  path: "/agentHome",
  name: "AgentHome",
  components: { agent: Tn }
},
{
  path: "/member",
  name: "member",
  components: { default: sa, header: ri, footer: pi, sideMenu: na }
},
{
  path: "/:gameType(\\b|sports|esports|lott|elott\\b)",
  name: "GameCenter",
  components: { default: ia, header: ri, footer: pi, sideMenu: na }
},
{
  path: "/:gameType(\\b|live|fish|rng|pvp\\b)",
  name: "GameListCenter",
  components: { default: aa, header: ri, footer: pi, sideMenu: na }
},
{
  path: "/:type(\\b|favorite|recent\\b)",
  name: "accountGame",
  components: { default: ua, header: ri, footer: pi, sideMenu: na }
},
{
  path: "/lottery",
  name: "lottery",
  components: { default: la, header: ri, sideMenu: na },
  meta: { requireAuth: !0 }
},
{
  path: "/seaLottery",
  name: "seaLottery",
  components: { default: la, header: ri, sideMenu: na },
  meta: { requireAuth: !0 }
},
{
  path: "/vnLottery",
  name: "vnLottery",
  components: { default: la, header: ri, sideMenu: na },
  meta: { requireAuth: !0 }
},
{
  path: "/promotions",
  name: "Promotions",
  components: { default: oa, header: ri, footer: pi, sideMenu: na }
},
{
  path: "/pointMall",
  name: "pointMall",
  components: { default: ra, header: ri, footer: pi, sideMenu: na }
},
{
  path: "/seamless",
  name: "Seamless",
  components: { default: ca, header: ri, sideMenu: na }
}]

 */
