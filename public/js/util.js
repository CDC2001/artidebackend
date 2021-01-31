// 定义一些工具函数，为了其他地方复用

(function(window,undefined){

    let util = {
        date_format:function(date,format="YYYY-MM-DD HH:mm:ss"){
            return moment(date).format(format)
        }
    }

    // 暴露给全局
    window.util = util;
})(window)