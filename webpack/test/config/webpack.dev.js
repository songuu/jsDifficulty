/*
 * @Author: songyu
 * @Date: 2021-08-10 20:12:49
 * @LastEditTime: 2021-08-10 20:49:57
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\测试项目\webpack5\test\config\webpack.dev.js
 */
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.common");
const path = require("path");

/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */
const devServer = {
  port: 3000,
  host: "localhost",
  contentBase: path.join(__dirname, "../public"),
  watchContentBase: true,
  publicPath: "/",
  compress: true,
  historyApiFallback: true,
  hot: true,
  clientLogLevel: "error",
  open: true,
  watchOptions: {
    ignored: /node_modules/,
  },
};

const devConfig = {
  mode: "development",
  devServer: devServer,
};

module.exports = webpackMerge.merge(baseConfig, devConfig);
