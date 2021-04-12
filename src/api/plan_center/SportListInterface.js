/**
 * @Author: jrucker
 * @Description api接口
 * @Date: 2020/8/19 19:06
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/19 19:06
 */

import BaseModule from '../BaseModule';

class SportListInterface extends BaseModule {
  // 修改运动库
  updateSportLibrary(data = {}) {
    return this.put('/sport_library/update_sport_library', data);
  }

  // 分页查询运动库
  getSportLibraryListPage(data = {}) {
    return this.get('/sport_library/get_sport_library_list_page', {
      params: data,
    });
  }

  // 新增运动库
  saveSportLibrary(data = {}) {
    return this.post('/sport_library/save_sport_library', data);
  }

  // 根据id获取运动库
  getSportLibraryById(data = {}) {
    return this.get(`/sport_library/get_sport_library_by_id/${data.id}`);
  }

  // 根据id删除运动库
  removeSportLibrary(data = {}) {
    return this.delete(`/sport_library/remove_sport_library/${data.id}`);
  }
}

export default new SportListInterface();
