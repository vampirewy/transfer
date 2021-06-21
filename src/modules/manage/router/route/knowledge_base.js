/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 下午8:52
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 下午8:52
 */

import Main from '../../views/main.vue';

export default [
  {
    path: '/knowledge_sms',
    name: 'knowledge_sms',
    meta: {
      title: '短信模版',
      keepAlive: true,
    },
    redirect: '/knowledge_sms',
    component: Main,
    children: [
      {
        path: '/knowledge_sms',
        name: 'knowledge_sms',
        meta: {
          title: '短信模版',
          keepAlive: true,
        },
        component: () => import('../../views/knowledge_base/sms_template/sms.vue'),
      },
      {
        path: '/knowledge_smsAdd',
        name: 'knowledge_smsAdd',
        meta: {
          title: '短信模版新增',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/knowledge_base/sms_template/smsAdd.vue'),
      },
      {
        path: '/knowledge_smsLook',
        name: 'knowledge_smsLook',
        meta: {
          title: '短信模版查看',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/knowledge_base/sms_template/smsLook.vue'),
      },
      {
        path: '/risk_factors_index',
        name: 'risk_factors_index',
        meta: {
          title: '危险因素库',
          keepAlive: true,
        },
        component: () => import('../../views/knowledge_base/risk_factors/risk.vue'),
      },
      {
        path: '/risk_factors_add',
        name: 'risk_factors_add',
        meta: {
          title: '危险因素库新增',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/knowledge_base/risk_factors/riskAdd.vue'),
      },
      {
        path: '/risk_factors_look',
        name: 'risk_factors_look',
        meta: {
          title: '危险因素库查看',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/knowledge_base/risk_factors/riskLook.vue'),
      },
      {
        path: '/Exception',
        name: 'Exception',
        meta: {
          title: '异常库',
          keepAlive: true,
        },
        component: () => import('../../views/knowledge_base/ExceptionLibrary/Exception.vue'),
      },
      {
        path: '/ExceptionAddEdit',
        name: 'ExceptionAddEdit',
        meta: {
          title: '添加异常库',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/knowledge_base/ExceptionLibrary/ExceptionAddEdit.vue'),
      },
      {
        path: '/PhysicalExamination',
        name: 'PhysicalExamination',
        meta: {
          title: '体检库',
          keepAlive: true,
        },
        component: () => import('../../views/knowledge_base/PhysicalExaminationLibrary/PhysicalExamination.vue'),
      },
      {
        path: '/physical_sort',
        name: 'physical_sort',
        meta: {
          title: '排序',
          keepAlive: true,
        },
        component: () => import('../../views/knowledge_base/PhysicalExaminationLibrary/components/physical_sort.vue'),
      },
      {
        path: '/minor_term_add',
        name: 'minor_term_add',
        meta: {
          title: '体检库小项添加',
          keepAlive: true,
        },
        component: () => import('../../views/knowledge_base/PhysicalExaminationLibrary/minor_term_add.vue'),
      },
      {
        path: '/OutlierList',
        name: 'OutlierList',
        meta: {
          title: '指标匹配',
          keepAlive: true,
        },
        component: () => import('../../views/knowledge_base/Outlier_matching/OutlierList.vue'),
      },
      {
        path: '/Automatic_matching',
        name: 'Automatic_matching',
        meta: {
          title: '自从匹配',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/knowledge_base/Outlier_matching/Automatic_matching.vue'),
      },
      {
        path: '/matchingList',
        name: 'matchingList',
        meta: {
          title: '异常匹配',
          keepAlive: true,
        },
        component: () => import('../../views/knowledge_base/IndexMatching/matchingList.vue'),
      },
      {
        path: '/MatchingAddEdit',
        name: 'MatchingAddEdit',
        meta: {
          title: '新增异常匹配',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/knowledge_base/IndexMatching/MatchingAddEdit.vue'),
      },
      {
        path: '/InterventionList',
        name: 'InterventionList',
        meta: {
          title: '干预模版',
          keepAlive: true,
        },
        component: () => import('../../views/knowledge_base/Intervention_template/InterventionList.vue'),
      },
      {
        path: '/InterventionAdd',
        name: 'InterventionAdd',
        meta: {
          title: '新增干预模版',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/knowledge_base/Intervention_template/InterventionAdd.vue'),
      },
      {
        path: '/InterventionEdit',
        name: 'InterventionEdit',
        meta: {
          title: '编辑计划',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/knowledge_base/Intervention_template/InterventionEdit.vue'),
      },
    ],
  },
];
