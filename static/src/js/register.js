$(document).ready(function () {

    var func = {

        reg_phone_code: function () {
            func.checkphone();
            //
        },

        checkphone: function () {
            var phone = $("#reg_phone").val();
            var regx = /^[1][3-9][0-9]{9}$/;
            if (!regx.test(phone)) {
                layer.msg('请输入正确的手机号码', { icon: 2 });
                return false;
            }

            var token = $('#token').val();
            if (token == "") {
                layer.msg("请滑动滑块验证");
                return false;
            }

            func.get_reg_phone_code();
        },

        submit_reg: function () {

           

            var agree = $("#st-conte1").prop('checked');
            if (agree !== true) {
                layer.msg('请选择同意《全球HTTP用户协议》');
                return;
            }

            var url = $("#submit_reg_url").val();
            var ucenter_url = $("#ucenter_url").val();
            var login_success_url = $("#login_success_url").val();
            var redirect_url = $("#redirect_url").val();
            var success_url = $("#success_url").val();

            var reg_name = $("#reg_name").val();

            var reg_type = $("#reg_type").val();
            var phone = $("#reg_phone").val();
            var phone_code = $("#reg_phone_code").val();
            var mail = $("#reg_mail").val();
            var mail_code = $("#reg_mail_code").val();
            var reg_verfy = $("#reg_verfy").val();
            //qu dao
            var origin_tail = '';
            var getparam = common.getrequest();
            if (typeof (getparam['expandkey']) == "undefined") {

            } else {
                origin_tail = getparam['expandkey'];
            }

            var expandsecret = '';
            if (typeof (getparam['expandsecret']) != "undefined") {
                expandsecret = getparam['expandsecret'];
            }

            if (reg_type == 'phone') {
                var regx = /^[1][3-9][0-9]{9}$/;

                if (!regx.test(phone)) {
                    layer.msg('请填写正确的手机号', { icon: 2 });
                    return false;
                }


                var token = $('#token').val();
                if (token == "") {
                    layer.msg("请滑动滑块验证");
                    return false;
                }


                if (phone_code.length < 1) {
                    layer.msg('请输入短信验证码', { icon: 2 });
                    return false;
                }
                var password = $("#reg_pwd_phone").val();
            } else {
                var mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if (!mailReg.test(mail)) {
                    layer.msg('请填写正确的邮箱', { icon: 2 });
                    return false;
                }
                if (mail_code.length < 1) {
                    layer.msg('请输入邮箱验证码', { icon: 2 });
                    return false;
                }
                var password = $("#reg_pwd").val();
            }

            if (password.length < 1) {
                layer.msg("请输入密码");
                return false;
            }

            if (password.length < 6 || password.length > 18) {
                layer.msg(" 密码为6-18位任意字符");
                return false;
            }

            //            if (reg_verfy.length < 1) {
            //                layer.msg("请输入图形验证码");
            //                return false;
            //            }
            var param2 = GetRequest();
            var param = {
                reg_type: reg_type,
                reg_name: reg_name,
                password: password,
                re_password: password,
                verfy: reg_verfy,
                phone: phone,
                phone_code: phone_code,
                mail: mail,
                mail_code: mail_code,
                origin_tail: origin_tail,
                expandsecret: expandsecret,
                share: param2['share'],
            };
            common.ajax_jsonp(url, param, function (rt) {
                common.jsonp_tips(rt, function (obj) {
                    $.cookie('session_id', obj.token, { expires: 1, path: '/' });
                    location.href = redirect_url + '?first_time=1';

                }, function (obj) {
                    $(".modal_verify_reg").trigger('click');
                    layer.msg(obj.msg);
                    
                })

            }, true);
        },

        /**获取手机验证码*/
        get_reg_phone_code: function (verify_code) {
            var get_phone_url = $("#get_reg_phonecode").val();
            var param = {
                phone: $("#reg_phone").val(),
                type: "reg",
                verfy: $("#reg_verfy").val(),
                afs_csessionid: $("#csessionid").val(),
                afs_token: $("#token").val(),
                afs_sig: $("#sig").val(),
            };
            common.ajax_jsonp(get_phone_url, param, function (rt) {
                common.jsonp_tips(rt, function (obj) {
                    func.time_clock(60);
                }, function (obj) {
                    layer.msg(obj.msg, { icon: 2 });
                    $(".modal_verify_reg").trigger('click');
                    __nc.reset()
                })
            }, true)
        },
        /**获取邮箱验证码*/
        get_reg_mail_code: function (verify_code) {
            var mail = $("#reg_mail").val();
            var type = "reg";
            var reg_verfy = $("#reg_verfy").val();
            common.ajax_jsonp($("#get_reg_mailcode").val(), { mail: mail, type: type, verfy: reg_verfy }, function (rt) {
                common.jsonp_tips(rt, function (obj) {
                    func.time_clock(60);
                }, function (obj) {
                    layer.msg(obj.msg, { icon: 2 });
                })
            }, true)
        },

        /**倒计时60秒*/
        time_clock: function (time_sec) {
            $(".vacode").addClass("disabled").removeClass("reg_get_code");
            $(".vacode").html(time_sec + "s");
            $(".vacode").html(time_sec + "s").addClass("code-active");
            time_index = window.setInterval(function () {
                $(".vacode").html(--time_sec + "s").addClass("code-active");
                if (time_sec == 0) {
                    $(".vacode").html('再次获取').addClass("reg_get_code").removeClass("disabled code-active");
                    window.clearInterval(time_index);
                }
            }, 1000)
        },

    }

    $(document).on("click", "#st-conte1", function () {

        if ($(this).is(":checked")) {
            $(this).prop("checked", true);
        } else {
            $(this).prop("checked", false);
        }
    });


    // 提交注册
    $("#register_do").on('click', function () {
        func.submit_reg();
    });
    $(document).on("click", ".agree_open", function () {
        var a = $(".content_inner>.inner").length;
        window.scrollTo(0, 0);
        $(".reg_Agreement").show();
        $(".content_inner>.inner").mCustomScrollbar();
        $("body").css({
            height: "1200px",
            overflow: "hidden"
        });
    })

    //获取注册验证码
    $(".get_reg_phone_code").on('click', function () {


        if ($(this).hasClass('disabled')) {

        } else {

            func.reg_phone_code();
        }
    });
    //获取邮箱验证码
    $(".get_reg_mail_code").on('click', function () {
        if ($(this).hasClass('disabled')) {

        } else {
            func.get_reg_mail_code();
        }
    });


    //密码自动切换点击事件
    $("#user_pwd").on("keyup", function (event) {
        var len = $(this).val();
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == "65") {
            if (len.length > 5 && len.length < 21) {
                $("#register_do").trigger("click");
            }
        }
    });
});




