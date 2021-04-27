/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import Vue from 'vue';
import Router from 'vue-router';
import routes from './routers';
import store from '../vuex';
import {
  canTurnTo,
  setTitle,
  localRead,
} from '~/src/libs/util';

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) { // 防止点击重复路由
  return originalPush.call(this, location).catch(err => err);
};
// 路由配置
const router = new Router({
  routes,
  mode: 'hash',
});

const turnTo = (to, user, next) => {
  const can = canTurnTo(to.name, user.access, routes);
  if (user.superAdmin || can) next();
  // 有权限，可访问
  else next({ replace: true, name: 'error_401' }); // 无权限，重定向到401页面
};

router.beforeEach((to, from, next) => {
  const userInfo = localRead('HK_USER_INFO');
  const accessInfo = localRead('HK_ACCESS') ? JSON.parse(localRead('HK_ACCESS')) : '';
  if (['login', 'forget_password'].includes(to.name) && !userInfo) {
    next();
  } else if (userInfo) {
    const user = JSON.parse(userInfo);
    store.commit('user/SET_ACCESS', accessInfo);
    store.commit('user/SET_AVATAR', user.headImage);
    store.commit('user/SET_USER_NAME', user.realName);
    store.commit('user/SET_USER_ID', user.userId);
    store.commit('user/SET_SUPER_ADMIN', user.isSuperAdmin);
    store.commit('user/SET_HAS_GET_INFO', true);
    turnTo(to, store.state.user, next);
  } else {
    next({
      name: 'login',
    });
  }
});

router.afterEach((to) => {
  setTitle(to, router.app);
  window.scrollTo(0, 0);
});

export default router;
