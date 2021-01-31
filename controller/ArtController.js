// 文章控制器
let ArticleController = {}
const fs = require('fs');


// 导入model,相当于模型执行sql语句，
const model = require('../model/model.js');
// 引入响应成功或失败的responseMessage/导入返回结果信息
const {all,delsucc,delfail,exception,argsfail,addsucc,addfail,getsucc,getfail,updsucc,updfail} = require("../util/responseMessage");

// 渲染获取数据库所有数据后的页面
ArticleController.allArticle = async (req,res)=>{
    //1. 接收查询字符串,给limit取别名
    let {page,limit:pagesize} = req.query;
    //2.编写sql语句
    let offset = (page - 1)*pagesize;
    let sql = `select t1.*,t2.name from article t1 left join category t2 on t1.cat_id = t2.cate_id order by art_id desc limit ${offset},${pagesize}`;
    let sql2 = `select count(*) as count from article;`
    let promise1 =  model(sql); // [{},{},{}]
    let promise2 =  model(sql2); // [{count:16}]
    // 并行
    let result = await Promise.all([promise1,promise2])
    let data = result[0];
    let count = result[1][0].count;
    let response = {
        code: 0,
        count: count, // 1000是数据的总记录数
        data: data,
        msg:''
    }
    // console.log(data)
    res.json(response)
    // res.json(articleData)
}

//删除指定一项文章数据
ArticleController.deleteArticle = async (req,res)=>{
    let {art_id} = req.body;
    let sql = `delete from article where art_id = ${art_id}`;
    let result = await model(sql);
    if(result.affectedRows){
        res.json(delsucc)
    }else{
        res.json(delfail)
    }
}
// 渲染出文章编辑的页面
ArticleController.artEdit = (req,res)=>{
    res.render('article-edit.html')
}

// 渲染出文章添加的页面
ArticleController.addArticle = (req,res)=>{
    res.render('article-add.html')
}
// 提交数据入库
ArticleController.submitArticles = async (req,res)=>{
    let {cover,title,cat_id,status,comtent} = req.body;
    // publish_date使用mysql中的时间函数，now（），可得到实时时间
    let sql = `insert into article(title,comtent,cat_id,status,cover,publish_date)
                values('${title}','${comtent}',${cat_id},${status},'${cover}',now())
                `;
    let result = await model(sql)
    if(result.affectedRows){
        res.json(addsucc)
    }else{
        res.json(addfail)
    }
}
// 上传图片的接口
ArticleController.upload = (req,res)=>{
    if(req.file){
        // 进行文件的重命名即可 fs.rename
        let {originalname,destination,filename} = req.file;
        let dotIndex = originalname.lastIndexOf('.');
        let ext = originalname.substring(dotIndex);
        let oldPath = `${destination}${filename}`;
        let newPath = `${destination}${filename}${ext}`;
        fs.rename(oldPath,newPath,err=>{
            if(err){ throw err; }
            res.json({code:0,message:'上传文件成功',src:newPath})
        })
    }else{
        res.json({code:1, message:'上传文件失败'})
    }
    
}
// 修改文章的状态
ArticleController.modifyState = async (req,res)=>{
    let {art_id,status} = req.body;
    let sql = `update article set status = ${status} where art_id = ${art_id}`;
    let result = await model(sql);
    if(result.affectedRows){
        res.json(updsucc)
    }else{
        res.json(updfail)
    }
}


// 暴露模块
module.exports = ArticleController;