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
        <span>温馨提示：共选择 <span class="count">{{selectCheck.length}}人</span>，
          其中 <span class="count">{{selectCheck.length}}人</span> 是有效电话号码</span>
      </div>
      <div class="header">
        <el-form :inline="false" :model="form"
                 label-width="85px"
                 :rules="rules"
                 ref="form"
                 class="form-inline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="短信模板：" prop="planWay">
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
            <el-col :span="12">
            <el-form-item label="发送时间：" prop="planTime">
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
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="称呼前缀：">
                <el-switch
                        v-model="form.state"
                        :active-value="1"
                        :inactive-value="0"
                        active-color="#13ce66"
                >
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="短信内容：" prop="planContent">
                  <el-input
                    type="textarea"
                    v-model="form.planContent"
                    :rows="4"
                    placeholder="请输入"
                    :maxlength="300"
                    show-word-limit
                    style="width: 100%"
                  ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" class="cancelBtn" @click="cancel">取消</el-button>
      <el-button size="small" class="sureBtn" type="primary" @click="save">发送</el-button>
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
      modalTitle: '创建短信',
      planId: '',
      id: '',
      selectCheck: [],
      openCheckVisible: false,
      checkClintIds: [],
      openCheckQuestionVisible: false,
      form: {
        planTime: '',
        selectTime: null,
        state: 1,
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
        planTime: [{ required: true, message: '请选择发送时间' }],
        planWay: [{ required: true, message: '请选择短信模板' }],
        planContent: [{ required: true, message: '请输入短信内容' }],
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$nextTick(async () => {
        console.log(this.selectCheck);
        await this.getPlanWayList();
      });
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
        this.$jDynamic.hide({ component: 'detail' });
      }
    },
    /**
     * 保存
     */
    save() {
      this.$refs.form.validate(async (valid) => {
        console.log('发送');
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
      font-size: 14px;
      color: #333333;
      line-height: 25px;
      padding-left: 15px;
      margin-bottom: 20px;
      position: relative;
      .count{
        color: #FA912B;
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
    text-align: center;
    padding: 0 0 12px 0;
  }
}
</style>
