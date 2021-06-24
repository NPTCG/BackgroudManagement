// const e = require("express");

$('.j-login-btn').click(function () {
    if ($('.type:checked').val() == "管理员") {
        $.ajax({
            url: '/login/admin',
            data: {
                username: $('.j-username').val(),
                password: $('.j-password').val()
            },
            type: 'get',
            success: function (res) {
                if (res.error == 0) {
                    alert('登陆成功');
                    localStorage.setItem('uData', JSON.stringify(res.data[0]));
                    window.location.href = '/pages/home.html';
                } else {
                    alert('登陆失败')
                }
            }
        })
    } else {
        $.ajax({
            url: '/login/student',
            data: {
                username: $('.j-username').val(),
                password: $('.j-password').val()
            },
            type: 'get',
            success: function (res) {
                console.log(res);
                if (res.error == 0) {
                    alert('登陆成功');
                    localStorage.setItem('uData', JSON.stringify(res.data[0]));
                    window.location.href = '/pages/home.html';
                } else {
                    alert('登陆失败')
                }
            }
        })
    }
})