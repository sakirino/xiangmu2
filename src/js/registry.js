! function($) {
    let telephoneFlag = false;
    let usernameFlag = false;
    let passFlag = false;
    let repassFlag = false;
    $('.reg').find('input').attr('disabled', 'true')

    $('.telRight').find('input').on('focus', function() {
        $('.telRight').addClass('focus')
        $('.telBox').find('span').html('验证完成后，你可以使用该手机登录或找回密码').css('color', '#ccc')
    });

    $('.telRight').find('input').on('blur', function() {
        $('.telRight').removeClass('focus')
        if ($(this).val() !== '') {
            let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
            if (reg.test($(this).val())) {
                telephoneFlag = true;
                if (telephoneFlag) {
                    $.ajax({
                        method: 'post',
                        url: 'http://localhost/JS2112/Project%20JD/php/reg.php',
                        data: {
                            tel: $('.telRight').find('input').val()
                        }
                    }).then(function(d) {
                        if (d === 'true') {
                            $('.telBox').find('span').html('手机号已被注册').css('color', 'red')
                            $('.telRight').find('.telIcon').hide()
                            telephoneFlag = false;
                        } else {
                            $('.telRight').find('.telIcon').show()
                            $('.telBox').find('span').html('')
                            telephoneFlag = true;
                        }
                    });
                }
            } else {
                $('.telBox').find('span').html('格式错误').css('color', 'orange')
                telephoneFlag = false;

            }
        } else {
            $('.telBox').find('span').html('')
            telephoneFlag = false;

        }
        check();
    });

    $('.codeBtn').on('click', function() {
        if ($('.telRight').find('input').val() !== '') {
            if (telephoneFlag) {
                time()
            }

        } else {
            $('.telBox').find('span').html('请输入手机号').css('color', 'orange')
        }

    });

    $('.codeRight').find('a').on('click', function() {
        $('.codeRight').find('a').hide()
        time()
    })

    $('.nextStep').on('click', function() {
        if ($('.codeLeft').find('input').val() !== '') {
            if ($('.codeLeft').find('input').val().length === 5) {
                $('.step1').hide()
                $('.step2').show()
                $('.jdt').find('.circle').eq(0).html('')
                $('.jdt').find('.circle').eq(0).addClass('circleDone')
                $('.jdt').find('.line').eq(0).addClass('lineDone')
                $('.jdt').find('.circle').eq(1).addClass('circleOn-ready')
                $('.jdt').find('.pass-box').eq(1).find('p').css('color', 'green')
                $('.jdt').find('.pass-box').eq(1).find('div').css('color', '#fff')

            } else {
                $('.codeBox').find('span').html('验证码错误').css('color', 'red')
            }
        } else {
            $('.codeBox').find('span').html('请输入验证码').css('color', 'orange')
        }

    });

    $('.regBox').find('input').each(function(index, element) {
        $(element).on('focus', function() {
            if ($(this).val() == '') {
                // console.log($(this));
                if (index == 0) {
                    $('.regBox').find('span').eq(index).html('支持中文、英文、数字、“-”、“_”的组合，4-20个字符')
                } else if (index == 1) {
                    $('.regBox').find('span').eq(index).html('建议使用字母、数字和符号两种及以上的组合，8-20个字符')
                } else if (index == 2) {
                    $('.regBox').find('span').eq(index).html('请再次输入密码')
                }
            }
        })
    });

    $('.regBox').find('input').each(function(index, element) {
        $(element).on('blur', function() {
            if (index == 0) { //用户名
                if ($('.regBox').find('input').eq(index).val() !== '') {
                    let reg = /^[\w-]{4,20}$/
                    if (reg.test($(this).val())) {
                        $.ajax({
                            method: 'post',
                            url: 'http://localhost/JS2112/Project%20JD/php/reg.php',
                            data: {
                                username: $('.regBox').find('input').eq(0).val()
                            }
                        }).then(function(d) {
                            if (d === 'true') {
                                $('.regBox').find('span').eq(index).html('用户名已被注册').css('color', 'red')
                                $('.regBox').find('.regIcon').eq(index).hide()
                                usernameFlag = false;
                            } else {
                                $('.regBox').find('.regIcon').eq(index).show()
                                $('.regBox').find('span').eq(index).html('')
                                usernameFlag = true;
                            }
                        });
                    } else {
                        $('.regBox').find('span').eq(index).html('格式错误').css('color', 'orange')
                        $('.regBox').find('.regIcon').eq(index).hide()
                        console.log($(this).val());
                        usernameFlag = false;
                    }
                } else { //用户名为空
                    $('.regBox').find('span').eq(index).html('')
                    $('.regBox').find('.regIcon').eq(index).hide()
                    usernameFlag = false;
                }
            } else if (index == 1) { //密码验证
                if ($('.regBox').find('input').eq(index).val() !== '') {

                } else {
                    $('.regBox').find('span').eq(index).html('').css('color', '#000')
                    $('.regBox').find('.regIcon').eq(1).hide()
                    passFlag = false;
                }

            } else if (index == 2) {
                if ($('.regBox').find('input').eq(2).val() !== '') {
                    // console.log($(this).val());
                    if ($('.regBox').find('input').eq(1).val() === $('.regBox').find('input').eq(2).val()) {
                        $('.regBox').find('.regIcon').eq(2).show()
                        $('.regBox').find('span').eq(2).html('').css('color', '#000')
                        repassFlag = true;

                    } else {
                        $('.regBox').find('span').eq(2).html('您两次输入的密码不同，请重试').css('color', 'orange')
                        $('.regBox').find('.regIcon').eq(2).hide()
                        repassFlag = false;
                    }
                } else {
                    $('.regBox').find('span').eq(2).html('').css('color', '#000')
                    $('.regBox').find('.regIcon').eq(2).hide()
                    repassFlag = false;
                }
            }
            check();
        })
    });

    $('.regBox').find('input').eq(1).on('input', function() {
        if ($(this).val().length >= 8) {
            let reg1 = /\d+/; //匹配数字
            let reg2 = /[a-zA-Z]+/; //匹配大小写字母
            let reg3 = /[^a-zA-Z0-9]+/; //匹配特殊符号
            let count = 0;
            if (reg1.test($(this).val())) {
                count++;
            }

            if (reg2.test($(this).val())) {
                count++;
            }

            if (reg3.test($(this).val())) {
                count++;
            }

            switch (count) {
                case 1:
                    $('.regBox').find('span').eq(1).html('弱 有被盗风险,建议使用字母、数字和符号两种及以上组合').css('color', 'red')
                    $('.regBox').find('.regIcon').eq(1).hide()
                    passFlag = false;
                    break;
                case 2:
                    $('.regBox').find('span').eq(1).html('中 安全强度适中，可以使用三种以上的组合来提高安全强度').css('color', 'orange')
                    $('.regBox').find('.regIcon').eq(1).show()
                    passFlag = true;
                    break;
                case 3:
                    $('.regBox').find('span').eq(1).html('强 你的密码很安全').css('color', 'green')
                    passFlag = true;
                    break;
            }
        } else {
            $('.regBox').find('span').eq(1).html('建议使用字母、数字和符号两种及以上的组合，8-20个字符').css('color', 'orange')
            $('.regBox').find('.regIcon').eq(1).hide()
            passFlag = false;
        }
        check()
    });

    function check() {
        if (usernameFlag && telephoneFlag && passFlag && repassFlag) {
            $('.submitBtn').removeAttr('disabled');
        } else {
            $('.submitBtn').attr('disabled', 'true')
        }
    }

    function time() {
        let i = 121;
        let a = setInterval(function() { //每隔1s执行一次定时器内部的函数  a:定时器的返回值
            i--;
            $('.codeBtn').hide()
            $('.codeBox').show()
            $('.codeRight').find('p').html(i + '秒后重新获取')
            if (i <= 0) {
                clearInterval(a)
                $('.codeRight').find('p').html('')
                $('.codeRight').find('a').css('display', 'block')
            }
        }, 1000);
    }

}(jQuery);