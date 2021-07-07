<template>
  <div class="medical-history-form">
    <el-form
      class="medical-history-form"
      :model="form"
      ref="form"
      :rules="rules"
      label-width="90px"
      label-suffix="："
    >
      <!--<div class="basic-info-title">{{id ? '' : '新增'}}就医用户信息</div>-->
      <div class="divRightTitleDiv" style="margin-top: -20px">
        <div class="divRightTitle">{{ids || clientId? '编辑' : '新增'}}-就医用户信息
          <div class="titleBiao"></div></div>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名" >
            <el-popover
              ref="userPopover"
              placement="bottom-start"
              width="650"
              trigger="click"
              :disabled="!!ids || !!clientId"
              @show="popoverStatus = true"
              @hide="popoverStatus = false">
              <select-user v-if="popoverStatus"  @change="handleSelectUser"></select-user>
              <el-input
                :class="`select-user-trigger ${ids || clientId? 'disabled' : ''}`"
                slot="reference"
                disabled
                v-model="currentUser.name"
                placeholder="请选择客户">
                <i
                  :class="popoverStatus ?
                  'el-icon-arrow-up':'el-icon-arrow-down'"
                  slot="suffix"
                ></i>
                <!-- <i :class="`el-icon-caret-${popoverStatus ? 'top' : 'bottom'}`"
                slot="suffix"></i> -->
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" prop="gender">
            <el-radio v-model="currentUser.gender" :label="2" disabled>女</el-radio>
            <el-radio v-model="currentUser.gender" :label="1" disabled>男</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="currentUser.age" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户编号" prop="customerType">
            <el-input v-model="currentUser.gridName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<div class="main-info-title">就医信息</div>-->
      <div class="divRightTitleDiv" style="margin-top: -20px">
        <div class="divRightTitle">就医信息
          <div class="titleBiao"></div></div>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="就医编号" prop="caseNo">
            <el-input v-model="form.caseNo" placeholder="请输入"
            onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="就医类型" prop="medicalType">
            <el-select v-model="form.medicalType" placeholder="请选择就医类型"
            @change="Changeestates()">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="医保卡号">
            <el-input v-model="form.patientNo" placeholder="请输入"
            onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="就医机构" prop="hospital">
            <el-input v-model="form.hospital" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="就医科室" prop="department">
            <el-input v-model="form.department" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主管医生" >
            <el-input v-model="form.doctorName" placeholder="请输入" :maxlength="300"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="就医时间" >
            <el-date-picker
              v-model="form.inDate"
              type="date"
              placeholder="请选择就医时间"
              value-format="yyyy-MM-dd"
              :max-date="form.outDate || new Date()"
              @change="Changeestates()"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="出院时间" >
            <el-date-picker
              v-model="form.outDate"
              type="date"
              placeholder="请选择出院时间"
              value-format="yyyy-MM-dd"
              :min-date="form.inDate"
              :max-date="new Date()"
            ></el-date-picker>
            <!-- :picker-options="options.outDate" -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="就医金额">
            <el-input v-model="form.money" placeholder="请输入" :maxlength="300"
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="当前状态" prop="result">
            <el-select v-model="form.result" placeholder="请选择当前状态">
              <el-option
                v-for="item in resultOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="现病史" prop="hpi">
            <el-input
              type="textarea"
              v-model="form.hpi"
              :rows="5"
              placeholder="请输入"
              :maxlength="300"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="主诉" prop="complaint">
            <el-input
              type="textarea"
              v-model="form.complaint"
              :rows="5"
              placeholder="请输入"
              :maxlength="300"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="检查" prop="therapy">
            <el-input
              type="textarea"
              v-model="form.examination"
              :rows="5"
              placeholder="请输入"
              :maxlength="300"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="诊断" prop="diagnosis">
            <el-input
              type="textarea"
              v-model="form.diagnosis"
              :rows="5"
              placeholder="请输入"
              :maxlength="300"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="方案" prop="therapy">
            <el-input
              type="textarea"
              v-model="form.therapy"
              :rows="5"
              placeholder="请输入"
              :maxlength="4000"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <div class="form-buttons">
        <el-button plain @click="$emit('cancel')" size="small">取消</el-button>
        <el-button type="primary" @click="submit" size="small">保存</el-button>
      </div> -->
       <div class="handle-btn mt30 mb30">
        <el-button class="reset-btn" size="small" @click="goBack"
          >返回</el-button>
        <el-button class="add-btn" type="primary" size="small" @click="submit"
          >保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import SelectUser from './medical_history_select_user.vue';
