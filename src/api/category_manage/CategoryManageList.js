/**
 * @Author: csx
 * @Description api接口
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import BaseModule from '../BaseModule';

class CategoryManage extends BaseModule {
  // 列表分页查询
  listPage(data = {}) {
    return this.get('/client_grid/get_grid_list', { params: data });
  }

  // 根据id获取详情
  getdetails(data = {}) {
    return this.get(`/client_grid/get_grid_detail/${data.id}`);
  }

  // 获取type参数详情
  getdetailtype(data = {}) {
    return this.get('/client_grid/get_param_list', { params: data });
  }

  // 保存客户类别
  clientGridSave(data = {}) {
    return this.post('/client_grid/save', data);
  }

  // 客户管理批量删除
  deleteSomeInterveneScheme(data = {}) {
    return this.post('/client_grid/deleted_grid', data);
  }

  // 方案新增/编辑
  saveInterveneScheme(data = {}) {
    return this.post('/intervene_scheme/save', data);
  }

  // 获取图表信息
  getInterveneSchemeCharts(data = {}) {
    return this.get(`/intervene_scheme/get/${data.clientId}/${data.type}/${data.sugarType}`);
  }
  // 获取随访计划 / 记录
  getInterveneList(data = {}) {
    return this.get(`/intervene_plan/${data.clientId}/${data.executeState}`, { params: { pageNo: data.pageNo, pageSize: data.pageSize } });
  }
}

export default new CategoryManage();
