// 路由器
const express = require('express');
// 得到一个路由器
let router = express.Router();
// 导入相应的控制器
const CateController = require('../controller/CateController.js');
const ArtController = require('../controller/ArtController.js');
// 引入图片的相应模块
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
// 搭建后台管理访问系统
router.get('/',(req,res)=>{
    res.render('index.html');
})
// 栏目管理
router.get('/staticTables',CateController.staticTables)
// 文章管理
router.get('/adds',CateController.adds)
// 渲染出添加分类的页面
router.get('/catadd',CateController.cataddition)
// 后面添加文章时也要用到操作
router.get('/getCate',CateController.getCate)
// 删除指定分类staticTable 表格数据的其中一栏
router.post('/delCat',CateController.delCat)
// 添加分类页面点击提交接口
router.post('/postCat',CateController.postCat)
// 添加成功后，跳转到catindex接口
router.get('/catindex',CateController.catindex)
// 渲染出编辑分类的页面
router.get('/catedit',CateController.catedit)
// 获取单个分类数据的接口
router.get('/getOneCate',CateController.getOneCate)
// 编辑分类的接口
router.post('/updCate',CateController.updCate)
// 文章列表
router.get('/artindex',(req,res)=>{
    res.render('article-index.html')
})
// 获取文章数据接口
router.get('/allarticle',ArtController.allArticle)
// 删除指定文章数据接口
router.post('/deleteArticle',ArtController.deleteArticle)
// 渲染出编辑文章的页面
router.get('/artedit',ArtController.artEdit)
// 渲染出添加文章的页面
router.get('/addArticle',ArtController.addArticle)
// 提交文章的数据入库
router.post('/submitArticles',ArtController.submitArticles)
// 上传文件的接口
router.post('/upload',upload.single('file'),ArtController.upload)
// 修改文章状态
router.post('/modifyState',ArtController.modifyState)
// 匹配失败的路由
router.all('*',CateController.all)
module.exports = router;