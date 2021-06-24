var arr = [];
var dorArr = [];
var page = 1;
var page1 = 1;
var count = 5;
var count1 = 5;
var n;
var dorId;
var id;
var oldDormId;
var d;
var uData = JSON.parse(localStorage.getItem('uData'));
var innerPage = 1;
var innerCount = 5;
function getUser() {
    $.ajax({
        url: '/student/get',
        success: function (res) {
            if (res.error == 2) {
                window.location = '/pages/land.html'
            }
            if (res.error == 0) {
                arr = res.data;
                getCon();
                creatPage()
                if (uData.a_type) {
                    $('.j-admName').html(uData.a_name)
                    $('.j-pay-up').css('display', 'none');
                } else {
                    $('.j-none-li').css('display', 'none');
                    $('.j-admName').html(uData.s_name)
                    $('.js-del').css('display', 'none');
                    $('.js-edit').css('display', 'none');
                }
            }
        }
    })
    $.ajax({
        url: '/dorm/get',
        success: function (res) {
            if (res.error == 0) {
                dorArr = res.data;
                $('.j-add-stuDormId').html('');
                $('.j-edit-stuDormId').html('');
                $.each(dorArr, function (i, v) {
                    $('.j-add-stuDormId').append('<option class="j-add-dorId" value="' + v.d_id + '">' + v.d_name + '</option>');
                    $('.j-edit-stuDormId').append('<option class="j-edit-dorId" value="' + v.d_id + '">' + v.d_name + '</option>')
                })
            }
        }
    })
};
getUser();
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
    $('tbody').html('');
    $.each(arr.slice((page - 1) * count, page * count), function (i, v) {
        console.log(v);
        $('tbody').append('<tr data-stuPas="' + v.s_password + '" data-id="' + v.s_id + '" data-oldId="' + v.d_id + '">\
                            <td>'+ v.s_studentId + '</td>\
                            <td>'+ v.s_name + '</td>\
                            <td>'+ v.s_username + '</td>\
                            <td>'+ v.d_name + '</td>\
                            <td>'+ v.d_balance + '</td>\
                            <td>'+ ((v.d_state == 1) ? '正常' : '催费中') + '</td>\
                            <td><button class="js-del" type="button" data-toggle="modal" data-target="#myModal1">删除</button>\
                                <button class="js-edit" type="button" data-toggle="modal" data-target="#myModal2">修改</button>\
                                <button type="button" data-toggle="modal" data-target="#myModal3"  class="j-pay">查看缴费记录</button>\
                                <button class="j-pay-up" type="button" data-toggle="modal" data-target="#myModal4">充值</button>\
                            </td>\
                        </tr>')
    })
};
function creatPage() {
    $('.j-li').remove();
    n = Math.ceil(arr.length / count);
    for (var i = 1; i <= n; i++) {
        $('.j-last').before('<li class="j-li"><a href="javascript:;">' + i + '</a></li>')
    }
};
$('.j-page').on('click', '.j-li', function () {
    page = $(this).text();
    getUser();
});
$('.j-back').on('click', function () {
    if (page > 1 && page <= n) {
        page--;
        getUser()
    }
});
$('.j-forword').on('click', function () {
    if (page > 0 && page < n) {
        page++;
        getUser()
    }
});

