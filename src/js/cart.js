! function($) {
    let cookie_obj = null;
    if (cookie.get('cookie_goods')) {
        cookie_obj = JSON.parse(cookie.get('cookie_goods'));
    }
    $.ajax({
        url: 'http://localhost/JS2112/Project%20JD/php/cartlist.php',
        dataType: 'json'
    }).then(function(data) {
        $.each(data, function(index, obj) {
            $.each(cookie_obj, function(key, value) {
                // console.log(key.substring(2));
                if (key.substring(2) == obj.id) {
                    let cloneBox = $('.goods:hidden').clone(true, true);
                    cloneBox.attr('num', obj.id)
                    cloneBox.find('.img').find('img').attr('src', obj.goods_img);
                    cloneBox.find('.img').find('a').html(obj.goods_title);
                    cloneBox.find('.price').find('span').html('¥ ' + (obj.goods_price * 1).toFixed(2));
                    cloneBox.find('.quantity').find('input').val(value);
                    cloneBox.find('.sum').find('strong').html('¥ ' + (obj.goods_price * value).toFixed(2));
                    cloneBox.css('display', 'flex');
                    $('.mid').append(cloneBox);
                    calculate()
                }
            });
        });
    });

    $('.checkall').on('click', function() {
        // console.log($(this).attr('length'));
        $('.goods:visible').find('.cb input').prop('checked', $(this).prop('checked'))
        $('.checkall').prop('checked', $(this).prop('checked'))
        calculate()
    })

    $('.mid').on('click', '.cb input', function() {
        let length1 = $('.goods:visible').find('.cb input').length;
        let length2 = $('.goods:visible').find('.cb input:checked').length;
        if (length1 == length2) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }
        calculate()
    })

    $('.mid').on('click', '.q1 .minus', function() {
        let quantity = $(this).next().find('input').val()
        console.log(quantity);
        quantity--;
        $(this).next().find('input').val(quantity)
        $(this).parents('.goods').find('.sum strong').html(sum($(this)))
        if (quantity < 2) {
            $('.minus').prop('disabled', true)
        }
        calculate()
        editCookie($(this))
    })
    $('.mid').on('input', '.q1 input', function() {
        let reg = /^[1-9]\d*$/;
        if (!reg.test($(this).val())) {
            $(this).val(1);
        }
        $(this).parents('.goods').find('.sum strong').html(sum($(this)))
        calculate()
        editCookie($(this))
    })
    $('.mid').on('click', '.q1 .plus', function() {
        let quantity = $(this).prev().find('input').val()
        console.log(quantity);
        quantity++;
        $(this).prev().find('input').val(quantity)
        $(this).parents('.goods').find('.sum strong').html(sum($(this)))
        if (quantity > 1) {
            $('.minus').prop('disabled', false)
        }
        calculate()
        editCookie($(this))
    })

    $('.mid').on('click', '.del a', function() {
        if (window.confirm('欧都桑，你确定要删除吗?')) {
            $(this).parents('.goods').remove();
            delCookie($(this).parents('.goods').attr('num'));
            calculate();
        }
    })

    $('.chooseDel').on('click', function() {
        if (window.confirm('欧都桑，你确定要删除吗?')) {
            $('.goods:visible').each(function(a, b) {
                if ($(b).find('.cb input').prop('checked')) {
                    $(b).remove()
                    delCookie($(b).attr('num'))
                    calculate();
                }
            })
        }
    })

    $('.cartDel').on('click', function() {
        if (window.confirm('欧都桑，你确定要删除吗?')) {
            $('.goods:visible').each(function(a, b) {
                $(b).remove()
                cookie.del('cookie_goods')
                calculate()
            })
        }
    })

    $('.checkout').on('click', function() {
        $('.mask').show()
    })

    $('.close').on('click', function() {
        $('.mask').hide()
    })








    function calculate() {
        let total = 0;
        let totalQuantity = 0;
        $('.goods:visible').each(function(a, b) {
            if ($(b).find('.cb input').prop('checked')) {
                // console.log(1)
                total += parseFloat($(b).find('.sum strong').html().substring(1));
                totalQuantity += parseInt($(b).find('.q1 input').val());
            }
            // console.log($(b).find('.sum strong').html().substring(1));
            // console.log(1);
            $('.total').html('¥ ' + total.toFixed(2));
            $('.chooseNum').html(totalQuantity);
        })
    }

    function sum(goods) {
        let price = goods.parents('.goods').find('.price span').html().substring(1)
        let quantity = goods.parents('.goods').find('.quantity input').val()
        console.log(goods.parents('.goods').find('.price span'));
        console.log(price);
        console.log(quantity);
        console.log(price * quantity);
        return '¥ ' + (price * quantity).toFixed(2)
    }

    function editCookie(obj) {
        let cookie_obj = null;
        if (cookie.get('cookie_goods')) {
            cookie_obj = JSON.parse(cookie.get('cookie_goods'));
        }
        let sid = obj.parents('.goods').attr('num');
        cookie_obj["id" + sid] = obj.parents('.goods').find('.quantity input').val();
        cookie.set('cookie_goods', JSON.stringify(cookie_obj), 7);
    }

    function delCookie(num) {
        let cookie_obj = null;
        if (cookie.get('cookie_goods')) {
            cookie_obj = JSON.parse(cookie.get('cookie_goods'));
        }
        delete cookie_obj["id" + num]
        cookie.set('cookie_goods', JSON.stringify(cookie_obj), 7)
    }
}(jQuery);