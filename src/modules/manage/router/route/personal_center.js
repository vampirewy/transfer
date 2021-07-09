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
    redirect: '/personal_center',
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
      {
        path: '/personal_health/:id/:waitVisitId?', // waitVisitId待随访计划id
        name: 'personal_health', // intervention_plan
        meta: {
          title: '个人管理中心',
          // hideInMenu: true,
          // hideInBread: true, //
          // hideInTag: true,
        },
        component: () => import('../../views/personal_center/personal_health'),
      },
    ],
  },
];
