/**
 * @Author: csx
 * @Description 启动一个express服务，用于访问dist生成后的资源
 * @Date: 2021/4/15 10:41
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 10:41
 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const proxyMiddleware = require('http-proxy-middleware'); // 中间件

app.use(express.static(path.resolve(__dirname, '../dist'))); // 静态资源路径

// 代理服务
const proxyTable = {
  '/api': {
    target: 'http://182.61.43.226:9001/api', //'http://116.62.9.135:5124',
    changeOrigin: true,
    pathRewrite: {
      "/api": ""
    }
  }
};

Object.keys(proxyTable).forEach(function(context) {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = {target: options};
  }
  app.use(proxyMiddleware(options.filter || context, options));
});

// 正则匹配url
app.get(/^(\/admin\/.*)|(\/admin)$/, function(req, res) {
  const html = fs.readFileSync(
    path.resolve(__dirname, '../dist/admin.html'),
    'utf-8'
  );
  res.send(html);
});

app.get('*', function(req, res) {
  const html = fs.readFileSync(
    path.resolve(__dirname, '../dist/index.html'),
    'utf-8'
  );
  res.send(html);
});

// 端口
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
