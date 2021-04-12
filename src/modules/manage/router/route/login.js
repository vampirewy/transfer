/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/8/20 17:44
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/20 17:44
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
