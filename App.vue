<script>
	import Vue from 'vue'
	import ajax from './service/ajax.js'
	import config from './service/config.js'
	//#ifdef APP-PLUS
	import permision from "@/js_sdk/wa-permission/permission.js"
	//#endif
	export default {
		data() {
			return { 
				isIos: true,
			}
		},
		onLaunch: function() {
			
			
			
			// #ifdef APP-PLUS
			plus.push.addEventListener("click", function(msg) {    
			    console.log("click:"+JSON.stringify(msg));    
			    console.log(msg.payload);    
			    //这里可以写跳转业务代码
			    setTimeout(function(){  
					if(msg.payload.indexOf("#") != -1){
						let payload = msg.payload.split("#")
						if(payload[0] == 1) {
							//跳订单详情
							uni.navigateTo({
								url: "/pages/orderDetails/orderDetails?id="+ payload[1]
							})
						}
					} else {
					    //跳消息列表
					    uni.navigateTo({
							url:'/pages/message/message'
					    })
					}
			    },500)  
			}, false);
				
			//监听在线消息事件  
			plus.push.addEventListener("receive", function(msg) {    
			    // plus.ui.alert(2);    
			    //这里可以写跳转业务代码  
			    console.log("recevice:"+JSON.stringify(msg))
			    setTimeout(function(){  
					if(msg.payload.indexOf("#") != -1){
						let payload = msg.payload.split("#")
						if(payload[0] == 1) {
							//跳订单详情
							uni.navigateTo({
								url: "/pages/orderDetails/orderDetails?id="+ payload[1]
							})
						}
					} else {
					    //跳消息列表
					    uni.navigateTo({
							url:'/pages/message/message'
					    })
					}  
			    },500)
			}, false);
			// #endif
			
			// 授权位置弹窗
			// #ifdef APP-PLUS
			this.isIos = (plus.os.name == "iOS")
			// #endif
			
			//免登陆
			uni.getStorage({
				key: 'accessToken',
				success: reg => {
					console.log(reg);
					let $cid = 123;
					// #ifdef APP-PLUS
					let pinf = plus.push.getClientInfo();
					$cid = pinf.clientid;
					// #endif
					//调用用户信息查询接口测试token是否可以使用
					uni.request({
						url: config.userMess_url,
						method: "get",
						header: {
							'Content-Type': 'application/x-www-form-urlencoded', // 默认值
							'Authorization': 'Bearer ' + reg.data
						},
						data: {
							type: 2,
							cid: $cid
						},
						success: res => {
							console.log(res);
							if (res.data.code == 0) {
								//往vuex里面塞token
								this.$store.commit("getAccessToken",reg.data);
								//去配货大厅
								uni.reLaunch({
									url: "/pages/allocation/allocation"
								})
							}else if (res.data.code == -7019) {
								uni.removeStorage({
								    key: 'accessToken',
								    success: res => {
								        console.log(res);
								    }
								});
								uni.removeStorage({
								    key: 'refreshToken',
								    success: res => {
								        console.log(res);
								    }
								});
								uni.showToast({
									title:"该手机号未注册,正在返回登录页",
									duration:2000,
									icon:"none"
								})
								setTimeout(function(){
									uni.redirectTo({
										url: "/pages/login/login"
									})
								},2000)
							}else if (res.data.code == -7110) {
								uni.removeStorage({
								    key: 'accessToken',
								    success: res => {
								        console.log(res);
								    }
								});
								uni.removeStorage({
								    key: 'refreshToken',
								    success: res => {
								        console.log(res);
								    }
								});
								uni.showToast({
									title:"该货主不存在,正在返回登录页",
									duration:2000,
									icon:"none"
								})
								setTimeout(function(){
									uni.redirectTo({
										url: "/pages/login/login"
									})
								},2000)
							}
						},
						complete: code => {
							if (code.statusCode == 401) {
								// token过期.用refreshToken刷新accesstoken,并保存到本地缓存
								uni.getStorage({
									key: 'refreshToken',
									success: reg => {
										ajax.post(config.refresh_url,{
											refreshToken: reg.data
										}).then(res => {
											if(res.code == 0) {
												this.$store.commit("getAccessToken",res.data.access_token);
												this.$store.commit("getRefreshToken",res.data.refresh_token);
												uni.setStorage({
													key: 'accessToken',
													data: res.data.access_token,
												});
												uni.setStorage({
													key: 'refreshToken',
													data: res.data.refresh_token,
												});
												uni.setStorage({
													key: 'username',
													data: res.data.username,
												});
												//去配货大厅
												uni.reLaunch({
													url: "/pages/allocation/allocation"
												})
											}
										}).catch(err => {
											console.log(err)
										})
									},
								});
							}
						},
						fail: err => {
							//失败结果
							console.log(err)
							uni.navigateTo({
								url: "/pages/networkAnomaly/networkAnomaly"
							})
						}
					})
				},
				fail: err => {
					//失败结果
					console.log(err)
				}
			});
			
			// #ifdef APP-PLUS
			plus.screen.lockOrientation("portrait-primary"); 
			// #endif
			uni.getSystemInfo({  
				success:function(e){
					Vue.prototype.statusBar = e.statusBarHeight + 44
					// Vue.prototype.statusBar = 20
					// #ifndef MP  
					if(e.platform == 'android') {  
						Vue.prototype.customBar = e.statusBarHeight + 50  
					}else {  
						Vue.prototype.customBar = e.statusBarHeight + 45
					}
					// #endif
		
					// #ifdef MP-WEIXIN  
					let custom = wx.getMenuButtonBoundingClientRect()  
					Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight  
					// #endif  
		
					// #ifdef MP-ALIPAY  
					Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight  
					// #endif  
				}  
			})
			
			uni.getLocation({
			    type: 'gcj02',
			    success: res => {
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
					this.$store.commit("getLon", res.longitude);
					this.$store.commit("getLat", res.latitude);
					uni.setStorage({
						key: 'loc',
						data: res,
					});
			    },
				fail: err => {
					console.log('不支持地图');
				}
			});
			
			setInterval(()=>{
				uni.getLocation({
				    type: 'gcj02',
				    success: res => {
				        // console.log('当前位置的经度：' + res.longitude);
				        // console.log('当前位置的纬度：' + res.latitude);
						this.$store.commit("getLon", res.longitude);
						this.$store.commit("getLat", res.latitude);
				    },
					fail: err => {
						console.log('不支持地图');
					}
				});
			},30000)
		},
		onShow: function() {
			//免登陆
			uni.getStorage({
				key: 'accessToken',
				success: reg => {
					console.log(reg);
					let $cid = 123;
					// #ifdef APP-PLUS
					let pinf = plus.push.getClientInfo();
					$cid = pinf.clientid;
					// #endif
					//调用用户信息查询接口测试token是否可以使用
					uni.request({
						url: config.userMess_url,
						method: "get",
						header: {
							'Content-Type': 'application/x-www-form-urlencoded', // 默认值
							'Authorization': 'Bearer ' + reg.data
						},
						data: {
							type: 2,
							cid: $cid
						},
						success: res => {
							console.log(res);
							if (res.data.code == 0) {
								//往vuex里面塞token
								this.$store.commit("getAccessToken",reg.data);
							}else if (res.data.code == -7019) {
								uni.removeStorage({
								    key: 'accessToken',
								    success: res => {
								        console.log(res);
								    }
								});
								uni.removeStorage({
								    key: 'refreshToken',
								    success: res => {
								        console.log(res);
								    }
								});
								uni.showToast({
									title:"该手机号未注册,正在返回登录页",
									duration:2000,
									icon:"none"
								})
								setTimeout(function(){
									uni.redirectTo({
										url: "/pages/login/login"
									})
								},2000)
							}else if (res.data.code == -7110) {
								uni.removeStorage({
								    key: 'accessToken',
								    success: res => {
								        console.log(res);
								    }
								});
								uni.removeStorage({
								    key: 'refreshToken',
								    success: res => {
								        console.log(res);
								    }
								});
								uni.showToast({
									title:"该货主不存在,正在返回登录页",
									duration:2000,
									icon:"none"
								})
								setTimeout(function(){
									uni.redirectTo({
										url: "/pages/login/login"
									})
								},2000)
							}
						},
						complete: code => {
							if (code.statusCode == 401) {
								// token过期.用refreshToken刷新accesstoken,并保存到本地缓存
								uni.getStorage({
									key: 'refreshToken',
									success: reg => {
										ajax.post(config.refresh_url,{
											refreshToken: reg.data
										}).then(res => {
											if(res.code == 0) {
												this.$store.commit("getAccessToken",res.data.access_token);
												this.$store.commit("getRefreshToken",res.data.refresh_token);
												uni.setStorage({
													key: 'accessToken',
													data: res.data.access_token,
												});
												uni.setStorage({
													key: 'refreshToken',
													data: res.data.refresh_token,
												});
												uni.setStorage({
													key: 'username',
													data: res.data.username,
												});
												//去配货大厅
												uni.reLaunch({
													url: "/pages/allocation/allocation"
												})
											}
										}).catch(err => {
											console.log(err)
										})
									},
								});
							}
						},
						fail: err => {
							//失败结果
							console.log(err)
							uni.navigateTo({
								url: "/pages/networkAnomaly/networkAnomaly"
							})
						}
					})
				},
				fail: err => {
					//失败结果
					console.log(err)
				}
			});
			
			setTimeout(()=>{
				// #ifdef APP-PLUS 
				plus.navigator.closeSplashscreen()
				// #endif
			}, 2000)
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@font-face {
		font-family: "PingFang";
		src: url("./static/PingFang-SC-Regular.ttf");
	}
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	@import './common/uni.css';
	/* 全局样式 */
	*{
		padding:0;
		margin: 0;
		box-sizing:border-box;
		font-family: "PingFang";
	}
	body{
		background: #F5F6F7;
	}
	.u-form-item__message {
		margin-top: -26rpx !important;
		font-size: 20rpx !important;
		padding-left: 130rpx !important;
		line-height: 20rpx !important;
	}
	.u-fixed-placeholder[data-v-180fb800] {
		height: 110rpx !important;
	}
	
	.uni-calendar--fixed[data-v-21a99d64] {
		z-index: 1000 !important;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
	}
	.uni-calendar--fixed-top[data-v-21a99d64] {
		border-top: none !important;
		border-bottom: 1rpx solid #DDDDDD;
	}
	.uni-calendar__mask[data-v-21a99d64] {
		z-index: 999 !important;
	}
	
	.slot-wrap {
		font-size: 24rpx;
		color: #F96F2B;
		margin-right: 30rpx;
	}
	.u-tabbar__content__circle__border {
		display: none !important;
	}
	.u-btn-picker[data-v-70102400] {
		padding: 0 !important;
		width: 100rpx;
		height: 44rpx;
		line-height: 44rpx;
		background: #F1F2F6;
		border-radius: 40rpx;
		font-size: 24rpx;
	}
	.u-btn-picker--primary[data-v-70102400] {
		background: #FEC24D;
		color: #333333 !important;
	}
	.u-picker__title[data-v-70102400] {
		color: #FB6E2F !important;
		font-size: 36rpx;
	}
	.u-picker-header[data-v-70102400] {
		height: 101rpx !important;
	}
	.u-select__header[data-v-a577ac80] {
		border-bottom: 2rpx solid #DDDDDD;
	}
</style>
