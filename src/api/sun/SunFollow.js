/**
 * @Author: csx
 * @Description api接口
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import BaseModule from '../BaseModule';

class SunFollow extends BaseModule {
  // 新增上报
  savePositiveTracking(data = {}) {
    return this.post('/positive_tracking/save', data);
  }
  // 保存跟踪回访
  savePositiveReturn(data = {}) {
    return this.post('/positive_tracking/save_positive_return', data);
  }
  // 首次跟踪列表
  getPositiveFirstListPage(data = {}) {
    return this.post('/positive_tracking/get_first_positive_list_page', data);
  }
  // 首次跟踪列表 - 导出
  exportPositiveFirst(data = {}) {
    return this.post('/positive_tracking/export_first_positive', data);
  }
  // 首次跟踪列表 - 客户的跟踪记录
  getClientRecordList(data = {}) {
    return this.post('/tracking_record/get_tracking_record_list', data);
  }
  // 首次跟踪列表 - 跟踪记录切换阳性等级
  updateReportLv(data = {}) {
    return this.post('/positive_tracking/update_report_lv', data);
  }
  // 首次跟踪列表 - 客户既往史和家族疾病史
  getClientFamilyDisease(data = {}) {
    return this.get(`/client_info/get_client_past_his_and_family_disease/${data.clientId}`);
  }
  // 首次跟踪列表 - 客户体检信息比较
  getClientReportCompareList(data = {}) {
    return this.post('/positive_tracking/get_client_report_compare_list', data);
  }
  // 首次跟踪列表 - 客户历史阳性列表
  getHistorySunList(data = {}) {
    return this.post('/positive_tracking/get_history_positive_list', data);
  }
  // 首次跟踪列表 - 客户跟踪内容
  getClientPositiveContent(data = {}) {
    return this.post('/positive_tracking/get_client_positive_content', data);
  }
  // 首次跟踪列表 - 是否结案
  getClientPositiveCloseCase(data = {}) {
    return this.post('/positive_tracking/close_case', data);
  }
  // 跟踪计划列表
  getPositiveTaskdListPage(data = {}) {
    return this.post('/positive_tracking/get_positive_return_task_list_page', data);
  }
  // 跟踪计划列表 - 客户待跟踪项目列表
  getWaitingTrackingItemList(data = {}) {
    return this.post('/tracking_record/get_waiting_tracking_item_list', data);
  }
  // 跟踪计划列表 - 客户的项目跟踪记录列表
  getRecordTrackingItemList(data = {}) {
    return this.post('/tracking_record/get_tracking_record_item_list', data);
  }
  // 跟踪记录列表
  getPositiveRecordListPage(data = {}) {
    return this.post('/positive_tracking/get_positive_record_list_page', data);
  }
  // 跟踪记录列表 - 导出
  exportPositiveRecord(data = {}) {
    return this.post('/positive_tracking/export_positive_record', data);
  }
  // 跟踪记录列表 - 查看详情
  getItemTrackingRecordList(data = {}) {
    return this.post('/tracking_record/get_item_tracking_record_list', data);
  }
  // 保存预警配置
  saveWarnTemplate(data = {}) {
    return this.post('/warn_template/save_template', data);
  }
  // 预警配置模板列表
  getWarnTemplate(data = {}) {
    return this.post('/warn_template/get_list_page', data);
  }
  // 预警配置模板详情
  getWarnTemplateDetail(data = {}) {
    return this.get(`/warn_template/get_detail/${data.id}`);
  }
  // 预警配置模板删除
  deletedWarnTemplate(data = {}) {
    return this.post('/warn_template/deleted', data);
  }
  /**
   * @description: 首次跟踪手动上报 -- 跟踪弹窗
   * @method post
   * @file http://192.168.137.12:3000/project/63/interface/api/7091
   * @param {string} trackingId 跟踪记录id
   * @param {number} result 跟踪结果（1|已回访 2|拒接 3|关机 4|通话中 5|号码错误）
   * @param {string} trackRecord 跟踪记录
   */
  saveTranking(data = {}) {
    return this.post(
      'http://192.168.137.12:3000/mock/63/positive_tracking_new/save_result',
      data,
    );
  }
  /**
   * @description: 跟踪记录列表
   * @method post
   * @file http://192.168.137.12:3000/project/63/interface/api/7151
   * @param {string} reportId 体检id
   * @param {number} recordType 记录类型 1|采集记录 2|手动上报记录
   * @param {number} pageSize
   * @param {number} pageNo
   * 返回
   * @property {number} total 总条数
   * @property {string} trackDate 跟踪时间
   * @property {string} visitDoctorName 跟踪人
   * @property {string} trackWay 跟踪方式
   * @property {string} result 跟踪结果
   * @property {string} remark 跟踪记录
   */

  getTrankingRecord(data = {}) {
    return this.post(
      'http://192.168.137.12:3000/mock/63/positive_tracking_new/get_track_record_list_page',
      data,
    );
  }
}
export default new SunFollow();
