/*
 * @Author: songyu
 * @Date: 2021-06-30 21:42:30
 * @LastEditTime: 2021-06-30 22:29:42
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\测试项目\myVite\plugins\htmlRewritePlugin.js
 */

const { readBody } = require("../utils");

function htmlRewritePlugin({ app, root }) {
  const inject = `<script>
        window.process = {};
        process.env = {
            NODE_ENV: "development"
        }

        function updateCss(css) {
          const style = document.createElement('style');
          style.type = 'text/css';
          style.innerHTML = css;
          document.head.appendChild(style);
        }
    </script>`;

  app.use(async (ctx, next) => {
    await next();

    if (ctx.response.is("html")) {
      const html = await readBody(ctx.body);

      ctx.body = html.replace(/<head>/, `$&${inject}`);
    }
  });
}

exports.htmlRewritePlugin = htmlRewritePlugin;
