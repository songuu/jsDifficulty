/*
 * @Author: songyu
 * @Date: 2021-08-10 20:13:01
 * @LastEditTime: 2021-08-10 20:45:16
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\测试项目\webpack5\test\config\webpack.prod.js
 */
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.common");
/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */

const prodConfig = {
  mode: "production",
};

module.exports = webpackMerge.merge(baseConfig, prodConfig);
