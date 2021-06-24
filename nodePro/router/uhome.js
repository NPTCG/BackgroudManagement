var express = require('express');

var myRouter = express.Router();
//引入db
var db = require('../utils/db')
//获取公告列表
myRouter.route('/home/get').get(function (req, res) {
  var sql = 'select * from notice';

  db.query(sql, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, data: data })
    }
  })
})
myRouter.route('/esc').get(function (req, res) {
  req.session.destroy();
  console.log(req.session);
})
module.exports = myRouter;