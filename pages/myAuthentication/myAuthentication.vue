<template>
	<view class="authBox">
		<u-navbar :is-back="authState != 2" back-text="" title="实名认证">
			<view v-if="authState == 2" slot="right" class="slot-wrap" @click="goHall">
				跳过
			</view>
		</u-navbar>
		<view class="topHint" v-if="authState != 1" :style="{top: `${barheight}px`}">
			只有通过实名认证，才能进行货运下单
		</view>
		<view class="authContss">
			<view class="authCont" style="border-radius: 20rpx 20rpx 0 0;">
				<view class="authCont-tit">身份证照片</view>
				<view class="autConCon1" v-if="authState != 1">
					<view class="autConConItem1" @click="addImg" data-img="1" v-if="faceUrl == ''">点击上传身份证正面</view>
					<view class="autConConItem3" @click="addImg" data-img="1" v-else>
						<image class="image" :src="faceUrl" mode="aspectFit"></image>
					</view>
					<view class="autConConItem2" @click="addImg" data-img="2" v-if="baceUrl == ''">点击上传身份证反面</view>
					<view class="autConConItem3" @click="addImg" data-img="2" v-else>
						<image class="image" :src="baceUrl" mode="aspectFit"></image>
					</view>
				</view>
				<view class="autConCon1" v-else>
					<view class="autConConItem3" @click="imgMagnify(0)">
						<image class="image" :src="idCardFacePath" mode="aspectFit"></image>
					</view>
					<view class="autConConItem3" @click="imgMagnify(1)">
						<image class="image" :src="idCardFaceBack" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="autConCon2" v-if="authState != 1" style="border-bottom: 2rpx solid #f5f5f5;">
				<view class="autConCon2Tit">身份证姓名</view>
				<input style="width: 62%;" class="autConCon2Inp" disabled placeholder-class="inpsty" disabled placeholder="自动获取身份证姓名" type="text" v-model="idName" />
				<view style="width: 10rpx; height: 18rpx;"></view>
			</view>
			<view class="autConCon2" v-if="authState != 1" style="border-bottom: 2rpx solid #f5f5f5;">
				<view class="autConCon2Tit">身份证号</view>
				<input style="width: 62%;" class="autConCon2Inp" disabled placeholder-class="inpsty" disabled placeholder="自动获取身份证号码" type="text" v-model="idNumber" />
				<view style="width: 10rpx; height: 18rpx;"></view>
			</view>
			<view v-if="authState != 1" class="authCont-mid" @click="humanFaceAdd" data-img="humanFace">
				<view class="authCont-tit">人脸识别</view>
				<view class="authCont-mid-right">
					<Icon :iconType="'iconrenlianshibie'" extClass="renlianshibie" v-if="faceState == -1"></Icon>
					<view class="faceStates" v-if="faceState == 1">人脸识别成功</view>
					<view class="faceStates" v-if="faceState == 0">人脸识别失败，请重新识别</view>
					<Icon :iconType="'iconfanhuiYou1'" extClass="fanhuiYou1"></Icon>
				</view>
			</view>
			<view v-else class="authCont-mid" data-img="humanFace">
				<view class="authCont-tit">人脸识别</view>
				<view class="authCont-mid-right">
					<view class="faceStates">人脸识别成功</view>
				</view>
			</view>
			<view class="authCont" :style="[authState == 1 ? brad : '']">
				<view class="authCont-tit">驾驶证照片</view>
				<view class="autConCon1" v-if="authState != 1">
					<view class="autConConItem4" @click="addImg" data-img="3" v-if="vehiclefaceUrl == ''">点击上传驾驶证正本</view>
					<view class="autConConItem3" @click="addImg" data-img="3" v-else>
						<image class="image" :src="vehiclefaceUrl" mode="aspectFit"></image>
					</view>
					<view class="autConConItem5" @click="addImg" data-img="4" v-if="vehiclebaceUrl == ''">点击上传驾驶证副本</view>
					<view class="autConConItem3" @click="addImg" data-img="4" v-else>
						<image class="image" :src="vehiclebaceUrl" mode="aspectFit"></image>
					</view>
				</view>
				<view class="autConCon1" v-else>
					<view class="autConConItem3" @click="imgMagnify(2)">
						<image class="image" :src="driverLicenseFacePath" mode="aspectFit"></image>
					</view>
					<view class="autConConItem3" @click="imgMagnify(3)">
						<image class="image" :src="driverLicenseBackPath" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="autConCon2" v-if="authState != 1" style="border-bottom: 2rpx solid #f5f5f5;">
				<view class="autConCon2Tit">驾驶证姓名</view>
				<input style="width: 62%;" class="autConCon2Inp" disabled placeholder-class="inpsty" disabled placeholder="自动获取驾驶证姓名" type="text" v-model="drivingName" />
				<view style="width: 10rpx; height: 18rpx;"></view>
			</view>
			<view class="autConCon2" v-if="authState != 1" style="border-bottom: 2rpx solid #f5f5f5;">
				<view class="autConCon2Tit">驾驶证号</view>
				<input style="width: 62%;" class="autConCon2Inp" disabled placeholder-class="inpsty" disabled placeholder="自动获取驾驶证号码" type="text" v-model="drivingNumber" />
				<view style="width: 10rpx; height: 18rpx;"></view>
			</view>
			<view v-if="authState != 1" style="border-radius: 0 0 20rpx 20rpx;" class="autConCon2" @click="transportProShow = true">
				<text class="autConCon2Tit">运输性质</text>
				<input style="width: 62%;" class="autConCon2Inp" disabled placeholder-class="inpsty" type="text" name="transportProName" v-model="transportProName" placeholder="请选择您的运输性质">
				<Icon :iconType="'iconfanhuiYou1'" extClass="fanhuiYou1"></Icon>
			</view>
		</view>
		<view class="personalBot">
			<view class="personalBot-yuan"></view>
			<view class="personalBot-text">一旦认证成功，将无法修改认证信息，请仔细核对再提交审核</view>
		</view>
		
		<u-popup border-radius="40" v-model="transportProShow" mode="bottom" :mask-custom-style="{background: 'rgba(0, 0, 0, 0.3)'}">
			<view class="carConTit">
				<view class="carConTitBtn" @click="transportProShow = false">取消</view>
				<view class="carConTitCon">运输性质</view>
				<view class="carConTitBtn" style="background: #FEC24D;" @click="carAffirm">确认</view>
			</view>
			<view class="content" style="margin-bottom: 44rpx;">
				<view  class="conContent">
					<view 
						@click="transportProChange(item)" 
						v-for="(item, index) in transportNatureList" :key="index" 
						class="carType"
						:class="{ checkCarType: transportproObj.name == item.name }"
					>
						{{item.name}}
						<view class="fangkuai" v-if="transportproObj.name == item.name">
							<Icon :iconType="'iconduigouCheng'" extClass="duigouChengss"></Icon>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		
		<u-popup width="640" height="386" border-radius="20" :mask-custom-style="{background: 'rgba(0, 0, 0, 0.3)'}" :closeable="true" v-model="popShow" mode="center">
			<view class="hintTit">温馨提示</view>
			<view class="hintCon">人脸识别前，请先上传身份证</view>
			<view class="hintBtn" @click="popShow = false">返回</view>
		</u-popup>
		
		<u-modal confirm-text="返回" :mask-close-able="false" width="640" v-model="succeedShow" :show-title="false" :confirm-style="{'border-buttom': '2rpx solid #dddddd', 'font-size': '32rpx', 'color': '#F96F2B',}" @confirm="goMyMessage">
			<view class="slot-content">
				<view class="titImg">
					<Icon :iconType="'icontongguo1'" extClass="tongguo1"></Icon>
				</view>
				<view class="title">实名认证成功</view>
			</view>
		</u-modal>
		
		<u-modal confirm-text="返回" width="640" v-model="failShow" :show-title="false" :confirm-style="{'border-buttom': '2rpx solid #dddddd', 'font-size': '32rpx', 'color': '#F96F2B',}" @confirm="goBack">
			<view class="slot-content">
				<view class="titImg">
					<Icon :iconType="'iconshibai1'" extClass="shibai1"></Icon>
				</view>
				<view class="title">认证失败，请重新上传相关证件</view>
			</view>
		</u-modal>
		
		<view class="Buttonss">
			<button v-if="authState != 1" :disabled="faceUrl == '' || baceUrl == '' || vehiclefaceUrl == '' || vehiclebaceUrl == '' || transportproId == '' || faceState != 1 || btnAstrict" style="background: #FFC24D;" class="submitBtn" :class="{loginButton: faceUrl == '' || baceUrl == '' || vehiclefaceUrl == '' || vehiclebaceUrl == '' || transportproId == '' || faceState != 1 || btnAstrict}" @click="realAuth">{{ authState == 2 ? '下一步' : '提交审核' }}</button>
		</view>
		<helang-compress ref="helangCompress"></helang-compress>
		<swiperImage :maskShow="imgShow" v-if="imgShow" @change="imghide" :swiperImages="swiperImages" :currentIndex="currentIndex"></swiperImage>
	</view>
