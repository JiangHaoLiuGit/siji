let mock = "/ip/"
// let mock = "/api/"
//#ifdef APP-PLUS
// mock = "http://savvyray.oicp.net/"
mock = "http://hab.hangliu.com.cn/hab-app/"
// mock = "https://api.clicksync.cn/hab-app/"
// mock = "http://z340423c48.imdo.co/"
//#endif
const config = {
	// 协议文案
	sjzxxz_url: mock + 'oss/hln-sjzxxz.html', //司机平台账户注销须知
	hyfwxy_url: mock + 'oss/hln-hyfwxy.html', //会员服务协议
	yszc_url: mock + 'oss/hln-yszc.html', //隐私政策
	ysxy_url: mock + 'oss/hln-ysxy.html', //运输协议
	
	// 用户登录/注销
	//reg-login
	login_url: mock + "reg-login", //用户登录
	check_url: mock + "face-user/check", //用户校验
	driver_url: mock + "face-user/registered", //用户注册
	code_url: mock + "authentication/verification-code", //获取验证码
	logout_url: mock + "face-user/delete-username", //用户注销
	refresh_url: mock + "token/refresh", //刷新tokon

	// 认证
	uploadOss_url: mock + "authentication/upload-oss", //oss图片上传
	faceHuman_url: mock + "authentication/business-license-face", //人脸认证
	realAuth_url: mock + "authentication/approve", //实名认证
	
	// 配置接口
	carModel_url: mock + "basic-data/car-model", //车型列表
	carConductor_url: mock + "basic-data/car-conductor", //车长列表
	transportNature_url: mock + "basic-data/transport-nature", //运输性质
	region_url: mock + "basic-data/region", //区域列表
	regionTree_url: mock + "basic-data/region-tree", //区域树
	bdGoodsType_url: mock + "basic-data/bd-goods-type", //货源类型列表
	rateType_url: mock + "basic-data/order-evaluation-type", //评价类型
	gpsPush_url: mock + "order-management/gps-push", //gps数据推送
	serverTime_url: mock + "face-user/getTime", //服务器时间
	version_url: mock + "personal-center/version", //版本更新
  
	// 配货大厅
	freightCargo_url: mock + "distribution-hall/freight-cargo", //货源列表/货源详情
	cargoSearchRecord_url: mock + "cargo-browse-records/cargo-search-record", //找货记录列表
	distributionLine_url: mock + "distribution-hall/distribution-line", //常用路线列表、常用路线删除、常用路线新增、常用路线修改
	allStates_url: mock + "cargo-browse-records/get-all-states", //根据货源id获取订单和货源的状态信息
	
	//我的订单
	order_url: mock + "order-management/freight-shipping-order", //抢单支付定金/订单列表/订单详情/订单取消/订单运输完成/订单上传图片/司机确认支付定金/查看退款流程/司机确认待退款
	rate_url: mock + "order-management", //订单评价
	// driverIntro_url: mock + "order-management/cargo-owner", //货主简介/简介评论信息
	driverIntro_url: mock + "order-management/introduction", //货主/司机简介
	driverFaceIntro_url: mock + "order-management/evaluation-list", //货主/司机查看评价列表
	refuse_url: mock + "order-management/refuse", //指定货源拒绝承运
	
	// 消息中心
	message_url: mock + "message/freight-message-notification", //消息列表、消息详情、清除未读消息
	
	// 用户中心
	userMess_url: mock + "face-user/info", //我的信息
	headPortrai_url: mock + "personal-center/head-portrait", //头像修改
	contactPhone_url: mock + "personal-center/freight-contact-phone", //联系号码列表/联系号码删除/联系号码新增
	changePwd_url: mock + "personal-center/passwd", //修改密码
	driverCar_url: mock + "personal-center/face-driver-car", //车辆列表/车辆删除/车辆新增/车辆修改
	phoneVerify_url: mock + "personal-center/phone", //手机号码验证/手机号码修改
	wallet_url: mock + "personal-center/freight-wallet-account", //钱包详情
	transaction_url: mock + "personal-center/freight-wallet-transaction", //账单明细/账单详情
	account_url: mock + "account/recharge", //充值
	phoneList_url: mock + "contact-phone/list", //联系电话列表
	withdraw_url: mock + "face-user/transfer-accounts", //提现
	withdrawVerify_url: mock + "face-user/withdrawal", //提现手机号验证
	
}

module.exports = config

// 
