/*
 * @Author: songyu
 * @Date: 2021-08-10 20:12:55
 * @LastEditTime: 2021-08-10 21:24:48
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\测试项目\webpack5\test\config\webpack.common.js
 */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
/**
 * @type {import('webpack').Configuration}
 */

console.log(process.env)
module.exports = {
  entry: { app: path.resolve(__dirname, "../src/index.tsx") },
  output: {
    path: path.resolve("dist"),
    publicPath: "/",
    sourceMapFilename: "[name].map",
    chunkFilename: "static/js/[name].[chunkhash:8].js",
    filename: "static/js/[name].[contenthash:8].js",
    assetModuleFilename: "images/[hash][ext][query]",
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
    name: "development-cache",
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.(ts|tsx)$/, loader: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.(css|pcss)$/,
        use: ["pcss-loader", "style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@src": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "管理后台",
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    usedExports: true, // 只导出被使用的模块 tree-shaking
    minimize: true, // 启动压缩
    concatenateModules: true, // 模块合并
    minimizer: [
      // 压缩选项
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ["console.log"] },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
};
