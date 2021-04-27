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
    path: '/system_manage',
    name: 'system_manage',
    meta: {
      title: '系统管理',
      access: 'system_manage',
    },
    redirect: '/staff_list',
    component: Main,
    children: [
      {
        path: '/staff_list',
        name: 'staff_list',
        meta: {
          title: '员工列表',
          access: 'staff_list',
          keepAlive: true,
        },
        component: () => import('../../views/system_manage/staff_manage'),
      },
      {
        path: '/role_list',
        name: 'role_list',
        meta: {
          title: '角色列表',
          access: 'role_list',
          keepAlive: true,
        },
        component: () => import('../../views/system_manage/role_manage'),
      },
      {
        path: '/role_configuration',
        name: 'role_configuration',
        meta: {
          title: '系统配置',
          access: 'role_configuration',
          keepAlive: true,
        },
        component: () => import('../../views/system_manage/system_configuration'),
      },
    ],
  },
];
