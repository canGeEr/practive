// ==UserScript==
// @name              91短视频
// @homepage          http://jsxl.pro
// @version           1.6.1
// @updateDesc        下载接口2修复自动填写文件名
// @description       🔥免费看短视频金币视频，会员视频
// @icon              https://be.uxdkel.com/static/images/index/dmdlog2.png
// @namespace         91短视频
// @author            wt
// @include	          *://pwa3.dsp008.*
// @include       	  *://pwa4.dsp004.*
// @include       	  *://pwa3.dsp010.*
// @include	  	      *://pwa*.dsp*.*
// @include			  *://blog.luckly-mjw.cn/*
// @include		      *://tools.thatwind.com/*
// @include			  *://tools.bugscaner.com/*
// @require           https://cdn.bootcdn.net/ajax/libs/jquery/3.2.1/jquery.min.js
// @require			  https://lib.baomitu.com/hls.js/0.15.0-alpha.2/hls.min.js
// @require			  https://lib.baomitu.com/dplayer/1.25.0/DPlayer.min.js
// @require			  https://reset-zff.oss-cn-chengdu.aliyuncs.com/js/md5/code.js?id=112233
// @connect			  fc-mp-af307268-1b8a-482a-b75a-b6e98b125742.next.bspapp.com
// @connect			  reset-zff.oss-cn-chengdu.aliyuncs.com
// @resource videocss https://lib.baomitu.com/dplayer/1.25.0/DPlayer.min.css
// @grant             unsafeWindow
// @grant             GM_xmlhttpRequest
// @grant             GM_addStyle
// @grant             GM_getValue
// @grant             GM_getResourceText
// @grant             GM_setValue
// @charset		      UTF-8
// @run-at 			  document-end
// @updateURL		  https://reset-zff.oss-cn-chengdu.aliyuncs.com/js/release/91video.user.js
// @downloadURL		  https://reset-zff.oss-cn-chengdu.aliyuncs.com/js/release/91video.user.js
// @license           MIT
// ==/UserScript==

