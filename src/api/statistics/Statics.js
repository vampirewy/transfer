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
  // 统计
  abnormal(data = {}) {
    return this.post('/report_abnormal_statistics/statistics_list', data);
  }
  // BMI统计类
  reportList(data = {}) {
    return this.post('/static_report_item/cake_statistics_list', data);
  }
  // BMI列表统计/report_abnormal_statistics/get_client_list_page
  reportclientList(data = {}) {
    return this.post('/static_report_item/get_client_list_page', data);
  }
  // top10列表
  staticclientList(data = {}) {
    return this.post('/report_abnormal_statistics/get_client_list_page', data);
  }
  // top10条形图统计
  abnormalclientList(data = {}) {
    return this.post('/report_abnormal_statistics/statistics_list', data);
  }
  // 男性异常top10条形图统计
  manabnormalclientList(data = {}) {
    return this.post('/report_abnormal_statistics/man_statistics_list', data);
  }
  // 女性异常top10条形图统计
  womanabnormalclientList(data = {}) {
    return this.post('/report_abnormal_statistics/woman_statistics_list', data);
  }
  // 生活方式，吸烟，饮酒，膳食结构，运动情况，睡眠情况图表
  lifeclientList(data = {}) {
    return this.post('/static_question_life_style/cake_statistics_list', data);
  }
  // 生活方式统计列表
  getlifeclientList(data = {}) {
    return this.post('/static_question_life_style/get_client_list_page', data);
  }
  // 中医体质辨识统计列表
  tcmlifeclientList(data = {}) {
    return this.post('/question_tcm/get_client_list_page', data);
  }
  // 心理统计列表
  psylifeclientList(data = {}) {
    return this.post('/question_psy/get_client_list_page', data);
  }
  lifedoctorList(data = {}) {
    return this.post('/question_tcm/statistics_list', data);
  }
  // 统计图表
  psydoctorList(data = {}) {
    return this.post('/question_psy/statistics_list', data);
  }
}
export default new Statics();
