<template>
  <div class="medication-history-add">
    <el-form
        ref="form"
        :inline="false"
        :rules="rules"
        :model="infoSource"
        :label-position="right"
        label-suffix="："
        label-width="83px"
        class="form-inline"
    >
      <!--<div class="form-title">
        <div class="line"></div>
        <h3 class="name">新增-{{Name}}</h3>
      </div>-->
        <div class="divRightTitleDiv">
            <div class="divRightTitle">新增-{{Name}}
                <div class="titleBiao"></div></div>
        </div>
      <div class="medicate-record mt20">
      <el-row>
          <el-col :span="6">
          <el-form-item label="姓名" prop="clientName">
            <el-popover
              ref="userPopover"
              placement="bottom-start"
              width="650"
              trigger="click"
              @show="popoverStatus = true"
              @hide="handlePopoperClose"
            >
              <select-user
                v-if="popoverStatus"
                @change="onSelectUser"
              ></select-user>
              <el-input
                :class="`select-user-trigger ${id ? 'disabled' : ''}`"
                slot="reference"
                disabled
                v-model="infoSource.clientName"
                placeholder="请选择客户"
              >
                <i
                  :class="`el-icon-caret-${popoverStatus ? 'top' : 'bottom'}`"
                  slot="suffix"
                ></i>
              </el-input>
            </el-popover>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="性别" prop="gender">
            <el-radio v-model="infoSource.gender" :label="1" disabled>男</el-radio>
            <el-radio v-model="infoSource.gender" :label="2" disabled>女</el-radio>
          </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="年龄" prop="age">
            <el-input
              v-model="infoSource.age"
              disabled
              class="age-input"
            ></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="客户编号" prop="gridName">
            <el-input
              v-model="infoSource.gridName"
              disabled
            ></el-input>
          </el-form-item>
          </el-col>
      </el-row>
      </div>

      <!-- <div class="form-title">
        <div class="line"></div>
        <h3 class="name">就医信息</h3>
      </div> -->

      <div class="medicate-info mt20" style="margin-top:0">
        <el-row v-if="id === 0">
            <el-col :span="6">
            <el-form-item label="收缩压" prop="SBP">
              <el-input
                v-model="infoSource.SBP"
                onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                placeholder="请输入"
                :maxlength="100"
                style="width: 130px;height:40px"
              ></el-input>
              <span style="color:333333;font-size:14px">mmHg</span>
            </el-form-item>
            </el-col>
            <el-col :span="6">
            <el-form-item label="舒张压" prop="DBP">
              <el-input
                v-model="infoSource.DBP"
                onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                placeholder="请输入"
                :maxlength="30"
                style="width: 130px;height:40px"
              ></el-input>
              <span style="color:333333;font-size:14px">mmHg</span>
            </el-form-item>
            </el-col>
            <el-col :span="6">
            <el-form-item label="脉搏" >
              <el-input
                v-model="infoSource.pulse"
                onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                placeholder="请输入"
                :maxlength="30"
                style="width: 130px"
              ></el-input>
              <span style="color:333333;font-size:14px">次/分钟</span>
            </el-form-item>
            </el-col>
            <el-col :span="6">
            <el-form-item label="日期时间" prop="startDate">
              <el-date-picker
                v-model="infoSource.startDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                :max-date="new Date()"
                placeholder="选择日期时间">
              </el-date-picker>
              <!-- <el-date-picker
                class="start-date"
                v-model="infoSource.startDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
                style="width: 100%"
                :max-date="new Date()"
              ></el-date-picker> -->
            </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="时间" prop="Timevalue">
                <el-time-picker
                v-model="infoSource.Timevalue"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:00:00'
                }"
                value-format="HH:mm:ss"
                placeholder="请选择时间">
              </el-time-picker>
              </el-form-item>
            </el-col> -->
        </el-row>
        <el-row v-if="id === 1">
            <!-- <el-form-item label="血糖类型" prop="drugsName" style="width:25%">
              <el-input
                v-model="infoSource.bloodsugar"
                placeholder="请输入"
                :maxlength="100"
                style="width: 200px"
              ></el-input>
            </el-form-item> -->
            <el-col :span="6">
            <el-form-item label="血糖类型" prop="bloodsugar">
                <el-select v-model="infoSource.bloodsugar" placeholder="请选择血糖类型">
                <el-option
                    v-for="item in typeOptions"
                    :key="item.paramValue"
                    :label="item.name"
                    :value="item.paramValue"
                ></el-option>
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="6">
            <el-form-item label="血糖值" prop="bloodsugarvalue">
              <el-input
                onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                v-model="infoSource.bloodsugarvalue"
                placeholder="请输入"
                :maxlength="100"
                style="width: 130px"
              ></el-input>
              <span style="color:333333;font-size:14px">mmol/L</span>
            </el-form-item>
            </el-col>
            <el-col :span="6">
            <el-form-item label="日期时间" prop="startDate">
              <el-date-picker
                v-model="infoSource.startDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                :max-date="new Date()"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="时间" prop="Timevalue">
                <el-time-picker
                v-model="infoSource.Timevalue"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:00:00'
                }"
                placeholder="请选择时间">
              </el-time-picker>
              </el-form-item>
            </el-col> -->
        </el-row>
        <div v-if="id === 2">
            <el-row>
                <el-col :span="6">
                <el-form-item label="身高">
                <el-input
                    onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                    v-model="infoSource.Height"
                    placeholder="请输入"
                    :maxlength="30"
                    style="width: 130px"
                ></el-input>
                <span style="color:333333;font-size:14px">cm</span>
                </el-form-item>
                </el-col>
                <el-col :span="6">
                <el-form-item label="体重" prop="Weight">
                <el-input
                    onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                    v-model="infoSource.Weight"
                    placeholder="请输入"
                    :maxlength="100"
                    style="width: 130px"
                ></el-input>
                <span style="color:333333;font-size:14px">kg</span>
                </el-form-item>
                </el-col>
                <el-col :span="6">
                <el-form-item label="腰围" prop="Waist">
                <el-input
                    onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                    v-model="infoSource.Waist"
                    placeholder="请输入"
                    :maxlength="30"
                    style="width: 130px"
                ></el-input>
                <span style="color:333333;font-size:14px">cm</span>
                </el-form-item>
                </el-col>
                <el-col :span="6">
                <el-form-item label="体脂率" prop="specification">
                <el-input
                    onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                    v-model="infoSource.specification"
                    placeholder="请输入"
                    :maxlength="30"
                    style="width: 130px"
                ></el-input>
                <span style="color:333333;font-size:14px">%</span>
                </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                <el-form-item label="日期时间" prop="startDate">
                  <el-date-picker
                  v-model="infoSource.startDate"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :max-date="new Date()"
                  placeholder="选择日期时间">
                </el-date-picker>
                </el-form-item>
                </el-col>
                <!-- <el-col :span="6">
              <el-form-item label="时间" prop="Timevalue">
                <el-time-picker
                  v-model="infoSource.Timevalue"
                  :picker-options="{
                    selectableRange: '00:00:00 - 23:00:00'
                  }"
                  placeholder="请选择时间">
                </el-time-picker>
                </el-form-item>
              </el-col> -->
            </el-row>
        </div>
        <div v-if="id === 3">
                <el-row>
                <el-col :span="6">
                <el-form-item label="运动时间" >
                <el-input
                    onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                    v-model="infoSource.sportTime"
                    placeholder="请输入"
                    :maxlength="30"
                    style="width:130px"
                ></el-input>
                <span style="color:333333;font-size:14px">min</span>
                </el-form-item>
                </el-col>
                    <el-col :span="6">
                <el-form-item label="运动路程" >
                <el-input
                    onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                    v-model="infoSource.sportDistance"
                    placeholder="请输入"
                    :maxlength="30"
                    style="width:130px"
                ></el-input>
                <span style="color:333333;font-size:14px">公里</span>
                </el-form-item>
                    </el-col>
                <el-col :span="6">
                <el-form-item label="运动步数" >
                <el-input
                    onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                    v-model="infoSource.steps"
                    placeholder="请输入"
                    :maxlength="30"
                    style="width:130px"
                ></el-input>
                <span style="color:333333;font-size:14px">步</span>
                </el-form-item>
                </el-col>
                <el-col :span="6">
                <el-form-item label="运动消耗" >
                <el-input
                    v-model="infoSource.kcal"
                    placeholder="请输入"
                    :maxlength="30"
                    style="width:130px"
                ></el-input>
                <span style="color:333333;font-size:14px">Kcai</span>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="6">
                <el-form-item label="日期时间" prop="startDate">
                  <el-date-picker
                    v-model="infoSource.startDate"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :max-date="new Date()"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
                <!-- <el-col :span="6">
                  <el-form-item label="时间" prop="Timevalue">
                    <el-time-picker
                    v-model="infoSource.Timevalue"
                    :picker-options="{
                      selectableRange: '00:00:00 - 23:00:00'
                    }"
                    placeholder="请选择时间">
                  </el-time-picker>
                  </el-form-item>
                </el-col> -->
                </el-row>
        </div>
        <div class="row">
            <el-form-item label="备注" prop="ingrenient" style="width:100%">
              <el-input
                type="textarea"
                :rows="5"
                v-model="infoSource.conclusion"
                placeholder="请输入"
                :maxlength="300"
                show-word-limit
              ></el-input>
            </el-form-item>
        </div>
      </div>
      <div class="handle-btn mt30 mb30">
        <el-button class="reset-btn" size="small" @click="goBack"
          >返回</el-button
        >
        <el-button class="add-btn" type="primary" size="small" @click="submit"
          >保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<script>
