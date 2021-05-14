<template>
  <div class="intervention_tab_div">
    <div class="wlall">
      <div class="wrapper">
        <div class="formSearchTitle">
          <span class="dianLves"
            ><img src="@/assets/images/common/titleLeft.png" alt="" /></span
          >基本信息
        </div>
        <div class="wrapper-right">编号：3534634564</div>
        <div class="wrap-content">
          <p>客户性别：<span>女</span></p>
          <p>客户年龄：<span>29</span></p>
          <p>手机号码：<span>13888888888</span></p>
          <p>所在单位：<span>杭州谢小妞网络科技有限公司</span></p>
          <p>管理医生：<span>谢大夫</span></p>
          <p>家庭成员：<span>轻风的爸、轻风的妈</span></p>
        </div>
        <div class="addUsers">
          <p>客户标签：</p>
          <div>
            脾气不好<img src="@/assets/images/common/remove.png" alt="" />
          </div>
          <div>
            脾气不好<img src="@/assets/images/common/remove.png" alt="" />
          </div>
          <div>
            脾气不好<img src="@/assets/images/common/remove.png" alt="" />
          </div>
          <div class="addtags">+</div>
        </div>
      </div>
      <div class="wlall-right">
        <div class="formSearchTitle">
          <span class="dianLves"
            ><img src="@/assets/images/common/titleLeft.png" alt="" /></span
          >综合评价
        </div>
        <div class="progress">
          <div class="progress-left">
            <Progress ref="myUniqueID" :protant='protent' :color='colors' :title='title'></Progress>
          </div>
          <div class="progress-right">
            <Progress ref="myUniqueID"
            :protant='protentes'
            :color='colorses' :title='titles'></Progress>
          </div>
        </div>
      </div>
    </div>
    <!-- <disease :reportAbnormalList="form.reportAbnormalList" :notTitle="true"></disease> -->
    <div class="content">
      <div class="content-left">
        <div class="formSearchTitle">
          <span class="dianLves"
            ><img src="@/assets/images/common/titleLeft.png" alt="" /></span
          >健康问题
        </div>
        <div class="formSearchTitle" style="font-size: 14px">
          <span class="dianLv"></span>异常信息
        </div>
        <abnormal
          :questionLifestyle="form.questionLifestyle"
          style="margin-left: 10px"
        ></abnormal>
        <div class="formSearchTitle" style="font-size: 14px">
          <span class="dianLv"></span>生活方式
        </div>
        <lift-style
          :questionLifestyle="form.questionLifestyle"
          style="margin-left: 10px"
        ></lift-style>
        <div class="formSearchTitle" style="font-size: 14px">
          <span class="dianLv"></span>慢性病风险评估
        </div>
        <risk-assess
          style="margin-left: 10px"
          :assessList="assessList"
        ></risk-assess>
        <div class="formSearchTitle" style="font-size: 14px">
          <span class="dianLv"></span>危险因素
        </div>
        <dangerous :clientId="$route.params.id"></dangerous>
        <div class="formSearchTitle" style="font-size: 14px">
          <span class="dianLv"></span>重要指标
        </div>
        <important-index :clientId="$route.params.id"></important-index>
        <div class="formSearchTitle" style="font-size: 14px">
          <span class="dianLv"></span>随访记录
        </div>
        <floowup :clientId="$route.params.id"></floowup>
      </div>
      <div class="content-right">
        <div class="formSearchTitle">
          <span class="dianLves"
            ><img src="@/assets/images/common/titleLeft.png" alt="" /></span
          >干预工作台
        </div>
        <el-form
          ref="form"
          class="user-edit-form"
          :model="formData"
          label-width="90px"
          :rules="rules"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="干预日期：" prop="birth">
                <el-date-picker
                  v-model="formData.birth"
                  type="date"
                  placeholder="选择出生日期"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主要内容：" prop="gridId">
                <el-select
                  v-model="formData.gridId"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    :label="item.gridName"
                    :value="item.id"
                    v-for="(item, index) in gridList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="干预形式：" prop="gridId">
                <el-select
                  v-model="formData.gridId"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    :label="item.gridName"
                    :value="item.id"
                    v-for="(item, index) in gridList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="干预医生：">
                <el-select
                  v-model="formData.ethnicGroup"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    :label="item.name"
                    :value="item.paramValue"
                    v-for="(item, index) in ethnicGroupList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="依从度：">
                <el-select
                  v-model="formData.educationLevel"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    :label="item.name"
                    :value="item.paramValue"
                    v-for="(item, index) in educationLevelList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下次干预：" prop="gender">
                <el-radio-group v-model="formData.gender">
                  <el-radio :label="1" value="1">是</el-radio>
                  <el-radio :label="2" value="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="干预提示：" prop="remark">
                <el-input
                  rows="4"
                  type="textarea"
                  placeholder="输入干预提示内容"
                  :maxlength="300"
                  show-word-limit
                  v-model="formData.remark"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="干预内容：" prop="remark">
                <el-input
                  rows="4"
                  type="textarea"
                  placeholder="输入干预内容"
                  :maxlength="300"
                  show-word-limit
                  v-model="formData.remark"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align: center; margin-top: 20px">
          <el-button class="cancelBtn" @click="$router.go(-1)">取消</el-button>
          <el-button class="sureBtn" type="primary" @click="onSubmit"
            >确定</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { formatDate } from '~/src/libs/util';
