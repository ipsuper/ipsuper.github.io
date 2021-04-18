
window.$public = (function () {

    return
    var issafari = IsSafari();

    var param = GetRequest();

    if (param["have_open_ok"] == 1) { //
        $("#have_open_api").val(1);
    }

    //console.log(issafari)
    if (issafari == 1) { // 如果是safari 跳一下接口session
        if ($("#have_open_api").val() != 1) {
            var url = $("#get_api_session").val();
            location.href = url + encodeURIComponent(window.location.href);
            return false;
        }
    }
    
    var ispc = IsPC();
    if (ispc == false) {
        var param = GetRequest();
        var expandkey = ''
        if (param.expandkey) {
            expandkey = param.expandkey
        } else if (param['utm-source']) {
            k = param['utm-keyword']
            k = k.replace("?", "")
            expandkey = param['utm-source'] + "-" + k
        }
        if (expandkey) {
            location.href = "/wap?k=" + expandkey
        } else {
            location.href = "/wap"
        }
        return false;
    }


    var issafari = IsSafari();

    var param = GetRequest();

    if (param["have_open_ok"] == 1) { //
        $("#have_open_api").val(1);
    }

    //console.log(issafari)
    if (issafari == 1) { // 如果是safari 跳一下接口session
        if ($("#have_open_api").val() != 1) {
            var url = $("#get_api_session").val();
            location.href = url + encodeURIComponent(window.location.href);
            return false;
        }
    }

    function set_top(name, isfixed) {

    }
    function init() {
        // var qq_link = "http://q.url.cn/s/xUC6sRm?_type=wpa&qidian=true";
        $(document).on("click", ".qq_link", function () {
            // window.open(qq_link, true);

        });
        setQQModal();
        enter_login();
    }



    /*回车登录*/
    function enter_login() {
        $(document).on("keyup", "#login_password", function (e) {
            if (e.keyCode == 13) {
                //console.log(1)
                $("#login").trigger("click");
            }
        });
    }


    return {
        menu: set_top,
        init: init
    }
})();

function setQQModal() {
    var link = "http://q.url.cn/s/xUC6sRm?_type=wpa&qidian=true";
    setTimeout(function () {
        var modal = $(".service-modal");
        if (modal.length > 0) {
            modal.find(".sem-btn.submit").on("click", function () {
                window.open(link);
            });
            modal.show();
            setTimeout(function () {
                modal.addClass("active");
            }, 10);
            modal.find(".close, .cancel").on("click", function () {
                modal.removeClass("active");
                setTimeout(function () {
                    modal.hide();
                }, 300);
            });

        }
        //点击其它地方关闭
        $(document).on("click", function (e) {
            var target = $(e.toElement || e.target);
            if (!(target.closest(".service-modal").hasClass("active"))) {
                modal.removeClass("active");
                setTimeout(function () {
                    modal.hide();
                }, 300);
            }
        });
        $(".header .nav a").on("click", function () {
            modal.removeClass("active");
            setTimeout(function () {
                modal.hide();
            }, 300);
        });

    }, 500);
}

function get_costom() {

    var url = $("#get_agio_url").val();
    common.ajax_jsonp(url, '', function (rt) {
        common.jsonp_tips(rt, function (obj) {
            if (obj.expand.length > 0) {

                // console.log(obj)
                $(".train-vip-new").html(obj.expand);
                $("#expand_reg").html(obj.expand_title);

                if (obj.is_train == 0) {
                    $("#logo_train").addClass("spe-h1")
                }

                $(".train-vip").show();
                $(".train-vip-new").show();
            }

        }, function (obj) {
            console.log(obj)
        })
    });

}

