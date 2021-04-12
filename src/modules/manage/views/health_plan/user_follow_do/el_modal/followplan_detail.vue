<template>
  <div class="create-edit">
    <el-row>
      <el-col :span="10">
        <div class="divRightTitle"><span>|</span>执行-计划信息</div>
        <div class="ge">
          <el-form :inline="false" :model="formGet"
                   label-width="85px"
                   class="form-inline inputCommon headerPlan">
            <el-row>
              <el-col :span="12">
                <el-form-item label="随访时间：">
                  <span>{{ formGet.planDate | getResultDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="随访方式：">
                  <span>{{formGet.planWayName | getResult}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="随访标题：">
                  <span>{{formGet.planTitle | getResult}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="随访内容：">
                  <span>{{formGet.planContent | getResult}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="divRightTitle"><span>|</span>操作</div>
          <el-form :inline="false" :model="form"
                   label-width="85px"
                   :rules="rules"
                   ref="form"
                   class="form-inline inputCommon">
            <el-row>
              <el-col :span="12">
                <el-form-item label="执行时间：" :prop="questionType === 1 ? 'planDate' : ''">
                  <el-date-picker
                          v-model="form.planDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择"
                          v-if="questionType === 1"
                  >
                  </el-date-picker>
                  <el-input
                          v-else
                          disabled
                          v-model="form.planDate"
                          placeholder=""
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="随访形式：" :prop="questionType === 1 ? 'planWay' : ''">
                  <el-select v-model="form.planWay" v-if="questionType === 1" placeholder="请选择">
                    <el-option :label="it.name" :value="it.id" :key="it.id"
                               v-for="it in planWayList">
                    </el-option>
                  </el-select>
                  <el-input
                          v-else
                          disabled
                          v-model="form.planWayName"
                          placeholder=""
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="干预人："  :prop="questionType === 1 ? 'planDoctorName' : ''">
                  <!--<el-popover
                          placement="right"
                          width="545"
                          trigger="click"
                          @show="openCheckVisible = true"
                          @hide="handlePopoperClose">
                    <manager-list v-if="openCheckVisible" :clientIds="checkClintIds"
                         :propsType="'doctor'" @change="data => selectCheck = data"></manager-list>
                    <el-input class="select-user-trigger" slot="reference" disabled
                              v-model="form.planDoctorName" placeholder="选择干预人">
                      <i :class="`el-icon-arrow-${openCheckVisible ? 'up' : 'down'}`"
                         slot="suffix"></i>
                    </el-input>
                  </el-popover>-->
                  <el-input disabled style="width: 200px"
                            v-model="form.planDoctorName" placeholder="">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="随访标题：">
                  <el-input
                          :disabled="questionType === 3"
                          v-model="form.planTitle"
                          :maxlength="30"
                          placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="随访结果：">
                  <el-input
                          type="textarea"
                          v-model="form.planContent"
                          :rows="5"
                          :disabled="questionType === 3"
                          :placeholder="questionType === 1 ? '请输入' : ''"
                          :maxlength="400"
                          show-word-limit
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="divRightTitle" v-if="form.templateQuestionId">
            <span>|</span>随访问卷
          </div>
          <el-form :inline="false" :model="form"
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
                <el-form-item label="是否填写：">
                  <el-select v-model="form.checkInput" placeholder="请选择">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="footer">
            <el-button size="small" class="cancelBtn" @click="cancel">返回</el-button>
            <el-button type="primary" v-if="questionType === 1"
                       class="sureBtn" size="small" @click="save">
              保存
            </el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="divRightTitle" style="margin-bottom: 30px">
          <span>|</span>填写随访问卷</div>
        <div v-show="form.templateQuestionId">
          <question-edit ref="questionEdit"
                         :propsType="questionType"
                         :propsQuestionSubjectist="questionSubjectist"
                         :propsQuestionAnswerList="questionAnswerList"></question-edit>
        </div>
        <div class="noneText" v-show="!form.templateQuestionId">
          <div class="con">
            <img src="@/assets/images/noData.png"/>
            <p>暂时为空</p>
          </div>
        </div>
      </el-col>
    </el-row>
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
      planWayList: [],
      rules: {
        planDate: [{ required: true, message: '请选择执行时间' }],
        planWay: [{ required: true, message: '请选择随访形式' }],
        planDoctorName: [{ required: true, message: '请选择干预人' }],
      },
    };
  },
  mounted() {
    this.onLoad();
    this.questionType = this.$route.meta.type; // 1增加 2编辑 3查看
  },
  methods: {
    onLoad() {
      this.getPlanWayList(); // 随访方式
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
      this.formGet.planTitle = data.planTitle;
      this.formGet.planContent = data.planContent;
      if (this.questionType === 1) {
        this.form.planDate = data.planDate ? data.planDate.split(' ')[0] : '';
        this.form.planWay = data.planWay;
        this.form.planTitle = data.planTitle;
        this.form.planDoctor = this.$store.state.user.userId;
        this.form.planDoctorName = this.$store.state.user.userName;
      } else if (this.questionType === 3) {
        this.form.planDate = data.executeTime ? data.executeTime.split(' ')[0] : '';
        this.form.planWayName = data.executePlanWayName;
        this.form.planTitle = data.executePlanTitle;
        this.form.planDoctorName = data.executePlanUserName;
        this.form.planContent = data.executePlanContent;
      }
      this.form.templateQuestionId = data.templateQuestionId;
      this.form.templateQuestionName = data.batchTemplateQuestionDTO ? data.batchTemplateQuestionDTO.name : '';
      this.form.batchNo = data.batchTemplateQuestionDTO ? data.batchTemplateQuestionDTO.batchNo : '';
      this.questionSubjectist = data.batchTemplateQuestionDTO ?
        data.batchTemplateQuestionDTO.questionSubjectist : [];
      this.questionAnswerList = data.questionInfoAnswerList || [];
      if ((this.form.templateQuestionId && this.questionAnswerList.length === 0
        && this.questionType === 3) || !this.form.templateQuestionId) { // 问卷id存在但是答案为空 则是保存过的 不填题目
        this.form.checkInput = 0; // 没填写  ，或者题目id为null 则没有题目
      }
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
      // list.unshift({ name: '全部', value: '' });
      this.planWayList = list;
    },
    // 关闭弹窗选择列表 push数组
    handlePopoperClose() {
      this.openCheckVisible = false;
      this.form.planDoctor = this.selectCheck.id;
      this.form.planDoctorName = this.selectCheck.realName;
      this.selectCheck = []; // push完一定要清空，防止点开再次push
    },
    /**
     * 新增随访
     * @return {Promise<ElMessageComponent>}
     */
    async save() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const reqBody = {
            id: this.$route.params.id,
            clientId: this.checkClintIds[0],
            executeState: '1', // 执行状态值为1已执行，2待执行
            updateType: 'executeUpdate',
            executeTime: `${this.form.planDate} 00:00:00`, // 执行时间
            executePlanWay: this.form.planWay, // 执行干预方式
            executePlanUserId: this.form.planDoctor, // 执行干预人
            executePlanTitle: this.form.planTitle, // 执行标题
            executePlanContent: this.form.planContent, // 执行内容
            templateQuestionId: this.form.templateQuestionId, // 问卷id
            batchNo: this.form.batchNo, // 问卷批次
          };
          if (this.form.checkInput === 1) { // 选填写才提交
            const AnswerList = this.$refs.questionEdit.submit();
            if (AnswerList === false) { // 错的不提交
              return;
            } else if (AnswerList !== false) { // 对了才提交
              reqBody.answerList = this.$refs.questionEdit.submit();
            }
          }
          await this.$api.userFollowInterface.intervenePlanUpdate(reqBody);
          this.$message.success('操作成功');
          this.cancel();
        }
      });
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
    border-right: 1px solid #F4F4F6;
    padding-right: 20px;
    margin-right: 20px;
  }
  .divRightTitle{
    font-size: 18px;
    color: #333333;
    font-weight: bold;
    margin-bottom: 20px;
    span{
      color: #4991FD;
      font-size: 18px;
      margin-right: 9px;
    }
  }
  .headerPlan{
    margin-bottom: 20px;
    /deep/ .el-form-item{
      margin-bottom: 5px;
      .el-form-item__label{
        line-height: 30px;
      }
      .el-form-item__content{
        line-height: 30px;
      }
    }
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
    text-align: right;
  }
}
</style>
