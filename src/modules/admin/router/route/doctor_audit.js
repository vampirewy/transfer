import Main from '../../views/main.vue';

// const DoctorAudit = () => import('../../views/manage_views/doctor_audit');
// const InformationAudit = () =>
//   import('../../views/manage_views/doctor_audit/information_audit');

export default [
  {
    path: '/doctor_audites',
    name: 'doctor_audites',
    meta: {
      title: '医生资质审核',
    },
    component: Main,
    children: [
      {
        path: '/doctor_audittask',
        name: 'doctor_audittask',
        meta: {
          title: '审核任务',
        },
        component: () => import('../../views/manage_views/doctor_audit/task'),
      },
      {
        path: '/doctor_audites',
        name: 'doctor_audites',
        meta: {
          title: '审核记录',
        },
        component: () => import('../../views/manage_views/doctor_audit'),
      },
      {
        path: '/doctor_audites_detail/:id',
        name: 'doctor_audites_detail',
        meta: {
          title: '审核任务',
          hideInTag: true,
          hideInMenu: true,
        },
        component: () => import('../../views/manage_views/doctor_audit/task_detail'),
      },
      {
        path: '/doctor_taskdetailes_detail/:id',
        name: 'doctor_taskdetailes_detail',
        meta: {
          title: '审核任务',
          hideInTag: true,
          hideInMenu: true,
        },
        component: () => import('../../views/manage_views/doctor_audit/detail'),
      },
    ],
  },
];
