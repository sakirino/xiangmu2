! function($) {
    $.ajax({
        url: 'http://localhost/JS2112/Project%20JD/php/list.php',
        dataType: 'json'
    }).then(function(data) {
        a(data);
        page()
        let sortFlag = true;
        $('.btn').eq(0).on('click', function() {
            if (sortFlag) {
                sortFlag = false;
                page('asc')
                $.ajax({
                    url: 'http://localhost/JS2112/projectname/php/list.php',
                    dataType: 'json',
                    data: {
                        page: 1,
                        sort: 'asc'
                    }
                }).then(function(data) {
                    a(data)
                })
            } else {
                sortFlag = true;
                page('desc')
                $.ajax({
                    url: 'http://localhost/JS2112/projectname/php/list.php',
                    dataType: 'json',
                    data: {
                        page: 1,
                        sort: 'desc'
                    }
                }).then(function(data) {
                    a(data)
                })
            }

        });
        //函数封装
        function page(b) {
            $('.page').pagination({
                pageCount: data.pagesize,
                jump: true,
                coping: true,
                homePage: '首页',
                endPage: '末页',
                prevContent: '上页',
                nextContent: '下页',
                callback: function(api) {
                    $.ajax({
                        method: 'get',
                        url: 'http://localhost/JS2112/projectname/php/list.php',
                        data: {
                            page: api.getCurrent(),
                            sort: b
                        },
                        dataType: 'json'
                    }).then(function(data) {
                        a(data);
                    });
                }
            });
        }
    });

    function a(data) {
        let str = ''
        let arr = data.pagecontent
        $.each(arr, function(a, b) {
            str += `
                <li>
                <div>
                    <a href="JD detail.html?sid=${b.id}">
                        <img class="lazy" data-original="${b.goods_img}"/>
                    </a>
                </div>
                <div>
                    <a href="JD detail.html?sid=${b.id}">
                        <p>${b.goods_title}</p>
                    </a>
                </div>
                <span>¥${b.goods_price}</span>
                </li>
            `;
        })
        $('.list ul').html(str)
        $('.list').find('img').on('click', function() {
            // console.log(1);
        })
        $("img.lazy").lazyload({
            effect: "fadeIn"
        });
    }




}(jQuery);