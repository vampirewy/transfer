/**
 * create by chenqi
 */

import BaseModule from '../BaseModule';

class DoctorMoney extends BaseModule {
  // 获取员工列表
  getDoctorList(data = {}) {
    return this.get('/user/list_page', {
      params: data,
    });
  }
  // 开启/禁用员工
  changeUserState(id, state) {
    return this.put(`/user/on_off/${id}/${state}`);
  }
  // 员工登录时间ip记录
  getusertimer(data = {}) {
    return this.get('/user/loginHistory', {
      params: data,
    });
  }
}

export default new DoctorMoney();
