var express = require('express');

var myRouter = express.Router();
//引入db
var db = require('../utils/db')

//获取管理员列表
myRouter.route('/admin/get').get(function (req, res) {
  var sql = 'select * from admin';
  db.query(sql, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, data: data })
    }
  })
})

//添加管理员
myRouter.route('/admin/add').post(function (req, res) {

  var sql = 'insert into admin values(' + null + ',' + req.body.username + ',"' + req.body.password + '",' + req.body.type + ',"' + req.body.name + '")';

  db.query(sql, function (err, data) {
    console.log(data);
    if (!err) {
      res.json({ error: 0, msg: "添加成功", data: data })

    } else {
      res.json({ error: 1, msg: err })
    }
  })
})

//删除管理员
myRouter.route('/admin/del').post(function (req, res) {
  var sql1 = 'delete from admin where a_id=' + req.body.id;

  db.query(sql1, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, msg: '删除成功' })
    }
  })
})

//修改管理员
myRouter.route('/admin/edit').post(function (req, res) {
  var sql1 = 'update admin set a_name=' + '"' + req.body.name + '"' + ',' + 'a_password="' + req.body.password + '",' + 'a_type=' + req.body.type + ' where a_id=' + req.body.id;

  db.query(sql1, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, msg: '修改成功' })
    }
  })
})

//搜索管理员
myRouter.route('/admin/search').post(function (req, res) {
  var sql = 'select * from admin where a_name="' + req.body.name + '"';

  db.query(sql, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, data: data, msg: '搜索成功' })
    }
  })
})


module.exports = myRouter;