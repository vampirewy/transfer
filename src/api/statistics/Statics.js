/**
 * @Author: csx
 * @Description api接口
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import BaseModule from '../BaseModule';

class Statics extends BaseModule {
  // 工作量统计折线
  workPlan(data = {}) {
    return this.post('/job_performance/work_chart', data);
  }
  // 建档量统计
  archivesplan(data = {}) {
    return this.post('/job_performance/client_create_chart', data);
  }
  // 获取单位列表
  getlistPage(data = {}) {
    return this.get('/work_unit/get_work_unit_list_page', { params: data });
  }
  // 管理量统计
  administer(data = {}) {
    return this.post('/job_performance/client_grid_count_chart', data);
  }
  // 干预统计
  intervene(data = {}) {
    return this.post('/job_performance/intervene_count_chart', data);
  }
}
export default new Statics();
