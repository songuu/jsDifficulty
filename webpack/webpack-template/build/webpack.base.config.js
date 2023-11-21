const loader = require('./loader')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../public/index.html'),
    favicon: path.resolve(__dirname, '../public/favicon.ico'),
  }),
]
const jsFiles = fs.readdirSync(resolve('dll/js'))
jsFiles.forEach((file) => {
  plugins.push(
    new addAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll/js', file),
    })
  )
})
const jsonFiles = fs.readdirSync(resolve('dll/json'))
jsonFiles.forEach((file) => {
  plugins.push(
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll/json', file),
    })
  )
})

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: resolve('dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', 'json', '.ts'],
    alias: {
      '@': resolve('src'),
    },
  },
  resolveLoader: {
    modules: ['node_modules'],
  },
  module: {
    rules: [
      loader.css(),
      loader.scss(),
      loader.babel(),
      loader.images(),
      loader.fonts(),
      loader.medias(),
    ],
  },
  plugins,
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all', // 同步和异步加载模块都做代码分割
      minSize: 30000, // 模块大于30kb才做代码分割
      // maxSize: 50000, // 模块大于50kb进行二次拆分
      minChunks: 1, // 某个模块被引用一次就做代码分割(否则打包到入口文件中)
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
        },
        default: {
          chunks: 'initial', // 将项目本地的同步加载模块打包到一起,异步懒加载模块单独抽离(路由等)
          priority: -20,
          reuseExistingChunk: true, //如果一个模块已经被打包,再次打包忽略
          name: 'default',
        },
      },
    },
  },
  performance: false,
}
