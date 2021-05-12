<template>
	<view class="my" :style="bgColor">
		<u-navbar z-index="1000" :is-back="false" title="我的" :background="topBackground" :border-bottom="false">
			<view slot="right" class="slot-wrap" @click="personal">
				<Icon :iconType="'iconshezhi'" extClass="shezhi"></Icon>
			</view>
		</u-navbar>
		
		<view class="myCon">
			<view class="myCon-message">
				<view class="myCon-message-left" @click="personal">
					<image v-if="myMessage.headPortrait != null" style="width: 120rpx; height: 120rpx; border-radius: 50%;" :src="myMessage.headPortrait"></image>
					<image v-else style="width: 120rpx; height: 120rpx; border-radius: 50%;" src="../../static/img47.png"></image>
				</view>
				<view class="myCon-message-right">
					<view class="myCon-message-right-top">{{ myMessage.idCardName == null ? phone : myMessage.idCardName }}</view>
					<view class="myCon-message-right-bot">
						<view class="myCon-message-right-bot-left" :style="(myMessage.carCertificationStatus == 1 && myMessage.userCertificationStatus == 0) ? flexDir : ''">
							<view class="myCon-message-right-bot-both" :style="myMessage.userCertificationStatus == 0 ? minbgColor : ''">
								<view class="both-img" :style="myMessage.userCertificationStatus == 0 ? textbgColor : ''">
									<Icon :iconType="'iconduigouCheng'" extClass="duigou" v-if="myMessage.userCertificationStatus == 1"></Icon>
									<Icon :iconType="'iconwebWeirenzheng'" extClass="weirenzheng" v-else></Icon>
								</view>
								<view class="both-text">实名认证</view>
							</view>
							<view class="myCon-message-right-bot-both" :style="myMessage.carCertificationStatus == 0 ? minbgColor : ''">
								<view class="both-img" :style="myMessage.carCertificationStatus == 0 ? textbgColor : ''">
									<Icon :iconType="'iconduigouCheng'" extClass="duigou" v-if="myMessage.carCertificationStatus == 1"></Icon>
									<Icon :iconType="'iconwebWeirenzheng'" extClass="weirenzheng" v-else></Icon>
								</view>
								<view class="both-text">运输认证</view>
							</view>
						</view>
						<view class="myCon-message-right-bot-right">
							<view class="myCon-message-right-bot-right-text" @click="goAuth" v-if="myMessage.carCertificationStatus == 0 && myMessage.userCertificationStatus == 0">立即认证</view>
							<view class="myCon-message-right-bot-right-text" @click="goAuth" v-if="myMessage.userCertificationStatus == 0 && myMessage.carCertificationStatus != 0">立即实名认证</view>
							<view class="myCon-message-right-bot-right-text" @click="goCarAuth" v-if="myMessage.carCertificationStatus == 0 && myMessage.userCertificationStatus != 0">立即运输认证</view>
							<u-icon name="arrow-right-double" color="red" size="20" v-if="myMessage.carCertificationStatus == 0 || myMessage.userCertificationStatus == 0"></u-icon>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 我的钱包 -->
			<view class="myPurse" style="height: 100rpx; padding: 10rpx 20rpx;" @click="goMyWallet">
				<view class="myPurse-top" style="flex: 1;">
					<view class="myPurse-top-left">
						我的钱包
					</view>
					<view class="myPurse-top-rightss">
						<view class="myPurse-bot-both-text">余额</view>
						<view class="myPurse-bot-both-tit">{{ parseFloat(myMessage.availableBalance).toFixed(2) }}</view>
					</view>
				</view>
				<!-- <view class="myPurse-bot">
					<view class="myPurse-bot-both" style="border-right: 2rpx solid #cccccc;">
						<view class="myPurse-bot-both-text">余额</view>
						<view class="myPurse-bot-both-tit">{{ parseFloat(myMessage.availableBalance).toFixed(2) }}</view>
					</view>
					<view class="myPurse-bot-both">
						<view class="myPurse-bot-both-text">冻结余额</view>
						<view class="myPurse-bot-both-tit" style="font-size: 36rpx; color: #666666;">{{ parseFloat(myMessage.frozenBalance).toFixed(2) }}</view>
					</view>
				</view> -->
			</view>
			
			<!-- 我的订单 -->
			<view class="myPurse" style="height: 200rpx;">
				<view class="myPurse-top">
					<view class="myPurse-top-left">
						我的订单
					</view>
					<view class="myPurse-top-right" @click="goOrderList(-1)">
						全部订单
					</view>
				</view>
				<view class="myPurse-botss">
					<view @click="goOrderList(index + 1)" class="myPurse-botss-item" v-for="(item,index) of orderList" :key="index">
						<Icon :iconType="item.img" extClass="dindan"></Icon>
						<view class="myPurse-botss-item-tit">{{ item.name }}</view>
					</view>
				</view>
			</view>
			
			<!-- 常用服务 -->
			<view class="myPurse" style="height: 200rpx;">
				<view class="myPurse-top">
					<view class="myPurse-top-left">
						常用服务
					</view>
				</view>
				<view class="myPurse-botss">
					<view @click="goServe(index)" class="myPurse-botss-item" v-for="(item,index) of serveList" :key="index">
						<Icon :iconType="item.img" extClass="fuwu"></Icon>
						<view class="myPurse-botss-item-tit">{{ item.name }}</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar :before-switch="beforeSwitch" active-color="#FB6E2F" inactive-color="#666666" height="110" :list="list" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	import config from '../../service/config.js';
	import ajax from '../../service/ajax.js';
	import moment from 'moment';
	export default {
		data() {
			return {
				list: this.$store.state.list,
				// 顶部导航的背景
				topBackground: {
					// 渐变色
					// background: '#FFC24D',
					// backgroundImage: 'linear-gradient(89deg, #FFE14C 0%, #FFC24D 100%)',
				},
				bgColor: {
					backgroundImage: 'linear-gradient(180deg, #FFE14C 0%, rgba(255, 194, 77, 0) 68%, rgba(255, 194, 77, 0) 100%)',
				},
				minbgColor: {background: '#f1f2f6'},
				textbgColor: {background: '#666666'},
				flexDir: {flexDirection: 'row-reverse'},
				phone: '',
				
				// 订单列表
				orderList: [
					{
						img: 'icondaiquerenWode1',
						name: "待确认"
					},
					{
						img: 'iconyunshuzhongWode1',
						name: "运输中"
					},
					{
						img: 'icondaizhifuWode1',
						name: "待支付"
					},
					{
						img: 'icondaipingjiaWode1',
						name: "待评价"
					},
					{
						img: 'iconquxiao1',
						name: "已取消"
					}
				],
				
				// 服务列表
				serveList: [
					{
						img: 'iconpingjia',
						name: "我的评价"
					},
					{
						img: 'iconzongheHuoyunwuliu',
						name: "车辆管理"
					},
					{
						img: 'iconkefu',
						name: "联系客服"
					},
					{
						img: 'iconfankui1',
						name: "用户协议"
					},
					{
						img: 'iconfankui1',
						name: "隐私政策"
					}
				],
				
				// 我的信息
				myMessage: '',
			}
		},
		onShow() {
			this.getMyMessage();
		},
		methods: {
			beforeSwitch(index) {
				let routes = getCurrentPages();
				let curRoute = routes[routes.length - 1].route;
				if(index == 0 && curRoute != 'pages/allocation/allocation') {
					uni.reLaunch({
						url: "/pages/allocation/allocation"
					})
				} else if(index == 1 && curRoute != 'pages/message/message') {
					uni.reLaunch({
						url: "/pages/message/message"
					})
				} else if(index == 2 && curRoute != 'pages/order/order') {
					uni.reLaunch({
						url: "/pages/order/order"
					})
				} else if(index == 3 && curRoute != 'pages/my/my') {
					uni.reLaunch({
						url: "/pages/my/my"
					})
				}
			},
			
			// 跳转到个人中心
			personal() {
				uni.navigateTo({
					url: "/pages/personalCentre/personalCentre"
				})
			},
			
			// 跳转到运输认证
			goCarAuth() {
				uni.navigateTo({
					url: "/pages/addCar/addCar?carAuthState=1"
				})
			},
			
			// 跳转到实名认证
			goAuth() {
				uni.navigateTo({
					url: "/pages/myAuthentication/myAuthentication?authState=0"
				})
			},
			
			// 跳转到服务
			goServe(index) {
				// console.log(index);
				if(index == 0) {
					uni.navigateTo({
						url: "/pages/myEvaluate/myEvaluate?phone=" + this.myMessage.phone + "&userNo=" + this.myMessage.userNo
						// url: "/pages/myEvaluate/myEvaluate?phone=" + this.myMessage.phone + "&userNo=" + "1234"
					})
				} else if(index == 1) {
					uni.navigateTo({
						url: "/pages/myCar/myCar"
					})
				} else if(index == 2) {
					uni.makePhoneCall({
					    phoneNumber: "0571-82814588"
					});
				} else if(index == 3) {
					uni.navigateTo({
						url: "/pages/pact/userServer/userServer",
					})
				} else if(index == 4) {
					uni.navigateTo({
						url: "/pages/pact/privacyPolicy/privacyPolicy",
					})
				}
			},
			
			// 跳转到订单
			goOrderList(index) {
				console.log(index);
				if(index == -1) {
					uni.reLaunch({
						url: "/pages/order/order"
					})
				} else if(index == 1) {
					uni.reLaunch({
						url: "/pages/order/order?index=1"
					})
				} else if(index == 2) {
					uni.reLaunch({
						url: "/pages/order/order?index=2"
					})
				} else if(index == 3) {
					uni.reLaunch({
						url: "/pages/order/order?index=3"
					})
				} else if(index == 4) {
					uni.reLaunch({
						url: "/pages/order/order?index=4"
					})
				} else if(index == 5) {
					uni.reLaunch({
						url: "/pages/order/order?index=6"
					})
				}
			},
			
			// 跳转到我的钱包
			goMyWallet() {
				uni.navigateTo({
					url: "/pages/myWallet/myWallet"
				})
			},
			
			// 获取我的信息
			getMyMessage() {
				let $cid = 123;
				// #ifdef APP-PLUS
				let pinf = plus.push.getClientInfo();
				$cid = pinf.clientid;
				// #endif
				uni.getStorage({
					key: 'username',
					success: res => {
						ajax.get(config.userMess_url,{
							type: 2,
							cid: $cid
						}).then(res => {
							console.log(res);
							if(res.code == 0){
								this.myMessage = res.data;
								this.phone = this.myMessage.phone.substr(0,3) + '****' + this.myMessage.phone.substr(7);
							} else {
								console.log(res);
							}
						}).catch(err => {
							console.log("获取我的信息接口数据返回失败 error is :" + err);
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.my {
		// background-image: linear-gradient(#ffe14c, rgb(145 152 229 / 0));
		// background: red;
		.slot-wrap {
			width: 40rpx;
			height: 100%;
			font-size: 24rpx;
			color: #333333;
			margin-right: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.shezhi {
				color: #000000;
				font-size: 38rpx;
			}
		}
		.myCon {
			width: 100%;
			height: 800rpx;
			
			.myPurse {
				width: 92% !important;
				margin: 0 auto 40rpx auto;
				height: 164rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.08);
				border-radius: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				padding: 10rpx 20rpx 20rpx 20rpx;
				.myPurse-top {
					flex: 0.8;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.myPurse-top-left {
						height: 42rpx;
						line-height: 42rpx;
						font-size: 32rpx;
						color: #333333;
					}
					.myPurse-top-right {
						height: 58rpx;
						line-height: 58rpx;
						font-size: 20rpx;
						color: #999999;
					}
					.myPurse-top-rightss {
						height: 58rpx;
						line-height: 58rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.myPurse-bot-both-text {
							height: 32rpx;
							font-size: 24rpx;
							line-height: 40rpx;
							color: #666666;
							margin: 0 15rpx 0 24rpx;
						}
						.myPurse-bot-both-tit {
							font-size: 40rpx;
							font-weight: 600;
							color: #FD8624;
						}
					}
				}
				.myPurse-botss {
					flex: 1.5;
					width: 100%;
					display: flex;
					justify-content: space-around;
					align-items: center;
					.fuwu {
						height: 54rpx;
						font-size: 38rpx;
						color: #fd8624;
					}
					.dindan {
						height: 54rpx;
						font-size: 38rpx;
						color: #3F9DFC;
					}
					.myPurse-botss-item {
						width: 120rpx;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						.myPurse-botss-item-img {
							width: 40rpx;
							height: 40rpx;
						}
						.myPurse-botss-item-tit {
							margin-top: 8rpx;
							height: 32rpx;
							font-size: 24rpx;
							line-height: 32rpx;
							color: #666666;
						}
					}
				}
				.myPurse-bot {
					flex: 1.2;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.myPurse-bot-both {
						flex: 1;
						height: 38rpx;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						.myPurse-bot-both-text {
							height: 32rpx;
							font-size: 24rpx;
							line-height: 32rpx;
							color: #666666;
							margin: 0 44rpx 0 24rpx;
						}
						.myPurse-bot-both-tit {
							font-size: 40rpx;
							font-weight: 600;
							color: #FD8624;
						}
					}
				}
			}
			.myCon-message {
				width: 100%;
				height: 250rpx;
				margin-bottom: 10rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.myCon-message-left {
					width: 120rpx;
					height: 120rpx;
					margin: 0 40rpx 0 68rpx;
				}
				.myCon-message-right {
					width: 100%;
					.myCon-message-right-top {
						font-size: 36rpx;
						color: #333333;
					}
					.myCon-message-right-bot {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.myCon-message-right-bot-left {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							.myCon-message-right-bot-both {
								display: flex;
								justify-content: space-between;
								align-items: center;
								width: 136rpx;
								height: 32rpx;
								background: rgba(190, 100, 23, 0.2);
								border-radius: 20rpx;
								padding: 0 12rpx;
								margin-right: 20rpx;
								.both-img {
									width: 24rpx;
									height: 24rpx;
									background: #FD8624;
									border-radius: 12rpx;
									display: flex;
									justify-content: center;
									align-items: center;
									.duigou {
										color: #ffffff;
										font-size: 10rpx;
									}
									.weirenzheng {
										color: #ffffff;
										font-size: 18rpx;
									}
								}
								.both-text {
									width: 80rpx;
									height: 28rpx;
									font-size: 20rpx;
									line-height: 28rpx;
									color: #333333;
								}
							}
						}
						.myCon-message-right-bot-right {
							display: flex;
							justify-content: flex-end;
							align-items: center;
							margin-right: 30rpx;
							.myCon-message-right-bot-right-text {
								font-size: 20rpx;
								color: red;
								margin-right: 5rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
