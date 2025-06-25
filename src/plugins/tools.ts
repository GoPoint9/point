import type { App } from 'vue'
import 'vant/lib/index.css'
// import './index.css'
import '@/assets/styles/reset.scss' // 样式初始化
import '@/assets/styles/common.scss' // 通用样式文件
import 'vite:style'
// // import '@/assets/styles/tbox.scss' // 适配文件
// const VITE_HOME = import.meta.env.VITE_HOME;
// const MAINCOLOR = import.meta.env.VITE_MAINCOLOR;
// if(import.meta.env.VITE_HOME) {
// 	import(`@/assets/styles/other/${VITE_HOME}/reset.scss`)
// }
// console.log('MAINCOLOR', import.meta.env)
// import(`@/assets/${MAINCOLOR}/reset.scss`)
// import(`@/assets/${MAINCOLOR}/root.scss`)
// import(`@/assets/${MAINCOLOR}/icons/${VITE_HOME}/${VITE_HOME}.scss`)

import {
  ActionSheet,
  Radio,
  RadioGroup,
  Sidebar,
  SidebarItem,
  Grid,
  GridItem,
  Checkbox,
  Button,
  Sticky,
  Icon,
  Tab,
  Tabs,
  Progress,
  Dialog,
  Divider,
  Collapse,
  CollapseItem,
  Switch,
  Loading,
  Circle,
  DatePicker,
  Col,
  Row,
  Field,
  Popup,
  Picker,
  CountDown,
  Slider,
  List,
  Toast,
  Skeleton,
  Uploader,
  Calendar,
  PullRefresh,
  Badge,
  Popover,
  Image,
  DropdownMenu,
  DropdownItem
} from 'vant'
import I18n from '@/languages/index'
import directives from '@/directives/index'
import { filter } from '@/utils'
import NavBar from '@/components/common/NavBar.vue'
import LoadingView from '@/components/common/LoadingView.vue'
import svgIcon from '@/components/common/svgIcons.vue'
import ArSelect from '@/components/common/ArSelect.vue'
export default (app: App<Element>) => {
  app.component('NavBar', NavBar)
  app.component('LoadingView', LoadingView)
  app.component('ArSelect', ArSelect)
  app.component('SvgIcon', svgIcon)
  app
    .use(ActionSheet)
    .use(Radio)
    .use(RadioGroup)
    .use(Sidebar)
    .use(SidebarItem)
    .use(Grid)
    .use(GridItem)
    .use(Checkbox)
    .use(Button)
    .use(Sticky)
    .use(Icon)
    .use(Tab)
    .use(Tabs)
    .use(Progress)
    .use(Dialog)
    .use(Divider)
    .use(Collapse)
    .use(CollapseItem)
    .use(Switch)
    .use(Loading)
    .use(Circle)
    .use(DatePicker)
    .use(Col)
    .use(Row)
    .use(Slider)
    .use(List)
    .use(Field)
    .use(Toast)
    .use(Popup)
    .use(Picker)
    .use(CountDown)
    .use(Skeleton)
    .use(Uploader)
    .use(Calendar)
    .use(PullRefresh)
    .use(Badge)
    .use(Popover)
    .use(I18n)
    .use(directives)
    .use(Image)
    .use(DropdownMenu)
    .use(DropdownItem)
  const GLOBAL_ATTR = app.config.globalProperties
  const $u = {}
  $u.TopHeight = 38
  // 全局注册过滤器
  Object.keys(filter.refiter).forEach(filterName => {
    $u[filterName] = filter.refiter[filterName]
  })
  GLOBAL_ATTR.$u = $u
}
