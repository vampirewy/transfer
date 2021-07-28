/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 9:44
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 9:44
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

  // 所有企业
  getWorkUnitList(data = {}) {
    return this.get('/work_unit/get_work_unit_list', data);
  }
}

export default new CompanyManageInterface();
