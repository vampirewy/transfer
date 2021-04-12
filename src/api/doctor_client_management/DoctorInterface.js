/**
 * create by chenqi
 */

import BaseModule from '../BaseModule';

class DoctorInterface extends BaseModule {
  // 获取医生管理列表
  getDoctorList(data = {}) {
    return this.get('/crm/doctor/list', {
      params: data,
    });
  }

  // 获取医生详情
  getDoctorDetail(data) {
    return this.get(`/crm/doctor/${data.id}`);
  }

  // 移除认证条件
  removeAuthCondition(data) {
    return this.post('/crm/title/remove_auth_condition/', data);
  }

  // 上线
  setDoctorOnline(data) {
    return this.post(`/crm/doctor/online/${data.id}`);
  }

  // 下线
  setDoctorOffline(data) {
    return this.post(`/crm/doctor/offline/${data.id}`);
  }

  // 保存医生信息
  saveDoctor(data) {
    return this.post('/crm/doctor/save', data);
  }

  // 启用资质
  enableDoctorQualification(data) {
    return this.post(`/crm/doctor/qualification/enable/${data.id}`);
  }

  // 启用职称
  enableDoctorTitle(data) {
    return this.post(`/crm/doctor/title/enable/${data.id}`);
  }

  // 新增资质
  saveDoctorQualification(data = {}) {
    return this.post('/crm/doctor/qualification/save', data);
  }

  // 新增职称
  saveDoctorTitle(data = {}) {
    return this.post('/crm/doctor/title/save', data);
  }

  // 获取职称列表
  getTitleInfoList(data = {}) {
    return this.get('/crm/title/list_by_page', {
      params: data,
    });
  }

  // 批量删除医生
  deleteDoctor(ids) {
    return this.post('/crm/doctor/delete', ids);
  }
  // 审核记录
  auditHistory(id, data) {
    return this.get(`/crm/doctor/audit_history/${id}`, {
      params: data,
    });
  }
}

export default new DoctorInterface();
