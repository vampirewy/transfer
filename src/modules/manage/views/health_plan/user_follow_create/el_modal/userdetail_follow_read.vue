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
    <div class="body" v-if="executeState === 1">
      <div class="search-title">
        <span>随访计划信息</span>
      </div>
      <div class="header headerPlan">
        <el-form :inline="false" :model="form"
                 label-position="right"
                 label-width="85px"
                 class="form-inline planForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="随访时间：">
                <span>{{ form.planDate | getResultDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="随访方式：">
                <span>{{form.planWayName | getResult}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="干预人：">
                <span>{{form.planDoctorName | getResult}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="随访标题：">
                <span>{{form.planTitle | getResult}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="随访内容：">
                <span>{{form.planContent | getResult}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="ge" v-if="executeState === 1"></div>
    <div class="body" v-if="executeState === 1">
      <div class="search-title">
        <span>随访记录信息</span>
      </div>
      <div class="header">
        <el-form :inline="false" :model="form"
                 label-position="right"
                 label-width="85px"
                 class="form-inline">
          <el-row>
            <el-col :span="12">
            <el-form-item label="执行时间：">
              <!--<el-col :span="19">-->
                <el-date-picker
                        v-model="form.executeTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="" style="width: 100%"
                        disabled
                >
                </el-date-picker>
              <!--</el-col>-->
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="随访形式：">
              <el-input
                      v-model="form.executePlanWayName"
                      placeholder=""
                      style="width: 100%"
                      disabled
              ></el-input>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="干预人：">
                <el-input
                        v-model="form.executePlanUserName"
                        placeholder=""
                        style="width: 100%"
                        disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="随访标题：">
                  <el-input
                    v-model="form.executePlanTitle"
                    placeholder=""
                    style="width: 100%"
                    disabled
                  ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="随访结果：">
                <el-input
                        type="textarea"
                        v-model="form.executePlanContent"
                        :rows="4"
                        placeholder=""
                        style="width: 100%"
                        disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!--随访计划查看-->
    <div class="body" v-else-if="executeState === 2">
      <div class="search-title">
        <span>随访计划信息</span>
      </div>
      <div class="header">
        <el-form :inline="false" :model="form"
                 label-position="right"
                 label-width="85px"
                 class="form-inline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="随访时间：">
                <!--<el-col :span="19">-->
                <el-date-picker
                        v-model="form.planDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="" style="width: 100%"
                        disabled
                >
                </el-date-picker>
                <!--</el-col>-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="随访形式：">
                <el-input
                        v-model="form.planWayName"
                        placeholder=""
                        style="width: 100%"
                        disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="干预人：">
                <el-input
                        v-model="form.planDoctorName"
                        placeholder=""
                        style="width: 100%"
                        disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="随访标题：">
                <el-input
                        v-model="form.planTitle"
                        placeholder=""
                        style="width: 100%"
                        disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="随访内容：">
                <el-input
                        type="textarea"
                        v-model="form.planContent"
                        :rows="4"
                        placeholder=""
                        style="width: 100%"
                        disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'userdetailFollowRead',
  data() {
    return {
      show: true,
      executeState: 1, // 1记录 2计划
      modalTitle: '',
      planId: '',
      id: '',
      form: {
        selectTime: null,
        planDate: '',
        planTitle: '',
        planWay: '',
        planWayName: '',
        planDoctorName: '',
        planContent: '',
        executeTime: '',
        executePlanTitle: '',
        executePlanUserName: '',
        executePlanWayName: '',
        executePlanContent: '',
        planWayList: [],
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$nextTick(async () => {
        if (this.executeState === 2) { // 计划
          this.getDetail();
        } else if (this.executeState === 1) { // 记录
          // this.getDetailTogether();
          this.getDetail();
        }
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
      const { planDate, planTitle, planWayName,
        planUserName, planContent, executeTime, executePlanTitle,
        executeUserName, executePlanWayName, executePlanContent } = PropsData;
      this.form.planDate = planDate;
      this.form.planWayName = planWayName;
      this.form.planDoctorName = planUserName;
      this.form.planTitle = planTitle;
      this.form.planContent = planContent;

      this.form.executeTime = executeTime;
      this.form.executePlanTitle = executePlanTitle;
      this.form.executePlanUserName = executeUserName;
      this.form.executePlanWayName = executePlanWayName;
      this.form.executePlanContent = executePlanContent;
      // const way = this.form.planWayList.find(it => it.id === data.planWay);
      // if (way) {
      // }
    },
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'userdetailFollowRead' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-plan-setting-mdl {
  /deep/ .el-dialog__body{
    padding: 30px 26px 10px 26px !important;
  }
  /deep/ .el-input__inner,/deep/ .el-textarea__inner{
    background-color: #F4F4F6;
    border: none;
    resize: none;
  }
  .ge{
    width: 510px;
    height: 1px;
    background: #F4F4F6;
    border-radius: 10px 10px 0px 0px;
    margin: 20px 0;
  }
  .body {
    /deep/ .el-input.is-disabled .el-input__inner,
    /deep/ .el-textarea.is-disabled .el-textarea__inner{
      color: #333333;
    }
    .search-title {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
      padding-left: 15px;
      margin-bottom: 10px;
      position: relative;
      &:before {
        content: '';
        width: 5px;
        height: 5px;
        background: #4991FD;
        border-radius: 3px;
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
      color: #333333;
      display: inline-block;
      width: 61px;
      text-align: right;
    }
    .form-title-66{
      color: #666666;
      display: inline-block;
      width: 61px;
      text-align: right;
    }
    .el-pagination {
      padding: 10px 0;
      text-align: right;
    }
    .header{
      /deep/ .el-form-item{
        margin-bottom: 10px;
      }
    }
    .headerPlan{
      margin-top: 8px;
      margin-bottom: 20px;
      /deep/ .el-form-item{
        margin-bottom: 0;
        .el-form-item__label{
          line-height: 30px;
        }
        .el-form-item__content{
          line-height: 30px;
        }
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
