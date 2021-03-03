let express =  require('express');
let router = express.Router();

const model = require('../model/model.js');

// 获取所有的分类
router.get('/cate',async (req,res)=>{
    let sql = `select * from category`;
    let data =  await model(sql);
    res.json(data)
})

// 获取最新发布的文章
router.get ('/article',async (req,res)=>{
    let {_page= 1, _limit=3} = req.query;
    let offset = (_page-1) * _limit;
    let sql = `select t1.*, t2.name from article  t1 left join category t2 
     on t1.cat_id = t2.cate_id 
    where status = 1 
    order by publish_date desc limit ${offset},${_limit}`;
   
    let data = await model(sql);
     // 添加图片完整路径
     data.map(v=>{
        if(v.cover){
            v.cover = `http://localhost:4000/${v.cover}`
        }
    })
    res.json(data)
})
// 获取某个分类下面的文章
router.get('/getCateArticle/:cat_id',async (req,res)=>{
    let {cat_id=0} = req.params;
    console.log(req.params);
    let sql = `select t1.*,t2.name cat_name from article t1
    left join category t2 on t1.cat_id = t2.cate_id
    where t1.cat_id = ${cat_id} and status = 1 order by publish_date desc `;
    let data = await model(sql); 
    data.map(v=>{
        if(v.cover){
            v.cover = 'http://localhost:4000/' + v.cover
        }
    })
    res.json(data)
})
// 获取文章详情
router.get('/article/:art_id',async (req,res)=>{
    let {art_id} = req.params; 
    let sql = `select t1.*,t2.name cat_name from 
            article t1 left join category t2 on t1.cat_id = t2.cate_id 
            where art_id = ${art_id}`;
    let data = await model(sql); 
    res.json(data[0] || {})
})
// 匹配失败提示用户
router.all('*',(req,res)=>{
    res.json({message:"请求错误"})
 })
 // 暴露路由中间件
 module.exports = router;
 