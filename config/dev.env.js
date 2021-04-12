/**
 * @Author: jrucker
 * @Description 开发环境参数
 * @Date: 2020/8/19 19:06
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/19 19:06
 */

'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
});
