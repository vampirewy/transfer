/**
 * @Author: csx
 * @Description api接口
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
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
  // 首页阳性跟踪列表
  homePositiveClient(data = {}) {
    return this.post('/home/positive/client', data);
  }
  // 首页获取随访计划客户列表
  homeInterveneClient(data = {}) {
    return this.post('/home/intervene/client', data);
  }
  // 首页获取今日跟踪列表
  positiveReturnTaskClient(data = {}) {
    return this.post('/home/positive_return_task/client', data);
  }
  // 获取不同类别客户数量饼状图
  homeGridClientCount(data = {}) {
    return this.post('/home/grid/client_count', data);
  }
  // 首页获取客户的数量
  homeClientClientCount(data = {}) {
    return this.post('/home/client/client_count', data);
  }
  // 最近15天的新增客户数量 折线图
  neardayClientCount(data = {}) {
    return this.post('/home/nearday/client_count', data);
  }
  /**
   * @description: 工作台 -- 今日工作任务统计
   * @method get
   * @file http://192.168.137.12:3000/project/63/interface/api/7199
   * 返回
   * @property {number} firestCollectTrackCount 首次采集系统跟踪
   * @property {number} firestInputTrackCount 首次手动上报跟踪
   * @property {number} trackPlanCount 待跟踪计划
   * @property {number} visitPlanCount 待随访计划
   */

  getTaskCount() {
    return this.get('/workbench/getWorkTasks');
  }
  /**
   * @description: 工作台 -- 获取登录用户负责客户数及团队内排名数
   * @fileUrl http://192.168.137.12:3000/project/63/interface/api/7019
   * @method get
   * @property {number} teamOrder 团队排名
   * @property {number} teamCount 团队(医生)数量
   * @property {number} clientCount 负责客户数
   */
  getCustomerNumberAndRank() {
    return this.get('/user/getClientData');
  }
  /**
   * @description:  工作台（今日工作任务/工作记录） --采集系统跟踪
   * @file http://192.168.137.12:3000/project/63/interface/api/7127
   * @method post
   * @param {number} searchType 查询类型  1|列表 -- 默认 2|工作台首次 3|跟踪记录 4|工作台记录
   * @param {string} sortType 排序类型
   * bySex|性别  byAge|年龄  byReportDate|体检时间  byZjDate|主检时间  byCreateDate|上报时间  ByLevel|阳性分级
   * @param {string} sortRule 1|升 2|降
   * @param {string} searchStartTime 工作台开始时间
   * @param {string} searchEndTime 工作台结束时间
   * 返回
   * @property {string} id 体检报告id
   * @property {string} clientId 客户id
   * @property {string} clientCode 客户编号
   * @property {string} workUnitName 所属企业
   * @property {string} doctorName 管理医生
   * @property {string} clientName 客户姓名
   * @property {number} positiveLevel 阳性等级
   * @property {string} reportNo 体检编号
   * @property {string} reportDate 体检时间
   * @property {string} zjDate 主检时间
   * @property {string} zjDoctor 主检医生
   * @property {number} age 年龄
   * @property {string} birthday 出生日期
   * @property {number} gender 性别  1|男 2|女
   * @property {string} abnormalResult 异常结果
   * @property {string} visitDoctorName 回访医生姓名
   * @property {string} visitResut 跟踪结果
   * @property {string} createdTime 上报时间
   * @property {string} levelName 阳性分级
   * @property {number} recordNum 跟踪记录数
   * @property {number} total 总条数
   */
  getSysTranking(data = {}) {
    return this.post('/positive_tracking_new/get_collect_data_list_page', data);
  }
  /**
   * @description: 工作台 -- 今日工作任务/工作记录 -- 手动上报
   * @file http://192.168.137.12:3000/project/63/interface/api/7121
   * @method post
   * @param {string} searchType 1|列表--默认 2|工作台首次 3|跟踪记录 4|工作台记录
   * @param {string} sortRule 1|升 2|降
   * @param {string} sortType 排序类型 byReportDate|上报时间 byLevel|阳性分级
   * @param {string} searchStartTime 工作台开始时间
   * @param {string} searchEndTime 工作台结束时间
   * 返回
   * @property {number} total 总条数
   * @property {string} id
   * @property {string} clientId 客户id
   * @property {string} clientName 客户姓名
   * @property {string} mobile 手机号
   * @property {string} cardNo 身份证号
   * @property {string} reportNo 体检编号
   * @property {string} itemName 项目名称
   * @property {string} itemValue 异常结果
   * @property {string} reportDepartment 科室
   * @property {string} reportUserId 上报人id
   * @property {string} reportUserName 上报人医生
   * @property {string} reportDate 上报时间
   * @property {number} reportState 是否主检 1|已主检 2|未主检
   * @property {number} positiveLevel 阳性等级
   * @property {string} remark 备注
   * @property {string} levelName 异常等级 阳性分级 阳性一级，阳性二级，阳性三级，阳性四级
   * @property {string} trackingTime 跟踪时间
   * @property {string} recieveUserId 回访医生id
   * @property {string} recieveUserName 回访医生姓名
   * @property {number} recordNum 跟踪记录数
   */

  getManualTracking(data = {}) {
    return this.post(
      '/positive_tracking_new/get_first_positive_list_page',
      data,
    );
  }
  /**
   * @description: 工作台 -- 待跟踪/跟踪计划
   * @method post
   * @file http://192.168.137.12:3000/project/63/interface/api/7145
   * @param {string} searchStartTime 工作台使用 开始时间
   * @param {string} searchEndTime 工作台使用 结束时间
   * @param {number} searchType 1|列表 2|待跟踪计划 3| 跟踪计划
   * 返回
   * @property {numebr} total 总条数
   * @property {string} id 体检报告id
   * @property {string} clientId 客户id
   * @property {string} clientCode 客户编号
   * @property {string} reportNo 体检编号
   * @property {string} clientName 姓名
   * @property {number} gender 性别 0|女 1|男
   * @property {number} age 年龄
   * @property {string} workUnitName 所属企业
   * @property {string} abnormalResult 异常结果
   * @property {string} levelName 阳性分级
   * @property {string} zjDate 主检时间
   * @property {string} createdTime 上报时间
   * @property {string} trackDate 最近跟踪时间
   * @property {string} doctorName 计划创建人
   * @property {string} nextTrackDate 跟踪计划时间
   * @property {string} trackWay 跟踪方式
   * @property {string} trackTip 跟踪提示
   * @property {number} trackRecord 跟踪记录
   */

  getFollowupPlan(data = {}) {
    return this.post(
      '/positive_tracking_new/get_positive_return_task_list_page',
      data,
    );
  }
  /**
   * @description: 工作台 -- 工作统计
   * @method get
   * @param {string} startTime 开始时间 yyyy-MM-DD
   * @param {string} endTime 结束时间 yyyy-MM-DD
   * @property {number} manageCustomerCount 管理客户数
   * @property {number} firstFollowCount 阳性追踪数
   * @property {number} followUpCount 随访计划数
   * @property {number} phoneCount 电话工作任务量
   * @property {number} smsCount 短信工作任务量
   * @property {number} inHospitalChangeCount 院内转诊数
   */
  getWorkStatistics(query = {}) {
    return this.get('/workbench/getWorkRecord', {
      params: query,
    });
  }
}

export default new Personal();
