<template>
  <el-dialog
    class="el-plan-setting-mdl"
    :title="modalTitle"
    :visible.sync="show"
    width="900px"
    alignFooter="right"
    :close-on-click-modal="false"
    @close="onVisible"
  >
    <div class="body">
      <div class="header">
        <el-form :inline="false" :model="form" class="form-inline">
          <el-row>
            <el-col :span="24">
            <el-form-item label="模板名称：">
              <!--<el-col :span="19">-->
              <el-input style="width: 775px" v-model="form.name" disabled="" placeholder="">
              </el-input>
              <!--</el-col>-->
            </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-tabs v-model="activeName" class="two-tab" style="margin-top: 10px">
          <el-tab-pane label="人员类别" name="first">
            <client-type :propsData="clientTypeList"
                         @change="data => clientTypeList = data"></client-type>
          </el-tab-pane>
          <el-tab-pane label="异常" name="second">
            <abnormal-type :propsData="abnormalTypeList"
                         @change="data => abnormalTypeList = data"></abnormal-type>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" class="cancelBtn" @click="cancel">取消</el-button>
      <el-button size="small" class="sureBtn" type="primary" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ManagerList from '@/components/user_health/manager_list.vue';
import ClientType from './client_type.vue';
import AbnormalType from './abnormal_type.vue';

export default {
  name: 'TermAddMdl',
  components: {
    ManagerList,
    ClientType,
    AbnormalType,
  },
  data() {
    return {
      show: true,
      modalType: 1, // 1新增 2编辑 3合并
      modalTitle: '',
      activeName: 'first',
      id: '',
      selectCheck: [],
      openCheckVisible: false,
      clientTypeList: [],
      abnormalTypeList: [],
      form: {
        name: '',
        planTime: '',
        selectTime: null,
        planTitle: '',
        planWay: '',
        planDoctor: '',
        planDoctorName: '',
        planContent: '',
        planWayList: [],
      },
      pickerStartTime: {
        disabledDate: time => time.getTime() < Date.now() - 8.64e7,
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$nextTick(async () => {
        this.getTermDetail();
        console.log(this.name);
        this.form.name = this.name;
        /* if (this.modalType === 2) {
          this.getDetail();
        } */
      });
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
      const { planTime, planTitle, planWay, planDoctor, planDoctorName, planContent } = PropsData;
      this.form.planTime = planTime;
      this.form.planWay = planWay;
      this.form.planDoctor = planDoctor;
      this.form.planDoctorName = planDoctorName;
      this.form.planTitle = planTitle;
      this.form.planContent = planContent;
    },
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'TermAddMdl' });
      }
    },
    getTermDetail() {
      this.$api.interventionTemplateInterface.getTemplateRelate({ interveneTemplateId: this.id })
        .then(({ data }) => {
          const Data = data.data;
          Data.interveneGridList.forEach((value) => {
            this.clientTypeList.push({ gridId: value.gridId, gridName: value.gridName });
          });
          Data.interveneAbnormalList.forEach((value) => {
            this.abnormalTypeList.push({
              organAbnormalId: value.organAbnormalId,
              abnormalName: value.organAbnormalName,
              conditionRelation: value.conditionRelation,
            });
          });
        });
    },
    // 获取条件详情
    /* getTermDetail() {
      this.$api.interventionPlanInterface
        .getTemplateRelate({
          interveneTemplateId: this.id,
        })
        .then((res) => {
          const { data } = res;
          if (data.code === 200) {
            const result = data.data;
            console.log(result);
          }
        });
    }, */
    /**
     * 保存
     */
    save() {
      const ClientTypeList = [];
      this.clientTypeList.forEach((value) => {
        ClientTypeList.push({ gridId: value.gridId, interveneTemplateId: this.id });
      });
      const AbnormalTypeList = [];
      this.abnormalTypeList.forEach((value) => {
        AbnormalTypeList.push({
          organAbnormalId: value.organAbnormalId,
          interveneTemplateId: this.id,
          conditionRelation: value.conditionRelation,
        });
      });
      if (ClientTypeList.length === 0 && AbnormalTypeList.length === 0) {
        return this.$message.warning('请选择人员类别或异常');
      }
      const obj = {};
      if (ClientTypeList.length > 0) {
        obj.interveneGridList = ClientTypeList;
      }
      if (AbnormalTypeList.length > 0) {
        obj.interveneAbnormalList = AbnormalTypeList;
      }
      this.$api.interventionTemplateInterface
        .saveTemplateRelate(obj)
        .then(({ data }) => {
          if (data.success) {
            if (this.confirmfunc) {
              this.confirmfunc.call(this, obj);
            }
            this.$message.success('操作成功');
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
  /deep/ .el-input__inner,/deep/ .el-textarea__inner{
    background-color: #F4F4F6;
    color: #333333;
    &::placeholder {
      color: #666666;
    }
  }
  .body {
    .header{
      /deep/ .el-form-item{
        margin-bottom: 10px;
      }
      /deep/ .el-tabs__header{
        margin-bottom: 0;
      }
      /deep/ .el-tabs__content{
        padding: 20px;
        border: 1px solid #f4f4f6;
        border-top: none;
      }
    }
    .red {
      color: #f00;
    }
    .colClass{
      width: 70px;
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
      input, i {
        cursor: pointer;
      }
      &.disabled {
        input, i {
          cursor: not-allowed;
        }
      }
      .el-input__suffix{
        width: 25px;
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
    padding: 0px 32px 12px 0;
  }
}
</style>
