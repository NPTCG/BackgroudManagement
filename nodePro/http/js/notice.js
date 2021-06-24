var arr = [];
var page = 1;
var count = 5;
var n;
var id;
var d;
var uData = JSON.parse(localStorage.getItem('uData'));;
function getUser() {
    $.ajax({
        url: '/notice/get',
        success: function (res) {
            if (res.error == 2) {
                window.location = '/pages/land.html'
            }
            if (res.error == 0) {
                arr = res.data;
                console.log(res);
                getCon();
                createPage();
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
getUser();
function getCon() {
    $('tbody').html('');
    $.each(arr.slice((page - 1) * count, page * count), function (i, v) {
        $('tbody').append('<tr data-id="' + v.n_id + '">\
                            <td>'+ v.n_id + '</td>\
                            <td>'+ v.n_title + '</td>\
                            <td>'+ v.n_con + '</td>\
                            <td>'+ v.n_time + '</td>\
                            <td>'+ v.a_name + '</td>\
                            <td><button class="" type="button" data-toggle="modal" data-target="#myModal1">删除</button>\
                                <button class="" type="button" data-toggle="modal" data-target="#myModal2">修改</button>\
                            </td>\
                        </tr>')
    })
}
function createPage() {
    $('.j-li').remove();
    n = Math.ceil(arr.length / count)
    for (var i = 1; i <= n; i++) {
        $('.j-last').before('<li class= "j-li"><a href="javascript:;">' + i + '</a></li>')
    }
}
$('.j-page').on('click', '.j-li', function () {
    page = $(this).text();
    getUser();
})
$('.j-back').on('click', function () {
    if (page > 1 && page <= n) {
        page--;
        getUser()
    }
})
$('.j-forword').on('click', function () {
    if (page > 0 && page < n) {
        page++;
        getUser()
    }
})
$('.j-add-btn').on('click', function () {
    $.ajax({
        url: '/notice/add',
        data: {
            con: $('.j-add-content').val(),
            title: $('.j-add-title').val(),
            adminId: uData.a_id,
        },
        type: 'post',
        success: function (res) {
            if (res.error == 0) {
                $('#exampleModal1').modal('hide');
                getUser();
                $('.j-add-content').val('');
                $('.j-add-title').val('')
            }
        }
    })
})
$('#myModal1').on('show.bs.modal', function (e) {
    id = $(e.relatedTarget).parents('tr').attr('data-id');
});
$('.j-remove-btn').on('click', function () {
    $.ajax({
        url: '/notice/del',
        data: {
            id: id
        },
        type: 'post',
        success: function (res) {
            if (res.error == 0) {
                $('#myModal1').modal('hide');
                getUser();
            }
        }
    })
})
$('#myModal2').on('show.bs.modal', function (e) {
    d = $(e.relatedTarget).parents('tr').children();
    $('.j-edit-userId').val(d.eq(0).text());
    $('.j-edit-title').val(d.eq(1).text());
    $('.j-edit-content').val(d.eq(2).text());
    $('.j-edit-mytime').val(d.eq(3).text());
    $('.j-edit-name').val(d.eq(4).text());
    id = $(e.relatedTarget).parents('tr').attr('data-id');
});
$('.j-edit-btn').on('click', function () {
    $.ajax({
        url: '/notice/edit',
        data: {
            con: $('.j-edit-content').val(),
            title: $('.j-edit-title').val(),
            id: id
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
$('.j-admName').on('click', function () {
    $(this).css('background', '#4985fb')
})

$('#searchButton').on('click', function () {
    if ($('.j-search').val()) {
        $.ajax({
            url: '/notice/search',
            data: {
                title: $('.j-search').val()
            },
            type: 'post',
            success: function (res) {
                if (res.error == 0) {
                    if (res.data.length) {
                        arr = res.data;
                        createPage();
                        $('tbody').html('')
                        $.each(arr.slice((page - 1) * count, page * count), function (i, v) {
                            $('tbody').append('<tr data-id="' + v.n_id + '">\
                            <td>'+ v.n_id + '</td>\
                            <td>'+ v.n_title + '</td>\
                            <td>'+ v.n_con + '</td>\
                            <td>'+ v.n_time + '</td>\
                            <td>'+ v.a_name + '</td>\
                            <td><button class="" type="button" data-toggle="modal" data-target="#myModal1">删除</button>\
                                <button class="" type="button" data-toggle="modal" data-target="#myModal2">修改</button>\
                            </td>\
                        </tr>')
                        })
                    }

                }
            }
        })
    } else {
        getUser()
    }
})