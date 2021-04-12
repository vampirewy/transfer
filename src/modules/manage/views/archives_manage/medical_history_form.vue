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
      <div class="basic-info-title">{{id ? '' : '新增'}}就医用户信息</div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名" prop="clientInfoId">
            <el-popover
              ref="userPopover"
              placement="bottom-start"
              width="650"
              trigger="click"
              @show="popoverStatus = true"
              @hide="popoverStatus = false">
              <select-user v-if="popoverStatus"  @change="handleSelectUser"></select-user>
              <el-input
                class="select-user-trigger"
                slot="reference"
                disabled
                v-model="currentUser.name"
                placeholder="请选择客户">
                <i :class="`el-icon-caret-${popoverStatus ? 'top' : 'bottom'}`" slot="suffix"></i>
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="currentUser.age" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" prop="gender">
            <el-radio v-model="currentUser.gender" :label="2" disabled>女</el-radio>
            <el-radio v-model="currentUser.gender" :label="1" disabled>男</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="人员类别" prop="customerType">
            <el-input v-model="currentUser.gridName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="main-info-title">就医信息</div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="医疗机构" prop="hospital">
            <el-input v-model="form.hospital" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="就诊科室" prop="department">
            <el-input v-model="form.department" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="就医类型" prop="medicalType">
            <el-select v-model="form.medicalType" placeholder="请选择就医类型">
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
          <el-form-item label="就医卡号" prop="patientNo">
            <el-input v-model="form.patientNo" placeholder="请输入" @input="replace"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="就医时间" prop="inDate">
            <el-date-picker
              v-model="form.inDate"
              type="date"
              placeholder="请选择就医时间"
              value-format="yyyy-MM-dd"
              :picker-options="options.inDate"
              @change="handleStartDateChange"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="出院时间" prop="outDate">
            <el-date-picker
              v-model="form.outDate"
              type="date"
              placeholder="请选择出院时间"
              value-format="yyyy-MM-dd"
              :picker-options="options.outDate"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主管医生" prop="doctorName">
            <el-input v-model="form.doctorName" placeholder="请输入"></el-input>
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
        <el-col :span="6">
          <el-form-item label="主诉" prop="complaint">
            <el-input v-model="form.complaint" placeholder="请输入" :maxlength="300"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="现病史" prop="hpi">
            <el-input v-model="form.hpi" placeholder="请输入" :maxlength="300"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="检查" prop="examination">
            <el-input v-model="form.examination" placeholder="请输入" :maxlength="300"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="诊断" prop="diagnosis">
            <el-input v-model="form.diagnosis" placeholder="请输入" :maxlength="300"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="治疗方案" prop="therapy">
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
      <div class="form-buttons">
        <el-button plain @click="$emit('cancel')" size="small">取消</el-button>
        <el-button type="primary" @click="submit" size="small">保存</el-button>
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
        clientInfoId: '',
        hospital: '',
        department: '',
        medicalType: '',
        patientNo: '',
        inDate: '',
        outDate: '',
        doctorName: '',
        result: '',
        complaint: '',
        hpi: '',
        examination: '',
        diagnosis: '',
        therapy: '',
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
            // eslint-disable-next-line no-underscore-dangle
            const _now = this.form.inDate
              ? dayjs(this.form.inDate).format('YYYY-MM-DD')
              : dayjs(new Date()).format('YYYY-MM-DD');
            // eslint-disable-next-line no-underscore-dangle
            const _cur = dayjs(cur);
            if (_cur.isSameOrAfter(_now)) {
              return false;
            }
            return true;
          },
        },
      },
      rules: {
        clientInfoId: [{ required: true, message: '客户不能为空' }],
        medicalType: [{ required: true, message: '就医类型不能为空' }],
        hospital: [{ required: true, message: '医疗机构不能为空' }],
        inDate: [{ required: true, message: '就医时间不能为空' }],
        result: [{ required: true, message: '当前状态不能为空' }],
        hpi: [{ required: true, message: '现病史不能为空' }],
        diagnosis: [{ required: true, message: '诊断不能为空' }],
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
    };
  },
  mounted() {
    if (this.id) {
      this.$api.medicalHistoryInterface.medicalInfoDetail(this.id).then((res) => {
        const { data } = res;
        this.form = Object.assign(this.form, data.data || {});
        this.currentUser = {
          id: this.form.clientInfoId,
          name: this.form.clientName,
          age: this.form.age,
          gender: this.form.gender,
          gridName: this.form.clientGridName,
        };
      });
    }
  },
  methods: {
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
            clientInfoId: this.form.clientInfoId,
            medicalType: this.form.medicalType,
            hospital: this.form.hospital,
            patientNo: this.form.patientNo,
            inDate: this.form.inDate,
            outDate: this.form.outDate,
            doctorName: this.form.doctorName,
            department: this.form.department,
            result: this.form.result,
            complaint: this.form.complaint,
            examination: this.form.examination,
            diagnosis: this.form.diagnosis,
            therapy: this.form.therapy,
            hpi: this.form.hpi,
          };
          if (this.id) {
            params.id = this.id;
          }
          this.$api.medicalHistoryInterface.medicalInfo(params).then((res) => {
            const { data } = res;
            if (data.code === 200) {
              this.$message.success('操作成功');
              this.$emit('afterSubmit');
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.medical-history-form {
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
      background: #F4F4F6 !important;
    }
  }
  /deep/ input, /deep/ textarea {
    border: none;
    background: #F4F4F6;
    border-radius: 5px;
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
</style>
