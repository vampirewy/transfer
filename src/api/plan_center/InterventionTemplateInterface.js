/**
 * @Author: csx
 * @Description api接口
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import BaseModule from '../BaseModule';

class InterventionTemplateInterface extends BaseModule {
  // 修改干预模板
  updateInterveneTemplate(data = {}) {
    return this.put('/intervene_template/update_intervene_template', data);
  }

  // 查询干预模板
  getInterveneTemplateListPage(data = {}) {
    return this.post('/intervene_template/get_intervene_template_list_page', data);
  }
  // 干预模板是否开启
  updateTemplateState(data = {}) {
    return this.post('/intervene_template/update_template_state', data);
  }
  // 新增干预模板
  saveInterveneTemplate(data = {}) {
    return this.post('/intervene_template/save_intervene_template', data);
  }

  // 根据id获取干预模板
  getInterveneTemplateById(data = {}) {
    return this.get(`/intervene_template/get_intervene_template_by_id/${data.id}`);
  }
  // 根据id删除干预模板
  removeInterveneTemplateList(data = {}) {
    return this.get(`/intervene_template/remove_intervene_template/${data}`);
  }

  // 根据id删除干预模板
  removeInterveneTemplate(data = {}) {
    return this.post('/intervene_template/remove_intervene_template', data);
  }

  // 查询干预模板计划设置
  getInterveneTemplatePlanListPage(data = {}) {
    return this.post('/intervene_template_plan/get_intervene_template_plan_list_page', data);
  }
  // 查询干预模板计划设置
  getInterveneTemplatePlanList(data = {}) {
    return this.get(`/intervene_template_plan/get_intervene_template_plan_list/${data}`);
  }
  // 修改干预模板计划设置
  updateInterveneTemplatePlan(data = {}) {
    return this.put('/intervene_template_plan/update_intervene_template_plan', data);
  }
  // 新增干预模板计划设置
  saveInterveneTemplatePlan(data = {}) {
    return this.post('/intervene_template_plan/save_intervene_template_plan', data);
  }
  // 新增别名
  organAbnormalAliasSave(data = {}) {
    return this.post('/organ_abnormal_alias/save', data);
  }
  // 删除别名
  organAbnormalAliasRemove(data) {
    return this.get(`/organ_abnormal_alias/remove/${data}`);
  }
  // 删除干预模板计划设置
  removeInterveneTemplatePlan(data = {}) {
    return this.post('/intervene_template_plan/remove_intervene_template_plan', data);
  }

  // 根据id获取干预模板计划设置
  getInterveneTemplatePlanById(data = {}) {
    return this.get(`/intervene_template_plan/get_intervene_template_plan_by_id/${data.id}`);
  }
  // 根据id获取干预模板条件设置
  getTemplateRelate(data = {}) {
    return this.get('/intervene_template/get_template_relate', { params: data });
  }
  // 保存干预模板条件设置
  saveTemplateRelate(data = {}) {
    return this.post('/intervene_template/save_template_relate', data);
  }
}

export default new InterventionTemplateInterface();
