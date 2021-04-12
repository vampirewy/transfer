/**
 * @Author: csx
 * @Description api接口
 * @Date: 2020/8/25 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2020/8/25 19:06
 */

import BaseModule from './BaseModule';

class Personal extends BaseModule {
  // 个人中心 -用户信息
  userCenter(data = {}) {
    return this.get('/user/info', data);
  }
  // 保存用户信息
  saveUserInfo(data = {}) {
    return this.post('/user/info/save', data);
  }
  // 保存/编辑专治
  addEspeciallyGood(data = {}) {
    return this.post('/user/specialized_treatment/save', data);
  }
  // 移除专治
  removeEspeciallyGood(data = {}) {
    return this.post(`/user/specialized_treatment/remove/${data.id}`, data);
  }
  // 新增资质
  addIntelligence(data = {}) {
    return this.post('/user/auth/qualification/save', data);
  }
  // 新增职称
  addLevel(data = {}) {
    return this.post('/user/auth/title/save', data);
  }
  // 职称类别
  getLeveltypeListAjax(data = {}) {
    return this.get('/crm/title/type/list', data);
  }
  // 职称名
  getLevelNameListAjax(data = {}) {
    return this.get('/crm/title/list_by_type', { params: data });
  }
  // 职称认证内容
  getLevelAuthList(data = {}) {
    return this.get('/user/auth/title/auth_list', {
      params: data,
    });
  }
  // 认证条件列表
  getAuthConditionList(data = {}) {
    return this.get('/crm/title/get_auth_condition_list', {
      params: data,
    });
  }
  // 启用职称
  levelEnable(data = {}) {
    return this.post(`/user/auth/title/enable/${data.id}`, data);
  }
  // 启用资质
  intelligenceEnable(data = {}) {
    return this.post(`/user/auth/qualification/enable/${data.id}`, data);
  }
  // 首页 - 查询服务订单/问卷/客户/评估报告总数
  homeFindcount(data = {}) {
    return this.get('/home/find/count', { params: data });
  }
  // 随访任务折线
  echartIntervenePlan(data = {}) {
    return this.get('/home/line/intervene_plan', { params: data });
  }
  // 随访任务饼图
  echartIntervenePlanPie(data = {}) {
    return this.get('/home/chart/intervene_plan', { params: data });
  }
  // 服务订单柱形图
  echartServiceOrder(data = {}) {
    return this.get('/home/chart/service_order', { params: data });
  }
  // 问卷类型
  echartQuestionInfo(data = {}) {
    return this.get('/home/chart/question_info', { params: data });
  }
  // 职称类型列表
  getTypeList() {
    return this.get('/user/auth/types');
  }
  // 审核记录
  auditHistory(data) {
    return this.get('/user/info/audit_history', {
      params: data,
    });
  }
  // 提交审核
  submitAudit(data = {}) {
    return this.post('/user/info/submit_audit', data);
  }
}

export default new Personal();
