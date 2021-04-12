/**
 * @Author: jrucker
 * @Description api接口
 * @Date: 2020/8/19 19:06
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/19 19:06
 */

import BaseModule from '../BaseModule';

class LifeStyleInterface extends BaseModule {
  // 修改生活方式
  updateLifeStyle(data = {}) {
    return this.put('/life_style_template/update_life_style', data);
  }
  // 分页获取生活方式
  getLifeStyleListPage(data = {}) {
    return this.get('/life_style_template/get_life_style_list_page', {
      params: data,
    });
  }
  // 新增生活方式
  saveLifeStyle(data = {}) {
    return this.post('/life_style_template/save_life_style', data);
  }
  // 根据id获取生活方式
  getLifeStyleById(data = {}) {
    return this.get(`/life_style_template/get_life_style_by_id/${data.id}`);
  }
  // 根据id删除生活方式
  removeLifeStyle(ids) {
    return this.delete('/life_style_template/remove_life_style', {
      params: {
        ids,
      },
    });
  }
  // 指导类型
  getGuideTypeList() {
    return this.get('/system_param_value/ZY005');
  }
}

export default new LifeStyleInterface();
