// const rootConfigcm = {
// 	langArr: [
// 		{
// 			key: '中文',
// 			value: 'zh'
// 		},
// 		{
// 			key: '中文',
// 			value: 'zh_CN'
// 		},
// 		{
// 			key: '繁體',
// 			value: 'tc'
// 		},
// 		{
// 			key: '繁體',
// 			value: 'zh_TC'
// 		},
// 		{
// 			key: 'English',
// 			value: 'en'
// 		},
// 		{
// 			key: 'Tiếng Việt',
// 			value: 'vi'
// 		},
// 		{
// 			key: 'ไทย',
// 			value: 'th'
// 		}
// 	]
// }
// export default rootConfigcm

// export default {
// 	dateArr: [
// 		{
// 			name: '今天',
// 			key: 'today'
// 		},
// 		{
// 			name: '昨天',
// 			key: 'yesterday'
// 		},
// 		{
// 			name: '近7天',
// 			key: 'last7days'
// 		},
// 		{
// 			name: '本月',
// 			key: 'thisMonth'
// 		},
// 		{
// 			name: '上月',
// 			key: 'lastMonth'
// 		}
// 	],
// 	booleanOp: [
// 		{
// 			value: 0,
// 			key: '全部'
// 		},
// 		{
// 			value: 1,
// 			key: '是'
// 		},
// 		{
// 			value: 2,
// 			key: '否'
// 		}
// 	],
// 	statusOptions: [
// 		{
// 			value: 0,
// 			key: '全部'
// 		},
// 		{
// 			value: 1,
// 			key: '启用'
// 		},
// 		{
// 			value: 2,
// 			key: '停用'
// 		}
// 	],
// 	memAgencOp: [
// 		{
// 			value: 0,
// 			key: '全部'
// 		},
// 		{
// 			value: 1,
// 			key: '在线'
// 		},
// 		{
// 			value: 2,
// 			key: '离线'
// 		}
// 	],
// 	lineStatusOp: [
// 		{
// 			value: 0,
// 			key: '全部'
// 		},
// 		{
// 			value: 1,
// 			key: '启用'
// 		},
// 		{
// 			value: 2,
// 			key: '停用'
// 		},
// 		{
// 			value: 3,
// 			key: '维护'
// 		}
// 	],
// 	doMonModeOp: [
// 		{
// 			value: 0,
// 			key: '全部'
// 		},
// 		{
// 			value: 1,
// 			key: '钱包模式'
// 		},
// 		{
// 			value: 2,
// 			key: '额度转换'
// 		}
// 	],

// 	redStatusOp: [
// 		{
// 			value: 0,
// 			key: '全部'
// 		},
// 		{
// 			value: 1,
// 			key: '进行中'
// 		},
// 		{
// 			value: 2,
// 			key: '已结算'
// 		},
// 		{
// 			value: 3,
// 			key: '已返还'
// 		}
// 	],
// 	redInpOp: [
// 		{
// 			value: 1,
// 			key: '用户名'
// 		},
// 		{
// 			value: 2,
// 			key: '发包者'
// 		}
// 	],
// 	redOddsOp: [
// 		{
// 			value: 0,
// 			key: '全部'
// 		},
// 		{
// 			value: 1,
// 			key: '固定赔率'
// 		},
// 		{
// 			value: 2,
// 			key: '不固定赔率'
// 		}
// 	],

// 	gameTimeOp: [
// 		{
// 			value: 1,
// 			key: '1分钟'
// 		},
// 		{
// 			value: 2,
// 			key: '2分钟'
// 		},
// 		{
// 			value: 3,
// 			key: '3分钟'
// 		},
// 		{
// 			value: 4,
// 			key: '4分钟'
// 		},
// 		{
// 			value: 5,
// 			key: '5分钟'
// 		}
// 	],

