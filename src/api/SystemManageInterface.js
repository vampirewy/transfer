import BaseModule from './BaseModule';

class SystemManageInterface extends BaseModule {
  // 新增员工
  addUser(data) {
    return this.post('/user/save', data);
  }
  // 编辑员工
  editUser(data) {
    return this.put(`/user/update/${data.id}`, data);
  }
  // 员工列表
  userList(data) {
    return this.get('/user/list_page', {
      params: data,
    });
  }
  // 员工详情
  userDetail(id) {
    return this.get(`/user/${id}`);
  }
  // 开启/禁用员工
  changeUserState(id, state) {
    return this.put(`/user/on_off/${id}/${state}`);
  }
  // 删除员工
  deletedUser(data) {
    return this.post('/user/deleted', data);
  }
  // 重置密码
  updatePassword(data) {
    return this.post('/user/update_password', data);
  }
  // 角色列表
  roleList(data) {
    return this.get('/role/list', {
      params: data,
    });
  }
  // 角色列表分页
  rolePageList(data) {
    return this.get('/role/list_page', {
      params: data,
    });
  }
  // 基础菜单权限
  getMenu(data = {}) {
    return this.get('/role/get_menu', data);
  }
  // 角色新增
  addRole(data) {
    return this.post('/role/save', data);
  }
  // 角色详情
  roleDetail(id) {
    return this.get(`/role/${id}`);
  }
  // 角色编辑
  editRole(data) {
    return this.put(`/role/update/${data.id}`, data);
  }
  // 角色删除
  deleteRole(id) {
    return this.delete(`/role/${id}`);
  }
  // 角色批量删除
  deleteSomeRole(data) {
    return this.post('/role/deleted', data);
  }
  // 角色启用/禁用
  onoffRole(data) {
    return this.post('/role/on_of', data);
  }
  // 机构信息获取
  Roledetail(data) {
    return this.post('/organ_info/get_detail', data);
  }
  // 保存机构信息
  saveOrganInfo(data) {
    return this.post('/organ_info/save_organ_info', data);
  }
  // 获取评估设置模型列表
  getListPage(data) {
    return this.post('/model_assess/get_list_page', data);
  }
  // 获取评估设置模型详情
  getListDetail(id) {
    return this.get(`/model_assess/get_detail/${id}`);
  }
  // 保存评估模型信息
  saveModel(data) {
    return this.post('/model_assess/save_model_assess', data);
  }
  // 获取参数排序
  getMainList(modelCode) {
    return this.get(`/model_assess/get_main_item_list/${modelCode}`);
  }
  // 获取平均风险排序
  getAvgList(modelCode) {
    return this.get(`/model_assess/get_avg_risk_list/${modelCode}`);
  }
  // 保存平均风险设置
  saveAvg(data) {
    return this.post('/model_assess/save_avg_risk', data);
  }
  // 保存排序
  saveMainitem(data) {
    return this.post('/model_assess/save_main_item', data);
  }
  // 获取评估设置详情
  getassessList(modelCode) {
    return this.get(`/model_assess/get_model_set/${modelCode}`);
  }
  // 保存排序
  savemodelset(data) {
    return this.post('/model_assess/save_model_set', data);
  }
}

export default new SystemManageInterface();
