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
    path: '/statistics',
    name: 'statistics',
    meta: {
      title: '统计管理',
      access: 'statistics',
    },
    redirect: '/statistics',
    component: Main,
    children: [
      {
        path: '/stats_index',
        name: 'stats_index',
        meta: {
          title: '问卷统计',
          access: 'stats_index',
          keepAlive: true,
        },
        component: () => import('../../views/question_statistics'),
      },
      {
        path: '/stats_test',
        name: 'stats_test',
        meta: {
          title: '体检基础统计',
          access: 'stats_test',
          keepAlive: true,
        },
        component: () => import('../../views/question_statistics/test'),
      },
      {
        path: '/work_statistics',
        name: 'work_statistics',
        meta: {
          title: '工作绩效统计',
          access: 'work_statistics',
          keepAlive: true,
        },
        component: () => import('../../views/statistics/index'),
      },
    ],
  },
];