// 	orderRedfi: [
// 		{
// 			value: 10,
// 			key: '全部'
// 		},
// 		{
// 			value: 0,
// 			key: '未结算'
// 		},
// 		{
// 			value: 1,
// 			key: '赢'
// 		},
// 		{
// 			value: 2,
// 			key: '输'
// 		},
// 		{
// 			value: 3,
// 			key: '无效'
// 		}
// 	],
// 	// 接龙
// 	connetRed: [
// 		{
// 			value: 10,
// 			key: '全部'
// 		},
// 		{
// 			value: 0,
// 			key: '未结算'
// 		},
// 		{
// 			value: 2,
// 			key: '已结算'
// 		},
// 		{
// 			value: 3,
// 			key: '无效'
// 		},
// 		{
// 			value: 4,
// 			key: '流局'
// 		}
// 	],
// 	// 扫雷
// 	ordersfi: [
// 		{
// 			value: 10,
// 			key: '全部'
// 		},
// 		{
// 			value: 0,
// 			key: '未结算'
// 		},
// 		{
// 			value: 2,
// 			key: '已结算'
// 		},
// 		{
// 			value: 3,
// 			key: '已返还'
// 		},
// 		{
// 			value: 4,
// 			key: '流局'
// 		}
// 	],
// 	// 牛牛
// 	ordersfipro: [
// 		{
// 			value: 10,
// 			key: '全部'
// 		},
// 		{
// 			value: 0,
// 			key: '未结算'
// 		},
// 		{
// 			value: 1,
// 			key: '赢'
// 		},
// 		{
// 			value: 2,
// 			key: '输'
// 		},
// 		{
// 			value: 3,
// 			key: '无效'
// 		},
// 		{
// 			value: 4,
// 			key: '流局'
// 		}
// 	],
// 	ableOptions: [
// 		{
// 			value: 1,
// 			key: '启用'
// 		},
// 		{
// 			value: 2,
// 			key: '停用'
// 		}
// 	],
// 	visableOptions: [
// 		{
// 			value: 1,
// 			key: '可见'
// 		},
// 		{
// 			value: 2,
// 			key: '不可见'
// 		}
// 	],
// 	roomTypesOps: [
// 		{
// 			value: 1,
// 			key: '公群'
// 		},
// 		{
// 			value: 2,
// 			key: '私群'
// 		}
// 	],
// 	freeFromDeathsOps: [
// 		{
// 			value: 1,
// 			key: '开启'
// 		},
// 		{
// 			value: 2,
// 			key: '关闭'
// 		}
// 	],
// 	nomalStatusOp: [
// 		{
// 			value: 10,
// 			key: '全部'
// 		},
// 		// {
// 		//     value: 1,
// 		//     key: '进行中'
// 		// },
// 		{
// 			value: 2,
// 			key: '已结束'
// 		},
// 		{
// 			value: 3,
// 			key: '无效'
// 		}
// 		// {
// 		//     value: 4,
// 		//     key: '已领完'
// 		// },
// 		// {
// 		//     value: 5,
// 		//     key: '未开始'
// 		// }
// 	],
// 	nomalStatusOpf: [
// 		{
// 			value: 10,
// 			key: '全部'
// 		},
// 		{
// 			value: 1,
// 			key: '进行中'
// 		},
// 		{
// 			value: 2,
// 			key: '已结束'
// 		},
// 		{
// 			value: 3,
// 			key: '无效'
// 		},
// 		{
// 			value: 4,
// 			key: '已领完'
// 		},
// 		{
// 			value: 5,
// 			key: '未开始'
// 		}
// 	],
// 	logTypesOp: [
// 		{
// 			value: 0,
// 			key: '全部'
// 		},
// 		{
// 			value: 1,
// 			key: '登录日志'
// 		},
// 		{
// 			value: 2,
// 			key: '操作日志'
// 		}
// 	],
// 	payOutStatusOp: [
// 		{
// 			value: 0,
// 			key: '全部'
// 		},
// 		{
// 			value: 1,
// 			key: '正常'
// 		},
// 		{
// 			value: 2,
// 			key: '异常'
// 		}
// 	],
// 	fixStatusOp: [
// 		{
// 			key: '全部',
// 			value: 0
// 		},
// 		{
// 			key: '已处理',
// 			value: 1
// 		},
// 		{
// 			key: '未处理',
// 			value: 2
// 		}
// 	]
// }

export default {}
