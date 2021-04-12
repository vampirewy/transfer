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
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("@zyf2e/capsule-ui/lib/utils/dom");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@zyf2e/capsule-ui/lib/utils/util");

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/image/src/image-viewer.vue?vue&type=template&id=5e73b307&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "viewer-fade" } }, [
    _c(
      "div",
      {
        staticClass: "el-image-viewer__wrapper",
        style: { "z-index": _vm.zIndex }
      },
      [
        _c("div", { staticClass: "el-image-viewer__mask" }),
        _c(
          "span",
          {
            staticClass: "el-image-viewer__btn el-image-viewer__close",
            on: { click: _vm.hide }
          },
          [_c("i", { staticClass: "el-icon-circle-close" })]
        ),
        !_vm.isSingle
          ? [
              _c(
                "span",
                {
                  staticClass: "el-image-viewer__btn el-image-viewer__prev",
                  class: { "is-disabled": !_vm.infinite && _vm.isFirst },
                  on: { click: _vm.prev }
                },
                [_c("i", { staticClass: "el-icon-arrow-left" })]
              ),
              _c(
                "span",
                {
                  staticClass: "el-image-viewer__btn el-image-viewer__next",
                  class: { "is-disabled": !_vm.infinite && _vm.isLast },
                  on: { click: _vm.next }
                },
                [_c("i", { staticClass: "el-icon-arrow-right" })]
              )
            ]
          : _vm._e(),
        _c(
          "div",
          { staticClass: "el-image-viewer__btn el-image-viewer__actions" },
          [
            _c("div", { staticClass: "el-image-viewer__actions__inner" }, [
              _c("i", {
                staticClass: "el-icon-zoom-out",
                on: {
                  click: function($event) {
                    _vm.handleActions("zoomOut")
                  }
                }
              }),
              _c("i", {
                staticClass: "el-icon-zoom-in",
                on: {
                  click: function($event) {
                    _vm.handleActions("zoomIn")
                  }
                }
              }),
              _c("i", { staticClass: "el-image-viewer__actions__divider" }),
              _c("i", { class: _vm.mode.icon, on: { click: _vm.toggleMode } }),
              _c("i", { staticClass: "el-image-viewer__actions__divider" }),
              _c("i", {
                staticClass: "el-icon-refresh-left",
                on: {
                  click: function($event) {
                    _vm.handleActions("anticlocelise")
                  }
                }
              }),
              _c("i", {
                staticClass: "el-icon-refresh-right",
                on: {
                  click: function($event) {
                    _vm.handleActions("clocelise")
                  }
                }
              })
            ])
          ]
        ),
        _c(
          "div",
          { staticClass: "el-image-viewer__canvas" },
          _vm._l(_vm.urlList, function(url, i) {
            return i === _vm.index
              ? _c("img", {
                  key: url,
                  ref: "img",
                  refInFor: true,
                  staticClass: "el-image-viewer__img",
                  style: _vm.imgStyle,
                  attrs: { src: _vm.currentImg },
                  on: {
                    load: _vm.handleImgLoad,
                    error: _vm.handleImgError,
                    mousedown: _vm.handleMouseDown
                  }
                })
              : _vm._e()
          }),
          0
        )
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/image/src/image-viewer.vue?vue&type=template&id=5e73b307&

// EXTERNAL MODULE: external "@zyf2e/capsule-ui/lib/utils/dom"
var dom_ = __webpack_require__(2);

// EXTERNAL MODULE: external "@zyf2e/capsule-ui/lib/utils/util"
var util_ = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/image/src/image-viewer.vue?vue&type=script&lang=js&
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'el-icon-full-screen'
  },
  ORIGINAL: {
    name: 'original',
    icon: 'el-icon-c-scale-to-original'
  }
};

var mousewheelEventName = Object(util_["isFirefox"])() ? 'DOMMouseScroll' : 'mousewheel';

/* harmony default export */ var image_viewervue_type_script_lang_js_ = ({
  name: 'ElImageViewer',
  props: {
    urlList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    onSwitch: {
      type: Function,
      default: function _default() {}
    }
  },
  data: function data() {
    return {
      index: 0,
      isShow: false,
      infinite: true,
      loading: false,
      mode: Mode.CONTAIN,
      transform: {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      }
    };
  },

  computed: {
    isSingle: function isSingle() {
      return this.urlList.length <= 1;
    },
    isFirst: function isFirst() {
      return this.index === 0;
    },
    isLast: function isLast() {
      return this.index === this.urlList.length - 1;
    },
    currentImg: function currentImg() {
      return this.urlList[this.index];
    },
    imgStyle: function imgStyle() {
      var _transform = this.transform,
          scale = _transform.scale,
          deg = _transform.deg,
          offsetX = _transform.offsetX,
          offsetY = _transform.offsetY,
          enableTransition = _transform.enableTransition;

      var style = {
        transform: 'scale(' + scale + ') rotate(' + deg + 'deg)',
        transition: enableTransition ? 'transform .3s' : '',
        'margin-left': offsetX + 'px',
        'margin-top': offsetY + 'px'
      };
      if (this.mode === Mode.CONTAIN) {
        style.maxWidth = style.maxHeight = '100%';
      }
      return style;
    }
  },
  watch: {
    index: {
      handler: function handler(val) {
        this.reset();
        this.onSwitch(val);
      }
    },
    currentImg: function currentImg(val) {
      var _this = this;

      this.$nextTick(function (_) {
        var $img = _this.$refs.img[0];
        if (!$img.complete) {
          _this.loading = true;
        }
      });
    }
  },
  methods: {
    hide: function hide() {
      this.deviceSupportUninstall();
      this.$emit('close', this.transform);
    },
    deviceSupportInstall: function deviceSupportInstall() {
      var _this2 = this;

      this._keyDownHandler = Object(util_["rafThrottle"])(function (e) {
        var keyCode = e.keyCode;
        switch (keyCode) {
          // ESC
          case 27:
            _this2.hide();
            break;
          // SPACE
          case 32:
            _this2.toggleMode();
            break;
          // LEFT_ARROW
          case 37:
            _this2.prev();
            break;
          // UP_ARROW
          case 38:
            _this2.handleActions('zoomIn');
            break;
          // RIGHT_ARROW
          case 39:
            _this2.next();
            break;
          // DOWN_ARROW
          case 40:
            _this2.handleActions('zoomOut');
            break;
        }
      });
      this._mouseWheelHandler = Object(util_["rafThrottle"])(function (e) {
        var delta = e.wheelDelta ? e.wheelDelta : -e.detail;
        if (delta > 0) {
          _this2.handleActions('zoomIn', {
            zoomRate: 0.015,
            enableTransition: false
          });
        } else {
          _this2.handleActions('zoomOut', {
            zoomRate: 0.015,
            enableTransition: false
          });
        }
      });
      Object(dom_["on"])(document, 'keydown', this._keyDownHandler);
      Object(dom_["on"])(document, mousewheelEventName, this._mouseWheelHandler);
    },
    deviceSupportUninstall: function deviceSupportUninstall() {
      Object(dom_["off"])(document, 'keydown', this._keyDownHandler);
      Object(dom_["off"])(document, mousewheelEventName, this._mouseWheelHandler);
      this._keyDownHandler = null;
      this._mouseWheelHandler = null;
    },
    handleImgLoad: function handleImgLoad(e) {
      this.loading = false;
    },
    handleImgError: function handleImgError(e) {
      this.loading = false;
      e.target.alt = '加载失败';
    },
    handleMouseDown: function handleMouseDown(e) {
      var _this3 = this;

      if (this.loading || e.button !== 0) return;
      var _transform2 = this.transform,
          offsetX = _transform2.offsetX,
          offsetY = _transform2.offsetY;

      var startX = e.pageX;
      var startY = e.pageY;
      this._dragHandler = Object(util_["rafThrottle"])(function (ev) {
        _this3.transform.offsetX = offsetX + ev.pageX - startX;
        _this3.transform.offsetY = offsetY + ev.pageY - startY;
      });
      Object(dom_["on"])(document, 'mousemove', this._dragHandler);
      Object(dom_["on"])(document, 'mouseup', function (ev) {
        Object(dom_["off"])(document, 'mousemove', _this3._dragHandler);
      });
      e.preventDefault();
    },
    reset: function reset() {
      this.transform = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      };
    },
    toggleMode: function toggleMode() {
      if (this.loading) return;
      var modeNames = Object.keys(Mode);
      var modeValues = Object.values(Mode);
      var index = modeValues.indexOf(this.mode);
      var nextIndex = (index + 1) % modeNames.length;
      this.mode = Mode[modeNames[nextIndex]];
      this.reset();
    },
    prev: function prev() {
      if (this.isFirst && !this.infinite) return;
      var len = this.urlList.length;
      this.index = (this.index - 1 + len) % len;
    },
    next: function next() {
      if (this.isLast && !this.infinite) return;
      var len = this.urlList.length;
      this.index = (this.index + 1) % len;
    },
    handleActions: function handleActions(action) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.loading) return;

      var _zoomRate$rotateDeg$e = _extends({
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true
      }, options),
          zoomRate = _zoomRate$rotateDeg$e.zoomRate,
          rotateDeg = _zoomRate$rotateDeg$e.rotateDeg,
          enableTransition = _zoomRate$rotateDeg$e.enableTransition;

      var transform = this.transform;

      switch (action) {
        case 'zoomOut':
          if (transform.scale > 0.2) {
            transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3));
          }
          break;
        case 'zoomIn':
          transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
          break;
        case 'clocelise':
          transform.deg += rotateDeg;
          break;
        case 'anticlocelise':
          transform.deg -= rotateDeg;
          break;
      }
      transform.enableTransition = enableTransition;
    }
  },
  mounted: function mounted() {
    this.deviceSupportInstall();
  }
});
// CONCATENATED MODULE: ./packages/image/src/image-viewer.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_image_viewervue_type_script_lang_js_ = (image_viewervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/image/src/image-viewer.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_image_viewervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/image/src/image-viewer.vue"
/* harmony default export */ var image_viewer = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image_src_image_viewer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);


/* istanbul ignore next */
_image_src_image_viewer__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = function (Vue) {
  Vue.component(_image_src_image_viewer__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _image_src_image_viewer__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_image_src_image_viewer__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ })

/******/ });