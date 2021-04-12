/**
 * @Author: csx
 * @Description 基本配置
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

'use strict';
const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
const utils = require('./utils'); // 工具库
const config = require('../config'); // 接口api配置文件
const vueLoaderConfig = require('./vue-loader.conf'); // vue loader插件配置
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 显示编译进度
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 打包css
const {VueLoaderPlugin} = require('vue-loader'); // vue loader插件

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({ // eslint配置
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src')],
    exclude: [
        /node_modules/,
    ],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: config.dev.showEslintErrorsInOverlay,
    }
});

let webpackConfig = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    context: path.resolve(__dirname, '../'),
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: { // 别名解析
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '~': path.resolve(__dirname, '../'),
            '@': path.resolve(__dirname, '../src')
        }
    },
    module: { // 解析规则
        rules: [
            ...(process.env.NODE_ENV !== 'production' ? [createLintingRule()] : []),
            { // 加载vue-loader插件
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.(sa|sc|c)ss$/, // css/scss预处理器
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer")({
                                    browsers: [
                                        "ie >= 11",
                                        "ff >= 30",
                                        "chrome >= 34",
                                        "safari >= 7",
                                        "opera >= 23",
                                        "ios >= 7",
                                        "android >= 4.4",
                                        "bb >= 10"
                                    ]
                                })
                            ]
                        }
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.less$/, // less预处理器
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer")({
                                    browsers: [
                                        "ie >= 11",
                                        "ff >= 30",
                                        "chrome >= 34",
                                        "safari >= 7",
                                        "opera >= 23",
                                        "ios >= 7",
                                        "android >= 4.4",
                                        "bb >= 10"
                                    ]
                                })
                            ]
                        }
                    },
                    'less-loader',
                ],
            },
            { // 处理图片路径
                test: /\.(png|jpe?g|gif|svg|woff|ttf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('images/compress/[name].[hash:7].[ext]')
                }
            },
        ]
    },
    // 增加一个plugins
    plugins: [
        new webpack.LoaderOptionsPlugin({options: {}}), // 用于兼容eslint运行是无法获取eslint错误
        new ProgressBarPlugin({ // webpack编译进度显示
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
        }),
        new VueLoaderPlugin(), // 加载vueLoader插件
        new webpack.DllReferencePlugin({ // 加载dll插件
            context: process.cwd(),
            manifest: require(path.resolve(__dirname, '../dll', 'manifest', 'extend-manifest.json'))
        }),
    ],
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};

module.exports = webpackConfig;
