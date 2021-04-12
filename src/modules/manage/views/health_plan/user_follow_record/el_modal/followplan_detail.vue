<template>
  <div class="create-edit">
    <div class="divRightTitle"><span>|</span>执行-计划信息</div>
    <el-form :inline="false" :model="formGet" class="form-inline inputCommon headerPlan">
      <el-row>
        <el-col :span="5">
          <el-form-item>
            <el-col class="colClass">
              <div class="form-title">随访时间：</div>
            </el-col>
            <span v-if="formGet.planDate">{{ formGet.planDate.split(' ')[0] }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-col class="colClass">
              <div class="form-title">随访方式：</div>
            </el-col>
            <span>{{formGet.planWayName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item>
            <el-col class="colClass">
              <div class="form-title">随访标题：</div>
            </el-col>
            <span>{{formGet.planTitle}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-col class="colClass">
              <div class="form-title">随访内容：</div>
            </el-col>
            <span>{{formGet.planContent}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="divRightTitle"><span>|</span>操作</div>
    <el-form :inline="false" :model="form" class="form-inline inputCommon healthForm">
      <el-row>
        <el-col :span="6">
          <el-form-item>
            <el-col class="colClass">
              <div class="form-title">执行时间：</div>
            </el-col>
            <!--<el-col :span="19">-->
            <!--<el-date-picker
                    v-model="form.planDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择"
                    :picker-options="pickerStartTime"
            >
            </el-date-picker>-->
            <el-input
                    v-model="form.planDate"
                    disabled
                    placeholder=""
            ></el-input>
            <!--</el-col>-->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-col class="colClass">
              <div class="form-title">随访形式：</div>
            </el-col>
            <el-input
                    v-model="form.planWayName"
                    disabled
                    placeholder=""
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-col class="colClass">
              <div class="form-title">干预人：</div>
            </el-col>
            <!--<el-popover
                    placement="right"
                    width="545"
                    trigger="click"
                    @show="openCheckVisible = true"
                    @hide="handlePopoperClose">
              <manager-list v-if="openCheckVisible"
                            @change="data => selectCheck = data"></manager-list>
              <el-input class="select-user-trigger" slot="reference" disabled
                        v-model="form.planDoctorName" placeholder="选择干预人">
                <i :class="`el-icon-arrow-${openCheckVisible ? 'up' : 'down'}`"
                   slot="suffix"></i>
              </el-input>
            </el-popover>-->
            <el-input
                    v-model="form.planDoctorName"
                    disabled
                    placeholder=""
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-col class="colClass">
              <div class="form-title">随访标题：</div>
            </el-col>
            <el-input
                    v-model="form.planTitle"
                    disabled
                    placeholder=""
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-col class="colClass">
              <div class="form-title">随访内容：</div>
            </el-col>
            <el-input
                    type="textarea"
                    v-model="form.planContent"
                    disabled
                    :rows="5"
                    placeholder=""
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="footer">
        <el-button size="small" class="cancelBtn" @click="cancel">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import ManagerList from '@/components/user_health/manager_list.vue';

export default {
  name: 'followplanDetail',
  props: ['propsData'],
  components: {
    ManagerList,
  },
  data() {
    return {
      labelPosition: 'top',
      selectCheck: [],
      openCheckVisible: false,
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
      },
      planWayList: [],
      pickerStartTime: {
        disabledDate: time => time.getTime() < new Date() - 8.64e7,
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.getDetail();
      this.getPlanWayList();
    },
    /**
     * 获取干预方案明细
     */
    async getDetail() {
      this.formGet.planDate = this.propsData.planDate;
      this.formGet.planWayName = this.propsData.planWayName;
      this.formGet.planTitle = this.propsData.planTitle;
      this.formGet.planContent = this.propsData.planContent;

      this.form.planDate = this.propsData.executeTime ? this.propsData.executeTime.split(' ')[0] : '';
      this.form.planWayName = this.propsData.executePlanWayName;
      this.form.planDoctorName = this.propsData.executePlanUserName;
      this.form.planTitle = this.propsData.executePlanTitle;
      this.form.planContent = this.propsData.executePlanContent;
      /* const reqBody = { id: '1315847148088070145' }; // { id: this.propsData.interventionId };
      const res = await this.$api.interventionPlanInterface.getInterveneScheme(
        reqBody,
      );
      const { data } = res.data;
      this.formGet.planDate = data.planDate;
      this.formGet.planWayName = data.planWayName;
      this.formGet.planTitle = data.planTitle;
      this.formGet.planContent = data.planContent; */
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
      // const clientIds = this.$store.state.intervention.checkUserList.map(it => it.clientId);
      // const intervenePlans = this.$store.state.intervention.tplList;
      /* intervenePlans.forEach((it) => {
        const setIt = it;
        setIt.ignore = false;
        setIt.planUserId = it.planDoctor;
        setIt.planDate = `${it.planDate} 00:00:00`;
        delete setIt.id;
      });
      const result = intervenePlans.filter(it => !it.ignore); */
      // const planDateList = result.filter(it => !!it.planDate);
      // const planWayList = result.filter(it => !!it.planWay);

      /* if (!clientIds.length) {
        return this.$message.warning('请选择客户');
      } */

      /* if (planDateList.length !== result.length) {
        return this.$message.warning('随访时间不能为空');
      }

      if (planWayList.length !== result.length) {
        return this.$message.warning('随访方式不能为空');
      } */
      const scope = this.propsData;
      const reqBody = {
        id: scope.id,
        // organId: '', // 区域id
        // clientId: '', // 客户id
        // planWay: scope.planWay, // 计划干预方式
        // planTitle: scope.planTitle, // 随访标题
        // planContent: scope.planContent, // 随访内容
        // planDate: scope.planDate, // 计划日期
        // planRemark: scope.planRemarrk, // 计划备注
        executeState: '1', // 执行状态值为1已执行，2待执行
        updateType: 'executeUpdate',
        executeTime: `${this.form.planDate} 00:00:00`, // 执行时间
        executePlanWay: this.form.planWay, // 执行干预方式
        executePlanUserId: this.form.planDoctor, // 执行干预人
        executePlanTitle: this.form.planTitle, // 执行标题
        executePlanContent: this.form.planContent, // 执行内容
        // assortLevel: scope.assortLevel, // 配合度 系统参数
        // collectionQuestionType: scope.collectionQuestionType, // 需要收集的问卷类型
      };
      await this.$api.userFollowInterface.intervenePlanUpdate(reqBody);
      this.$message.success('操作成功');
      this.cancel();
    },
    /**
     * 取消
     */
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
.create-edit /deep/ {
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
      .el-form-item__content{
        line-height: 30px;
      }
    }
  }
  .healthForm {
    .el-textarea.is-disabled .el-textarea__inner{
      cursor: pointer;
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
  .colClass{
    width: 80px;
    /*margin-right: 16px*/
  }
  .form-title {
    color: #262626;
    display: inline-block;
    width: 80px;
    text-align: right;
  }
  .footer {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
