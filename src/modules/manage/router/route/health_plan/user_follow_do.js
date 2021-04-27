/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 上午11:16
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 上午11:16
 */

export default [
  {
    path: '/health_plan/wait_visit_plan',
    name: 'wait_visit_plan',
    meta: {
      title: '待随访计划',
      access: 'wait_visit_plan',
      keepAlive: true,
    },
    component: () => import('../../../views/health_plan/user_follow_do'),
  },
  {
    path: '/health_plan/user_follow_do/do/:id',
    name: 'user_follow_create_create',
    meta: {
      title: '执行计划',
      type: 1,
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/health_plan/user_follow_do/el_modal/followplan_detail'),
  },
  {
    path: '/health_plan/user_follow_do/view/:id',
    name: 'user_follow_create_create',
    meta: {
      title: '查看计划',
      type: 3,
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/health_plan/user_follow_record/el_modal/followplan_detail'),
  },
];
