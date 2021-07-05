/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 上午10:18
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 上午10:18
 */

export default [
  {
    path: '/basic_data/physical_project_template',
    name: 'physical_project_template',
    meta: {
      title: '体检项目模板',
      access: 'physical_project_template',
      keepAlive: true,
    },
    component: () =>
      import('../../../views/basic_data/physical_project_template'),
  },
  {
    path: '/basic_data/physical_project_template/create',
    name: 'physical_project_template',
    meta: {
      title: '体检项目模板新增',
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
      title: '体检项目模板编辑',
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
      title: '体检项目模板明细',
      access: 'physical_project_template_view',
      type: 'physical_project_template_detail',
      hideInMenu: true,
      hideInTag: true,
    },
    component: () =>
      import('../../../views/basic_data/physical_project_template/detail'),
  },
];