import detail from '../components/detail.vue';
import selectUser from '../components/select_user.vue';

export default {
  name: 'medication_history_add',
  props: ['id', 'editId'],
  components: {
    detail,
    selectUser,
  },
  data() {
    return {
      popoverStatus: false,
      total: 0,
      typeOptions: [],
      infoSource: {
        SBP: '', // 收缩压
        DBP: '', // 舒张压
        pulse: '', // 脉搏
        conclusion: '', // 结论
        drugsName: '',
        mainIndication: '',
        specification: '', // 体脂率
        countDay: '',
        startDate: '',
        startDates: '',
        endDate: '',
        dose: '',
        ingrenient: '',
        resoures: '',
        result: '',
        clientName: '',
        clientId: '', // 主键id
        age: '',
        gender: '',
        gridName: '',
        clientNo: '',
        bloodsugar: '', // 血糖
        bloodsugarvalue: '', // 血糖值
        Height: '', // 身高
        Weight: '', // 体重
        Waist: '', // 腰围
        sportTime: '', // 运动时间
        sportDistance: '', // 运动路程
        steps: '', // 步数
        kcal: '', // 消耗
        Timevalue: '',
      },
      drugsList: [],
      resultList: [],
      rules: {
        Timevalue: [{ required: true, message: '时间不能为空' }],
        clientName: [{ required: true, message: '客户不能为空' }],
        bloodsugarvalue: [{ required: true, message: '血糖值不能为空' }],
        startDate: [{ required: true, message: '日期时间不能为空' }],
        endDate: [{ required: true, message: '结束时间不能为空' }],
        result: [{ required: true, message: '当前状态不能为空' }],
        SBP: [{ required: true, message: '收缩压不能为空' }],
        DBP: [{ required: true, message: '舒张压不能为空' }],
        bloodsugar: [{ required: true, message: '血糖类型不能为空', trigger: 'blur' }],
        Weight: [{ required: true, message: '体重不能为空' }],
        Waist: [{ required: true, message: '腰围不能为空' }],
        specification: [{ required: true, message: '体脂率不能为空' }],
      },
      formData: {
        pageNo: 1,
      },
      Name: '血压',
    };
  },
  mounted() {
    window.vm = this;
    // this.getResultList();
    console.log(this.id, this.editId, '123213');
    if (this.id === 0) {
      this.Name = '血压';
      if (this.editId !== '') {
        this.queryChartInfo(this.editId);
      }
    }
    if (this.id === 1) {
      this.Name = '血糖';
      this.getQuickListBloodSugar();
      if (this.editId !== '') {
        this.queryChartInfoFPG(this.editId);
      }
    }
    if (this.id === 2) {
      this.Name = '体重';
      if (this.editId !== '') {
        this.queryChartInfoWeight(this.editId);
      }
    }
    if (this.id === 3) {
      this.Name = '运动';
      if (this.editId !== '') {
        this.queryChartInfoSports(this.editId);
      }
    }
    if (this.editId === '') {
      this.infoSource.startDates = ' 00:00:00';
    }
  },
  methods: {
    queryChartInfo(id) {
      this.$api.healthMonitorInterface.getDetailHealthBloodPressure(id).then(({ data }) => {
        this.infoSource.clientName = data.data.clientName;
        this.infoSource.gender = data.data.gender;
        this.infoSource.age = data.data.age;
        this.infoSource.clientId = data.data.clientId;
        this.infoSource.gridName = data.data.clientId;
        this.infoSource.SBP = data.data.sbp;
        this.infoSource.DBP = data.data.dbp;
        this.infoSource.pulse = data.data.hd;
        this.infoSource.conclusion = data.data.result;
        this.infoSource.startDate = data.data.testDate;
      });
    },
    queryChartInfoFPG(id) {
      this.$api.healthMonitorInterface.getDetailHealthBloodSugar(id).then(({ data }) => {
        this.infoSource.clientName = data.data.clientName;
        this.infoSource.gender = data.data.gender;
        this.infoSource.age = data.data.age;
        this.infoSource.clientId = data.data.clientId;
        this.infoSource.gridName = data.data.clientId;
        this.infoSource.bloodsugarvalue = data.data.sugar;
        this.infoSource.startDate = data.data.testDate;
        this.infoSource.conclusion = data.data.result;
      });
    },
    queryChartInfoWeight(id) {
      this.$api.healthMonitorInterface.getDetailHealthWeight(id).then(({ data }) => {
        this.infoSource.clientName = data.data.clientName;
        this.infoSource.gender = data.data.gender;
        this.infoSource.age = data.data.age;
        this.infoSource.clientId = data.data.clientId;
        this.infoSource.gridName = data.data.clientId;
        this.infoSource.Height = data.data.height;
        this.infoSource.Weight = data.data.weight;
        this.infoSource.Waist = data.data.wc;
        this.infoSource.startDate = data.data.testDate;
        this.infoSource.conclusion = data.data.result;
        this.infoSource.specification = data.data.bdPercent;
      });
    },
    queryChartInfoSports(id) {
      this.$api.healthMonitorInterface.getDetailHealthSport(id).then(({ data }) => {
        this.infoSource.clientName = data.data.clientName;
        this.infoSource.gender = data.data.gender;
        this.infoSource.age = data.data.age;
        this.infoSource.clientId = data.data.clientId;
        this.infoSource.gridName = data.data.clientId;
        this.infoSource.sportTime = data.data.sportTime;
        this.infoSource.sportDistance = data.data.sportDistance;
        this.infoSource.steps = data.data.steps;
        this.infoSource.startDate = data.data.testDate;
        this.infoSource.kcal = data.data.kcal;
        this.infoSource.conclusion = data.data.result;
      });
    },
    async getQuickListBloodSugar() {
      const { data } = await this.$api.healthMonitorInterface.getQuickListBloodSugar();
      this.typeOptions = data.data;
      console.log(this.typeOptions, '血糖类型数据');
    },
    // async getResultList() {
    //   const res = await this.$api.medication.getResultList();
    //   const { data } = res;
    //   this.resultList = data.data.data;
    // },
    handlePopoperClose() {
      this.popoverStatus = false;
    },
    onSelectUser(data) {
      console.log(data, 'qweqweqeqwewe');
      this.$refs.userPopover.doClose();
      this.popoverStatus = false;
      this.infoSource.clientName = data.name;
      this.infoSource.clientId = data.id;
      this.infoSource.age = data.age;
      this.infoSource.gender = data.gender;
      this.infoSource.gridName = data.gridName;
      this.infoSource.clientNo = data.clientNo;
    },
    addRecord() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.drugsList.push(JSON.parse(JSON.stringify(this.infoSource)));
          this.clear();
        }
      });
    },
    remove(index) {
      this.$confirm('确定要删除该数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.drugsList.splice(index, 1);
      });
    },
    clear() {
      const field = [
        'drugsName',
        'mainIndication',
        'specification',
        'countDay',
        'startDate',
        'endDate',
        'dose',
        'result',
        'ingrenient',
        'resoures',
      ];
      field.map((v) => {
        this.infoSource[v] = '';
        return true;
      });
      setTimeout(() => {
        this.$refs.form.clearValidate();
      }, 0);
    },
    goBack() {
      this.$emit('messageData', true, true);
    },
    handleCurrentChange(page) {
      this.formData.pageNo = page;
      this.queryList();
    },
    handleSizeChange(size) {
      this.formData.pageSize = size;
      this.queryList();
    },
    submit() {
      // this.infoSource.startDates = this.infoSource.Timevalue;
      if (this.infoSource.clientId === '') {
        return this.$message.error('项目名称不能为空');
      }
      if (this.id === 0) {
        if (!this.infoSource.SBP) {
          return this.$message.warning('请填写收缩压');
        }
        if (!this.infoSource.DBP) {
          return this.$message.warning('请填写舒张压');
        }
        if (!this.infoSource.startDate) {
          return this.$message.warning('请填写时间');
        }
        return this.$api.healthMonitorInterface.saveHealthBloodPressure({
          id: this.editId,
          clientId: this.infoSource.clientId,
          testDate: this.infoSource.startDate,
          sbp: this.infoSource.SBP,
          dbp: this.infoSource.DBP,
          hd: this.infoSource.pulse,
          result: this.infoSource.conclusion,
        }).then(({ data }) => {
          this.$message.success('操作成功');
          console.log(data);
          this.goBack();
        });
      }
      if (this.id === 1) {
        if (!this.infoSource.bloodsugar) {
          return this.$message.warning('请填写血糖值');
        }
        if (!this.infoSource.bloodsugarvalue) {
          return this.$message.warning('请填写血压值');
        }
        if (!this.infoSource.startDate) {
          return this.$message.warning('请填写时间');
        }
        return this.$api.healthMonitorInterface.savehealthbloodsugar({
          id: this.editId,
          clientId: this.infoSource.clientId,
          sugar: this.infoSource.bloodsugarvalue,
          sugarType: this.infoSource.bloodsugar,
          testDate: this.infoSource.startDate,
          result: this.infoSource.conclusion,
        }).then(({ data }) => {
          this.$message.success('操作成功');
          console.log(data);
          this.goBack();
        });
      }
      if (this.id === 2) {
        if (!this.infoSource.Weight) {
          return this.$message.warning('请填写体重');
        }
        if (!this.infoSource.Waist) {
          return this.$message.warning('请填写腰围');
        }
        if (!this.infoSource.specification) {
          return this.$message.warning('请填写体脂率');
        }
        if (!this.infoSource.startDate) {
          return this.$message.warning('请填写时间');
        }
        return this.$api.healthMonitorInterface.savehealthweight({
          id: this.editId,
          clientId: this.infoSource.clientId,
          height: this.infoSource.Height,
          weight: this.infoSource.Weight,
          wc: this.infoSource.Waist,
          bdPercent: this.infoSource.specification,
          testDate: this.infoSource.startDate,
          result: this.infoSource.conclusion,
        }).then(({ data }) => {
          this.$message.success('操作成功');
          console.log(data);
          this.goBack();
        });
      }
      if (this.id === 3) {
        if (!this.infoSource.startDate) {
          return this.$message.warning('请填写时间');
        }
        return this.$api.healthMonitorInterface.savehealthsport({
          id: this.editId,
          clientId: this.infoSource.clientId,
          sportTime: this.infoSource.sportTime,
          testDate: this.infoSource.startDate,
          sportDistance: this.infoSource.sportDistance,
          steps: this.infoSource.steps,
          kcal: this.infoSource.kcal,
          result: this.infoSource.conclusion,
        }).then(({ data }) => {
          this.$message.success('操作成功');
          console.log(data);
          this.goBack();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
/deep/ input[type='number'] {
  -moz-appearance: textfield !important;
}
.medication-history-add /deep/ {
  .row {
    display: flex;
    flex-direction: row;
  }
  .red {
    font-style: normal;
    color: #f00;
  }
  .mt10 {
    margin-top: 10px;
  }
  .mt20 {
    margin-top: 20px;
  }
  .mt30 {
    margin-top: 30px;
  }
  .mb30 {
    margin-bottom: 30px;
  }
  .el-input__inner,
  .el-textarea__inner {
    // background-color: #f4f4f6;
    /*border: 0;*/
  }
  .select-user-input {
    .el-input__inner {
      color: #333;
      cursor: pointer;
    }
  }
  .form-inline {
    .form-title {
      display: flex;
      align-items: center;
      position: relative;
      margin-top: 20px;
      .line {
        width: 36px;
        height: 4px;
        background: #3154AC;
        margin-right: 8px;
        border-radius: 1px;
        position: absolute;
        margin-top: 12px;
        opacity: 0.5;
      }
      .name {
        font-size: 18px;
        font-weight: 600;
        color: #333333;
      }
    }
  }
  .handle-btn {
    text-align: center;
    .reset-btn {
      // -webkit-border-radius: 8px;
      // -moz-border-radius: 8px;
      // border-radius: 8px;
      // background: #97a6bd;
      // color: #ffffff;
      // font-weight: 400;
      // padding: 12px 26px;
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      border: 1px solid #3154AC;
      text-align:center;
      color: #3154AC;
    }
    .add-btn {
      // -webkit-border-radius: 8px;
      // -moz-border-radius: 8px;
      // border-radius: 8px;
      // padding: 12px 25px;
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      background: #3154AC;
      border: 1px solid #3154AC;
      text-align:center;
    }
  }
  .el-input.is-disabled .el-input__inner{
      background: #ffffff !important;
  }
}
</style>
