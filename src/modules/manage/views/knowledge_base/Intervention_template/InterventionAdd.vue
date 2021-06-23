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
      <!-- <div class="basic-info-title">{{id ? '' : '新增'}}短信模版</div> -->
      <!-- <div class="line"></div>
      <div class="main-info-title">新增异常库</div> -->
      <div class="form-title">
        <div class="line"></div>
        <h3 class="name" v-if="!ids">新增-干预模版</h3>
        <h3 class="name" v-else>编辑-干预模版</h3>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="模版名称" >
            <el-input v-model="form.name" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="适用性别" >
            <el-select v-model="form.gender" placeholder="请选择当前状态">
              <el-option label="不限" value="0" key="0"></el-option>
              <el-option label="男" value="1" key="1"></el-option>
              <el-option label="女" value="2" key="2"></el-option>
              <!-- <el-option
                v-for="item in resultOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="条件关系" >
            <el-select v-model="form.conditionRelation" placeholder="请选择当前状态" width="150">
              <el-option label="全部" value="1" key="1"></el-option>
              <el-option label="任意" value="2" key="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="组别" >
            <el-input v-model="form.groupCode" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="级别" >
            <el-input v-model="form.lvCode" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div class="isEnabled">
            <span>是否启用：</span>
                <el-switch
                  v-model="form.state"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#13ce66"
                  @change=changeStatus()
                  >
                </el-switch>
          </div>
        </el-col>
      </el-row>
      <div class="form-title">
        <div class="line"></div>
        <h3 class="name">详细内容</h3>
      </div>
      <div>
        <div class="TabBars">
          <div v-for="(item,index) in tabbor" :key="index">
          <span :class="Tabactive === index?'TabBarsName':'TabBarsNames'" @click="TabbarBtn(index)">
              {{item}}
            </span>
          </div>
        </div>
        <div class="interventionCon">
          <div>
            <div>
              <minor-term :indexs="Tabactive"
              @change="TabReceiver"
              :TabTitle="TabTitle"
              :key="timer"
              :InterventionList="Intervention"
              ></minor-term>
            </div>
          </div>
          <!-- <div v-if="Tabactive === 1">
            <div>
              <minor-term :indexs="Tabactive" :TabTitle="TabTitle"></minor-term>
            </div>
          </div>
          <div v-if="Tabactive === 2">
            <div>
              <minor-term></minor-term>
            </div>
          </div>
          <div v-if="Tabactive === 3">
            <div>
              <minor-term></minor-term>
            </div>
          </div>
          <div v-if="Tabactive === 4">
            <div>
              <minor-term></minor-term>
            </div>
          </div>
          <div v-if="Tabactive === 5">
            <div>
              <minor-term></minor-term>
            </div>
          </div> -->
        </div>
      </div>
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
import minorTerm from './components/minorTerm.vue';

