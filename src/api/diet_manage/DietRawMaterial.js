
import BaseModule from '../BaseModule';

class DietRawMaterial extends BaseModule {
  getDietIngredientList(data = {}) {
    return this.post('/ingredient/get_list_page', data);
  }
  deleteDietIngredient(data = {}) {
    return this.post('/ingredient/deleted', data);
  }
  saveDietIngredient(data = {}) {
    return this.post('/ingredient/save_diet_ingredient', data);
  }
  getDietIngredientDetail(id) {
    return this.get(`/ingredient/get_detail/${id}`);
  }
  getDietIngredientCategory(id) {
    return this.get(`/system_param_value/${id}`);
  }
  // -------------------------- 膳食方案 --------------------
  clientDietPlanPageList(data = {}) {
    return this.post('/client_diet_plan/pageList', data);
  }
  // 新增膳食方案
  clientDietPlanPageSave(data = {}) {
    return this.post('/client_diet_plan/save', data);
  }
  // 删除膳食方案
  clientDietPlanPageRemove(data = {}) {
    return this.post('/client_diet_plan/remove', data);
  }
  // 膳食详情
  clientDietPlanPageGetDetail(id) {
    return this.get(`/client_diet_plan/get_detail/${id}`);
  }
  // 膳食编辑提交
  clientDietPlanPageUpdate(data = {}) {
    return this.post('/client_diet_plan/update', data);
  }
  // 膳食左侧数据
  clientDietPlanPageHealthInfo(data = {}) {
    return this.post('/client_diet_plan/get_health_info', data);
  }
  // 膳食右侧数据
  clientDietTemplateAnalysis(data = {}) {
    return this.post('/diet_template/dietTemplateAnalysis', data);
  }
}
export default new DietRawMaterial();
