// 引入mysql
var mysql = require('mysql')
//配置mysql
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tcg990227',
  database: 'w258'
});
//导出
module.exports = db;