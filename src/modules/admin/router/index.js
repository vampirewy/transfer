/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/8/19 19:06
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/19 19:06
 */

import Vue from 'vue';
import Router from 'vue-router';
import routes from './routers';
import store from '../vuex';
import { canTurnTo, setTitle, localRead } from '~/src/libs/util';

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) { // 防止点击重复路由
  return originalPush.call(this, location).catch(err => err);
};
// 路由配置
const router = new Router({
  routes,
  base: '/admin',
  mode: 'hash',
});

const turnTo = (to, user, next) => {
  const can = canTurnTo(to.name, user.access, routes);
  if (user.superAdmin || can) next();
  // 有权限，可访问
  else next({ replace: true, name: 'error_401' }); // 无权限，重定向到401页面
};

router.beforeEach((to, from, next) => {
  const userInfo = localRead('USER_INFO');
  if (to.name === 'login' && !userInfo) {
    next();
  } else if (userInfo) {
    const user = JSON.parse(userInfo);
    store.commit('user/SET_TOKEN', user.sid);
    store.commit('user/SET_AVATAR', user.headImage);
    store.commit('user/SET_USER_NAME', user.realName);
    store.commit('user/SET_USER_ID', user.userId);
    store.commit('user/SET_SUPER_ADMIN', user.isSuperAdmin);
    store.commit('user/SET_ACCESS', user.menuIds);
    store.commit('user/SET_HAS_GET_INFO', true);
    turnTo(to, store.state.user, next);
  } else {
    window.location.href = '/#/login';
  }

  /* const token = getToken();
  const loginModulePages = [LOGIN_PAGE_NAME, REGISTER_PAGE_NAME, FORGET_PASSWORD_PAGE_NAME];
  const loginPending = localRead('LOGIN_PENDING') === 'true';
  if (!token && !loginModulePages.includes(to.name)) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    });
  } else if (!token && loginModulePages.includes(to.name)) {
    // 未登陆且要跳转的页面是登录页
    next(); // 跳转
  } else if (token && loginPending && to.name === LOGIN_PAGE_NAME) { // 填写机构信息 登录页面
    next();
  } else if (token && loginPending && to.name !== LOGIN_PAGE_NAME) { // 填写机构信息 非登录页面跳转登录页面
    next({name: LOGIN_PAGE_NAME});
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    });
  } else if (store.state.user.hasGetInfo) {
    turnTo(to, store.state.user, next);
  } else {
    const userInfo = localRead('USER_INFO');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      store.commit('user/SET_TOKEN', user.sid);
      store.commit('user/SET_AVATAR', user.avatar);
      store.commit('user/SET_USER_NAME', user.realName);
      store.commit('user/SET_USER_ID', user.userId);
      store.commit('user/SET_SUPER_ADMIN', user.isSuperAdmin);
      store.commit('user/SET_ACCESS', user.menuIds);
      store.commit('user/SET_HAS_GET_INFO', true);
      turnTo(to, store.state.user, next);
    } else {
      setToken('');
      next({
        name: 'login'
      });
    }
  }*/
});

router.afterEach((to) => {
  setTitle(to, router.app);
  window.scrollTo(0, 0);
});

export default router;
