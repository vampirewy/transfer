// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import CapsuleUI from '~/plugins/@zyf2e/capsule-ui/lib';
import app from './app.vue';
import api from '~/src/api/Server';
import jDynamic from '~/src/components/j_dynamic';
import axios from 'axios';
import store from './vuex';
import router from './router';
import preview from 'vue-photo-preview';
import 'vue-photo-preview/dist/skin.css';
import '~/src/assets/public/reset.scss';
import commonHref from '~/src/libs/util/commonHref';
import * as vueFilter from '~/src/libs/util/filter';

const API = { axios, store, api, jDynamic, commonHref };

const install = (vue, opts = {}) => {
  if (install.installed) return;
  const proto = vue;
  proto.prototype.$api = opts.api;
  proto.prototype.$jDynamic = opts.jDynamic;
  proto.prototype.$axios = opts.axios;
  proto.prototype.$store = opts.store;
  proto.prototype.commonHref = opts.commonHref;
};

install(Vue, API);
Vue.use(CapsuleUI);
Vue.use(preview); // 图片预览

Vue.config.devtools = true;
Object.keys(vueFilter).forEach((key) => {
  Vue.filter(key, vueFilter[key]);
});
Vue.prototype.getAccess = (val) => {
  const res = store.state.user.superAdmin || store.state.user.access.includes(val);
  return res;
};
/* eslint-disable */
new Vue({
  el: '#app',
  router,
  render: h => h(app),
});

