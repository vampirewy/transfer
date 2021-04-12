import BaseModule from '../BaseModule';

class Medication extends BaseModule {
  fetch(data) {
    return this.post('/pharmacy_info/list_page', data);
  }

  // 新增
  add(data) {
    return this.post('/pharmacy_info', data);
  }

  // 编辑
  update(data) {
    return this.put('/pharmacy_info', data);
  }

  // 详情
  getDetail(id) {
    return this.get(`/pharmacy_info/detail/${id}`);
  }

  // 获取当前用户所有用药史（分页）
  getClientOtherList(data) {
    return this.post(`/pharmacy_info/client_other_list_page/${data.clientId}`, data);
  }

  // 获取当前状态
  getResultList() {
    return this.get('/system_param_value/MR002');
  }

  // 人员类别
  getGridList() {
    return this.get('/client_grid/get_grid_list');
  }

  // 删除
  remove(id) {
    return this.delete(`/pharmacy_info/${id}`);
  }
}

export default new Medication();
