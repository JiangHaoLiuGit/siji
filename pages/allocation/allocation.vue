<template>
	<view class="allocationBox">
		<u-navbar z-index="1000" :is-back="false" title="" :background="topBackground" :border-bottom="false">
			<view class="slot-wrap">
				<view class="both" @click="goPath">常用路线</view>
				<view class="mid">配货大厅</view>
				<view class="both" @click="goFind">找货记录</view>
			</view>
		</u-navbar>
		<view class="kong" :style="{top: `${barheight}px`}">
			<view class="navTop" :style="[downList.length != 0 ? bgWit : '']">
				<view class="navTop-item" @click="downShow(0)">
					<view class="navTop-item-tit" :class="{navTopColor: !downList.indexOf(0)}" >{{ rankingTit }}</view>
					<u-icon name="arrow-down" v-if="downList.indexOf(0)"></u-icon>
					<u-icon name="arrow-up" color="#DB791E" v-else></u-icon>
				</view>
				<view class="navTop-item" @click="downShow(1)">
					<view class="navTop-item-tit" :class="{navTopColor: !downList.indexOf(1)}" >{{ loadingTit }}</view>
					<u-icon name="arrow-down" v-if="downList.indexOf(1)"></u-icon>
					<u-icon name="arrow-up" color="#DB791E" v-else></u-icon>
				</view>
				<view class="navTop-item" @click="downShow(2)">
					<view class="navTop-item-tit" :class="{navTopColor: !downList.indexOf(2)}" >{{ unloadingTit }}</view>
					<u-icon name="arrow-down" v-if="downList.indexOf(2)"></u-icon>
					<u-icon name="arrow-up" color="#DB791E" v-else></u-icon>
				</view>
				<view class="navTop-item" @click="downShow(3)">
					<view class="navTop-item-tit" :class="{navTopColor: !downList.indexOf(3)}" >筛选</view>
					<u-icon name="arrow-down" v-if="downList.indexOf(3)"></u-icon>
					<u-icon name="arrow-up" color="#DB791E" v-else></u-icon>
				</view>
			</view>
		</view>
		<view class="navContent" :style="{top: `${barheight + 33}px`}" v-if="downList.length != 0">
			<!-- 综合排序 -->
			<view class="ranking-slot-content" v-if="downIndex == 0">
				<view class="rankingItem" v-for="(item,index) of rankingList" :key="index" @click="rankingChange(item)">
					<view :class="{rankingColor: cargoObj.sortType == item.value}">{{ item.label }}</view>
					<Icon :iconType="'iconduigouCheng'" extClass="duigouCheng" v-show="cargoObj.sortType == item.value"></Icon>
				</view>
			</view>
			
			<!-- 装货地 -->
			<view class="ranking-slot-title" v-if="showPlace != 1 && downIndex == 1">
				<view class="indexes">
					<view class="indexesTit">选择：{{ loadingItem }}</view>
					<view class="indexesBtn" @click="back(1)">返回上一级</view>
				</view>
			</view>
			<view class="ranking-slot-content" v-if="downIndex == 1">
				<view class="conContent" :class="{conContents: showPlace == 1}">
					<view 
						@click="siteChange(1,1,item)" 
						v-for="(item, index) in nationwideList" :key="item.name" 
						class="carType"
						:class="{ checkCarType: nationwideObj.id == item.id }"
						v-if="showPlace == 1"
					>
						{{item.name}}
						<view class="fangkuai" v-if="nationwideObj.id == item.id">
							<Icon :iconType="'iconduigouCheng'" extClass="duigouChengss"></Icon>
						</view>
					</view>
					<view
						@click="siteChange(1,2,item)" 
						v-for="(item, index) in provinceList" :key="item.name" 
						class="carType"
						:class="{ checkCarType: provinceObj.id == item.id }"
						v-if="showPlace == 2"
					>
						{{item.name}}
						<view class="fangkuai" v-if="provinceObj.id == item.id">
							<Icon :iconType="'iconduigouCheng'" extClass="duigouChengss"></Icon>
						</view>
					</view>
					<view
						@click="siteChange(1,3,item)" 
						v-for="(item, index) in cityList" :key="item.name" 
						class="carType"
						:class="{ checkCarType: cityObj.id == item.id }"
						v-if="showPlace == 3"
					>
						{{item.name}}
						<view class="fangkuai" v-if="cityObj.id == item.id">
							<Icon :iconType="'iconduigouCheng'" extClass="duigouChengss"></Icon>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 卸货地 -->
			<view class="ranking-slot-title" v-if="unshowPlace != 1 && downIndex == 2">
				<view class="indexes">
					<view class="indexesTit">选择：{{ unloadingItem }}</view>
					<view class="indexesBtn" @click="back(2)">返回上一级</view>
				</view>
			</view>
			<view class="ranking-slot-content" v-if="downIndex == 2">
				<view class="conContent" :class="{conContents: unshowPlace == 1}">
					<view 
						@click="siteChange(2,1,item)" 
						v-for="(item, index) in nationwideList" :key="item.name" 
						class="carType"
						:class="{ checkCarType: unnationwideObj.id == item.id }"
						v-if="unshowPlace == 1"
					>
						{{item.name}}
						<view class="fangkuai" v-if="unnationwideObj.id == item.id">
							<Icon :iconType="'iconduigouCheng'" extClass="duigouChengss"></Icon>
						</view>
					</view>
					<view
						@click="siteChange(2,2,item)" 
						v-for="(item, index) in provinceList" :key="item.name" 
						class="carType"
						:class="{ checkCarType: unprovinceObj.id == item.id }"
						v-if="unshowPlace == 2"
					>
						{{item.name}}
						<view class="fangkuai" v-if="unprovinceObj.id == item.id">
							<Icon :iconType="'iconduigouCheng'" extClass="duigouChengss"></Icon>
						</view>
					</view>
					<view
						@click="siteChange(2,3,item)" 
						v-for="(item, index) in cityList" :key="item.name" 
						class="carType"
						:class="{ checkCarType: uncityObj.id == item.id }"
						v-if="unshowPlace == 3"
					>
						{{item.name}}
						<view class="fangkuai" v-if="uncityObj.id == item.id">
							<Icon :iconType="'iconduigouCheng'" extClass="duigouChengss"></Icon>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 筛选 -->
			<view class="filtrate-slot-content" v-if="downIndex == 3">
				<view class="filtrateList">
					<view class="filtrateList-path">
						<view class="title">常用路线</view>
						<view @click="pathChange(-1)" class="pathType" :class="{ checkPathType: cargoObj.lineType == -1}">
							不限路线
							<view class="fangkuai" v-if="cargoObj.lineType == -1">
								<Icon :iconType="'iconduigouCheng'" extClass="duigouChengss"></Icon>
							</view>
						</view>
						<view
							@click="pathChange(item)" 
							v-for="(item, index) in pathList" :key="item.id" 
							class="pathType"
							:class="{ checkPathType: cargoObj.lineType == item.id }"
						>
							<view class="pathType-both">
								<text class="pathType-both-yuan">●</text>
								<text class="pathType-both-text" :class="{ checkColor: cargoObj.lineType == item.id }" v-if="item.loadingCityNames.length == 3">
									{{ item.loadingCityNames[0].label }}/{{ item.loadingCityNames[1].label }}/{{ item.loadingCityNames[2].label }}
								</text>
								<text class="pathType-both-text" :class="{ checkColor: cargoObj.lineType == item.id }" v-else-if="item.loadingCityNames.length == 2">
									{{ item.loadingCityNames[0].label }}/{{ item.loadingCityNames[1].label }}
								</text>
								<text class="pathType-both-text" :class="{ checkColor: cargoObj.lineType == item.id }" v-else>
									{{ item.loadingCityNames[0].label }}
								</text>
								<text class="pathType-mid">→</text>
								<text class="pathType-both-yuan" style="color: #F84F1D;">●</text>
								<text class="pathType-both-text" :class="{ checkColor: cargoObj.lineType == item.id }" v-if="item.unloadingCityNames.length == 3">
									{{ item.unloadingCityNames[0].label }}/{{ item.unloadingCityNames[1].label }}/{{ item.unloadingCityNames[2].label }}
								</text>
								<text class="pathType-both-text" :class="{ checkColor: cargoObj.lineType == item.id }" v-else-if="item.unloadingCityNames.length == 2">
									{{ item.unloadingCityNames[0].label }}/{{ item.unloadingCityNames[1].label }}
								</text>
								<text class="pathType-both-text" :class="{ checkColor: cargoObj.lineType == item.id }" v-else>
									{{ item.unloadingCityNames[0].label }}
								</text>
							</view>
							<view class="fangkuai" v-if="cargoObj.lineType == item.id">
								<Icon :iconType="'iconduigouCheng'" extClass="duigouChengss"></Icon>
							</view>
						</view>
					</view>
					<view class="filtrateList-path">
						<view class="title">用车类型</view>
						<view class="conContent">
							<view
								@click="carTypeChange(item)" 
								v-for="(item, index) in carTypeList" :key="item.name" 
								class="carType"
								:class="{ checkCarType: cargoObj.vehicleType == item.id }"
							>
								{{ item.name }}
								<view class="fangkuai" v-if="cargoObj.vehicleType == item.id">
									<Icon :iconType="'iconduigouCheng'" extClass="duigouChengss"></Icon>
								</view>
							</view>
						</view>
					</view>
					<chooseBox :checkData="appointedTimeTypeCheck" ref="loadTimeChooseBox" style="padding: 0;" @change='loadTime' :subheadStyles="{fontSize: '20rpx', fontWeight: '400', color: '#999999'}" :titleStyles="{fontSize: '24rpx',fontWeight: '400'}" conFontSize="24" :list="loadTimeList" noName="不限时间" subhead="最多选3个" title="装货时间"></chooseBox>
					<chooseBox :checkData="weightSectionCheck" :inputMin="weightMin" :inputMax="weightMax" ref="weightChooseBox" style="padding: 0;" @change='weight' :subheadStyles="{fontSize: '20rpx', fontWeight: '400', color: '#999999'}" :titleStyles="{fontSize: '24rpx',fontWeight: '400'}" conFontSize="24" :list="weightList" :shortInp="true" noName="不限重量" subhead="吨/最多选3个" title="重量范围"></chooseBox>
					<chooseBox :checkData="cargorCarConductoCheck" :inputVal="cargorCarConductoVal" ref="carConductorChooseBox" style="padding: 0;" @change='carConductor' :subheadStyles="{fontSize: '20rpx', fontWeight: '400', color: '#999999'}" :titleStyles="{fontSize: '24rpx',fontWeight: '400'}" conFontSize="24" :list="carConductorList" :longInp="true" noName="不限长度" subhead="米/最多选3个" title="车辆长度"></chooseBox>
					<chooseBox :checkData="cargorCarModeCheck" ref="carTypeChooseBox" style="padding: 0;" @change='carType' :subheadStyles="{fontSize: '20rpx', fontWeight: '400', color: '#999999'}" :titleStyles="{fontSize: '24rpx',fontWeight: '400'}" conFontSize="24" :list="carTypesList" noName="不限类型" subhead="最多选3个" title="车辆类型"></chooseBox>
					<chooseBox :checkData="goodsTypeCheck" ref="sourceTypeChooseBox" style="padding: 0;" @change='sourceType' :subheadStyles="{fontSize: '20rpx', fontWeight: '400', color: '#999999'}" :titleStyles="{fontSize: '24rpx',fontWeight: '400'}" conFontSize="24" :list="sourceTypeList" noName="不限" subhead="最多选3个" title="货源类型"></chooseBox>
				</view>
			</view>
			<view class="filtrateBtn" v-if="downIndex == 3">
				<button style="background: #DDDDDD;" @click="clearFilter">重置</button>
				<button @click="synthesisFilter">确定</button>
			</view>
		</view>
		
		<u-alert-tips class="warning" :title-style="{'font-size': '22rpx', 'color': '#FB6E2F'}" :style="{top: `${barheight + 35}px`}" :show-icon="true" type="warning" title="距离优先无法定位您当前的位置,请先开启定位权限" :show="warnShow"></u-alert-tips>
		
		<!-- 配货大厅列表 -->
		<view class="allocationCon">
			<mescroll-body :style="[downList.length != 0 ? moveStop : '']" ref="mescrollRef" @init="mescrollInit" :up="upOption" @down="downCallback" @up="upCallback">
				<goodsList :clickType="false" :control="true" :item="item" v-for="(item,index) of distributionList" :key="index"></goodsList>
			</mescroll-body>
		</view>
		
		<u-mask :custom-style="{background: 'rgba(0,0,0,0.3)'}" z-index="999" :show="show" @click="clearShow"></u-mask>
		
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar class="utabbar" :before-switch="beforeSwitch" active-color="#FB6E2F" inactive-color="#666666" height="110" :list="list" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import config from '../../service/config.js';
	import ajax from '../../service/ajax.js';
	import moment from 'moment';
	import permision from "../..//js_sdk/wa-permission/permission.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				warnShow: false,
				barheight: this.statusBar,
				isIos: true,
				moveStop: {
					position: 'fixed',
					left: 0,
					right: 0,
				},
				
				show: false,
				
				height: null,
				screenHeight: null,
				
				status: 'nomore',
				
				list: this.$store.state.list,
				
				bgcolor: false,
				// 顶部导航的背景
				topBackground: {
					// 渐变色
					backgroundImage: 'linear-gradient(89deg, #FFE14C 0%, #FFC24D 100%)',
				},
				
				// 下拉内容显示隐藏
				downList: [],
				
				// 下拉内容动态选择index
				downIndex: 0,
				
				// 配货大厅列表
				distributionList: [],
				
				// 常用路线列表
				pathList: [],
				// 装货时间列表
				loadTimeList: [
					{
						name: '今天',
						id: 1,
					},
					{
						name: '明天',
						id: 2,
					},
					{
						name: '明天以后',
						id: 3,
					}
				],
				// 车型列表
				carTypesList: [],
				// 车长列表
				carConductorList: [],
				// 货源类型列表
				sourceTypeList: [],
				// 重量范围列表
				weightList: [
					{
						name: '0-5',
						id: 1,
					},
					{
						name: '5-10',
						id: 2,
					},
					{
						name: '10-20',
						id: 3,
					},
					{
						name: '20-30',
						id: 4,
					},
					{
						name: '30-40',
						id: 5,
					},
					{
						name: '40-999',
						id: 6,
					},
				],
				
				// 综合排序列表
				rankingList: [
					{
						label: '综合排序',
						value: 1,
					},
					{
						label: '最新发布',
						value: 2,
					},
					{
						label: '距离优先',
						value: 3,
					},
					{
						label: '评价优先',
						value: 4,
					}
				],
				
				// 全省列表
				nationwideList: [
					{
						name: '全国',
						id: -1,
					}
				],
				
				// 全市列表
				provinceList: [
					{
						name: '全省',
						id: -1,
					}
				],
				
				// 全区列表
				cityList: [
					{
						name: '全市',
						id: -1,
					}
				],
				
				// 用车类型列表
				carTypeList: [
					{
						name: '不限类型',
						id: -1,
					},
					{
						name: '整车',
						id: 1,
					},
					{
						name: '零担',
						id: 2,
					}
				],
				
				// 下拉菜单标题
				rankingTit: '距离优先',
				loadingTit: '装货地',
				unloadingTit: '卸货地',
				
				// 装货地选择的索引
				loadingItem: '',
				// 卸货地选择的索引
				unloadingItem: '',
				
				// 装货地显示全国/全省/全市
				showPlace: 1,
				// 卸货地显示全国/全省/全市
				unshowPlace: 1,
				
				// 货源列表筛选对象
				cargoObj: {
					sortType: 3,				//排序方法
					lat: this.$store.state.lat,	//经度
					lnt: this.$store.state.lon,	//纬度
					loadingCityType: 1,		//装货区域类型
					loadingCity: -1,			//装货区域ID
					unloadingCityType: 1,		//卸货区域类型
					unloadingCity: -1,			//卸货区域ID
					lineType: -1,				//常用路线
					vehicleType: -1,			//用车类型
					appointedTimeType: -1,		//装货时间
					weightSection: -1,			//重量范围
					cargorCarMode: -1,			//车辆类型
					cargorCarConducto: -1,		//车辆长度
					goodsType: -1,				//货源类型
				},
				
				// 装货时间
				appointedTimeTypeCheck: [
					{
						id: -1,
						name: '不限时间'
					}
				],
				// 选中的重量范围
				weightSectionCheck: [
					{
						id: -1,
						name: '不限重量'
					}
				],
				weightMin: '',
				weightMax: '',
				// 车辆类型
				cargorCarModeCheck: [
					{
						id: -1,
						name: '不限类型'
					}
				],
				// 车辆长度
				cargorCarConductoCheck: [
					{
						id: -1,
						name: '不限长度'
					}
				],
				cargorCarConductoVal: '',
				// 货源类型
				goodsTypeCheck: [
					{
						id: -1,
						name: '不限'
					}
				],
				
				// 选中的全国装货地
				nationwideObj: {
					id: -1,
					name: '全国'
				},
				// 选中的全省装货地
				provinceObj: {
					id: -1,
					name: '全省'
				},
				// 选中的全市装货地
				cityObj: {
					id: -1,
					name: '全市'
				},
				
				// 选中的全国卸货地
				unnationwideObj: {
					id: -1,
					name: '全国'
				},
				// 选中的全省卸货地
				unprovinceObj: {
					id: -1,
					name: '全省'
				},
				// 选中的全市卸货地
				uncityObj: {
					id: -1,
					name: '全市'
				},
				
				// 服务器时间
				serverTime: null,
				
				upOption:{
					empty:{
						tip: '~ 暂无货源 ~', // 提示
					},
					textNoMore: '--- 没有更多 ---'
				},
				
				canReset: false,
				//最新版本
				forbiddenShow: false,
				banben:"",
				updateContent: [],
				isIos: true,
				updateShow: false,
				mustPull: '',
				pullUrl: '',
				newVersion:""
			}
		},
		computed: {
			bgWit() {
				let background;
				background = '#ffffff';
				return { background }
			},
			
			Color() {
				let color;
				color = '#FB6E2F';
				return { color }
			},
			
			heightss() {
				let height = this.height + 'px';
				return { height }
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.isIos = (plus.os.name == "iOS")
			// #endif
			this.gpsPush();
			uni.getLocation({
			    type: 'gcj02',
			    success: res => {
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
		},
		onReady(){
			let that = this
			uni.getSystemInfo({
			    success: function (res) {
			        that.screenHeight = res.screenHeight
			    }
			});
			this.getHeight();
		},
		mounted() {
			this.getProvince(-1,1);
			this.getCarConductor();
			this.getCarType();
			this.getGoodsList();
			this.getArea();
		},
		onShow() {
			// 检查更新
			//#ifdef APP-PLUS
			let $platform = '';
			if (this.isIos) {
				$platform = 'ios';
			} else {
				$platform = 'android';
			}
			ajax.get(config.version_url, {
				version: plus.runtime.version,
				appid: plus.runtime.appid,
				platform: $platform
			}).then(res => {
				if (res.code == 0) {
					if (res.data) {
						let contentUrl = res.data.contentUrl;
						this.mustPull = res.data.mustPull;
						this.pullUrl = res.data.pullUrl;
						this.newVersion = res.data.version
			
						uni.request({
							url: contentUrl,
							success: res => {
								console.log(res);
								let item = res.data.split('；');
								this.updateContent = item;
							}
						})
			
						if (this.mustPull == 1) {
							this.updateShow = true;
						} else {
							uni.getStorage({
								key: 'updateStatus',
								success: res => {
									console.log(reg);
									//判断版本需不需要更新
									if(reg.data == this.newVersion){
										this.updateShow = false;
									}else{
										this.updateShow = true;
									}
								},
								fail: err => {
									console.log(err);
									this.updateShow = true;
								}
							})
						}
					} else {
						this.updateShow = false;
						uni.removeStorage({
							key: 'updateStatus',
							success: function(res) {
								console.log('移除标记成功');
							}
						});
					}
				} else {
					console.log(res)
				}
			}).catch(err => {
				console.log(err)
			})
			//#endif
			
			this.getPath();
			if(!this.$store.state.lat && !this.$store.state.lon) {
				this.cargoObj.sortType = 1;
				this.rankingTit = '综合排序';
			}
		},
		methods: {
			// 立即更新
			goUpdate() {
				if (this.isIos) {
					let appleId = 1552344297 //app的appleId
					plus.runtime.launchApplication({
						action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
					}, function(e) {
						console.log('Open system default browser failed: ' + e.message);
					});
				} else {
					uni.showToast({
						title: "正在后台更新应用,稍后自动安装",
						icon: 'none',
						duration: 2000
					})
					uni.downloadFile({//执行下载
						url: this.pullUrl, //下载地址
						success: downloadResult => {//下载成功
							if (downloadResult.statusCode == 200) {
								// uni.showModal({
								// 	title: '',
								// 	content: '更新成功，确定现在重启吗？',
								// 	confirmText: '重启',
								// 	confirmColor: '#EE8F57',
								// 	success: function(res) {
								// 		if (res.confirm == true) {
								// 			plus.runtime.install(//安装
								// 				downloadResult.tempFilePath, {
								// 					force: true
								// 				},
								// 				function(res) {
								// 					utils.showToast('更新成功，重启中');
								// 					plus.runtime.restart();
								// 				}
								// 			);
								// 		}
								// 	}
								// });
								plus.runtime.install(//安装
									downloadResult.tempFilePath, {
										force: true
									},
									function(res) {
										utils.showToast('更新成功，重启中');
										plus.runtime.restart();
									}
								);
							}
						}
					});
					// plus.runtime.openURL(this.pullUrl);
				}
			},
			
			// 暂不更新
			cancelUpdata() {
				this.updateShow = false;
				uni.setStorage({
					key: 'updateStatus',
					data: this.newVersion,
				});
			},
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
			
			// gps数据推送
			gpsPush() {
				uni.getStorage({
					key: 'username',
					success: reg => {
						setInterval(() => {
							if(this.$store.state.lat && this.$store.state.lon) {
								// console.log(reg.data);
								// console.log(this.$store.state.lat);
								// console.log(this.$store.state.lon);
								ajax.post(config.gpsPush_url,{
									driverPhone: reg.data,
									lat: this.$store.state.lat,
									lnt: this.$store.state.lon
								}).then(res => {
									console.log(res)
								}).catch(err => {
									//ajax.js反馈的reject结果
									console.log(err)
								})
							}
						},30000)
					}
				})
			},
			
			// 动态获取高度
			getHeight() {
				let height1,height2;
				const query = uni.createSelectorQuery().in(this);
				query.select('.kong').boundingClientRect(data => {
					height1 = data.height;
				}).exec();
				query.select('.utabbar').boundingClientRect(data => {
					height2 = data.height;
				}).exec();
				this.height = this.screenHeight - (height1 + height2 + this.barheight);
			},
			
			// 上拉加载的回调
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				if(this.cargoObj.weightSection == '-' || this.cargoObj.weightSection == '') {
					this.cargoObj.weightSection = -1
				}
				this.getTime();
				ajax.get(config.freightCargo_url,{
					pageIndex: pageNum,
					pageSize: pageSize,
					sortType: this.cargoObj.sortType,
					lat: this.cargoObj.lat,
					lnt: this.cargoObj.lnt,
					loadingCityType: this.cargoObj.loadingCityType,
					loadingCity: this.cargoObj.loadingCity,
					unloadingCityType: this.cargoObj.unloadingCityType,
					unloadingCity: this.cargoObj.unloadingCity,
					lineType: this.cargoObj.lineType,
					vehicleType: this.cargoObj.vehicleType,
					appointedTimeType: this.cargoObj.appointedTimeType,
					weightSection: this.cargoObj.weightSection,
					cargorCarMode: this.cargoObj.cargorCarMode,
					cargorCarConducto: this.cargoObj.cargorCarConducto,
					goodsType: this.cargoObj.goodsType,
				}).then(res => {
					console.log(res);
					if(res.code == 0){
						res.data.list.forEach(item => {
							// moment.locale('zh-cn', {
							// 	relativeTime: {
							// 		future: '%s',
							// 		past: '%s',
							// 		s: '刚刚',
							// 		m: '1 分钟前',
							// 		mm: '%d 分钟前',
							// 		h: '1 小时前',
							// 		hh: '%d 小时前',
							// 		d: '1 天前',
							// 		dd: '%d 天前',
							// 		M: '1 个月前',
							// 		MM: '%d 个月前',
							// 		y: '1 年前',
							// 		yy: '%d 年前'
							// 	},
							// });
							// item.createTime =  moment(item.createTime);
							// this.serverTime = moment(this.serverTime);
							// item.createTime = item.createTime.from(this.serverTime);
							
							//releaseTime为要计算的时间戳
							// NowTime当前时间的时间戳作对比距离是几分钟前.几小时前
							var dateTime = new Date(item.createTime);
							var year = dateTime.getFullYear();
							var month = dateTime.getMonth() + 1;
							var day = dateTime.getDate();
							var hour = dateTime.getHours();
							var minute = dateTime.getMinutes();
							var second = dateTime.getSeconds();
							var now = new Date();
							var milliseconds = 0;
							var timeSpanStr;
							//计算出相差时间
							milliseconds = Number(this.serverTime) - item.createTime;
							if (milliseconds <= 1000 * 60 * 1) {
							timeSpanStr = '刚刚';
							} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
							timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
							} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
							timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
							} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
							timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
							//大于15天即显示年月日
							} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
							timeSpanStr = year + '/' + month + '/' + day;
							// + ' ' + hour + ':' + minute
							} else {
							timeSpanStr = year + '/' + month + '/' + day;
							// + ' ' + hour + ':' + minute
							}
							item.createTime = timeSpanStr
							
							// 服务费计算
							// if(item.freight <= 200) {
							// 	item.freight = item.freight - 2
							// } else {
							// 	item.freight = item.freight - item.freight*0.01
							// }
							
							uni.getStorage({
							    key: 'loc',
							    success: res => {
									if(this.$store.state.lat && this.$store.state.lon) {
										let La1 = parseFloat(this.$store.state.lat) * Math.PI / 180.0;
										let La2 = parseFloat(item.addressList[0].lat) * Math.PI / 180.0;
										let La3 = La1 - La2;
										let Lb3 = parseFloat(this.$store.state.lon) * Math.PI / 180.0 - parseFloat(item.addressList[0].lnt) * Math.PI / 180.0;
										let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));  
										s = s * 6378.137;//地球半径
										item.distance = Math.round((Math.round(s * 10000) / 10000));
									} else {
										let La1 = parseFloat(res.data.latitude) * Math.PI / 180.0;
										let La2 = parseFloat(item.addressList[0].lat) * Math.PI / 180.0;
										let La3 = La1 - La2;
										let Lb3 = parseFloat(res.data.longitude) * Math.PI / 180.0 - parseFloat(item.addressList[0].lnt) * Math.PI / 180.0;
										let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));  
										s = s * 6378.137;//地球半径
										item.distance = Math.round((Math.round(s * 10000) / 10000));
									}
							    },
								fail: err => {
									uni.getLocation({
									    type: 'gcj02',
									    success: res => {
											this.$store.commit("getLon", res.longitude);
											this.$store.commit("getLat", res.latitude);
											let La1 = parseFloat(res.latitude) * Math.PI / 180.0;
											let La2 = parseFloat(item.addressList[0].lat) * Math.PI / 180.0;
											let La3 = La1 - La2;
											let Lb3 = parseFloat(res.longitude) * Math.PI / 180.0 - parseFloat(item.addressList[0].lnt) * Math.PI / 180.0;
											let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));  
											s = s * 6378.137;//地球半径
											item.distance = Math.round((Math.round(s * 10000) / 10000));
											uni.setStorage({
												key: 'loc',
												data: res,
											});
									    },
										fail: err => {
											console.log('不支持地图');
										}
									});
								}
							});
						})
						let curPageData = res.data.list;
						let curPageLen = res.data.list.length;
						let hasNext = res.data.hasNextPage;

						if(page.num == 1) this.distributionList = []; //如果是第一页需手动置空列表
						this.distributionList = this.distributionList.concat(curPageData); //追加新数据
						this.mescroll.endSuccess(curPageLen, hasNext);
					} else {
						this.mescroll.endErr();
						console.log(res);
					}
				}).catch(err => {
					this.mescroll.endErr();
					console.log("获取货源列表接口数据返回失败 error is :" + err);
				})
			},
			
			// 获取服务器时间
			getTime() {
				ajax.get(config.serverTime_url,{
				}).then(res => {
					if(res.code == 0){
						// console.log(res.data);
						this.serverTime = res.data;
					} else {
						console.log(res);
					}
				}).catch(err => {
				  console.log("获取服务器时间数据返回失败 error is :" + err);
				})
			},
			
			// 关闭遮罩和下拉菜单
			clearShow() {
				this.show = false;
				this.downList = [];
				if(this.downIndex == 3) {
					this.distributionList = [];
					this.mescroll.resetUpScroll();
				} else if(this.downIndex == 1 || this.downIndex == 2) {
					if(this.loadingTit != '装货地' || this.unloadingTit != '卸货地') {
						this.distributionList = [];
						this.mescroll.resetUpScroll();
					}
				}
			},
			
			// 下拉菜单显示隐藏
			downShow(index) {
				if(this.downList.length == 0) {
					this.downList.push(index);
					this.show = true;
				} else {
					if(index == 3) {
						this.distributionList = [];
						this.mescroll.resetUpScroll();
					} else if(index == 1 || index == 2) {
						if(this.loadingTit != '装货地' || this.unloadingTit != '卸货地') {
							this.distributionList = [];
							this.mescroll.resetUpScroll();
						}
					}
					if(this.downList.indexOf(index) == -1) {
						this.downList.splice(0, 1);
						this.downList.push(index);
					} else {
						this.downList.splice(0, 1);
						this.show = false;
					}
				}
				this.downIndex = index;
			},
			
			menuOpen() {
				this.bgcolor = true;
			},
			
			menuClose() {
				this.bgcolor = false;
			},
			
			// 常用路线返回值
			pathChange(val) {
				if(val == -1) {
					this.cargoObj.lineType = -1
				} else {
					this.cargoObj.lineType = val.id;
				}
			},
			
			// 用车类型返回值
			carTypeChange(val) {
				if(val == -1) {
					this.cargoObj.vehicleType = -1;
				} else {
					this.cargoObj.vehicleType = val.id;
				}
			},
			
			// 装货时间返回值
			loadTime(e) {
				console.log(e);
				this.appointedTimeTypeCheck = e;
				this.cargoObj.appointedTimeType = e.map(a => a.id).join(',');
			},
			
			// 重量范围返回值
			weight(e) {
				console.log(e);
				if(typeof(e) == 'string') {
					if(e == "空") {
						this.weightSectionCheck = [];
						this.weightMin = '';
						this.weightMax = '';
						this.cargoObj.weightSection = '';
					} else {
						this.weightSectionCheck = [];
						this.weightMin = e.split('-')[0];
						this.weightMax = e.split('-')[1];
						this.cargoObj.weightSection = e;
					}
				} else {
					this.weightMin = '';
					this.weightMax = '';
					this.weightSectionCheck = e;
					if(e.length != 0 && e[0].id == -1) {
						this.cargoObj.weightSection = -1;
					} else {
						this.cargoObj.weightSection = e.map(a => a.name).join(',');
					}
				}
			},
			
			// 车辆长度返回值
			carConductor(e) {
				if(typeof(e) == 'string') {
					this.cargorCarConductoCheck = [];
					this.cargorCarConductoVal = e;
					this.cargoObj.cargorCarConducto = e;
				} else {
					this.cargorCarConductoVal = '';
					this.cargorCarConductoCheck = e;
					if(e.length != 0 && e[0].id == -1) {
						this.cargoObj.cargorCarConducto = -1;
					} else {
						this.cargoObj.cargorCarConducto = e.map(a => a.id).join(',');
					}
				}
				console.log(this.cargoObj.cargorCarConducto);
			},
			
			// 车辆类型返回值
			carType(e) {
				this.cargorCarModeCheck = e;
				this.cargoObj.cargorCarMode = e.map(a => a.id).join(',');
				console.log(this.cargoObj.cargorCarMode);
			},
			
			// 货源类型返回值
			sourceType(e) {
				this.goodsTypeCheck = e;
				this.cargoObj.goodsType = e.map(a => a.id).join(',');
				console.log(this.cargoObj.goodsType);
			},
			
			
			// 跳转到找货记录
			goFind() {
				uni.navigateTo({
					url: "/pages/findRecord/findRecord"
				})
			},
			
			// 跳转到常用路线
			goPath() {
				uni.navigateTo({
					url: "/pages/myPath/myPath"
				})
			},
			
			// 获取省/市/区
			getProvince($parentId,$type) {
				ajax.get(config.region_url,{
				  parentId: $parentId,
				  type: $type
				}).then(res => {
					console.log(res);
					if(res.code == 0){
						if($type == 1) {
							this.nationwideList = [
								{
									name: '全国',
									id: -1,
								}
							];
							res.data.forEach(item => {
								this.nationwideList.push(item);
							});
						} else if($type == 2) {
							this.provinceList = [
								{
									name: '全省',
									id: -1,
								}
							];
							res.data.forEach(item => {
								this.provinceList.push(item);
							});
						} else if($type == 3) {
							this.cityList = [
								{
									name: '全市',
									id: -1,
								}
							];
							res.data.forEach(item => {
								this.cityList.push(item);
							});
						}
					} else {
						console.log(res);
					}
				}).catch(err => {
					console.log("获取获取省/市/区接口数据返回失败 error is :" + err);
				})
			},
			
			// 返回上一级
			back(type) {
				if(type == 1) {
					if (this.showPlace == 2) {
						this.showPlace = 1;
						this.loadingTit = this.nationwideObj.name;
						this.provinceObj = {
							id: -1,
							name: '全省'
						};
					} else if(this.showPlace == 3) {
						this.cityObj = {
							id: -1,
							name: '全市'
						};
						this.showPlace = 2;
						this.loadingTit = this.provinceObj.name;
						this.loadingItem = this.nationwideObj.name + '-' + this.provinceObj.name;
					}
				} else {
					if (this.unshowPlace == 2) {
						this.unshowPlace = 1;
						this.unloadingTit = this.unnationwideObj.name;
						this.unprovinceObj = {
							id: -1,
							name: '全省'
						};
					} else if(this.unshowPlace == 3) {
						this.uncityObj = {
							id: -1,
							name: '全市'
						};
						this.unshowPlace = 2;
						this.unloadingTit = this.unprovinceObj.name;
						this.unloadingItem = this.unnationwideObj.name + '-' + this.unprovinceObj.name;
					}
				}
			},
			
			// 重置综合筛选
			clearFilter() {
				this.$refs.loadTimeChooseBox.clear();
				this.$refs.sourceTypeChooseBox.clear();
				this.$refs.carConductorChooseBox.clear();
				this.$refs.weightChooseBox.clear();
				this.$refs.weightChooseBox.clear();
				this.$refs.carTypeChooseBox.clear();
				
				this.cargoObj.lineType = -1;
				this.cargoObj.vehicleType = -1;
				this.cargoObj.appointedTimeType = -1;
				this.cargoObj.weightSection = -1;
				this.cargoObj.cargorCarMode = -1;
				this.cargoObj.cargorCarConducto = -1;
				this.cargoObj.goodsType = -1;
				
				// 装货时间
				this.appointedTimeTypeCheck = [
					{
						id: -1,
						name: '不限时间'
					}
				];
				// 选中的重量范围
				this.weightSectionCheck = [
					{
						id: -1,
						name: '不限重量'
					}
				];
				// 车辆类型
				this.cargorCarModeCheck = [
					{
						id: -1,
						name: '不限类型'
					}
				];
				// 车辆长度
				this.cargorCarConductoCheck = [
					{
						id: -1,
						name: '不限长度'
					}
				];
				// 货源类型
				this.goodsTypeCheck = [
					{
						id: -1,
						name: '不限'
					}
				];
				this.weightMin = '';
				this.weightMax = '';
				this.cargorCarConductoVal = '';
				
				console.log(this.cargoObj);
			},
			
			// 综合筛选
			synthesisFilter() {
				this.show = false;
				this.downList = [];
				this.distributionList = [];
				if(this.cargoObj.lineType != -1) {
					// 下拉菜单标题
					this.loadingTit = '装货地';
					this.unloadingTit = '卸货地';
					
					// 装货地选择的索引
					this.loadingItem = '';
					// 卸货地选择的索引
					this.unloadingItem = ''
					
					// 装货地显示全国/全省/全市
					this.showPlace = 1;
					// 卸货地显示全国/全省/全市
					this.unshowPlace = 1;
					
					// 货源列表筛选对象
					this.cargoObj.loadingCityType = 1;
					this.cargoObj.loadingCity = -1;
					this.cargoObj.unloadingCityType = 1;
					this.cargoObj.unloadingCity = -1;
					
					// 选中的全国装货地
					this.nationwideObj = {
						id: -1,
						name: '全国'
					};
					// 选中的全省装货地
					this.provinceObj = {
						id: -1,
						name: '全省'
					};
					// 选中的全市装货地
					this.cityObj = {
						id: -1,
						name: '全市'
					};
					
					// 选中的全国卸货地
					this.unnationwideObj = {
						id: -1,
						name: '全国'
					};
					// 选中的全省卸货地
					this.unprovinceObj = {
						id: -1,
						name: '全省'
					};
					// 选中的全市卸货地
					this.uncityObj = {
						id: -1,
						name: '全市'
					};
				}
				this.mescroll.resetUpScroll();
				// this.cargoObj.lineType = '';
				// this.cargoObj.vehicleType = '';
				console.log(this.cargoObj);
			},
			
			// 选中综合排序
			rankingChange(val) {
				this.show = false;
				this.downList = [];
				if(val.value == 3) {
					if(this.$store.state.lat && this.$store.state.lon) {
						this.cargoObj.lat = this.$store.state.lat;
						this.cargoObj.lnt = this.$store.state.lon;
						this.rankingTit = val.label;
						this.cargoObj.sortType = val.value;
						this.distributionList = [];
						this.mescroll.resetUpScroll();
						this.warnShow = false;
					} else {
						this.warnShow = true;
						// #ifdef APP-PLUS
						if(this.isIos) {
							var result = permision.judgeIosPermission('location')
							console.log(result);
							var strStatus = (result) ? "已" : "未"
						} else {
							this.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION');
						}
						// #endif
					}
				} else {
					this.cargoObj.lat = '';
					this.cargoObj.lnt = '';
					this.rankingTit = val.label;
					this.cargoObj.sortType = val.value;
					this.downList = [];
					this.distributionList = [];
					this.mescroll.resetUpScroll();
					this.warnShow = false;
				}
			},
			
			async requestAndroidPermission(permisionID) {
				var result = await permision.requestAndroidPermission(permisionID)
				var strStatus
				if (result == 1) {
					strStatus = "已获得授权"
				} else if (result == 0) {
					strStatus = "未获得授权"
				} else {
					strStatus = "被永久拒绝权限"
				}
			},
			
			// 获取车长列表
			getCarConductor() {
				ajax.get(config.carConductor_url,{
				}).then(res => {
					// console.log(res)
					if(res.code == 0){
						// console.log(res.data);
						this.carConductorList = res.data;
					} else {
						console.log(res);
					}
				}).catch(err => {
				  console.log("获取车长数据返回失败 error is :" + err);
				})
			},
			
			// 获取货源类型
			getGoodsList() {
				ajax.get(config.bdGoodsType_url,{
				}).then(res => {
					if(res.code == 0){
						this.sourceTypeList = res.data;
					} else {
						console.log(res);
					}
				}).catch(err => {
				  console.log("获取货源类型数据返回失败 error is :" + err);
				})
			},
			
			// 获取常用路线列表
			getPath() {
				ajax.get(config.distributionLine_url,{
				}).then(res => {
					if(res.code == 0){
						this.pathList = res.data;
					} else {
						console.log(res);
					}
				}).catch(err => {
					console.log("获取常用路线接口数据返回失败 error is :" + err);
				})
			},
			
			// 获取车俩类型列表
			getCarType() {
				ajax.get(config.carModel_url,{
				}).then(res => {
					// console.log(res)
					if(res.code == 0){
						this.carTypesList = res.data;
					} else {
						console.log(res);
					}
				}).catch(err => {
					console.log("获取车俩类型数据返回失败 error is :" + err);
				})
			},
			
			// 选中装卸地
			siteChange(type,index,val) {
				console.log(val);
				if(type == 1) {
					if(index == 1) {
						this.loadingTit = val.name;
						this.nationwideObj = val;
						if(val.id == -1) {
							this.show = false;
							this.downList = [];
							this.distributionList = [];
							this.cargoObj.loadingCityType = 1;
							this.cargoObj.loadingCity = val.id;
							this.mescroll.resetUpScroll();
						} else {
							this.loadingItem = val.name;
							this.showPlace = 2;
							this.cargoObj.loadingCityType = index;
							this.cargoObj.loadingCity = val.id;
							this.getProvince(val.uid,index+1);
						}
					} else if(index == 2) {
						this.provinceObj = val;
						if(val.id == -1) {
							this.show = false;
							this.downList = [];
							this.distributionList = [];
							this.loadingItem = this.nationwideObj.name;
							this.loadingTit = this.nationwideObj.name;
							this.cargoObj.loadingCityType = index - 1;
							this.cargoObj.loadingCity = this.nationwideObj.id;
							this.mescroll.resetUpScroll();
						} else {
							this.loadingTit = val.name;
							this.loadingItem = this.nationwideObj.name + '-' + val.name;
							this.showPlace = 3;
							this.cargoObj.loadingCityType = index;
							this.cargoObj.loadingCity = val.id;
							this.getProvince(val.uid,index+1);
						}
					} else if(index == 3) {
						this.show = false;
						this.downList = [];
						this.distributionList = [];
						this.cityObj = val;
						if(val.id == -1) {
							this.loadingItem = this.nationwideObj.name + '-' + this.provinceObj.name;
							this.loadingTit = this.provinceObj.name;
							this.cargoObj.loadingCityType = index - 1;
							this.cargoObj.loadingCity = this.provinceObj.id;
						} else {
							this.loadingTit = val.name;
							this.cargoObj.loadingCityType = index;
							this.cargoObj.loadingCity = val.id;
							this.loadingItem = this.nationwideObj.name + '-' + this.provinceObj.name + '-' + val.name;
							this.showPlace = 3;
						}
						this.mescroll.resetUpScroll();
					}
				} else {
					if(index == 1) {
						this.unloadingTit = val.name;
						this.unnationwideObj = val;
						if(val.id == -1) {
							this.show = false;
							this.downList = [];
							this.distributionList = [];
							this.cargoObj.unloadingCityType = 1;
							this.cargoObj.unloadingCity = val.id;
							this.mescroll.resetUpScroll();
						} else {
							this.unloadingItem = val.name;
							this.unshowPlace = 2;
							this.cargoObj.unloadingCityType = index;
							this.cargoObj.unloadingCity = val.id;
							this.getProvince(val.uid,index+1);
						}
					} else if(index == 2) {
						this.unprovinceObj = val;
						if(val.id == -1) {
							this.show = false;
							this.downList = [];
							this.unloadingItem = this.unnationwideObj.name;
							this.distributionList = [];
							this.unloadingTit = this.unnationwideObj.name;
							this.cargoObj.unloadingCityType = index - 1;
							this.cargoObj.unloadingCity = this.unnationwideObj.id;
							this.mescroll.resetUpScroll();
						} else {
							this.unloadingTit = val.name;
							this.unloadingItem = this.unnationwideObj.name + '-' + val.name;
							this.unshowPlace = 3;
							this.cargoObj.unloadingCityType = index;
							this.cargoObj.unloadingCity = val.id;
							this.getProvince(val.uid,index+1);
						}
					} else if(index == 3) {
						this.show = false;
						this.downList = [];
						this.distributionList = [];
						this.uncityObj = val;
						if(val.id == -1) {
							this.unloadingItem = this.unnationwideObj.name + '-' + this.unprovinceObj.name;
							this.unloadingTit = this.unprovinceObj.name;
							this.cargoObj.unloadingCityType = index - 1;
							this.cargoObj.unloadingCity = this.unprovinceObj.id;
						} else {
							this.unloadingTit = val.name;
							this.cargoObj.unloadingCityType = index;
							this.cargoObj.unloadingCity = val.id;
							this.unloadingItem = this.unnationwideObj.name + '-' + this.unprovinceObj.name + '-' + val.name;
							this.unshowPlace = 3;
						}
						this.mescroll.resetUpScroll();
					}
				}
			},
			
			// 获取装卸货地区
			getArea() {
				ajax.get(config.regionTree_url,{
				}).then(res => {
					// console.log(res);
					if(res.code == 0){
						this.$store.commit("getArea", res.data);
					} else {
						console.log(res);
					}
				}).catch(err => {
					console.log("获取地区数据返回失败 error is :" + err);
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.allocationBox {
		width: 100%;
		min-height: 100vh;
		position: relative;
		.warning {
			width: 100%;
			height: 50rpx;
			position: fixed;
			top: 160rpx;
			left: 0;
			background: #F7ECD5;
			border-radius: 20rpx;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
			border: none;
		}
		.allocationCon {
			width: 100%;
			margin-top: 90rpx;
		}
		.navContent {
			width: 100%;
			max-height: 75vh;
			background: #ffffff;
			border-radius: 0 0 40rpx 40rpx;
			position: fixed;
			top: 188rpx;
			z-index: 1000;
			.ranking-slot-title {
				background: #ffffff;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				.indexes {
					width: 92%;
					background: #ffffff;
					padding: 10rpx 0 0 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-top: 1rpx solid #f5f5f5;
					.indexesTit {
						font-size: 20rpx;
						color: #333333;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
					.indexesBtn {
						font-size: 20rpx;
						color: #FD8624;
					}
				}
			}
			.filtrate-slot-content {
				background: #ffffff;
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 100%;
				height: 75vh;
				padding-bottom: 140rpx;
				border-radius: 0 0 40rpx 40rpx;
				overflow-y: auto;
				.filtrateList {
					width: 92%;
					margin: 0 auto;
					margin-bottom: 20rpx;
					border-top: 1rpx solid #f5f5f5;
					.filtrateList-path {
						margin-top: 30rpx;
						.title {
							font-size: 24rpx;
							color: #333333;
						}
						.pathType {
							width: 100% !important;
							margin-top: 10rpx;
							line-height: 60rpx;
							background: #F1F2F6;
							border-radius: 8rpx;
							font-size: 24rpx;
							display: flex;
							color: #333333;
							justify-content: center;
							align-items: center;
							.pathType-both {
								width: 100%;
								line-height: 1.0;
								min-height: 60rpx;
								padding: 15rpx 30rpx;
								.checkColor {
									color: #FB6E2F !important;
								}
								.pathType-both-text {
									font-size: 24rpx;
									color: #333333;
								}
								.pathType-both-yuan {
									display: inline-block;
									height: 24rpx;
									line-height: 24rpx;
									margin-right: 12rpx;
									vertical-align: 4rpx;
									font-size: 18rpx;
									color: #1BB68A;
								}
								.pathType-mid {
									margin: 0 10rpx;
									font-size: 24rpx;
									color: #868686;
								}
							}
						}
						.checkPathType {
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
						.conContent {
							display: flex;
							align-items: center;
							flex-wrap: wrap;
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
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 1;
								-webkit-box-orient: vertical;
								&:not(:nth-child(4n)) {
								  margin-right: 16rpx; 
								}
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
				}
			}
			.filtrateBtn {
				width: 100%;
				height: 140rpx;
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				background: #ffffff;
				position: absolute;
				bottom: 0;
				padding: 0 13rpx;
				padding-bottom: 50rpx;
				border-radius: 0 0 40rpx 40rpx;
				button {
					width: 45%;
					height: 80rpx;
					line-height: 80rpx;
					background: #FEC24D;
					border-radius: 8rpx;
					border: none !important;
					font-size: 32rpx;
					color: #333333;
				}
			}
			.ranking-slot-content {
				background: #ffffff;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-bottom: 15rpx;
				border-radius: 0 0 40rpx 40rpx;
				.conContents {
					border-top: 1rpx solid #f5f5f5;
				}
				.conContent {
					width: 92%;
					background: #ffffff;
					display: flex;
					margin-bottom: 30rpx;
					padding-top: 10rpx;
					align-items: center;
					flex-wrap: wrap;
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
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						&:not(:nth-child(4n)) {
						  margin-right: 16rpx; 
						}
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
				.rankingItem {
					width: 92%;
					height: 66rpx;
					border-top: 1rpx solid #f5f5f5;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28rpx;
					padding: 0 10rpx;
					.duigouCheng {
						font-size: 22rpx;
						color: #fd8624;
					}
					.rankingColor {
						color: #FB6E2F;
					}
				}
			}
		}
		.kong {
			width: 100%;
			height: 70rpx;
			background: linear-gradient(89deg, #FFE14C 0%, #FFC24D 100%);
			position: fixed;
			top: 88rpx;
			z-index: 1000;
			.navTop {
				width: 100%;
				height: 70rpx;
				position: absolute;
				bottom: 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 30rpx;
				z-index: 101;
				border-radius: 40rpx 40rpx 0 0 ;
				.navTop-item {
					width: 25%;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0 10rpx;
					.navTop-item-tit {
						font-size: 28rpx;
						color: #333333;
						margin-right: 10rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
					.navTopColor {
						color: #DB791E;
					}
				}
			}
		}
		.slot-wrap {
			width: 100%;
			margin: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			/* 如果您想让slot内容占满整个导航栏的宽度 */
			flex: 1;
			/* 如果您想让slot内容与导航栏左右有空隙 */
			padding: 0 30rpx;
			.both {
				font-size: 28rpx;
				color: #333333;
			}
			.mid {
				font-size: 36rpx;
				color: #333333;
			}
		}
	}
	.upwarp-nodata{
		font-size: 20rpx !important;
	}
</style>
