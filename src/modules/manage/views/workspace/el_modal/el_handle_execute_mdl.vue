<template>
  <el-dialog
    class="el-handle-execute-mdl"
    :title="modalTitle"
    :visible.sync="show"
    width="570px"
    alignFooter="right"
    :close-on-click-modal="false"
    @close="onVisible"
  >
    <div class="body">
      <div class="formSearchTitle"><span class="dianBlue"></span>随访计划信息</div>
      <el-form
        :inline="false"
        :label-position="form.labelPosition"
        :model="form"
        label-width="85px"
        :rules="rules"
        ref="form"
        class="form-inline"
      >
        <div class="healthPlan">
        <el-row>
          <el-col :span="12">
            <el-form-item label="随访时间：" :label-width="form.labelWidth">
              <span v-if="formGet.planDate">{{ formGet.planDate.split(' ')[0] }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="随访方式：" :label-width="form.labelWidth">
              <span>{{ formGet.planWayName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="随访标题：" :label-width="form.labelWidth">
          <span>{{ formGet.planTitle }}</span>
        </el-form-item>

        <el-form-item label="随访内容：" :label-width="form.labelWidth">
          <span>{{ formGet.planContent }}</span>
        </el-form-item>
    </div>
        <div class="ge"></div>
        <div class="formSearchTitle"><span class="dianBlue"></span>操作</div>
        <div class="inputCommon">
        <el-row class="row">
          <el-col :span="12">
            <el-form-item label="执行时间：" prop="executeTime">
              <el-date-picker
                      v-model="form.executeTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择"
                      style="width: 100%"
                      v-if="modalType === 1"
              >
              </el-date-picker>
              <el-input
                      v-else-if="modalType === 2"
                      v-model="form.executeTime"
                      style="width: 100%"
                      disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="随访方式：" prop="executePlanWay">
              <el-select
                v-model="form.executePlanWay"
                placeholder="请选择随访方式"
                style="width: 100%"
                v-if="modalType === 1"
              >
                <el-option
                  :label="it.name"
                  :value="it.id"
                  :key="i"
                  v-for="(it, i) in form.planWayList"
                ></el-option>
              </el-select>
              <el-input
                      v-else-if="modalType === 2"
                      v-model="form.executePlanWayName"
                      placeholder=""
                      style="width: 100%"
                      disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12">
            <el-form-item label="随访人：" prop="executePlanUserName">
              <!--<el-popover
                      v-if="modalType === 1"
                      placement="right"
                      width="545"
                      trigger="click"
                      @show="openCheckVisible = true"
                      @hide="handlePopoperClose">
                <manager-list v-if="openCheckVisible" :clientIds="checkClintIds"
                       :propsType="'doctor'" @change="data => selectCheck = data"></manager-list>
                <el-input class="select-user-trigger" slot="reference" disabled
                          v-model="form.executePlanUserName"
                          placeholder="选择随访人" style="width: 100%">
                  <i :class="`el-icon-arrow-${openCheckVisible ? 'up' : 'down'}`"
                     slot="suffix"></i>
                </el-input>
              </el-popover>-->
              <el-input v-if="modalType === 1"
                      v-model="form.executePlanUserName"
                      style="width: 100%"
                        class="select-user-trigger"
                      disabled
              ></el-input>
              <el-input v-else-if="modalType === 2"
                      v-model="form.executePlanUserName"
                      style="width: 100%"
                      disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="随访标题：">
              <el-input
                      v-if="modalType === 1"
                      v-model="form.executePlanTitle"
                      placeholder="请输入"
                      style="width: 100%"
              ></el-input>
              <el-input
                      v-else-if="modalType === 2"
                      v-model="form.executePlanTitle"
                      placeholder=""
                      style="width: 100%"
                      disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="随访结果：">
          <el-input
            v-if="modalType === 1"
            type="textarea"
            :rows="5"
            v-model="form.executePlanContent"
            placeholder="请输入"
            show-word-limit
            :maxlength="400"
            style="width: 439px"
          ></el-input>
          <el-input
                  v-else-if="modalType === 2"
                  type="textarea"
                  :rows="5"
                  v-model="form.executePlanContent"
                  style="width: 439px"
                  disabled
          ></el-input>
        </el-form-item>
    </div>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" v-if="modalType === 1">
      <el-button size="small" class="cancelBtn" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" class="sureBtn" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  assortLevelList,
  collectionQuestionTypeList,
} from '@/constant/health_plan';
import ManagerList from '@/components/user_health/manager_list.vue';

export default {
  name: 'el-handle-execute-mdl',
  components: {
    ManagerList,
  },
  data() {
    return {
      show: true,
      modalType: 1, // 1执行 2查看
      modalTitle: '执行',
      selectCheck: [],
      openCheckVisible: false,
      checkClintIds: [],
      formGet: {
        planDate: '',
        planWayName: '',
        planTitle: '',
        planContent: '',
      },
      form: {
        labelPosition: 'right',
        labelWidth: '70px',
        clientName: '',
        plaeDate: '',
        planDoctor: '',
        planDoctorName: '',
        planWay: '',
        planWayName: '',
        planTitle: '',
        planContent: '',
        assortLevel: '',
        collectionQuestionType: '',
        executeTime: '',
        executePlanWay: '',
        executePlanWayName: '',
        executePlanTitle: '',
        executePlanUserId: '',
        executePlanUserName: '',
        executePlanContent: '',
        planWayList: [],
        assortLevelList,
        collectionQuestionTypeList,
      },
      rules: {
        executeTime: [{ required: true, message: '请选择执行时间' }],
        executePlanWay: [{ required: true, message: '请选择随访形式' }],
        executePlanUserName: [{ required: true, message: '请选择随访人' }],
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
        this.getDetail();
      });
    },
    /**
     * 获取随访计划
     * @return {Promise<void>}
     */
    async getDetail() {
      const reqBody = { id: this.id };
      const res = await this.$api.userFollowInterface.getIntervenePlan(reqBody);
      const { data } = res.data;
      const {
        planTitle,
        planDate,
        planContent,
        planWay,
        planWayName,
        executeTime,
        executePlanWayName,
        executePlanTitle,
        executePlanContent,
        executePlanUserName,
      } = data;
      this.checkClintIds = [data.clientId];
      this.formGet.planDate = planDate;
      this.formGet.planWayName = planWayName;
      this.formGet.planTitle = planTitle;
      this.formGet.planContent = planContent;
      if (this.modalType === 1) {
        this.form.executeTime = planDate ? planDate.split(' ')[0] : '';
        this.form.executePlanWay = planWay;
        this.form.executePlanTitle = planTitle;
        this.form.executePlanUserId = this.$store.state.user.userId;
        this.form.executePlanUserName = this.$store.state.user.userName;
      } else if (this.modalType === 2) {
        this.form.executeTime = executeTime ? executeTime.split(' ')[0] : '';
        this.form.executePlanWayName = executePlanWayName;
        this.form.executePlanWay = executePlanWayName; // 回显验证用
        this.form.executePlanTitle = executePlanTitle;
        this.form.executePlanContent = executePlanContent;
        this.form.executePlanUserName = executePlanUserName;
      }
    },
    // 关闭弹窗选择列表 push数组
    handlePopoperClose() {
      console.log(this.selectCheck);
      this.openCheckVisible = false;
      this.form.executePlanUserId = this.selectCheck.id;
      this.form.executePlanUserName = this.selectCheck.realName;
      this.selectCheck = []; // push完一定要清空，防止点开再次push
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
      this.form.planWayList = list;
    },
    /**
     * 执行
     * @return {Promise<ElMessageComponent>}
     */
    async save() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const id = this.id;
          const reqBody = {
            id, // 随访id
            executeState: '1', // 执行状态值为1已执行，2待执行
            updateType: 'executeUpdate',
            executeTime: `${this.form.executeTime} 00:00:00`, // 执行时间
            executePlanWay: this.form.executePlanWay, // 执行干预方式
            executePlanUserId: this.form.executePlanUserId, // 执行随访人
            executePlanTitle: this.form.executePlanTitle, // 执行标题
            executePlanContent: this.form.executePlanContent, // 执行内容
          };
          await this.$api.userFollowInterface.intervenePlanUpdate(reqBody);
          this.$message.success('操作成功');
          if (this.confirmfunc) {
            this.confirmfunc.call(this);
          }
        }
      });
    },
    /**
     * 取消
     */
    cancel() {
      this.show = false;
    },
    /**
     * 销毁模态框
     * @param value
     */
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'elHandleExecuteMdl' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  /deep/ .el-dialog__body{
    padding: 30px 26px 30px 26px !important;
  }
  .ge{
    width: 510px;
    height: 1px;
    background: #F4F4F6;
    border-radius: 10px 10px 0px 0px;
    margin: 20px 0;
  }
.el-handle-execute-mdl /deep/ {
  .el-table {
    width: 99.99% !important;
  }
  .red {
    color: #f00;
    font-style: normal;
  }
  .body {
    .formSearchTitle{
      font-size: 16px;
      color: #333333;
      display: flex;
      align-items: center;
      font-weight: bold;
      margin: 0 0 15px 0;
      .dianBlue{
        width: 5px;
        height: 5px;
        background: #4991FD;
        border-radius: 50px;
        display: inline-block;
        margin-right: 10px;
      }
    }
    .row{
      margin-bottom: 20px;
    }
    .module-title {
      font-weight: 700;
      padding-left: 15px;
    }
    .form-title {
      color: #707070;
    }
    .el-form-item__label{
      line-height: 30px;
    }
    .inputCommon{
      .el-form-item__label{
        line-height: 40px;
      }
    }
    .healthPlan{
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__content{
          line-height: 30px;
        }
      }
    }
    .inputCommon{
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__content{
          line-height: 40px;
        }
      }
      /deep/ .select-user-trigger {
        input, i {
          cursor: pointer;
        }
        &.disabled {
          input, i {
            cursor: not-allowed;
          }
        }
      }
    }
    .footer {
      .header {
        text-align: right;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
