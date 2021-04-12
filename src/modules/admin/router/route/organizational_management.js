import Main from '../../views/main.vue';

export default [
  {
    path: '/',
    name: 'organizational_management',
    meta: {
      title: '组织管理',
    },
    redirect: '/organizational_management',
    component: Main,
    children: [
      // 团队
      {
        path: '/team',
        name: 'team',
        meta: {
          title: '健康团队(工作室)',
        },
        component: () => import('../../views/manage_views/organizational_management/team'),
      },
      {
        path: '/team/create',
        name: 'team',
        meta: {
          title: '健康团队(工作室)新增',
          type: 1,
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/manage_views/organizational_management/team/create_edit'),
      },
      {
        path: '/team/edit/:id',
        name: 'team',
        meta: {
          title: '健康团队(工作室)编辑',
          type: 2,
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/manage_views/organizational_management/team/create_edit'),
      },
      {
        path: '/team/view/:id',
        name: 'team',
        meta: {
          title: '健康团队(工作室)查看',
          type: 3,
          hideInMenu: true,
          hideInTag: true,
        },
        component: () =>
          import('../../views/manage_views/organizational_management/team/create_edit'),
      },
      {
        path: '/organizational_management',
        name: 'organizational_management',
        meta: {
          title: '机构信息维护',
        },
        component: () =>
          import('../../views/manage_views/organizational_management'),
      },
    ],
  },
];
