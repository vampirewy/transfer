/**
 * @Author: csx
 * @Description 路由配置
 * meta: {
 *     title: {String|Number|Function} 显示在标签栏的文字
 *     hideInTag: (false) 设为true后此级路由将不会出现在标签栏中
 *     hideInMenu: (false) 设为true后在菜单栏不会显示该页面选项
 *     access: (null) 可访问该页面的权限数组
 *     keepAlive: 页面缓存
 * }
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import loginRoute from './route/login';
import homeRoute from './route/home';
import workspaceRoute from './route/workspace';
import userManageRoute from './route/user_manage';
import archivesManage from './route/archives_manage';
import estimateReport from './route/estimate_report';
import healthPlan from './route/health_plan';
import serviceManage from './route/service_manage';
import basicData from './route/basic_data';
import planCenter from './route/plan_center';
import systemManage from './route/system_manage';
import personalCenter from './route/personal_center';
import errorRoute from './route/error';
import dietManage from './route/diet_manage';
export default [
  ...loginRoute,
  ...homeRoute,
  ...workspaceRoute,
  ...userManageRoute,
  ...archivesManage,
  ...estimateReport,
  ...healthPlan,
  ...serviceManage,
  ...basicData,
  ...planCenter,
  ...systemManage,
  ...personalCenter,
  ...errorRoute,
  ...dietManage,
];
