/*
 * @Author: songyu
 * @Date: 2021-08-01 10:02:00
 * @LastEditTime: 2021-08-01 10:06:22
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \jsDifficulty\webpack\webpack5配置\webpack.dev.js
 */
const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin"); // 快速刷新 热更新操作
const portfinder = require("portfinder");

const jsxRegex = /\.(js|jsx|ts|tsx)$/;

const devWebpackConfig = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "../dist"),
    compress: true,
    inline: true,
    hot: true,
    port: 8080,
    open: true,
    clientLogLevel: "silent",
    disableHostCheck: true,
    useLocalIp: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      "/": {
        target: "",
        pathRewrite: { "^/": "" },
        secure: false,
        changeOrigin: true,
      },
    },
  },

  module: {
    rules: [
      {
        test: jsxRegex,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [require.resolve("react-refresh/babel")].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean),
  optimization: {
    providedExports: true,
    usedExports: true,
  },
});

module.exports = new Promise((resolve, reject) => {
  portfinder.getPort(
    {
      port: 8080, // 默认8080端口，若被占用，重复+1，直到找到可用端口或到stopPort才停止
      stopPort: 65535, // maximum port
    },
    (err, port) => {
      if (err) {
        reject(err);
        return;
      }
      devWebpackConfig.devServer.port = port;
      resolve(devWebpackConfig);
    }
  );
});
