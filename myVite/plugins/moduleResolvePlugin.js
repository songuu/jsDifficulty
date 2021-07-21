/*
 * @Author: songyu
 * @Date: 2021-06-30 21:02:45
 * @LastEditTime: 2021-06-30 21:31:04
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\测试项目\myVite\plugins\moduleResolvePlugin.js
 */
const moduleReg = /^\/@modules\//;
const fs = require("fs").promises;

const { resolveVue } = require("../utils");

function moduleResolvePlugin({ app, root }) {
  // 根据当前运行vite的目录解析文件表 包含vue所有的模块
  const vueResolved = resolveVue(root);
  app.use(async (ctx, next) => {
    // 判断路径是不是以@modules开头
    if (!moduleReg.test(ctx.path)) {
      return next();
    }

    // 将@modules替换掉 找到绝对的第三方引用路径[项目中间使用的]

    const id = ctx.path.replace(moduleReg, "");

    ctx.type = "js"; // 设置响应的类型

    const content = await fs.readFile(vueResolved[id], "utf8");

    ctx.body = content;
  });
}

exports.moduleResolvePlugin = moduleResolvePlugin;
