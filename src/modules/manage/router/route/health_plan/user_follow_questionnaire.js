
export default [
  {
    path: '/health_plan/visited_questionaire',
    name: 'visited_questionaire',
    meta: {
      title: '随访问卷',
      access: 'visited_questionaire',
      keepAlive: true,
    },
    component: () => import('../../../views/health_plan/user_follow_questionnaire'),
  },
  {
    path: '/health_plan/user_follow_questionnaire_add/:id?',
    name: 'questionnaire_edit',
    meta: {
      title: '新增随访问卷',
      access: 'visited_questionaire_add',
      type: 1,
      hideInMenu: true,
      hideInTag: true,
    },
    component: () => import('../../../views/health_plan/user_follow_questionnaire/questionnaire_edit'),
  },
  {
    path: '/health_plan/user_follow_questionnaire_edit/:id?',
    name: 'questionnaire_edit',
    meta: {
      title: '编辑随访问卷',
      access: 'visited_questionaire_edit',
      type: 2,
      hideInMenu: true,
      hideInTag: true,
    },
    component: () => import('../../../views/health_plan/user_follow_questionnaire/questionnaire_edit'),
  },
  {
    path: '/health_plan/user_follow_questionnaire_view/:id?',
    name: 'questionnaire_edit',
    meta: {
      title: '查看随访问卷',
      access: 'visited_questionaire_view',
      type: 3,
      hideInMenu: true,
      hideInTag: true,
    },
    component: () => import('../../../views/health_plan/user_follow_questionnaire/questionnaire_edit'),
  },
];
