/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/8/20 下午8:51
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/20 下午8:51
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
