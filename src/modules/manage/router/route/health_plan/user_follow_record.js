/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 上午11:16
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 上午11:16
 */

export default [
  {
    path: '/health_plan/user_follow_record',
    name: 'user_follow_record',
    meta: {
      title: '随访记录',
      access: 'visited_record',
    },
    component: () => import('../../../views/health_plan/user_follow_record'),
  },
];
