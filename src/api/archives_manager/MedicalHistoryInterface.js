import BaseModule from '../BaseModule';

class MedicalHistoryInterface extends BaseModule {
  // 就医史分页列表
  medicalHistoryPageList(data) {
    return this.post('/medical_info/list_page', data);
  }
  otherMedicalHistoryPageList(id, data) {
    return this.post(`/medical_info/client_other_list_page/${id}`, data);
  }
  // 新增、编辑
  medicalInfo(data) {
    return this.post('/medical_info', data);
  }
  // 详情
  medicalInfoDetail(id) {
    return this.get(`/medical_info/detail/${id}`);
  }
  // 删除
  deleteMedicalInfo(id) {
    return this.delete(`/medical_info/${id}`);
  }
  // 批量删除
  batchDeleteMedicalInfo(ids) {
    return this.post('/medical_info/batch/delete', ids);
  }
  // 人员类别
  clientTypeList(data) {
    return this.get('/client_grid/get_grid_list', {
      params: data,
    });
  }
}

export default new MedicalHistoryInterface();
