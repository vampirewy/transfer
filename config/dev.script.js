/**
 * @Author: csx
 * @Description 开发注入脚本
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

module.exports = class DevScript {
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
      author: 'csx',
      inject: 'body',
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
      author: 'csx',
      inject: 'body',
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
