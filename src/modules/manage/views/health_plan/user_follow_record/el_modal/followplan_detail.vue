<template>
  <div class="create-edit">
    <el-row>
      <el-col :span="24" style="border-right: 1px dashed #DDE0E6;">
        <div class="divRightTitleDiv">
          <div class="divRightTitle" style="margin-top: 5px">查看-随访计划信息
            <div class="titleBiao"></div></div>
        </div>
        <div class="ge">
          <el-form :inline="false" :model="formGet"
                   label-width="85px"
                   class="form-inline inputCommon headerPlan">
            <el-row>
              <el-col :span="6">
                <el-form-item label="随访时间：">
                  <span>{{ formGet.planDate | getResultDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="随访方式：">
                  <span>{{formGet.planWayName | getResult}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="随访医生：">
                  <span>{{formGet.planUserName | getResult}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="随访标题：">
                  <span>{{formGet.planTitle | getResult}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="随访提示：">
                  <span>{{formGet.planContent | getResult}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="divRightTitleDiv">
            <div class="divRightTitle" style="margin-top: 5px">随访记录信息
              <div class="titleBiao"></div></div>
          </div>
          <el-form :inline="false" :model="form"
                   label-width="85px"
                   :rules="rules"
                   ref="form"
                   class="form-inline inputCommon headerPlan" >
            <el-row>
              <el-col :span="6">
                <el-form-item label="执行时间：">
                  <span>{{ form.planDate | getResultDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="随访形式：">
                  <span>{{form.planWayName | getResult}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="随访人：">
                  <span>{{form.planDoctorName | getResult}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="随访标题：">
                  <span>{{form.planTitle | getResult}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="依从度：">
                  <span>{{form.assortLevelName | getResult}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="随访结果：">
                  <span>{{form.planContent | getResult}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="divRightTitleDiv" v-if="form.templateQuestionId">
            <div class="divRightTitle" style="margin-top: 5px">随访问卷
              <div class="titleBiao"></div></div>
          </div>
         <!-- <el-form :inline="false" :model="form"
                   label-width="85px"
                   class="form-inline inputCommon"
                   v-if="form.templateQuestionId">
            <el-row>
              <el-col :span="12">
                <el-form-item label="问卷名称：">
                  <el-input
                          v-model="form.templateQuestionName"
                          disabled
                          placeholder=""
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否填写：" class="switch">
                  &lt;!&ndash;<el-select v-model="form.checkInput" placeholder="请选择">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="0"></el-option>
                  </el-select>&ndash;&gt;
                  <el-switch
                          v-model="form.checkInput "
                          :active-value="1"
                          :inactive-value="0"
                          active-color="#13ce66"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>-->
        </div>
      </el-col>
      <el-col :span="24">
        <!--<div class="divRightTitleDiv" style="margin-left: 20px">
          <div class="divRightTitle"  style="margin-top: 5px">填写健康问卷</div>
        </div>-->
        <!--<div v-show="form.templateQuestionId" style="margin-left: 20px">
          <question-edit ref="questionEdit"
                         :propsType="questionType"
                         :propsQuestionSubjectist="questionSubjectist"
                         :propsQuestionAnswerList="questionAnswerList"></question-edit>
        </div>-->
        <div class="questionAnswer" v-for="(itemQus) in questionAnswerList"
             :key="itemQus.subjectName">
          <p class="answerText">{{itemQus.subjectName}}</p>
          <p class="questionsText">
            {{itemQus.optionsName}}
          </p>
        </div>
        <!--<div class="noneText" v-show="!form.templateQuestionId">
          <div class="con">
            <img src="@/assets/images/noData.png"/>
            <p>暂时为空</p>
          </div>
        </div>-->
      </el-col>
    </el-row>
    <div class="footer">
      <el-button size="small" class="cancelBtn" @click="cancel">返回</el-button>
    </div>
  </div>
</template>

<script>
import ManagerList from '@/components/user_health/manager_list.vue';
import QuestionEdit from './question_edit.vue';
export default {
  name: 'followplanDetail',
  components: {
    ManagerList,
    QuestionEdit,
  },
  data() {
    return {
      labelPosition: 'top',
      selectCheck: [],
      openCheckVisible: false,
      checkClintIds: [],
      questionType: 1, // 1新增 2编辑 3查看
      questionSubjectist: [], // 问卷题目
      questionAnswerList: [], // 问卷答案
      formGet: {
        planDate: '',
        planWay: '',
        planDoctorName: '',
        planTitle: '',
        planContent: '',
        startTime: '', // 开始时间
      },
      form: {
        planDate: '',
        planWay: '',
        planDoctor: '',
        planDoctorName: '',
        planTitle: '',
        planContent: '',
        startTime: '', // 开始时间
        checkInput: 1,
        templateQuestionId: '', // 问卷id
        templateQuestionName: '', // 问卷名
        batchNo: '', // 问卷批次号
      },
      assortLevelList: [],
      rules: {
        planDate: [{ required: true, message: '请选择执行时间' }],
        planWay: [{ required: true, message: '请选择随访形式' }],
        planDoctorName: [{ required: true, message: '请选择随访人' }],
      },
    };
  },
  mounted() {
    this.onLoad();
    this.questionType = this.$route.meta.type; // 1增加 2编辑 3查看
  },
  methods: {
    onLoad() {
      this.getSystemParamByYicong('HM012');
      this.getDetail();
    },
    /**
     * 获取随访计划明细
     */
    async getDetail() {
      const reqBody = { id: this.$route.params.id };
      const res = await this.$api.userFollowInterface.getIntervenePlan(
        reqBody,
      );
      const { data } = res.data;
      this.checkClintIds = [data.clientId];
      this.formGet.planDate = data.planDate;
      this.formGet.planWayName = data.planWayName;
      this.formGet.planUserName = data.planUserName;
      this.formGet.planTitle = data.planTitle;
      this.formGet.planContent = data.planContent;
      if (this.questionType === 1) {
        this.form.planDate = data.planDate ? data.planDate.split(' ')[0] : '';
        this.form.planWay = data.planWay;
        this.form.planTitle = data.planTitle;
        this.form.planDoctor = 1; // this.$store.state.user.userId;
        this.form.planDoctorName = 'csx'; // this.$store.state.user.userName;
      } else if (this.questionType === 3) {
        this.form.planDate = data.executeTime ? data.executeTime.split(' ')[0] : '';
        this.form.planWayName = data.executePlanWayName;
        this.form.planTitle = data.executePlanTitle;
        this.form.planDoctorName = data.executePlanUserName;
        this.form.planContent = data.executePlanContent;
        if (data.assortLevel) {
          this.form.assortLevelName =
            this.assortLevelList.find(resLevel => resLevel.paramValue === data.assortLevel).name;
        }
      }
      this.form.templateQuestionId = data.templateQuestionId;
      this.form.templateQuestionName = data.templateQuestionName;
      this.form.batchNo = data.batchTemplateQuestionDTO ? data.batchTemplateQuestionDTO.batchNo : '';
      this.questionSubjectist = data.templateQuestionSubjectDtoList;
      this.questionAnswerList = data.questionAnswerDTOList || [];
      if ((this.form.templateQuestionId && this.questionAnswerList.length === 0
        && this.questionType === 3) || !this.form.templateQuestionId) { // 问卷id存在但是答案为空 则是保存过的 不填题目
        this.form.checkInput = 0; // 没填写  ，或者题目id为null 则没有题目
      }
    },
    async getSystemParamByYicong(code) {
      const res = await this.$api.userManagerInterface.getSystemParamByCode(code);
      const { data } = res.data;
      this.assortLevelList = data;
    },
    // 关闭弹窗选择列表 push数组
    handlePopoperClose() {
      this.openCheckVisible = false;
      this.form.planDoctor = this.selectCheck.id;
      this.form.planDoctorName = this.selectCheck.realName;
      this.selectCheck = []; // push完一定要清空，防止点开再次push
    },
    /**
     * 取消
     */
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
  .switch{
    /deep/ .el-form-item__content{
      margin-top: 10px;
    }
  }
  .headerPlan{
    margin-bottom: 20px;
    /deep/ .el-form-item{
      margin-bottom: 15px;
      .el-form-item__label{
        line-height: 30px;
      }
      .el-form-item__content{
        line-height: 30px;
      }
    }
  }
  .questionAnswer{
    margin-left: 15px;
    .answerText{
      font-weight: bold;
      font-size: 14px;
      color: #333333;
      margin-top: 18px;
      margin-bottom: 16px;
      position: relative;
      margin-left: 15px;
      &:before{
        content: '';
        width: 5px;
        height: 5px;
        border: 1px solid #B4BBC9;
        border-radius: 50px;
        position: absolute;
        left: -15px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .questionsText{
      padding: 0 0 0 10px;
      margin: 0 0 30px 0;
      font-size: 14px;
      color: #333333;
      height: 48px;
      line-height: 48px;
      background: #F6F8FC;
      border-radius: 8px;
    }
  }
.create-edit /deep/ {
  .noneText{
    height: 100%;
    display: flex;
    margin-top: 150px;
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
      color: #97A6BD;
      font-size: 14px;
    }
  }
  .ge{
    padding-right: 20px;
  }
  .el-form-item__content{
    display: flex;
  }
  .form-title {
    color: #262626;
  }
  .el-form-item {
    background-color: #fff;
  }
  .form-item {
    .el-form-item__label {
      color: #262626;
    }
  }
  .form-title {
    color: #262626;
    display: inline-block;
    width: 70px;
    text-align: right;
  }
  .footer {
    margin: 20px 0 20px 0;
    text-align: center;
  }
  .el-radio-button + .el-radio-button {
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .el-radio-button__inner {
    background-color: #FFFFFF;
    color: #333333;
    border: 1px solid #B4BBC9;
  }
  /deep/ .el-radio-button__orig-radio:disabled + .el-radio-button__inner{
    border-left: 1px solid #f5f5f5!important;
  }
  .el-radio-button {
    .el-radio-button__inner {
      min-width: 100px;
      height: 48px;
      line-height: 21px;
      border-radius: 24px;
      box-shadow: none;
    }
    &.is-active .el-radio-button__inner{
      color: #3154AC;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 24px;
      border: 1px solid rgba(49, 84, 172, 0.3)!important;
      box-shadow: none!important;
    }
    &:first-child .el-radio-button__inner{
      border-left: 1px solid #B4BBC9;
      margin-right: 20px;
    }
    &.is-disabled .el-radio-button__inner{
      border: 1px solid #f5f5f5;
    }
  }
  .containerOtherCheckBox{
    .el-form-item{
      margin-bottom: 0;
    }
    .el-radio-button {
      .el-radio-button__inner {
        min-width: 100px;
      }
      &:first-child .el-radio-button__inner{
        margin-right: 30px;
      }
      &:last-child .el-radio-button__inner{
        margin-right: 0;
      }
    }
    .el-radio-button + .el-radio-button {
      margin-right: 30px;
    }
  }
  .el-checkbox-button + .el-checkbox-button {
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .el-checkbox-button__inner{
    background-color: #FFFFFF;
    color: #333333;
    border: 1px solid #B4BBC9;
  }
  /deep/ .el-checkbox-button.is-disabled:first-child .el-checkbox-button__inner{
    border-left-color: #f5f5f5!important;
  }
  /deep/ .el-checkbox-button.is-focus .el-checkbox-button__inner{
    border-color: #97A6BD;
  }
  .el-checkbox-button {
    .el-checkbox-button__inner {
      min-width: 100px;
      height: 48px;
      line-height: 21px;
      border-radius: 24px;
    }
    &.is-checked .el-checkbox-button__inner{
      color: #3154AC;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 24px;
      border: 1px solid rgba(49, 84, 172, 0.3)!important;
      box-shadow: none!important;
    }
    &:first-child .el-checkbox-button__inner{
      border-left: 1px solid #B4BBC9;
      margin-right: 20px;
    }
    &.is-disabled .el-checkbox-button__inner{
      border: 1px solid #f5f5f5;
    }
  }
}
</style>
