/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/9/1 9:45
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/9/1 9:45
 */

import BaseModule from '../BaseModule';

class PhysicalProjectTemplateInterface extends BaseModule {
  // 列表体检库模板
  listPage(data = {}) {
    return this.post('/report_template/list_page', data);
  }

  // 体检库模板详情
  getReportTemplate(data = {}) {
    return this.get(`/report_template/${data.id}`);
  }

  // 新增体检库模板
  saveReportTemplate(data = {}) {
    return this.post('/report_template/save', data);
  }

  // 编辑体检库模板
  updateReportTemplate(data = {}) {
    return this.put(`/report_template/update/${data.id}`, data);
  }

  // 删除体检库模板
  deleteReportTemplate(data = {}) {
    return this.post('/report_template/delete', data);
  }
}

export default new PhysicalProjectTemplateInterface();
