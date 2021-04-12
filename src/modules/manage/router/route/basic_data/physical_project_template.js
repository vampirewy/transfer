/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/8/29 上午10:18
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/29 上午10:18
 */

export default [
  {
    path: '/basic_data/physical_project_template',
    name: 'physical_project_template',
    meta: {
      title: '体检项目模版',
      access: 'physical_project_template',
    },
    component: () =>
      import('../../../views/basic_data/physical_project_template'),
  },
  {
    path: '/basic_data/physical_project_template/create',
    name: 'physical_project_template',
    meta: {
      title: '体检项目模版新增',
      access: 'physical_project_template_add',
      type: 'physical_project_template_create',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/basic_data/physical_project_template/create_edit'),
  },
  {
    path: '/basic_data/physical_project_template/edit/:id',
    name: 'physical_project_template',
    meta: {
      title: '体检项目模版编辑',
      access: 'physical_project_template_edit',
      type: 'physical_project_template_edit',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/basic_data/physical_project_template/create_edit'),
  },
  {
    path: '/basic_data/physical_project_template/detail/:id',
    name: 'physical_project_template',
    meta: {
      title: '体检项目模版明细',
      access: 'physical_project_template_view',
      type: 'physical_project_template_detail',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/basic_data/physical_project_template/detail'),
  },
];
