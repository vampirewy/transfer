/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/9/1 9:45
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/9/1 9:45
 */

import BaseModule from '../BaseModule';

class UnusualListInterface extends BaseModule {
  // 获取异常列表
  listPage(data = {}) {
    return this.get('/organ_abnormal/list_page', { params: data });
  }

  // 修改异常
  updateOrganAbnormal(data = {}) {
    return this.put(`/organ_abnormal/update/${data.id}`, data);
  }

  // 删除异常
  deleteOrganAbnormal(data = {}) {
    return this.delete(`/organ_abnormal/${data.id}`);
  }

  // 新增异常
  saveOrganAbnormal(data = {}) {
    return this.post('/organ_abnormal/save', data);
  }

  // 获取异常详情
  getOrganAbnormal(data = {}) {
    return this.get(`/organ_abnormal/${data.id}`);
  }

  getOrganTypeList() {
    return this.get('/system_param_value/OA001');
  }
  getImportList() {
    return this.get('/system_param_value/OA002');
  }
  getQuickList() {
    return this.get('/system_param_value/OA003');
  }
}

export default new UnusualListInterface();
