/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 上午11:16
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 上午11:16
 */

export default [
  {
    path: '/health_plan/smsHistory',
    name: 'smsHistory',
    meta: {
      title: '短信记录',
      access: 'smsHistory',
      keepAlive: true,
    },
    component: () => import('../../../views/health_plan/sms_history'),
  },
  {
    path: '/health_plan/smsPlatform',
    name: 'smsPlatform',
    meta: {
      title: '短信平台',
      access: 'smsPlatform',
      keepAlive: true,
    },
    component: () => import('../../../views/health_plan/sms_platform'),
  },
];
