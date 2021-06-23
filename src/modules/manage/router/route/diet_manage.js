/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 下午8:50
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 下午8:50
 */

import Main from '../../views/main.vue';

export default [
  {
    path: '/diet_manage',
    name: 'diet_manage',
    meta: {
      title: '膳食管理',
      // access: 'diet_management',
    },
    component: Main,
    children: [{
      path: '/',
      name: 'diet_programme',
      meta: {
        title: '膳食方案',
        // access: 'service_order',
      },
      component: () => import('../../views/diet_manage/diet_programme/index'),
    }, {
      path: '/diet_finished_dish',
      name: 'diet_finished_dish',
      meta: {
        title: '成品菜',
      },
      component: () => import('../../views/diet_manage/diet_finished_dish/index'),
    }, {
      path: '/diet_raw_material',
      name: 'diet_raw_material',
      meta: {
        title: '原料库',
      },
      component: () => import('../../views/diet_manage/diet_raw_material/index'),
    }, {
      path: '/diet_menu_template',
      name: 'diet_menu_template',
      meta: {
        title: '菜谱模版',
      },
      component: () => import('../../views/diet_manage/diet_menu_template/index'),
    }, {
      path: '/diet_tyerapy_chinese',
      name: 'diet_tyerapy_chinese',
      meta: {
        title: '中医食疗',
      },
      component: () => import('../../views/diet_manage/diet_tyerapy_chinese/index'),
    }, {
      path: '/chinese_info',
      name: 'chinese_info',
      meta: {
        hideInMenu: true,
        hideInTag: true,
        title: '查看中医食疗',
      },
      component: () => import('../../views/diet_manage/diet_tyerapy_chinese/edit_form/info_form.vue'),
    }, {
      path: '/diet_principle',
      name: 'diet_principle',
      meta: {
        title: '膳食原则',
      },
      component: () => import('../../views/diet_manage/diet_principle/index'),
    }],
  },
];
