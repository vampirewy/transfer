module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 140);
/******/ })
/************************************************************************/
/******/ ({

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./packages/clamp/src/clamp.js
/* eslint-disable */

/*!
 * Clamp.js 0.5.1
 *
 * Copyright 2011-2013, Joseph Schmitt http://joe.sh
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 */

/**
 * Clamps a text node.
 * @param {HTMLElement} element. Element containing the text node to clamp.
 * @param {Object} options. Options to pass to the clamper.
 */
function clamp_clamp(element, options) {
  options = options || {};

  var self = this,
      win = window,
      opt = {
    clamp: options.clamp || 2,
    useNativeClamp: typeof options.useNativeClamp != 'undefined' ? options.useNativeClamp : true,
    splitOnChars: options.splitOnChars || ['.', '-', '–', '—', ' '], // Split on sentences (periods), hypens, en-dashes, em-dashes, and words (spaces).
    animate: options.animate || false,
    truncationChar: options.truncationChar || '…',
    truncationHTML: options.truncationHTML
  },
      sty = element.style,
      originalText = element.innerHTML,
      supportsNativeClamp = typeof element.style.webkitLineClamp != 'undefined',
      clampValue = opt.clamp,
      isCSSValue = clampValue.indexOf && (clampValue.indexOf('px') > -1 || clampValue.indexOf('em') > -1),
      truncationHTMLContainer;

  if (opt.truncationHTML) {
    truncationHTMLContainer = document.createElement('span');
    truncationHTMLContainer.innerHTML = opt.truncationHTML;
  }

  // UTILITY FUNCTIONS __________________________________________________________

  /**
   * Return the current style for an element.
   * @param {HTMLElement} elem The element to compute.
   * @param {string} prop The style property.
   * @returns {number}
   */
  function computeStyle(elem, prop) {
    if (!win.getComputedStyle) {
      win.getComputedStyle = function (el, pseudo) {
        this.el = el;
        this.getPropertyValue = function (prop) {
          var re = /(\-([a-z]){1})/g;
          if (prop == 'float') prop = 'styleFloat';
          if (re.test(prop)) {
            prop = prop.replace(re, function () {
              return arguments[2].toUpperCase();
            });
          }
          return el.currentStyle && el.currentStyle[prop] ? el.currentStyle[prop] : null;
        };
        return this;
      };
    }

    return win.getComputedStyle(elem, null).getPropertyValue(prop);
  }

  /**
   * Returns the maximum number of lines of text that should be rendered based
   * on the current height of the element and the line-height of the text.
   */
  function getMaxLines(height) {
    var availHeight = height || element.clientHeight,
        lineHeight = getLineHeight(element);

    return Math.max(Math.floor(availHeight / lineHeight), 0);
  }

  /**
   * Returns the maximum height a given element should have based on the line-
   * height of the text and the given clamp value.
   */
  function getMaxHeight(clmp) {
    var lineHeight = getLineHeight(element);
    return lineHeight * clmp;
  }

  /**
   * Returns the line-height of an element as an integer.
   */
  function getLineHeight(elem) {
    var lh = computeStyle(elem, 'line-height');
    if (lh == 'normal') {
      // Normal line heights vary from browser to browser. The spec recommends
      // a value between 1.0 and 1.2 of the font size. Using 1.1 to split the diff.
      lh = parseInt(computeStyle(elem, 'font-size')) * 1.2;
    }
    return parseInt(lh);
  }

  // MEAT AND POTATOES (MMMM, POTATOES...) ______________________________________
  var splitOnChars = opt.splitOnChars.slice(0),
      splitChar = splitOnChars[0],
      chunks,
      lastChunk;

  /**
   * Gets an element's last child. That may be another node or a node's contents.
   */
  function getLastChild(elem) {
    // Current element has children, need to go deeper and get last child as a text node
    if (elem.lastChild.children && elem.lastChild.children.length > 0) {
      return getLastChild(Array.prototype.slice.call(elem.children).pop());
    }
    // This is the absolute last child, a text node, but something's wrong with it. Remove it and keep trying
    else if (!elem.lastChild || !elem.lastChild.nodeValue || elem.lastChild.nodeValue == '' || elem.lastChild.nodeValue == opt.truncationChar) {
        elem.lastChild.parentNode.removeChild(elem.lastChild);
        return getLastChild(element);
      }
      // This is the last child we want, return it
      else {
          return elem.lastChild;
        }
  }

  /**
   * Removes one character at a time from the text until its width or
   * height is beneath the passed-in max param.
   */
  function truncate(target, maxHeight) {
    if (!maxHeight) {
      return;
    }

    /**
     * Resets global variables.
     */
    function reset() {
      splitOnChars = opt.splitOnChars.slice(0);
      splitChar = splitOnChars[0];
      chunks = null;
      lastChunk = null;
    }

    var nodeValue = target.nodeValue.replace(opt.truncationChar, '');

    // Grab the next chunks
    if (!chunks) {
      // If there are more characters to try, grab the next one
      if (splitOnChars.length > 0) {
        splitChar = splitOnChars.shift();
      }
      // No characters to chunk by. Go character-by-character
      else {
          splitChar = '';
        }

      chunks = nodeValue.split(splitChar);
    }

    // If there are chunks left to remove, remove the last one and see if
    // the nodeValue fits.
    if (chunks.length > 1) {
      // console.log('chunks', chunks);
      lastChunk = chunks.pop();
      // console.log('lastChunk', lastChunk);
      applyEllipsis(target, chunks.join(splitChar));
    }
    // No more chunks can be removed using this character
    else {
        chunks = null;
      }

    // Insert the custom HTML before the truncation character
    if (truncationHTMLContainer) {
      target.nodeValue = target.nodeValue.replace(opt.truncationChar, '');
      element.innerHTML = target.nodeValue + ' ' + truncationHTMLContainer.innerHTML + opt.truncationChar;
    }

    // Search produced valid chunks
    if (chunks) {
      // It fits
      if (element.clientHeight <= maxHeight) {
        // There's still more characters to try splitting on, not quite done yet
        if (splitOnChars.length >= 0 && splitChar != '') {
          applyEllipsis(target, chunks.join(splitChar) + splitChar + lastChunk);
          chunks = null;
        }
        // Finished!
        else {
            return element.innerHTML;
          }
      }
    }
    // No valid chunks produced
    else {
        // No valid chunks even when splitting by letter, time to move
        // on to the next node
        if (splitChar == '') {
          applyEllipsis(target, '');
          target = getLastChild(element);

          reset();
        }
      }

    // If you get here it means still too big, let's keep truncating
    if (opt.animate) {
      setTimeout(function () {
        truncate(target, maxHeight);
      }, opt.animate === true ? 10 : opt.animate);
    } else {
      return truncate(target, maxHeight);
    }
  }

  function applyEllipsis(elem, str) {
    elem.nodeValue = str + opt.truncationChar;
  }

  // CONSTRUCTOR ________________________________________________________________

  if (clampValue == 'auto') {
    clampValue = getMaxLines();
  } else if (isCSSValue) {
    clampValue = getMaxLines(parseInt(clampValue));
  }

  var clampedText;
  var hideFlag;
  if (supportsNativeClamp && opt.useNativeClamp) {
    sty.overflow = 'hidden';
    sty.textOverflow = 'ellipsis';
    sty.webkitBoxOrient = 'vertical';
    sty.display = '-webkit-box';
    sty.webkitLineClamp = clampValue;
    // console.log(element);
    var sp = document.createElement('span');
    sp.style.display = 'inline-block';
    sp.innerHTML = originalText;
    document.body.appendChild(sp);
    var wied = parseInt(getComputedStyle(sp)['width']);
    var stw = parseInt(getComputedStyle(element)['width']);
    document.body.removeChild(sp);

    if (wied >= stw) {
      hideFlag = true;
    }

    if (isCSSValue) {
      sty.height = opt.clamp + 'px';
    }
  } else {
    var height = getMaxHeight(clampValue);
    if (height <= element.clientHeight) {
      clampedText = truncate(getLastChild(element), height);
    }
  }

  return {
    original: originalText,
    clamped: clampedText,
    hideFlag: hideFlag
  };
}

window.$clamp = clamp_clamp;
/* harmony default export */ var src_clamp = (clamp_clamp);
// EXTERNAL MODULE: external "@zyf2e/capsule-ui/lib/tooltip"
var tooltip_ = __webpack_require__(23);
var tooltip_default = /*#__PURE__*/__webpack_require__.n(tooltip_);

// CONCATENATED MODULE: ./packages/clamp/src/main.js


/* harmony default export */ var main = ({
  name: 'ElClamp',
  components: { ElTooltip: tooltip_default.a },
  props: {
    text: {
      // 内容
      type: String,
      default: ''
    },
    clampHeight: {
      type: [String, Number],
      default: 1
    },
    lastChar: {
      type: String,
      default: '...'
    },
    lastHTML: {
      type: String,
      default: ''
    },
    useNativeClamp: {
      type: Boolean,
      default: true
    },
    tip: {
      type: Object
    }
  },
  mounted: function mounted() {
    this.initClamp();
  },

  watch: {
    text: function text() {
      this.initClamp();
    }
  },
  data: function data() {
    return {
      clamped: false
    };
  },

  methods: {
    initClamp: function initClamp() {
      var _this = this;

      // 初始化组件
      var lastChar = this.lastChar,
          clampHeight = this.clampHeight,
          lastHTML = this.lastHTML,
          useNativeClamp = this.useNativeClamp;


      var clamp = clampHeight;
      var config = {
        clamp: clamp,
        useNativeClamp: useNativeClamp, // 原生支持的 直接使用原生
        truncationChar: lastChar, // 结尾插入字符串
        truncationHTML: lastHTML,
        animate: false
      };
      this.$nextTick(function () {
        if (_this.text) {
          var res = src_clamp(_this.$refs.clamp, config);
          _this.clamped = res.hideFlag;
        }
      });
    },
    reInit: function reInit() {
      var _this2 = this;

      var lastChar = this.lastChar,
          clampHeight = this.clampHeight,
          lastHTML = this.lastHTML,
          useNativeClamp = this.useNativeClamp;


      var clamp = clampHeight;
      var config = {
        clamp: clamp,
        useNativeClamp: useNativeClamp, // 原生支持的 直接使用原生
        truncationChar: lastChar, // 结尾插入字符串
        truncationHTML: lastHTML,
        animate: false
      };
      this.$nextTick(function () {
        if (_this2.text) {
          src_clamp(_this2.$refs.clamp, config);
        }
      });
    }
  },

  render: function render() {
    var h = arguments[0];
    var text = this.text,
        tip = this.tip,
        clamped = this.clamped;

    this.reInit();

    if (tip && clamped) {
      var content = tip.content,
          placement = tip.placement,
          effect = tip.effect,
          enterable = tip.enterable;

      var openDelay = tip['open-delay'];
      content = content || '';
      placement = placement || 'top';
      effect = effect || 'dark';
      enterable = enterable || true;
      openDelay = tip['open-delay'] || 0;

      return h(
        tooltip_default.a,
        {
          attrs: { content: content, placement: placement, 'open-delay': openDelay, enterable: enterable, effect: effect }
        },
        [h(
          'div',
          { 'class': 'el-clamp clamp-box' },
          [h(
            'span',
            { ref: 'clamp' },
            [{ text: text }]
          )]
        )]
      );
    }

    return h(
      'div',
      { 'class': 'el-clamp clamp-box', ref: 'clamp' },
      [{ text: text }]
    );
  }
});
// CONCATENATED MODULE: ./packages/clamp/index.js


/* istanbul ignore next */
main.install = function (Vue) {
  Vue.component(main.name, main);
};

/* harmony default export */ var packages_clamp = __webpack_exports__["default"] = (main);

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = require("@zyf2e/capsule-ui/lib/tooltip");

/***/ })

/******/ });