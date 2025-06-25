// login
/**
 * @username 用户名
 * @pwd 密码
 * @phonetype 登录类型
 */
export type ReqLoginForm = {
  username: string
  pwd: string
  phonetype: number
}

/**
 * @username 用户名
 * @smsvcode 验证码
 * @pwd 密码
 * @invitecode 邀请码
 * @domainurl 所需域名
 */
export type RegisterReq = {
  username: string
  smsvcode?: string
  pwd: string
  invitecode?: string
  domainurl: string
  captchaId: string
  track: any
}
export type RegisterRes = {}

export type LoginOffRes = {}

export type ForgetPasswordReq = {
  username: string
  smsvcode: string
  password: string
}
export type ForgetPasswordRes = {}

/**
 * @修改登录密码
 * @oldPwd 旧密码
 * @newPwd 新密码
 * @confirmNewPwd 确认密码
 */
export type ResetPasswordReq = {
  oldPwd: string
  newPwd: string
  confirmNewPwd: string
}
// export type ResetPasswordRes = {}

/**
 * @修改图像参数
 * @userPhoto 图像，存图像名称
 */
export type EditUserPhotoReq = {
  userPhoto: string
}

/**
 * @修改昵称
 * @nikeName 昵称
 */
export type EditNickNameReq = {
  nikeName: string
}

// export type EditUserPhotoRes = {}
/**
 * @修改昵称
 * @pageSize 	页面条数
 * @pageNo		页面数
 * @startDate	开始时间
 * @endDate		结束时间
 */
export type getRedpagePageParams = {
  pageSize: number
  pageNo: number
  startDate: string | null
  endDate: string | null
}
export type RedpagePageList = MessageData<RedpagePage>

export type RedpagePage = {
  finanID: string
  issueNumber: string
  amount: number
  addTime: Date
  type: number
  userID: number
  reserved: string
  remark: string
  backAmount: number
  orderNum: string
}

export type ReqGetNewMyEmerd = {
  startDate: string
  endDate: string
}

export interface TaskList {
  taskList: TaskData[]
  totalPeople: number
  totalAmount: number
}

export type TaskData = {
  taskID: number
  taskAmount: number
  rechargeAmount: number
  rechargeAmount_All: number
  taskPeople: number
  efficientPeople: number
  title: string
  title2: string
  isReceive: number
  isFinshed: boolean
  rechargePeople: number
  taskRechargePeople: number
  beginDate: string
  endDate: string
}

/**
 * @提交意见反馈
 * @content 内容
 */
export type ReqSubmitSuggest = {
  content: string
}

/**
 * @关于-隐私政策
 * @protocols 内容
 */
export type ReqProtocols = {
  protocols: string
}

/**
 * @关于-风险披露协议
 * @agreement 内容
 */
export type ReqAgreement = {
  agreement: string
}
/**
 * @客服-客服集合
 * @content 内容
 */
export type ReqService = {
  typeId: number
}

/**
 * @获取新手指南
 * @playingGuide 内容
 */
export type ReqPlayingGuide = {
  playingGuide: string
}
/**
 *
 * @projectName 项目名
 * @projectLogo 项目logo
 * @androidUrl 安卓地址
 * @iosUrl IOS地址
 * @languages 语言
 * @apiUrl api地址
 * @payUrl 支付地址
 * @webIco 网页icon
 * @isShops
 * @headLogo 头部Logo
 * @areaCode 地区码
 * @dollarSign 货币符号
 */
export interface ResGetOnSites {
  projectName: string
  projectLogo: string
  androidUrl: null
  iosUrl: string
  languages: string
  apiUrl: string
  payUrl: null
  webIco: string
  isShops: number
  headLogo: string
  areaCode: string
  dollarSign: string
}
/**
 * @验证是否开放注册和短信注册
 * @registerSMSState 是否开启短信验证码
 * @registerState 是否开启注册
 * @registerStateMsg 注册提示信息
 * @isOpenRegisterEmail 是否开启注册邮箱验证码
 * @isOpenRegisterSMS  是否开启注册短信验证码
 * @IsOpenForgetPasswordSMS  是否开启忘记密码短信开关
 * @IsOpenForgetPasswordEmail 是否开启忘记密码邮箱开关
 * @registerEmailState  邮箱注册内容
 * @registerMobileState 手机注册内容
 * @isOpenAddWithdrawSMS  是否提现短信验证
 * @isOpenAddWithdrawEmail 是否提现邮箱验证
 */
export type ResRegisterState = {
  registerSMSState: string
  registerState: string
  registerStateMsg: string
  isOpenAddBankCardSMS: string
  isOpenForgetPasswordSMS: string
  isOpenForgetPasswordEmail: string
  isOpenCaptcha: string
  isOpenRegisterCaptcha: string
  isOpenGoogleVerifySms: string
  isOpenGoogleVerifyEmail: string
  registerEmailState: string
  registerMobileState: string
  isOpenRegisterEmail: string
  isOpenRegisterSMS: string
  isOpenAddWithdrawEmail: string
  isOpenAddWithdrawSMS: string
  IsOpenForgetPasswordSMS: string
  IsOpenForgetPasswordEmail: string
  addBankCardOpenEmail: string
  isOpenExternalAccount: string
  isInvitecode: string
  registerPrivacyChecked: boolean
}
// 洗码
/**
 * @洗码量
 * @codeType 洗码分类
 */
export type CodeWashAmount = {
  codeType: number
}
/**
 * @洗码量
 * @codeWashAmount 可洗码量
 * @dayRebate 今日反水
 * @totalRebate 总反水金额
 * @washRate 洗码率
 * @washList 洗码记录
 */
export type ResCodeWashAmount = {
  codeWashAmount: number
  dayRebate: number
  totalRebate: number
  washRate: string
  washList: Array<codeWashReceiveList>
}
/**
 * @洗码记录(带分页)
 * @pageSize 每页条数
 * @pageNo 页码
 * @date 日期
 * @codeType 游戏类型
 */
export type ReqCodeWashRecordList = {
  pageSize: number
  pageNo: number
  codeType: number
}

/**
 * @description: 洗码记录(带分页)
 * @pageNo 当前页码
 * @list 列表数据
 * @totalPage 总页数
 * @totalCount 总条数
 */

export type ResCodeWashRecordList = {
  pageNo: number
  list: Array<codeWashReceiveList>
  totalPage: number
  totalCount: number
}
/**
 * washVolume:洗码量
 * rebateAmount:反水金额
 * codeType:游戏分类
 * washRate:洗码率
 * addTime: 时间
 */
interface codeWashReceiveList {
  washVolume: number
  rebateAmount: number
  codeType: number
  washRate: number
  addTime: string
}
/**
 * @获取洗码规则
 * @laundryRule 内容
 */
export type ReqlaundryRule = {
  laundryRule: string
}
export type getThirdRewardsRecord = {
  pageSize: number
  pageNo: number
  startDate: string | null
  endDate: string | null
  isReceive: boolean | ''
  gameName: string | ''
}

/**
 * @获取谷歌验证码
 * @verifyType 验证码类型
 * @verifyCode 验证码内容
 */

export type ReqGetGoogleVerify = {
  verifyType: number
  verifyCode: string
}
/**
 * @获取谷歌验证码
 * @googleCode 谷歌验证码
 */
export type ReqCloseGoogleVerify = {
  googleCode: string
}
export type getThirdAwardsRecord = {
  pageSize: number
  pageNo: number
  isAll: boolean | true
  startDate: string | ''
  endDate: string | ''
  gameName: string | ''
}