$('.j-add-btn').on('click', function () {
    if (uData.a_type) {
        $.ajax({
            url: '/student/add',
            data: {
                dormId: $('.j-add-stuDormId').val(),
                studentId: $('.j-add-stuId').val(),
                name: $('.j-add-stuName').val(),
                password: $('.j-add-stuPas').val(),
                username: $('.j-add-stuUserId').val(),
            },
            type: 'post',
            success: function (res) {
                if (res.error == 0) {
                    $('#exampleModal1').modal('hide');
                    getUser();
                    $('.j-add-dorId').attr('');
                    $('.j-add-stuId').val('');
                    $('.j-add-stuName').val('');
                    $('.j-add-stuPas').val('');
                    $('.j-add-stuUserId').val('');
                }
            }
        })
    } else {
        alert('你没有权限执行此操作！')
    }
})
$('#myModal1').on('show.bs.modal', function (e) {
    id = $(e.relatedTarget).parents('tr').attr('data-id');
});
$('.j-remove-btn').on('click', function () {
    console.log(id);
    if (uData.a_type) {
        $.ajax({
            url: '/student/del',
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
    } else {
        alert('你没有权限执行此操作！')
    }
})
$('#myModal2').on('show.bs.modal', function (e) {
    id = $(e.relatedTarget).parents('tr').attr('data-id');
    d = $(e.relatedTarget).parents('tr').children();
    $('.j-edit-stuId').val(d.first().text());
    $('.j-edit-stuName').val(d.eq(1).text());
    $('.j-edit-stuUserId').val(d.eq(2).text());
    $('.j-edit-stuPas').val($(e.relatedTarget).parents('tr').attr('data-stuPas'));
    oldDormId = $(e.relatedTarget).parents('tr').attr('data-oldId');
});
$('.j-edit-btn').on('click', function () {
    if (uData.a_type) {
        $.ajax({
            url: '/student/edit',
            data: {
                id: id,
                dormId: $('.j-edit-stuDormId').val(),
                name: $('.j-edit-stuName').val(),
                password: $('.j-edit-stuPas').val(),
                oldDormId: oldDormId
            },
            type: 'post',
            success: function (res) {
                if (res.error == 0) {
                    $('#myModal2').modal('hide');
                    getUser();
                    $('.j-edit-dorId').attr('');
                    $('.j-edit-stuName').val('');
                    $('.j-edit-stuPas').val('');
                }
            }
        })
    } else if (id == uData.a_id) {
        $.ajax({
            url: '/student/edit',
            data: {
                id: id,
                stuDormId: $('.j-edit-stuDormId').val(),
                stuName: $('.j-edit-stuName').val(),
                stuPas: $('.j-edit-stuPas').val(),
                oldDormId: oldDormId
            },
            type: 'post',
            success: function (res) {
                if (res.error == 0) {
                    $('#myModal2').modal('hide');
                    getUser();
                    $('.j-edit-dorId').attr('');
                    $('.j-edit-stuName').val('');
                    $('.j-edit-stuPas').val('');
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
            url: '/student/search',
            data: {
                name: $('.j-search').val()
            },
            type: 'post',
            success: function (res) {
                if (res.error == 0) {
                    if (res.data.length) {
                        arr = res.data;
                        creatPage();
                        $('tbody').html('')
                        $.each(arr.slice((page - 1) * count, page * count), function (i, v) {
                            console.log(v);
                            $('tbody').append('<tr data-stuPas="' + v.s_password + '" data-id="' + v.s_id + '" data-oldId="' + v.d_id + '">\
                                                <td>'+ v.s_studentId + '</td>\
                                                <td>'+ v.s_name + '</td>\
                                                <td>'+ v.s_username + '</td>\
                                                <td>'+ v.d_name + '</td>\
                                                <td>'+ v.d_balance + '</td>\
                                                <td>'+ ((v.d_state == 1) ? '正常' : '催费中') + '</td>\
                                                <td><button class="js-del" type="button" data-toggle="modal" data-target="#myModal1">删除</button>\
                                                    <button class="js-edit" type="button" data-toggle="modal" data-target="#myModal2">修改</button>\
                                                    <button class="j-pay" type="button" data-toggle="modal" data-target="#myModal3">查看缴费记录</button>\
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


$('tbody').on('click', '.j-pay', function () {
    id = $(event.target).parents('tr').attr('data-id')
    getUser1();
})

function getCon1() {
    $('.j-thead').html('')
    $.each(arr.slice((page1 - 1) * count1, page1 * count1), function (i, v) {
        $('.j-thead').append('<tr>\
                                            <td>'+ v.p_money + '</td>\
                                            <td>'+ v.p_time + '</td>\
                                        </tr>')
    })
}

function createPage1() {
    $('.js-li').remove();
    n = Math.ceil(arr.length / count1);
    for (var i = 1; i <= n; i++) {
        $('.js-last').before('<li class="js-li"><a href="javascript:;">' + i + '</a></li>')
    }
}


function getUser1() {
    $.ajax({
        url: '/student/pay',
        data: {
            studentId: id
        },
        type: 'post',
        success: function (res) {
            if (res.error == 0) {
                if (res.data.length) {
                    arr = res.data;
                    createPage1();
                    getCon1();
                }

            }
        }
    })
}

$('.js-page').on('click', '.js-li', function () {
    page1 = $(this).text();
    getUser1();
});
$('.js-back').on('click', function () {
    if (page1 > 1 && page1 <= n) {
        page1--;
        getUser1()
    }
});
$('.js-forword').on('click', function () {
    if (page1 > 0 && page1 < n) {
        page1++;
        getUser1()
    }
});

$('.btn-esc').on('click', function () {
    page1 = 1;
})

$('#myModal4').on('show.bs.modal', function (e) {
    id = $(e.relatedTarget).parents('tr').attr('data-id');
    d = $(e.relatedTarget).parents('tr').children();
    $('.j-pay-dorm').val(d.eq(3).text());
    oldDormId = $(e.relatedTarget).parents('tr').attr('data-oldId');
});
$('.j-pay-btn').on('click', function () {
    $.ajax({
        url: '/student/payUp',
        data: {
            studentId: id,
            money: $('.j-pay-money').val(),
            dormId: oldDormId
        },
        type: 'post',
        success: function (res) {
            if (res.error2 == 0) {
                $('#myModal4').modal('hide');
                $('.j-pay-money').val('')
                getUser();
            }
        }
    })
})
