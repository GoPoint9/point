import { post, apiUrls } from '@/NCZ/api'
import '@/plugins/md5.min.js'

// TODO: append: loginName

// 登录
export const login = (data: Login.ReqLoginForm) => {
  return post(apiUrls.login, { data, alert: true })
}
// 登出
export const loginOut = () => {
  return post(apiUrls.loginOut, { alert: true })
}
// 取得會員餘額
export const getUserBanlance = (payload) => {
  return post(apiUrls.getUserBanlance, payload)
}

// // 修改個人信息 { loginName, userSex, userBirthDay, userNickName, userRealName, userMobile, userMail }
// export const savePersonalInfo = (payload) => {
//   return post(apiUrls.savePersonalInfo, payload)
// }

// 修改使用者頭像 { loginName, imgName }
export const savePersonalImg = (payload) => {
  return post(apiUrls.savePersonalImg, payload)
}
// 修改使用者暱稱 { userNickName }
export const saveNickName = (payload) => {
  return post(apiUrls.saveNickName, payload)
}
// 修改登入密碼 { userNickName }
export const updateLoginMemberPassword = (data) => {
  return post(apiUrls.updateLoginMemberPassword, { data, alert: true })
}

// 彩票類別查詢
export const getCpGameCategory = () => {
  return post(apiUrls.getCpGameCategory)
}

// 彩票投注查詢
// {
//   pageNo: data.pageNo,
//   pageSize: data.pageSize,
//   playId: data.playId, // 遊戲類型(必填項目)
//   searchDate: data.searchDate, // 查詢日期,不帶時預設查前2個月資料
// },
export const getNewMyEmerdList = (payload) => {
  return post(apiUrls.getNewMyEmerdList, payload)
}

// 第三方類別查詢
// categoryType: data.categoryType, // 查詢類別,必填 1:視訊,2:捕魚,3:棋牌,4:小遊戲,5:電子
export const getExtGameCategory = (payload) => {
  return post(apiUrls.getExtGameCategory, payload)
}

// 第三方投注查詢
// {
//   pageNo: data.pageNo,
//   pageSize: data.pageSize,
//   extGamePlatformIds: data.extGamePlatformIds, // 遊戲平台id
//   searchDate: data.searchDate, // 查詢日期,不帶時預設查前2個月資料
// },
export const getExtNewMyEmerdList = (payload) => {
  return post(apiUrls.getExtNewMyEmerdList, payload)
}

// 取得等级头衔资料
export const getPersonalLevel = () => {
  return post(apiUrls.getPersonalLevel)
}

// NCZ 保險箱
export const getPubSiteSafe = () => {
  return post(apiUrls.getPubSiteSafe)
}

