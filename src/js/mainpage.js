! function($) {
    $('#ad span').on('click', function() {
        $('#ad').hide()
    })
    $(window).on('scroll', function() {
            let scrollTop = $(this).scrollTop();
            if (scrollTop >= 750) {
                $('.Search').addClass('scroll')
                $('.logoA').show()
            } else {
                $('.Search').removeClass('scroll')
                $('.logoA').hide()
            }
        })
        //二级菜单
    $('.menu li').hover(function() {
        $(this).addClass('active').siblings('li').removeClass('active');
        $('.cartlist').show();
        $('.item').eq($(this).index()).show().siblings('.item').hide();
    }, function() {
        $('.cartlist').hide();
    });

    $('.cartlist').hover(function() {
        $(this).show();
    }, function() {
        $(this).hide();
    })

    const banner = $('.carousel');
    const picList = $('.carousel ul li');
    const btnList = $('.carousel ol li');
    const leftArrow = $('.carousel .left');
    const rightArrow = $('.carousel .right');
    let index = 0;
    let timer = null;

    btnList.on('click', function() {
        index = $(this).index();
        tabSwitch();
    });

    banner.hover(function() {

        clearInterval(timer);
    }, function() {
        timer = setInterval(() => {
            rightArrow.click();
        }, 3000);
    });

    rightArrow.on('click', function() {
        index++;
        if (index > btnList.length - 1) {
            index = 0;
        }
        tabSwitch();
    });

    leftArrow.on('click', function() {
        index--;
        if (index < 0) {
            index = btnList.length - 1;
        }
        tabSwitch();
    });

    function tabSwitch() {
        btnList.eq(index).addClass('active').siblings('li').removeClass('active');
        picList.eq(index).stop(true).animate({ opacity: 1 }).siblings('li').stop(true).animate({ opacity: 0 });
    }

    timer = setInterval(() => {
        rightArrow.click();
    }, 3000);
    //幻灯片
    const ul = $('.ppt ul');
    const pic = $('.ppt ul li');
    const left = $('.ppt .left');
    const right = $('.ppt .right');
    const liWidth = pic.eq(0).width();
    console.log(liWidth);
    let timer1 = null
    let index1 = 0
    ul.width(pic.length * liWidth);
    right.on('click', function() {
        index1++;
        // console.log(index1);
        Switch()
    });
    left.on('click', function() {
        index1--;
        Switch()

    })
    timer1 = setInterval(() => {
        right.click();
    }, 3000);

    function Switch() {
        if (index1 > 3) {
            ul.css('left', 0);
            index1 = 1
        }
        if (index1 < 0) {
            ul.css('left', -liWidth * pic.length);
            index1 = 2;
        }
        console.log(2);
        ul.stop(true).animate({
            left: -liWidth * index1
        }, 300)
    }
    //楼梯效果
    function scroll() {
        let scrollTop1 = $(this).scrollTop();
        if (scrollTop1 >= 700) {
            $('.elevator').addClass('elevatorOn')
        } else {
            $('.elevator').removeClass('elevatorOn')
        }
        $('.floor').each(function(index, element) {
            let floorTop = $(element).offset().top;
            if (floorTop >= scrollTop1) {
                $('.elevator li a').removeClass('active');
                $('.elevator li a').eq(index).addClass('active');
                return false;
            }
        });
    }

    scroll();
    $(window).on('scroll', function() {
        scroll();
    });
    $('.elevator li').not('.last').on('click', function() {
        $(window).off('scroll');
        $(this).addClass('active').siblings('li').removeClass('active');
        let top = $('.floor').eq($(this).index()).offset().top;
        $('html').animate({
            scrollTop: top
        }, function() {
            $(window).on('scroll', function() {
                scroll();
            });
        });
    });
    //顶部跳转
    $('.last').on('click', function() {
        $('html').animate({
            scrollTop: 0
        });
    })

}(jQuery);