/**
 * @Author: csx
 * @Description dll插件打包
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

const path = require('path');
const webpack = require('webpack');
const rootpath = path.resolve(__dirname, '../');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // js压缩

module.exports = {
    mode: 'production',
    entry: {
        extend: [
            'vue/dist/vue.esm.js',
            'vue-router',
            'vuex',
            'axios',
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
    },
    output: {
        /* 打包后生成文件的路径 */
        path: path.join(rootpath, "dll/js"),
        filename: '[name].min.js',
        library: '[name]_[hash]',
    },
    plugins: [
        // 打包entry里配置的包
        new webpack.DllPlugin({
            context: process.cwd(),
            path: path.join(rootpath, 'dll/manifest', '[name]-manifest.json'),
            name: '[name]_[hash]',
        }),
        // 压缩js
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: { // 压缩去除多余信息
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true
                },
                output: { // 输出美化
                    beautify: false,
                    comments: false
                }
            },
            sourceMap: false, // 关闭sourceMap
            parallel: true // 开启多线程
        }),
    ]
};
