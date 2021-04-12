/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/8/20 下午8:49
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/20 下午8:49
 */

import Main from '../../views/main.vue';

export default [
  {
    path: '/estimate_report',
    name: 'estimate_report',
    meta: {
      title: '评估报告',
      access: 'assessment_report',
    },
    redirect: '/estimate_report',
    component: Main,
    children: [
      {
        path: '/estimate_report',
        name: 'estimate_report',
        meta: {
          title: '评估报告',
          access: 'assessment_report',
        },
        component: () => import('../../views/estimate_report'),
      },
    ],
  },
];
