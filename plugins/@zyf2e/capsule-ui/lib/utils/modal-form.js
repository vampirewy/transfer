'use strict';

exports.__esModule = true;
var checkType = exports.checkType = function checkType(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
};

var copyDeep = exports.copyDeep = function copyDeep(origin) {
  var result = void 0;
  if (Array.isArray(origin)) {
    result = [];
    origin.forEach(function (v) {
      return result.push(copyDeep(v));
    });
  } else if (checkType(origin) === 'Object') {
    result = {};
    [].concat(Object.keys(origin), Object.getOwnPropertySymbols(origin)).forEach(function (k) {
      result[k] = copyDeep(origin[k]);
    });
  } else {
    result = origin;
  }
  return result;
};

var isEmpty = exports.isEmpty = function isEmpty(val) {
  return [undefined, 'null', '""', '[]', '{}'].includes(JSON.stringify(val));
};