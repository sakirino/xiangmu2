! function($) {
    let sid = location.search.substring(1).split('=')[1];
    if (!sid) {
        sid = 1;
    }
    $.ajax({
        url: 'http://localhost/JS2112/Project%20JD/php/detail.php',
        data: {
            sid
        },
        dataType: 'json'
    }).then(function(data) {
        // console.log(data);
        $('.mainPic img').attr('src', data.goods_img)
        $('.bigPic img').attr('src', data.goods_img)
        $('.font p').html(data.goods_title)
        $('.price').html(data.goods_price)
        let arrPic = data.goods_smallpic.split(',');
        let str = '';
        $.each(arrPic, function(index, value) {
            str += `
                <li>
                    <img src="${value}"/>
                </li>
            `;
        });
        //放大镜
        $('.smallPic ul').html(str);

        const box = $('.container');
        const Sp = $('.mainPic');
        const Sf = $('#sf');
        const Bp = $('.bigPic img');
        const Bf = $('.bigPic');
        const list = $('.smallPic li');

        Sp.hover(function() {
            Sf.css('visibility', 'visible');
            Bf.css('visibility', 'visible');
            // console.log(Bp.width());
        }, function() {
            Sf.css('visibility', 'hidden');
            Bf.css('visibility', 'hidden');
        });

        Sf.width(Bf.width() * Sp.width() / Bp.width());
        Sf.height(Bf.height() * Sp.height() / Bp.height());

        let Bl = Bp.width() / Sp.width();

        Sp.on('mousemove', function(e) {
            let left = e.pageX - box.offset().left - Sf.width() / 2;
            let top = e.pageY - box.offset().top - Sf.height() / 2;
            if (left < 0) {
                left = 0;
            } else if (left >= Sp.width() - Sf.width()) {
                left = Sp.width() - Sf.width();
            }

            if (top < 0) {
                top = 0;
            } else if (top >= Sp.height() - Sf.height()) {
                top = Sp.height() - Sf.height();
            }
            Sf.css({
                left: left,
                top: top
            });

            Bp.css({
                left: -left * Bl,
                top: -top * Bl
            });
        });

        list.on('click', function() {
            // console.log($(this).index());
            let picUrl = $('.smallPic').find('img').eq($(this).index()).attr('src'); //获取当前点击li里面的图片地址
            Sp.find('img').attr('src', picUrl);
            Bp.attr('src', picUrl);
        });

        //小图幻灯片
        const ul = $('.smallPic ul');
        const pic = $('.smallPic ul li');
        const left = $('.left');
        const right = $('.right');
        const liWidth = pic.eq(0).width();

        ul.width(pic.length * liWidth);
        right.on('click', function() {
            ul.animate({
                left: -312
            }, 200);
            left.removeAttr('disabled')
            right.attr('disabled')
        });
        left.on('click', function() {
            ul.stop(true).animate({
                left: 0
            }, 200);
            left.attr('disabled')
            right.removeAttr('disabled')
        })
    })

    $('.plus').on('click', function() {
        let num = $('.inputs input').val()
        num++;
        $('.inputs input').val(num)
    })
    $('.minus').on('click', function() {
        let num = $('.inputs input').val()
        num--;
        $('.inputs input').val(num)
        if (num < 2) {
            $('.minus').prop('disabled', true)
        }
    })

    $('.cart').find('input').on('input', function() {
        let reg = /^[1-9]\d*$/;
        if (!reg.test($(this).val())) {
            $(this).val(1);
        }
    });
    // console.log(sid);
    let cookie_obj = {}
    let sortFlag = true;
    $('.btn').on('click', function() {
        // alert(1) 
        let value = $('.inputBox input').val()
        if (cookie.get('cookie_goods')) {
            cookie_obj = JSON.parse(cookie.get('cookie_goods'));
            // console.log(cookie_obj);
        }
        if (Object.keys(cookie_obj).includes("id" + sid)) {
            // console.log(1);
            let num1 = +value;
            let num2 = +cookie_obj["id" + sid];
            console.log(num2);
            cookie_obj["id" + sid] = num1 + num2;
        } else {
            // console.log(2);
            let num = +value;
            cookie_obj["id" + sid] = num;
            // console.log(num);
        }
        cookie.set('cookie_goods', JSON.stringify(cookie_obj), 7)
        alert('已成功加入购物车');
    });
}(jQuery);