/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 上午11:16
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 上午11:16
 */

export default [
  {
    path: '/health_plan/create_plan',
    name: 'create_plan',
    meta: {
      title: '创建计划',
      access: 'create_plan',
      keepAlive: true,
    },
    component: () => import('../../../views/health_plan/user_follow_create'),
  },
  /* {
    path: '/health_plan/user_follow_create/create/1',
    name: 'user_follow_create_create',
    meta: {
      title: '新建计划列表',
      access: 'create_plan_personal_create',
      type: 'user_follow_create_create',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/health_plan/user_follow_create/create_edit'),
  },
  {
    path: '/health_plan/user_follow_create/create/2',
    name: 'user_follow_create_create',
    meta: {
      title: '新建计划列表',
      access: 'create_plan_batch_create',
      type: 'user_follow_create_create',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/health_plan/user_follow_create/create_edit'),
  },*/
  {
    path: '/health_plan/user_follow_create/create/:type',
    name: 'user_follow_create_create',
    meta: {
      title: '新建计划列表',
      access: 'create_plan_personal_create',
      type: 'user_follow_create_create',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/health_plan/user_follow_create/create_edit'),
  },
  {
    path: '/health_plan/user_follow_create/createBatch/:type',
    name: 'user_follow_create_create',
    meta: {
      title: '新建计划列表',
      access: 'create_plan_batch_create',
      type: 'user_follow_create_create',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/health_plan/user_follow_create/create_edit'),
  },
];
