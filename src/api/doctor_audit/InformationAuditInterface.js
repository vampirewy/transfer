/**
 * create by chenqi
 */

import BaseModule from '../BaseModule';

class InformationAuditInterface extends BaseModule {
  // 信息审核列表
  getQualificationAuditList(data = {}) {
    return this.get('/crm/doctor/qualification/audit_list', {
      params: data,
    });
  }

  // 信息审核
  auditDoctorQualification(data) {
    return this.post('/crm/doctor/qualification/audit', data);
  }

  // 获取信息详情
  getQualificationDetailById(data) {
    return this.get(`/crm/doctor/qualification/detail/${data.id}`);
  }
}

export default new InformationAuditInterface();
