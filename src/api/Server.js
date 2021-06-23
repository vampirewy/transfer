/**
 * @Author: csx
 * @Description 接口暴露到全局
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

import loginInterface from './LoginInterface';
import systemManageInterface from './SystemManageInterface';
import personal from './Personal';
import userFollowInterface from './health_plan/UserFollowInterface';
import interventionPlanInterface from './health_plan/InterventionPlanInterface';
import lifeStyleInterface from './plan_center/LifeStyleInterface';
import sportListInterface from './plan_center/SportListInterface';
import interventionTemplateInterface from './plan_center/InterventionTemplateInterface';
import userManagerInterface from './user_manager/UserManagerInterface';
import workspace from './Workspace';
import reportInterface from './archives_manager/ReportInterface';
import health from './archives_manager/Health';
import healthMonitorInterface from './archives_manager/HealthMonitor';
import medicalHistoryInterface from './archives_manager/MedicalHistoryInterface';
import positionInterface from './doctor_client_management/PositionInterface';
import doctorInterface from './doctor_client_management/DoctorInterface';
import institutionalInterface from './institutional_management/InstitutionalInterface';
import doctorAuditInterface from './doctor_audit/DoctorAuditInterface';
import informationAuditInterface from './doctor_audit/InformationAuditInterface';
import projectList from './basic_data/ProjectList';

import physicalProjectListInterface from './basic_data/PhysicalProjectListInterface';
import physicalProjectTemplateInterface from './basic_data/PhysicalProjectTemplateInterface';
import unusualListInterface from './basic_data/UnusualListInterface';
import medication from './archives_manager/Medication';
import accessReport from './access_report/AccessReport';
import companyManageInterface from './company_manage/CompanyManageInterface';
import categoryManage from './category_manage/CategoryManageList';
import sportLibrary from './sport_library/SportLibrary';
import doctormoney from './doctor_client_management/DoctorMoney';
import ServiceManagerInterface from './service_manager/ServiceManagerInterface';
import statics from './statistics/Statics';
import serviceItemsInterface from './service_items_manage/ServiceItemsInterface';
import dietProgrammeInterface from './diet_manage/DietProgrammeInterface';
import dietFinishedDishInterface from './diet_manage/DietFinishedDishInterface';
import dietRawMaterial from './diet_manage/DietRawMaterial';
import dietMenuTemplateInterface from './diet_manage/DietMenuTemplateInterface';
import sunFollow from './sun/SunFollow';
import InhospitalChange from './inhospital_change/InhospitalChange';
export default {
  loginInterface,
  systemManageInterface,
  personal,
  userFollowInterface,
  interventionPlanInterface,
  lifeStyleInterface,
  sportListInterface,
  interventionTemplateInterface,
  positionInterface,
  doctorInterface,
  institutionalInterface,
  doctorAuditInterface,
  informationAuditInterface,
  userManagerInterface,
  workspace,
  reportInterface,
  health,
  healthMonitorInterface,
  medicalHistoryInterface,
  projectList,
  physicalProjectListInterface,
  physicalProjectTemplateInterface,
  unusualListInterface,
  medication,
  accessReport,
  companyManageInterface,
  categoryManage,
  sportLibrary,
  doctormoney,
  ServiceManagerInterface,
  statics,
  serviceItemsInterface,
  dietProgrammeInterface,
  dietFinishedDishInterface,
  dietRawMaterial,
  dietMenuTemplateInterface,
  sunFollow,
  InhospitalChange,
};
