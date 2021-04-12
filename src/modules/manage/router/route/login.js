/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 17:44
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 17:44
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true,
    },
    component: () => import('../../views/login/login.vue'),
  },
  // {
  //   path: '/register',
  //   name: 'register',
  //   meta: {
  //     title: '注册',
  //     hideInMenu: true,
  //   },
  //   component: () => import('../../views/login/register.vue'),
  // },
  {
    path: '/forget_password',
    name: 'forget_password',
    meta: {
      title: '忘记密码',
      hideInMenu: true,
    },
    component: () => import('../../views/login/forget_password.vue'),
  },
];
