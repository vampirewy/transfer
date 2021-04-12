/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/9/1 9:44
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/9/1 9:44
 */

import BaseModule from '../BaseModule';

class CompanyManageInterface extends BaseModule {
  // 企业列表
  getWorkUnitPage(data = {}) {
    return this.get('/work_unit/get_work_unit_list_page', {
      params: data,
    });
  }

  // 获取企业详情
  getWorkUnitDetail(data = {}) {
    return this.get('/work_unit/get_work_unit_detail', {
      params: data,
    });
  }

  // 编辑企业
  updateWorkUnit(data = {}) {
    return this.post('/work_unit/save', data);
  }
}

export default new CompanyManageInterface();
