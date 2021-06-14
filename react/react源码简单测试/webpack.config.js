/*
 * @Author: songyu
 * @Date: 2021-06-14 20:55:59
 * @LastEditTime: 2021-06-14 21:40:20
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\react\react源码简单测试\webpack.config.js
 */
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        app: "./src/index.js"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        hot: true,
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./index.html"
    })]
}