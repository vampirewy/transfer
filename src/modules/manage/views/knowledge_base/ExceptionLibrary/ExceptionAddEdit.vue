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
      <div class="form-title">
        <div class="line"></div>
        <h3 class="name"><span v-if="ids">编辑</span><span v-else>新增</span>异常库</h3>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="异常名称" prop="clientInfoId">
            <el-input v-model="form.clientInfoId" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="异常类型" prop="hospital">
            <el-select v-model="form.hospital" placeholder="请选择当前状态" width="150">
              <el-option
                v-for="item in organTypeList"
                :key="item.paramValue"
                :label="item.name"
                :value="item.paramValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别限制" >
            <el-select v-model="form.gender" placeholder="请选择当前状态">
              <el-option label="不限" :value="0" key="0"></el-option>
              <el-option label="男" :value="1" key="1"></el-option>
              <el-option label="女" :value="2" key="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="ICD10" >
            <el-input v-model="form.medicalType" placeholder="请输入"></el-input>
          </el-form-item>
          <!-- <el-form-item label="ICD10：" >
            <el-select v-model="form.medicalType" placeholder="请选择当前状态">
              <el-option
                v-for="item in resultOptions"
                :key="item.paramValue"
                :label="item.name"
                :value="item.paramValue"
              ></el-option>
            </el-select>
          </el-form-item> -->
        </el-col>
        <el-col :span="6">
          <el-form-item label="重要性"  prop="inDate">
            <el-select v-model="form.inDate" placeholder="请选择当前状态">
              <el-option
                v-for="item in dangerLevelList"
                :key="item.paramValue"
                :label="item.name"
                :value="item.paramValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="紧急性" prop="outDate">
            <el-select v-model="form.outDate" placeholder="请选择当前状态">
              <el-option
                v-for="item in medicalLimitList"
                :key="item.paramValue"
                :label="item.name"
                :value="item.paramValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="推荐科室" prop="doctorNameId">
            <el-input v-model="form.recommendDepartmentName" placeholder="请输入" ></el-input>
          </el-form-item>
          <!-- <el-form-item label="推荐科室" >
            <el-select v-model="doctorNameId" placeholder="请选择当前状态">
              <el-option
                v-for="item in doctorName"
                :key="item"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
            <el-select
                v-model="value"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item> -->
        </el-col>
        <el-col :span="6">
          <el-form-item label="推荐检查" >
            <el-input v-model="form.RecommendInspectsId" placeholder="请输入" ></el-input>
          </el-form-item>
          <!-- <el-form-item label="推荐检查" >
            <el-select v-model="RecommendInspectsId" placeholder="请选择当前状态">
              <el-option
                v-for="item in RecommendInspects"
                :key="item"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item> -->
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="检查" prop="examination">
            <el-input v-model="form.examination" placeholder="请输入" :maxlength="300"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="诊断" prop="diagnosis">
            <el-input v-model="form.diagnosis" placeholder="请输入" :maxlength="300"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="24">
          <el-form-item label="解释" >
            <el-input
              type="textarea"
              v-model="form.interpret"
              :rows="5"
              placeholder="请输入"
              :maxlength="1000"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="原因">
            <el-input
              type="textarea"
              v-model="form.Reason"
              :rows="5"
              placeholder="请输入"
              :maxlength="1000"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="建议" >
            <el-input
              type="textarea"
              v-model="form.Suggestion"
              :rows="5"
              placeholder="请输入"
              :maxlength="1000"
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
// import SelectUser from '../medical_history_select_user.vue';
import * as dayjs from 'dayjs';
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);

