import { useRouter } from 'vue-router'
import List from '@/components/common/ServiceLIst.vue'
import { getIcons, AwaitApiResult, partyUrl } from '@/utils'
import { isHybridApp, openBrowser, openHybrid } from '@/utils/jsBridge'
import {
  GetAgentServiceTypeList,
  GetCustomerServiceTypelist,
  GetAgentServiceList,
  GetCustomerServiceList,
  GetCustomerServiceGroup,
  GetSelfCustomerServiceLink
} from '@/api'
import { computed, reactive, ref } from 'vue'
import { SettingStore } from '@/stores'
import { data } from 'autoprefixer'
interface Options {
  ServerType: Number
}

export function useServer (options: Options) {
  const router = useRouter()
  const { ServerType } = options // 1:推广代理客服 2:个人中心客服
  const isCenterServer = computed(() => SettingStore().getIsSelfCustomerService)
  const serverState = reactive({
    ContactList: [],
    CollectionList: [],
  })
  const serviceGroup = ref() // 客服群
  // 一级页面分类
  const ContactList = computed(() => serverState.ContactList)
  // 二级页面分类
  const CollectionList = computed(() => serverState.CollectionList)
  let lock = false

  // 返回上一页
  function goBack () {
    router.go(-1)
  }
  // 进入客服房间
  function onItemClick (item: any) {
    router.push({
      name: ServerType == 1 ? 'Server-ServiceCollection' : 'CustomerService-ServiceCollection',
      state: { itemId: item.typeID },
    })
  }
  // 打开客服聊天框
  function onClickUrl (item: any) {
    if (!item.url) {
      return
    }
    if (isHybridApp()) {
      openBrowser('recharge', {
        url: item.url,
        returnType: '1',
        gameName: '',
      })
      return
    }
    partyUrl(item.url)
    // window.open(item, '_blank')
  }
  // 获取客服列表
  const getList = async () => {
    const res = await AwaitApiResult(ServerType == 1 ? GetAgentServiceTypeList() : GetCustomerServiceTypelist())
    if (res) {
      serverState.ContactList = res.data || []
    }
  }
  // 获取客服列表二级页面 对应typeId客服通道
  const getServiceList = async (type: any) => {
    const res = await AwaitApiResult(ServerType == 1 ? GetAgentServiceList(type) : GetCustomerServiceList(type))
    if (res) {
      serverState.CollectionList = res.data || []
    }
  }

  // 客服群入
  async function getCustomerServiceGroup () {
    const res = await AwaitApiResult(GetCustomerServiceGroup())
    if (res) {
      serviceGroup.value = res.data || {}
    }
  }
  // 获取客服中心地址
  const getSelfCustomerServiceLink = async () => {
    if (lock) return
    if (!isCenterServer.value) {
      return router.push({ name: 'CustomerService' })
    }
    lock = true
    const deferredRedirect: Promise<any> = new Promise((resolve) => {
      resolve(window.open('about:blank', '_blank'))
    })
    const webSite = window.location.origin || ''
    const res = await AwaitApiResult(GetSelfCustomerServiceLink(encodeURIComponent(webSite)))
    if (res?.data) {
      if (isHybridApp()) {
        openBrowser('recharge', {
          url: res.data,
          returnType: '1',
          gameName: '',
        })
        return
      }
      deferredRedirect.then((newWindow) => {
        if (newWindow) {
          newWindow.location.href = res.data
        }
      })
    } else {
      router.push({ name: 'CustomerService' })
    }
    lock = false
  }
  // 充值跳转客服中心
  const goToTictek = async (item: any, isC2C: boolean = false) => {
    if (lock) return
    if (!isCenterServer.value || isC2C || ![0, 2].includes(item.state)) return
    lock = true
    const webSite = window.location.origin || ''
    const deferredRedirect: Promise<any> = new Promise((resolve) => {
      resolve(window.open('about:blank', '_blank'))
    })
    const res = await AwaitApiResult(GetSelfCustomerServiceLink(encodeURIComponent(webSite)))
    const url = res?.data + `&rechargeNumber=${item.rechargeNumber}&amount=${item.price}`
    if (res?.data) {
      if (isHybridApp()) {
        openBrowser('recharge', {
          url,
          returnType: '1',
          gameName: '',
        })
        return
      }
      deferredRedirect.then((newWindow) => {
        if (newWindow) {
          newWindow.location.href = url
        }
      })
    }
    lock = false
  }
  return {
    List,
    getIcons,
    goBack,
    onItemClick,
    onClickUrl,
    getList,
    ContactList,
    getServiceList,
    CollectionList,
    serviceGroup,
    getCustomerServiceGroup,
    isCenterServer,
    getSelfCustomerServiceLink,
    goToTictek,
  }
}
