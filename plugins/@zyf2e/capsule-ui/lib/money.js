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
/******/ 	return __webpack_require__(__webpack_require__.s = 130);
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

/***/ 10:
/***/ (function(module, exports) {

module.exports = require("@zyf2e/capsule-ui/lib/input");

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/money/src/main.vue?vue&type=template&id=5e78bf37&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "el-money", class: _vm.classArr },
    [
      _c("el-input", {
        ref: "input",
        style: _vm.styleValue,
        attrs: {
          format: _vm.inputFormat,
          number: "",
          placeholder: _vm.placeholder,
          size: _vm.size,
          "false-value": "",
          resize: _vm.resize,
          disabled: _vm.disabled,
          readonly: _vm.readonly,
          autosize: _vm.autosize,
          suffixIcon: _vm.suffixIcon,
          prefixIcon: _vm.prefixIcon,
          label: _vm.label,
          clearable: _vm.clearable,
          showWordLimit: _vm.showWordLimit,
          tabindex: _vm.tabindex,
          value: _vm.newValue
        },
        on: {
          input: _vm.handleInput,
          change: _vm.handleChange,
          clear: function($event) {
            _vm.handleEvent("clear", $event)
          },
          blur: function($event) {
            _vm.handleEvent("blur", $event)
          },
          focus: function($event) {
            _vm.handleEvent("focus", $event)
          }
        },
        nativeOn: {
          paste: function($event) {
            _vm.handleEvent("paste", $event)
          }
        }
      }),
      _vm.unit
        ? _c("span", { staticClass: "el-money-util" }, [
            _vm._v(_vm._s(_vm.unitText))
          ])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/money/src/main.vue?vue&type=template&id=5e78bf37&

// EXTERNAL MODULE: external "@zyf2e/capsule-ui/lib/input"
var input_ = __webpack_require__(10);
var input_default = /*#__PURE__*/__webpack_require__.n(input_);

// EXTERNAL MODULE: external "@zyf2e/capsule-ui/lib/utils/number"
var number_ = __webpack_require__(44);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/money/src/main.vue?vue&type=script&lang=js&
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



/* harmony default export */ var mainvue_type_script_lang_js_ = ({
  name: 'ElMoney',
  components: {
    ElInput: input_default.a
  },
  props: {
    decimal: {
      type: Number,
      default: 2
    },
    times: {
      type: Number,
      default: 100
    },
    styleValue: null,

    unit: {
      type: Boolean,
      default: false
    },

    unitText: {
      type: String,
      default: '元'
    },

    unitPlacement: {
      // prefix  suffix  outer
      type: String,
      default: 'outer'
    },

    format: {
      type: Boolean,
      default: false
    },

    value: [String, Number],
    size: String,
    placeholder: String,
    resize: String,
    disabled: Boolean,
    readonly: Boolean,
    autosize: {
      type: [Boolean, Object],
      default: false
    },

    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },

    showWordLimit: {
      type: Boolean,
      default: false
    },
    tabindex: String
  },
  data: function data() {
    return {
      forceUpdate: 1
    };
  },

  computed: {
    classArr: function classArr() {
      return this.unit ? ['el-money-unit-wrapper', 'el-money-unit-' + this.unitPlacement] : null;
    },
    newValue: function newValue() {
      var value = this.value;
      if (value === null) {
        return null;
      }
      value = value ? Object(number_["divide"])(value, this.times) : value;
      return value;
    },
    inputFormat: function inputFormat() {
      var regStr = '^-?\\d*\\.?\\d{0,' + this.decimal + '}$';
      return new RegExp(regStr);
    }
  },
  methods: {
    handleInput: function handleInput(e) {
      this.$emit('input', e ? Object(number_["times"])(e, this.times) : e);
    },
    handleEvent: function handleEvent(type, e) {
      this.$emit(type, e);
    },
    handleChange: function handleChange(e) {
      this.$emit('change', e ? Object(number_["times"])(e, this.times) : e);
    }
  }
});
// CONCATENATED MODULE: ./packages/money/src/main.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_mainvue_type_script_lang_js_ = (mainvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/money/src/main.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_mainvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/money/src/main.vue"
/* harmony default export */ var main = (component.exports);
// CONCATENATED MODULE: ./packages/money/index.js


/* istanbul ignore next */
main.install = function (Vue) {
  Vue.component(main.name, main);
};

/* harmony default export */ var money = __webpack_exports__["default"] = (main);

/***/ }),

/***/ 44:
/***/ (function(module, exports) {

module.exports = require("@zyf2e/capsule-ui/lib/utils/number");

/***/ })

/******/ });