</template>

<script>
	import config from '../../service/config.js';
	import ajax from '../../service/ajax.js';
	import {pathToBase64} from '@/js_sdk/gsq-image-tools/image-tools/index.js';
	import helangCompress from '../../components/helang-compress/helang-compress';
	const permissionUtils = require('../../utils/permissionUtils.js')
	const bdOCR = uni.requireNativePlugin('liyahong-BDOCR')
	var useOCR = false
	export default {
		data() {
			return {
				barheight: this.statusBar,
				// 图片放大
				imgShow: false,
				currentIndex: 0,
				swiperImages: [],
				
				brad: {borderRadius: '0 0 20rpx 20rpx'},
				
				// 身份证姓名
				idName: '',
				// 身份证号
				idNumber: '',
				// 驾驶证姓名
				drivingName: '',
				// 驾驶证号
				drivingNumber: '',
				
				// 认证状态
				faceState: -1,
				
				// 身份证主页url
				faceUrl: '',
				// 身份证副页Url
				baceUrl: '',
				
				// 驾驶证主页url
				vehiclefaceUrl: '',
				// 驾驶证副页Url
				vehiclebaceUrl: '',
				
				// 运输性质
				transportproObj: '',
				// 选中的运输性质
				transportProName: '',
				// 运输性质ID
				transportproId: '',
				// 运输性质列表
				transportNatureList: [],
				// 运输性质显示
				transportProShow: false,
				
				// 身份证正面照
				idCardFacePath: '',
				// 身份证反面照
				idCardFaceBack: '',
				// 驾驶证正面照
				driverLicenseFacePath: '',
				// 驾驶证反面照
				driverLicenseBackPath: '',
				
				authState: null,
				
				succeedShow: false,
				failShow: false,
				popShow: false,
				// 按钮点击限制
				btnAstrict: false
			}
		},
		onLoad(option) {
			this.authState = option.authState;
		},
		mounted() {
			this.getTransportNature();
			this.getMyMessage();
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
			
			// 获取我的信息
			getMyMessage() {
				if(this.authState == 1) {
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
									// 身份证正面照
									this.idCardFacePath = res.data.idCardFacePath;
									// 身份证反面照
									this.idCardFaceBack = res.data.idCardFaceBack;
									// 驾驶证正面照
									this.driverLicenseFacePath = res.data.driverLicenseFacePath;
									// 驾驶证反面照
									this.driverLicenseBackPath = res.data.driverLicenseBackPath;
									
									// 图片集合
									if(this.idCardFacePath) {
										this.swiperImages.push(this.idCardFacePath)
									}
									if(this.idCardFaceBack) {
										this.swiperImages.push(this.idCardFaceBack)
									}
									if(this.driverLicenseFacePath) {
										this.swiperImages.push(this.driverLicenseFacePath)
									}
									if(this.driverLicenseBackPath) {
										this.swiperImages.push(this.driverLicenseBackPath)
									}
								} else {
									console.log(res);
								}
							}).catch(err => {
								console.log("获取我的信息接口数据返回失败 error is :" + err);
							})
						}
					})
				}
			},
			
			// 确认去配货大厅找货
			goHall() {
				uni.reLaunch({
					url: "/pages/allocation/allocation",
				});
			},
			
			// 获取运输性质
			getTransportNature() {
				if(this.authState != 1) {
					ajax.get(config.transportNature_url,{
					}).then(res => {
						console.log(res);
						if(res.code == 0){
							this.transportNatureList = res.data;
						} else {
							console.log(res);
						}
					}).catch(err => {
					  console.log("获取运输性质数据返回失败 error is :" + err);
					})
				}
			},
			
			// 车型车长及运输性质确认
			carAffirm() {
				this.transportProShow = false;
				this.transportProName = this.transportproObj.name;
				this.transportproId = this.transportproObj.id;
			},
			
			// 认证成功跳转到个人信息
			goMyMessage() {
				uni.redirectTo({
					url: "/pages/personalCentre/personalCentre"
				})
			},
			
			// 选中的运输性质
			transportProChange(e) {
				this.transportproObj = e;
			},
			
			// 返回当前页
			goBack() {
				this.failShow = false;
			},
			
			// 实名认证
			realAuth() {
				this.btnAstrict = true;
				ajax.post(config.realAuth_url,{
					type: 2,
					transportNature: this.transportproId
				}).then(res => {
					console.log(res)
					if(res.code == 0){
						if(this.authState == 2) {
							uni.redirectTo({
								url: "/pages/addCar/addCar?carAuthState=1"
							})
						} else if(this.authState == 0) {
							this.succeedShow = true;
						}
					} else {
						this.btnAstrict = false;
						this.failShow = true;
					}
				}).catch(err => {
					this.btnAstrict = false;
				    console.log("实名认证接口数据返回失败 error is :" + err);
				})
			},
			
			// 人脸比对
			faceThan(base64){
				uni.showLoading({
					title: '人脸认证中',
					mask: true
				});
				console.log(this.faceUrl);
				ajax.post(config.faceHuman_url,{
					base64: base64,
					type: 2,
					url: this.faceUrl
				}).then(res => {
					console.log(res)
					uni.hideLoading();
					if(res.code == 0){
						this.faceState = 1;
					} else {
						this.faceState = 0;
					}
				}).catch(err => {
					uni.hideLoading();
				    console.log("人脸比对接口数据返回失败 error is :" + err);
				})
			},
			
			// 上传人脸照片
			humanFaceAdd(e){
				let name = e.currentTarget.dataset.img;
				if(this.faceUrl == '' || this.baceUrl == '') {
					this.popShow = true;
				} else {
					uni.chooseImage({
						count: 1, // 默认最多一次选择9张图
						sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有(如果不设置设置二者都有)
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
												this.faceThan(base64);
											}).catch((err) => {
												console.log(err);
												uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
											})
										} else {
											let compressImgPath = "file://"+compressPath;
											pathToBase64(compressImgPath).then(base64 => {
												this.faceThan(base64);
											}).catch((err) => {
												console.log(err);
												uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
											})
										}
									} else {
										pathToBase64(compressPath).then(base64 => {
											this.faceThan(base64);
										}).catch((err) => {
											console.log(err);
											uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
										})
									}
								} else {
									uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
								}
							})
							// 单张压缩
							// this.$refs.helangCompress.compress({
							//     src: url,
							//     maxSize: 1920,
							//     fileType:'jpg',
							//     quality: 1,
							//     minSize: -1 //最小压缩尺寸，图片尺寸小于该时值不压缩，非H5平台有效。若需要忽略该设置，可设置为一个极小的值，比如负数。
							// }).then((res)=>{
							//     // 压缩成功回调
							// 	console.log(res);
								
							// }).catch((err)=>{
							//     uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
							// })
						}
					})
				}
			},
			
			// OSS图片上传
			uploadOss(base64,type){
				console.log(base64);
				uni.showLoading({
					title: '上传中',
					mask: true
				});
				// console.log(name)
				ajax.post(config.uploadOss_url,{
					base64: base64,
					type: type,
					roleType: 2
				}).then(res => {
					console.log(res)
					uni.hideLoading();
					if(res.code == 0){
						if(type == 1) {
							uni.getImageInfo({
								src: res.data.url,
								success: img => {
									console.log(img);
									let orgArea = img.width * img.height;
									console.log(orgArea);
									let maxWidth = Math.max.apply(Math,res.data.cardAreas.map(item => { return item.x }));
									let minWidth = Math.min.apply(Math,res.data.cardAreas.map(item => { return item.x }));
									let nowWidth = parseInt(maxWidth) - parseInt(minWidth);
									console.log(maxWidth);
									console.log(minWidth);
									console.log(nowWidth);
									let maxHeight = Math.max.apply(Math,res.data.cardAreas.map(item => { return item.y }));
									let minHeight = Math.min.apply(Math,res.data.cardAreas.map(item => { return item.y }));
									let nowHeight = parseInt(maxHeight) - parseInt(minHeight);
									console.log(maxHeight);
									console.log(minHeight);
									console.log(nowHeight);
									let nowArea = parseInt(nowWidth) * parseInt(nowHeight);
									console.log(nowArea);
									let proportion = (nowArea/orgArea) * 100;
									console.log(proportion);
									if(proportion > 50) {
										console.log(res.data.url);
										this.faceUrl = res.data.url;
										this.idName = res.data.idCardDTO.name;
										this.idNumber = res.data.idCardDTO.iDNumber;
									} else {
										uni.showToast({title:"身份证占比应不低于图片大小的50%，请重新拍摄", icon: "none",duration:2000});
									}
								}
							});
						} else if(type == 2) {
							this.baceUrl = res.data.url;
						} else if(type == 3) {
							this.vehiclefaceUrl = res.data.url;
							this.drivingName = res.data.driverLicenseDTO.name;
							this.drivingNumber = res.data.driverLicenseDTO.licenseNumber;
						} else if(type == 4) {
							this.vehiclebaceUrl = res.data.url;
						}
					} else {
						if(res.code == -7032 || res.code == -7033) {
							uni.showToast({title: res.msg, icon: "none",duration:2000})
						} else {
							uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000});
						}
					}
				}).catch(err => {
					uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
					uni.hideLoading();
				    console.log("OSS图片上传接口数据返回失败 error is :" + err);
				})
			},
			getPermission(name) {
				let that = this
				permissionUtils.requestPhonePermission(
					'camera',
					[
						'android.permission.CAMERA'
					],
					function success() {
						that.ocr(name)
					},
					function fail(permission) {
				
					}
				)
			},
			ocr(name) {
				console.log("进来了"+name)
				let ocrType = "idCardFront"
				if(name == "1"){
					ocrType = 'idCardFront'
				}else if(name == "2"){
					ocrType = 'idCardBack'
				}
				// 2.使用自定义样式
				bdOCR.ocr({
					/**
					 * v2.4.2版本加入此功能
					 * 我们注意到有些小伙伴担心前端直接请求百度api会有安全问题，所以我们开放了此功能
					 * 如果此属性设置为false，仅会返回识别图片，不会使用SDK调用OCR相关接口
					 * 如果此属性设置为true，则会返回识别图片，同时也会调用SDK的OCR识别接口，返回OCR识别结果
					 */
					ocr: useOCR, // 选填【是否启用ocr功能】，默认值：true，会返回识别图片+ocr文字信息，设置为false则仅返回被识别的图片
					ocrType: ocrType, // 选填【识别类型】默认值：idCardFront，身份证正面识别，ocrType说明见插件文档
					hintTextColor: '#FF0000', // 选填【提示文字颜色】默认值：#FFFFFF
					hintTextBackgroundColor: '#FFFFFF', // 选填【提示文字背景颜色】默认值：#000000
					backgroundColor: '#000000', // 选填【页面背景颜色】默认值：#000000
					autoScanIdCard: 0, // 选填【是否开启自动识别】默认值：0，0：是|1：否，仅ocrType=‘idCardBack’ 或 ‘idCardFront’时有效
					templateId: '1e6faf0ec8b93006ad5fa31b9238d3b3', // 选填【自定义模板ID】，仅ocrType=‘custom’时有效
					albumEnable: 1 // 选填【是否启用相册选择】默认值：0，0：是|1：否
				}, result => {
					console.log(result)
					switch (result.code) {
						case 1: //ocr文字提取成功
							// 只有开启OCR功能才会返回OCR结果
							if (useOCR) {
								// 为了安全起见，验证下是否为JSON字符串，是则转换为对象
								if (typeof result.ocrResult === 'string') {
									result.ocrResult = JSON.parse(result.ocrResult)
								}
							}
							let base64Result = `data:image/jpg;base64,${result.base64Image}`
							this.uploadOss(base64Result,name);
							delete result.base64Image
							this.ocrResult = JSON.stringify(result)
							break
						case -1: //其他错误，如so加载错误，sdk加载失败等
						case -2: //用户主动关闭
						case -3: //没有提取到文字信息
						case -4: //ocr识别失败，会返回ocrSDK错误信息
							this.ocrResult = JSON.stringify(result)
							break
							/**
							 * 设计以下状态码是考虑到可能有需求要显示自定义弹窗的情况！
							 */
						case 100100: //开始初始化SDK，注意此处如果在网络不好的时候会耗时，为了更好的用户体验，建议设置弹窗等待
							uni.showLoading({
								title: 'SDK加载中...'
							})
							break
						case 100101: //SDK初始化完成，如果100100设置了弹窗等待，那么就在这里关闭
							uni.hideLoading()
							break
						case 100102: //获取文字提取结果，如果精度高会耗时，为了更好的用户体验，建议设置弹窗等待
							uni.showLoading({
								title: '获取结果...'
							})
							break
						case 100103: //提取文字结果完成，如果100102设置了弹窗等待，那么就在这里关闭
							uni.hideLoading()
							break
					}
				})
			},
			// 上传图片
			addImg(e){
				let name = e.currentTarget.dataset.img
				//身份证识别走别的路
				if(name == 1 || name == 2){
					console.log("走起")
					this.getPermission(name)
				}else{
					uni.chooseImage({
						count: 1, // 默认最多一次选择9张图
						// sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有(如果不设置设置二者都有)
						success: res=> {
							// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
							let url = res.tempFilePaths[0];
							console.log(url);
							// pathToBase64(url).then(base64 => {
							// 	this.uploadOss(base64,name);
							// }).catch((err) => {
							// 	console.log(err);
							// 	uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
							// })
							// 单张压缩
							let resPath = url;
							let path = plus.io.convertLocalFileSystemURL(resPath);
							let compressImgTool = uni.requireNativePlugin("CL-CompressImg");
							compressImgTool.imageCompressToByteOptions({path:path, toByte:500}, res => {
								const {code} = res;
								if(code == 1) {
									//路径转换;将绝对路径转为平台的相对路径
									let compressPath = plus.io.convertAbsoluteFileSystem(res.filePath);	
									console.log(compressPath);
									console.log(res.filePath);
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
										console.log(compressPath);
										pathToBase64(compressPath).then(base64 => {
											this.uploadOss(base64,name);
										}).catch((err) => {
											console.log(err);
											uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
										})
									}
								} else {
									uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
								}
							})
							// this.$refs.helangCompress.compress({
							//     src: url,
							//     maxSize: 1920,
							//     fileType:'jpg',
							//     quality: 1,
							//     minSize: -1 //最小压缩尺寸，图片尺寸小于该时值不压缩，非H5平台有效。若需要忽略该设置，可设置为一个极小的值，比如负数。
							// }).then((res)=>{
							//     // 压缩成功回调
							// 	console.log(res);
							// 	pathToBase64(res).then(base64 => {
							// 		this.uploadOss(base64,name);
							// 	}).catch((err) => {
							// 		console.log(err);
							// 		uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
							// 	})
								
							// }).catch((err)=>{
							//     uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
							// })
						}
					})
				}
				
			},
		}
	}
