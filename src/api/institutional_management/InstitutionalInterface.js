/**
 * create by chenqi
 */

import BaseModule from '../BaseModule';

class InstitutionalInterface extends BaseModule {
  // 获取机构列表
  getOrganizationList(data = {}) {
    return this.get('/organization/list', {
      params: data,
    });
  }

  // 保存机构基础信息
  saveOrganizationBaseInfo(data = {}) {
    return this.post('/organization/save_base', data);
  }

  // 获取机构等级列表
  getOrganizationLevelList() {
    return this.get('/organization/level_list');
  }

  // 获取机构信息
  getOrganizationInfo() {
    return this.get('/organization/get');
  }

  // 机构审核
  auditOrganization(data) {
    return this.post('/organization/audit', data);
  }

  // 工作室列表
  listPage(data = {}) {
    return this.get('/workhome/get_workhome_list', { params: data });
  }
  // 删除工作室
  deleteWorkhome(data = {}) {
    return this.post('/workhome/delete_workhome', data);
  }
  // 保存工作室
  saveWorkhome(data = {}) {
    return this.post('/workhome/save', data);
  }
  // 工作室详情
  getWorkhomeDetail(id) {
    return this.get(`/workhome/get_workhome_detail/${id}`);
  }
  // 工作室下医生
  getWorkUserList(data = {}) {
    return this.get('/workhome/get_work_user_list', { params: data });
  }
}

export default new InstitutionalInterface();
