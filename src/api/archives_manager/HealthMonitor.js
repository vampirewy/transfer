import BaseModule from '../BaseModule';

class HealthMonitorInterface extends BaseModule {
  // 单项检查新增
  saveInspectRecord(params) {
    return this.post('/inspect/save_inspect_record', params);
  }
  // 获取单项检查详情
  SinglegetDetail(id) {
    return this.get(`/inspect/get_detail/${id}`);
  }
  // 检测项目
  healthDataItemGetAll(params) {
    return this.post('/health_data_item/get_health_data_item_list_page', params);
  }
  // 修改检测项目
  updateHealthDataItem(params) {
    return this.post('/health_data_item/update_health_data_item', params);
  }
  // 删除检测项目
  deleteHealthDataItem(params) {
    return this.post('/health_data_item/delete_health_data_item', params);
  }
  // 新增健康检测
  saveHealthDataOther(params) {
    return this.post('/client_health_data/save_health_data_other', params);
  }
  // 新增检测项目
  saveHealthDataItem(params) {
    return this.post('/health_data_item/save_health_data_item', params);
  }
  // 血糖类型
  getQuickListBloodSugar() {
    return this.get('/system_param_value/ZY004');
  }
  // 血压列表
  getBPList(params) {
    return this.post('/client_health_data/blood_pressure/list_page', params);
  }
  // 血压图表
  getBPChart(id) {
    return this.get(`/client_health_data/blood_pressure/chart/${id}`);
  }
  // 血压详情
  getDetailHealthBloodPressure(id) {
    return this.get(`/client_health_data/get_detail_health_blood_pressure/${id}`);
  }
  // 血糖列表
  getBGList(params) {
    return this.post('/client_health_data/blood_sugar/list_page', params);
  }
  // 血糖图表
  getBGChart(id) {
    return this.get(`/client_health_data/blood_sugar/chart/${id}`);
  }
  // 血糖详情
  getDetailHealthBloodSugar(id) {
    return this.get(`/client_health_data/get_detail_health_blood_sugar/${id}`);
  }
  // 体重列表
  getWeightList(params) {
    return this.post('/client_health_data/weight/list_page', params);
  }
  // 体重图表
  getWeightChart(id) {
    return this.get(`/client_health_data/weight/chart/${id}`);
  }
  // 体重详情
  getDetailHealthWeight(id) {
    return this.get(`/client_health_data/get_detail_health_weight/${id}`);
  }
  // 运动列表
  getSportList(params) {
    return this.post('/client_health_data/sport/list_page', params);
  }
  // 运动图表
  getSportChart(id) {
    return this.get(`/client_health_data/sport/chart/${id}`);
  }
  // 运动详情
  getDetailHealthSport(id) {
    return this.get(`/client_health_data/get_detail_health_sport/${id}`);
  }
  // 保存血压数据
  saveHealthBloodPressure(params) {
    return this.post('/client_health_data/save_health_blood_pressure', params);
  }
  // 删除血压数据
  deletedhealthbloodpressure(params) {
    return this.post('/client_health_data/deleted_health_blood_pressure', params);
  }
  // 保存血糖数据
  savehealthbloodsugar(params) {
    return this.post('/client_health_data/save_health_blood_sugar', params);
  }
  // 删除血糖数据
  deletedhealthbloodsugar(params) {
    return this.post('/client_health_data/deleted_health_blood_sugar', params);
  }
  // 保存体重数据
  savehealthweight(params) {
    return this.post('/client_health_data/save_health_weight', params);
  }
  // 删除体重数据
  deletedhealthweight(params) {
    return this.post('/client_health_data/deleted_health_weight', params);
  }
  // 保存运动数据
  savehealthsport(params) {
    return this.post('/client_health_data/save_health_sport', params);
  }
  // 删除运动数据
  deletedhealthsport(params) {
    return this.post('/client_health_data/deleted_health_sport', params);
  }
  // 血压列表
  getClientHealthDataOtherListPage(params) {
    return this.post('/client_health_data/get_client_health_data_other_list_page', params);
  }
  // 删除健康监测-其它
  DeletedHealthDataOther(params) {
    return this.post('/client_health_data/deleted_health_data_other', params);
  }
}

export default new HealthMonitorInterface();
