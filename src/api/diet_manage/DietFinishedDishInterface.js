
import BaseModule from '../BaseModule';

class DietFinishedDishInterface extends BaseModule {
  getDietFinishedDishList(data = {}) {
    return this.post('/cai/get_list_page', data);
  }
  deleteDietFinishedDish(data = {}) {
    return this.post('/cai/deleted', data);
  }
  getCaiCategory(data = {}) {
    return this.post('/cai_diet_sort/get_list_page', data);
  }
  getDietFinishedDishDetail(id) {
    return this.get(`/cai/get_detail/${id}`);
  }
  saveDietFinishedDish(data = {}) {
    return this.post('/cai/save_cai', data);
  }
}
export default new DietFinishedDishInterface();
