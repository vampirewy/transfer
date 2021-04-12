/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 17:51
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 17:51
 */

export default [
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true,
    },
    component: () => import('../../views/error_page/401.vue'),
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true,
    },
    component: () => import('../../views/error_page/500.vue'),
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true,
    },
    component: () => import('../../views/error_page/404.vue'),
  },
];
