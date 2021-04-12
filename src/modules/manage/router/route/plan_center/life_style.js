/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/8/29 上午10:21
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/29 上午10:21
 */

export default [
  {
    path: '/plan_center/life_style',
    name: 'life_style',
    meta: {
      title: '生活方式',
      access: 'life_style',
    },
    component: () => import('../../../views/plan_center/life_style'),
  },
  {
    path: '/plan_center/life_style/create',
    name: 'life_style',
    meta: {
      title: '生活方式新增',
      access: 'life_style_add',
      type: 'life_style_create',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/plan_center/life_style/create_edit'),
  },
  {
    path: '/plan_center/life_style/edit/:id',
    name: 'life_style',
    meta: {
      title: '生活方式编辑',
      access: 'life_style_edit',
      type: 'life_style_edit',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/plan_center/life_style/create_edit'),
  },
  {
    path: '/plan_center/life_style/detail/:id',
    name: 'life_style',
    meta: {
      title: '生活方式明细',
      access: 'life_style_view',
      type: 'life_style_detail',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () => import('../../../views/plan_center/life_style/detail'),
  },
];
