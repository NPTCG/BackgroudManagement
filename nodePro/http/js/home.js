var arr = [];
var page = 1;
var count = 5;
var uData;
$.ajax({
    url: '/home/get',
    success: function (res) {
        if (res.error == 2) {
            window.location = '/pages/land.html'
        }
        if (res.data.length) {
            arr = res.data;
            createPage();
            getCon();
            uData = JSON.parse(localStorage.getItem('uData'));
            if (uData.a_type) {
                $('.j-admName').html(uData.a_name)
            } else {
                $('.j-none-li').css('display', 'none');
                $('.j-admName').html(uData.s_name)
            }
        }
    }
})
$('.j-esc').on('click', function () {
    localStorage.removeItem('uData');
    var uData = null;
    $.ajax({
        url: '/esc',
        success: function (res) {
            console.log(res);
        }
    })
    window.location.href = 'land.html'
})
function getCon() {
    $('.j-notice').html('')
    $.each(arr.slice((page - 1) * count, page * count), function (i, v) {
        $('.j-notice').append('<tr>\
                            <td>\
                                <p class="p1">'+ v.n_title + '</p>\
                                <p class="p2">'+ v.n_con + '</p>\
                            </td>\
                            <td>\
                                <p class="text-right p2">'+ v.n_time + '</p>\
                            </td>\
                        </tr>')
    })
}
function createPage() {
    var n = Math.ceil(arr.length / count);
    for (var i = 1; i <= n; i++) {
        $('.j-last').before('<li class="j-li"><a href="javascript:;">' + i + '</a></li>')

    }
}
$('.j-page').on('click', '.j-li', function () {
    page = $(this).text();
    getCon();
})
$('.j-forword').on('click', function () {
    if (page > 0 && page < Math.ceil(arr.length / count)) {
        page++;
        getCon();
    }
})
$('.j-back').on('click', function () {
    if (page > 1 && page <= Math.ceil(arr.length / count)) {
        page--;
        getCon();
    }
})
$('.j-admName').on('click', function () {
    $(this).css('background', '#4985fb')
})