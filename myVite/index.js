/*
 * @Author: songyu
 * @Date: 2021-06-30 20:03:53
 * @LastEditTime: 2021-07-01 09:35:15
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\测试项目\myVite\index.js
 */
/*
 * 创建Koa实例
 */
const Koa = require("koa");

const { serverStaticPlugin } = require("./plugins/serverStaticPlugin");
const { moduleRewritePlugin } = require("./plugins/moduleRewritePlugin");
const { moduleResolvePlugin } = require("./plugins/moduleResolvePlugin");

const { htmlRewritePlugin } = require("./plugins/htmlRewritePlugin");
const { vuePlugin } = require("./plugins/vuePlugin");
const { htmlRewritePlugin } = require("./plugins/htmlRewritePlugin");

function createServer() {
  const app = new Koa();
  const root = process.cwd();

  // 需要获取当前运行的目录

  // 全局的实例
  const context = {
    app,
    root,
  };

  // 可能存在很多的插件

  /*
   * 1. 实现静态的服务[找到入口的文件]
   * 2. 解析import语法
   * 3. vue文件转义
   * 4. 实现热更新
   * 5. 解析以@modules开头的内容 重写模块路径
   * 6. 重写html 注入参数
   */
  const resolvePlugins = [
    htmlRewritePlugin,
    moduleRewritePlugin,
    htmlRewritePlugin,
    vuePlugin,
    moduleResolvePlugin,
    serverStaticPlugin,
  ];

  resolvePlugins.forEach((plugin) => plugin(context));

  return app;
}

module.exports = createServer;
