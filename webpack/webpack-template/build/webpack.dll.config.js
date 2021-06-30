const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: {
        antd:['antd']
    },
    output:{
        filename: 'js/[name].dll.js',
        path: path.resolve(__dirname,'../dll'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname,'../dll/json/[name].manifest.json')
        })
    ]
}