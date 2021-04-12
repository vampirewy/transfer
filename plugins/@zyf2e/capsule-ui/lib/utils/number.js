'use strict';

exports.__esModule = true;
exports.times = times;
exports.divide = divide;
function checkBoundary(num) {
  if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
    console.warn(num + ' is beyond boundary when transfer to integer, the results may not be accurate');
  }
}

function strip(num) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;

  return +parseFloat(num.toPrecision(precision));
}

function digitLength(num) {
  // Get digit length of e
  var eSplit = num.toString().split(/[eE]/);
  var len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}

function float2Fixed(num) {
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''));
  }
  var dLen = digitLength(num);
  return dLen > 0 ? strip(num * Math.pow(10, dLen)) : num;
}

function times(num1, num2) {
  for (var _len = arguments.length, others = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    others[_key - 2] = arguments[_key];
  }

  if (others.length > 0) {
    return times.apply(undefined, [times(num1, num2), others[0]].concat(others.slice(1)));
  }
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  var baseNum = digitLength(num1) + digitLength(num2);
  var leftValue = num1Changed * num2Changed;

  checkBoundary(leftValue);

  return leftValue / Math.pow(10, baseNum);
}

function divide(num1, num2) {
  for (var _len2 = arguments.length, others = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    others[_key2 - 2] = arguments[_key2];
  }

  if (others.length > 0) {
    return divide.apply(undefined, [divide(num1, num2), others[0]].concat(others.slice(1)));
  }
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  return times(num1Changed / num2Changed, Math.pow(10, digitLength(num2) - digitLength(num1)));
}