const util = {	
	findTargetElement: (targetContainer,maxTryTime=30)=> {
		const body = window.document;
		let tabContainer;
		let tryTime = 0;
		let startTimestamp;
		return new Promise((resolve, reject) => {
			function tryFindElement(timestamp) {
				if (!startTimestamp) {
					startTimestamp = timestamp;
				}
				const elapsedTime = timestamp - startTimestamp;
				if (elapsedTime >= 500) {
					console.log("find element：" + targetContainer + "，this" + tryTime + "num")
					tabContainer = body.querySelector(targetContainer)
					if (tabContainer) {
						resolve(tabContainer)
					} else if (++tryTime === maxTryTime) {
						reject()
					} else {
						startTimestamp = timestamp
					}
				}
				if (!tabContainer && tryTime < maxTryTime) {
					requestAnimationFrame(tryFindElement);
				}
			}
			requestAnimationFrame(tryFindElement);
		});
	},
	
	showDownLoadWindow: (show=true) =>{
		if(!show){
			$('#wt-mask-box').css('display', 'none');
			$("#wt-download-box").removeClass('show-set-box');
			$("#wt-download-box").addClass('hid-set-box');
			return
		}
		$('#wt-mask-box').css('display', 'block');
		if(!document.querySelector('#wt-download-box')){
			let items = ''
			superVip._CONFIG_.downUtils.forEach((item,index) =>{
				items += `
					<li class="item" data-url="${item.url + (item.isAppend?'':'?m3u8=') + (superVip._CONFIG_.videoUrl?getM3u8Url(superVip).replace('longyuandingyi.',''):'')}">${item.title}</li>
				`
			})
			$('body').append(`
				<div id="wt-download-box">
					<view class="close"></view>
					<ul>${items}</ul>
				</div>
			`)
		}else{
			$('#wt-download-box').empty()
			let items = ''
			superVip._CONFIG_.downUtils.forEach((item,index) =>{
				items += `
					<li class="item" data-url="${item.url + (item.isAppend?'':'?m3u8=') + (superVip._CONFIG_.videoUrl?getM3u8Url(superVip).replace('longyuandingyi.',''):'')}">${item.title}</li>
				`
			})
			$('#wt-download-box').append(`<view class="close"></view><ul>${items}</ul>`)
		}
		$("#wt-download-box").removeClass('hid-set-box');
		$("#wt-download-box").addClass('show-set-box');
		$("#wt-download-box .item").on('click',function(e){
			const url = e.target.dataset.url
			if(!url || !url.includes('=http')){
				util.showTips({
					title: '抱歉，未检测到视频，还继续前往吗?',
					doubt: true,
					success: (res)=>{
						if(res){
							window.open(url)
						}
					}
				})
			}else{
				window.open(url)
			}
		})
		$("#wt-download-box .close").on('click',function(){
			$("#wt-mask-box").click()
		})
	},
	
	copyText: (text) => {
		if (navigator.clipboard && window.isSecureContext) {
			return navigator.clipboard.writeText(text)
		} else {
			if (!document.execCommand('copy')) return Promise.reject()
			const textArea = document.createElement('textarea')
			textArea.style.position = 'fixed'
			textArea.style.top = textArea.style.left = '-100vh'
			textArea.style.opacity = '0'
			textArea.value = text
			document.body.appendChild(textArea)
			textArea.focus()
			textArea.select()
			return new Promise((resolve, reject) => {
				document.execCommand('copy') ? resolve() : reject()
				textArea.remove()
			})
		}
	},
	
	showTips: (item={})=>{
		$('#wt-maxindex-mask').css('display','block');
		$("#wt-tips-box").removeClass('hid-set-box');
		$("#wt-tips-box").addClass('show-set-box');
		$('#wt-tips-box .btn-box').empty();
		$('#wt-tips-box .btn-box').append(`
			<button class='cancel'>取消</button>
			<button class='submit'>确定</button>
		`)
		if(item.title) $('#wt-tips-box .content').html(item.title)
		if(item.doubt) $('#wt-tips-box .btn-box .cancel').css('display','block')
		if(item.confirm) $('#wt-tips-box .btn-box .submit').html(item.confirm)
		$('#wt-tips-box .btn-box .submit').on('click',()=>{
			$('#wt-maxindex-mask').css('display','none');
			$("#wt-tips-box").removeClass('show-set-box');
			$("#wt-tips-box").addClass('hid-set-box');
			if(item.success) item.success(true);
		})
		$('#wt-tips-box .btn-box .cancel').on('click',()=>{
			$('#wt-maxindex-mask').css('display','none');
			$("#wt-tips-box").removeClass('show-set-box');
			$("#wt-tips-box").addClass('hid-set-box');
			if(item.success) item.success(false)
		})
	},
	
	addLogin: ()=>{
		if($('#wt-login-box').length > 0) return;
		$('body').append(`
			<div id="wt-login-mask"></div>
			<div id="wt-login-box">
				<div class="close"></div>
				<div class="title">登录码</div>
				<div class="input-box">
					<input placeholder="请在及时行乐中免费获取"/>
					<div class="login-btn">
						<button >登录</button>
					</div>
				</div>
				<div class="to-index" style="color: #920334;text-align: right;margin-right: 4px; height: 50px;line-height: 60px;font-size: 11px;">去获取 ？</div>
			</div>
		`)
		GM_addStyle(`
			#wt-login-mask{ display: none;position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 11000;background-color: #0000004d;}
			#wt-login-box{position: fixed;margin-top: 3%;top: 50%;left: 50%;transform: translate(-50%,-50%) scale(0);overflow: hidden;background-color: white;padding: 30px 10px;padding-bottom: 0;border-radius: 10px;z-index: 11010;}
			
			#wt-login-box::before{content:'';position: absolute;width: 250px;height: 250px;border-radius: 200px;background-color: #E91E63;z-index: -1;opacity: 0.7;bottom: 110px;right: 100px;}
			#wt-login-box::after{content:'';position: absolute;width: 250px;height: 250px;border-radius: 200px;background-color: #2196F3;z-index: -1;opacity: 0.7;top: 115px;right: -112px;}
			#wt-login-box .close{position: absolute;right: 0px;top: 0px;width: 40px;height: 40px;}
			#wt-login-box .close::before,#wt-login-box .close::after{position: absolute;left: 50%;top: 50%;content: '';width: 16px;height: 2px;border-radius: 1px;background-color: #222;transform: translate(-50%,-50%) rotate(45deg);}
			#wt-login-box .close::after,#wt-set-box .close::after{transform: translate(-50%,-50%) rotate(-45deg);}
			#wt-login-box .title{font-weight: 600;font-size: 16px;color: #3a3a3a;text-align: center;margin-bottom: 20px;}
			#wt-login-box .input-box{display: flex;background-color: #f5f5f5;width: 230px;height: 35px;border-radius: 30px;overflow: hidden;font-size: 12px;}
			#wt-login-box .input-box input{width: 100%;height: 100%;padding-left: 15px;box-sizing: border-box;outline: none;border: none;background-color: #f5f5f5;font-size: 10px;color: black;}
			#wt-login-box .login-btn{width: 100px;padding: 2px;}
			#wt-login-box .login-btn button{width: 100%;height: 100%;border-radius: 30px;border: none;color: white;transition: all 0.3s ease;background-color: #ec407a;}
		`)
		$("#wt-login-box .close").on("click", () => {
			$('#wt-login-mask').css('display','none')
			$("#wt-login-box").removeClass('show-set-box')
			$("#wt-login-box").addClass('hid-set-box')
		})
		$("#wt-login-mask").on("click", () => {
			$('#wt-login-mask').css('display','none')
			$("#wt-login-box").removeClass('show-set-box')
			$("#wt-login-box").addClass('hid-set-box')
		})
		$("#wt-login-box .to-index").on("click", () => {
			window.open(superVip._CONFIG_.homePage)
		})
		$("#wt-login-box .login-btn button").on("click", () => {
			if(!wt_init_code){ util.showTips({ title: _CONFIG_.initFailMsg});return}
			$('#wt-loading-box').css('display','block');
			$("#wt-login-box .login-btn button").addClass('btn-anima');
			setTimeout(()=>{$("#wt-login-box .login-btn button").removeClass('btn-anima')},500);
			const pwd = $("#wt-login-box input").val();
			const md5c = md5x();
			const dmd5 = md5x(md5c,'de');
			if(!pwd || pwd != dmd5.code){
				setTimeout(()=>{
					$('#wt-loading-box').css('display','none');
					util.showTips({ title: '登录码错误'});
				},2500)
				return;
			}
			$('#wt-loading-box').css('display','block');
			setTimeout(()=>{
				$('#wt-loading-box').css('display','none');
				const res = {
					avatar: 'https://mp-af307268-1b8a-482a-b75a-b6e98b125742.cdn.bspapp.com/system/logo/logo_white1.png',
					login_date: new Date().setHours(0,0,0,0),
					token: md5c
				}
				$("#wt-my img").addClass('margin-left');
				$('#wt-my img').attr('src',res.avatar);
				$('#wt-login-mask').css('display','none');
				$("#wt-login-box").removeClass('show-set-box');
				$("#wt-login-box").addClass('hid-set-box');
				superVip._CONFIG_.user = res;
				GM_setValue('jsxl_user',res);
			},2500)
		})
	},
	
	showAndHidTips: (name,op='set',val=true)=> {
		let tips = GM_getValue('wt_tips',{})
		if(!tips) tips = {}
		if(op == 'set'){
			tips[name] = val
			GM_setValue('wt_tips',tips)
			if(val) $('.'+name).addClass('tips-yuan')
				else $('.'+name).removeClass('tips-yuan')
			return true
		}else{
			return tips[name]?true: false 
		}
	},
	
	checkUpdate: (check) => {
		const autoUpdatedVersionDate = GM_getValue('91video_auto_updated_date', 0)
		if (autoUpdatedVersionDate > Date.now() && !check) return {
			code: -100,
			msg: '检测更新频率限制'
		}
		if (check && GM_getValue('91video_updated_next_date', 0) > Date.now()) return {
			code: -200,
			msg: '请在 ' + new Date(GM_getValue('91video_updated_next_date', 0)).toLocaleString() + ' 后再检查更新'
		}
		GM_setValue('91video_updated_next_date', Date.now() + 600000)
		const script = GM_info
		if (!script) return {
			code: -300,
			msg: '获取版本号失败'
		}
		let result = {
			code: 1,
			msg: 'ok'
		}
		try {
			const wt_91video_first_use = GM_getValue('wt_91video_first_use', '')
			$.ajaxSetup({
				async: false
			});
			$.get('https://fc-mp-af307268-1b8a-482a-b75a-b6e98b125742.next.bspapp.com/common/updateCheck', {
				name: '91video',
				version: script.script.version,
				use_date: (wt_91video_first_use ? wt_91video_first_use : Date.now() + (Math.round(Math
					.random() * 899999 + 100000) + ''))
			}, function(res) {
				GM_setValue('91video_auto_updated_date', Date.now() + 18000000)
				if (res.code != 0) result = {
					code: -400,
					msg: '获取版本信息失败'
				}
				if ((res.update_msg && res.is_update) || res.msg || res.notify_all) {
					let msg = ''
					if (res.notify_all) msg += '<p>-  ' + res.notify_all + '<p/>'
					if (res.msg) msg += '<p>-  ' + res.msg + '<p/>'
					if (res.is_update && res.update_msg) msg += res.update_msg
					const historyNotify = GM_getValue('91video_notify')
					if(check || !historyNotify || historyNotify.msg.replace(/id\=\d+/,'') != msg.replace(/id\=\d+/,'')){
						util.showNotify({
							title: msg,
							success: () => {
								if (res) {
									superVip._CONFIG_.showNotify = false
								}
							}
						})
						util.showAndHidTips('wt_my_notify_91video')
					}
					if (msg && msg.replace(/\s*/g, "").length > 0) GM_setValue('91video_notify', {
						date: new Date().setHours(0, 0, 0, 0),
						msg
					})
				}
				if (!res.is_update) result = {
					code: -500,
					msg: '当前版本 ' + script.script.version + ' 已经是最新版本'
				}
			})
			$.ajaxSetup({
				async: true
			});
		} catch (e) {}
		return result
	},
	
	showNotify: (item = {}) => {
		$("#wt-notify-box").removeClass('hid-notify-box')
		$("#wt-notify-box").addClass('show-notify-box')
		let version = GM_info
		version = version ? version.script.version : ''
		const v = /当前脚本版本 (\d\.\d\.\d\.{0,1}\d{0,2})/.exec(item.title)
		if (v) item.title = item.title.replaceAll(v[1], version)
		if (item.title) $('#wt-notify-box .content').html(item.title + (version ?
			'<div style="text-align: right;color: #ccc;font-size: 10px;margin-top: 10px;">v ' +
			version + '</div>' : ''))
		superVip._CONFIG_.showNotify = true
		$('#wt-notify-box a').on('click', (e) => {
			e.stopPropagation()
		})
		$('#wt-notify-box').on('click', () => {
			$("#wt-notify-box").removeClass('show-notify-box')
			$("#wt-notify-box").addClass('hid-notify-box')
			superVip._CONFIG_.showNotify = false
			if (item.success) item.success(true)
		})
	}
}

