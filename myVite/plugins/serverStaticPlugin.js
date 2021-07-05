/*
 * @Author: songyu
 * @Date: 2021-06-30 20:14:45
 * @LastEditTime: 2021-06-30 20:18:30
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\测试项目\myVite\plugins\serverStaticPlugin.js
 */
const static = require("koa-static");

const path = require("path");

function serverStaticPlugin({ app, root }) {
  // koa使用中间件

  // vite在哪里运行 就在那里启动静态服务
  // 需要启动两个静态服务
  app.use(static(root));

  app.use(static(path.join(root, "public")));
}

exports.serverStaticPlugin = serverStaticPlugin;
