/**
 * @Author: csx
 * @Description 生产环境配置
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge') // 合并配置
const baseWebpackConfig = require('./webpack.base.conf') // 基础配置
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝资源
const HtmlWebpackPlugin = require('html-webpack-plugin') // html插件
const cleanWebpackPlugin = require('clean-webpack-plugin') // 用于清除文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 压缩css
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 错误友好提示
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'); // 文件引用大小写检测
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const InsertScriptPlugin = require('./insert.script.plugin') // 注入脚本文件
const TerserPlugin = require('terser-webpack-plugin'); // 编译加速
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// api配置
const api = require('../config/api')
const env = require('../config/prod.env')

// 生产配置脚本
const ProdScript = require('../config/prod.script')
const ProdCopy = require('../config/prod.copy')

/**
 * 解析路径
 * @param dir
 * @returns {string}
 */
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

/**
 * 收集脚本
 * @returns {Map<any, any>}
 */
const actions = () => {
    const functionA = () => env.api = JSON.stringify(api.build)
    // const functionB = () => env.api = JSON.stringify(api.build_dev)
    const functionTest = ()=> env.api = JSON.stringify(api.test)
    return new Map([
        ['prod', functionA],
        // ['prod_dev', functionB],
        ['test',functionTest],
    ])
}

function env_config(identity) {
    let action = [...actions()].filter(([key, value]) => key === identity)
    action.forEach(([key, value]) => value.call(this))
}

env_config(process.env.env_config)

// 静态资源路径
const static_url = JSON.parse(env.api).static_url

// 开始编译注入
const prodScript = new ProdScript({publicPath: static_url}).compiler()

/**
 * 获取入口文件
 */
const getEntry = (() => {
    return () => {
        let entry = {}

        prodScript.map(item => {
            let {name, main} = item
            let cur_path = resolve('./src/modules/' + name)
            entry[name] = [path.resolve(path.join(cur_path, main))]
        })

        return entry
    }
})()

/**
 * 注入htmlWebpackPlugin插件
 */
const insertHtmlWebpackPlugin = (() => {
    return () => {
        let array = []

        prodScript.map(item => {
            let {title, name, inject, template, filename} = item
            let injectArgument = item.injectArgument || {}
            let DEFAULT = {
                template: template, // 模板地址
                filename: filename, // 文件原路径
                inject: inject, // 注入方式
                title: title, // 标题
                name: name, // 名称
                minify: { // 美化html输出
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunks: ['manifest', name]
            }
            let obj = Object.assign(DEFAULT, injectArgument)
            array.push(new HtmlWebpackPlugin(obj))
        })

        return array
    }
})()

const webpackConfig = merge(baseWebpackConfig, {
    entry: getEntry(), // 入口文件
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        publicPath: static_url, // 公共路径
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'), // 生成文件路径
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js') // 拆分模块成js文件
    },
    optimization: { // 压缩配置
        noEmitOnErrors: true, // 关闭错误信息
        concatenateModules: true,
        minimizer: [
            new TerserPlugin({
                parallel: true, // 多线程加速
                cache: true, // 开启缓存
                sourceMap: false, // 关闭sourceMap
            }),
            new OptimizeCSSPlugin({
                cssProcessorOptions: config.build.productionSourceMap
                    ? {safe: true, map: {inline: false}}
                    : {safe: true}
            }),
        ],
    },
    performance: { // 性能监测
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000,
    },
    plugins: [
        // 清空dist文件
        new cleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, '../')
        }),
        // 错误友好提示
        new FriendlyErrorsPlugin(),
        // 大小写检测
        new CaseSensitivePathsPlugin(),
        // 判断环境
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // 压缩并输出css文件
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            chunkFilename: utils.assetsPath('css/[id].[contenthash].css'),
            ignoreOrder: true,
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // This instance extracts shared chunks from code splitted chunks and bundles them
        ...insertHtmlWebpackPlugin(), // 注入html
        new InsertScriptPlugin({
            script: prodScript
        }),
        // copy custom static assets param array [url1,url2]
        new CopyWebpackPlugin(new ProdCopy().insert()), // 拷贝资源
        new UglifyJsPlugin({
            cache:true,
            uglifyOptions:{
                compress:{
                    drop_console:true,
                    drop_debugger:true
                },
                output:{
                    beautify:false
                }
            }
        })
    ]
})

if (config.build.productionGzip) { // 开启Gzip
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) { // 开启包分析
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