import * as dayjs from 'dayjs';
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);

export default {
  name: 'MedicalHistoryForm',
  components: {
    SelectUser,
  },
  props: {
    detail: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      required: false,
      default: '',
    },
  },
  data() {
    return {
      popoverStatus: false,
      form: {
        caseNo: '', // 就医编号
        money: '', // 金额
        clientInfoId: '', // 客户ID
        hospital: '', // 医院（医疗机构）
        department: '', // 科室
        patientNo: '', // 医疗卡号
        medicalType: '', // 就医类型
        inDate: '', // 入院时间
        outDate: '', // 出院时间
        doctorName: '', // 医生名称
        result: '', // 当前状态
        complaint: '', // 主诉
        hpi: '', // 现病史
        examination: '', // 检查
        diagnosis: '', // 诊断
        therapy: '', // 方案
        orgCode: '', // 组织code
        organId: '', // 组织id
      },
      options: {
        inDate: {
          disabledDate: (cur) => {
            // eslint-disable-next-line no-underscore-dangle
            const _now = dayjs(new Date()).format('YYYY-MM-DD');
            // eslint-disable-next-line no-underscore-dangle
            const _cur = dayjs(cur);
            if (_cur.isAfter(_now, 'day')) {
              return true;
            }
            return false;
          },
        },
        outDate: {
          disabledDate: (cur) => {
            // // eslint-disable-next-line no-underscore-dangle
            // const _now = this.form.inDate
            //   ? dayjs(this.form.inDate).format('YYYY-MM-DD')
            //   : dayjs(new Date()).format('YYYY-MM-DD');
            // // eslint-disable-next-line no-underscore-dangle
            // const _cur = dayjs(cur);
            // if (_cur.isSameOrAfter(_now)) {
            //   return false;
            // }
            // return true;
            // eslint-disable-next-line no-underscore-dangle
            const _now = dayjs(new Date()).format('YYYY-MM-DD');
            // eslint-disable-next-line no-underscore-dangle
            const _cur = dayjs(cur);
            if (_cur.isAfter(_now, 'day')) {
              return true;
            }
            return false;
          },
        },
      },
      rules: {
        medicalType: [{ required: true, message: '就医类型不能为空' }],
        department: [{ required: true, message: '就医科室不能为空' }],
        hospital: [{ required: true, message: '就机构室不能为空' }],
        hpi: [{ required: true, message: '现病史不能为空' }],
        complaint: [{ required: true, message: '主诉不能为空' }],
        diagnosis: [{ required: true, message: '诊断不能为空' }],
        // money: [{ required: true, message: '金额不能为空' }],
        caseNo: [{ required: true, message: '就医编号不能为空' }],
        name: [{ required: true, message: '客户不能为空' }],
        result: [{ required: true, message: '请选择当前状态' }],
      },
      resultOptions: [
        { value: 1, label: '未指定' },
        { value: 2, label: '治疗中' },
        { value: 3, label: '转诊' },
        { value: 4, label: '转为慢病' },
        { value: 5, label: '痊愈' },
        { value: 6, label: '其他' },
      ],
      typeOptions: [
        { value: 1, label: '门诊' },
        { value: 2, label: '住院' },
      ],
      currentUser: {},
      ids: this.$route.query.id,
      clientId: this.$route.query.clientId,
    };
  },
  mounted() {
    if (this.ids) {
      document.title = '编辑就医用户信息';
      this.$api.medicalHistoryInterface.medicalInfoDetail(this.ids).then((res) => {
        const { data } = res;
        this.form = Object.assign(this.form, data.data || {});
        this.currentUser = {
          id: this.form.clientInfoId,
          name: this.form.clientName,
          age: this.form.age,
          gender: this.form.gender,
          gridName: this.form.clientGrid,
        };
      });
    }
    if (this.clientId) {
      this.getClientUserInfo(this.clientId);
    }
  },
  methods: {
    getClientUserInfo(id) {
      this.$api.userManagerInterface.getDetail(id).then(({ data }) => {
        if (data.success) {
          this.currentUser = data.data;
          this.form.clientInfoId = data.data.id;
          this.$refs.form.validateField('clientInfoId');
        }
      });
    },
    Changeestates() {
      if (this.form.medicalType === 1) {
        this.form.outDate = this.form.inDate;
      }
      // console.log(index, this.form.medicalType);
      // this.$set(this.form, 'medicalType', index);
      // this.$forceUpdate();
    },
    handleStartDateChange() {
      if (this.form.medicalType === 1 && this.form.inDate) {
        this.form.outDate = this.form.inDate;
      }
    },
    handleSelectUser(data) {
      this.$refs.userPopover.doClose();
      this.popoverStatus = false;
      this.currentUser = data;
      this.form.clientInfoId = data.id;
      this.$refs.form.validateField('clientInfoId');
    },
    replace(value) {
      const REG = /[\u4e00-\u9fa5]/gi;
      const str = value.replace(REG, '');
      this.form.patientNo = str;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            annexList: [],
            caseNo: this.form.caseNo,
            money: this.form.money,
            clientInfoId: this.form.clientInfoId,
            complaint: this.form.complaint,
            department: this.form.department,
            diagnosis: this.form.diagnosis,
            doctorName: this.form.doctorName,
            examination: this.form.examination,
            hospital: this.form.hospital,
            patientNo: this.form.patientNo,
            inDate: this.form.inDate,
            medicalType: this.form.medicalType,
            orgCode: this.form.orgCode,
            organId: this.form.organId,
            outDate: this.form.outDate,
            result: this.form.result,
            therapy: this.form.therapy,
            hpi: this.form.hpi,
          };
          if (this.ids) {
            params.id = this.ids;
          }
          if (this.ids) {
            this.$api.medicalHistoryInterface.medicalInfoUpdate(params).then((res) => {
              const { data } = res;
              if (data.success) {
                this.$message.success('操作成功');
                this.$emit('afterSubmit');
                this.$router.go(-1);
              }
            });
          } else {
            this.$api.medicalHistoryInterface.medicalInfoSave(params).then((res) => {
              const { data } = res;
              if (data.success) {
                this.$message.success('操作成功');
                this.$emit('afterSubmit');
                this.$router.go(-1);
              }
            });
          }
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.medical-history-form {
  /deep/.select-user-trigger .el-input__inner {
    color: #333 !important;
    background: #ffffff !important;
  }
  .basic-info-title, .main-info-title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    padding-left: 10px;
    position: relative;
    margin-bottom: 20px;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
      height: 18px;
      background: #4991FD;
      border-radius: 1px;
    }
    &.main-info-title {
      margin-top: 10px;
    }
  }
  /deep/ .select-user-trigger {
    input, i {
      cursor: pointer;
      &.el-icon-caret-bottom, &.el-icon-caret-top {
        &::before{
          content: url('../../../../assets/images/common/arrow.png');
        }
        &.el-icon-caret-bottom {
          transform: rotate(180deg);
        }
      }
    }
    .el-input__suffix {
      right: 15px;
    }
    input::placeholder {
      color: #666;
    }
    .el-input__inner {
      color: #333 !important;
      /*background: #F4F4F6 !important;*/
    }
  }
  /deep/ input, /deep/ textarea {
    /*border: none;*/
    /*background: #F4F4F6;*/
    /*border-radius: 5px;*/
  }
  /deep/ .el-radio.is-disabled {
    .el-radio__label {
      color: #999;
    }
  }
  /deep/ .el-radio__input.is-disabled.is-checked .el-radio__inner {
    background-color: #4991fd;
    border-color: #4991fd;
  }
  .el-select,
  .el-date-editor {
    width: 100%;
  }
  .form-buttons {
    text-align: center;
    margin-top: 10px;
    button {
      width: 80px;
      border-radius: 8px;
      border: none;
    }
    button + button {
      margin-left: 20px;
    }
    /deep/ .is-plain {
      background: #97A6BD;
      color: #fff;
    }
  }
}
 .handle-btn {
    text-align: center;
    .reset-btn {
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      border: 1px solid #3154AC;
      text-align:center;
      color: #3154AC;
    }
    .add-btn {
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      background: #3154AC;
      border: 1px solid #3154AC;
      text-align:center;
    }
  }
</style>