$(function () {
    $public.init();
    reg_layer();
    contact_server();
    change_order();

    // todo: 存储 推荐人
    var param = GetRequest();
    if (param['rec']) {
        $.cookie('recommend', param['rec'], {expires: 1});
        var url = window.location.href
        if (url.indexOf("buy") != -1) {
            getRecommend(param['rec']);
        }
    }

    // 获取推荐人信息
    function getRecommend(rec) {
        common.ajax_jsonp($('#get_recommend').val(), {rec: rec}, function (rt) {
            console.log(rt);
            var obj = JSON.parse(rt);
            if (obj.code == 1) {
                $('#xiaoshou_name').html("销售姓名：" + obj.ret_data.nickname);
                $('#xiaoshou_phone').html('手机：' + obj.ret_data.phone);
                $('#xiaoshou_wx').attr('src', obj.ret_data.img);
            }
        })
    }

    setTimeout(function () {
//        get_costom(); // 2019-05-11 源 - 新加

    }, 500);

    /*联系客服*/
    function contact_server() {
        $(document).on("mouseenter", ".contact-server>.main", function () {
            $(".contact-server>.right-content").fadeIn();
        });
        $(document).on("click", ".contact-server .close", function () {
            $(".contact-server>.right-content").fadeOut();
        });
    }

    /*采集器随机排序*/
    function change_order() {
        var content = '',
                lis = $("#change_order li");
        var arr = [0, 1, 2];
        arr.sort(function () {
            return (0.5 - Math.random());
        });
        for (var i = 0; i < arr.length; i++) {
            content += "<li>" + $(lis[arr[i]]).html() + "</li>";
        }
        $("#change_order").html(content);
    }
});

function currency(index1, index2, index3, index4) {
    $(document).on("click", index1, function () {
        var a = $(this).index(index1);
        $(this).addClass(index2).siblings(index1).removeClass(index2);
        $(index3).eq(a).addClass(index4).siblings(index3).removeClass(index4);
    })
}
// 通用弹窗
function reg_layer() {
    $(document).on("click", ".h-info>.login", function () {
        $(".reg_layer").fadeIn();
        $(".reg_layer>.item").removeClass("active");
        $(".reg_layer>.item.login").addClass("active");
    })

    $(document).on("click", ".h-info>.reg,.rge-ser", function () {
        $(".reg_layer").fadeIn();
        $(".reg_layer>.item").removeClass("active");
        $(".img_verify_password").removeClass("active");
        setTimeout(function () {
            $(".reg .img_verify_password").trigger('click');
        }, 500);
        $(".reg_layer>.item.reg").addClass("active");
    })

    // 2017/6/26 新增弹窗
    $(document).on("click", ".label>.copyUrl", function () {
        var a = $(this).siblings(".link_data").val();
        if (a !== "") {
            $(".reg_layer").fadeIn();
            $(".reg_layer>.item").removeClass("active");
            $(".reg_layer>.item.copy").addClass("active");
        }
    })

    $(document).on("click", ".act_login", function () {
        $(this).parents(".item").removeClass("active");
        $(".item.login").addClass("active");
    })

    $(document).on("click", ".act_reg", function () {
        $(this).parents(".item").removeClass("active");
        $(".item.reg").addClass("active");
        $(".reg .img_verify_password").trigger("click");
    })

    $(document).on("click", ".act_pwd", function () {
        $(this).parents(".item").removeClass("active");
        $(".item.pwd").addClass("active");
        $(".img_forget_password").trigger("click");
    })



    $(document).on("click", ".item>.close", function () {
        $(this).parents(".item").removeClass("active");
        $(".reg_layer").fadeOut();
    })

    $(document).on("click", ".button-type", function () {
        var a = $(this).prev("input").attr("type");
        if (a == "password") {
            $(".eyes-close").addClass("active").siblings().removeClass("active");
            $(this).prev("input").attr("type", "text")
        } else {
            $(".eyes-see").addClass("active").siblings().removeClass("active");
            $(this).prev("input").attr("type", "password")
        }
    })




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
    $(document).on("click", ".reg_Agreement>.close,.content_inner>.agree", function () {
        $(".reg_Agreement").hide();
        $("#st-conte1").prop("checked", true);
        $("body").css({
            height: "inherit",
            overflow: "inherit"
        });
    })

}

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


var go_to = {
    login: function () {
        $(".reg_layer").fadeIn();
        $(".reg_layer>.item.login").addClass("active");
    },

}

/**
 * Created by xuxin on 2017/6/23.
 */

var payLayer = {
    pay_layer: function () {
        $(".pay_layer").fadeIn();
        $(document).on("click", ".pay_close,.inner>.pay_sub", function () {
            $(this).parent().removeClass("active");
            $(".pay_layer").fadeOut();
        })
    },
    // 充值弹窗
    recharge_layer: function () {
        this.pay_layer();
        $(".pay_layer>.recharge").addClass("active");
    },
    // 复制弹窗
    recharge_copy: function () {
        this.pay_layer();
        $(".pay_layer>.copy").addClass("active");
    },
    // api弹窗
    recharge_api: function () {
        this.pay_layer();
        $(".pay_layer>.api").addClass("active");
    },
    // 余额不足
    balance_api: function () {
        this.pay_layer();
        $(".pay_layer>.balance").addClass("active");
    }
}

