import BaseModule from '../BaseModule';

class UserManagerInterface extends BaseModule {
  fetchUserList(params = {}) {
    return this.post('/client_info/get_client_info_list_page', params);
  }

  getDetail(userId) {
    return this.get(`/client_info/get_client_info_detail/${userId}`);
  }

  getSystemParamByCode(code) {
    return this.get(`/system_param_value/${code}`);
  }

  searchDoctor(data) {
    return this.get('/user/doctor/search', {
      params: data,
    });
  }

  saveOrEditUser(params = {}) {
    return this.post('/client_info/edit_client_info', params);
  }

  removeFile(params = {}) {
    return this.post('/client_info/delete_client_info_annex', params);
  }

  removeMultiFile(params = {}) {
    return this.post('/client_info/deleted_annex', params);
  }

  deleteClientInfo(params = {}) {
    return this.post('/client_info/deleted_client_info', params);
  }

  editUserStatus(params = {}) {
    return this.post('/client_info/enable_client_info', params);
  }

  fetchFileList(params = {}) {
    return this.post(
      '/client_info/get_client_info_annex__list_page',
      params,
    );
  }
  saveNewFile(params = {}) {
    return this.post('/client_info/save_client_info_annex', params);
  }
  claim(params = {}) {
    return this.post('/client_info/assignation_client_info', params);
  }

  getDoctorList(params = {}) {
    return this.get(
      `/user/list_page?pageNo=${params.pageNo}&pageSize=${params.pageSize}&search=${params.keyword}`,
    );
  }

  getDoctors(params = {}) {
    return this.get(
      `/user/doctor/search?pageNo=${params.pageNo}&pageSize=${params.pageSize}&keyword=${params.keyword}`,
    );
  }

  getWorkhomes(params = {}) {
    return this.get(
      `/workhome/get_workhome_list?pageNo=${params.pageNo}&pageSize=${params.pageSize}&name=${params.keyword}&clientId=${params.clientId}`,
    );
  }
  // 查询人员类别
  getGridList(data = {}) {
    return this.get('/client_grid/get_grid_list', {
      params: data,
    });
  }
  // // 查询医生管理列表
  // getList(data = {}) {
  //   return this.get('/crm/doctor/list', {
  //     params: data,
  //   });
  // }
}

export default new UserManagerInterface();
