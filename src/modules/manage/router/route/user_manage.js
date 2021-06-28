/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 下午8:45
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 下午8:45
 */

import Main from '../../views/main.vue';

export default [
  {
    path: '/user_manage',
    name: 'user_manage',
    meta: {
      title: '客户管理',
      access: 'customer_management',
    },
    redirect: '/user_manage',
    component: Main,
    children: [
      {
        path: '/customer_pool',
        name: 'customer_pool',
        meta: {
          title: '我的客户',
          access: 'customer_pool',
          keepAlive: true,
        },
        component: () => import('../../views/user_manage'),
      },
      {
        path: '/user_edit/:userId?',
        name: 'user_edit',
        meta: {
          title: '',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/user_manage/user_edit.vue'),
      },
      {
        path: '/customers',
        name: 'customers',
        meta: {
          title: '负责客户',
          access: 'customers',
          keepAlive: true,
        },
        component: () => import('../../views/user_manage/duty.vue'),
      },
      {
        path: '/company_manage',
        name: 'company_manage',
        meta: {
          title: '单位管理',
          access: 'company_manage',
          keepAlive: true,
        },
        component: () => import('../../views/company_manage'),
      },
      {
        path: '/type_manage',
        name: 'type_manage',
        meta: {
          title: '类别管理',
          access: 'type_manage',
          keepAlive: true,
        },
        component: () => import('../../views/category_manage'),
      },
      {
        path: '/esuser_manageassessment',
        name: 'esuser_manageassessment',
        meta: {
          title: '效价评估',
          access: 'esuser_manageassessment',
          keepAlive: true,
        },
        component: () => import('../../views/user_manageassessment'),
      },
      {
        path: '/category_manage/detail/:id',
        name: 'category_manage',
        meta: {
          title: '类别管理',
          access: '',
          type: '3',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/category_manage/create_edit'),
      },
      {
        path: '/category_manage/category_manage/edit/:id',
        name: 'category_manage',
        meta: {
          title: '类别管理',
          access: '',
          type: '2',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/category_manage/create_edit'),
      },
      {
        path: '/category_manage/category_manage/create',
        name: 'category_manage',
        meta: {
          title: '类别管理',
          access: '',
          type: '1',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/category_manage/create_edit'),
      },
    ],
  },
];
