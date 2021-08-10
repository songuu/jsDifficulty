// import OptimiazeCssAssetPlugin from "optimize-css-assets-webpack-plugin"; 在webpack中间被舍弃
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { resolve } from "path/posix";
import TerserPlugin from "terser-webpack-plugin";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

const isDev = process.env.NODE_ENV === "development";

module.export = {
  entry: {
    app: resolve("src/index.tsx"),
  },
  output: {
    path: resolve("dist"),
    publicPath: "/", // root Dir
    sourceMapFilename: "[name].map",
    chunkFilename: "static/js/[name].[chunkhash:8].js",
    filename: "static/js/[name].[contenthash:8].js",
    assetModuleFilename: "images/[hash][ext][query]",
  },
  cache: {
    type: "filesystem", // memory 使用内容缓存，filesystem 使用文件缓存
    cacheDirectory: path.resolve(__dirname, "node_modules/.cac/webpack"),
  },
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
      new cssAssetsWebpackPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)?$/,
        include: [resolve("src")],
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset/inline", // 替换url-loader
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
      {
        test: /\.less$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 样式热更新
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                compileType: "module",
                mode: "local",
                auto: true,
                exportGlobals: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                localIdentContext: paths.src,
              },
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {
                  "primary-color": "#1DA57A",
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", "ts", "tsx"],
    alias: {
      "@src": resolve(__dirname, "src"),
    },
  },
};
