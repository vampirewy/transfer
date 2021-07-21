/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 9:44
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 9:44
 */

import BaseModule from '../BaseModule';

class PhysicalProjectListInterface extends BaseModule {
  // 体检库项目列表（小项）
  listPage(data = {}) {
    return this.post('/organ_item/list_page', data);
  }
  // 体检库
  pageorganitemlibrary(data = {}) {
    return this.post('/organ_item_library/page_list', data);
  }
  // 体检库项目详情
  getOrganItem(data = {}) {
    return this.get(`/organ_item/${data}`);
  }

  // 体检库项目新增
  saveOrganItem(data = {}) {
    return this.post('/organ_item/save', data);
  }

  // 体检库项目编辑
  updateOrganItem(data = {}) {
    return this.put(`/organ_item/update/${data.id}`, data);
  }

  // 体检库项目删除
  deleteOrganItem(data = {}) {
    return this.delete(`/organ_item/${data}`);
  }

  // 列表体检库
  listOrganItemLibrary() {
    return this.get('/organ_item_library/list');
  }

  // 删除体检库
  deleteOrganItemLibrary(data = {}) {
    return this.delete(`/organ_item_library/${data.id}`);
  }

  // 新增体检库
  saveOrganItemLibrary(data = {}) {
    return this.post('/organ_item_library/save', data);
  }

  // 编辑体检库
  updateOrganItemLibrary(data = {}) {
    return this.put(`/organ_item_library/update/${data.id}`, data);
  }

  changeLibrary(data = {}) {
    return this.post('/report_template/change_library', data);
  }

  // 获取科室列表
  getSectionList(data = {}) {
    return this.get('/organ_item/get_section_list', {
      params: data,
    });
  }
  // -------------------指标匹配-------------------------
  // 列表
  systemlistpage(data = {}) {
    return this.post('/system_item/list_page', data);
  }
  // 详情
  Exceptionsystemitem(data = {}) {
    return this.get(`/system_item/${data}`);
  }
  // -------------------异常匹配-------------------------
  // 列表
  Exceptionlistpage(data = {}) {
    return this.post('/report_abnormal_temp/page_list', data);
  }
  // 匹配提交
  Exceptionmatch(data = {}) {
    return this.post('/report_abnormal_temp/match', data);
  }
  // 列表异常组合
  listabnormal(data = {}) {
    return this.post('/group_abnormal/list_page', data);
  }
  // 详情异常
  abnormaldetail(data = {}) {
    return this.get(`/group_abnormal/get_detail/${data}`);
  }
  // 列表异常组合中的异常
  grouplistabnormal(data = {}) {
    return this.post('/group_abnormal/abnormal_list_page', data);
  }
  // 保存组合异常
  savegroupabnormal(data = {}) {
    return this.post('/group_abnormal/save_group_abnormal_config', data);
  }
}
export default new PhysicalProjectListInterface();
