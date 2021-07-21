/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 上午10:22
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 上午10:22
 */

export default [
  {
    path: '/basic_data/sport_list',
    name: 'sport_list',
    meta: {
      title: '运动库',
      access: 'sport_list',
      keepAlive: true,
    },
    component: () => import('../../../views/basic_data/sport_list'),
  },
  {
    path: '/basic_data/sport_list/create',
    name: 'sport_list_create_edit',
    meta: {
      title: '运动库新增',
      access: 'sport_list_add',
      type: 'sport_list_create',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/basic_data/sport_list/create_edit'),
  },
  {
    path: '/basic_data/sport_list/edit/:id',
    name: 'sport_list_create_edit',
    meta: {
      title: '运动库编辑',
      access: 'sport_list_edit',
      type: 'sport_list_edit',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/basic_data/sport_list/create_edit'),
  },
  {
    path: '/basic_data/sport_list/detail/:id',
    name: 'sport_list_detail',
    meta: {
      title: '运动库明细',
      access: 'sport_list_view',
      type: 'sport_list_detail',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () => import('../../../views/basic_data/sport_list/detail'),
  },
];
