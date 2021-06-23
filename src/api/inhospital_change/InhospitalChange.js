/**
 * @Author: csx
 * @Description api接口
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import BaseModule from '../BaseModule';

class InhospitalChange extends BaseModule {
  // 新增院内转诊
  saveRegistration(data = {}) {
    return this.post('/registration/save_registration', data);
  }
  // 院内转诊列表
  getRegistrationListPage(data = {}) {
    return this.post('/registration/get_list_page', data);
  }
  // 院内转诊详情
  getRegistrationDetail(data = {}) {
    return this.get(`/registration/get_detail/${data.id}`);
  }
  // 导出 - 院内转诊列表
  exportRegistrationListPage(data = {}) {
    return this.post('/registration/export_list', data);
  }
  // 院内转诊 - 取消预约
  upstateRegistrationState(data = {}) {
    return this.post('/registration/upstate_state', data);
  }
  // 统计
  // 院内转诊统计 - 四数据
  getRegistrationStatistics(data = {}) {
    return this.post('/positive_registration/get_registration_statistics', data);
  }
  // 检后就诊趋势统计
  getCheckAfterStatistics(data = {}) {
    return this.post('/check_after/get_check_after_statistics', data);
  }
  // 阳性就诊top排名 - 列表
  getPositiveCheckTopList(data = {}) {
    return this.post('/check_after/positive_check_top', data);
  }
  // 阳性就诊top排名 - 导出
  exportPositiveCheckTopList(data = {}) {
    return this.post('/check_after/export_positive_check_top', data);
  }
  // 就医转化率 - 漏斗图
  getSeeDoctorRateStatistics(data = {}) {
    return this.post('/check_after/see_doctor_rate_statistics', data);
  }
  // 就诊科室top排名 - 列表
  getDepartmentCheckTopList(data = {}) {
    return this.post('/check_after/department_check_top', data);
  }
  // 就诊科室top排名 - 导出
  exportDepartmentCheckTopList(data = {}) {
    return this.post('/check_after/export_department_check_top', data);
  }
  // 科室 - 检后就医费用构成分析
  getSeeDoctorFeeStructureDepartment(data = {}) {
    return this.post('/check_after/see_doctor_fee_structure_department', data);
  }
  // 阳性 - 检后就医费用构成分析
  getSeeDoctorFeeStructurePositive(data = {}) {
    return this.post('/check_after/see_doctor_fee_structure_positive', data);
  }
}
export default new InhospitalChange();
