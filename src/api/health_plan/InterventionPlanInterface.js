/**
 * @Author: jrucker
 * @Description api接口
 * @Date: 2020/8/19 19:06
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/19 19:06
 */

import BaseModule from '../BaseModule';

class InterventionPlanInterface extends BaseModule {
  // 列表分页查询
  listPage(data = {}) {
    return this.post('/intervene_scheme/list_page', data);
  }

  // 方案删除
  deleteInterveneScheme(data = {}) {
    return this.delete(`/intervene_scheme/${data.id}`);
  }
  // 方案批量删除
  deleteSomeInterveneScheme(data = {}) {
    return this.post('/intervene_scheme/batch/delete', data);
  }

  // 方案新增/编辑
  saveInterveneScheme(data = {}) {
    return this.post('/intervene_scheme/save', data);
  }

  // 根据id获取详情
  getInterveneScheme(data = {}) {
    return this.get(`/intervene_scheme/${data.id}`);
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

export default new InterventionPlanInterface();
