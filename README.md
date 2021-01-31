##  项目说明文件

* 基于`express` 搭建
* 后台ui使用`layui`
* 使用技术 `layui+jQuery+async/ await`
* 配合模板引擎构成页面结构



##  运行项目

1.安装项目的所有依赖项

2.打开`data`导入`SQL`文件，再修改`config/db.json`数据库配置信息

3.执行`npm run serve` 启动项目



##  文件夹说明

`config/db.json`  : 数据库配置

`data`  : sql文件

`controller`:  控制器，内含多个控制器，用于控制各个模块

`public`:前台引用文件

`util`:后台引用文件



##  加入进度条 NProgress

- 在网页加载完毕之前加载进度条，加载完毕取消进度条即可

```
    function startNProgress(){
        NProgress.set(0.4);// 默认设置40% NProgress.set(0) 等价与 NProgress.start()
        let interval = setInterval(function(){
            NProgress.inc(); // 以小量递增
        },200)

        $(window).on('load',()=>{
            clearInterval(interval)
            NProgress.done()
        })
    }

    startNProgress();
```

> 高版本的jquery不支持 ` $(window).on('load')`的写法，改为on绑定即可

##  文章编辑、删除

-  1.先实现数据在表单中的回显，要获取到文章的id去发起请求获取数据
-  2.实现update入库 / insert into入库