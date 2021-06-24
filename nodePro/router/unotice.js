var express = require('express');

var myRouter = express.Router();
//引入db
var db = require('../utils/db')

//获取公告列表
myRouter.route('/notice/get').get(function (req, res) {
  var sql = 'select * from notice t2 join admin t1 on t1.a_id=t2.n_adminId';
  db.query(sql, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, data: data })
    }
  })
})

//添加公告
function getTime(t) {//t是要转的13位时间戳
  var date = new Date(t);
  Y = date.getFullYear() + '-';
  M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  D = date.getDate() + ' ';
  h = date.getHours() + ':';
  m = date.getMinutes() + ':';
  s = date.getSeconds();
  return Y + M + D + h + m + s;
}
myRouter.route('/notice/add').post(function (req, res) {

  var sql = 'insert into notice values(' + null + ',' + '"' + req.body.title + '"' + ',"' + req.body.con + '",' + '"' + getTime(Date.now()) + '"' + ',' + req.body.adminId + ')';

  db.query(sql, function (err, data) {
    console.log(data);
    if (!err) {
      res.json({ error: 0, msg: "添加成功", data: data })

    } else {
      res.json({ error: 1, msg: err })
    }
  })
})

//删除公告
myRouter.route('/notice/del').post(function (req, res) {
  var sql1 = 'delete from notice where n_id=' + req.body.id;

  db.query(sql1, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, msg: '删除成功' })
    }
  })
})

//修改公告
myRouter.route('/notice/edit').post(function (req, res) {
  console.log(req.body);
  var sql1 = 'update notice set n_title=' + '"' + req.body.title + '"' + ' ,' + 'n_con="' + req.body.con + '" where n_id=' + req.body.id;

  db.query(sql1, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, msg: '修改成功' })
    }
  })
})

//搜索公告
myRouter.route('/notice/search').post(function (req, res) {
  var sql = 'select * from notice t2 join admin t1 on t1.a_id=t2.n_adminId where n_title like "%' + req.body.title + '%"';

  db.query(sql, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, data: data, msg: '搜索成功' })
    }
  })
})
module.exports = myRouter;