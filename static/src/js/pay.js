$(function () {
    //套餐类型切换
    $('.meal-tab .options').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.meal-box').hide()
        if($(this).index()==1){
            $('.meal-box').eq(1).show()
            $('.meal-box3').hide()
 
        }else if ($(this).index()==2) {
            $('.meal-box3').show()
            // $('.meal-box3').find(".meal-cart3").eq(2).addClass("active")
        }else {
            $('.meal-box').eq(0).show()
            $('.meal-box3').hide()

            // $('.meal-box').eq(0).find(".meal-cart").eq(3).addClass("active")
        }
    })
    //套餐切换
    $('.meal-box .meal-cart').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        // $('.meal-box').find(".meal-cart").eq(2).addClass("active")
    })

      //套餐切换
      $('.meal-box3 .meal-cart3').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        // $('.meal-box3').find(".meal-cart3").eq(2).addClass("active")
    })

    //套餐切换
    $('.meal-box .meal-cart2').click(function () {
        console.log($(this).index());
        $(this).addClass('active').siblings().removeClass('active');
    })


    $(".area-box .area").hover(function () {
        $(this).addClass("add-color")
    }, function () {
        console.log($(".ip_num").val())
        if ($(this).find(".ip_num").val() == 0) {
            $(this).removeClass("add-color")
        } else {
            $(this).addClass("reduce-color")
        }

    })
});