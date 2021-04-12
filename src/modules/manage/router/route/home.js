/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 17:48
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 17:48
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
