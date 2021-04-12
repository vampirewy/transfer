import BaseModule from './BaseModule';

class Workspace extends BaseModule {
  // 全部概况
  allCount(data) {
    return this.post(
      '/workbench/get_last_seven_day_count',
      data,
    );
  }
  // 血压数量
  monitorCount() {
    return this.get('/workbench/get_to_day_monitor_count');
  }
  // 随访方式数据
  followCount(data) {
    return this.post(
      '/workbench/get_to_day_follow_way_count',
      data,
    );
  }
  // 客户数量
  customerCount(data) {
    return this.post(
      '/workbench/get_to_day_customer_count',
      data,
    );
  }
  // 保存回访
  saveRetun(data = {}) {
    return this.post('/workbench/need_return_vist', data);
  }
  // 异常回访列表
  returnPage(params) {
    return this.post(
      '/workbench/get_last_seven_day_exception_intervene_page_list',
      params,
    );
  }
  // 查看异常内容
  unusualMessage(id) {
    return this.get(`/workbench/${id}`);
  }
  // 确认无需回访
  unReturned(id) {
    return this.get(`/workbench/not_need_return_vist/${id}`);
  }
  // 随访计划列表
  followPlanList(params) {
    return this.post(
      '/workbench/get_last_seven_day_intervene_plan_page_list',
      params,
    );
  }
}
export default new Workspace();
