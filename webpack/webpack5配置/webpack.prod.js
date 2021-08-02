/*
 * @Author: songyu
 * @Date: 2021-08-01 10:02:08
 * @LastEditTime: 2021-08-01 11:06:53
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \jsDifficulty\webpack\webpack5配置\webpack.prod.js
 */
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const regVendor = /[\\/]node_modules[\\/](axios|classnames|)[\\/]/;
const regReact =
  /[\\/]node_modules[\\/](react|react-dom|react-redux|react-router-config|react-router-dom|react-router-redux|redux)[\\/]/;

module.exports = merge(common, {
  mode: "production",
  devtool: "cheap-module-source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css",
      chunkFilename: "static/css/[name].[contenthash].css",
    }),
    new webpack.BannerPlugin({
      raw: true,
      banner:
        "/** @preserve Powered by promotion-web (https://wkylin.github.io/promotion-web) */",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    splitChunks: {
      chunks: "all",
      minChunks: 3, // 拆分前必须分享模块的最小chunks数
      cacheGroups: { // 抽离单独打包 最好出来的cacheGroups 下面的每个key的值不同
        vendor: {
          test: regVendor,
          name: "vendor", // 可以是一个字符串或者一个函数 string | name(module, chunks, cacheGroupKey)
          minChunks: 1, 
          priority: 10,
          enforce: true,
          chunks: "all",
        },
        react: {
          test: regReact,
          name: "react",
          minChunks: 1,
          priority: 10,
          enforce: true,
          chunks: "all",
        },
      },
    },
    runtimeChunk: {
      name: "runtime",
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
