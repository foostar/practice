(function($){var touch={},touchTimeout,tapTimeout,swipeTimeout,longTapTimeout,longTapDelay=750,gesture;function swipeDirection(x1,x2,y1,y2){return Math.abs(x1-x2)>=Math.abs(y1-y2)?(x1-x2>0?"Left":"Right"):(y1-y2>0?"Up":"Down")}function longTap(){longTapTimeout=null;if(touch.last){touch.el.trigger("longTap");touch={}}}function cancelLongTap(){if(longTapTimeout){clearTimeout(longTapTimeout)}longTapTimeout=null}function cancelAll(){if(touchTimeout){clearTimeout(touchTimeout)}if(tapTimeout){clearTimeout(tapTimeout)}if(swipeTimeout){clearTimeout(swipeTimeout)}if(longTapTimeout){clearTimeout(longTapTimeout)}touchTimeout=tapTimeout=swipeTimeout=longTapTimeout=null;touch={}}function isPrimaryTouch(event){return(event.pointerType=="touch"||event.pointerType==event.MSPOINTER_TYPE_TOUCH)&&event.isPrimary}function isPointerEventType(e,type){return(e.type=="pointer"+type||e.type.toLowerCase()=="mspointer"+type)}$(document).ready(function(){var now,delta,deltaX=0,deltaY=0,firstTouch,_isPointerType;if("MSGesture" in window){gesture=new MSGesture();gesture.target=document.body}$(document).bind("MSGestureEnd",function(e){var swipeDirectionFromVelocity=e.velocityX>1?"Right":e.velocityX<-1?"Left":e.velocityY>1?"Down":e.velocityY<-1?"Up":null;if(swipeDirectionFromVelocity){touch.el.trigger("swipe");touch.el.trigger("swipe"+swipeDirectionFromVelocity)}}).on("touchstart MSPointerDown pointerdown",function(e){if((_isPointerType=isPointerEventType(e,"down"))&&!isPrimaryTouch(e)){return}firstTouch=_isPointerType?e:e.touches[0];if(e.touches&&e.touches.length===1&&touch.x2){touch.x2=undefined;touch.y2=undefined}now=Date.now();delta=now-(touch.last||now);touch.el=$("tagName" in firstTouch.target?firstTouch.target:firstTouch.target.parentNode);touchTimeout&&clearTimeout(touchTimeout);touch.x1=firstTouch.pageX;touch.y1=firstTouch.pageY;if(delta>0&&delta<=250){touch.isDoubleTap=true}touch.last=now;longTapTimeout=setTimeout(longTap,longTapDelay);if(gesture&&_isPointerType){gesture.addPointer(e.pointerId)
}}).on("touchmove MSPointerMove pointermove",function(e){if((_isPointerType=isPointerEventType(e,"move"))&&!isPrimaryTouch(e)){return}firstTouch=_isPointerType?e:e.touches[0];cancelLongTap();touch.x2=firstTouch.pageX;touch.y2=firstTouch.pageY;deltaX+=Math.abs(touch.x1-touch.x2);deltaY+=Math.abs(touch.y1-touch.y2)}).on("touchend MSPointerUp pointerup",function(e){if((_isPointerType=isPointerEventType(e,"up"))&&!isPrimaryTouch(e)){return}cancelLongTap();if((touch.x2&&Math.abs(touch.x1-touch.x2)>30)||(touch.y2&&Math.abs(touch.y1-touch.y2)>30)){swipeTimeout=setTimeout(function(){if(touch.el){touch.el.trigger("swipe");touch.el.trigger("swipe"+(swipeDirection(touch.x1,touch.x2,touch.y1,touch.y2)))}touch={}},0)}else{if("last" in touch){if(deltaX<30&&deltaY<30){tapTimeout=setTimeout(function(){var event=$.Event("tap");event.cancelTouch=cancelAll;if(touch.el){touch.el.trigger(event)}if(touch.isDoubleTap){if(touch.el){touch.el.trigger("doubleTap")}touch={}}else{touchTimeout=setTimeout(function(){touchTimeout=null;if(touch.el){touch.el.trigger("singleTap")}touch={}},250)}},0)}else{touch={}}}}deltaX=deltaY=0}).on("touchcancel MSPointerCancel pointercancel",cancelAll);$(window).on("scroll",cancelAll)});["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(eventName){$.fn[eventName]=function(callback){return this.on(eventName,callback)}})})(jQuery);
jQuery.cookie=function(name,value,options){if(typeof value!="undefined"){options=options||{};if(value===null){value="";options=$.extend({},options);options.expires=-1}var expires="";if(options.expires&&(typeof options.expires=="number"||options.expires.toUTCString)){var date;if(typeof options.expires=="number"){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000))}else{date=options.expires}expires="; expires="+date.toUTCString()}var path=options.path?"; path="+(options.path):"";var domain=options.domain?"; domain="+(options.domain):"";var secure=options.secure?"; secure":"";document.cookie=[name,"=",encodeURIComponent(value),expires,path,domain,secure].join("")}else{var cookieValue=null;if(document.cookie&&document.cookie!=""){var cookies=document.cookie.split(";");for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+"=")){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break}}}return cookieValue}};
;(function(){'use strict';function FastClick(layer,options){var oldOnClick;options=options||{};this.trackingClick=false;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=options.touchBoundary||10;this.layer=layer;this.tapDelay=options.tapDelay||200;this.tapTimeout=options.tapTimeout||700;if(FastClick.notNeeded(layer)){return}function bind(method,context){return function(){return method.apply(context,arguments)}}var methods=['onMouse','onClick','onTouchStart','onTouchMove','onTouchEnd','onTouchCancel'];var context=this;for(var i=0,l=methods.length;i<l;i++){context[methods[i]]=bind(context[methods[i]],context)}if(deviceIsAndroid){layer.addEventListener('mouseover',this.onMouse,true);layer.addEventListener('mousedown',this.onMouse,true);layer.addEventListener('mouseup',this.onMouse,true)}layer.addEventListener('click',this.onClick,true);layer.addEventListener('touchstart',this.onTouchStart,false);layer.addEventListener('touchmove',this.onTouchMove,false);layer.addEventListener('touchend',this.onTouchEnd,false);layer.addEventListener('touchcancel',this.onTouchCancel,false);if(!Event.prototype.stopImmediatePropagation){layer.removeEventListener=function(type,callback,capture){var rmv=Node.prototype.removeEventListener;if(type==='click'){rmv.call(layer,type,callback.hijacked||callback,capture)}else{rmv.call(layer,type,callback,capture)}};layer.addEventListener=function(type,callback,capture){var adv=Node.prototype.addEventListener;if(type==='click'){adv.call(layer,type,callback.hijacked||(callback.hijacked=function(event){if(!event.propagationStopped){callback(event)}}),capture)}else{adv.call(layer,type,callback,capture)}}}if(typeof layer.onclick==='function'){oldOnClick=layer.onclick;layer.addEventListener('click',function(event){oldOnClick(event)},false);layer.onclick=null}}var deviceIsWindowsPhone=navigator.userAgent.indexOf("Windows Phone")>=0;var deviceIsAndroid=navigator.userAgent.indexOf('Android')>0&&!deviceIsWindowsPhone;var deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent)&&!deviceIsWindowsPhone;var deviceIsIOS4=deviceIsIOS&&(/OS 4_\d(_\d)?/).test(navigator.userAgent);var deviceIsIOSWithBadTarget=deviceIsIOS&&(/OS [6-7]_\d/).test(navigator.userAgent);var deviceIsBlackBerry10=navigator.userAgent.indexOf('BB10')>0;FastClick.prototype.needsClick=function(target){switch(target.nodeName.toLowerCase()){case'button':case'select':case'textarea':if(target.disabled){return true}break;case'input':if((deviceIsIOS&&target.type==='file')||target.disabled){return true}break;case'label':case'iframe':case'video':return true}return(/\bneedsclick\b/).test(target.className)};FastClick.prototype.needsFocus=function(target){switch(target.nodeName.toLowerCase()){case'textarea':return true;case'select':return!deviceIsAndroid;case'input':switch(target.type){case'button':case'checkbox':case'file':case'image':case'radio':case'submit':return false}return!target.disabled&&!target.readOnly;default:return(/\bneedsfocus\b/).test(target.className)}};FastClick.prototype.sendClick=function(targetElement,event){var clickEvent,touch;if(document.activeElement&&document.activeElement!==targetElement){document.activeElement.blur()}touch=event.changedTouches[0];clickEvent=document.createEvent('MouseEvents');clickEvent.initMouseEvent(this.determineEventType(targetElement),true,true,window,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,false,false,false,false,0,null);clickEvent.forwardedTouchEvent=true;targetElement.dispatchEvent(clickEvent)};FastClick.prototype.determineEventType=function(targetElement){if(deviceIsAndroid&&targetElement.tagName.toLowerCase()==='select'){return'mousedown'}return'click'};FastClick.prototype.focus=function(targetElement){var length;if(deviceIsIOS&&targetElement.setSelectionRange&&targetElement.type.indexOf('date')!==0&&targetElement.type!=='time'&&targetElement.type!=='month'){length=targetElement.value.length;targetElement.setSelectionRange(length,length)}else{targetElement.focus()}};FastClick.prototype.updateScrollParent=function(targetElement){var scrollParent,parentElement;scrollParent=targetElement.fastClickScrollParent;if(!scrollParent||!scrollParent.contains(targetElement)){parentElement=targetElement;do{if(parentElement.scrollHeight>parentElement.offsetHeight){scrollParent=parentElement;targetElement.fastClickScrollParent=parentElement;break}parentElement=parentElement.parentElement}while(parentElement)}if(scrollParent){scrollParent.fastClickLastScrollTop=scrollParent.scrollTop}};FastClick.prototype.getTargetElementFromEventTarget=function(eventTarget){if(eventTarget.nodeType===Node.TEXT_NODE){return eventTarget.parentNode}return eventTarget};FastClick.prototype.onTouchStart=function(event){var targetElement,touch,selection;if(event.targetTouches.length>1){return true}targetElement=this.getTargetElementFromEventTarget(event.target);touch=event.targetTouches[0];if(deviceIsIOS){selection=window.getSelection();if(selection.rangeCount&&!selection.isCollapsed){return true}if(!deviceIsIOS4){if(touch.identifier&&touch.identifier===this.lastTouchIdentifier){event.preventDefault();return false}this.lastTouchIdentifier=touch.identifier;this.updateScrollParent(targetElement)}}this.trackingClick=true;this.trackingClickStart=event.timeStamp;this.targetElement=targetElement;this.touchStartX=touch.pageX;this.touchStartY=touch.pageY;if((event.timeStamp-this.lastClickTime)<this.tapDelay){event.preventDefault()}return true};FastClick.prototype.touchHasMoved=function(event){var touch=event.changedTouches[0],boundary=this.touchBoundary;if(Math.abs(touch.pageX-this.touchStartX)>boundary||Math.abs(touch.pageY-this.touchStartY)>boundary){return true}return false};FastClick.prototype.onTouchMove=function(event){if(!this.trackingClick){return true}if(this.targetElement!==this.getTargetElementFromEventTarget(event.target)||this.touchHasMoved(event)){this.trackingClick=false;this.targetElement=null}return true};FastClick.prototype.findControl=function(labelElement){if(labelElement.control!==undefined){return labelElement.control}if(labelElement.htmlFor){return document.getElementById(labelElement.htmlFor)}return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea')};FastClick.prototype.onTouchEnd=function(event){var forElement,trackingClickStart,targetTagName,scrollParent,touch,targetElement=this.targetElement;if(!this.trackingClick){return true}if((event.timeStamp-this.lastClickTime)<this.tapDelay){this.cancelNextClick=true;return true}if((event.timeStamp-this.trackingClickStart)>this.tapTimeout){return true}this.cancelNextClick=false;this.lastClickTime=event.timeStamp;trackingClickStart=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;if(deviceIsIOSWithBadTarget){touch=event.changedTouches[0];targetElement=document.elementFromPoint(touch.pageX-window.pageXOffset,touch.pageY-window.pageYOffset)||targetElement;targetElement.fastClickScrollParent=this.targetElement.fastClickScrollParent}targetTagName=targetElement.tagName.toLowerCase();if(targetTagName==='label'){forElement=this.findControl(targetElement);if(forElement){this.focus(targetElement);if(deviceIsAndroid){return false}targetElement=forElement}}else if(this.needsFocus(targetElement)){if((event.timeStamp-trackingClickStart)>100||(deviceIsIOS&&window.top!==window&&targetTagName==='input')){this.targetElement=null;return false}this.focus(targetElement);this.sendClick(targetElement,event);if(!deviceIsIOS||targetTagName!=='select'){this.targetElement=null;event.preventDefault()}return false}if(deviceIsIOS&&!deviceIsIOS4){scrollParent=targetElement.fastClickScrollParent;if(scrollParent&&scrollParent.fastClickLastScrollTop!==scrollParent.scrollTop){return true}}if(!this.needsClick(targetElement)){event.preventDefault();this.sendClick(targetElement,event)}return false};FastClick.prototype.onTouchCancel=function(){this.trackingClick=false;this.targetElement=null};FastClick.prototype.onMouse=function(event){if(!this.targetElement){return true}if(event.forwardedTouchEvent){return true}if(!event.cancelable){return true}if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(event.stopImmediatePropagation){event.stopImmediatePropagation()}else{event.propagationStopped=true}event.stopPropagation();event.preventDefault();return false}return true};FastClick.prototype.onClick=function(event){var permitted;if(this.trackingClick){this.targetElement=null;this.trackingClick=false;return true}if(event.target.type==='submit'&&event.detail===0){return true}permitted=this.onMouse(event);if(!permitted){this.targetElement=null}return permitted};FastClick.prototype.destroy=function(){var layer=this.layer;if(deviceIsAndroid){layer.removeEventListener('mouseover',this.onMouse,true);layer.removeEventListener('mousedown',this.onMouse,true);layer.removeEventListener('mouseup',this.onMouse,true)}layer.removeEventListener('click',this.onClick,true);layer.removeEventListener('touchstart',this.onTouchStart,false);layer.removeEventListener('touchmove',this.onTouchMove,false);layer.removeEventListener('touchend',this.onTouchEnd,false);layer.removeEventListener('touchcancel',this.onTouchCancel,false)};FastClick.notNeeded=function(layer){var metaViewport;var chromeVersion;var blackberryVersion;var firefoxVersion;if(typeof window.ontouchstart==='undefined'){return true}chromeVersion=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(chromeVersion){if(deviceIsAndroid){metaViewport=document.querySelector('meta[name=viewport]');if(metaViewport){if(metaViewport.content.indexOf('user-scalable=no')!==-1){return true}if(chromeVersion>31&&document.documentElement.scrollWidth<=window.outerWidth){return true}}}else{return true}}if(deviceIsBlackBerry10){blackberryVersion=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);if(blackberryVersion[1]>=10&&blackberryVersion[2]>=3){metaViewport=document.querySelector('meta[name=viewport]');if(metaViewport){if(metaViewport.content.indexOf('user-scalable=no')!==-1){return true}if(document.documentElement.scrollWidth<=window.outerWidth){return true}}}}if(layer.style.msTouchAction==='none'||layer.style.touchAction==='manipulation'){return true}firefoxVersion=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(firefoxVersion>=27){metaViewport=document.querySelector('meta[name=viewport]');if(metaViewport&&(metaViewport.content.indexOf('user-scalable=no')!==-1||document.documentElement.scrollWidth<=window.outerWidth)){return true}}if(layer.style.touchAction==='none'||layer.style.touchAction==='manipulation'){return true}return false};FastClick.attach=function(layer,options){return new FastClick(layer,options)};if(typeof define==='function'&&typeof define.amd==='object'&&define.amd){define(function(){return FastClick})}else if(typeof module!=='undefined'&&module.exports){module.exports=FastClick.attach;module.exports.FastClick=FastClick}else{window.FastClick=FastClick}}());

(function($){
    var evt = "onorientationchange" in window ? "orientationchange" : "resize"
    var remPage = function(){
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';
    }
    window.addEventListener(evt, remPage, false);
    remPage()
    // 组件开始
    function Dialog(opt){
        var that = this
        var defaultOption = {
            type: 'loading',  // loading 等待时间   info 信息提示  right 操作反馈
            autoCancel:false, // 是否自动关闭
            maskCancel:true,  // 点击遮罩层关闭
            duration: 2000,      // 持续时间
            message: '',    // 提示信息
            isShowBtn:false,   // 展示按钮组
            confirmText: '确定',  // 确认按钮文字 
            isShowCancel:false,  // 展示取消按钮
            cancelText: '取消',   // 取消按钮文字
            isShowCustom:false,  // 展示自定义按钮
            customText: '删除',    // 自定义按钮文字
            customClass:'dialog_btn_ghost',   // 自定义按钮样式
            dialogClass:'', // 弹出层样式
            opacity:0.6
        }
        this.handlers = {}
        try {
            this.options = Object.assign({}, defaultOption, opt)
        }
        catch(e) {
            this.options = defaultOption
            console.log("传入的参数不合法")
        }
        this.init()
    }
    Dialog.zindex = 10000
    Dialog.prototype = {
        init:function(){
            this.show()
            this.bindEvent()
        },
        show:function(){
            
            var that = this
            var config = this.options
            var dialogWapper = $("<div class='dialog_container "+config.dialogClass+"'></div>")
            var dialogMask = $("<div class='mask' style='background:rgba(0,0,0,"+config.opacity+")'></div>") 
            var dialog = $("<div class='dialog dialog_"+config.type+"'></div>")
            var dialogHeader = $("<div class='dialog_header'></div>")
            var dialogContent = $("<div class='dialog_content'>"+config.message+"</div>")
            dialogMask.appendTo(dialogWapper)
            dialog.appendTo(dialogWapper)
            dialogHeader.appendTo(dialog)
            dialogContent.appendTo(dialog)
            if(this.options.type == 'loading') {
                dialogWapper.addClass(config.btnClass)
            }
            Dialog.zindex++
            dialogMask.css("z-index",Dialog.zindex)
            dialog.css("z-index",Dialog.zindex+1)
            console.log(Dialog.zindex)
            if(config.isShowBtn){
                var footer = $("<div class='dialog_footer'></div>")
                $("<div class='dialog_btn dialog_btn_primary'>"+config.confirmText+"</div>").appendTo(footer)
                if (config.isShowCancel) {
                    $("<div class='dialog_btn dialog_btn_default'>"+config.cancelText+"</div>").appendTo(footer)
                }
                if (config.isShowCustom) {
                    $("<div class='dialog_btn "+config.customClass+"'>"+config.customText+"</div>").appendTo(footer)
                }
                if (config.isShowCancel && config.isShowCustom) {
                    footer.addClass("dialog_more_btn")
                }
                if (!config.isShowCancel && !config.isShowCustom) {
                    footer.addClass("dialog_single_btn")
                }
                footer.appendTo(dialog)
            }
            dialogWapper.appendTo($("body"))
            setTimeout(function(){
                dialogWapper.addClass("dialog_show")
            }, 100)
            if(config.autoCancel) {
                setTimeout(function(){
                     that.close()
                     that.trigger('delay')
                },config.duration)
            }
        },
        on: function(type, handler){
            if (typeof this.handlers[type] == 'undefined') {
                this.handlers[type] = []
            }
            this.handlers[type].push(handler)
        },
        trigger: function(type, data){
            if(this.handlers[type] instanceof Array){
                var handlers = this.handlers[type]
                for(var i = 0; i<handlers.length ; i++){
                    handlers[i](data)
                }
            }
        },
        bindEvent:function(){
            var that = this
            var config = this.options
            if(config.maskCancel && config.type != 'loading'){
                $(".mask").on('click', function(){
                    that.close()
                })
            }
            if(config.isShowBtn){
                $(".dialog_btn_primary").on('click', function(){
                    that.trigger('confirm')
                })
                if (config.isShowCancel) {
                    this.on('cancel', function(){
                        that.close()
                    })
                    $(".dialog_btn_default").on('click', function(){
                        that.trigger('cancel')
                    })
                }
                if (config.isShowCustom) {
                    $("."+config.customClass).on('click', function(){
                        that.trigger('custom')
                    })
                }
            }
        },
        close:function(){
            $(".dialog_container").remove();
        }
    }
    // loading 效果
    $("#loading").on('click', function(){
        new Dialog()
    })
    // 自动取消
    $("#message").on('click', function(){
        var dialog = new Dialog({
            type:'info',
            message:'这是一条提示阿斯顿发撒的发生发生大发发斯蒂芬',
            //duration:1500,
            //autoCancel:true
        })
        dialog.on('delay', function(){
            console.log("delay之后的触发事件")
        })
    })
    $("#confirm").on('click', function(){
        var btnClick = true
        var dialog = new Dialog({
            type:'right',
            message:'提示成功',
            isShowBtn:true,
            confirmText:'不确定',
            isShowCancel:true,
            cancelText:'你傻不傻'
        })
        dialog.on('confirm', function(){
            if(btnClick){
                btnClick = false
                console.log("触发了确定事件，开始发送ajax")
                setTimeout(function(){
                    console.log("收到了结果")
                    btnClick = true
                    dialog.close()
                },2000)
            }
        })
    })
    $("#botton").on('click', function(){
        var dialog = new Dialog({
            type:'info',
            message:'自定义的事件触发asdfasdfgasdfgasjdfgajhsdfghasdfgjhasdfgjhasdgfasdgfasd',
            isShowBtn:true,
            dialogClass:'dialog_red',
            customClass:'dialog_btn_dashed',
            isShowCancel:true,
            isShowCustom:true
        })
        dialog.on('confirm', function(){
            console.log("触发了确定事件")
            dialog.close()
        })
        dialog.on('custom', function(){
            console.log("触发了自定义事件")
            dialog.close()
        })
    })
    
    //window.Dialog = Dialog
})(jQuery);