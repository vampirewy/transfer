/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/8/29 上午10:22
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/29 上午10:22
 */

export default [
  {
    path: '/plan_center/sport_list',
    name: 'sport_list',
    meta: {
      title: '运动库',
      access: 'sport_list',
    },
    component: () => import('../../../views/plan_center/sport_list'),
  },
  {
    path: '/plan_center/sport_list/create',
    name: 'sport_list',
    meta: {
      title: '运动库新增',
      access: 'sport_list_add',
      type: 'sport_list_create',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/plan_center/sport_list/create_edit'),
  },
  {
    path: '/plan_center/sport_list/edit/:id',
    name: 'sport_list',
    meta: {
      title: '运动库编辑',
      access: 'sport_list_edit',
      type: 'sport_list_edit',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/plan_center/sport_list/create_edit'),
  },
  {
    path: '/plan_center/sport_list/detail/:id',
    name: 'sport_list',
    meta: {
      title: '运动库明细',
      access: 'sport_list_view',
      type: 'sport_list_detail',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () => import('../../../views/plan_center/sport_list/create_edit'),
  },
];
