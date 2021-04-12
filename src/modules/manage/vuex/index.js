/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/8/19 19:06
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/19 19:06
 */

import Vue from 'vue';
import Vuex from 'vuex';
import app from './app';
import user from './user';
import intervention from './intervention';

Vue.use(Vuex);

const modules = {
  modules: {
    app,
    user,
    intervention,
  },
};

const store = new Vuex.Store(modules);

export default store;
