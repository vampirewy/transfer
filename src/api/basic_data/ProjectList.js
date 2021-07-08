/**
 * @Author: csx
 * @Description api接口
 * @Date: 2021/4/15 22:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 22:06
 */

import BaseModule from '../BaseModule';

class ProjectList extends BaseModule {
  // 获取模板分类主题列表
  getSortlist(data = {}) {
    return this.post('/message_template/get_sort_list', data);
  }
  // 新增短信模板分类
  saveMessageTemplate(data = {}) {
    return this.post('/message_template/save_message_template', data);
  }
  // 项目库列表
  systemItemList(data = {}) {
    return this.post('/system_item/list_page', data);
  }
  // 项目库id获取详情
  systemItemDetail(data = {}) {
    return this.get(`/system_item/${data.id}`);
  }
  // 项目库 匹配新增
  systemIteMatch(data = {}) {
    return this.post('/system_item_match/match', data);
  }
  // 短信列表
  smsList(data = {}) {
    return this.post('/message_template/get_list_page', data);
  }
  // 短信列表详情
  smsListInfo(data) {
    return this.get(`/message_template/get_detail/${data}`);
  }
  // 删除列表数据
  removeSome(data) {
    return this.post('/message_template/deleted', data);
  }
  // ------------------危险因素 ---------------
  // 个人中心危险因素列表
  riskList(questionId) {
    return this.get(`/home/get_question_risk_factor/${questionId}`);
  }
  // 危险因素列表详情
  riskListInfo(data) {
    return this.get(`/system_risk/get_detail/${data}`);
  }
  // 删除危险列表数据
  riskRemove(data) {
    return this.post('/system_risk/deleted', data);
  }
  // 危险因素保存
  savesystemrisk(data) {
    return this.post('/system_risk/save_system_risk', data);
  }
}

export default new ProjectList();
