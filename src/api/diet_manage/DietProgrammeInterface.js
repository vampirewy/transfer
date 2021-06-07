
import BaseModule from '../BaseModule';

class DietProgrammeInterface extends BaseModule {
  // ---------------------中医食疗-------------------
  // 分页获取
  getDietTreatmentListPage(data = {}) {
    return this.post('/diet_treatment/get_diet_treatment_list_page', data);
  }
  // 删除
  deleteDietTreatment(data = {}) {
    return this.post('/diet_treatment/delete_diet_treatment', data);
  }
  // 获取详情
  getDietTreatment(id) {
    return this.get(`/diet_treatment/get_diet_treatment/${id}`);
  }
  // 新增
  saveDietTreatment(data = {}) {
    return this.post('/diet_treatment/save_diet_treatment', data);
  }
  // 修改
  updateDietTreatment(data = {}) {
    return this.post('/diet_treatment/update_diet_treatment', data);
  }
  // 判断名称是否可用
  judgmentNameRepeat(data = {}) {
    return this.post('/diet_treatment/judgment_name_repeat', data);
  }
  // -----------------------膳食原则------------------------
  // 分页获取
  principlegetListPage(data = {}) {
    return this.post('/diet_principle/get_list_page', data);
  }
  // 新增更新
  principlesaveDietPrinciple(data = {}) {
    return this.post('/diet_principle/save_diet_principle', data);
  }
  // 删除
  principledeletedList(data = {}) {
    return this.post('/diet_principle/deleted', data);
  }
}

export default new DietProgrammeInterface();
