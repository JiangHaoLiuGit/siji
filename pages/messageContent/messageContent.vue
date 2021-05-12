<template>
	<view class="message">
		<u-navbar back-text="" title-color="#333333" :title="title" :background="topBackground" :border-bottom="false"></u-navbar>
		<view class="kong" :style="{top: `${barheight}px`}">
			<view class="kong-title"></view>
		</view>
		
		<view class="messages">
			<view class="messages-content">{{ content }}</view>
			<view class="messages-time">{{ createTime }}</view>
		</view>
		
	</view>
</template>

<script>
	import config from '../../service/config.js';
	import ajax from '../../service/ajax.js';
	import moment from 'moment';
	export default {
		data() {
			return {
				barheight: this.statusBar,
				// 顶部导航的背景
				topBackground: {
					// 渐变色
					backgroundImage: 'linear-gradient(89deg, #FFE14C 0%, #FFC24D 100%)',
				},
				
				// 消息标题
				title: null,
				
				// 消息内容
				content: null,
				
				// 消息时间
				createTime: null,
				
				// 消息ID
				messageId: 0,
			}
		},
		onLoad(option) {
			this.messageId = option.id;
		},
		mounted() {
			this.getMessageContent();
		},
		methods: {
			
			// 获取消息详情
			getMessageContent() {
				ajax.get(config.message_url + `/${this.messageId}`,{
				}).then(res => {
					if(res.code == 0){
						console.log(res.data);
						this.title = res.data.title;
						res.data.createTime = moment(res.data.createTime).format('YYYY-MM-DD HH:mm:ss');
						this.createTime = res.data.createTime;
						this.content = res.data.content;
					} else {
						console.log(res);
					}
				}).catch(err => {
					console.log("获取消息详情接口数据返回失败 error is :" + err);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.message {
		.messages {
			padding-top: 50rpx;
			width: 93%;
			margin: 0 auto;
			.messages-content {
				width: 100%;
				background: #FFFFFF;
				border-radius: 20rpx;
				padding: 30rpx;
				text-align: left;
			}
			.messages-time {
				width: 100%;
				height: 32rpx;
				font-size: 24rpx;
				line-height: 32rpx;
				color: #999999;
				text-align: right;
				padding: 0 20rpx;
				margin: 20rpx 0;
			}
		}
		.slot-wrap {
			font-size: 24rpx;
			color: #333333;
			margin-right: 30rpx;
		}
		.kong {
			width: 100%;
			height: 50rpx;
			background: linear-gradient(89deg, #FFE14C 0%, #FFC24D 100%);
			position: fixed;
			top: 88rpx;
			z-index: 10;
			.kong-title {
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 40rpx;
				background: #F5F6F7;
				border-radius: 40rpx 40rpx 0rpx 0rpx;
			}
		}
	}
</style>
