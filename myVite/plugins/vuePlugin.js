/*
 * @Author: songyu
 * @Date: 2021-06-30 21:50:47
 * @LastEditTime: 2021-06-30 22:42:01
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\测试项目\myVite\plugins\vuePlugin.js
 */
const path = require("path");
const fs = require("fs").promises;
const { resolveVue } = require("../utils");
const defaultExportRe = /((?:^|\n|;)\s*)export default/;

// 读取文件中间引用的vue文件
function vuePlugin({ app, root }) {
  app.use(async (ctx, next) => {
    if (!ctx.path.endsWith(".vue")) {
      return next();
    }

    const filePath = path.join(root, ctx.path);

    const content = await fs.readFile(filePath, "utf8");

    let { parse, compileTemplate } = require(resolveVue(root).compiler);

    let { descriptor } = parse(content);

    // vue文件
    if (!ctx.query.type) {
      let code = "";
      // 判断vue文件里面的属性
      if (descriptor.script) {
        let content = descriptor.script.content;
        let replaced = content.replace(defaultExportRe, "$1const __script = ");
        code += replaced;
      }
      if (descriptor.styles.length) {
        descriptor.styles.forEach((item, index) => {
          code += `\nimport "${ctx.path}?type=style&index=${index}"\n`;
        });
      }
      if (descriptor.template) {
        const templateRequest = ctx.path + "?type=template";
        code += `\nimport { render as __render } from ${JSON.stringify(
          templateRequest
        )}`;
        code += `\n__script.render = __render`;
      }

      // 最后需要export出去
      ctx.type = "js";
      code += `\nexport default __script`;
      ctx.body = code;
    }

    // 具体的模板文件
    if (ctx.query.type === "template") {
      ctx.type = "js";
      let content = descriptor.template.content;
      const { code } = compileTemplate({ source: content });
      ctx.body = code;
    }

    if (ctx.query.type === "style") {
      const styleBlock = descriptor.styles[ctx.query.index];
      ctx.type = "js";
      ctx.body = `
            \n const __css = ${JSON.stringify(styleBlock.content)}
            \n updateCss(__css)
            \n export default __css
        `;
    }
  });
}

exports.vuePlugin = vuePlugin;
