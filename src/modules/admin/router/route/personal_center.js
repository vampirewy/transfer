/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/8/20 下午8:52
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/20 下午8:52
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
