const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let dev = process.env.NODE_ENV === 'development'

let styleLoader = {
  loader: 'style-loader',
  options: {
    sourceMap: dev,
  },
}
// 处理 @import
let cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: dev,
  },
}

let postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: dev,
  },
}

let scssLoader = {
  loader: 'sass-loader',
}

// css
exports.css = () => {
  return {
    test: /\.css$/,
    exclude: /\.m\.css$/,
    use: [
      dev ? styleLoader : MiniCssExtractPlugin.loader,
      cssLoader,
      postcssLoader,
    ],
  }
}
// scss
exports.scss = () => {
  return {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      dev ? styleLoader : MiniCssExtractPlugin.loader,
      cssLoader,
      postcssLoader,
      scssLoader,
    ],
  }
}

// babel
exports.babel = () => {
  return {
    test: /\.(jsx|js)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
  }
}

// images
exports.images = () => {
  return {
    test: /\.(png|jpe?g|gif|webp|ico)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10240,
          outputPath: 'images',
          name: '[name]_[hash:8].[ext]',
        },
      },
    ],
  }
}

// fonts
exports.fonts = () => {
  return {
    test: /\.(woff(2)?|eot|ttf|otf|svg)(\?v=\d+\.\d+\.\d+)??$/,
    loader: 'url-loader',
    options: {
      limit: 10240,
      outputPath: 'fonts',
      name: '[name]_[hash:8].[ext]',
    },
  }
}

// media
exports.medias = () => {
  return {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 51200,
      outputPath: 'medias',
      name: '[name]_[hash:8].[ext]',
    },
  }
}
