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
  // 团报告列表
  groupReportList(params = {}) {
    return this.post('/group_report/page_list', params);
  }
}

export default new AccessReport();
