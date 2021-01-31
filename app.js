const express = require('express');
const app = express();
const path = require('path')

// 托管静态资源
app.use('/public',express.static(path.join(__dirname,'public')))
// 上传图片路径的中间件
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

// 引用模板引擎两个模块
const artTemplate = require('art-template'); 
const express_template = require('express-art-template');

// 配置express框架模板引擎为art-template  
//配置模板的路径
app.set('views', __dirname + '/views/');
//设置express_template模板引擎的静态文件扩展名为.html
app.engine('html', express_template); 
//使用模板引擎扩展名为html
app.set('view engine', 'html'); 

// 获取post请求参数中间件
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 导入路由模块
const router = require('./router/router.js')




// 使用路由中间件 req.body
app.use(router)

app.listen(4000,_=>{
    console.log('服务器已启动 port 4000');
})