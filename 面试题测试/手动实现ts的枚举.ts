/*
 * @Author: songyu
 * @Date: 2021-06-29 21:30:35
 * @LastEditTime: 2021-06-29 21:32:02
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\jsDifficulty\面试题测试\手动实现ts的枚举.ts
 */
enum IHttpMethods1 {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
}


var IHttpMethods;
(function (IHttpMethods) {
    IHttpMethods["GET"] = "get";
    IHttpMethods["POST"] = "post";
    IHttpMethods["DELETE"] = "delete";
    IHttpMethods["PUT"] = "put";
})(IHttpMethods || (IHttpMethods = {}))