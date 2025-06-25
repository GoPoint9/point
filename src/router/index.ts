// import { createRouter, createWebHashHistory } from 'vue-router'
// import { GlobalStore } from '@/stores'
// import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/config/config'

import generatorRoutesH5 from '@/router/generatorRoutesH5.ts'
import generatorRoutesWeb from '@entrance/ncz-web-pgpc/router/index.ts'

// const IS_WEB = import.meta.env.VITE_APP_TYPE === 'web_pgpc'
const router = import.meta.env.VITE_APP_IS_WEB_PGPC ? generatorRoutesWeb() : generatorRoutesH5()

export default router
