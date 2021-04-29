
import BaseModule from '../BaseModule';

class DietMenuTemplateInterface extends BaseModule {
  getDietMenuTemplate(data) {
    return this.post('/diet_template/get_list_page', data);
  }
  getDietMenuTemplateDetail(id) {
    return this.get(`/diet_template/get_detail/${id}`);
  }
  saveDietMenuTemplate(data) {
    return this.post('/diet_template/save_diet_template', data);
  }
  deleteDietMenuTemplate(data) {
    return this.post('/diet_template/deleted', data);
  }
  getDietMeneTemCate(data) {
    return this.post('/diet_sort/get_list_page', data);
  }
  getDietMeneTemCateDetail(id) {
    return this.get(`/diet_sort/get_detail/${id}`);
  }
  saveDietMeneTemCate(data) {
    return this.post('/diet_sort/save_diet_sort', data);
  }
  deleteDietMenuTemCate(data) {
    return this.post('/diet_sort/deleted', data);
  }
  getDietMenuTemConfig(data) {
    return this.post('/diet_template/save_template_config', data);
  }
  getDietMenuTemConfigDetail(id) {
    return this.get(`/diet_template/get_template_config_detail/${id}`);
  }
}
export default new DietMenuTemplateInterface();
