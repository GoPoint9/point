import axios from 'axios'
import api from '@/api/url'
import '@/plugins/md5.min.js'
import { post } from '@/api/axios'
import type {
  Login,
  RegisterReq,
  ResetPasswordReq,
  TaskList,
  ResRegisterState,
  GameBetRecord,
  getThirdRewardsRecord
  , ForgetPasswordReq, EditNickNameReq, EditUserPhotoReq
} from '@/types/api'

// 登录
export const login = async (params: Login.ReqLoginForm, headSet: any) => {
  return post(api.Login, params, {}, headSet)
}
// 获取用户信息
export const GetUserInfo = (params: any): Promise<any> => {
  return post(api.GetUserInfo, params)
}

// phone string
// name string
/**
 * @name- sms_verifycode:验证手机号有效性
 *  sms_regvcode:注册验证手机号，防止重复注册
 * 	sms_loginvode:登录验证手机号
 *  sms_forgetvode: 忘记密码验证手机号
 * 	sms_withdrawcode: 添加银行卡验证手机号
 * */
export const getSmsVerCode = (params: object) => {
  return post(api.SmsVerifyCode, params)
}
// 验证手机验证码
export const verifyPhoneCode = (params: object) => {
  return post(api.VerifyPhoneCode, params)
}
// 更换手机号码
export const resetPhoneNum = (params: object) => {
  return post(api.ResetPhoneNum, params)
}

//	注册
export const Register = (data: RegisterReq, headSet: any) => {
  data.pwd = md5(data.pwd)
  return post(api.Register, data, {}, headSet)
  // return post(api.Register, data).then((res) => res.data)
}

// 验证是否开放注册和短信注册
export const RegisterState = (): Promise<CommonObjRes<CommonObjRes<ResRegisterState>>> => {
  return post(api.RegisterState)
}
//	登出
export const LoginOff = (data: object) => {
  return post(api.LoginOff, data).then((res) => res.data)
}

//	重置密码
export const ForgetPassword = (data: ForgetPasswordReq) => {
  data.password = md5(data.password)
  return post(api.ForgetPassword, data)
}
//  修改登录密码
export const ResetPassword = (data: ResetPasswordReq) => {
  data.oldPwd = md5(data.oldPwd)
  data.newPwd = md5(data.newPwd)
  data.confirmNewPwd = md5(data.confirmNewPwd)

  return post(api.ResetPassword, data)
  // return post(api.ResetPassword, data).then((res) => res.data)
}

// 修改图像
export const EditUserPhoto = (data: EditUserPhotoReq) => {
  return post(api.EditUserPhoto, data)
}
export const refreshToken = async (params: any = {}, headSet: any) => {
  let data = ''
  try {
    // https://tosma.lhlasjdanc.com/
    const res = await axios.post('http://testplan.abozsmgppfp.com')
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    if (res.data && ipRegex.test(res.data)) {
      console.log('getIp', res.data)
      data = res.data || ''
    }
  } catch (error) {}
  return post(api.RefreshToken, params, {}, { 'AR-REAL-IP': data })
}

// 修改昵称
export const EditNickName = (data: EditNickNameReq) => {
  return post(api.EditNickName, data)
}
// export const SetTaskOrder = (data: any) => {
// 	return post(api.SetTaskOrder, data).then((res) => res)
// }
/**
 * @description: 领取邀请人奖励
 * @param {*} params any
 * @return {*} any
 */
export const SetTaskOrder = (params: any): Promise<any> => {
  return post(api.SetTaskOrder, params).then((res) => res)
}

/**
 * @description: 获取邀请好友任务列表
 * @param {*} Promise any
 * @return {*} any
 */
export const getTaskList = async (): Promise<TaskList> => {
  return post(api.GetTaskList).then((res) => res.data)
}

/**
 * @description: 下注记录获取三方游戏类型
 * @param {ReqOnlineGameList} params
 * @return {*}
 */
export const getGameBetRecordType = (params: { categoryType: number }): Promise<CommonObjRes<GameBetRecord[]>> => {
  // 捕鱼和小游戏调用不同的接口
  if (params.categoryType == 3 || params.categoryType == 6) {
    return post(api.GetSmallGameOrFishList, { gameType: params.categoryType })
  }
  return post(api.GetThirdGameCategory, params)
}

// 获取验证码
export const GetCodeModel = (params: any): Promise<any> => {
  return post(api.GetCodeModel, params)
}
// 获取图片验证资源
export const captcha = (): Promise<any> => {
  return post(api.captcha)
}

// 获取验证码
export const checkCaptcha = (params: any): Promise<any> => {
  return post(api.checkCaptcha, params)
}

// 获取首页中奖状态
export const GetIsExistGrandPrizeReward = (): Promise<any> => {
  return post(api.GetIsExistGrandPrizeReward)
}

// 获取领取电子大奖状态改变
export const ThirdGameReceiveGrandPrizeReward = (params: { orderId: number }): Promise<any> => {
  return post(api.ThirdGameReceiveGrandPrizeReward, params)
}
// 获取电子大奖列表
export const GetThirdGameRewardsRecordPageList = async (params: getThirdRewardsRecord): Promise<any> => {
  return post(api.GetThirdGameRewardsRecordPageList, params)
}

// 获取邮箱验证码
export const GetEmailVerifyCode = (params: object) => {
  return post(api.EmailVerifyCode, params)
}

// 绑定邮箱
export const bindEmail = (params: object) => {
  return post(api.bindEmail, params)
}
// 验证邮箱验证码
export const verifyEmailCode = (params: object) => {
  return post(api.VerifyEmailCode, params)
}
// 绑定手机号
export const bindPhone = (params: object) => {
  return post(api.BindPhone, params)
}
// 获取弹窗配置开关
export const GetLoadedSetting = () => {
  return post(api.GetLoadedSetting)
}
// 获取弹窗配置开关
export const getReceiveReturnAwards = () => {
  return post(api.ReceiveReturnAwards)
}
