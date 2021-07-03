<template>
  <el-dialog
    class="el-plan-setting-mdl"
    :title="modalTitle"
    :visible.sync="show"
    width="570px"
    alignFooter="right"
    :close-on-click-modal="false"
    @close="onVisible"
  >
    <div class="body">
      <div class="search-title">
        <span>随访信息</span>
      </div>
      <div class="header">
        <el-form :inline="false" :model="form"
                 label-width="85px"
                 :rules="rules"
                 ref="form"
                 class="form-inline">
          <el-row>
            <el-col :span="12">
            <el-form-item label="随访时间：" prop="planTime">
              <!--<el-col :span="19">-->
                <el-date-picker
                        v-model="form.planTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择" style="width: 100%"
                        :picker-options="pickerStartTime"
                >
                </el-date-picker>
              <!--</el-col>-->
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="随访形式：" prop="planWay">
                <el-select
                        v-model="form.planWay"
                        placeholder="请选择"
                        style="width: 100%"
                >
                  <el-option
                          :label="it.name"
                          :value="it.id"
                          :key="it.id"
                          v-for="it in form.planWayList"
                  ></el-option>
                </el-select>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="随访人：" prop="planDoctorName">
                <el-popover
                        v-if="addType === '1'"
                        ref="userPopover"
                        placement="right"
                        width="545"
                        trigger="click"
                        @show="openCheckVisible = true"
                        @hide="openCheckVisible = false"
                >
                  <manager-list v-if="openCheckVisible" :clientIds="checkClintIds"
                        :propsType="'doctor'" @change="handlePopoperClose"></manager-list>
                  <el-input class="select-user-trigger" slot="reference" disabled
                            style="width: 100%" v-model="form.planDoctorName" placeholder="选择随访人">
                    <i :class="`el-icon-arrow-${openCheckVisible ? 'up' : 'down'}`"
                       slot="suffix"></i>
                  </el-input>
                </el-popover>
                  <!--个人创建 可选随访人， 批量创建随访人只能是自己-->
                  <el-input class="select-user-trigger" disabled v-else
                            style="width: 100%" v-model="form.planDoctorName" placeholder="">
                  </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="随访标题：" prop="planTitle">
                  <el-input
                    v-model="form.planTitle"
                    :maxlength="40"
                    placeholder="请输入"
                    style="width: 100%"
                  ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="随访内容：" prop="planContent">
                  <el-input
                    type="textarea"
                    v-model="form.planContent"
                    :rows="4"
                    placeholder="请输入"
                    :maxlength="400"
                    show-word-limit
                    style="width: 100%"
                  ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="随访问卷：">
                <el-popover
                        ref="questionPopover"
                        placement="top-start"
                        width="565"
                        trigger="click"
                        @show="openCheckQuestionVisible = true"
                        @hide="openCheckQuestionVisible = false"
                >
                  <question-open v-if="openCheckQuestionVisible"
                                @change="handleQuestionPopoperClose"></question-open>
                  <el-input class="select-user-trigger" slot="reference" disabled
                            style="width: 100%" v-model="form.templateQuestionName"
                            placeholder="请选择">
                    <i :class="`el-icon-arrow-${openCheckQuestionVisible ? 'up' : 'down'}`"
                       slot="suffix"></i>
                  </el-input>
                </el-popover>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="dialog-footer" style="text-align: center;margin-top: 10px">
      <el-button size="small" class="cancelBtn" @click="cancel">取消</el-button>
      <el-button size="small" class="sureBtn" type="primary" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ManagerList from '@/components/user_health/manager_list.vue';
import QuestionOpen from '@/components/date_select/question_open.vue';

