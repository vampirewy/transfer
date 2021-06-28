import BaseModule from '../BaseModule';

class AccessReport extends BaseModule {
  // 评估报告列表
  fetchUserList(params = {}) {
    return this.post('/assess_report/list_page', params);
  }
  // 未匹配异常
  getUnMatchExceptionList(id, data) {
    return this.get(`/report_abnormal_temp/list/${id}`, {
      params: data,
    });
  }
  // 异常列表
  getExceptionList(id, data) {
    return this.get(`/report_abnormal/list/${id}`, {
      params: data,
    });
  }
  // 异常匹配
  matchException(params) {
    return this.post('/report_abnormal_temp/match', params);
  }
  // 获取点评
  getComment(id) {
    return this.get(`/assess_report/get_comment/${id}`);
  }
  // 点评
  comment(params) {
    return this.post('/assess_report/comment', params);
  }
  // 生成报告
  generateReport(params) {
    return this.post('/assess_report/create_assess_info', params);
  }
  // 生成中医报告
  generatetcmReport(params) {
    return this.post('/assess_report/create_tcm_assess_info', params);
  }
  // 生成心理报告
  generatepsyReport(params) {
    return this.post('/assess_report/create_psy_assess_info', params);
  }
  // 团报告列表
  groupReportList(params = {}) {
    return this.post('/group_report/page_list', params);
  }
  // 团报配置
  groupReportdetail(params = {}) {
    return this.get('/group_report_catalog_config/get_detail', params);
  }
  // 更新团报
  groupReportsave(params = {}) {
    return this.post('/group_report_catalog_config/save', params);
  }
  // 参检团队列表
  groupReportinfo(params = {}) {
    return this.post('/report_info/get_report_work_unit_name_page_list', params);
  }
  // 参检团队限定日期内的总人数
  groupnametotal(params = {}) {
    return this.post('/report_info/get_report_work_unit_name_total', params);
  }
  // 参检单位列表
  groupworklist(params = {}) {
    return this.post('/report_info/get_client_work_unit_name_page_list', params);
  }
  // 参检单位限定日期内的总人数
  groupworktotal(params = {}) {
    return this.post('/report_info/get_client_work_unit_name_total', params);
  }
  // 参检部门列表
  departmentlist(params = {}) {
    return this.post('/report_info/get_client_department_name_page_list', params);
  }
  // 参检部门限定日期内的总人数
  departmenttotal(params = {}) {
    return this.post('/report_info/get_client_department_name_total', params);
  }
}

export default new AccessReport();
