<template>
	<view class="addCarBox">
		<u-navbar back-text="" :title="carAuthState == 1 ? '运输认证' : carAuthState == 0 ? '添加我的车辆' : carAuthState == 2 ? plateNumber : ''"></u-navbar>
		
		<view class="addCarCont">
			<view class="addCarCont-tit">行驶证照片</view>
			<view class="autConCon1" v-if="carAuthState != 2">
				<view class="autConConItem4" @click="addImg" data-img="5" v-if="vehiclefaceUrl == ''">点击上传行驶证主本</view>
				<view class="autConConItem3" @click="addImg" data-img="5" v-else>
					<image class="image" :src="vehiclefaceUrl" mode="aspectFit"></image>
				</view>
				<view class="autConConItem5" @click="addImg" data-img="6" v-if="vehiclebaceUrl == ''">点击上传行驶证副本</view>
				<view class="autConConItem3" @click="addImg" data-img="6" v-else>
					<image class="image" :src="vehiclebaceUrl" mode="aspectFit"></image>
				</view>
			</view>
			<view class="autConCon1" v-else>
				<view class="autConConItem3" @click="imgMagnify(0)">
					<image class="image" :src="vehiclefaceUrl" mode="aspectFit"></image>
				</view>
				<view class="autConConItem3" @click="imgMagnify(1)">
					<image class="image" :src="vehiclebaceUrl" mode="aspectFit"></image>
				</view>
			</view>
			<view class="autConCon2" v-if="carAuthState != 2">
				<view class="autConCon2Tit">所有人</view>
				<input style="width: 62%;" class="autConCon2Inp" disabled placeholder-class="inpsty" disabled placeholder="自动获取所有人" type="text" v-model="carName" />
				<view style="width: 10rpx; height: 18rpx;"></view>
			</view>
			<view class="autConCon2" v-if="carAuthState != 2">
				<view class="autConCon2Tit">车牌号码</view>
				<input style="width: 62%;" class="autConCon2Inp" disabled placeholder-class="inpsty" disabled placeholder="自动获取车牌号码" type="text" v-model="carNo" />
				<view style="width: 10rpx; height: 18rpx;"></view>
			</view>
			<view class="autConCon2" v-if="carAuthState != 2">
				<view class="autConCon2Tit">车牌类型</view>
				<input style="width: 62%;" class="autConCon2Inp" disabled placeholder-class="inpsty" disabled placeholder="自动获取车辆类型" type="text" v-model="carTypess" />
				<view style="width: 10rpx; height: 18rpx;"></view>
			</view>
			<view style="border-top: 0;" class="autConCon2" @click="carConductorShow = true">
				<text class="autConCon2Tit">车长车型</text>
				<input style="width: 62%;" class="autConCon2Inp" disabled placeholder-class="inpsty" type="text" name="vehicleType" v-model="vehicletype" placeholder="请选择车长车型">
				<Icon :iconType="'iconfanhuiYou1'" extClass="fanhuiYou1"></Icon>
			</view>
		</view>
		
		<u-popup border-radius="40" v-model="carConductorShow" mode="bottom" :mask-custom-style="{background: 'rgba(0, 0, 0, 0.3)'}">
			<view class="carConTit">
				<view class="carConTitBtn" @click="cancel">取消</view>
				<view class="carConTitCon">车型车长</view>
				<view class="carConTitBtn" style="background: #FEC24D;" @click="carAffirm">确认</view>
			</view>
			<view class="content">
				<view class="title">车辆类型</view>
				<view  class="conContent">
					<view 
						@click="carTypeChange(item)" 
						v-for="(item, index) in carTypeList" :key="index" 
						class="carType"
						:class="{ checkCarType: carTypeId == item.id }"
					>
						{{item.name}}
						<view class="fangkuai" v-if="carTypeId == item.id">
							<Icon :iconType="'iconduigouCheng'" extClass="duigouChengss"></Icon>
						</view>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="contentCon">
					<view class="title">载货长度</view>
					<view class="titRight">(米/车辆可载部分长度)</view>
				</view>
				<view class="conContent">
					<view 
						@click="carConductorChange(item)"
						v-for="(item, index) in carConductorList" :key="index"
						class="carType"
						:class="{ checkCarType: carConductorName == item.name }"
						:style="[ carConductorVal != '' ? bgColor : '']"
					>
						{{item.name}}
						<view class="fangkuai" v-if="carConductorName == item.name">
							<Icon :iconType="'iconduigouCheng'" extClass="duigouChengss"></Icon>
						</view>
					</view>
				</view>
				<view class="length" style="margin-bottom: 44rpx;" @click="show = true">
					<input disabled class="lengthInp" placeholder-class="inpsty" type="text" v-model="carConductorVal" placeholder="手动输入载货长度">
					<text class="unit">米</text>
				</view>
			</view>
		</u-popup>
		
		<u-keyboard :tips="carConductorVal" :mask-close-able="false" @cancel="inputCan" :safe-area-inset-bottom="true" :mask="false" ref="uKeyboard" @change="valChange" @backspace="backspace" mode="number" v-model="show"></u-keyboard>
		
		<u-modal confirm-text="马上抢单" width="640" v-model="passShow" :show-title="false" :confirm-style="{'background': '#ffffff', 'font-size': '36rpx', 'color': '#F96F2B',}" @confirm="goHall">
			<view class="slot-content">
				<view class="titImg">
					<Icon :iconType="'icontongguo1'" extClass="tongguo1"></Icon>
				</view>
				<view class="title">认证成功</view>
			</view>
		</u-modal>
		
		<u-modal confirm-text="返回" width="640" v-model="failssShow" :show-title="false" :confirm-style="{'border-buttom': '2rpx solid #dddddd', 'font-size': '32rpx', 'color': '#F96F2B',}" @confirm="goBack">
			<view class="slot-content">
				<view class="titImg">
					<Icon :iconType="'iconshibai1'" extClass="shibai1"></Icon>
				</view>
				<view class="title">认证失败，请重新上传相关证件</view>
			</view>
		</u-modal>
		
		<u-modal confirm-text="返回我的车辆" width="640" v-model="succeedShow" :show-title="false" :confirm-style="{'border-buttom': '2rpx solid #dddddd', 'font-size': '32rpx', 'color': '#F96F2B',}" @confirm="goMyCar">
			<view class="slot-content">
				<view class="titImg">
					<Icon :iconType="'icontongguo1'" extClass="tongguo1"></Icon>
				</view>
				<view class="title">车辆添加成功</view>
			</view>
		</u-modal>
		
		<u-modal confirm-text="返回我的车辆" width="640" v-model="failShow" :show-title="false" :confirm-style="{'border-buttom': '2rpx solid #dddddd', 'font-size': '32rpx', 'color': '#F96F2B',}" @confirm="goMyCar">
			<view class="slot-content">
				<view class="titImg">
					<Icon :iconType="'iconshibai1'" extClass="shibai1"></Icon>
				</view>
				<view class="title">车辆添加失败</view>
			</view>
		</u-modal>
		
		<u-modal confirm-text="返回我的车辆" width="640" v-model="alterSucceedShow" :show-title="false" :confirm-style="{'border-buttom': '2rpx solid #dddddd', 'font-size': '32rpx', 'color': '#F96F2B',}" @confirm="goMyCar">
			<view class="slot-content">
				<view class="titImg">
					<Icon :iconType="'icontongguo1'" extClass="tongguo1"></Icon>
				</view>
				<view class="title">车辆修改成功</view>
			</view>
		</u-modal>
		
		<u-modal confirm-text="返回我的车辆" width="640" v-model="alterFailShow" :show-title="false" :confirm-style="{'border-buttom': '2rpx solid #dddddd', 'font-size': '32rpx', 'color': '#F96F2B',}" @confirm="goMyCar">
			<view class="slot-content">
				<view class="titImg">
					<Icon :iconType="'iconshibai1'" extClass="shibai1"></Icon>
				</view>
				<view class="title">车辆修改失败</view>
			</view>
		</u-modal>
		
		<button :disabled="vehiclefaceUrl == '' || vehiclebaceUrl == '' || vehicletype == '' || btnAstrict" style="background: #FFC24D;" class="submitBtn" :class="{loginButton: vehiclefaceUrl == '' || vehiclebaceUrl == '' || vehicletype == '' || btnAstrict}" @click="addMyCar">{{ carAuthState == 1 ? '提交' : carAuthState == 0 ? '添加' : carAuthState == 2 ? '确认修改' : ''}}</button>
		
		<helang-compress ref="helangCompress"></helang-compress>
		<swiperImage :maskShow="imgShow" v-if="imgShow" @change="imghide" :swiperImages="swiperImages" :currentIndex="currentIndex"></swiperImage>
	</view>
