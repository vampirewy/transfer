<template>
  <el-dialog
    :title="id? '编辑计划' : '新增计划'"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="570px"
    :visible.sync="visible"
    @close="cancel"
  >
    <!-- <div class="form-title">
      <div class="point"></div>
      <h3 class="name">企业信息</h3>
    </div> -->

    <el-form
      :label-position="right"
      label-width="100px"
      label-text-align="center"
      :model="value"
      ref="form"
      class="form-content"
    >
      <!-- <el-form-item label="企业名称：">
        <el-input
          v-model="value.workUnitName"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          :maxlength="30"
          style="width: 430px"
        ></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="体检库名称：">
        <el-input
          v-model="value.address"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          :maxlength="180"
          style="width: 410px"
        ></el-input>
      </el-form-item> -->
      <div style="display: flex;margin-bottom:20px">
        <!-- <el-col :span="8">
          <el-form-item label="选择月份" > -->
            <!-- <el-select v-model="gender" placeholder="请选择"> -->
              <span style="white-space: nowrap;margin: 10px 10px 10px 20px;">选择月份：</span>
              <el-select
                      v-model="form.monthsModel"
                      @change="dateChange(2)"
                      placeholder="请选择"
                      style="width:200px;"
              >
                <el-option
                        v-for="item in months"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                >
                </el-option>
              </el-select>
              <!-- <el-date-picker
                v-model="gender"
                type="month"
                placeholder="选择月"
                style="width:160px;">
              </el-date-picker> -->
          <!-- </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择日期：" > -->
            <span style="white-space: nowrap;margin: 10px 10px 10px 20px;">选择日期：</span>
            <el-select
                    v-model="form.daysModel"
                    @change="dateChange(3)"
                    placeholder="请选择"
                    style="width:200px;"
            >
              <el-option
                      v-for="item in days"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
              >
              </el-option>
            </el-select>
            <!-- <el-date-picker
              v-model="value1"
              format="dd"
              type="date"
              placeholder="选择日期"
              style="width:160px;">
            </el-date-picker> -->
          <!-- </el-form-item>
        </el-col> -->
      </div>
      <div style="display: flex;">
        <el-form-item label="干预形式：" >
          <el-select style="width:160px" v-model="interfereform" placeholder="请选择">
            <el-option
              v-for="item in formData.planWayList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-col :span="6">
          <el-form-item label="主要内容：" >
            <el-input v-model="results" style="width:160px" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-form-item label="主要内容：" >
          <el-select v-model="results" placeholder="请选择">
            <el-input>
            </el-input>
            <el-option
              v-for="item in resultOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
      </div>
      <el-col :span="24">
          <el-form-item label="干预提示：" prop="result">
            <el-input
              type="textarea"
              v-model="Prompt"
              :rows="5"
              placeholder="请输入"
              :maxlength="300"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      <!-- <el-form-item label="导入体检库：">
        <el-input
          v-model="value.contact"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          :maxlength="30"
          style="width: 166px"
        ></el-input>
        <span class="tel">是否启用：</span>
        <el-input
          v-model="value.mobile"
          :format="/^(1\d{0,10}){0,1}$/"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          style="width: 166px"
        ></el-input>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer" >
      <el-button size="small" @click="cancel" class="cancelBtn">取消</el-button>
      <el-button type="primary" size="small" @click="submit" class="sureBtn">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'edit_or_detail',
  props: {
    visible: Boolean,
    value: Object,
    id: String,
    interveneTemplateId: String,
  },
  data() {
    return {
      monthsModel: '',
      daysModel: '',
      modalTitle: '编辑',
      gender: '', // 性别
      Status: '', // 状态
      interfereform: '', // 干预形式
      results: '',
      Prompt: '', // 提示
      // resultOptions: [
      //   { value: 1, label: '未指定' },
      //   { value: 2, label: '治疗中' },
      //   { value: 3, label: '转诊' },
      //   { value: 4, label: '转为慢病' },
      //   { value: 5, label: '痊愈' },
      //   { value: 6, label: '其他' },
      // ],
      formData: {
        planWayList: [],
      },
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
    };
  },
  mounted() {
    // if (!this.id) {
    //   console.log('新增');
    //   this.form.monthsModel = null;
    //   this.form.daysModel = null;
    //   this.form.planWay = '';
    //   this.form.planContent = '';
    //   this.form.results = '';
    //   this.form.interfereform = '';
    //   this.form.Prompt = '';
    // }
    const date = new Date();
    const year = date.getFullYear(); // 获取当前年
    this.yearsModel = year;
    this.initSelectMonth(); // 加载月份
    if (this.id) {
      console.log(this.value, this.id, this.interveneTemplateId, '接收的数据');
      this.dateChange(2);
      this.form.monthsModel = this.value.month;
      this.form.daysModel = this.value.day;
      this.results = this.value.planContent;
      this.interfereform = this.value.planWay;
      this.Prompt = this.value.planWay;
    }
    this.getPlanWayList();
  },
  methods: {
    async getPlanWayList() {
      const res = await this.$api.userFollowInterface.getIntervenePlanWayList();
      const { data } = res.data;
      const list = data.map((it) => {
        const { id, name } = it;
        return { id, name };
      });
      this.formData.planWayList = list;
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
      // console.log(obj);
      this.form.date = {
        year: obj.year,
        month: obj.month,
        day: obj.day,
      };
      // this.$emit('date-change', obj);
    },
    cancel() {
      this.$emit('cancel');
    },
    async submit() {
      // await this.$api.companyManageInterface.updateWorkUnit({
      //   id: this.value.id,
      //   workUnitName: this.value.workUnitName,
      //   contact: this.value.contact,
      //   mobile: this.value.mobile,
      //   address: this.value.address,
      // });
      // this.$message.success('操作成功');
      // this.cancel();
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const obj = {
            interveneTemplateId: this.interveneTemplateId,
            month: this.form.monthsModel,
            day: this.form.daysModel,
            remarik: '',
            title: this.results,
            planWay: this.interfereform,
            planContent: this.Prompt,
          };
          if (!this.form.monthsModel) {
            return this.$message.warning('请选择月份');
          }
          if (!this.form.daysModel) {
            return this.$message.warning('请选择日期');
          }
          if (this.interfereform === '') {
            return this.$message.warning('请选择干预形式');
          }
          console.log('obj', obj);
          if (this.id === '') {
            this.$api.interventionTemplateInterface
              .saveInterveneTemplatePlan(obj)
              .then(({ data }) => {
                if (data.success) {
                  this.$message.success('操作成功');
                  // if (this.confirmfunc) {
                  //   this.confirmfunc.call(this, obj);
                  // }
                  this.cancel();
                }
              });
          } else {
            obj.id = this.id;
            this.$api.interventionTemplateInterface
              .updateInterveneTemplatePlan(obj)
              .then(({ data }) => {
                if (data.success) {
                  this.$message.success('操作成功');
                  // if (this.confirmfunc) {
                  //   this.confirmfunc.call(this, obj);
                  // }
                  this.cancel();
                }
              });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-detail /deep/ {
  .form-title {
    display: flex;
    align-items: center;
    .point {
      width: 5px;
      height: 5px;
      background: #4991fd;
      margin-right: 8px;
      -webkit-border-radius: 1px;
      -moz-border-radius: 1px;
      border-radius: 1px;
    }
    .name {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
    }
  }
  .form-content {
    margin-top: 20px;
    .el-input__inner {
      background-color: #f4f4f6;
      border: 0;
    }
    .tel {
      margin-left: 20px;
      color: #666;
    }
  }
  .dialog-footer {
    text-align: center;
    padding: 0 32px;
  }
  .reset-btn {
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    background: #97a6bd;
    color: #ffffff;
    font-weight: 400;
    padding: 12px 26px;
  }
  .add-btn {
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    padding: 12px 25px;
  }
}
</style>
