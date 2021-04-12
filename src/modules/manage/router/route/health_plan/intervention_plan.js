/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 上午10:16
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 上午10:16
 */

export default [
  {
    path: '/health_plan/intervention_plan',
    name: 'intervention_plan',
    meta: {
      title: '干预方案',
      access: 'intervention_plan',
    },
    component: () => import('../../../views/health_plan/intervention_plan'),
  },
  {
    path: '/health_plan/intervention_plan/create',
    name: 'intervention_plan',
    meta: {
      title: '干预方案新增',
      access: 'intervention_plan_add',
      type: 'intervention_plan_create',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/health_plan/intervention_plan/create_edit'),
  },
  {
    path: '/health_plan/intervention_plan/edit/:id',
    name: 'intervention_plan',
    meta: {
      title: '干预方案编辑',
      access: 'intervention_plan_edit',
      type: 'intervention_plan_edit',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/health_plan/intervention_plan/create_edit'),
  },
  {
    path: '/health_plan/intervention_plan/detail/:id',
    name: 'intervention_plan',
    meta: {
      title: '干预方案明细',
      access: 'intervention_plan_view',
      type: 'intervention_plan_view',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/health_plan/intervention_plan/create_edit'),
  },
];
