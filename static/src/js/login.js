/**
 * Created by ADMIN on 2017/5/9.
 */
$(function () {
    var func = {
        login: function () {
            var url = $("#login_url").val();
            var phone = $("#login_phone").val();
            var password = $("#login_password").val();
            var param = {
                phone: phone,
                password: password,
                remember: $("#st-conte").is(':checked') ? 1 : 0,
            };

            if (phone.length == 0) {
                layer.msg("请输入用户名或手机号码");
                return false;
            }

            if (password.length == 0) {
                layer.msg("请输入登录密码");
                return false;
            }

            var now_nav = $("#now_nav").val();

            common.ajax_jsonp(url, param, function (rt) {
                common.jsonp_tips(rt, function (obj) {
                    var day = 1;
                    if (param.remember) {
                        day = 7;
                    }
                    $.cookie('session_id', obj, { expires: day, path: '/' });
                    if (now_nav == 'index/index') {
                        // location.href = '/ucenter/?first_time=0#info';
                        location.href = '/getapi';
                    } else {
                        location.reload();
                    }
                }, function (obj) {

                    if (obj.code == 119) {//密码错误
                        var time = $("#pwd_err_times").val();
                        var new_time = time + 1;
                        $("#pwd_err_times").val(new_time);
                        if (new_time > 1) {
                            $(".pro").show()
                        } else {
                            layer.msg(obj.msg);
                        }
                        if (new_time > 2) {
                            //显示验证码

                        }

                    } else {
                        layer.msg(obj.msg);
                    }

                });

            }, true);

        },

        checkphone: function () {
            var phone = $(".phone_forget").val();
            var regx = /^[1][3-9][0-9]{9}$/;
            if (!regx.test(phone)) {
                layer.msg('请填写正确手机号码', { icon: 2 });
            } else {
                func.get_forget_phone_code();

            }
        },

        /**获取手机验证码*/
        get_forget_phone_code: function (verify_code) {
            var get_phone_url = $("#get_reg_phonecode").val();
            var phone = $(".phone_forget").val();
            var type = "forget";
            var forget_verify = $("#forget_verify").val();
            if (forget_verify == 0) {
                layer.msg("请填写图形验证码");
                return false;
            }
            common.ajax_jsonp(get_phone_url, { phone: phone, type: type, verfy: forget_verify }, function (rt) {
                common.jsonp_tips(rt, function (obj) {
                    func.time_clock(60);
                    //                    $(".modal_verify_reg").trigger("click");
                }, function (obj) {
                    layer.msg(obj.msg, { icon: 2 });
                    $(".modal_verify_reg").trigger("click");
                })
            }, true)
        },

        /**倒计时60秒*/
        time_clock: function (time_sec) {
            $(".vacode").addClass("disabled").removeClass("get_forget_phone_code");
            $(".vacode").html(time_sec + "s");
            $(".vacode").html(time_sec + "s").addClass("code-active");
            time_index = window.setInterval(function () {
                $(".vacode").html(--time_sec + "s").addClass("code-active");
                if (time_sec == 0) {
                    $(".vacode").html('再次获取').addClass("get_forget_phone_code").removeClass("disabled code-active");
                    window.clearInterval(time_index);
                }
            }, 1000)
        },

        sub: function () {
            var url = $("#forget_password_url").val();
            var phone = $(".phone_forget").val();
            var phone_code = $(".forget_phone_code").val();
            var new_pwd = $(".new_pwd").val();
            var re_pwd = $(".new_pwd").val();
            var verify = $("#forget_verify").val();


            if (phone.length == 0) {
                layer.msg("请输入手机号码");
                return false;
            }

            var regx = /^[1][3-9][0-9]{9}$/;

            if (!regx.test(phone)) {
                layer.msg('请填写正确的原手机号', { icon: 2 });
                return false;
            }

            if (phone_code.length == 0) {
                layer.msg("请填写所获取的手机验证码");
                return false;
            }

            if (new_pwd.length == 0) {
                layer.msg("请填写新密码");
                return false;
            }

            if (re_pwd.length == 0) {
                layer.msg("请填写确认新密码");
                return false;
            }

            if (re_pwd != new_pwd) {
                layer.msg("两次密码不一致！");
                return false;
            }

            var param = {
                phone: phone,
                phone_code: phone_code,
                new_pwd: new_pwd,
                re_pwd: re_pwd,
                verify: verify
            }

            if (new_pwd.length < 6 || new_pwd.length > 30) {
                layer.msg(" 密码必须是6-30位数字或字母组合", { icon: 2 });
                return false;
            }
            common.ajax_jsonp(url, param, function (rt) {
                common.jsonp_tips(rt, function (obj) {
                    var rtobj = JSON.parse(rt);
                    layer.msg(rtobj.msg);
                    $modal.forget.close();
                    $modal.login.open();

                    //                    $(".act_login").trigger('click');

                }, function (obj) {
                    layer.msg(obj.msg)
                    $(".modal_verify_reg").trigger("click");
                })
            })
        },
    };

    $("#forget_but").on('click', function () {
        func.sub();
    });

    $(".get_forget_phone_code").on('click', function () {

        

        if ($(this).hasClass('disabled')) {

        } else {
            func.checkphone();
        }
    });

    $("#login").on('click', function () {
        func.login();
    })

    $('#password').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $("#login").trigger('click');

        }
    });

});
