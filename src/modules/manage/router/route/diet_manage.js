/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 下午8:50
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 下午8:50
 */

import Main from '../../views/main.vue';

export default [
  {
    path: '/diet_manage',
    name: 'diet_manage',
    meta: {
      title: '膳食管理',
      // access: 'diet_management',
    },
    component: Main,
    children: [{
      path: '/',
      name: 'diet_programme',
      meta: {
        title: '膳食方案',
        // access: 'service_order',
      },
      component: () => import('../../views/diet_manage/index'),
    }],
  },
];
