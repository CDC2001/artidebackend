// 封装执行sql语句的promise函数
var mysql = require('mysql');
// 连接数据库参数配置
let dbConfig = require("../config/db.json");
var connection = mysql.createConnection({
    ...dbConfig
});
connection.connect(function(err){
    if(err){
        throw err;
    }
    console.log('connect mysql success');
});
// 封装一个函数，用于查询执行sql语句
function dbquery(sql){
    return new  Promise((resolve,reject)=>{
        connection.query(sql,(err,data)=>{
            if(err){ reject(err); }
            resolve(data)
        })
    })
}
module.exports = dbquery;