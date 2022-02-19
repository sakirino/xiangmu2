! function($) {
    $('.submitBtn').find('a').on('click', function() {
        let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (reg.test($('.loginInput').eq(0).find('input').val())) {
            console.log(1);
            $.ajax({
                method: 'post',
                url: 'http://localhost/JS2112/Project%20JD/php/login.php',
                data: {
                    tel: $('.loginInput').eq(0).find('input').val(),
                    pass: $('.loginInput').eq(1).find('input').val()
                }
            }).then(function(d) {
                if (d === '1') {
                    location.href = "JD%20mainPage.html";
                } else if (d === '2') {
                    $('.loginMessage').css('opacity', '1').css('color', 'red')
                }
            })
        } else {
            console.log(2);
            $.ajax({
                method: 'post',
                url: 'http://localhost/JS2112/Project%20JD/php/login.php',
                data: {
                    user: $('.loginInput').eq(0).find('input').val(),
                    pass: $('.loginInput').eq(1).find('input').val()
                }
            }).then(function(d) {
                if (d === '1') {
                    location.href = "JD%20mainPage.html";
                } else if (d === '2') {
                    $('.loginMessage').css('opacity', '1').css('color', 'red')
                }
            })
        }
    });
    $('.scanBtn a').on('click', function() {
        $('.scanBtn a').addClass('active')
        $('.userBtn a').removeClass('active')
        $('.QRcode').show()
        $('.loginPage').hide()
    })
    $('.userBtn a').on('click', function() {
        $('.scanBtn a').removeClass('active')
        $('.userBtn a').addClass('active')
        $('.QRcode').hide()
        $('.loginPage').show()
    })
}(jQuery);