</template>

<script>
	import config from '../../service/config.js';
	import ajax from '../../service/ajax.js';
	import {pathToBase64} from '@/js_sdk/gsq-image-tools/image-tools/index.js';
	import helangCompress from '../../components/helang-compress/helang-compress';
	export default {
		data() {
			return {
				// 图片放大
				imgShow: false,
				currentIndex: 0,
				swiperImages: [],
				
				// 车辆所有人
				carName: '',
				// 车牌号码
				carNo: '',
				// 车辆类型
				carTypess: '',
				
				// 行驶证主页url
				vehiclefaceUrl: '',
				// 行驶证副页Url
				vehiclebaceUrl: '',
				// 车型车长显示
				carConductorShow: false,
				// 车长车型
				vehicletype: '',
				
				// 车辆类型列表
				carTypeList: [],
				// 车长列表
				carConductorList: [],
				// 选中的车辆类型ID
				carTypeId: '',
				carTypeName: '',
				// 选中的车长
				carConductorName: '',
				// 输入的车长
				carConductorVal: '',
				
				// 认证状态
				carAuthState: null,
				
				// 车牌
				plateNumber: '',
				// 车辆Id
				carId: '',
				
				succeedShow: false,
				failShow: false,
				passShow: false,
				failssShow: false,
				alterSucceedShow: false,
				alterFailShow: false,
				
				// 按钮点击限制
				btnAstrict: false,
				// 数字键盘显示隐藏
				show: false
			}
		},
		onLoad(option) {
			this.carAuthState = option.carAuthState;
			this.carId = option.id;
			this.plateNumber = option.plateNumber;
		},
		computed: {
			bgColor() {
				let backgroundImage,color,background;
				backgroundImage = 'none !important';
				background = '#F1F2F6';
				color = '#333333';
				return {
					backgroundImage,
					color,
					background
				}
			}
		},
		mounted() {
			this.getCarConductor();
			this.getCarType();
			this.getMyCar(this.carId);
		},
		methods: {
			
			// 图片放大
			imgMagnify(index) {
				this.imgShow = true;
				this.currentIndex = index;
			},
			
			imghide(e) {
				this.imgShow = e;
			},
			
			inputCan() {
				this.carConductorVal = '';
			},
			
			// 取消
			cancel() {
				this.carConductorShow = false;
				this.vehicletype = '';
				// 选中的车辆类型ID
				this.carTypeId = '';
				this.carTypeName = '';
				// 选中的车长
				this.carConductorName = '';
				// 输入的车长
				this.carConductorVal = '';
			},
			
			// 按键被点击(点击退格键不会触发此事件)
			valChange(val) {
				// 将每次按键的值拼接到value变量中，注意+=写法
				if(this.carConductorVal.length <= 4) {
					this.carConductorVal += val;
				}
				console.log(this.carConductorVal);
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if(this.carConductorVal.length) this.carConductorVal = this.carConductorVal.substr(0, this.carConductorVal.length - 1);
				console.log(this.carConductorVal);
			},
			
			// 获取修改车辆信息
			getMyCar(id) {
				if(this.carAuthState == 2) {
					ajax.get(config.driverCar_url + `/${id}`,{
					}).then(res => {
						console.log(res);
						if(res.code == 0){
							this.vehiclefaceUrl = res.data.facePath;
							this.vehiclebaceUrl = res.data.backPath;
							
							// 图片集合
							if(this.vehiclefaceUrl) {
								this.swiperImages.push(this.vehiclefaceUrl)
							}
							if(this.vehiclebaceUrl) {
								this.swiperImages.push(this.vehiclebaceUrl)
							}
							
							this.carTypeId = res.data.carModelId;
							this.carTypeName = res.data.carModelName;
							let result = this.carConductorList.find(item =>{
								return item.name == res.data.carConductor;
							});
							console.log(result);
							if(result === undefined) {
								this.carConductorVal = res.data.carConductor;
								this.vehicletype = `${this.carConductorVal}米-${this.carTypeName}`;
							} else {
								this.carConductorName = res.data.carConductor;
								this.vehicletype = `${this.carConductorName}米-${this.carTypeName}`;
							}
						} else {
							console.log(res);
						}
					}).catch(err => {
						console.log("获取修改车辆信息接口数据返回失败 error is :" + err);
					})
				}
			},
			
			// 返回当前页
			goBack() {
				this.failShow = false;
			},
			
			// 车型车长确认
			carAffirm() {
				if(this.carConductorVal == '' && this.carConductorName == '') {
					uni.showToast({title:"请选择车长",icon: "none",duration:2000})
				} else {
					if(this.carTypeId == '') {
						uni.showToast({title:"请选择车型",icon: "none",duration:2000})
					} else {
						if(this.carConductorVal != '') {
							this.carConductorName = '';
							this.carConductorShow = false;
							this.vehicletype = `${this.carConductorVal}米-${this.carTypeName}`;
						} else {
							this.carConductorShow = false;
							this.vehicletype = `${this.carConductorName}米-${this.carTypeName}`;
						}
					}
				}
			},
			
			// 返回我的车辆
			goMyCar() {
				uni.navigateBack({
				    delta: 1
				});
			},
			
			// 确认去配货大厅找货
			goHall() {
				uni.reLaunch({
					url: "/pages/allocation/allocation",
				});
			},
			
			// 车辆新增和修改车辆
			addMyCar() {
				let carlength;
				if(this.carConductorVal == '') {
					carlength = this.carConductorName;
				} else {
					carlength = this.carConductorVal;
				}
				this.btnAstrict = true;
				if(this.carAuthState == 2) {
					ajax.put(config.driverCar_url + `/${this.carId}`,{
						carConductor: carlength,
						carModelId: this.carTypeId,
					}).then(res => {
						if(res.code == 0){
							this.alterSucceedShow = true;
						} else {
							this.alterFailShow = true;
						}
					}).catch(err => {
						console.log("车辆修改接口数据返回失败 error is :" + err);
					})
				} else {
					ajax.post(config.driverCar_url,{
						facePath: this.vehiclefaceUrl,
						backPath: this.vehiclebaceUrl,
						carConductor: carlength,
						carModelId: this.carTypeId,
					}).then(res => {
						if(res.code == 0){
							if(this.carAuthState == 1) {
								this.passShow = true;
							} else if(this.carAuthState == 0) {
								this.succeedShow = true;
							}
						} else {
							console.log(res);
							if(this.carAuthState == 1) {
								this.btnAstrict = false;
								this.failssShow = true;
							} else if(this.carAuthState == 0) {
								this.failShow = true;
							}
						}
					}).catch(err => {
						console.log("车辆新增接口数据返回失败 error is :" + err);
					})
				}
			},
			
			// 选中的车辆类型
			carTypeChange(e) {
				this.carTypeId = e.id;
				this.carTypeName = e.name;
			},
			
			// 选中的车长
			carConductorChange(e) {
				this.carConductorName = e.name;
				this.carConductorVal = '';
			},
			
			// 获取车长列表
			getCarConductor() {
				ajax.get(config.carConductor_url,{
				}).then(res => {
					console.log(res);
					if(res.code == 0){
						this.carConductorList = res.data;
					} else {
						console.log(res);
					}
				}).catch(err => {
				  console.log("获取车长数据返回失败 error is :" + err);
				})
			},
			
			// 获取车俩类型列表
			getCarType() {
				ajax.get(config.carModel_url,{
				}).then(res => {
					console.log(res);
					if(res.code == 0){
						this.carTypeList = res.data;
					} else {
						console.log("获取车俩类型数据返回失败 error is :" + err);
					}
				}).catch(err => {
				  console.log("获取车俩类型数据返回失败 error is :" + err);
				})
			},
			
			// OSS图片上传
			uploadOss(base64,type){
				uni.showLoading({
					title: '上传中',
					mask: true
				});
				// console.log(type)
				ajax.post(config.uploadOss_url,{
					base64: base64,
					type: type,
					roleType: 2
				}).then(res => {
					console.log(res)
					if(res.code == 0){
						uni.hideLoading();
						if(type == 5) {
							this.vehiclefaceUrl = res.data.url;
							this.carName = res.data.drivingLicenseDTO.owner;
							this.carNo = res.data.drivingLicenseDTO.plateNumber;
							this.carTypess = res.data.drivingLicenseDTO.vehicleType;
						} else if(type == 6) {
							this.vehiclebaceUrl = res.data.url;
						}
					} else {
						console.log(res);
						if(res.code == -7035 || res.code == -7116) {
							uni.showToast({title: res.msg, icon: "none",duration:2000})
						} else {
							uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
						}
					}
				}).catch(err => {
				    console.log("OSS图片上传接口数据返回失败 error is :" + err);
				})
			},
			
			// 上传图片
			addImg(e){
				let name = e.currentTarget.dataset.img
				uni.chooseImage({
					count: 1, // 默认最多一次选择9张图
					// sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有(如果不设置设置二者都有)
					success: res=> {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						let url = res.tempFilePaths[0];
						let resPath = url;
						let path = plus.io.convertLocalFileSystemURL(resPath);
						let compressImgTool = uni.requireNativePlugin("CL-CompressImg");
						compressImgTool.imageCompressToByteOptions({path:path, toByte:500}, res => {
							const {code} = res;
							if(code == 1) {
								//路径转换;将绝对路径转为平台的相对路径
								let compressPath = plus.io.convertAbsoluteFileSystem(res.filePath);	
								console.log(compressPath);
								if(uni.getSystemInfoSync().platform == 'android') {
									if(compressPath.startsWith("_doc/")) {
										pathToBase64(compressPath).then(base64 => {
											this.uploadOss(base64,name);
										}).catch((err) => {
											console.log(err);
											uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
										})
									} else {
										let compressImgPath = "file://"+compressPath;
										pathToBase64(compressImgPath).then(base64 => {
											this.uploadOss(base64,name);
										}).catch((err) => {
											console.log(err);
											uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
										})
									}
								} else {
									pathToBase64(compressPath).then(base64 => {
										this.uploadOss(base64,name);
									}).catch((err) => {
										console.log(err);uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
									})
								}
							} else {
								uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
							}
						})
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.addCarBox {
		width: 100%;
		height: 100vh;
		position: relative;
		.warp {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
		
		.rect {
			width: 700rpx;
			height: 408rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.slot-wrap {
			font-size: 24rpx;
			color: #F96F2B;
			margin-right: 30rpx;
		}
		.content {
			margin-top: 34rpx;
			width: 100%;
			padding: 0 30rpx;
			.length {
				margin-top: 24rpx;
				position: relative;
				.inpsty {
					font-size: 28rpx;
					color: #999999;
				}
				.lengthInp {
					height: 64rpx;
					background: #F1F2F6;
					border: 1rpx solid #EBEBEB;
					border-radius: 8rpx;
					padding: 0 20rpx;
				}
				.unit {
					position: absolute;
					top: 7rpx;
					right: 20rpx;
					font-size: 28rpx;
				}
			}
			.contentCon {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.title {
					font-size: 24rpx;
					color: #333333;
					margin-right: 12rpx;
				}
				.titRight {
					font-size: 20rpx;
					color: #999999;
				}
			}
			.title {
				font-size: 24rpx;
				color: #333333;
			}
			.conContent {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				align-items: center;
				.carType {
					width: 160rpx !important;
					margin-top: 16rpx;
					height: 60rpx;
					line-height: 60rpx;
					background: #F1F2F6;
					border-radius: 8rpx;
					font-size: 24rpx;
					text-align: center;
					color: #333333;
					margin-right: 16rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
				.carType:nth-of-type(4n){
					margin-right: 0;
				}
				.checkCarType {
					color: #FB6E2F;
					border: 2rpx solid #FEC24D;
					background: #FFF3DB;
					position: relative;
					.fangkuai {
						width: 24rpx;
						height: 24rpx;
						background: #FD8624;
						border-radius: 8rpx 0rpx 8rpx 0rpx;
						position: absolute;
						bottom: -2rpx;
						right: -2rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						.duigouChengss {
							font-size: 10rpx;
							color: #fff;
						}
					}
				}
			}
		}
		.carConTit {
			width: 100%;
			height: 90rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			border-bottom: 1px solid #DDDDDD;
			.carConTitBtn {
				width: 100rpx;
				height: 44rpx;
				background: #CCCCCC;
				border-radius: 40rpx;
				font-size: 24rpx;
				line-height: 44rpx;
				color: #333333;
				text-align: center;
			}
			.carConTitCon {
				font-size: 32rpx;
				font-weight: 600;
				color: #F96F2B;
			}
		}
		.slot-content {
			height: 300rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			.titImg {
				width: 120rpx;
				height: 111rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.tongguo1 {
					font-size: 110rpx;
					color: #1bb68a;
				}
				.shibai1 {
					font-size: 110rpx;
					color: #f96f2b;
				}
			}
			.title {
				font-size: 36rpx;
				color: #333333;
			}
		}
		.addCarCont {
			width: 100%;
			padding: 0 30rpx;
			margin-top: 40rpx;
			background: #ffffff;
			.autConCon2 {
				border-bottom: 2rpx solid #f5f5f5;
				width: 100%;
				height: 74rpx;
				font-size: 28rpx;
				color: #666666;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.fanhuiYou1 {
					font-size: 20rpx;
					color: #999999;
				}
				.inpsty {
					font-size: 28rpx;
					color: #999999;
				}
				.autConCon2Tit {
					width: 23%;
					height: 38rpx;
					line-height: 38rpx;
				}
				.autConCon2Inp {
					width: 70%;
					font-size: 28rpx;
					margin-left: 30rpx;
					height: 38rpx;
					line-height: 38rpx;
				}
			}
			.titStyle {
				width: 90%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.titStyle-text {
					font-size: 28rpx;
					color: #666666;
				}
			}
			.addCarCont-tit {
				width: 100%;
				border-bottom: 2rpx solid #f5f5f5;
				height: 74rpx;
				font-size: 28rpx;
				line-height: 74rpx;
				color: #666666;
			}
			.autConCon1 {
				width: 100%;
				border-bottom: 2rpx solid #f5f5f5;
				height: 244rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				.autConConItem4 {
					width: 310rpx;
					height: 168rpx;
					border-radius: 8rpx;
					background-image: url(../../static/img13.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
					background-position: center center;
					text-align: center;
					padding-top: 110rpx;
				}
				.autConConItem5 {
					width: 310rpx;
					height: 168rpx;
					border-radius: 8rpx;
					background-image: url(../../static/img14.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
					background-position: center center;
					text-align: center;
					padding-top: 110rpx;
				}
				.autConConItem3 {
					width: 310rpx;
					height: 168rpx;
					border-radius: 8rpx;
					text-align: center;
					.image {
						max-width: 310rpx;
						max-height: 168rpx;
					}
				}
			}
		}
		.submitBtn {
			width: 92%;
			height: 80rpx;
			line-height: 80rpx;
			margin-top: 150rpx;
			color: #333333;
			position: absolute;
			left: 4%;
			bottom: 5%;
		}
		.loginButton {
			background: #DDDDDD !important;
			color: #333333;
		}
	}
</style>
