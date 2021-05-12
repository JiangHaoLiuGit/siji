<template>
	<view class="myCarBox">
		<u-navbar title-width="300" back-text="" title="我的车辆"></u-navbar>
		
		<view class="myCar-content">
			<uni-swipe-action>
				<uni-swipe-action-item @change="swipeChange($event, index)" class="myCar-content-item" :class="{items: index == 0}" v-for="(item,index) of carList" :key="index">
					<view class="myCar-content-itemss" @click="checkCar(item.id)">
						<view class="myCar-content-left" :class="item.isDefault == 1 ? 'leftss' : ''">
							<Icon :iconType="'iconchepai1'" :extClass="item.isDefault == 1 ? 'chepai2' : 'chepai1'"></Icon>
						</view>
						<view class="myCar-content-right">
							车牌：{{ item.plateNumber }}
						</view>
						<view style="margin-left: 280rpx; color: #FB6E2F;" v-if="item.isDefault == 1">默认</view>
					</view>
					<template v-slot:right>
						<view class="upBtn" @click="changeCar(item.id, item.plateNumber)">
							<Icon :iconType="'iconxiugai1'" extClass="xiugai1"></Icon>
						</view>
						<!-- <view class="delBtn" @click="delCar(item.id, item.isDefault)">
							<Icon :iconType="'iconshanchu1'" extClass="shanchu1"></Icon>
						</view> -->
					</template>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		
		<view class="personalBot">
			<view class="personalBot-yuan"></view>
			<view class="personalBot-text">最多添加5个我的车辆</view>
		</view>
		
		<u-popup width="640" height="386" border-radius="20" :mask-custom-style="{background: 'rgba(0, 0, 0, 0.3)'}" :closeable="true" v-model="popShowss" mode="center">
			<view class="hintTit">温馨提示</view>
			<view class="hintCon">默认车辆不能删除</view>
			<view class="hintBtn" style="justify-content: center;" @click="popShowss = false">返回</view>
		</u-popup>
		
		<u-popup width="640" height="386" border-radius="20" :mask-custom-style="{background: 'rgba(0, 0, 0, 0.3)'}" :closeable="true" v-model="popShow" mode="center">
			<view class="hintTit">温馨提示</view>
			<view class="hintCon">您确定删除吗？</view>
			<view class="hintBtn">
				<view style="width: 50%;" @click="delCarss">确认删除</view>
				<view class="hintBtnShu"></view>
				<view style="color: #333333; width: 50%;" @click="popShow = false">暂不删除</view>
			</view>
		</u-popup>
		
		<button @click="addCar" :disabled="carList.length == 5" style="background: #FFC24D;" class="submitBtn" :class="{loginButton: carList.length == 5}">添加车辆</button>
		
	</view>
</template>

