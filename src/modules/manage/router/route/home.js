/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/8/20 17:48
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/20 17:48
 */

import Main from '../../views/main.vue';

export default [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页',
      access: 'home',
    },
    redirect: '/home',
    component: Main,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          access: 'home',
        },
        component: () => import('../../views/home'),
      },
    ],
  },
];
