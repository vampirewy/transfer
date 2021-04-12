import BaseModule from '../BaseModule';

class HealthMonitorInterface extends BaseModule {
  // 血压列表
  getBPList(params) {
    return this.post('/client_health_data/blood_pressure/list_page', params);
  }
  // 血压图表
  getBPChart(id) {
    return this.get(`/client_health_data/blood_pressure/chart/${id}`);
  }
  // 血糖列表
  getBGList(params) {
    return this.post('/client_health_data/blood_sugar/list_page', params);
  }
  // 血糖图表
  getBGChart(id) {
    return this.get(`/client_health_data/blood_sugar/chart/${id}`);
  }
  // 体重列表
  getWeightList(params) {
    return this.post('/client_health_data/weight/list_page', params);
  }
  // 体重图表
  getWeightChart(id) {
    return this.get(`/client_health_data/weight/chart/${id}`);
  }
  // 运动列表
  getSportList(params) {
    return this.post('/client_health_data/sport/list_page', params);
  }
  // 运动图表
  getSportChart(id) {
    return this.get(`/client_health_data/sport/chart/${id}`);
  }
}

export default new HealthMonitorInterface();
