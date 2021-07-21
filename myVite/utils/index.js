/*
 * @Author: songyu
 * @Date: 2021-06-30 20:40:36
 * @LastEditTime: 2021-06-30 22:37:18
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\测试项目\myVite\utils\index.js
 */
const { Readable } = require("stream");
const path = require("path");
async function readBody(stream) {
  // koa中要求所有的异步方法必须包装成propmise
  if (!(stream instanceof Readable)) {
    return stream.toString();
  }

  return new Promise((resolve, reject) => {
    let res = "";
    stream.on("data", (data) => {
      res += data;
    });

    stream.on("end", () => {
      resolve(res);
    });

    stream.on("error", (e) => {
      reject(e)
    })
  });
}

function resolveVue(root) {
  // 首先实现的是vue3引用
  // runtime-dom runtime-core compiler-sfc reactivity shared
  // 后端解析.vue文件

  // commonjs

  const compilerPkgPath = path.join(
    root,
    "node_modules",
    "@vue/compiler-sfc/package.json"
  );

  const compilerPkg = require(compilerPkgPath);

  // 获取到的是json中的文件 拿取main字段

  const compilerPath = path.join(
    path.dirname(compilerPkgPath),
    compilerPkg.main
  );

  const resolePath = (name) =>
    path.join(
      root,
      "node_modules",
      `@vue/${name}/dist/${name}.esm-bundler.js`
    );

  const runtimeDomPath = resolePath("runtime-dom");
  const runtimeCorePath = resolePath("runtime-core");
  const reactivityPath = resolePath("reactivity");
  const sharedPath = resolePath("shared");

  return {
    compiler: compilerPath,
    "@vue/runtime-dom": runtimeDomPath,
    "@vue/runtime-core": runtimeCorePath,
    "@vue/reactivity": reactivityPath,
    "@vue/shared": sharedPath,
    vue: runtimeDomPath,
  };
}

exports.readBody = readBody;

exports.resolveVue = resolveVue;
