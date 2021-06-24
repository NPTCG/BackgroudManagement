var express = require('express');

var myRouter = express.Router();
//引入db
var db = require('../utils/db')
//获取宿舍列表
myRouter.route('/dorm/get').get(function (req, res) {
  var sql = 'select * from dorm';

  db.query(sql, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, data: data })
    }
  })
})

//添加宿舍
myRouter.route('/dorm/add').post(function (req, res) {
  var sql = 'insert into dorm values(' + null + ',' + '"' + req.body.dormId + '"' + ',' + '"' + req.body.name + '"' + ',' + 0 + ',' + req.body.balance + ',' + 1 + ')';

  db.query(sql, function (err, data) {
    console.log(data);
    if (!err) {
      res.json({ error: 0, msg: "添加成功", data: data })
    } else {
      res.json({ error: 1, msg: err })
    }
  })
})

//删除寝室
myRouter.route('/dorm/del').post(function (req, res) {
  var sql = 'delete from dorm where d_id=' + req.body.id;

  db.query(sql, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, msg: '删除成功' })
    }
  })
})

//修改寝室
myRouter.route('/dorm/edit').post(function (req, res) {
  console.log(req.body);
  var sql = 'update dorm set d_name=' + '"' + req.body.name + '"' + ' ,' + 'd_balance=' + req.body.balance + ' ' + ' where d_id=' + req.body.id

  db.query(sql, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, msg: '修改成功' })
    }
  })
})

//寝室催款
myRouter.route('/dorm/dept').post(function (req, res) {
  console.log(req.body);
  var sql = 'update dorm set d_state=' + req.body.type + ' where d_id=' + req.body.id

  db.query(sql, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, msg: '修改成功' })
    }
  })
})

//搜索寝室
myRouter.route('/dorm/search').post(function (req, res) {
  var sql = 'select * from dorm where d_name="' + req.body.name + '"';

  db.query(sql, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, data: data, msg: '搜索成功' })
    }
  })
})


module.exports = myRouter;