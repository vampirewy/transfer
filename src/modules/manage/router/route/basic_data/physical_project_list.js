/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 上午10:19
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 上午10:19
 */

export default [
  {
    path: '/basic_data/physical_project_list',
    name: 'physical_project_list',
    meta: {
      title: '体检项目库',
      access: 'physical_project_list',
    },
    component: () => import('../../../views/basic_data/physical_project_list'),
  },
  {
    path: '/basic_data/physical_project_list/create',
    name: 'physical_project_list',
    meta: {
      title: '体检项目库新增',
      access: 'physical_project_list_add',
      type: 'physical_project_list_create',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/basic_data/physical_project_list/create_edit'),
  },
  {
    path: '/basic_data/physical_project_list/edit/:id',
    name: 'physical_project_list',
    meta: {
      title: '体检项目库编辑',
      access: 'physical_project_list_edit',
      type: 'physical_project_list_edit',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/basic_data/physical_project_list/create_edit'),
  },
  {
    path: '/basic_data/physical_project_list/detail/:id',
    name: 'physical_project_list',
    meta: {
      title: '体检项目库明细',
      access: 'physical_project_list_view',
      type: 'physical_project_list_detail',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
        import('../../../views/basic_data/physical_project_list/create_edit'),
  },
];