<script>
	import config from '../../service/config.js'
	import ajax from '../../service/ajax.js'
	export default {
		data() {
			return {
				// 我的车辆列表
				carList: [],
				
				popShow: false,
				popShowss: false,
				
				// 删除车辆的ID
				carId: null,
			}
		},
		onShow() {
			this.getMyCar();
		},
		// onBackPress() {
		// 	uni.redirectTo({
		// 		url: "/pages/personalCentre/personalCentre"
		// 	})
		// 	return true;
		// },
		methods: {
			
			swipeChange(e,index) {
				console.log(e);
				console.log(index);
			},
			
			// 设置默认车辆
			checkCar(id) {
				ajax.put(config.driverCar_url + `/${id}/isDefault`,{
				}).then(res => {
					if(res.code == 0){
						this.carList = [];
						this.getMyCar();
					} else {
						console.log(res);
					}
				}).catch(err => {
					console.log("设置默认车辆接口数据返回失败 error is :" + err);
				})
			},
			
			// 修改车辆
			changeCar(id,plateNumber) {
				uni.navigateTo({
					// url: "/pages/changeCar/changeCar?id=" + `${id}&plateNumber=${plateNumber}`
					url: "/pages/addCar/addCar?id=" + `${id}&plateNumber=${plateNumber}&carAuthState=2`
				})
			},
			
			// 添加车辆
			addCar() {
				uni.navigateTo({
					url: "/pages/addCar/addCar?carAuthState=0"
				})
			},
			
			// 删除车辆列表
			delCar(id, type) {
				if(type == 1) {
					this.popShowss = true;
				} else {
					this.popShow = true;
					this.carId = id;
				}
			},
			
			// 删除车辆
			delCarss() {
				ajax.del(config.driverCar_url + `/${this.carId}`,{
				}).then(res => {
					if(res.code == 0){
						this.popShow = false;
						this.carList = [];
						this.getMyCar();
					} else {
						console.log(res);
						this.popShow = false;
						uni.showToast({ title: "删除失败",icon: "none" ,duration:2000});
					}
				}).catch(err => {
					console.log("删除车辆列表接口数据返回失败 error is :" + err);
				})
			},
			
			// 获取我的车辆列表
			getMyCar() {
				ajax.get(config.driverCar_url,{
				}).then(res => {
					if(res.code == 0){
						console.log(res.data);
						this.carList = res.data;
					} else {
						console.log(res);
					}
				}).catch(err => {
					console.log("获取我的车辆列表接口数据返回失败 error is :" + err);
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.myCarBox {
		.hintTit {
			width: 100%;
			text-align: center;
			font-size: 36rpx;
			color: #333333;
			position: relative;
			top: 92rpx;
		}
		.hintCon {
			width: 100%;
			text-align: center;
			font-size: 32rpx;
			color: #999999;
			position: relative;
			top: 110rpx;
		}
		.hintBtn {
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			border-top: 2rpx solid #DDDDDD;
			text-align: center;
			font-size: 32rpx;
			color: #F96F2B;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: absolute;
			bottom: 0;
			.hintBtnShu {
				width: 0rpx;
				height: 90rpx;
				border: 2rpx solid #DDDDDD;
			}
		}
		.personalBot {
			width: 92%;
			margin: 15rpx auto auto auto;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.personalBot-yuan {
				width: 8rpx;
				height: 8rpx;
				background: #999999;
				border-radius: 50%;
				margin-right: 10rpx;
			}
			.personalBot-text {
				font-size: 20rpx;
				color: #999999;
			}
		}
		.myCar-content {
			width: 100%;
			.items {
				margin-top: 40rpx !important;
			}
			.myCar-content-item {
				width: 92%;
				height: 92rpx;
				margin: 12rpx auto auto auto;
				.myCar-content-itemss {
					width: 100%;
					height: 92rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					background: #ffffff;
					border-radius: 8rpx;
					.leftss {
						border: 2rpx solid #FB6E2F !important;
					}
					.myCar-content-left {
						width: 40rpx; 
						height: 40rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						margin: 0 20rpx;
						border: 2rpx solid #666666;
						border-radius: 50%;
						.chepai1 {
							font-size: 30rpx;
							color: #666666;
						}
						.chepai2 {
							font-size: 30rpx;
							color: #FB6E2F;
						}
					}
					.myCar-content-right {
						font-size: 32rpx;
						color: #333333;
					}
				}
				.upBtn {
					width: 92rpx;
					height: 92rpx;
					background: #2680EB;
					display: flex;
					justify-content: center;
					align-items: center;
					.xiugai1 {
						color: #ffffff;
					}
				}
				.delBtn {
					width: 92rpx;
					height: 92rpx;
					background: #FA5D2E;
					border-radius: 0rpx 8rpx 8rpx 0rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.shanchu1 {
						color: #ffffff;
					}
				}
			}
		}
		.submitBtn {
			width: 90%;
			height: 80rpx;
			line-height: 80rpx;
			position: absolute;
			left: 5%;
			bottom: 5%;
			color: #333333;
		}
		.loginButton {
			background: #DDDDDD !important;
			color: #333333;
		}
	}
</style>
