
import BaseModule from '../BaseModule';

class DietFinishedDishInterface extends BaseModule {
  getDietFinishedDishList(data = {}) {
    return this.post('/cai/get_list_page', data);
  }
  deleteDietFinishedDish(data = {}) {
    return this.post('/cai/deleted', data);
  }
}
export default new DietFinishedDishInterface();
