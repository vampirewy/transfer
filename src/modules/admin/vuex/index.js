/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import Vue from 'vue';
import Vuex from 'vuex';
import app from './app';
import user from './user';

Vue.use(Vuex);

const modules = {
  modules: {
    app,
    user,
  },
};

const store = new Vuex.Store(modules);

export default store;
