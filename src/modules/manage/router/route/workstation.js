import Main from '../../views/main.vue';
export default [
  {
    path: '/workstation',
    name: 'workstation',
    meta: {
      title: '工作台',
      access: 'workstation',
    },
    redirect: '/workstation',
    component: Main,
    children: [
      {
        path: '/workstation',
        name: '/workstation',
        meta: {
          title: '工作台',
          access: 'workstation',
        },
        component: () => import('../../views/workstation/index.vue'),
      },
    ],
  },
];
