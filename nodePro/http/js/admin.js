$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
})
var arr = [];
var page = 1;
var count = 5;
var id;
var t;
var uData = JSON.parse(localStorage.getItem('uData'));
getUser();
function getUser() {
    $.ajax({
        url: '/admin/get',
        success: function (res) {
            if (res.error == 2) {
                window.location = '/pages/land.html'
            }
            if (res.data.length) {
                arr = res.data;
                createPage();
                getCon();
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
function getCon() {
    $('tbody').html('')
    $.each(arr.slice((page - 1) * count, page * count), function (i, v) {
        $('tbody').append('<tr data-pass="' + v.a_password + '">\
                        <td>'+ v.a_id + '</td>\
                        <td>'+ v.a_name + '</td>\
                        <td>'+ v.a_username + '</td>\
                        <td>'+ (v.a_type == 1 ? "普通管理员" : "超级管理员") + '</td>\
                        <td><button class="a1 js-del" data-toggle="modal" data-target="#myModal">删除</button>\
                        <button class="a1 js-edit" data-toggle="modal" data-target="#myModal1">修改</button>\
                        </tr>')
    });
    if (uData.a_type == 1) {
        $('.js-del').css('display', 'none');
    }
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
console.log($('.j-type').val());
$('.j-add-btn').on('click', function () {
    if (uData.a_type == 2) {
        $.ajax({
            url: '/admin/add',
            data: {
                name: $('.j-name').val(),
                password: $('.j-password').val(),
                type: $('.j-type').val() == '普通管理员' ? '1' : '2',
                username: $('.j-userId').val(),
            },
            type: 'post',
            success: function (res) {
                if (res.error == 0) {
                    $('#exampleModal').modal('hide')
                    getUser();
                    $('.j-name').val('');
                    $('.j-password').val('');
                    $('.j-type').val('');
                    $('.j-userId').val('');
                }
            }
        })
    } else {
        alert('你没有权限执行此操作！')
    }
})
$('.j-remove-btn').on('click', function () {
    if (uData.a_type == 2) {
        $.ajax({
            url: '/admin/del',
            data: {
                id: id
            },
            type: 'post',
            success: function (res) {
                console.log(res);
                if (res.error == 0) {
                    $('#myModal').modal('hide')
                    getUser();
                }
            }
        })
    } else {
        alert('你没有权限执行此操作！')
    }
});
$('#myModal').on('show.bs.modal', function (e) {
    id = $(e.relatedTarget).parents('tr').children().first().text();
})
$('#myModal1').on('show.bs.modal', function (e) {
    t = $(e.relatedTarget).parents('tr').children();
    $('.j-edit-id').val(t.first().text());
    $('.j-edit-name').val(t.eq(1).text());
    $('.j-edit-userId').val(t.eq(2).text());
    $('.j-edit-password').val(t.parents('tr').attr('data-pass'));
    $('.j-edit-type').val(t.eq(3).text());
})
$('tbody').on('click', '.js-edit', function () {
    console.log();
    if (uData.a_type == 1) {
        if (!($(event.target).parents('tr').children().first().text() == uData.a_id)) {
            alert('你没有权限执行此操作！');
            location.reload();
        }
    }
})
$('.j-edit-btn').on('click', function () {
    if (uData.a_type == 2) {
        $.ajax({
            url: '/admin/edit',
            data: {
                id: $('.j-edit-id').val(),
                name: $('.j-edit-name').val(),
                password: $('.j-edit-password').val(),
                type: $('.j-edit-type').val() == '普通管理员' ? 1 : 2
            },
            type: 'post',
            success: function (res) {
                if (res.error == 0) {
                    $('#myModal1').modal('hide');
                    getUser();
                }
            }
        })
    } else if (t.first().text() == uData.a_id) {
        $.ajax({
            url: '/admin/edit',
            data: {
                id: $('.j-edit-id').val(),
                name: $('.j-edit-name').val(),
                password: $('.j-edit-password').val(),
                type: $('.j-edit-type').val() == '普通管理员' ? 1 : 2
            },
            type: 'post',
            success: function (res) {
                if (res.error == 0) {
                    $('#myModal1').modal('hide');
                    getUser();
                }
            }
        })
    } else {
        alert('你没有权限执行此操作！')
    }
})
$('.j-admName').on('click', function () {
    $(this).css('background', '#4985fb')
})

$('#searchButton').on('click', function () {
    if ($('.j-search').val()) {
        $.ajax({
            url: '/admin/search',
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
                            $('tbody').append('<tr data-pass="' + v.a_password + '">\
                                            <td>'+ v.a_id + '</td>\
                                            <td>'+ v.a_name + '</td>\
                                            <td>'+ v.a_username + '</td>\
                                            <td>'+ (v.a_type == 1 ? "普通管理员" : "超级管理员") + '</td>\
                                            <td><button class="a1 js-del" data-toggle="modal" data-target="#myModal">删除</button>\
                                            <button class="a1 js-edit" data-toggle="modal" data-target="#myModal1">修改</button>\
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