const superVip = (function () {
	const _CONFIG_ = {
		isMobile: navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)/i),
		vipBoxId: 'wt-vip-jx-box' + Math.ceil(Math.random() * 100000000),
		initFailMsg: '抱歉，初始化失败，请尝试刷新页面或检查版本是否是最新版本，点击控制条喇叭查看当前版本号',
		homePage: decodeURIComponent(atob('aHR0cCUzQSUyRiUyRmpzeGwucHJv')),
		endName: 'anM=',
		scripts: [
		// 	{
		// 	icon: 'https://mp-af307268-1b8a-482a-b75a-b6e98b125742.cdn.bspapp.com/system/logo/watermark_logo.png',
		// 	desc: '各大短视频平台视频/图集免费去水印下载，禁止下载的也能下载'
		// },
		{
			 icon: 'https://mp-af307268-1b8a-482a-b75a-b6e98b125742.cdn.bspapp.com/system/logo/video_logo.png',
			 desc: '各大视频平台VIP视频免费看',
			 url: 'https://reset-zff.oss-cn-chengdu.aliyuncs.com/js/release/video.user'
		},
		{
			 icon: 'https://be.uxdkel.com/static/images/index/dmdlog2.png',
			 desc: '免费看付费短视频，网站内容可能引起不适，请谨慎使用。',
			 url: 'https://reset-zff.oss-cn-chengdu.aliyuncs.com/js/release/91video.user'
		},
		{
			 icon: 'https://mp-af307268-1b8a-482a-b75a-b6e98b125742.cdn.bspapp.com/system/logo/haijiao.png',
			 desc: '免费看付费视频及图集，网站内容可能引起不适，请谨慎使用。',
			 url: 'https://reset-zff.oss-cn-chengdu.aliyuncs.com/js/release/haijiao.user'
		},
		{
			 icon: 'https://mp-af307268-1b8a-482a-b75a-b6e98b125742.cdn.bspapp.com/system/logo_transparent.png',
			 desc: '前往及时行乐获取最新脚本链接',
			 url: decodeURIComponent(atob('aHR0cCUzQSUyRiUyRmpzeGwucHJv'))
		}],
		downUtils:[
			{title: '下载接口工具 1',url:'http://tools.bugscaner.com/m3u8.html',isAppend: false},
			{title: '下载接口工具 2',url:'https://tools.thatwind.com/tool/m3u8downloader#m3u8=',isAppend: true},
			{title: '下载接口工具 3',url:'https://blog.luckly-mjw.cn/tool-show/m3u8-downloader/index.html?source=',isAppend: true}
		]
	}
    class BaseConsumer {
        constructor(body) {
            this.parse = () => {
				this.interceptHttp()
				setTimeout(() => { util.checkUpdate()},1500)
				util.findTargetElement('body').then(container => this.generateElement(container).then(container => this.bindEvent(container)))
            }
        }
		
		interceptHttp(){
			const _open = unsafeWindow.XMLHttpRequest.prototype.open;
			unsafeWindow.XMLHttpRequest.prototype.open = function (...args) {
				try{
					if (/m3u8\?auth_key/.test(args[1])) {
						superVip._CONFIG_.videoUrl = args[1]
						superVip._CONFIG_.videoUrl = superVip._CONFIG_.videoUrl.replace('10play.','10play.longyuandingyi.')
					}
				}catch(e){}
				return _open.apply(this, args);
			}
		}
		
		generateElement(container) {
		    GM_addStyle(`
				@font-face {
				  font-family: 'iconfont';  /* Project id 3913561 */
				  src: url('//at.alicdn.com/t/c/font_3913561_cpe13fwca8.woff2?t=1696210493672') format('woff2'),
				       url('//at.alicdn.com/t/c/font_3913561_cpe13fwca8.woff?t=1696210493672') format('woff'),
				       url('//at.alicdn.com/t/c/font_3913561_cpe13fwca8.ttf?t=1696210493672') format('truetype');
				}
				.iconfont {
				    font-family: "iconfont" !important;
				    font-size: 16px;
				    font-style: normal;
		            font-weight: 400 !important;
				    -webkit-font-smoothing: antialiased;
				    -moz-osx-font-smoothing: grayscale;
				}
				@keyframes showSetBox {
					0% {
						transform: translate(-50%,-50%) scale(0);
					}
					80% {
						transform: translate(-50%,-50%) scale(1.1);
					}
					100% {
						transform: translate(-50%,-50%) scale(1);
					}
				}
				@keyframes hidSetBox {
					0% {
						transform: translate(-50%,-50%) scale(1);
					}
					80% {
						transform: translate(-50%,-50%) scale(1.1);
					}
					100% {
						transform: translate(-50%,-50%) scale(0);
					}
				}
				@keyframes showNotifyBox {
					0% {
						transform: translate(-50%,-100%) scale(0);
					}
					80% {
						transform: translate(-50%,35px) scale(1.1);
					}
					100% {
						transform: translate(-50%,35px) scale(1);
					}
				}
				@keyframes hidNotifyBox {
					0% {
						transform: translate(-50%,35px) scale(1.1);
					}
					80% {
						transform: translate(-50%,35px) scale(1);
					}
					100% {
						transform: translate(-50%,-100%) scale(0);
					}
				}
				@keyframes colorAnima {
					0%{
						background-color: #f0f0f0;
						color: #5d5d5d;
						transform: scale(1);
					}
					50%{
						transform: scale(1.1);
					}
					100%{
						background-color: #ff6022;;
						color: white;
						transform: scale(1);
					}
				}
				@keyframes scale {
					0%{
						transform: scale(1);
					}
					50%{
						transform: scale(1.1);
					}
					100%{
						transform: scale(1);
					}
				}
				@keyframes circletokLeft {
				    0%,100% {
				        left: 0px;
				        width: 12px;
				        height: 12px;
				        z-index: 0;
				    }
				    25% {
				        height: 15px;
				        width: 15px;
				        z-index: 1;
				        left: 8px;
				        transform: scale(1)
				    }
				    50% {
				        width: 12px;
				        height: 12px;
				        left: 22px;
				    }
				    75% {
				        width: 10px;
				        height: 10px;
				        left: 8px;
				        transform: scale(1)
				    }
				}
				
				@keyframes circletokRight {
				    0%,100% {
				        top: 3px;
				        left: 22px;
				        width: 12px;
				        height: 12px;
				        z-index: 0
				    }
				    25% {
				        height: 15px;
				        width: 15px;
				        z-index: 1;
				        left: 24px;
				        transform: scale(1)
				    }
				    50% {
				        width: 12px;
				        height: 12px;
				        left: 0px
				    }
				    75% {
				        width: 10px;
				        height: 10px;
				        left: 24px;
				        transform: scale(1)
				    }
				}
				.color-anima{
					animation: colorAnima .3s ease 1 forwards;
				}
				.btn-anima{
					animation: scale .3s ease 1 forwards;
				}
				.welcome-ad img,.notice_scale-in,.dialog_scaleLayer-02,.alertvip-in,.preview-tip-container,.picture,.van-dialog,.van-overlay,.hid{display:none !important;z-index:-99999 !important;opacity: 0!important;width :0 !important;}
				.swiper-slide{top: -50px;}
				#wt-resources-box{border: 1px dashed #ec8181;background: #fff4f4;}
				.sell-btn{border:none !important;margin-top:20px;}
				.margin-left{ margin-left: 0 !important;}
				.show-set-box{ animation: showSetBox 0.3s ease 1 forwards;}
				.hid-set-box{ animation: hidSetBox 0.3s ease 1 forwards;}
				.show-notify-box{ animation: showNotifyBox 0.3s ease 1 forwards;}
				.hid-notify-box{ animation: hidNotifyBox 0.3s ease 1 forwards;}
				#wt-loading-box{display: none;position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 100000;background-color: #0000004d;}
				#wt-loading-box .loading{position: absolute;width: 35px;height: 17px;top: 50%;left: 50%;transform: translate(-50%,-50%);}
				#wt-loading-box .loading::before,
				#wt-loading-box .loading::after{position: absolute;content: "";top: 3px;background-color: #ffe60f;width: 14px;height: 14px;border-radius: 20px;mix-blend-mode: multiply;animation: circletokLeft 1.2s linear infinite;}
				#wt-loading-box .loading::after{animation: circletokRight 1.2s linear infinite;background-color: #4de8f4;}
				#wt-left-show{ position: fixed;left: 20px;top: 50%;transform: translateY(-50%);z-index: 9999;transition: all 0.3s ease;}
				#wt-left-show i {color: #5f5b5b;font-size: 24px;color: #E91E63;text-shadow: #E91E63 2px 2px 12px;font-size: 25px;margin-left: -1px;}
				#wt-${_CONFIG_.vipBoxId}{
					position: fixed;
					top: 50%;
					transform: translate(0, -50%);
					right: 10px;
					width: 46px;
					border-radius: 30px;
					background: rgb(64 64 64 / 81%);
					box-shadow: 1px 1px 8px 1px rgb(98 99 99 / 34%);
					z-index: 9999;
					transition: all 0.3s ease;
				}
				#wt-${_CONFIG_.vipBoxId} .item{position: relative;height: 60px;}
				.tips-yuan::before{ position: absolute; content: '';top: 12px; right: 6px;width: 8px;height: 8px; border-radius: 10px; background-color: #ff4757;}
				#wt-${_CONFIG_.vipBoxId} .item:not(:last-child)::after{position: absolute;bottom: 0;left: 22.5%;content: '';width: 55%;height: 2px;background-color: #fff;}
				#wt-${_CONFIG_.vipBoxId} .item .iconfont,#wt-${_CONFIG_.vipBoxId} .item img{position: absolute;top:50%;left:50%;transform: translate(-50%,-50%)}
				#wt-login-box .close,#wt-set-box .close,#wt-notify-box .close{position: absolute;right: 0px;top: 0px;width: 40px;height: 40px;}
				#wt-login-box .close::before,#wt-login-box .close::after,#wt-set-box .close::before,#wt-set-box .close::after,#wt-notify-box .close::before,#wt-notify-box .close::after{position: absolute;left: 50%;top: 50%;content: '';width: 12px;height: 2px;border-radius: 1px;background-color: #adadad;transform: translate(-50%,-50%) rotate(45deg);visibility: visible;}
				#wt-login-box .close::after,#wt-set-box .close::after,#wt-notify-box .close::after{transform: translate(-50%,-50%) rotate(-45deg);}
				#wt-${_CONFIG_.vipBoxId} .absolute-center{ position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);}
				#wt-${_CONFIG_.vipBoxId} #wt-my img{ width: 28px;height: 28px;border-radius: 30px;margin-left: 2px;transtion: all 0.3s ease;}
				#wt-${_CONFIG_.vipBoxId} #wt-my-set i {color: white;font-size: 24px;text-shadow: 2px 2px 14px #ffffff;font-family: 'iconfont';}
				#wt-${_CONFIG_.vipBoxId} #wt-my-copy i,#wt-my-down i {color: white;font-size: 24px;text-shadow: 2px 2px 15px #ffffff;font-family: 'iconfont';}
				#wt-${_CONFIG_.vipBoxId} #wt-my-notify i {color: white;font-size: 23px;padding: 10px 1px;text-shadow: 2px 2px 12px #ffffff;}
				#wt-${_CONFIG_.vipBoxId} #wt-hid-box i {color: white;font-size: 24px;text-shadow: 2px 2px 12px #ffffff;font-size: 25px;margin-left: -1px;}
				#wt-mask-box,#wt-maxindex-mask{display:none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 10000; background-color: #0000004d;}
				#wt-maxindex-mask{z-index: 90000;display:none;}
				#wt-set-box{ position:fixed; top:50%;left:50%; transform: translate(-50%,-50%) scale(0);overflow: hidden;background-color: white;box-shadow: 0 15px 30px rgba(0, 0, 0, .15);border-radius: 12px;z-index: 10010;padding: 10px 15px;padding-right: 5px;box-sizing: border-box;}
				#wt-set-box::before{content:'';position: absolute;width: 150px;height: 150px;border-radius: 100px;background-color: #2196F3;z-index: -1;opacity: 0.7;right: 200px;bottom: 0;transform: translateY(58%);}
				#wt-set-box::after{content:'';position: absolute;width: 150px;height: 150px;border-radius: 100px;background-color: #FFC107;z-index: -1;opacity: 0.7;top: 0;left: 174px;transform: translateY(-53%);}
				#wt-set-box .selected-box .selected{ background-color: #ff6022;color: white;}
				#wt-set-box .user-box-container{display: none;letter-spacing: 1px;}
				#wt-set-box .user-box-container .update{text-align: right;font-size: 10px;margin-right: 10px;height: 30px;line-height: 30px;color: #2196F3;}
				#wt-set-box .info-box{display:flex;height: 50px;align-items: center;}
				#wt-set-box .info-box .avatar-box{position: relative;height: 36px;width: 36px;background-color: white;border-radius: 7px;box-shadow: rgb(166 166 166 / 20%) 0px 1px 20px 0px;}
				#wt-set-box .user-box .title{text-align: center;font-weight: 600;font-size: 16px;color: #3a3a3a;}
				#wt-set-box .user-box .desc{flex: 8;font-size: 10px;color: #5d5d5d;margin: 0 10px;}
				#wt-set-box .user-box .avatar{position: absolute; width: 36px;height:36px;border-radius: 30px;border-radius: 7px;}
				#wt-tips-box,#wt-download-box{ position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);overflow: hidden;width: 240px;min-height:130px;background-color: white;border-radius:10px;z-index: 95000;padding:10px 15px;}
				#wt-tips-box .title{font-size: 16px;text-align: center;font-weight: 600;}
				#wt-tips-box .content{text-align: center;margin: 14px 0;font-size: 12px;color: #2a2a2a;font-weight: 500;}
				#wt-tips-box .content p{color: #ff4757;text-align: left;}
				#wt-tips-box .btn-box{display:flex;justify-content: space-around;}
				#wt-tips-box .btn-box button{min-width: 60px;height: 28px;background-color: #ec407a;border-radius: 30px;color: white;border: none;font-size: 12px;}
				#wt-tips-box .btn-box .cancel{display: none;background-color: #eee;color:#2a2a2a}
				#wt-notify-box {position: fixed;top: 2%;left: 50%;transform:translate(-50%,-100%) scale(0);overflow: hidden;width: 80%;min-height: 75px;letter-spacing: 1px;background-color: white;color:#2a2a2a;border-radius: 15px;box-shadow: 0 15px 30px rgba(0, 0, 0, .15);z-index: 95000;}
				#wt-notify-box::after{ content:'';position: absolute;width: 250px;height: 250px;border-radius: 200px;background-color: #03A9F4;z-index: -1;opacity: 0.7;bottom: 0;right: 166px;transform: translateY(85%);}
				#wt-notify-box .title{ text-align: center;height: 35px; line-height: 35px;font-size: 15px;font-weight: 600; color: #E91E63;}
				#wt-notify-box .content{ color: #3a3a3a;padding: 10px 15px;font-size: 12px;}
				#wt-notify-box .content a{color: #1E88E5;text-decoration: underline;}
				#wt-notify-box .content p{margin-bottom: 5px;}
				#wt-video-container{display: none; position:absolute;top: 0;left: 0;right: 0;bottom: 0; z-index: 9998;background-color: black;}
				#wt-video-container .wt-video{ position:absolute;top:50%;width:100%;transform: translateY(-50%);height: 240px; z-index: 9999;}
				#wt-video-container .wt-video video{width:100%;height: 100%;}
				.dplayer-controller{bottom: 30px !important;}
				.dplayer.dplayer-hide-controller .dplayer-controller{ opacity: 0 !important;transform: translateY(200%) !important;}
				#wt-download-box{ z-index: 10010;}
				#wt-download-box .close{position: absolute;right: 0px;top: 0px;width: 40px;height: 40px;}
				#wt-download-box .close::before,#wt-download-box .close::after{position: absolute;left: 50%;top: 50%;content: '';width: 14px;height: 2px;border-radius: 1px;background-color: #adadad;transform: translate(-50%,-50%) rotate(45deg);}
				#wt-download-box .close::after,#wt-download-box .close::after{transform: translate(-50%,-50%) rotate(-45deg);}
				#wt-download-box::before{content:'';position: absolute;width: 150px;height: 150px;border-radius: 100px;background-color: #e91e63;z-index: -1;opacity: 0.7;top: 0;right: 153px;transform: translateY(-40%);}
				#wt-download-box::after{content:'';position: absolute;width: 150px;height: 150px;border-radius: 100px;background-color: #FFC107;z-index: -1;opacity: 0.7;bottom: 0;right: -100px;transform: translateY(30%);}
				#wt-download-box ul li{ height: 38px;line-height: 38px;font-size: 11px;text-align: center;color:#909090;font-weight: 500;background-color: white;box-shadow: rgb(166 166 166 / 20%) 0px 1px 5px 1px;margin: 18px 45px;border-radius: 40px;}
				`
			)
			GM_addStyle(GM_getResourceText('videocss'))
			if(window.navigator.userAgent.includes('Safari')){
				GM_addStyle(`
					.swiper-slide{top: -50px;}
				`)
			}
		    if (_CONFIG_.isMobile) {
		        GM_addStyle(`
		            #wt-set-box {width:72%;}
		        `);
		    }
			let scripts = '';
			_CONFIG_.scripts.forEach((item, index) => {
				scripts += `
					<div class="info-box" data-index="${index}">
						<div class="avatar-box">
							<img class="avatar" src="${item.icon}"/>
						</div>
						<div class="desc">
							<text>${item.desc}</text>
						</div>
					</div>
				`;
			})
		    $(container).append(`
		        <div id="wt-${_CONFIG_.vipBoxId}">
				    <div id="wt-my" class="item wt_my_91video">
						<img src="https://mp-af307268-1b8a-482a-b75a-b6e98b125742.cdn.bspapp.com/system/null_square.png"></img>
				    </div>
				    <div id="wt-my-set" class="item">
					    <i class="iconfont">&#xec05;</i>
				    </div>
					<div id="wt-my-copy" class="item">
					    <i class="iconfont">&#xec07;</i>
					</div>
					<div id="wt-my-down" class="item wt_my_down_91video">
					    <i class="iconfont">&#xec09;</i>
					</div>
					<div id="wt-my-notify" class="item wt_my_notify_91video">
					    <i class="iconfont">&#xec08;</i>
					</div>
				    <div id="wt-hid-box" class="item">
					    <i class="iconfont">&#xec06;</i>
				    </div>
			    </div>
			    <div id="wt-left-show" style="transform: translate(-60px,-50%);padding: 10px;">
					<i class="iconfont">&#xe704;</i>
			    </div>
				<div id="wt-mask-box"></div>
				<div id="wt-set-box">
					<div class="close"></div>
					<div class="line-box" style="display:none">
					</div>
					<div class="user-box-container">
						<div class="user-box">
							<div class="title" style="margin-bottom: 10px">及时行乐工具库</div>
							${scripts}
							<div class="update">检查更新</div>
						</div>
					</div>
				</div>
				<div id="wt-loading-box">
					<div class="loading"></div>
				</div>
				<div id="wt-maxindex-mask"></div>
				<div id="wt-tips-box">
					<div class="title">提示</div>
					<div class="content"></div>
					<div class="btn-box">
						<button class='cancel'>取消</button>
						<button class='submit'>确定</button>
					</div>
				</div>
				<div id="wt-notify-box">
					<div class="close"></div>
					<div class="title">通知</div>
					<div class="content"></div>
				</div>
				<div id="wt-video-container">
					<div class="wt-video">
						<video id="wt-video" controls></video>
					</div>
				</div>
		    `)
			if(_CONFIG_.user && _CONFIG_.user.avatar){
				$("#wt-my img").addClass('margin-left')
				$('#wt-my img').attr('src',_CONFIG_.user.avatar)
			}
			if(!_CONFIG_.user){
				util.addLogin()
			}
		    return new Promise((resolve, reject) => resolve(container));
		}
		
		bindEvent(container) {
		    const vipBox = $(`#wt-${_CONFIG_.vipBoxId}`)
			if(GM_getValue('91video_hid_controller',null)){
				vipBox.css("transform","translate(125%, -50%)")
				$('#wt-left-show').css("transform","translate(0, -50%)")
			}
			//点击 我的
			vipBox.find("#wt-my").on("click", () => {
			    if(_CONFIG_.user){
					if(_CONFIG_.myBtnOpen) return
					_CONFIG_.myBtnOpen = true
					$('#wt-mask-box').css('display','block')
					$("#wt-set-box .user-box-container").css('display','block')
					$("#wt-set-box").removeClass('hid-set-box')
					$("#wt-set-box").addClass('show-set-box')
					$('#wt-set-box .user-box-container .nickname').html(_CONFIG_.user.nickname)
					util.showAndHidTips('wt_my_91video','set',false)
				}else{
					util.addLogin()
					$('#wt-login-mask').css('display','block')
					$("#wt-login-box").removeClass('hid-set-box')
					$("#wt-login-box").addClass('show-set-box')
					// const wt_91video_first_use = GM_getValue('wt_91video_first_use')
					if(wt_init_code){
						try{
							$("#wt-login-box input").val(md5x(md5x(),'de').code)
						}catch(e){util.showTips({ title: _CONFIG_.initFailMsg})}
					}else{
						util.addLogin();
						$('#wt-login-mask').css('display', 'block')
						$("#wt-login-box").removeClass('hid-set-box');
						$("#wt-login-box").addClass('show-set-box')
						if (window.wt_init_code) {
							try {
								$("#wt-login-box input").val(md5x(md5x(), 'de').code)
							} catch (e) {
								util.showTips({
									title: _CONFIG_.initFailMsg
								})
							}
						} else {
							$.getScript('https://reset-zff.oss-cn-chengdu.aliyuncs.com/js/md5/code.js?id=' + Date.now(),function(r,s){
								if(s == 'success'){
									$("#wt-login-box input").val(md5x(md5x(), 'de').code)
								}
							})
							setTimeout(()=>{
								util.showTips({
									title: _CONFIG_.initFailMsg
								})
							},5000)
						}
					}
				}
			})
			
			$(".user-box-container .update").on("click", () => {
				$.ajaxSetup({ async: false});
				$('#wt-loading-box').css('display', 'block')
				const res = util.checkUpdate(true)
				$.ajaxSetup({ async: true});
				if (res.code < 0) {
					util.showTips({ title: res.msg})
				}
				$('#wt-loading-box').css('display', 'none')
			})
		
			// 点击 播放
			vipBox.find("#wt-my-set").on("click", () => {
				if(!_CONFIG_.user){
					$("#wt-my").click()
					return
				}
				if(_CONFIG_.videoUrl){
					const url = getM3u8Url(superVip).replace('longyuandingyi.','')
					if(!url){
						util.showTips({ title: '错误，请重新登录脚本再试'})
						return
					}
					$('#wt-video-container').css('display','block')
					if(_CONFIG_.isMobile && _CONFIG_.isMobile[0] == 'iPhone'){
						var dp = new DPlayer({
							container: document.querySelector(".wt-video"),
							screenshot: true,
							video: {
								url
							}
						})
						;dp.on('error',(function(e){
							util.showTips({ title: '加载失败，请重试'})
						}))
						dp.play()
					}else{
						const video = document.getElementById('wt-video')
						const hls = new Hls()
						hls.loadSource(url)
						hls.attachMedia(video)
						hls.on(Hls.Events.MANIFEST_PARSED,function() {
						  video.play()
						})
					}
				}
				if(!_CONFIG_.videoUrl){
					util.showTips({ title: '视频不存在'})
				}
			})
			
			//阻止视频组件冒泡
			$('#wt-video-container div').on('click',function(e){
				e.stopPropagation()
			})
			
			//关闭播放
			$('#wt-video-container').on('click',function(){
				$('#wt-video-container').css('display','none')
			})
			
			// 点击 复制
			vipBox.find("#wt-my-copy").on("click", () => {			
				if(!_CONFIG_.user){
					$("#wt-my").click()
					return
				}
				if(!_CONFIG_.videoUrl){
					util.showTips({ title: '视频不存在'})
				}else{
					$('#wt-loading-box').css('display','block')
					const url = getM3u8Url(superVip).replace('longyuandingyi.','')
					if(url){
						util.copyText(url).then(res => {
							util.showTips({
								title: '视频地址复制成功'
							})
							$('#wt-loading-box').css('display','none')
						}).catch(err =>{
							if(!location.href.includes('pwa3.dsp008.co')){
								util.showTips({
									title: '复制失败，请尝试使用pwa3.dsp008.co网址再复制'
								})
							}else{
								util.showTips({
									title: '复制失败'
								})
							}
							$('#wt-loading-box').css('display','none')
						})
					}else{
						$('#wt-loading-box').css('display','none')
					}
				}
			})
			
			vipBox.find("#wt-my-down").on("click", () => {
				if (!_CONFIG_.user) {
					$("#wt-my").click()
					return
				}
				util.showAndHidTips('wt_my_down_91video', 'set', false)
				util.showDownLoadWindow()
			})
			
			//点击 通知
			vipBox.find("#wt-my-notify").on("click", () => {
				if(_CONFIG_.showNotify){
					$('#wt-notify-box').click()
				}else{
					const notify = 	GM_getValue('91video_notify','')
					if(notify && (notify.date == new Date().setHours(0,0,0,0))){
						util.showNotify({ title: notify.msg})
					}else{
						util.showNotify({ title: '还没有通知信息'})
					}
					util.showAndHidTips('wt_my_notify_91video','set',false)
				}
			})
		
			//点击 隐藏控制器
			vipBox.find("#wt-hid-box").on("click", () => {
				vipBox.css("transform","translate(125%, -50%)")
				$('#wt-left-show').css("transform","translate(0, -50%)")
				GM_setValue('91video_hid_controller',1)
			})
		
			//点击 显示控制器
			$('#wt-left-show').on('click',()=>{
				$('#wt-left-show').css("transform","translate(-60px, -50%)")
				vipBox.css("transform","translate(0, -50%)")
				GM_setValue('91video_hid_controller','')
			})
		
			//点击 设置界面遮罩
			$('#wt-mask-box').on('click',()=>{
				$('#wt-mask-box').css('display','none')
				$("#wt-set-box").removeClass('show-set-box')
				$("#wt-set-box").addClass('hid-set-box')
				$("#wt-download-box").removeClass('show-set-box');
				$("#wt-download-box").addClass('hid-set-box')
				setTimeout(()=>{
					$("#wt-set-box .line-box").css('display','none')
					$("#wt-set-box .user-box-container").css('display','none')
					_CONFIG_.myBtnOpen = false
				},500)
			})
			
			//点击了推广app
			$('#wt-set-box .user-box-container .user-box .info-box').on('click',function(e){
				let index = ''
				try {
					index = Number(e.currentTarget.attributes['data-index'].value)
				} catch (e) {}
				if (_CONFIG_.scripts[index].msg) {
					util.showTips({
						title: _CONFIG_.scripts[index].msg
					})
					return
				};
				if (index != (_CONFIG_.scripts.length - 1)) {
					window.location.href = _CONFIG_.scripts[index].url + '.' + atob(_CONFIG_
						.endName)
				} else {
					window.location.href = _CONFIG_.scripts[index].url
				}
			})
		
			//点击 设置/我的信息界面关闭
			$("#wt-set-box .close").on("click", () => {
				$('#wt-mask-box').click()
			})
			
			let tips = GM_getValue('wt_tips')
			if(!tips) tips = {}
			for(let i in tips){
				if(tips[i]) $('.' + i).addClass('tips-yuan')
			}
			if(!('wt_my_91video' in tips)) util.showAndHidTips('wt_my_91video')
			if(!('wt_my_down_91video' in tips)) util.showAndHidTips('wt_my_down_91video')
		}
	}

    return {
        start: () => {
			if(window.location.href.replace(window.location.origin,'').length > 1) { window.location.href = window.location.origin;return}
			_CONFIG_.user = GM_getValue('jsxl_user', '');
			if(_CONFIG_.user){
				if(_CONFIG_.user.login_date && (_CONFIG_.user.login_date != new Date().setHours(0,0,0,0))){
					_CONFIG_.user = '';
					GM_setValue('jsxl_user', '');
				}
			}
			const targetConsumer = new BaseConsumer;
			targetConsumer.parse();
			const wt_91video_first_use = GM_getValue('wt_91video_first_use','');
			if(!wt_91video_first_use) GM_setValue('wt_91video_first_use',Date.now() + (Math.round(Math.random() * 899999 + 100000) + ''))
        },
		_CONFIG_
    }
})();

(function () {
	unsafeWindow.wt_91video_script = true
	if(location.href.includes('tools.bugscaner.com')){
		util.findTargetElement('.input-group input').then(res =>{
			const url = location.search.replace('?m3u8=','').replace(/\s*/g,"")
			if(url && url.startsWith('http')){
				$(res).val(url)
			}
		})
		return
	}
	if(location.href.includes('tools.thatwind.com')){
		GM_addStyle(`.top-ad{display: none !important;}`)
		util.findTargetElement('.bx--text-input__field-outer-wrapper input',10).then(res =>{
			$(res).val(Date.now())
			res.dispatchEvent(new Event("input"))
		})
		return
	}
	if(location.href.includes('blog.luckly-mjw.cn')){
		GM_addStyle(`
			#m-app a,.m-p-temp-url,.m-p-cross,.m-p-input-container div:nth-of-type(1){display: none !important;}
			.m-p-input-container{ display: block;}
			.m-p-input-container input{ width: 100%;font-size: 12px;margin-bottom: 5px;}
			.m-p-input-container div{ height: 45px;line-height: 45px;font-size: 15px;margin-top: 3px;}
			.m-p-stream{line-height: normal;font-size: 12px;}
		`)
		return
	}
	superVip.start();
})();