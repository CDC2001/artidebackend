
let CateController = {};
// 引用dbquery连接数据库
const model = require("../model/model.js")
// 引入响应成功或失败的responseMessage/导入返回结果信息
const {delsucc,delfail,exception,argsfail} = require("../util/responseMessage");
// 除首页之外的其它两个分类列表页面
CateController.staticTables =(req,res)=>{
    res.render('staticTable.html');
}
CateController.adds =(req,res)=>{
    res.render('add.html');
}
// 获取分类数据的接口  =>staticTable 表格数据
CateController.getCate =async (req,res)=>{
    // 查询数据库,并根据order by 将sort的序号降序排列，得到新的数据
    let sql = "select * from category order by sort asc";
    let data = await model(sql);
     // 返回数据
    res.json(data);
}
// 删除指定分类staticTable 表格数据的其中一栏
CateController.delCat =async (req,res) => {
    let {cate_id} = req.body
    //判断
    if(!cate_id){
        res.json(argsfail)
    }else{
        cate_id = parseInt(cate_id);
        let sql = `delete from category where cate_id = ${cate_id}`
        let response;
        let result ;
        try{
            result = await model(sql);
            if(result.affectedRows){
                response = delsucc;
            }else{
                response = delfail;
            }
        }catch(e){
            response = exception;
        }
        res.json(response);
    }
}
// 导出模块
module.exports = CateController;