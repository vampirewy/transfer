/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

"use strict";
// Template version: 1.2.8
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: "static",
        assetsPublicPath: "/",

        // Various Dev Server settings
        host: "localhost", // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
        proxyTable: {
            '/api': {
                // target: "http://116.62.9.135:18080",  // 测试环境
                target: 'http://182.61.43.226:9001/api',//'http://116.62.9.135:5124', // nginx测试环境，配置了/api转发及图片访问 //'http://admin.ngrok.ggithub.cn',//
                changeOrigin: true,
                /* pathRewrite: {
                    "/api": "/"
                } */
            },
            '/uploadFiles': {
                target: 'http://182.61.43.226:9001',//'http://116.62.9.135:5124',
                changeOrigin: true,
            }
        },
        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: "cheap-module-eval-source-map",

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,
        cssSourceMap: true,
        showEslintErrorsInOverlay: false,
        useEslint: true,
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, "../dist/index.html"),

        // Paths
        assetsRoot: path.resolve(__dirname, "../dist"),
        assetsSubDirectory: "static",
        assetsPublicPath: "./",

        // vmRoot: path.resolve(__dirname, '../../bim-dynamic-springboot/bimb/bimb-execute/bimb-http-exe/src/main/resources/vm/bimpb'),
        vmRoot: path.resolve(__dirname, "../dist"),

        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: "#source-map",

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ["js", "css"],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report,
    },
};
