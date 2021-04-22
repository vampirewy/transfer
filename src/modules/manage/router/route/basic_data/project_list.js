/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 下午17:05
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 下午17:05
 */

export default [
  {
    path: '/basic_data/project_list',
    name: 'project_list',
    meta: {
      title: '项目匹配',
      access: 'project_list',
      keepAlive: true,
    },
    component: () => import('../../../views/basic_data/project_list'),
  },
];
