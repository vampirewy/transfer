/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 下午9:05
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 下午9:05
 */

import Main from '../../views/main.vue';

export default [
  {
    path: '/archives_manage',
    name: 'archives_manage',
    meta: {
      title: '档案管理',
      access: 'archives_manage',
    },
    redirect: '/archives_manage',
    component: Main,
    children: [
      {
        path: '/physical_examination_report',
        name: 'physical_examination_report',
        meta: {
          title: '体检报告',
          access: 'physical_examination_report',
          keepAlive: true,
        },
        component: () => import('../../views/archives_manage/report'),
      },
      {
        path: '/life_style_questionnaire',
        name: 'life_style_questionnaire',
        meta: {
          title: '生活方式问卷',
          access: 'life_style_questionnaire',
          keepAlive: true,
        },
        component: () =>
          import('../../views/archives_manage/life_style_questionnaire'),
      },
      {
        path: '/medical_history',
        name: 'medical_history',
        meta: {
          title: '就医历史',
          access: 'medical_history',
          keepAlive: true,
        },
        component: () =>
          import('../../views/archives_manage/medical_history.vue'),
      },
      {
        path: '/medication_history',
        name: 'medication_history',
        meta: {
          title: '用药历史',
          access: 'medication_history',
          keepAlive: true,
        },
        component: () =>
          import('../../views/archives_manage/medication_history.vue'),
      },
      {
        path: '/health_monitor',
        name: 'health_monitor',
        meta: {
          title: '健康监测',
          access: 'health_monitor',
          keepAlive: true,
        },
        component: () =>
          import('../../views/archives_manage/health_monitor/index.vue'),
      },
      {
        path: '/report_edit/:id?',
        name: 'report_edit',
        meta: {
          title: '新增体检报告',
          access: 'physical_examination_report_add',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/archives_manage/report_edit.vue'),
      },
      {
        path: '/health_questionnaire_edit/:type/:qusType/:id?',
        name: 'health_questionnaire_edit',
        meta: {
          title: '新增健康问卷',
          access: 'health_questionnaire_add',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/archives_manage/health_questionnaire_edit'),
      },
      // {
      //   path: "/medical_history_edit/:id?",
      //   name: "medical_history_edit",
      //   meta: {
      //     title: "新增就医历史",
      //     hideInMenu: true
      //   },
      //   component: () =>
      //     import("../../views/archives_manage/medical_history_edit.vue"),
      // },
      {
        path: '/medication_history_add',
        name: 'medication_history_add',
        meta: {
          title: '新增用药历史',
          access: 'medication_history_add',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/archives_manage/medication_history_add.vue'),
      },
      {
        path: '/medication_history_edit/:id',
        name: 'medication_history_edit',
        meta: {
          title: '编辑用药历史',
          access: 'medication_history_edit',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/archives_manage/medication_history_edit.vue'),
      },
      {
        path: '/report_detail/:id',
        name: 'report_detail',
        meta: {
          title: '体检报告详情',
          access: 'physical_examination_report_view',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/archives_manage/report_detail.vue'),
      },
      {
        path: '/health_questionnaire_detail/:qusType/:id',
        name: 'health_questionnaire_detail',
        meta: {
          title: '健康问卷详情',
          access: 'health_questionnaire_view',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/archives_manage/health_questionnaire_detail.vue'),
      },
    ],
  },
];
