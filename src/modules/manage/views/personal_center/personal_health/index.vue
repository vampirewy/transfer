<template>
  <div>
    <!-- <client-info v-if="showTopLeft"></client-info> -->
    <div class="health_questionnaire_edit">
      <div
        class="intvTmpl_left"
        id="intvTmpl_left"
        :class="{ isFixed: searchBarFixed === true }"
        v-if="showTopLeft"
        style="max-height: 30000px; height: auto"
      >
        <div class="headimage">
          <div class="userimg">
            <img src="@/assets/images/common/user.png" alt="" />
            <div class="userImg">
              <img src="@/assets/images/common/usernews.png" alt="" />
            </div>
          </div>
          <div class="username">{{userlist.name}}</div>
          <div class="usertype">{{userlist.gridName}}</div>
        </div>
        <!-- <div class="intvTmpl_left_title">个人管理中心</div> -->
        <ul class="intv_menulist">
          <li
            :class="{ active: active === index }"
            @click="clickMenu(index, '#questions-' + index)"
            v-for="(item, index) in templateList"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div
        class="health_questionnaire_form"
        :class="{ isFixedForm: searchBarFixed === true }"
      >
        <template>
          <div class="intervention_tab_div">
            <div class="wlall">
              <div class="wrapper">
                <div class="formSearchTitle">
                  <span class="dianLves"
                    ><img
                      src="@/assets/images/common/titleLeft.png"
                      alt="" /></span
                  >基本信息
                </div>
                <div class="wrapper-right">编号：{{userlist.clientNo}}</div>
                <div class="wrap-content">
                  <p>客户性别：<span>{{userlist.gender === 1 ? '男' : '女'}}</span></p>
                  <p>客户年龄：<span>{{userlist.age}}</span></p>
                  <p>手机号码：<span>{{userlist.mobile}}</span></p>
                  <p>所在单位：<span>{{userlist.workUnitName}}</span></p>
                  <p>管理医生：<span
                  v-for="(item, index) in userlist.userList"
                  :key="index">{{item.realName}} </span></p>
                  <!-- <p>家庭成员：<span>{{userlist.age}}</span></p> -->
                </div>
                <div class="addUsers">
                  <p>客户标签：</p>
                  <!-- <div>
                    脾气不好<img
                      src="@/assets/images/common/remove.png"
                      alt=""
                    />
                  </div> -->
                  <div v-for="(item, index) in userlist.tagList"
                  :key="index">
                    {{item.tag}}
                  </div>
                  <!-- <div class="addtags">+</div> -->
                </div>
              </div>
              <div class="wlall-right">
                <div class="formSearchTitle">
                  <span class="dianLves"
                    ><img
                      src="@/assets/images/common/titleLeft.png"
                      alt="" /></span
                  >综合评价
                </div>
                <div class="progress">
                  <div class="progress-left">
                    <Progress
                      ref="myUniqueID"
                      :protant="protent"
                      :color="colors"
                      :title="titless"
                    ></Progress>
                  </div>
                  <div class="progress-right">
                    <Progress
                      ref="myUniqueID"
                      :protant="protentes"
                      :color="colorses"
                      :title="titles"
                    ></Progress>
                  </div>
                </div>
              </div>
            </div>
            <div class="content">
              <div class="content-left">
                <health-userdetail v-if="active === 0"></health-userdetail>
                <danger-risk v-if="active === 1"></danger-risk>
                <health-assess v-if="active === 2"></health-assess>
                <questiones v-if="active === 3"></questiones>
                <doctor v-if="active === 4"></doctor>
                <check v-if="active === 5"></check>
                <medication v-if="active === 6"></medication>
                <monitor v-if="active === 7"></monitor>
                <personalexport v-if="active === 8"></personalexport>
                <food :name="userlist.name" v-if="active === 9"></food>
                <intervance v-if="active === 10"></intervance>
                <intervancerecord v-if="active === 11"></intervancerecord>
              </div>
              <div class="content-right">
                <div class="formSearchTitle">
                  <span class="dianLves"
                    ><img
                      src="@/assets/images/common/titleLeft.png"
                      alt="" /></span
                  >干预随访操作台
                </div>
                <el-form :inline="false" :model="form"
                         label-width="85px"
                         :rules="rules"
                         ref="form"
                         class="form-inline inputCommon baseInfo" >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="执行时间：" prop="planDate">
                        <el-date-picker
                                v-model="form.planDate"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="请选择"
                                :max-date="new Date()"
                                style="width: 100%"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="随访形式：" prop="planWay">
                        <el-select v-model="form.planWay"
                                   style="width: 100%" placeholder="请选择">
                          <el-option :label="it.name" :value="it.id" :key="it.id"
                                     v-for="it in planWayList">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="随访人："  prop="planDoctorName">
                        <el-input disabled
                                  v-model="form.planDoctorName" placeholder="">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="随访标题：">
                        <el-input
                                v-model="form.planTitle"
                                :maxlength="30"
                                placeholder="请输入"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="依从度：" prop="assortLevel">
                        <el-select v-model="form.assortLevel" placeholder="请选择" style="width: 100%">
                          <el-option :label="it.name" :value="it.paramValue" :key="it.paramValue"
                                     v-for="it in assortLevelList">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="随访结果：">
                        <el-input
                                type="textarea"
                                v-model="form.planContent"
                                :rows="4"
                                placeholder="请输入"
                                :maxlength="400"
                                show-word-limit
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div style="text-align: center; margin-top: 20px">
                  <el-button class="cancelBtn" @click="$router.go(-1)"
                    >取消</el-button
                  >
                  <el-button class="sureBtn" type="primary" @click="onSubmit"
                    >确定</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import * as dayjs from 'dayjs';
