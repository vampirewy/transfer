import BaseModule from './BaseModule';

class LoginInterface extends BaseModule {
  // 登录
  login(data = {}) {
    return this.post('/user/login', data);
  }
  // 退出
  logout() {
    return this.post('/user/logout');
  }
  // 获取机构信息
  getOrganizationInfo() {
    return this.get('/organization/get');
  }
  // 保存机构信息
  saveOrganizationInfo(data) {
    return this.post('/organization/save', data);
  }
  // 修改密码
  modifyPassword(data) {
    return this.post('/user/password/modify', data);
  }
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // },
  // 发送验证码
  sendCode(data, config) {
    return this.post('/sms/send', data, config);
  }
  // 校验验证码
  verifyCode(data, config) {
    return this.post('/sms/verify', data, config);
  }
  // 重置密码
  resetPassword(data, config) {
    return this.post('/user/password/reset', data, config);
  }
}

export default new LoginInterface();
