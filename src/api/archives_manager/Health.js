import BaseModule from '../BaseModule';

class HealthInterface extends BaseModule {
  constructor() {
    super();
    this.reportTypeOptions = [];
  }

  add(params) {
    return this.post('/question_info', params);
  }
  fetch(params) {
    return this.post('/question_info/list_page', params);
  }
  remove(id) {
    return this.delete(`/question_info/${id}`);
  }
  removeSome(params) {
    return this.post('/question_info/batch/delete', params);
  }
  getDetail(id) {
    return this.get(`/question_info/detail/${id}`);
  }
  getDetailView(id) {
    return this.get(`/question_info/view/${id}`);
  }
  getQuestions(type) {
    return this.get(`/question_info/subject/${type}`);
  }
  getReport(id) {
    return this.get(`/question_info/report/${id}`);
  }
  getQuestionType() {
    if (this.reportTypeOptions.length) {
      return Promise.resolve(this.reportTypeOptions);
    }
    return this.get('/system_param_value/HM004').then(({ data }) => {
      if (data.code === 200) {
        this.reportTypeOptions = data.data;
        return data.data;
      }
    });
  }
  // 获取慢性病风险评估
  getAssessReportDetail(id) {
    return this.post(`/home_page/get_assess_report_detail/${id}`);
  }
  // 获取个人重要指标
  getReportItem(id) {
    return this.post(`/home_page/get_report_item/${id}`);
  }
  // 获取危险因素
  getQuestionRiskFactor(id) {
    return this.get(`/question_info/question_risk_factor/${id}`);
  }
  // 获取客户评估信息
  getClientAssessDetail(id) {
    return this.get(`/assess_report/get_client_assess/${id}`);
  }
}

export default new HealthInterface();
