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
    path: '/sun_follow',
    name: 'sun_follow',
    meta: {
      title: '阳性追踪',
      access: 'sun_follow',
    },
    redirect: '/sun_follow',
    component: Main,
    children: [
      {
        path: '/first_follow',
        name: 'first_follow',
        meta: {
          title: '首次跟踪',
          access: 'first_follow',
          keepAlive: true,
        },
        component: () => import('../../views/sun_follow/first_follow'),
      },
      {
        path: '/first_follow_create',
        name: 'first_follow_create',
        meta: {
          title: '新增上报',
          access: 'first_follow_create',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/sun_follow/first_follow/form'),
      },
      {
        path: '/first_follow_do/:clientId/:sourceType',
        name: 'first_follow_do',
        meta: {
          title: '首次跟踪-处理',
          access: 'first_follow_do',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/sun_follow/first_follow/do'),
      },
      {
        path: '/first_follow_record',
        name: 'first_follow_record',
        meta: {
          title: '首次跟踪-查看跟踪记录',
          access: 'first_follow_record',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/sun_follow/first_follow/follow_record'),
      },
      {
        path: '/follow_task',
        name: 'follow_task',
        meta: {
          title: '跟踪计划',
          access: 'follow_task',
          keepAlive: true,
        },
        component: () => import('../../views/sun_follow/follow_task'),
      },
      {
        path: '/follow_record',
        name: 'follow_record',
        meta: {
          title: '跟踪记录',
          access: 'follow_record',
          keepAlive: true,
        },
        component: () => import('../../views/sun_follow/follow_record'),
      },
      {
        path: '/follow_record_detail/:clientId/:positiveTrackingId',
        name: 'follow_record_detail',
        meta: {
          title: '查看跟踪记录',
          access: 'follow_record_detail',
          hideInMenu: true,
          hideInTag: true,
        },
        component: () => import('../../views/sun_follow/follow_record/detail'),
      },
      {
        path: '/warn_set',
        name: 'warn_set',
        meta: {
          title: '预警配置',
          access: 'warn_set',
          keepAlive: true,
        },
        component: () => import('../../views/sun_follow/warn_set'),
      },
    ],
  },
];
