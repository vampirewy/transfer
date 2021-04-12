/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 下午8:52
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 下午8:52
 */

import Main from '../../views/main.vue';

export default [
  {
    path: '/personal_center',
    name: 'personal_center',
    meta: {
      title: '个人中心',
      hideInMenu: true,
      hideInBread: true,
    },
    component: Main,
    children: [
      {
        path: '/personal_center',
        name: 'personal_center',
        meta: {
          title: '个人中心',
          hideInMenu: true,
          hideInBread: true,
        },
        component: () => import('../../views/personal_center'),
      },
    ],
  },
];
