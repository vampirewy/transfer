/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 下午8:50
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 下午8:50
 */

import Main from '../../../views/main.vue';
import userFollowCreate from './user_follow_create';
import userFollowDo from './user_follow_do';
import interventionPlan from './intervention_plan';
import userFollowRecord from './user_follow_record';
import userFollowQuestionnaire from './user_follow_questionnaire';
import sms from './sms';
export default [
  {
    path: '/health_plan',
    name: 'health_plan',
    meta: {
      title: '健管计划',
      access: 'health_management_plan',
    },
    component: Main,
    children: [...interventionPlan, ...userFollowCreate, ...userFollowDo,
      ...userFollowRecord, ...userFollowQuestionnaire, ...sms],
  },
];
