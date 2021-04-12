/**
 * @Author: csx
 * @Description
 * @Date: 2020/8/29 下午17:05
 * @Last Modified by: csx
 * @Last Modified time: 2020/8/29 下午17:05
 */

export default [
  {
    path: '/basic_data/project_list',
    name: 'project_list',
    meta: {
      title: '项目匹配',
      access: 'project_list',
    },
    component: () => import('../../../views/basic_data/project_list'),
  },
];
