/**
 * @Author: csx
 * @Description api接口
 * @Date: 2021/4/15 22:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 22:06
 */

import BaseModule from '../BaseModule';

class ProjectList extends BaseModule {
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
}

export default new ProjectList();
