/**
 * @Author: csx
 * @Description 开发环境配置
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf'); // 基础配置
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件资源
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 编译html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 压缩css
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // 错误信息友好提示
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'); // 文件引用大小写判断
const InsertScriptPlugin = require('./insert.script.plugin'); // 插入自定义脚本
const TerserPlugin = require('terser-webpack-plugin'); // 加速编译
const portfinder = require('portfinder');
const inquirer = require('inquirer'); // 命令行交互工具
const api = require('../config/api'); // api地址
const env = require('../config/dev.env'); // 开发配置
const HOST = process.env.HOST; // 主机
const PORT = process.env.PORT && Number(process.env.PORT); // 端口
const DevScript = require('../config/dev.script'); // 开发配置信息
const DevCopy = require('../config/dev.copy'); // 拷贝开发资源

const devScript = new DevScript({
  publicPath: config.dev.assetsPublicPath
}).compiler();

env.api = JSON.stringify(api.dev);

/**
 * 解析路径
 * @param dir
 * @returns {string}
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

/**
 * 往html中插入脚本
 */
const insertHtmlWebpackPlugin = (() => {
  return (target = []) => {
    let array = [];
    target.forEach(file => {
      let json = devScript.find(item => item.name === file),
        cur_path = resolve('./src/modules/' + file),
        name = json.name;

      let obj = {
        template: path.join(cur_path, './index.html'),
        filename: path.join(name, './index.html'),
        inject: json.inject,
        name: name,
        showErrors: true,
        chunks: ['manifest', name]
      };

      array.push(new HtmlWebpackPlugin(obj));
    });

    return array;
  };
})();

/**
 * 获取入口文件
 */
const getEntry = (() => {
  return (target = []) => {
    let entry = {};
    target.forEach(file => {
      let json = devScript.find(item => item.name === file),
        cur_path = resolve('./src/modules/' + file);
      entry[file] = [path.resolve(path.join(cur_path, json.main))];
    });

    return entry;
  };
})();

/**
 * 命令行交互工具
 * @returns {*[]}
 */
const resolveFinalPrompts = () => {
  const pagesProps = devScript.map(item => {
    let {title, name} = item;
    return {name: `${title}（${name}）`, value: [`${name}`]};
  });

  const getPagePropsValue = devScript.map(it => it.name);
  const defaultProps = [
    {
      name: '全量编译',
      value: getPagePropsValue
    }
  ];

  const presetPrompt = {
    name: 'preset',
    type: 'list',
    message: `请选择需要热编译的模块：`,
    choices: [...defaultProps, ...pagesProps]
  };

  return [presetPrompt];
};

// 开发配置
const devWebpackConfig = merge(baseWebpackConfig, {
  entry: getEntry(),
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  output: {
    publicPath: config.dev.assetsPublicPath,
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[hash].js'),
    chunkFilename: utils.assetsPath('js/[id].[hash].js')
  },
  // these devServer options should be customized in /config/index.js
  devServer: {
    disableHostCheck: true,
    clientLogLevel: 'warning',
    historyApiFallback: { // 解析路由地址
      rewrites: [
        {
          from: /^(\/admin\/.*)|(\/admin)$/,
          to: path.resolve(
            __dirname,
            config.dev.assetsPublicPath + 'admin/index.html'
          )
        },
        {
          from: /.*/,
          to: path.resolve(
            __dirname,
            config.dev.assetsPublicPath + 'manage/index.html'
          )
        }
      ]
    },
    hot: true, // 开启热更新
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true, // 开启压缩
    host: HOST || config.dev.host, // 主机
    port: PORT || config.dev.port, // 端口
    open: config.dev.autoOpenBrowser, // 自动打开浏览器
    overlay: config.dev.errorOverlay ? {warnings: false, errors: true} : false,
    publicPath: config.dev.assetsPublicPath, // 公共路径
    proxy: config.dev.proxyTable, // 代理配置
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },
  optimization: { // 压缩
    namedModules: true,
    noEmitOnErrors: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        sourceMap: false
      })
    ]
  },
  plugins: [
    // 判断环境插件
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 压缩输出css
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      chunkFilename: utils.assetsPath('css/[id].[contenthash].css'),
      ignoreOrder: true // Enable to remove warnings about conflicting order
    }),
    // 检测大小写
    new CaseSensitivePathsPlugin(),
    // 热更新插件
    new webpack.HotModuleReplacementPlugin()
  ]
});

module.exports = new Promise(async (resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort(async (err, port) => {
    if (err) {
      reject(err);
    } else {
      let answers = await inquirer.prompt(resolveFinalPrompts());
      let target = answers.preset;

      // add entry props
      devWebpackConfig.entry = getEntry(target);
      // insert html webpack plugin
      devWebpackConfig.plugins.push(...insertHtmlWebpackPlugin(target));
      // insert script static plugin
      devWebpackConfig.plugins.push(
        new InsertScriptPlugin({script: devScript})
      );
      // copy custom static assets
      devWebpackConfig.plugins.push(
        new CopyWebpackPlugin(new DevCopy().insert())
      );

      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`
            ]
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
        })
      );

      resolve(devWebpackConfig);
    }
  });
});
