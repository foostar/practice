(function($){
    
    function Dialog(opt){
        var self = this
        var config = {
            type:'loading',    //弹出的type
            isShowBtn:false,   // 展示按钮组
            autoCancel:false, // 是否自动关闭
            duration: 2000,      // 持续时间
            message: '',    // 提示信息
            confirmText: '确定',  // 确认按钮文字 
            isShowCancel:false,  // 展示取消按钮
            cancelText: '取消',   // 取消按钮文字
            isShowCustom:false,  // 展示自定义按钮
            customText: '删除',    // 自定义按钮文字
            customClass:'dialog_btn_ghost',   // 自定义按钮样式
            dialogClass:'', // 弹出层样式
            opacity:0.6,
            maskCancel:true  // 点击遮罩层关闭
        }
        
        this.handlers = {}
        this.options = Object.assign({}, config, opt)
        this.init()
    }
    Dialog.prototype = {
        init:function(){
            this.render()
            this.bindEvent()
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
        render:function(){
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
            if(config.isShowBtn){
                var footer = $("<div class='dialog_footer'></div>")
                $("<div class='dialog_btn dialog_btn_primary'>"+config.confirmText+"</div>").appendTo(footer)
                if (config.isShowCancel) {
                    $("<div class='dialog_btn dialog_btn_default'>"+config.cancelText+"</div>").appendTo(footer)
                }
                if (config.isShowCustom) {
                    $("<div class='dialog_btn "+config.customClass+"'>"+config.customText+"</div>").appendTo(footer)
                }
                /*if (config.isShowCancel && config.isShowCustom) {
                    footer.addClass("dialog_more_btn")
                }
                if (!config.isShowCancel && !config.isShowCustom) {
                    footer.addClass("dialog_single_btn")
                }*/
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
            message:'这是一条提示',
            duration:1500,
            autoCancel:true
        })

        dialog.on('delay', function(){
            console.log("delay之后的触发事件")
        })
    })
    //window.Dialog = Dialog
})(jQuery);