var newLayer = {
    new_layer: function () {
        $(".new_layer").fadeIn();
        $(document).on("click", ".pay_close,.inner>.pay_sub", function () {
            $(this).parent().removeClass("active");
            $(".new_layer").fadeOut();
        })
    },
    // 余额不足
    balance_api: function () {
        this.new_layer();
        $(".new_layer>.balance").addClass("active");
    },
    // 赠送ip1
    send1: function () {
        this.new_layer();
        $(".new_layer>.send1").addClass("active");
    },
    // 赠送ip2
    send2: function () {
        this.new_layer();
        $(".new_layer>.send2").addClass("active");
    }
}




function getKefu() {
    common.ajax_jsonp($('#get_kefu').val(), {}, function (rt) {
        var obj = JSON.parse(rt);
        console.log(obj.ret_data.img)
        $('.kefu-name').html(obj.ret_data.username + '：' + obj.ret_data.phone);
        $('.kefu-qq').html(obj.ret_data.qq);
        $('.kefu-phone').html(obj.ret_data.phone);
        $('.kefu-img').attr('src', obj.ret_data.img + '?v=' + Math.random());
    })
}

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//苹果
function IsSafari() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 1) {
        return 1;
    } //判断是否Safari浏览器

    return 0;

}


function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    //console.log(location.href);
    var theRequest = new Array();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


//============== 竞价部分===============
$(function (){
    var param = GetRequest();
    var expandkey = ''
    if (param.expandkey) {
        expandkey = param.expandkey
    } else if (param['utm-source']) {
        k = param['utm-keyword']
        k = k.replace("?", "")
        expandkey = param['utm-source'] + "-" + k
    }

    if (expandkey != "") {
        console.log(expandkey)
        common.ajax_jsonp($('#index_expandkey').val(), { expandkey: expandkey }, function (rt) {
            var obj = JSON.parse(rt);
        });
    }
})
//============== 竞价部分===============




$(".add-hint").hover(function () {
    $(".modal-intros").show()
}, function () {
    $(".modal-intros").hide()
})

//回到顶部
$(document).on("click", ".stick", function () {
    $('html , body').animate({scrollTop: 0}, 'slow');
})
//右侧客服
$(function () {
    //右侧客服
    $(".right-customer").mouseover(function () {
        $(".left-content").show()
        $(".tst").hide()
        $(".tsts").hide()
    })
    $(".left-content .btn-close").click(function () {
        $(".left-content").hide()
    })
    //公众号
    $(".publicse").hover(function () {
        $(".pubs").show()
        $(".tsts").hide()
        $(".tst").hide()
        $(".left-content").hide()
    }, function () {
        $(".pubs").fadeOut()
    })
    //软件下载
    $(".right-down").mouseover(function () {
        $(".tst").hide()
        $(".tsts").hide()
        $(".left-content").hide()
    })
    //大客户
    $(".vip").mouseover(function () {
        $(".tst").show()
        $(".tsts").hide()
        $(".left-content").hide()
    })
    $(".tst").mouseleave(function () {
        $(".tst").hide()
    })
    //客户定制
    $(".cust").mouseover(function () {
        $(".tsts").show()
        $(".tst").hide()
        $(".left-content").hide()
    })
    $(".tsts").mouseleave(function () {
        $(".tsts").hide()
    });


    // ========免费套餐========
    function get_day_free_package() {
        var url = $("#get_day_free_url").val();
        common.ajax_jsonp(url, {}, function (rt) {

            common.jsonp_tips(rt, function (obj) {
                layer.msg("领取成功")
                $(".ok_free_btn").addClass("did")
                $(".ok_free_btn").removeClass("ok_free_btn")
                $("#get_free_day_package").text("今日已领免费IP")
            }, function (obj) {
                layer.msg(obj.msg)
            })
        })

    }

    $(document).on("click", ".ok_free_btn", function () {
        var rr = check_info_have_pase.to_login();
        if (rr == 1) {
            get_day_free_package();
        }
    });

});
