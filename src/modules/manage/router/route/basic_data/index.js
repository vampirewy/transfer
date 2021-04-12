/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 下午8:51
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 下午8:51
 */

import Main from '../../../views/main.vue';
import physicalProjectTemplate from './physical_project_template';
import physicalProjectList from './physical_project_list';
import unusualList from './unusual_list';
import projectList from './project_list';

export default [
  {
    path: '/basic_data',
    name: 'basic_data',
    meta: {
      title: '基础数据',
      access: 'basic_data',
    },
    component: Main,
    children: [
      ...physicalProjectTemplate,
      ...physicalProjectList,
      ...unusualList,
      ...projectList,
    ],
  },
];
