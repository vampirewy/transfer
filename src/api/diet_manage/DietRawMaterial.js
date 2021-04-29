
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
}
export default new DietRawMaterial();
