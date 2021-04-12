/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/10/22 13:18
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/10/22 13:18
 */

import Main from '../../views/main.vue';

export default [
  {
    path: '/service_items_manage',
    name: 'service_items_manage',
    meta: {
      title: '服务管理',
    },
    redirect: '/service_items_manage',
    component: Main,
    children: [
      {
        path: '/service_items_manage',
        name: 'service_items_manage',
        meta: {
          title: '服务项目管理',
        },
        component: () =>
          import('../../views/manage_views/service_items_manage'),
      },

      {
        path: '/service_items_manage/add',
        name: 'service_items_manage',
        meta: {
          title: '服务项目管理新增',
          type: 'service_items_manage_add',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/manage_views/service_items_manage/service_items_manage_add'),
      },
      {
        path: '/service_items_manage/edit/:id',
        name: 'service_items_manage',
        meta: {
          title: '服务项目管理编辑',
          type: 'service_items_manage_edit',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/manage_views/service_items_manage/service_items_manage_add'),
      },
      {
        path: '/service_items_manage/detail/:id',
        name: 'service_items_manage',
        meta: {
          title: '服务项目管理查看',
          type: 'service_items_manage_detail',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/manage_views/service_items_manage/service_items_manage_add'),
      },
      {
        path: '/service_order',
        name: 'service_order',
        meta: {
          title: '服务订单',
        },
        component: () => import('../../views/manage_views/service_items_manage/service_order'),
      },
      {
        path: '/service_order/create/',
        name: 'service_order_list',
        meta: {
          title: '服务订单新增',
          type: 1,
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/manage_views/service_items_manage/service_order/create_edit'),
      },
      {
        path: '/service_order/edit/:id',
        name: 'service_order_list',
        meta: {
          title: '服务订单操作',
          type: 2,
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/manage_views/service_items_manage/service_order/create_edit'),
      },
      {
        path: '/service_order/view/:id',
        name: 'service_order_list',
        meta: {
          title: '服务订单查看',
          type: 3,
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/manage_views/service_items_manage/service_order/create_edit'),
      },
    ],
  },
];
