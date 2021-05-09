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
    return this.delete(`/organ_item/${data.id}`);
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
  // -------------------异常匹配-------------------------
  // 列表
  systemlistpage(data = {}) {
    return this.post('/system_item/list_page', data);
  }
}
export default new PhysicalProjectListInterface();