import ClientInfo from './el_modal/client_info.vue';
import HealthUserdetail from './el_modal/health_userdetail.vue';
import DangerRisk from './el_modal/danger_risk.vue';
import HealthAssess from './el_modal/health_assess.vue';
import UserdetaiIntervene from '../../health_plan/user_follow_create/el_modal/userdetail_intervene.vue';
import UserdetailFollowplan from '../../health_plan/user_follow_create/el_modal/userdetail_followplan.vue';
import UserdetailFollowrecord from '../../health_plan/user_follow_create/el_modal/userdetail_followrecord.vue';
import Report from './el_modal/report.vue';
import HealthQuestionnaire from './el_modal/health_questionnaire.vue';
import MedicationHistory from './el_modal/medication_history.vue';
import MedicalHistory from './el_modal/medical_history.vue';
import Questiones from './el_modal/question.vue';
import Progress from '@/components/user_health/progress.vue';
import Doctor from './el_modal/seedoctor.vue';
import Check from './el_modal/check.vue';
import Medication from './el_modal/medication.vue';
import Personalexport from './el_modal/personalexport.vue';
import food from './el_modal/food.vue';
import intervance from './el_modal/intervance.vue';
import intervancerecord from './el_modal/intervancerecord.vue';
import Monitor from './el_modal/monitor.vue';
export default {
  name: 'index',
  components: {
    ClientInfo,
    HealthUserdetail, // 个人信息
    DangerRisk, // 危险因素
    HealthAssess, // 健康风险评估
    UserdetaiIntervene, // 随访干预
    UserdetailFollowplan, // 随访计划
    UserdetailFollowrecord, // 随访记录
    Report, // 体检报告
    HealthQuestionnaire, // 健康问卷
    MedicationHistory, // 用药
    MedicalHistory, // 就医
    Questiones, // 问卷量表
    Progress,
    Doctor,
    Check,
    Medication,
    Personalexport, // 个人健康报告
    food, // 膳食
    intervance, // 干预计划
    intervancerecord,
    Monitor, // 干预记录
  },
  data() {
    return {
      userlist: [],
      active: 0,
      title: '',
      showTopLeft: true,
      clientId: this.$route.params.id,
      planWayList: [],
      assortLevelList: [],
      templateList: [
        { name: '健康问题', active: 0 },
        { name: '危险因素', active: 1 },
        { name: '体检报告', active: 2 },
        { name: '问卷量表', active: 3 },
        { name: '就医记录', active: 4 },
        { name: '单项检查', active: 5 },
        { name: '用药记录', active: 6 },
        { name: '健康监测', active: 7 },
        { name: '个人健康报告', active: 8 },
        { name: '膳食方案', active: 9 },
        { name: '待随访计划', active: 10 },
        { name: '随访记录', active: 11 },
      ],
      protent: '30',
      colors: '#24499D',
      protentes: '70',
      colorses: '#7CA7FF',
      titless: '整体评分',
      titles: '依从度',
      formData: {
        birth: new Date(), // 1992-01-04
        gridId: '',
        userRealName: '',
        profession: '',
        address: '',
        tagList: [],
        mobile: '',
        name: '',
        age: '',
        gender: '2',
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
      searchBarFixed: false,
      form: {
        clientId: '',
        planDate: '',
        planWay: '',
        planDoctor: '',
        planDoctorName: '',
        planTitle: '',
        planContent: '',
        assortLevel: '',
      },
      rules: {
        planDate: [{ required: true, message: '请选择执行时间' }],
        planWay: [{ required: true, message: '请选择随访形式' }],
        planDoctorName: [{ required: true, message: '请选择随访人' }],
        assortLevel: [{ required: true, message: '请选择依从度' }],
      },
    };
  },
  watch: {},
  methods: {
    getClientUserInfo(id) {
      this.$api.userManagerInterface.getDetail(id).then(({ data }) => {
        if (data.rc === 0) {
          this.userlist = data.data;
        }
      });
    },
    /**
     * 获取随访方式
     * @return {Promise<void>}
     */
    async getPlanWayList() {
      const res = await this.$api.userFollowInterface.getIntervenePlanWayList();
      const { data } = res.data;
      const list = data.map((it) => {
        const { id, name } = it;
        return { id, name };
      });
      this.planWayList = list;
    },
    async getSystemParamByassortLevel(code) {
      const res = await this.$api.userManagerInterface.getSystemParamByCode(code);
      const { data } = res.data;
      this.assortLevelList = data;
    },
    async getUserInfo() {
      const res = await this.$api.userManagerInterface.getUserInfo();
      const { data } = res.data;
      this.form.planDoctor = data.userId;
      this.form.planDoctorName = data.realName;
    },
    /**
     * 获取随访计划明细
     */
    async getDetail() {
      const reqBody = { id: this.$route.params.waitVisitId };
      const res = await this.$api.userFollowInterface.getIntervenePlan(
        reqBody,
      );
      const { data } = res.data;
      this.form.clientId = data.clientId;
      this.form.planDate = dayjs(new Date()).format('YYYY-MM-DD'); // data.planDate ? data.planDate.split(' ')[0] : '';
      this.form.planWay = data.planWay;
      this.form.planTitle = data.planTitle;
      this.form.planDoctor = data.currentOperateUserId; // this.$store.state.user.userId;
      this.form.planDoctorName = data.currentOperateUserName; // this.$store.state.user.userName;
    },
    /**
     * 新增随访
     * @return {Promise<ElMessageComponent>}
     */
    async onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const reqBody = {
            id: this.$route.params.waitVisitId,
            clientId: this.form.clientId,
            executeState: '1', // 执行状态值为1已执行，2待执行
            updateType: 'executeUpdate',
            executeTime: `${this.form.planDate} 00:00:00`, // 执行时间
            executePlanWay: this.form.planWay, // 执行干预方式
            executePlanUserId: this.form.planDoctor, // 执行随访人
            executePlanTitle: this.form.planTitle, // 执行标题
            assortLevel: this.form.assortLevel, // 依从度
            executePlanContent: this.form.planContent, // 执行内容
          };
          await this.$api.userFollowInterface.intervenePlanUpdate(reqBody);
          this.$message.success('操作成功');
          this.form.planContent = '';
          this.form.assortLevel = '';
          this.$refs.form.resetFields();
        }
      });
    },
    clickMenu(index, selector) {
      this.active = index;
      console.log(selector);
      /* const anchor = this.$el.querySelector(selector);
      console.log(anchor.offsetTop);
      document.documentElement.scrollTop = anchor.offsetTop;*/
    },
    changeShow(status) {
      this.showTopLeft = status;
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const offsetTop = document.querySelector('#intvTmpl_left').offsetTop;
      if (scrollTop > offsetTop - 140 && scrollTop > 140) {
        this.searchBarFixed = true;
      } else {
        this.searchBarFixed = false;
      }
      const article = document.querySelectorAll('.articleTitle');
      article.forEach((item, index) => {
        if (scrollTop >= item.offsetTop - 200) {
          this.active = index;
        }
      });
    },
  },
  mounted() {
    this.getClientUserInfo(this.$route.params.id);
    this.getPlanWayList(); // 随访方式
    this.getSystemParamByassortLevel('HM012');
    this.getUserInfo();
    if (this.$route.params.waitVisitId) { // 有执行计划过来的才获取详情
      this.getDetail();
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const VM = vm;
      if (localStorage.getItem('personalHealthActive')) {
        // 返回的定位
        VM.active = Number(localStorage.getItem('personalHealthActive'));
        localStorage.removeItem('personalHealthActive');
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.health_questionnaire_edit {
  margin-top: 30px;
  display: flex;
  border-radius: 20px 20px 0 0;
  background-color: white;
  #intvTmpl_left {
    &.isFixed {
      position: fixed;
      top: 0;
      z-index: 1;
    }
  }
  .isFixedForm {
    margin-left: 190px;
  }
  /deep/ .el-form--label-top .el-form-item__label {
    font-size: 16px;
    color: #333333 !important;
    position: relative;
    font-weight: bold;
    &:before {
      content: '';
      width: 5px;
      height: 5px;
      background: #31c529;
      border-radius: 3px;
      position: absolute;
      left: -14px;
      top: 41%;
      transform: translateY(-50%);
    }
  }
  .editWarn {
    display: flex;
    height: 80px;
    background: #ffffff;
    font-size: 14px;
    color: #e6b058;
    border-radius: 5px;
    border: 1px dashed #e6b058;
    align-items: center;
    margin: 10px 0 30px 0;
    img {
      width: 40px;
      height: 40px;
      margin: 0 20px 0 20px;
    }
  }
  .health_questionnaire_form {
    flex: 1;
    .footer {
      margin-top: 10px;
      text-align: center;
    }
    .health_questionnaire_formQus {
      margin-left: 25px;
      display: flex;
      flex-wrap: wrap;
    }
  }
  .noneText {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .con {
      text-align: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    p {
      color: #97a6bd;
      font-size: 14px;
    }
  }
}
.headimage {
  .userimg {
    position: relative;
    width: 80px;
    height: 80px;
    margin: auto;
    margin-top: 40px;
    img {
      width: 100%;
    }
    .userImg {
      width: 30px;
      height: 30px;
      position: absolute;
      border-radius: 50%;
      right: 0;
      bottom: 0;
      img {
        width: 100%;
      }
    }
  }
  .username {
    text-align: center;
    font-weight: 600;
    color: #333333;
    font-size: 18px;
    line-height: 25px;
    margin-top: 10px;
  }
  .usertype {
    // width: 70px;
    height: 24px;
    background: rgba(49, 84, 172, 0.1);
    border-radius: 12px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    margin: auto;
    color: #24499d;
    font-size: 12px;
    line-height: 25px;
    margin-top: 6px;
    padding: 1px 10px;
    display: inline-block;
  }
}
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
  // justify-content: space-between;
}
.wrapper {
  width: 65%;
  height: 180px;
  padding: 0 20px 20px 20px;
  background: #fff;
  box-shadow: 0px 6px 24px 0px rgba(14, 37, 87, 0.06);
  border-radius: 8px;
  margin-right: 20px;
  position: relative;
  .wrapper-right {
    // width: 130px;
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
    padding: 0 10px;
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
    height: 50px;
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
      font-weight: 800;
      color: forestgreen;
    }
  }
}
.wlall-right {
  width: calc(28% - 20px);
  height: 180px;
  background: #ffffff;
  box-shadow: 0px 6px 24px 0px rgba(14, 37, 87, 0.06);
  border-radius: 8px;
  padding:0 20px 20px 20px;
}
.content {
  display: flex;
  background: #fff;
  box-shadow: 0px 6px 24px 0px rgba(14, 37, 87, 0.06);
  border-radius: 8px;
  margin-top: 20px;
  padding:0 20px 20px 20px;
  .content-left {
    width: 59%;
    border-right: 1px dotted #dde0e6;
    padding-right: 20px;
  }
  .content-right {
    width: 40%;
    padding:0 20px 20px 20px;
  }
}
/deep/ .el-table .el-table__body td {
  height: 48px;
}
.progress {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}
// .formSearchTitle{
//   height: 20px;
//   margin-bottom: 20px;
// }
</style>
