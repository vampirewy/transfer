/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 下午8:49
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 下午8:49
 */

import Main from '../../views/main.vue';

export default [
  {
    path: '/estimate_report',
    name: 'estimate_report',
    meta: {
      title: '健康报告',
      access: 'assessment_report',
    },
    redirect: '/estimate_report',
    component: Main,
    children: [
      {
        path: '/assessment_report',
        name: 'assessment_report',
        meta: {
          title: '个人报告',
          access: 'assessment_report',
          keepAlive: true,
        },
        component: () => import('../../views/estimate_report'),
      },
      {
        path: '/team_report',
        name: 'team_report',
        meta: {
          title: '团队报告',
          access: 'team_report',
          keepAlive: true,
        },
        component: () => import('../../views/team_report'),
      },
      {
        path: '/team_create',
        name: 'team_create',
        meta: {
          title: '生成报告',
          access: 'team_create',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/team_report/create'),
      },
      {
        path: '/team_configure',
        name: 'team_configure',
        meta: {
          title: '团报配置',
          access: 'team_configure',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/team_report/configure'),
      },
    ],
  },
];
