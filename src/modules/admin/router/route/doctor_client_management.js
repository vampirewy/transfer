import Main from '../../views/main.vue';

// const DoctorClientManagement = () =>
//   import('../../views/manage_views/doctor_client_management');
// const PositionManagement = () =>
// import('../../views/manage_views/doctor_client_management/position_management');

export default [
  {
    path: '/doctor_client_management',
    name: 'doctor_client_management',
    meta: {
      title: '医生端管理',
    },
    component: Main,
    children: [
      {
        path: '/doctor_client_management',
        name: 'doctor_info_management',
        meta: {
          title: '医生信息管理',
        },
        component: () => import('../../views/manage_views/doctor_client_management/doctor_management'),
      },
      {
        path: '/doctor_account_management',
        name: 'doctor_account_management',
        meta: {
          title: '医生账户管理',
          access: 'doctor_account_management',
        },
        component: () =>
          import('../../views/manage_views/doctor_account_managment/doctor_account_managment.vue'),
      },
    ],
  },
];
