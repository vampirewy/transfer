/**
 * @Author: csx
 * @Description api接口
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import BaseModule from '../BaseModule';

class Sportlibrary extends BaseModule {
  // 运动下拉选项
  getsportList(id, data) {
    return this.get(`/system_param_value/${id}`, {
      params: data,
    });
  }
  // 运动库项目新增
  saveSportItem(data = {}) {
    return this.post('/sport_library/save_sport_library', data);
  }
  // 根据id获取详情
  getdetailList(id, data) {
    return this.get(`/sport_library/get_sport_library_by_id/${id}`, {
      params: data,
    });
  }
  // 运动库删除
  deletesportDel(data = {}) {
    return this.post('/sport_library/remove_sport_library', data);
  }
  // 获取查询列表
  sportlistPage(data = {}) {
    return this.get('/sport_library/get_sport_library_list_page', { params: data });
  }
  // 运动库保存
  updatesport(data = {}) {
    return this.put('/sport_library/update_sport_library', data);
  }
}

export default new Sportlibrary();
