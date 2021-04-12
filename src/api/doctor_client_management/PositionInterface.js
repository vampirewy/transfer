/**
 * create by chenqi
 */

import BaseModule from '../BaseModule';

class PositionInterface extends BaseModule {
  // 获取职称类别
  getTitleTypeList() {
    return this.get('/crm/title/type/list');
  }

  // 获取职称列表
  getTitleInfoList(data = {}) {
    return this.get('/crm/title/list_by_page', {
      params: data,
    });
  }

  // 移除认证条件
  removeAuthCondition(data) {
    return this.post(`/crm/title/remove_auth_condition/${data.id}`);
  }

  getTitleDetail(data) {
    return this.get('/crm/title/detail', {
      params: data,
    });
  }

  // 保存职称
  saveTitle(data) {
    return this.post('/crm/title/save', data);
  }

  // 移除职称
  removeTitle(data) {
    return this.post(`/crm/title/remove/${data.id}`);
  }
}

export default new PositionInterface();
