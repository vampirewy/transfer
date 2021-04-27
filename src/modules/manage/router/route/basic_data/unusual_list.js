/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 上午10:19
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 上午10:19
 */

export default [
  {
    path: '/basic_data/unusual_list',
    name: 'unusual_list',
    meta: {
      title: '异常库',
      access: 'unusual_list',
      keepAlive: true,
    },
    component: () => import('../../../views/basic_data/unusual_list'),
  },
  {
    path: '/basic_data/unusual_list/create',
    name: 'unusual_list',
    meta: {
      title: '异常库新增',
      access: 'unusual_list_add',
      type: 'unusual_list_create',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/basic_data/unusual_list/create_edit'),
  },
  {
    path: '/basic_data/unusual_list/edit/:id',
    name: 'unusual_list',
    meta: {
      title: '异常库编辑',
      access: 'unusual_list_edit',
      type: 'unusual_list_edit',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/basic_data/unusual_list/create_edit'),
  },
  {
    path: '/basic_data/unusual_list/detail/:id',
    name: 'unusual_list',
    meta: {
      title: '异常库明细',
      access: 'unusual_list_view',
      type: 'unusual_list_detail',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () => import('../../../views/basic_data/unusual_list/detail'),
  },
];
