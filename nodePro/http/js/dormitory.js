$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
})
var arr = [];
var page = 1;
var count = 5;
var t;
var s;
var uData;
var id;
getUser();
function getUser() {
    $.ajax({
        url: '/dorm/get',
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
                    window.location.href = 'home.html'
                }
            }
        }
    })
};
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
$('.j-esc').on('click', function () {
    localStorage.removeItem('uData');
    var uData = null;
    window.location.href = 'land.html'
})
function getCon() {
    $('tbody').html('')
    $.each(arr.slice((page - 1) * count, page * count), function (i, v) {
        $('tbody').append(
            '<tr data-id="' + v.d_id + '">\
                <td>'+ v.d_dormId + '</td>\
                <td>'+ v.d_name + '</td>\
                <td>'+ v.d_num + '</td>\
                <td>'+ v.d_balance + '</td>\
                <td>'+ (v.d_state == 1 ? '正常' : '催款中') + '</td>\
                <td><button class="" type="button" data-toggle="modal" data-target="#myModal1">删除</button>\
                    <button class="" type="button" data-toggle="modal" data-target="#myModal2">修改</button>\
                    <button class="" type="button" data-toggle="modal" data-target="#myModal3">'+ ((v.d_state == 1) ? '发起催款' : '正在催款') + '</button>\
                </td >\
            </tr >\
        ')
    })
}

function createPage() {
    $('.j-page .j-li').remove();
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
$('.j-add-btn').on('click', function () {
    $.ajax({
        url: '/dorm/add',
        data: {
            balance: $('.j-add-balance').val(),
            dormId: $('.j-add-dormId').val(),
            name: $('.j-add-dormName').val(),
        },
        type: 'post',
        success: function (res) {
            console.log(res);
            if (res.error == 0) {
                console.log(1);
                $('#exampleModal1').modal('hide')
                getUser();
                $('.j-add-balance').val('');
                $('.j-add-dormId').val('');
                $('.j-add-dormName').val('');
            }
        }
    })
})
$('.j-remove-btn').on('click', function () {
    $.ajax({
        url: '/dorm/del',
        data: {
            id: id
        },
        type: 'post',
        success: function (res) {
            console.log(res);
            if (res.error == 0) {
                $('#myModal1').modal('hide')
                getUser();
            }
        }
    })
});
$('#myModal1').on('show.bs.modal', function (e) {
    id = $(e.relatedTarget).parents('tr').attr('data-id');
})
$('#myModal2').on('show.bs.modal', function (e) {
    t = $(e.relatedTarget).parents('tr').children();
    $('.j-edit-dormId').val(t.first().text());
    $('.j-edit-dormName').val(t.eq(1).text());
    $('.j-edit-num').val(t.eq(2).text());
    $('.j-edit-balance').val(t.eq(3).text());
    id = $(e.relatedTarget).parents('tr').attr('data-id');
})
$('.j-edit-btn').on('click', function () {
    $.ajax({
        url: '/dorm/edit',
        data: {
            balance: $('.j-edit-balance').val(),
            dormId: $('.j-edit-dormId').val(),
            name: $('.j-edit-dormName').val(),
            id: id,
            num: $('.j-edit-num').val()
        },
        type: 'post',
        success: function (res) {
            if (res.error == 0) {
                $('#myModal2').modal('hide');
                getUser();
            }
        }
    })
})

$('#myModal3').on('show.bs.modal', function (e) {
    id = $(e.relatedTarget).parents('tr').attr('data-id');
})
$('#myModal3').on('show.bs.modal', function (e) {
    s = $(e.relatedTarget).parents('tr').children();
})
$('.j-apply-btn').on('click', function () {
    $.ajax({
        url: '/dorm/dept',
        data: {
            id: id,
            type: ((s.eq(4).text() == '正常') ? 1 : 2) == 1 ? 2 : 1,
        },
        type: 'post',
        success: function (res) {
            if (res.error == 0) {
                $('#myModal3').modal('hide');
                getUser();
            }
        }
    })
})
$('#myModal3').on('show.bs.modal', function (e) {
    id = $(e.relatedTarget).parents('tr').attr('data-id');
})
$('.j-admName').on('click', function () {
    $(this).css('background', '#4985fb')
})
$('#searchButton').on('click', function () {
    if ($('.j-search').val()) {
        $.ajax({
            url: '/dorm/search',
            data: {
                name: $('.j-search').val()
            },
            type: 'post',
            success: function (res) {
                if (res.error == 0) {
                    if (res.data.length) {
                        arr = res.data;
                        createPage();
                        $('tbody').html('')
                        $.each(arr.slice((page - 1) * count, page * count), function (i, v) {
                            $('tbody').append(
                                '<tr data-id="' + v.d_id + '">\
                                    <td>'+ v.d_id + '</td>\
                                    <td>'+ v.d_name + '</td>\
                                    <td>'+ v.d_num + '</td>\
                                    <td>'+ v.d_balance + '</td>\
                                    <td>'+ (v.d_state == 1 ? '正常' : '催款中') + '</td>\
                                    <td><button class="" type="button" data-toggle="modal" data-target="#myModal1">删除</button>\
                                        <button class="" type="button" data-toggle="modal" data-target="#myModal2">修改</button>\
                                        <button class="" type="button" data-toggle="modal" data-target="#myModal3">'+ ((v.d_state == 1) ? '发起催款' : '正在催款') + '</button>\
                                    </td >\
                                </tr >\
                            ')
                        })
                    }

                }
            }
        })
    } else {
        getUser()
    }
})