window.$public=(function(){

    window.$modal={};

    function init(){
        //qq客服
        $(document).on("click",".qq_link",function(){
            $(".qqTanC").css("display", "flex")
        });
        //弹窗
        $(document).on("click",".contact",function(){
            $(".qqTanC").css("display", "flex")
        });
        //购买
        $(document).on("click",".pay-btn",function(){
            $(".buyTanC").css("display", "block")

        });

    }

    /*弹层*/
    function get_modal(name){
        var dom=$(".modal."+name );
        if(dom.length<=0) return;
        dom.open=function(){
            open_modal($(this));
        };
        dom.close=function(){
            close_modal($(this));
        };
        dom.find(".close, .cancel").on("click",function(){
            close_modal(dom);
        });

        return dom;
        function open_modal(m){
            m.show();
            setTimeout(function(){
                m.addClass("active");
            },50);
        }
        function close_modal(m){
            m.removeClass("active");
            setTimeout(function(){
                m.hide();
            },300);
        }
    }

    return {
        init:init,
        modal:get_modal
    }
})();

$(function(){
    $public.init();
    //window.$modal={};
    $modal.login=$public.modal("login");
    $modal.forget=$public.modal("forget_password");
    $modal.reg=$public.modal("register");
    $modal.protocol=$public.modal("protocol");
    $modal.amend=$public.modal("amend_password");
    $modal.amendPhone=$public.modal("amend_phone");
    $modal.regSucModal=$public.modal("regSucModal");
    $modal.certifyDrz=$public.modal("certify_drz");
    $modal.certifyErr=$public.modal("certify_err");
    $modal.certifyTjSuc=$public.modal("certify_tj_suc");

    //示例： 这种js写法，弹窗的使用方法
    /*立即登录*/
    $(document).on("click",".login_modal",function () {
        $(".modal").hide().removeClass("active");
        $modal.login.open();
    })
    /*立即注册*/
    $(document).on("click",".reg_modal",function () {
        $(".modal").hide().removeClass("active");
        $modal.reg.open();
    })
    /*忘记密码*/
    $(document).on("click",".forget_modal",function () {
        $(".modal").hide().removeClass("active");
        $modal.forget.open();
    })
});
//密码眼睛显示隐藏
$(function () {
    $(".login .eye").click(function () {
        $(".form-line .pass").attr("type","text")
        $(".login .eyes").show()
        $(this).hide()
    })
    $(".login .eyes").click(function () {
        $(".form-line .pass").attr("type","password")
        $(".login .eye").show()
        $(this).hide()
    })
    $(".register .eye").click(function () {
        $(".form-line .pass").attr("type","text")
        $(".register .eyes").show()
        $(this).hide()
    })
    $(".register .eyes").click(function () {
        $(".form-line .pass").attr("type","password")
        $(".register .eye").show()
        $(this).hide()
    })
    $(".forget-form .eye").click(function () {
        $(".form-line .pass").attr("type","text")
        $(".forget-form .eyes").show()
        $(this).hide()
    })
    $(".forget-form .eyes").click(function () {
        $(".form-line .pass").attr("type","password")
        $(".forget-form .eye").show()
        $(this).hide()
    })
    $(".forget-form .eye2").click(function () {
        $(".form-line .pass2").attr("type","text")
        $(".forget-form .eyes2").show()
        $(this).hide()
    })
    $(".forget-form .eyes2").click(function () {
        $(".form-line .pass2").attr("type","password")
        $(".forget-form .eye2").show()
        $(this).hide()
    })
})

//置顶
$(function () {
    $('#goTop').click(function () {
        $('html,body').animate({scrollTop:0}, 800);
    })
})

var check_info_have_pase = {
    to_login: function () {
        var have = $("#have_login").val();
        if (have == 1) {
            return 1;
        } else {
            $modal.login.open();
            return 0;
        }
    }
}