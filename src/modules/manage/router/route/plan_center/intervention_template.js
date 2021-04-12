/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/8/29 上午10:22
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/29 上午10:22
 */

export default [
  {
    path: '/plan_center/intervention_template',
    name: 'intervention_template',
    meta: {
      title: '干预模版',
      access: 'intervention_template',
    },
    component: () => import('../../../views/plan_center/intervention_template'),
  },
  {
    path: '/plan_center/intervention_template/create',
    name: 'intervention_template',
    meta: {
      title: '干预模版新增',
      access: 'intervention_template_add',
      type: 'intervention_template_create',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/plan_center/intervention_template/create_edit'),
  },
  {
    path: '/plan_center/intervention_template/edit/:id',
    name: 'intervention_template',
    meta: {
      title: '干预模版编辑',
      access: 'intervention_template_edit',
      type: 'intervention_template_edit',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/plan_center/intervention_template/create_edit'),
  },
  {
    path: '/plan_center/intervention_template/plan_setting/:id',
    name: 'intervention_template',
    meta: {
      title: '干预模版随访计划设置',
      access: 'intervention_template_plan_edit',
      type: 'intervention_template_plan_setting',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/plan_center/intervention_template/plan_setting'),
  },
];
