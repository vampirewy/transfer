### 项目

健康管理项目

### 描述

使用hash路由，webpack多页应用，前台和后台管理各自独立分布，已集成登陆权限判断

### 目录结构

下面的目录是该项目基础目录结构，及目录的配置介绍。


```bush
├─build
|   ├─build.js                  // 生产构建
|   ├─check-versions.js         // 检测版本配置
|   ├─insert.script.plugin.js   // 注入js/css等脚本至html
|   ├─server.js                 // 生产启动服务脚本
|   ├─util.js                   // 工具库
|   ├─vue-loader.conf.js        // vue配置
|   ├─webpack.base.conf.js      // 基础配置
|   ├─webpack.dev.conf.js       // 开发配置
|   ├─webpack.dll.conf.js       // 打包dll配置
|   └webpack.prod.conf.js       // 生产配置
├─config
|   ├─api.js                   // 静态资源和服务域名配置
|   ├─dev.copy.js              // 开发资源拷贝
|   ├─dev.env.js               // 用于区分开发参数
|   ├─dev.script.js            // 开发资源<css|js...>脚本注入
|   ├─index.js                 // 暴露至外部
|   ├─pro.copy.js              // 生产资源拷贝
|   ├─prod.env.js              // 用于区分生产参数
|   ├─pro.script.js            // 生产资源<css|js...>脚本注入
├─dll
|   ├─css                      // 打包css
|   ├─js                       // 打包js
|   ├─manifest                 // 动态链json
|   ├─scss                     // scss语法会被注入至全局
├─libs
|   ├─directives               // 自定义指令   
|   ├─plugins                  // 存放插件库
|   ├─tools，util，wyboot       // 工具函数
├─src
|   ├─api                       // 存放http请求配置      
|   ├─assets                    // 存放静态资源
|   ├─components                // 自定义组件
|   ├─mock                      // mock数据
|   ├─modules                   // 业务功能模块
|       ├─manager
|           ├─router            // 路由配置
|           ├─views             // 业务页
|           ├─vuex              // 数据共享
|           ├─app.vue           // app.vue视口
|           ├─index.html        // 入口html
|           ├─main.js           // 主入口
|   ├─template                  // 模板
├─.bablerc                      // babel配置
├─.gitignore                    // 忽略文件配置
├─.npmrc                        // npm配置
├─postcssrc.js                  // 添加浏览器私缀
├─package.json                  // 依赖文件配置
├─README.md                     // README.md文档
```

### 开发环境配置说明

下面是我们要配置的功能，及搭建项目的思路和注意点

- 1.处理 vue 文件
- 2.使用 devServer
- 3.处理静态资源的插件和 loader
    - 3.1 处理 css/css 预处理器
    - 3.2 处理图片路径
    - 3.3 处理 ES6 语法
    - 3.4 postcss 自动添加 css 前缀
    - 3.5 在 vue 里开启 css module
- 4.代码规范约束配置
    - .eslint
    - .prettierrc
- 5.resolve 别名设置

### 1、处理vue文件

```vue
{
    test: /\.vue$/,
    loader: 'vue-loader',
    options: vueLoaderConfig
}
```

### 2、使用devServer

使用`devServer`需要安装`webpack-dev-server`

安装后，就可以去配置`devServe`，`devServer`可以有很多参数

因为一个项目在开发和生产环境下，有不同的需求。所以要有一个变量用来区分环境

当前做法是在`package.json`的`script`字段配置`cross-env`

`--max_old_space_size`表示`node`服务运行内存

`dll` 服务是编译一些公共dll文件

`lint` eslint语法检测

`lint-fix` eslint语法修复命令

```bash
"scripts": {
    "dev": "cross-env node --max_old_space_size=4096 node_modules/webpack-dev-server/bin/webpack-dev-server --host 0.0.0.0 --inline --config build/webpack.dev.conf.js",
    "build": "cross-env env_config=prod node --max_old_space_size=4096 build/build.js",
    "build:dev": "cross-env env_config=prod_dev node --max_old_space_size=4096 build/build.js",
    "dll": "cross-env NODE_ENV=production webpack --config build/webpack.dll.conf.js",
    "lint": "eslint --ext .js,.vue src/",
    "lint-fix": "eslint --fix --ext .js,.vue src/"
}
```

devServer 常用配置项

```text
devServer: {
    host: "localhost", // 本地服务地址
    port: 8080, // 端口
    autoOpenBrowser: false, // 自动打开浏览器
    proxyTable: { // 接口代理
        '/api': {
            target: 'http://116.62.9.135:5124', // nginx测试环境，配置了/api转发及图片访问
            changeOrigin: true,
        },
    },
    cssSourceMap: true, // 开启source map
    useEslint: true, // 打开eslint检测
    historyApiFallback: { // 正则匹配解析url
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
}
```

### 3、resolve 别名设置

```text
alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '~': path.resolve(__dirname, '../'),
    '@': path.resolve(__dirname, '../src')
}
```

### 4、处理 css/scss 预处理器

```text
rules: [{
    test: /\.(sa|sc|c)ss$/,
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
    test: /\.less$/,
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
]
```

### 5、处理图片路径

处理图片需要 url-loader

```text
{
    test: /\.(png|jpe?g|gif|svg|woff|ttf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 10000,
        name: utils.assetsPath('images/compress/[name].[hash:7].[ext]')
    }
},
```

### 6、eslint 检测

```text
const createLintingRule = () => ({
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

rules: [
  ...(process.env.NODE_ENV !== 'production' ? [createLintingRule()] : [])
]

```

### 7、plugins插件配置

```text
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
]
```

### 搭建环境准备

- node.js环境，版本v10.x以上
- npm 版本6.x以上

### 安装依赖

```bash
npm install
```

### 快速启动<dev>

运行dev后，请选择全量编译，会编译所有模块文件到开发环境中

```bash
npm run dev
```

### build
```bash
npm run build
```

### 注意

- dev编译好之后，浏览器打开直接点击登陆，就能进入管理页面
- router页面已经创建好，请直接找到对应模块开发

