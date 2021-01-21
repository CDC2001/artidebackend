// 路由器
const express = require('express');
// 得到一个路由器
let router = express.Router();
// 导入相应的控制器
const CateController = require('../controller/CateController.js');
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views/index.html'));
    res.render('index.html');
})
router.get('/staticTables',CateController.staticTables)
router.get('/adds',CateController.adds)
// 获取分类数据的接口表格数据
router.get('/getCate',CateController.getCate)
// 删除指定分类表格数据的其中一栏
router.post('/delCat',CateController.delCat)
module.exports = router;