</script>

<style scoped lang="scss">
	.authBox {
		width: 100%;
		height: 100%;
		padding-bottom: 160rpx;
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
			height: 100rpx;
			line-height: 100rpx;
			border-top: 2rpx solid #DDDDDD;
			text-align: center;
			font-size: 32rpx;
			color: #F96F2B;
			position: absolute;
			bottom: 0;
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
		.content {
			margin-top: 34rpx;
			width: 100%;
			padding: 0 30rpx;
			.contentCon {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.title {
					font-size: 32rpx;
					font-weight: 600;
					color: #333333;
				}
				.titRight {
					font-size: 24rpx;
					color: #999999;
				}
			}
			.title {
				font-size: 32rpx;
				font-weight: 600;
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
		.topHint {
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			background: #f6dbce;
			text-align: center;
			font-size: 24rpx;
			color: #F96F2B;
			position: fixed;
			top: 88rpx;
			z-index: 10;
		}
		.authContss {
			width: 100%;
			padding: 0 30rpx;
			margin-top: 90rpx;
			border-radius: 20rpx;
			.autConCon2 {
				width: 100%;
				height: 74rpx;
				font-size: 28rpx;
				color: #666666;
				background: #ffffff;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20rpx;
				.fanhuiYou1 {
					font-size: 20rpx;
					color: #999999;
				}
				.inpsty {
					font-size: 28rpx;
					color: #999999;
				}
				.autConCon2Tit {
					width: 25%;
					height: 38rpx;
					line-height: 38rpx;
				}
				.autConCon2Inp {
					width: 70%;
					margin-left: 30rpx;
					height: 38rpx;
					font-size: 28rpx;
					line-height: 38rpx;
				}
			}
			.authCont-mid {
				width: 100%;
				border-bottom: 2rpx solid #f5f5f5;
				height: 74rpx;
				padding: 0 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #ffffff;
				.authCont-tit {
					font-size: 28rpx;
					color: #666666;
				}
				.authCont-mid-right {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					.faceStates {
						font-size: 28rpx;
						color: #F96F2B;
					}
					.renlianshibie {
						color: #999999;
						font-size: 30rpx;
					}
					.fanhuiYou1 {
						color: #999999;
						font-size: 20rpx;
						margin-left: 12rpx;
					}
				}
			}
			.authCont {
				width: 100%;
				background: #ffffff;
				.authCont-tit {
					width: 100%;
					border-bottom: 2rpx solid #f5f5f5;
					height: 74rpx;
					font-size: 28rpx;
					padding: 0 20rpx;
					line-height: 74rpx;
					color: #666666;
				}
				.autConCon1 {
					width: 100%;
					border-bottom: 2rpx solid #f5f5f5;
					height: 244rpx;
					padding: 0 15rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					.autConConItem1 {
						width: 310rpx;
						height: 168rpx;
						border-radius: 8rpx;
						background-image: url(../../static/img07.png);
						background-repeat: no-repeat;
						background-size: 100% 100%;
						background-position: center center;
						text-align: center;
						padding-top: 110rpx;
					}
					.autConConItem2 {
						width: 310rpx;
						height: 168rpx;
						border-radius: 8rpx;
						background-image: url(../../static/img08.png);
						background-repeat: no-repeat;
						background-size: 100% 100%;
						background-position: center center;
						text-align: center;
						padding-top: 110rpx;
					}
					.autConConItem4 {
						width: 310rpx;
						height: 168rpx;
						border-radius: 8rpx;
						background-image: url(../../static/img11.png);
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
						background-image: url(../../static/img12.png);
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
		.Buttonss {
			width: 100%;
			height: 140rpx;
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			padding: 0 25rpx;
			position: fixed;
			bottom: 0;
			background: #F5F6F7;
			.submitBtn {
				width: 92%;
				height: 80rpx;
				line-height: 80rpx;
				color: #333333;
			}
			.loginButton {
				background: #DDDDDD !important;
				color: #333333;
			}
		}
	}
</style>
