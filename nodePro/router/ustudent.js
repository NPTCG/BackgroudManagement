var express = require('express');

var myRouter = express.Router();
//引入db
var db = require('../utils/db')

//获取学生列表
myRouter.route('/student/get').get(function (req, res) {
  var sql = 'select * from dorm as t2 join student as t1 on t1.s_dormId=t2.d_id';

  db.query(sql, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, data: data })
    }
  })
})

//添加学生
myRouter.route('/student/add').post(function (req, res) {
  var sql1 = 'insert into student values(' + null + ',' + '"' + req.body.name + '"' + ',' + req.body.studentId + ',' + req.body.username + ',' + req.body.password + ',' + req.body.dormId + ')';
  var sql2 = 'update dorm set d_num=d_num+1 where d_id=' + req.body.dormId;

  db.query(sql1, function (err, data) {
    console.log(data);
    if (!err) {
      db.query(sql2, function (err2, data2) {
        console.log(data2);
        if (!err) {
          res.json({ error: 0, msg: "添加成功", data: data })
        } else {
          res.json({ error2: 1, msg: err })
        }
      })
    } else {
      res.json({ error: 1, msg: err })
    }
  })
})

//删除学生
myRouter.route('/student/del').post(function (req, res) {
  var sql1 = 'delete from student where s_id=' + req.body.id;
  var sql2 = 'update dorm set d_num=d_num-1 where d_id=' + req.body.dormId;

  db.query(sql1, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      db.query(sql2, function (err2, data2) {
        if (err) {
          res.json({ error: 1, msg: err })
        } else {
          res.json({ error: 0, msg: '删除成功' })
        }
      })
    }
  })
})

//修改学生
myRouter.route('/student/edit').post(function (req, res) {
  console.log(req.body);
  var sql1 = 'update student set s_name=' + '"' + req.body.name + '"' + ' ,' + 's_password=' + req.body.password + ',' + 's_dormId=' + req.body.dormId + ' where s_id=' + req.body.id;
  var sql2 = 'update dorm set d_num=d_num+1 where d_id=' + req.body.dormId;
  var sql3 = 'update dorm set d_num=d_num-1 where d_id=' + req.body.oldDormId;

  db.query(sql1, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      db.query(sql2, function (err2, data2) {
        if (err) {
          res.json({ error: 1, msg: err })
        } else {
          db.query(sql3, function (err2, data2) {
            if (err) {
              res.json({ error: 1, msg: err })
            } else {
              res.json({ error: 0, msg: '修改成功' })
            }
          })
        }
      })
    }
  })
})

//查看缴费记录
myRouter.route('/student/pay').post(function (req, res) {
  var sql = 'select * from payment join student on p_studentId=s_id where p_studentId=' + req.body.studentId;

  db.query(sql, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, data: data, msg: '查询成功' })
    }
  })
})

//搜索学生
myRouter.route('/student/search').post(function (req, res) {
  var sql = 'select * from dorm as t2 join student as t1 on t1.s_dormId=t2.d_id where s_name="' + req.body.name + '"';

  db.query(sql, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      res.json({ error: 0, data: data, msg: '搜索成功' })
    }
  })
})

//充值
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
myRouter.route('/student/payUp').post(function (req, res) {
  var sql1 = 'insert into payment values(' + null + ',"' + getTime(Date.now()) + '",' + req.body.money + ',' + req.body.dormId + ',' + req.body.studentId + ')';
  var sql2 = 'update dorm set d_balance=d_balance+' + req.body.money + ' where d_id=' + req.body.dormId;

  db.query(sql1, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err })
    } else {
      db.query(sql2, function (err2, data2) {
        if (err) {
          res.json({ error2: 1, msg: err })
        } else {
          res.json({ error2: 0, msg: '充值成功' })
        }
      })
    }
  })
})

module.exports = myRouter;
