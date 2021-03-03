// 用户控制器
let UserController = {};
// 导入model,相当于模型执行sql语句，
const model = require('../model/model.js');
let md5 = require('md5')
let {secret:passSecret} = require('../config/app.json')

// 渲染用户登录页面
UserController.login = (req,res)=>{
    // 如果有用户的信息，用户再次访问/login，则直接帮他重定向到首页
    if(req.session.userInfo){
        res.redirect('/');
        return
    }
    res.render('login.html')
}
//登录接口
UserController.signin = async (req,res)=>{
    //1.接收参数
    let {username,password} = req.body;
    //2.数据库查询,要把密码md5加密之后在判断
    password = md5(`${password}${passSecret}`);
    let sql = `select * from users where username='${username}' and password = '${password}'`

    let data = await model(sql);// [{}]
   
    //3.响应结果
    if(data.length){
        // 匹配成功 
        // 1.把用户信息存入到会话session中，
        let userInfo = data[0];
        req.session.userInfo = userInfo; 
        // 2.更新此次的登录时间
        res.json({errcode:0,message:'登录成功'})
    }else{
        // 匹配失败
        res.json({errcode:10008,message:'用户名或密码错误'})
    }
}
// 用户退出
UserController.logout = (req,res)=>{
    // 清空session并重定向到登录页面
    req.session.destroy(err=>{
        if(err){ throw err; }
    })
    res.json({message:'退出成功'})
}
module.exports = UserController;