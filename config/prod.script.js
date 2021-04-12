/**
 * @Author: jrucker
 * @Description 生产注入脚本
 * @Date: 2020/8/19 19:06
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/19 19:06
 */

const config = require('../config');
const path = require('path');
module.exports = class ProdScript {
  constructor(options) {
    this.publicPath = options.publicPath || '/';
  }

  compiler() {
    let manage = this.manage(); // 管理系统
    let admin = this.admin(); // 后台管理

    return [manage, admin];
  }

  manage() {
    let obj = {
      title: '健康管理系统',
      name: 'manage',
      main: './main.js',
      author: 'jrucker',
      inject: 'body',
      template: `!!ejs-loader!${path.resolve(
        __dirname,
        '../src/template/manage.ejs'
      )}`,
      filename: config.build.vmRoot + '/index.html',
      script: {
        css: [
          `${this.publicPath}static/css/common.min.css?v=[hash]`,
        ],
        js: [
          `${this.publicPath}static/js/extend.min.js?v=[hash]`,
          `${this.publicPath}static/js/common.min.js?v=[hash]`
        ]
      }
    };

    return obj;
  }

  admin() {
    let obj = {
      title: '后台管理',
      name: 'admin',
      main: './main.js',
      author: 'jrucker',
      inject: 'body',
      template: `!!ejs-loader!${path.resolve(
        __dirname,
        '../src/template/admin.ejs'
      )}`,
      filename: config.build.vmRoot + '/admin.html',
      script: {
        css: [
          `${this.publicPath}static/css/common.min.css?v=[hash]`,
          `http://at.alicdn.com/t/font_1113798_nklzr6lk7z.css`
        ],
        js: [
          `${this.publicPath}static/js/extend.min.js?v=[hash]`,
          `${this.publicPath}static/js/common.min.js?v=[hash]`
        ]
      }
    };

    return obj;
  }
};
