/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 下午8:52
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 下午8:52
 */

import Main from '../../../views/main.vue';
import lifeStyle from './life_style';
import interventionTemplate from './intervention_template';

export default [
  {
    path: '/plan_center',
    name: 'plan_center',
    meta: {
      title: '方案中心',
      access: 'plan_center',
    },
    component: Main,
    children: [...lifeStyle, ...interventionTemplate],
  },
];
