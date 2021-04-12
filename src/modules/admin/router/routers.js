/**
 * @Author: csx
 * @Description 路由配置
 * meta: {
 *     title: {String|Number|Function} 显示在标签栏的文字
 *     hideInTag: (false) 设为true后此级路由将不会出现在标签栏中
 *     hideInMenu: (false) 设为true后在菜单栏不会显示该页面选项
 *     access: (null) 可访问该页面的权限数组
 * }
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import organizationalManagement from './route/organizational_management';
import doctorClientManagement from './route/doctor_client_management';
import doctorAudit from './route/doctor_audit';
import serviceItemsManage from './route/service_items_manage';

import personalCenter from './route/personal_center';
import errorRoute from './route/error';
export default [
  ...organizationalManagement,
  ...doctorClientManagement,
  ...doctorAudit,
  ...serviceItemsManage,
  ...personalCenter,
  ...errorRoute,
];
