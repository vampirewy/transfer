/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 下午8:45
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 下午8:45
 */

import Main from '../../views/main.vue';

export default [
  {
    path: '/workspace',
    name: 'workspace',
    meta: {
      title: '工作台',
      access: 'workspace',
    },
    redirect: '/workspace',
    component: Main,
    children: [
      {
        path: '/my_task',
        name: 'my_task',
        meta: {
          title: '我的任务',
          access: 'my_task',
        },
        component: () => import('../../views/workspace'),
      },
      {
        path: '/work_statistics',
        name: 'work_statistics',
        meta: {
          title: '工作绩效统计',
          access: 'work_statistics',
        },
        component: () => import('../../views/statistics/index'),
      },
    ],
  },
];
