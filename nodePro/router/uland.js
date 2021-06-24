var express = require('express');
var myRouter = express.Router();
//引入db
var db = require('../utils/db')
//管理员登录
myRouter.route('/login/admin').get(function (req, res) {
  console.log('有人登录了', req.query);

  var sql = 'select * from admin where a_username="' + req.query.username + '" and a_password="' + req.query.password + '"';
  db.query(sql, function (err, data) {
    console.log(err, data);
    if (!err) {
      if (data.length) {
        req.session.user = req.query.username;
        res.json({ error: 0, data: data, msg: '登录成功了' });
      } else {
        res.json({ error: 1, msg: '登录失败' })
      }
    }
  })
})
//学生登陆
myRouter.route('/login/student').get(function (req, res) {
  console.log('有人登录了', req.query);
  var sql = 'select * from student where s_username="' + req.query.username + '" and s_password="' + req.query.password + '"';
  db.query(sql, function (err, data) {
    console.log(err, data);
    if (!err) {
      if (data.length) {
        req.session.user = req.query.username;
        res.json({ error: 0, data: data, msg: '登录成功了' });
      } else {
        res.json({ error: 1, msg: '登录失败' })
      }
    }
  })
});
//导出
module.exports = myRouter