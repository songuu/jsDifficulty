/*
 * @Author: songyu
 * @Date: 2021-07-05 21:27:40
 * @LastEditTime: 2021-07-05 21:27:41
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\jsDifficulty\webpack\webpack插件\firstPluginInfo.js
 */
class firstPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.plugin("emit", (compilation, callback) => {
      let str = "";
      for (let filename in compilation.assets) {
        str += `文件:${filename}  大小${compilation.assets[filename][
          "size"
        ]()}\n`;
      }
      // 通过compilation.assets可以获取打包后静态资源信息，同样也可以写入资源
      compilation.assets["fileSize.md"] = {
        source: function () {
          return str;
        },
        size: function () {
          return str.length;
        },
      };
      callback();
    });
  }
}
module.exports = firstPlugin;
