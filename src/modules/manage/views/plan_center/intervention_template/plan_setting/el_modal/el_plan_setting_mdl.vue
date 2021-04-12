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
                 class="form-inline inputCommon">
          <el-row>
            <el-col :span="12">
              <el-form-item prop="monthsModel" label="选择月份：">
                  <el-select
                          v-model="form.monthsModel"
                          @change="dateChange(2)"
                          placeholder="请选择"
                          style="width:166px;"
                  >
                    <el-option
                            v-for="item in months"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="daysModel" label="选择日期：">
                  <el-select
                          v-model="form.daysModel"
                          @change="dateChange(3)"
                          placeholder="请选择"
                          style="width:166px;"
                  >
                    <el-option
                            v-for="item in days"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="planWay" label="随访方式：">
                <el-col :span="19">
                  <el-select
                          style="width: 166px"
                          v-model="form.planWay"
                          placeholder="请选择随访方式"
                  >
                    <el-option
                            :label="it.name"
                            :value="it.id"
                            :key="it.id"
                            v-for="it in form.planWayList"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="title" label="随访标题：">
                <el-col>
                  <el-input
                          style="width: 166px"
                          v-model="form.title"
                          placeholder="请输入随访标题"
                  ></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
            <el-form-item label="随访内容：">
              <el-col>
                <el-input
                  type="textarea"
                  v-model="form.planContent"
                  :rows="4"
                  maxlength="100"
                  show-word-limit
                  style="width: 425px"
                  placeholder="请输入随访内容"
                ></el-input>
              </el-col>
            </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" class="cancelBtn" @click="cancel"
                 v-if="modalType !== 3">取消</el-button>
      <el-button size="small" class="sureBtn" type="primary"
                 @click="save" v-if="modalType !== 3"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'el_plan_setting_mdl',
  data() {
    return {
      show: true,
      modalType: 1, // 1新增 2编辑 3查看
      modalTitle: '',
      id: '',
      form: {
        date: null,
        yearsModel: null, // 年份
        monthsModel: null, // 月份
        daysModel: null, // 日期
        selectTime: null,
        title: '',
        planWay: '',
        planContent: '',
        planWayList: [],
      },
      months: [],
      days: [],
      rules: {
        monthsModel: [{ required: true, message: '请选择月份' }],
        daysModel: [{ required: true, message: '请选择日期' }],
        title: [{ required: true, message: '请输入随访标题' }],
        planWay: [{ required: true, message: '请选择随访方式' }],
      },
    };
  },
  mounted() {
    const date = new Date();
    const year = date.getFullYear(); // 获取当前年
    this.yearsModel = year;
    this.initSelectMonth(); // 加载月份
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$nextTick(async () => {
        await this.getPlanWayList();
        if (this.modalType === 2) {
          this.getDetail();
        } else if (this.modalType === 3) {
          this.getDetail();
        }
      });
    },
    initSelectMonth() {
      this.months = [];
      this.months.push({ value: '', label: '请选择' });
      for (let i = 1; i <= 12; i++) {
        this.months.push({ value: i, label: `${i}月` });
      }
    },
    initSelectDay(year, month) {
      const maxDay = this.getMaxDay(year, month);
      this.days = [];
      this.days.push({ value: '', label: '请选择' });
      for (let i = 1; i <= maxDay; i++) {
        this.days.push({ value: i, label: `${i}日` });
      }
    },
    getMaxDay(year, month) {
      let newYear = year; // 取当前的年份
      let m = month;
      let newMonth = m++; // 取下一个月的第一天，方便计算（最后一天不固定）
      if (month > 12) {
        // 如果当前大于12月，则年份转到下一年
        newMonth -= 12; // 月份减
        newYear++; // 年份增
      }
      const newDate = new Date(newYear, newMonth, 1); // 取当年当月中的第一天
      return new Date(newDate.getTime() - (1000 * 60 * 60 * 24)).getDate(); // 获取当月最后一天日期
    },
    dateChange(type) {
      // 1年 2月 3日 4 左 5右
      if (type === 1) {
        this.form.monthsModel = null;
        this.form.daysModel = null;
      } else if (type === 2) {
        this.form.daysModel = null;
      }
      if (type === 1 || type === 2) {
        if (this.form.monthsModel === 0) {
          this.form.daysModel = 0;
          this.initSelectDay(this.yearsModel, 1);
        } else {
          this.initSelectDay(this.yearsModel, this.form.monthsModel);
        }
      }
      // 操作父组件方法
      const obj = {
        month: this.form.monthsModel,
        day: this.form.daysModel,
      };
      console.log(obj);
      this.form.date = {
        year: obj.year,
        month: obj.month,
        day: obj.day,
      };
      // this.$emit('date-change', obj);
    },
    /**
     * 获取干预模板计划设置
     * @return {Promise<void>}
     */
    async getDetail() {
      this.form.date = {
        year: new Date().getFullYear(),
        month: this.propsData.month,
        day: this.propsData.day,
      };
      this.initSelectDay(new Date().getFullYear(), this.propsData.month);
      this.form.monthsModel = this.propsData.month;
      this.form.daysModel = this.propsData.day;
      this.form.planWay = this.propsData.planWay;
      this.form.title = this.propsData.title;
      this.form.planContent = this.propsData.planContent;
    },
    /* dateChange(obj) {
      this.form.date = {
        year: obj.year,
        month: obj.month,
        day: obj.day,
      };
    },*/
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
        this.$jDynamic.hide({ component: 'elPlanSettingMdl' });
      }
    },
    /**
     * 保存
     */
    save() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const obj = {
            interveneTemplateId: this.id,
            month: this.form.date.month,
            day: this.form.date.day,
            title: this.form.title,
            planWay: this.form.planWay,
            planContent: this.form.planContent,
          };
          console.log('obj', obj);
          if (this.modalType === 1) {
            this.$api.interventionTemplateInterface
              .saveInterveneTemplatePlan(obj)
              .then(({ data }) => {
                if (data.success) {
                  if (this.confirmfunc) {
                    this.confirmfunc.call(this, obj);
                  }
                  this.cancel();
                }
              });
          } else if (this.modalType === 2) {
            obj.id = this.propsData.id;
            this.$api.interventionTemplateInterface
              .updateInterveneTemplatePlan(obj)
              .then(({ data }) => {
                if (data.success) {
                  if (this.confirmfunc) {
                    this.confirmfunc.call(this, obj);
                  }
                  this.cancel();
                }
              });
          }
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
  .body {
    .search-title {
      font-size: 18px;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
      padding-left: 10px;
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
      width: 82px;
    }
    .form-title {
      color: #262626;
      display: inline-block;
      width: 82px;
      text-align: right;
    }
    .header {
      margin-bottom: 10px;
      /deep/ .el-form-item__content{
        display: flex;
      }
    }
    .el-pagination {
      padding: 10px 0;
      text-align: right;
    }
  }
  .el-select{
    width: 100%;
  }
  /deep/ .el-dialog__footer{
    padding-top: 0;
  }
  /*/deep/ .el-textarea .el-input__count{
    bottom: -11px;
    background: none;
    height: 20px;
  }*/
}
</style>
