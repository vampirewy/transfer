<template>
  <div class="intervention_tab_div">
    <div class="formSearchTitle" style="font-size: 14px;margin-top: 0;margin-bottom: 10px;">
      <span class="dianLv"></span>主要疾病
    </div>
    <disease :reportAbnormalList="form.reportAbnormalList" :notTitle="true"></disease>
    <div class="formSearchTitle" style="font-size: 14px;">
      <span class="dianLv"></span>生活方式
    </div>
    <lift-style :questionLifestyle="form.questionLifestyle" style="margin-left: 10px"></lift-style>
    <div class="formSearchTitle" style="font-size: 14px;">
      <span class="dianLv"></span>慢性病风险评估
    </div>
    <risk-assess style="margin-left: 10px" :assessList="assessList"></risk-assess>
    <div class="formSearchTitle" style="font-size: 14px;">
      <span class="dianLv"></span>重要指标
    </div>
    <important-index :clientId="$route.params.id"></important-index>
  </div>
</template>
<script>
// import { formatDate } from '~/src/libs/util';
import Disease from '@/components/user_health/disease.vue';
import LiftStyle from '@/components/user_health/lifestyle.vue';
import RiskAssess from '@/components/user_health/risk_assess.vue';
import ImportantIndex from '@/components/user_health/important_index.vue';
export default {
  name: 'Intervention_tab_userdetail_mdl',
  components: {
    Disease,
    LiftStyle,
    RiskAssess,
    ImportantIndex,
  },
  data() {
    return {
      menuNum: 0,
      active: 0,
      checkTplPlanList: [],
      tableData: [],
      assessList: {
        assess2: [],
        assess3: [],
        assess4: [],
        assess5: [],
      }, // 慢性病风险评估
      form: {
        templateId: '',
        templateList: [],
        reportAbnormalList: [], // 用户疾病
        questionLifestyle: {
          questionLifestyle1: { paramValue: '' },
          questionLifestyle2: { paramValue: '' },
          questionLifestyle3: { paramValue: '' },
          questionLifestyle4: { paramValue: '' },
          questionLifestyle5: { paramValue: '' },
        },
      },
      total: 0,
      pageNo: 1,
    };
  },
  mounted() {
    this.getUserHealthDetail(); // 获取健康信息
    this.getAssessReportDetail(); // 获取慢性病风险评估
  },
  methods: {
    clickMenu(index, id) {
      this.total = 0;
      this.active = index;
      this.form.templateId = id;
      this.pageNo = 1;
      this.getList();
    },
    async getUserHealthDetail() {
      const reqBody = {
        clientId: this.$route.params.id, // '1304360297670119426'
        sugarType: 2,
        type: 2, // 监管数据类型：1血压 2血糖 3体重 4运动
      };
      const res = await this.$api.interventionPlanInterface.getInterveneSchemeCharts(
        reqBody,
      );
      const { data } = res.data;

      this.form.reportAbnormalList = data.reportAbnormalList || null;
      this.form.questionLifestyleFamilyHistory =
        data.questionLifestyleFamilyHistory || null;
      this.form.questionLifestyleParamValueList =
        data.questionLifestyleParamValueList || [];
      if (this.form.questionLifestyleParamValueList.length > 0) {
        this.form.questionLifestyleParamValueList.forEach((value) => {
          if (value.paramNo === 'j01') {
            this.form.questionLifestyle.questionLifestyle1.paramValue = value.valueInfo;
          } else if (value.paramNo === 'j05') {
            this.form.questionLifestyle.questionLifestyle2.paramValue = value.valueInfo;
          } else if (value.paramNo === 'f01') {
            this.form.questionLifestyle.questionLifestyle3.paramValue = value.valueInfo;
          } else if (value.paramNo === 'g04') {
            this.form.questionLifestyle.questionLifestyle4.paramValue = value.valueInfo;
          } else if (value.paramNo === 'j20') {
            this.form.questionLifestyle.questionLifestyle5.paramValue = value.valueInfo;
          }
        });
      }
      console.log(this.form.questionLifestyle);
    },
    async getAssessReportDetail() {
      const reqBody = this.$route.params.id;
      const res = await this.$api.health.getAssessReportDetail(
        reqBody,
      );
      const { data } = res.data;
      console.log(data);
      data.forEach((value) => {
        if (value.lv === 2) {
          this.assessList.assess2.push(value.modelName);
        } else if (value.lv === 3) {
          this.assessList.assess3.push(value.modelName);
        } else if (value.lv === 4) {
          this.assessList.assess4.push(value.modelName);
        } else if (value.lv === 5) {
          this.assessList.assess5.push(value.modelName);
        }
      });
      console.log(this.assessList);
    },
  },
};
</script>
<style lang="scss" scoped>
  .intervention_tab_div{}
</style>
