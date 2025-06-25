// ? 全局不动配置项 只做导出不做修改

// * 首页地址（默认）
export const HOME_URL: string = '/home'

// * 登录页地址（默认）
export const LOGIN_URL: string = '/login'

// * 路由白名单地址
export const ROUTER_WHITE_LIST: string[] = [
  '/500',
  '/',
  '/main/About/AboutDetail',
  '/rpwd',
  '/register',
  '/main/CustomerService',
  '/main/CustomerService/ServiceCollection',
  '/maintenance',
]

// * tabbar白名单地址
export const TAB_BAR_WHITE_LIST: string[] = ['home', 'activity', 'main', 'promotion', 'chat', 'wallet']
