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
    path: '/service_manage',
    name: 'service_manage',
    meta: {
      title: '服务管理',
      access: 'service_management',
    },
    redirect: '/service_manage',
    component: Main,
    children: [
      {
        path: '/service_order',
        name: 'service_order',
        meta: {
          title: '服务订单',
          access: 'service_order',
          keepAlive: true,
        },
        component: () => import('../../views/service_manage/service_order'),
      },
      {
        path: '/service_order/create',
        name: 'service_order_list',
        meta: {
          title: '服务订单新增',
          access: 'service_order_add',
          type: 1,
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/service_manage/service_order/create_edit'),
      },
      {
        path: '/service_order/edit/:id',
        name: 'service_order_list',
        meta: {
          title: '服务订单操作',
          access: 'service_order_edit',
          type: 2,
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/service_manage/service_order/create_edit'),
      },
      {
        path: '/service_order/view/:id',
        name: 'service_order_list',
        meta: {
          title: '服务订单查看',
          access: 'service_order_view',
          type: 3,
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/service_manage/service_order/create_edit'),
      },
      {
        path: '/my_service',
        name: 'my_service',
        meta: {
          title: '我的服务',
          access: 'my_service',
          keepAlive: true,
        },
        component: () => import('../../views/service_manage/my_service'),
      },
      {
        path: '/my_service/create',
        name: 'my_service_list',
        meta: {
          title: '我的服务新增',
          access: 'my_service_add',
          type: 1,
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/service_manage/my_service/create_edit'),
      },
      {
        path: '/my_service/edit/:id',
        name: 'my_service_list',
        meta: {
          title: '我的服务编辑',
          access: 'my_service_edit',
          type: 2,
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/service_manage/my_service/create_edit'),
      },
      {
        path: '/my_service/view/:id',
        name: 'my_service_list',
        meta: {
          title: '我的服务查看',
          access: 'my_service_view',
          type: 3,
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/service_manage/my_service/create_edit'),
      },
    ],
  },
];