export default {
  name: 'MedicalHistoryForm',
  components: {
    // SelectUser,
  },
  // props: {
  //   detail: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   id: {
  //     type: [String, Number],
  //     required: false,
  //     default: '',
  //   },
  // },
  data() {
    return {
      popoverStatus: false,
      form: {
        clientInfoId: '', // 异常名称
        hospital: '', // 异常类型
        gender: '', // 性别限制
        medicalType: '', // ICD10：
        patientNo: '',
        inDate: '', // 重要性
        outDate: '', // 紧急性
        doctorNameId: '', // 推荐科室
        doctorName: [],
        result: '', // 推荐检查
        interpret: '', // 解释
        Reason: '', // 原因
        Suggestion: '', // 建议
        RecommendInspects: [], // 推荐检查
        RecommendInspectsId: '',
      },
      organTypeList: [],
      dangerLevelList: [],
      medicalLimitList: [],
      optionss: {
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
        clientInfoId: [{ required: true, message: '异常名称不能为空' }],
        hospital: [{ required: true, message: '请选择异常类型' }],
        inDate: [{ required: true, message: '请选择重要性' }],
        outDate: [{ required: true, message: '请选择紧急性' }],
        doctorNameId: [{ required: true, message: '推荐科室不能为空' }],
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
      ids: this.$route.params.id,
      options: [],
      value: [],
      list: [],
      loading: false,
      states: ['Alabama', 'Alaska'],
    };
  },
  mounted() {
    this.getOrganTypeList();
    this.getImportList();
    this.getQuickList();
    this.listRecommendDepartment();
    this.listRecommendInspect();
    console.log(this.ids, 'qqqqqqq');
    if (this.ids) {
      this.getDetail();
    }
  },
  methods: {
    async getDetail() {
      const reqBody = { id: this.ids };
      const res = await this.$api.unusualListInterface.getOrganAbnormal(
        reqBody,
      );
      const { data } = res.data;
      this.form.clientInfoId = data.abnormalName;
      this.form.hospital = data.abnormalType;
      this.form.gender = data.gender;
      this.form.medicalType = data.icdCode;
      this.form.inDate = data.dangerLevel;
      this.form.outDate = data.medicalLimit;
      this.form.doctorNameId = data.recommendDepartmentName;
      this.form.RecommendInspectsId = data.recommendInspectName;
      this.form.interpret = data.medicalExplain;
      this.form.Reason = data.commonCause;
      this.form.Suggestion = data.advice;
      this.form.recommendDepartmentName = data.recommendDepartmentName;
      this.form.recommendInspectName = data.recommendInspectName;
      // this.form.abnormalAlias = data.abnormalAlias.map(it => ({ name: it }));
      // this.list = this.states.map(item => ({ value: `value:${item}`, label: `label:${item}` }));
      // console.log(this.list, '123123');
    },
    async listRecommendInspect() {
      const { data } = await this.$api.unusualListInterface.RecommendInspect();
      this.$set(this.form, 'RecommendInspects', data.data);
      this.RecommendInspects = data.data;
    },
    async listRecommendDepartment() {
      const { data } = await this.$api.unusualListInterface.RecommendDepartment();
      this.$set(this.form, 'doctorName', data.data);
      this.doctorName = data.data;
      // this.form.organTypeList
    },
    async getOrganTypeList() {
      const { data } = await this.$api.unusualListInterface.getOrganTypeList();
      this.$set(this.form, 'organTypeList', data.data);
      this.organTypeList = data.data;
      // this.form.organTypeList
    },

    async getImportList() {
      const { data } = await this.$api.unusualListInterface.getImportList();
      this.$set(this.form, 'dangerLevelList', data.data);
      this.dangerLevelList = data.data;
      // this.form.organTypeList
    },
    async getQuickList() {
      const { data } = await this.$api.unusualListInterface.getQuickList();
      this.$set(this.form, 'medicalLimitList', data.data);
      this.medicalLimitList = data.data;
      // this.form.organTypeList
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item =>
            item.label.toLowerCase().indexOf(query.toLowerCase()) > -1,
          );
        }, 200);
      } else {
        this.options = [];
      }
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
            abnormalName: this.form.clientInfoId,
            abnormalType: this.form.hospital,
            gender: this.form.gender,
            dangerLevel: this.form.inDate,
            medicalLimit: this.form.outDate,
            medicalExplain: this.form.interpret,
            commonCause: this.form.Reason,
            advice: this.form.Suggestion,
            abnormalAlias: [this.form.clientInfoId],
            recommendInspectName: this.form.RecommendInspectsId,
            recommendDepartmentName: this.form.doctorNameId,
            icdCode: this.form.medicalType,
          };
          if (this.ids) {
            params.id = this.id;
          }
          if (this.ids) {
            const reqBody = { id: this.ids };
            this.$api.unusualListInterface.updateOrganAbnormal(reqBody, params).then((res) => {
              const { data } = res;
              if (data.success) {
                this.$message.success('操作成功');
                this.$emit('afterSubmit');
                this.$router.go(-1);
              }
            });
          } else {
            this.$api.unusualListInterface.saveOrganAbnormal(params).then((res) => {
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
  .form-title {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 20px;
    margin-bottom: 20px;
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
          // content: url('../../../../assets/images/common/arrow.png');
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
      /* color: #333 !important;
      background: #F4F4F6 !important;*/
    }
  }
  /deep/ input, /deep/ textarea {
    // border: none;
    // background: #F4F4F6;
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
