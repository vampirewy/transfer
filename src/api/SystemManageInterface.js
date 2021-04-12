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
  // 角色列表
  roleList() {
    return this.get('/role/list');
  }
  // 角色列表分页
  rolePageList(data) {
    return this.get('/role/list_page', {
      params: data,
    });
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
}

export default new SystemManageInterface();