import Disease from '@/components/user_health/disease.vue';
import LiftStyle from '@/components/user_health/lifestyle.vue';
import RiskAssess from '@/components/user_health/risk_assess.vue';
import ImportantIndex from '@/components/user_health/important_index.vue';
import abnormal from '@/components/user_health/abnormal.vue';
import dangerous from '@/components/user_health/dangerous.vue';
import floowup from '@/components/user_health/floowup.vue';
import Progress from '@/components/user_health/progress.vue';
export default {
  name: 'Intervention_tab_userdetail_mdl',
  components: {
    Disease,
    LiftStyle,
    RiskAssess,
    ImportantIndex,
    abnormal,
    dangerous,
    floowup,
    Progress,
  },
  data() {
    return {
      protent: '30',
      colors: '#24499D',
      protentes: '70',
      colorses: '#7CA7FF',
      title: '整体评分',
      titles: '依从度',
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
      formData: {
        birth: '', // 1992-01-04
        gridId: '',
        userRealName: '',
        profession: '',
        address: '',
        tagList: [],
        mobile: '',
        name: '',
        age: '',
        gender: '',
        cardNo: '',
        marriage: '',
        ethnicGroup: '',
        educationLevel: '',
        remark: '',
        tag: '',
        workUnitName: '',
        workUnitAddress: '',
        userIdList: [],
        workIdList: [],
        selectedDoctors: [],
        workUnitDepartment: '',
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
            this.form.questionLifestyle.questionLifestyle1.paramValue =
              value.valueInfo;
          } else if (value.paramNo === 'j05') {
            this.form.questionLifestyle.questionLifestyle2.paramValue =
              value.valueInfo;
          } else if (value.paramNo === 'f01') {
            this.form.questionLifestyle.questionLifestyle3.paramValue =
              value.valueInfo;
          } else if (value.paramNo === 'g04') {
            this.form.questionLifestyle.questionLifestyle4.paramValue =
              value.valueInfo;
          } else if (value.paramNo === 'j20') {
            this.form.questionLifestyle.questionLifestyle5.paramValue =
              value.valueInfo;
          }
        });
      }
    },
    async getAssessReportDetail() {
      const reqBody = this.$route.params.id;
      const res = await this.$api.health.getAssessReportDetail(reqBody);
      const { data } = res.data;
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
    },
  },
};
</script>
<style lang="scss" scoped>
.intervention_tab_div {
  padding: 20px;
  border-radius: 20px;
  background: #f6f8fc;
}
/deep/ .dianLves {
  img {
    width: 7px;
    margin: 0 7px 2px 0;
  }
}
.wlall {
  display: flex;
  justify-content: space-between;
}
.wrapper {
  width: 65%;
  height: 180px;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 6px 24px 0px rgba(14, 37, 87, 0.06);
  border-radius: 8px;
  position: relative;
  .wrapper-right {
    width: 130px;
    height: 24px;
    background: #36bf2f;
    border-radius: 12px 0px 0px 12px;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    color: #fff;
    position: absolute;
    top: 20px;
    right: 0;
  }
  .wrap-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    flex-wrap: wrap;
    p {
      font-size: 14px;
      color: #666;
      font-weight: 400;
      text-align: left;
      width: 33.33%;
      span {
        color: #333;
      }
    }
  }
  .addUsers {
    display: flex;
    align-items: center;
    height: 30px;
    flex-wrap: wrap;
    p {
      font-size: 14px;
      color: #666;
      font-weight: 400;
    }
    div {
      padding: 8px 14px;
      background: #eef1f5;
      border-radius: 16px;
      font-size: 12px;
      color: #333;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      img {
        width: 16px;
        margin-left: 2px;
      }
      &:hover {
        cursor: pointer;
      }
    }
    .addtags {
      padding: 0px;
      width: 24px;
      height: 24px;
      background: #f6f8fc;
      border-radius: 5px;
      font-size: 26px;
      font-weight: 800px;
      color: forestgreen;
    }
  }
}
.wlall-right {
  width: 27%;
  height: 180px;
  background: #ffffff;
  box-shadow: 0px 6px 24px 0px rgba(14, 37, 87, 0.06);
  border-radius: 8px;
  padding: 20px;
}
.content {
  display: flex;
  background: #fff;
  box-shadow: 0px 6px 24px 0px rgba(14, 37, 87, 0.06);
  border-radius: 8px;
  margin-top: 20px;
  padding: 20px;
  .content-left {
    width: 59%;
    border-right: 1px dotted #dde0e6;
    padding-right: 20px;
  }
  .content-right {
    width: 40%;
    padding: 20px;
  }
}
/deep/ .el-table .el-table__body td {
  height: 48px;
}
.progress{
  padding:0 20px;
  display: flex;
  justify-content: space-between;
}
</style>