export default {
  name: 'MedicalHistoryForm',
  components: {
    // SelectUser,
    minorTerm,
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
        name: '',
        gender: '',
        conditionRelation: '1',
        groupCode: '',
        lvCode: '',
        state: 0,
      },
      timer: '',
      tabbor: ['小项', '人员类别', '异常', '组合异常', '疾病评估', '体质辨识'],
      tabborName: ['Minterm', 'Category', 'Exception', 'Composition', 'Disease', 'Constitution'],
      TabTitle: 'Minterm',
      Tabactive: 0,
      tabIndex: 0,
      Minterm: [], // 小项数据
      Category: [], // 人员类别
      Exception: [], // 异常
      Composition: [], // 组合异常
      Disease: [], // 疾病评估
      Constitution: [], // 体质辨识
      Intervention: [], // 传过去的数据
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
      ids: this.$route.params.id,
      // ids: 4,
    };
  },
  mounted() {
    if (this.ids) {
      this.$api.medicalHistoryInterface.updateInterveneTemplate(this.ids).then((res) => {
        const { data } = res;
        this.form.name = data.data.name;
        this.form.gender = String(data.data.gender);
        this.form.conditionRelation = String(data.data.conditionRelation);
        this.form.state = data.data.state;
        this.form.groupCode = data.data.groupCode;
        this.form.lvCode = data.data.lvCode;
        this.Minterm = data.data.interveneTemplateDetailItemDtoList;
        this.Category = data.data.interveneTemplateDetailGridDtoList;
        for (let i = 0; i < data.data.interveneTemplateDetailOrganAbnormalDtoList.length; i++) {
          const json = {
            abnormalTypeName: data.data.interveneTemplateDetailOrganAbnormalDtoList[i]
              .organAbnormalName,
            gender: data.data.interveneTemplateDetailOrganAbnormalDtoList[i].genderTxt,
            abnormalCode: data.data.interveneTemplateDetailOrganAbnormalDtoList[i]
              .organAbnormalCode,
            conditionRelation: data.data.interveneTemplateDetailOrganAbnormalDtoList[i]
              .conditionRelation,
          };
          this.Exception.push(json);
        }
        for (let i = 0; i < data.data.interveneTemplateDetailGroupAbnormalDtoList.length; i++) {
          const json = {
            name: data.data.interveneTemplateDetailGroupAbnormalDtoList[i]
              .groupAbnormalName,
            code: data.data.interveneTemplateDetailGroupAbnormalDtoList[i]
              .groupAbnormalCode,
            conditionRelation: data.data.interveneTemplateDetailGroupAbnormalDtoList[i]
              .conditionRelation,
          };
          this.Composition.push(json);
        }
        for (let i = 0; i < data.data.interveneTemplateDetailAssessDtoList.length; i++) {
          const json = {
            name: data.data.interveneTemplateDetailAssessDtoList[i]
              .modeAssessName,
            estates: String(data.data.interveneTemplateDetailAssessDtoList[i].modeAssessLv),
            code: data.data.interveneTemplateDetailAssessDtoList[i]
              .modeAssessCode,
            conditionRelation: data.data.interveneTemplateDetailAssessDtoList[i]
              .conditionRelation,
          };
          this.Disease.push(json);
        }
        for (let i = 0; i < data.data.interveneTemplateDetailTcmDtoList.length; i++) {
          const json = {
            name: data.data.interveneTemplateDetailTcmDtoList[i]
              .tizhiName,
            judgeResult: String(data.data.interveneTemplateDetailTcmDtoList[i].judgeResult),
            tizhiCode: data.data.interveneTemplateDetailTcmDtoList[i]
              .tizhiCode,
            conditionRelation: data.data.interveneTemplateDetailTcmDtoList[i]
              .conditionRelation,
          };
          this.Constitution.push(json);
        }
        this.TabbarBtn(0);
      });
    }
  },
  methods: {
    // 接收的数据
    TabReceiver(data, TabTitle) {
      if (TabTitle === 'Minterm') {
        this.Minterm = data;
      }
      if (TabTitle === 'Category') {
        this.Category = data;
      }
      if (TabTitle === 'Exception') {
        this.Exception = data;
      }
      if (TabTitle === 'Composition') {
        this.Composition = data;
      }
      if (TabTitle === 'Disease') {
        this.Disease = data;
      }
      if (TabTitle === 'Constitution') {
        this.Constitution = data;
      }
    },
    TabbarBtn(index) {
      this.Tabactive = index;
      this.TabTitle = this.tabborName[index];
      this.timer = new Date().getTime();
      this.Intervention = [];
      if (this.TabTitle === 'Minterm') {
        this.Intervention = this.Minterm;
      }
      if (this.TabTitle === 'Category') {
        this.Intervention = this.Category;
      }
      if (this.TabTitle === 'Exception') {
        this.Intervention = this.Exception;
      }
      if (this.TabTitle === 'Composition') {
        this.Intervention = this.Composition;
      }
      if (this.TabTitle === 'Disease') {
        this.Intervention = this.Disease;
      }
      if (this.TabTitle === 'Constitution') {
        this.Intervention = this.Constitution;
      }
      // this.$emit('messageData', index, this.tabIndex);
    },
    handleStartDateChange() {
      if (this.form.medicalType === 1 && this.form.inDate) {
        this.form.outDate = this.form.inDate;
      }
    },
    changeStatus() {
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
      if (!this.form.name) {
        return this.$message.warning('请填写模版名称');
      }
      if (!this.form.gender) {
        return this.$message.warning('请选择性别');
      }
      if (!this.form.conditionRelation) {
        return this.$message.warning('请填写条件关系');
      }
      if (!this.form.groupCode) {
        return this.$message.warning('请填写组别');
      }
      if (!this.form.lvCode) {
        return this.$message.warning('请填写级别');
      }
      const jsons = {
        interveneTemplateItemRequestList: [],
        interveneTemplateGridRequestList: [],
        interveneTemplateOrganAbnormalRequestList: [],
        interveneTemplateGroupAbnormalRequestList: [],
        interveneTemplateAssessRequestList: [],
        interveneTemplateTcmRequestList: [],
      };
      if (this.Minterm.length !== 0) {
        for (let i = 0; i < this.Minterm.length; i++) {
          const prms = {
            sectionName: this.Minterm[i].sectionName,
            itemName: this.Minterm[i].itemName,
            judgeRelation: this.Minterm[i].judgeRelation,
            itemValue: this.Minterm[i].itemValue,
            conditionRelation: this.Minterm[i].conditionRelation,
            minValue: this.Minterm[i].minValue,
            maxValue: this.Minterm[i].maxValue,
          };
          jsons.interveneTemplateItemRequestList.push(prms);
        }
      }
      if (this.Category.length !== 0) {
        for (let i = 0; i < this.Category.length; i++) {
          const prms = {
            gridId: this.Category[i].id,
          };
          jsons.interveneTemplateGridRequestList.push(prms);
        }
      }
      if (this.Exception.length !== 0) {
        for (let i = 0; i < this.Exception.length; i++) {
          const prms = {
            organAbnormalCode: this.Exception[i].abnormalCode,
            conditionRelation: this.Exception[i].conditionRelation,
          };
          jsons.interveneTemplateOrganAbnormalRequestList.push(prms);
        }
      }
      if (this.Composition.length !== 0) {
        for (let i = 0; i < this.Composition.length; i++) {
          const prms = {
            groupAbnormalCode: this.Composition[i].code,
            conditionRelation: this.Composition[i].conditionRelation,
          };
          jsons.interveneTemplateGroupAbnormalRequestList.push(prms);
        }
      }
      if (this.Disease.length !== 0) {
        for (let i = 0; i < this.Disease.length; i++) {
          const prms = {
            modeAssessCode: this.Disease[i].code,
            modeAssessLv: this.Disease[i].estates,
            conditionRelation: this.Disease[i].conditionRelation,
          };
          jsons.interveneTemplateAssessRequestList.push(prms);
        }
      }
      if (this.Constitution.length !== 0) {
        for (let i = 0; i < this.Constitution.length; i++) {
          const prms = {
            conditionRelation: this.Constitution[i].conditionRelation,
            judgeResult: this.Constitution[i].judgeResult,
            // name: this.Constitution[i].name,
            tizhiCode: this.Constitution[i].tizhiCode,
          };
          jsons.interveneTemplateTcmRequestList.push(prms);
        }
      }
      if (!this.ids) {
        this.$api.interventionTemplateInterface.saveInterveneTemplate(
          Object.assign(jsons, this.form),
        ).then((res) => {
          const { data } = res;
          if (data.success) {
            this.$message.success('操作成功');
            this.$emit('afterSubmit');
            this.$router.go(-1);
          }
        });
      } else {
        this.form.id = this.ids;
        this.$api.interventionTemplateInterface.updateInterveneTemplate(
          Object.assign(jsons, this.form),
        ).then((res) => {
          const { data } = res;
          if (data.success) {
            this.$message.success('操作成功');
            this.$emit('afterSubmit');
            this.$router.go(-1);
          }
        });
      }
    //   this.$refs.form.validate((valid) => {
    //     if (valid) {
    //       const params = {
    //         clientInfoId: this.form.clientInfoId,
    //         medicalType: this.form.medicalType,
    //         hospital: this.form.hospital,
    //         patientNo: this.form.patientNo,
    //         inDate: this.form.inDate,
    //         outDate: this.form.outDate,
    //         doctorName: this.form.doctorName,
    //         department: this.form.department,
    //         result: this.form.result,
    //         complaint: this.form.complaint,
    //         examination: this.form.examination,
    //         diagnosis: this.form.diagnosis,
    //         therapy: this.form.therapy,
    //         hpi: this.form.hpi,
    //         orgCode: this.form.orgCode,
    //         organId: this.form.organId,
    //       };
    //       if (this.id) {
    //         params.id = this.id;
    //       }
    //       this.$api.medicalHistoryInterface.medicalInfo(params).then((res) => {
    //         const { data } = res;
    //         if (data.success) {
    //           this.$message.success('操作成功');
    //           this.$emit('afterSubmit');
    //         }
    //       });
    //     }
    //   });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .row .el-form-item__label{
  margin-top: 10px;
}
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
  .isEnabled{
    font-size: 14px;
    color: #666666;
    margin: 10px 0 0 25px;
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
  .interventionCon{
    height: 430px;
    width: 100%;
    border: solid 1px #DDE0E6;
    border-radius: 0px 8px 8px 8px;
    margin-bottom: 20px;
    margin-top: -1px;
    overflow-y: scroll;
  }
    .TabBars{
    display: flex;
    margin-top: 20px;
    // background: #F6F8FC;
    width: 100%;
    margin-left: 10px;
    margin-left: 0px;
    overflow: hidden;
    padding-left: -5px;
    border-left: solid 1px #EEF1F5;
    border-top-left-radius: 11px;
   .TabBarsNames{
    cursor: pointer;
    background: #EEF1F5;
    border-color: transparent;
    color: #666666;
    position: relative;
    margin-right: 30px;
    // padding: 10px 14px 10px 16px;
    font-size: 14px;
    border-radius: 8px 5px 0 0;
    display: block;
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-bottom: solid 1px #EEF1F5;
  }
  .TabBarsNames:after{
    content: '';
    display: block;
    width: 25px;
    height: 36px;
    position: absolute;
    -webkit-transform: skewX(23deg);
    transform: skewX(23deg);
    background: #EEF1F5;
    border-top-right-radius: 8px;
    top: 0px;
    right: -13px;
    border-bottom: solid 1px #EEF1F5;
  }
  .TabBarsNames:before {
    content: '';
    display: block;
    width: 10px;
    height: 36px;
    position: absolute;
    -webkit-transform: skewX(165deg);
    transform: skewX(163deg);
    background: #EEF1F5;
    border-top-left-radius: 8px;
    top: 0px;
    left: -4px;
    border-bottom: solid 1px #EEF1F5;
}
  .TabBarsName{
    cursor: pointer;
    background: #ffffff;
    border-color: transparent;
    color: #333333;
    font-weight: 500;
    position: relative;
    margin-right: 26px;
    // padding: 10px 14px 10px 16px;
    font-size: 14px;
    border-radius: 8px 5px 0 0;
    display: block;
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-top: solid 1px #DDE0E6;
  }
  .TabBarsName:after{
    content: '';
    display: block;
    width: 25px;
    height: 36px;
    position: absolute;
    -webkit-transform: skewX(23deg);
    transform: skewX(23deg);
    background: white;
    border-top-right-radius: 8px;
    top: 0px;
    right: -10px;
    border-right: solid 1px #DDE0E6;
  }
  .TabBarsName:before {
    content: '';
    display: block;
    width: 10px;
    height: 36px;
    position: absolute;
    -webkit-transform: skewX(165deg);
    transform: skewX(163deg);
    background: white;
    border-top-left-radius: 8px;
    top: 0px;
    left: -4px;
    border-left: solid 1px #DDE0E6;
  }
  }
</style>
