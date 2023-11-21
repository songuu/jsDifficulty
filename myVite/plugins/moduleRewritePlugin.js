/*
 * @Author: songyu
 * @Date: 2021-06-30 20:31:06
 * @LastEditTime: 2021-06-30 20:59:52
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\测试项目\myVite\plugins\moduleRewritePlugin.js
 */
const { readBody } = require("../utils");

const { parse } = require("es-module-lexer"); // 用来解析import语法

const MagicString = require("magic-string"); // 字符串基本类型 不可改变
function rewriteImport(source) {
  const imports = parse(source)[0];
  const magicString = new MagicString(source);

  if (imports.length) {
    for (let i = 0; i < imports.length; i++) {
      let { s, e } = imports[i];

      let id = source.substring(s, e); // vue

      // 判断开头是\或者. 就不需要重写
      if (/^[^\/\.]/.test(id)) {
        id = `/@modules/${id}`; // 确认是第三方的模块
        magicString.overwrite(s, e, id);
      }
    }
  }

  return magicString.toString() // 需要判断真实路径的存在 拦截含有/@modules的路由
}
function moduleRewritePlugin({ app, root }) {
  // 洋葱模型
  app.use(async (ctx, next) => {
    await next();

    // 读取流中的代码

    if (ctx.body && ctx.response.is("js")) {
      const content = await readBody(ctx.body);

      // 重写  [替换vue语法]
      const result = rewriteImport(content);

      ctx.body = result;
    }
  });
}

exports.moduleRewritePlugin = moduleRewritePlugin;
