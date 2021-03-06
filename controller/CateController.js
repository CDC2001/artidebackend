// 分类模块控制器
let CateController = {};
// 引用dbquery连接数据库
const model = require("../model/model.js")
// 引入响应成功或失败的responseMessage/导入返回结果信息
const {all,delsucc,delfail,exception,argsfail,addsucc,addfail,getsucc,getfail,updsucc,updfail} = require("../util/responseMessage");
// 除首页之外的其它两个分类列表页面
CateController.staticTables =(req,res)=>{
    res.render('staticTable.html');
}
CateController.adds =(req,res)=>{
    res.render('article-index.html');
}
// 添加分类页面
CateController.cataddition =(req,res)=>{
    res.render('addition.html');
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
// 添加分类页面点击提交接口
CateController.postCat = async (req,res)=>{
    // 接受参数
    let {name,sort,add_date} = req.body;
    console.log(req.body);
    // 把数据入库
    let sql = `insert into category(name,sort,add_date) values('${name}','${sort}','${add_date}')`
    // 把结果响应回前台
    let result = await model(sql);
    if(result.affectedRows){
        // 成功
        res.json(addsucc)
    }else{
        res.json(addfail)
    }
}
// 渲染后台分类列表页面
CateController.catindex = (req,res)=>{
    res.render('staticTable.html')
}
// 展示编辑分类的页面
CateController.catedit = (req,res)=>{
    res.render('staticTable-edit.html')
}
// 获取单条分类数据
CateController.getOneCate = async (req,res)=>{
    // 1.接收参数
   let {cate_id} = req.query;
   if(!cate_id){
       res.json(argsfail)
   }else{
       // 2.查询数据库
       let sql = `select * from category where cate_id = ${cate_id}`;
       let data = await model(sql);
       // 3.返回数据
       if(data.length){
            // 加个errcode是为了更好地判断
            data[0].errcode = 0;
            res.json(data[0])
       }else{
           res.json(getfail)
       }
   }
}
// 实现分类的编辑入库
CateController.updCate = async (req,res)=>{
    //1.接收参数
    let {cate_id,name,sort,add_date} = req.body
    if(!cate_id){
        res.json(argsfail);
        return;
    }
    //2.编写sql
    let sql = `update category set name='${name}',sort=${sort},add_date='${add_date}' 
                where cate_id = ${cate_id}
                `;
    let result = await model(sql)
    //3.返回结果
    if(result.affectedRows){
        res.json(updsucc)
    }else{
        res.json(updfail)
    } 
}

// 匹配失败
CateController.all =(req,res)=>{
    res.json(all)
}

// 导出模块
module.exports = CateController;