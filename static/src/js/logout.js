$(function () {
    var func = {
        logout: function () {
            var url = $("#logout_url").val();
            common.ajax_jsonp(url, '', function () {
                $.removeCookie('session_id');
                $.removeCookie('uid');
                location.href = "/";
            });
        },
    }

    /**
     * 关闭窗口
     * @param index
     */
    function close(index) {
        index.removeClass("active");
        setTimeout(function () {
            index.hide();
        }, 300);
    }

    /**
     * 退出
     */
    $(".logout-link").on('click', function () {
        func.logout();
    })

});