$(function () {

    //切换
    $(".advantage .tabs ul li").hover(function(){//鼠标移入
            var left = $(this).position().left;
            var width = $(this).width();
            // console.info("left:"+left+"width:"+width);
            $(".bottomLine").css({opacity:1})
            $(".bottomLine").stop().animate({
                left:left,
                width:width
            },300);
        },
        function(){//鼠标移出
            $(".bottomLine").css({opacity:0})
        });
    $(".advantage .tabs ul li").hover(function(){
        $(".advantage .tabs ul li").removeClass("active");
        $(this).addClass("active");
        var index =  $(this).index();
        $('.tabs-cont').hide();
        $('.tabs-cont').eq(index).show();
    });


    //切换
    $(".article .tabs ul li").hover(function(){//鼠标移入
            var left = $(this).position().left;
            var width = $(this).width();
            // console.info("left:"+left+"width:"+width);
            $(".bottomLine").css({opacity:1})
            $(".bottomLine").stop().animate({
                left:left,
                width:width
            },300);
        },
        function(){//鼠标移出
            $(".bottomLine").css({opacity:0})
        });
    $(".article .tabs ul li").click(function(){
        $(".article .tabs ul li").removeClass("active");
        $(this).addClass("active");
        var index =  $(this).index();
        $('.cons>.tabs-cont').eq(index).show().siblings().hide();
    });


    /*轮播*/
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay:true,
        speed:1000,
        pagination: { //点
            el: '.swiper-pagination',
            clickable: false,
        },
    });
});