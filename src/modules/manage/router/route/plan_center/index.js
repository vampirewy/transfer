/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/8/20 下午8:52
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/20 下午8:52
 */

import Main from '../../../views/main.vue';
import lifeStyle from './life_style';
import interventionTemplate from './intervention_template';
import sportList from './sport_list';

export default [
  {
    path: '/plan_center',
    name: 'plan_center',
    meta: {
      title: '方案中心',
      access: 'plan_center',
    },
    component: Main,
    children: [...lifeStyle, ...interventionTemplate, ...sportList],
  },
];
