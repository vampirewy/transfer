/**
 * create by chenqi
 */

import BaseModule from '../BaseModule';

class DoctorAuditInterface extends BaseModule {
  // 职称审核列表
  getAuditList(data = {}) {
    return this.get('/crm/doctor/audit_history', {
      params: data,
    });
  }
  // 职称审核任务列表
  getaudittaskList(data = {}) {
    return this.get('/crm/doctor/audit_task', {
      params: data,
    });
  }

  // 获取角色列表
  getroleList(data = {}) {
    return this.get('/role/list', {
      params: data,
    });
  }
  getDetailById(data) {
    return this.get(`/crm/doctor/audit_history_detail/${data.id}`);
  }
  getdoctorDetailById(data) {
    return this.get(`/crm/doctor/${data.id}`);
  }
  // 审核职称
  auditDoctorTitles(data) {
    return this.post('/crm/doctor/audit', data);
  }

  // 获取职称详情
  getTitleDetailById(data) {
    return this.get(`/crm/doctor/title/detail/${data.id}`);
  }
}

export default new DoctorAuditInterface();
