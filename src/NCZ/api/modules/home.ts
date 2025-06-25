import { post, apiUrls } from '@/NCZ/api'
import type { SkinList } from '@/types/ncz/index.d.ts'

export const frontSkinSetting = (): Promise<CommonObjRes<SkinList>> => {
  return post(apiUrls.frontSkinSetting)
}
export const getSiteInitData = (payload): Promise<any> => {
  // return post(apiUrls.getSiteInitData, { payload })
  return post(apiUrls.getSiteInitData, payload)
}
// 今日盈利排行榜
export const getAllMyEmerdList = (): Promise<any> => {
  return post(apiUrls.getAllMyEmerdList)
}
/**
 * @description: 获取游戏列表
 * @param {object} params
 * @return {*}
 */
export const getGameCategoryList = (): Promise<any> => {
  return post(apiUrls.getGameCategoryList, { cache: true })
}

/**
 * @description: // 取得彈窗公告 => type: 1/彈窗公告, 0/跑馬燈
 */
export const getNotices = (payload): Promise<any> => {
  return post(apiUrls.getNotices, payload)
}
// 彈窗公告
export const getAnnouncements = async (payload = { type: 0 }) => {
  return post(apiUrls.getNotices, payload)
}
/**
 * @description: 跑馬燈。轉換成 BDG 格式。
 * @param {ReqMessageList} params
 * @return {res}
 */
export const getSiteMessageList = async (params = { type: 1 }) => {
  const res = await post(apiUrls.getNotices, params)

  // 轉換成 BDG 格式
  const list = [...res.data].map(i => ({
    title: i.title,
    siteMessage: i.content,
    addtime: i.dateStr,
  }))
  res.data = {
    pageNo: 1,
    totalPage: 1,
    totalCount: list.length,
    list,
  }
  return res
}

/**
 * @description: 获取站内信列表
 * @param { } params
 * @return {*}
 */
// 首页公告
export const getSiteMessage = (): Promise<any> => {
  return post(apiUrls.GetSiteMessage) // 发送post请求，获取站内信列表
}
