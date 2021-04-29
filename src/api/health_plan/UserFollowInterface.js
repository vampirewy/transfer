/**
 * @Author: csx
 * @Description api接口
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import BaseModule from '../BaseModule';

class UserFollowInterface extends BaseModule {
  // 随访列表查询
  listPage(data = {}) {
    return this.get('/intervene_plan/list_page', { params: data });
  }
  // 干预人列表
  healthDoctorList(data) {
    return this.post('/intervene_plan/get/health_doctor', data);
  }
  // 客户列表
  getClientInfoListPage(data) {
    return this.post('/client_info/get_client_info_list_page', data);
  }

  // 删除随访
  deleteIntervenePlan(data = {}) {
    return this.delete(`/intervene_plan/${data.id}`);
  }
  // 执行
  intervenePlanUpdate(data = {}) {
    return this.post('/intervene_plan/update', data);
  }
  // 计划批量删除
  deleteSomeFollowplanDel(data = {}) {
    return this.post('/intervene_plan/batch/delete', data);
  }
  // 执行计划/随访新增/随访编辑
  saveIntervenePlan(data = {}) {
    return this.post('/intervene_plan/save', data);
  }

  // 根据客户id查询随访计划
  getIntervenePlanById(data = {}) {
    return this.get(`/intervene_plan/${data.id}`);
  }

  // 根据id获取详情
  getIntervenePlan(data = {}) {
    return this.get(`/intervene_plan/get/${data.id}`);
  }

  // 用户随访列表
  /* getIntervenePlanPageList(data = {}) {
    return this.post('/intervene_plan/get_intervene_plan_page_list', data);
  } */
  // 用户创建计划 - 随访列表lvb copy
  getIntervenePlanPageList(data = {}) {
    return this.post('/client_info/get_client_info_create_plan_list_page', data);
  }
  // 待随访计划
  getIntervenePlanListPage(data = {}) {
    return this.post('/intervene_plan/get_intervene_plan_page_list', data);
    // return this.post('/intervene_plan/list_page', data);
  }
  // 随访记录
  getInterveneRecordListPage(data = {}) {
    return this.post('/intervene_plan/get_intervene_record_page_list', data);
  }
  // 随访方式设置查询
  getIntervenePlanWayList(data = {}) {
    return this.get('/intervene_plan_way/get/all', { params: data });
  }

  // 随访方式设置保存
  saveIntervenePlanWay(data = {}) {
    return this.post('/intervene_plan_way/save', data);
  }

  // 验证随访方式能否删除
  verifyDeleteIntervenePlanWay(data = {}) {
    return this.get(`/intervene_plan_way/verification/use/${data.id}`);
  }
  // 随访问卷
  // 随访问卷列表
  getTemplateQuestionListPage(data = {}) {
    return this.post('/template_question/list_page', data);
  }
  // 添加随访问卷
  saveTemplateQuestion(data = {}) {
    return this.post('/template_question/save', data);
  }
  // 修改随访问卷
  updateTemplateQuestion(data = {}) {
    return this.post('/template_question/update', data);
  }
  // 随访问卷详情
  getTemplateQuestionDetail(id) {
    return this.get(`/template_question/detail/${id}`);
  }
  // 获取已填写的问卷-问卷题目
  getAlreadyAnwserQuestionDetail(id) {
    return this.get(`/template_question/question_detail/${id}`);
  }

  // 随访问卷批量删除
  deleteTemplateQuestion(data = {}) {
    return this.post('/template_question/batch/delete', data);
  }
}

export default new UserFollowInterface();
