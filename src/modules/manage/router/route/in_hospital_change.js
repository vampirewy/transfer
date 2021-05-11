/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 下午9:05
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 下午9:05
 */

import Main from '../../views/main.vue';

export default [
  {
    path: '/in_hospital_change',
    name: 'in_hospital_change',
    meta: {
      title: '院内转诊',
      access: 'in_hospital_change',
    },
    redirect: '/in_hospital_change',
    component: Main,
    children: [
      {
        path: '/in_hospital_change',
        name: 'in_hospital_change',
        meta: {
          title: '院内转诊',
          access: 'in_hospital_change',
          keepAlive: true,
        },
        component: () => import('../../views/in_hospital_change'),
      },
      {

        path: '/in_hospital_change_create',
        name: 'in_hospital_change_create',
        meta: {
          title: '新增预约',
          access: 'in_hospital_change_create',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/in_hospital_change/form'),
      },
      {

        path: '/in_hospital_change_detail/:id',
        name: 'in_hospital_change_detail',
        meta: {
          title: '预约详情',
          access: 'in_hospital_change_detail',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/in_hospital_change/detail'),
      },
    ],
  },
];