export default {
  name: 'InterventionAddMdl',
  components: {
    ManagerList,
    QuestionOpen,
  },
  data() {
    return {
      show: true,
      modalType: 1, // 1新增 2编辑 3合并
      addType: 1, // 创建计划类型 个人/批量
      modalTitle: '',
      planId: '',
      id: '',
      selectCheck: [],
      openCheckVisible: false,
      checkClintIds: [],
      openCheckQuestionVisible: false,
      form: {
        planTime: '',
        selectTime: null,
        planTitle: '',
        planWay: '',
        planDoctor: '',
        planDoctorName: '',
        planContent: '',
        planWayList: [],
        templateQuestionId: '',
        templateQuestionName: '',
      },
      pickerStartTime: {
        disabledDate: time => time.getTime() < Date.now() - 8.64e7,
      },
      rules: {
        planTime: [{ required: true, message: '请选择随访时间' }],
        planWay: [{ required: true, message: '请选择随访形式' }],
        planDoctorName: [{ required: true, message: '请选择随访人' }],
        planTitle: [{ required: true, message: '请输入随访标题' }],
        planContent: [{ required: true, message: '请输入随访内容' }],
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$nextTick(async () => {
        await this.getPlanWayList();
        this.checkClintIds = this.$store.state.intervention.checkUserList.map(it => it.clientId);
        if (this.modalType === 2) {
          this.getDetail();
        } else if (this.modalType === 3) {
          this.getDetailTogether();
        }
        if (this.addType === '2') {
          this.getUserInfo(); // 获取用户id和name，原本是存储，现在接口实时请求
          // this.form.planDoctor = this.$store.state.user.userId;
          // this.form.planDoctorName = this.$store.state.user.userName;
        }
        if (this.editType === 2) { // 待随访计划直接编辑，不让修改随访人;
          this.form.planDoctor = this.propsData.planUserId;
          this.form.planDoctorName = this.propsData.planUserName;
          const reqBody = { id: this.propsData.id };
          const res = await this.$api.userFollowInterface.getIntervenePlan(
            reqBody,
          );
          const { data } = res.data;
          console.log(data);
          this.form.templateQuestionId = data.templateQuestionId;
          this.form.templateQuestionName = data.templateQuestionName;
        }
      });
    },
    async getUserInfo() {
      const res = await this.$api.userManagerInterface.getUserInfo();
      const { data } = res.data;
      this.form.planDoctor = data.userId;
      this.form.planDoctorName = data.realName;
    },
    // 关闭弹窗选择列表 push数组
    handlePopoperClose(data) {
      this.$refs.userPopover.doClose();
      this.openCheckVisible = false;
      this.form.planDoctor = data.id;
      this.form.planDoctorName = data.realName;
      this.$refs.form.validateField('clientId');
      // this.selectCheck = []; // push完一定要清空，防止点开再次push
      /* if (this.selectAbnormal.length > 0) {
        this.onAbnormalChange(this.selectAbnormal);
        this.selectAbnormal = [];
      } */
    },
    // 关闭问卷弹窗选择列表 push数组
    handleQuestionPopoperClose(data) {
      this.$refs.questionPopover.doClose();
      this.openCheckQuestionVisible = false;
      this.form.templateQuestionId = data.id;
      this.form.templateQuestionName = data.name;
      // this.$refs.form.validateField('clientId');
      // this.selectCheck = []; // push完一定要清空，防止点开再次push
      /* if (this.selectAbnormal.length > 0) {
        this.onAbnormalChange(this.selectAbnormal);
        this.selectAbnormal = [];
      } */
    },
    /**
     * 获取干预模板计划编辑写入
     * @return {Promise<void>}
     */
    async getDetail() {
      /* const reqBody = { id: this.id };
      const res = await this.$api.interventionTemplateInterface.getInterveneTemplatePlanById(
        reqBody,
      );
      const { data } = res.data;
      this.form.date = {
        year: new Date().getFullYear(),
        month: data.month,
        day: data.day,
      };
      if (data.hours !== null && data.minute !== null) {
        this.form.selectTime = `${data.hours}:${data.minute}`;
      } */
      const PropsData = Object.assign({}, this.propsData);
      console.log(PropsData);
      const { planTime, planTitle, planWay, planDoctor, planDoctorName,
        planContent, templateQuestionId, templateQuestionName } = PropsData;
      this.form.planTime = planTime;
      this.form.planWay = planWay;
      this.form.planDoctor = planDoctor;
      this.form.planDoctorName = planDoctorName;
      this.form.planTitle = planTitle;
      // const way = this.form.planWayList.find(it => it.id === data.planWay);
      // if (way) {
      // }
      this.form.planContent = planContent;
      if (this.editType !== 2) { // 待随访计划直接编辑，先不写入，防止视觉上重复显示;
        this.form.templateQuestionId = templateQuestionId;
        this.form.templateQuestionName = templateQuestionName;
      }
    },
    /**
     * 获取干预模板计划合并写入
     * @return {Promise<void>}
     */
    async getDetailTogether() {
      let planContent = '';
      const ValuePlanContent = [];
      this.propsData.forEach((value) => {
        ValuePlanContent.push(value.planContent);
        planContent = ValuePlanContent.join('\r\n');
      });
      this.form.planContent = planContent.substr(0, 400);
    },
    /**
     * 获取随访方式列表
     * @return {Promise<void>}
     */
    async getPlanWayList() {
      const res = await this.$api.userFollowInterface.getIntervenePlanWayList();
      const { data } = res.data;
      const list = data.map((it) => {
        const { id, name } = it;
        return { id, name };
      });
      this.form.planWayList = list;
    },
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'InterventionAddMdl' });
      }
    },
    /**
     * 保存
     */
    save() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const obj = {
            planTime: this.form.planTime,
            planWay: this.form.planWay,
            planDoctor: this.form.planDoctor,
            planDoctorName: this.form.planDoctorName,
            planTitle: this.form.planTitle,
            planContent: this.form.planContent,
            templateQuestionId: this.form.templateQuestionId,
            templateQuestionName: this.form.templateQuestionName,
          };
          if (this.modalType === 1 || this.modalType === 3) {
            obj.planId = new Date().getTime();
          } else if (this.modalType === 2) {
            if (this.id) { // 如果原来是模板进来的
              obj.id = this.id;
            }
            obj.planId = this.planId || new Date().getTime();
          }
          if (this.confirmfunc) {
            this.confirmfunc.call(this, obj);
          }
          this.cancel();
        }
      });
    },
    cancel() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-plan-setting-mdl {
  .is-error /deep/ input, .is-error /deep/ .el-textarea__inner{
    border: 1px solid #f94242 !important;
  }
  /deep/ .el-dialog__body{
    padding: 20px 26px 10px 26px !important;
  }
  /deep/ .el-input__inner,/deep/ .el-textarea__inner{
    // background-color: #F4F4F6;
  }
  .body {
    .search-title {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
      padding-left: 15px;
      margin-bottom: 15px;
      position: relative;
      &:before {
        content: '';
        width: 5px;
        height: 5px;
        border: 1px solid #B4BBC9;
        border-radius: 50px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .red {
      color: #f00;
    }
    .colClass{
      width: 66px;
      /*margin-right: 16px*/
    }
    .form-title {
      color: #262626;
      display: inline-block;
      width: 61px;
      text-align: right;
    }
    .el-pagination {
      padding: 10px 0;
      text-align: right;
    }
    // 下拉弹框
    /deep/ .select-user-trigger {
      line-height: 37px;
      input{
        border: 1px solid #DDE0E6 !important;
      }
      input, i {
        color: #333333;
        cursor: pointer;
        background-color: white!important;
      }
      &.disabled {
        input, i {
          cursor: not-allowed;
        }
      }
      .el-input__suffix{
        width: 20px;
      }
    }
  }
  .el-select{
    width: 100%;
  }
  /*/deep/ .el-textarea .el-input__count{
    bottom: -11px;
    background: none;
    height: 20px;
  }*/
  .el-button + .el-button{
    margin-left: 20px;
  }
  /deep/ .el-dialog__footer{
    padding: 0 28px 12px 0;
  }
}
</style>
