//引入express
var express = require('express');
//引入图标
var favicon = require('serve-favicon')
//引入目录
var morgan = require('morgan')
// 引入post
var bodyParser = require('body-parser');
const { request } = require('express');
//引入路由
var landRouter = require('./router/uland');
var homeRouter = require('./router/uhome');
var studentRouter = require('./router/ustudent');
var dormRouter = require('./router/udorm');
var noticeRouter = require('./router/unotice');
var adminRouter = require('./router/uadmin');
//引入session
var session = require('express-session');
const { json } = require('body-parser');
//利用express创建一个服务器，app就是服务器
var app = express();
//配置静态文件目录
app.use(express.static('http'));
//配置图标
app.use(favicon('./http/favicon.ico'))
//配置目录
app.use(morgan('dev'))
//配置post请求
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//配置session
app.use(session({
  secret: 'w258',//session签名
  resave: true,//重新保存  
  rolling: true,//更新过期时间
  saveUninitialized: true,
  cookie: { maxAge: 600000 } //设置过期时间 默认是毫秒
}))
//验证
app.all('*', function (req, res, next) {
  console.log('session', req.session);
  console.log('url', req.url);
  if (req.session.user || req.url.split('?')[0] == '/login/admin' || req.url.split('?')[0] == '/login/student') {
    next();
  } else {
    res.json({ error: 2, msg: '重新登陆' })
  }
})

//测试端口
app.get('/aaa', function (req, res) {
  res.json({ a: 1 })
})
//接口
app.use(landRouter);
app.use(homeRouter);
app.use(studentRouter);
app.use(dormRouter);
app.use(noticeRouter);
app.use(adminRouter);
//配置端口号
app.listen(80, function () {
  console.log('服务启动了');
})

/* //-----------------ws------------------//
//引入
var ws = require('ws');
//创造ws的服务
var server = new ws.Server({
  host: '172.17.7.251',
  port: 8712
})
var arr = [];
//当有人和我建立链接的时候触发
server.on('connection', function (ws) {//ws 当前链接的对象
  console.log('有人进来了');
  arr.push(ws);

  //当有人发送消息的时候
  ws.on('message', function (data) {//data 就是发送过来的消息
    console.log('接收到的数据', data);
    for (let i = 0; i < arr.length; i++) {
      //给别人发送消息
      arr[i].send(data);
    }
  })
  //断开链接
  ws.on('close', function () {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == ws) {
        arr.splice(i, 1);
        break;
      }
    }
  })
})



 */