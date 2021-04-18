$(document).ready(function () {
    autoLogin()
    checkLogin();
    function setCookie(name, value, Days){
        if(Days == null || Days == ''){
            Days = 300;
        }
        var exp  = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + "; path=/;expires=" + exp.toGMTString();
    }
    // 自动登录
    function autoLogin() {

        var session = $_GET["session"]
        if (session !== "" && session !== undefined) {
            common.ajax_jsonp($("#auto_login").val(), {"session": session}, function (rt) {
                rt = JSON.parse(rt)
                if (rt.code !== "-1") {
                    $.cookie('session_id', rt["ret_data"], { expires: 1, path: '/' });
                    location.href = location.href.split("?")[0];
                }
            })
        }
    }
    // 获取用户是否登录
    function checkLogin() {
        common.ajax_jsonp($('#get_user_info').val(), {}, function (rt) {
            common.jsonp_tips(rt, function (obj) {
                //获取登录信息
                $('.no-login').hide();
                $('.yes-login>.name').text(obj.username).show();
                $('#console').show();

                $('.yes-login').show();
                //售后
//                console.log(obj.shouhou);
                $("#base_footer_user_key_shouhou").val(obj.shouhou);
//                console.log($("#base_footer_user_key_shouhou").val());
                //
                $("#have_login").val(1);
                $("#mid").val(obj.id);

                $('.banButton .use').hide();
                $('.banButton .lxkf ').css("background","#ffc133")
                $('.banButton .lxkf ').css("color","#fff")
                //菜单头部填充
                $(".user-name.cmd-item").text(obj.phone||obj.username);
                $(".rge-ser").hide();

                // 抽奖活动  活动结束 删除
                $('#shengyu').html(obj.choujiang);

                setCookie("uid", obj.id)

                if (obj.is_biger === "1") {
                    $(".menu a:eq(8)").show();
                }
                // 如果是技术认证, 展示右侧广告
                if (obj.certify_type == "3") {
                    $(".tgzq").show()
                }

                //
                $("#username").text(obj.phone || obj.username)
                if (obj.flow > 0 ) {
                    $("#qqsp1").show()
                    $("#qqsp2").hide()
                    var flow_g = Math.floor(obj.flow / 1000 * 100) / 100;
                    if (flow_g > 1) {
                        $("#qqsp1").html(flow_g + 'G');
                    }else{
                        $("#qqsp1").html(obj.flow + 'M');
                    }
                }
                if (obj.flow_normal > 0) {
                    $("#zgsp1").show()
                    $("#zgsp2").hide()
                    var flow_normal_g = Math.floor(obj.flow_normal / 1000 * 100) / 100;
                    if (flow_normal_g > 1) {
                        $("#zgsp1").html(flow_normal_g + 'G');
                    }else{
                        $("#zgsp1").html(obj.flow_normal + 'M');
                    }
                }
                if (obj.static_num > 0) {
                    $("#jtsp1").show()
                    $("#jtsp2").hide()
                    $("#jtsp1").text(obj.static_num);
                }
                if (obj.certify == 0) {
                    $(".tipRight").show()
                }
            }, function (obj) {
                $('.banButton .use').show();
                
                $("#have_login").val(0);
                $('.no-login').show();
                $('.yes-login').hide();
                $.removeCookie("uid")
                var param2 = GetRequest();
//                console.log(param2['share'])

                if (param2['share']) {
                    // $('.service-modal').hide()
                    setTimeout(function () {
                        $(".no-login .reg").trigger('click');
                    }, 900)
                } else {

                }
            })
        })
    }
});




