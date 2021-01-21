const responseMessage = {
    argsfail: {errcode:10001,'message':"参数有误"},
    delsucc: {errcode:0,'message':"删除成功"},
    delfail: {errcode:10002,'message':"原因未知，请重新尝试"},
    exception: {errcode:10003,'message':"服务器繁忙，请稍后再试"}
}
module.exports = responseMessage;