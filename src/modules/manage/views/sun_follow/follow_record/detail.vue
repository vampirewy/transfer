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
      <div class="divRightTitleDiv">
        <div class="divRightTitle" style="margin-top: 0">查看-跟踪记录
          <div class="titleBiao"></div></div>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="客户姓名" >
            <span>{{form.name | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" >
            <span>{{form.gender | getResultGender}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户编号" >
            <span>{{form.clientNo | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户年龄" >
            <span>{{form.age | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号" >
            <span>{{form.mobile | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目名称" >
            <span>{{form.itemName | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目结果" >
            <span :class="form.reportLv === 1 ? 'warnRed' : 'warnYellow'">
              {{form.itemValue | getResult}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="divRightTitleDiv">
        <div class="divRightTitle" style="margin-top: 0">记录
          <div class="titleBiao"></div></div>
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
          <el-row v-if="Tabactive === 0">
            <el-col :span="6">
              <el-form-item label="上报时间" >
                <span>{{reportForm.reportDate}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="上报科室" >
                <span>{{reportForm.reportDepartment}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="上报医生" >
                <span>{{reportForm.reportUserName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="上报备注" >
                <span>{{reportForm.remark}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col :span="6">
              <el-form-item label="跟踪时间" >
                <span>{{trackingList[Tabactive - 1].trackingDate.split(' ')[0]}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="跟踪方式" >
                <span>{{trackingList[Tabactive - 1].trackingWayName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="跟踪人员" >
                <span>{{trackingList[Tabactive - 1].trackingUserName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="短信通知" >
                <span>{{trackingList[Tabactive - 1].isSendMsg === 1 ? '是' : '否'}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="跟踪记录" >
                <span>{{trackingList[Tabactive - 1].trackingRemark}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="短信小结" >
                <span>{{trackingList[Tabactive - 1].messageRecordContent}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- <div class="form-buttons">
        <el-button plain @click="$emit('cancel')" size="small">取消</el-button>
        <el-button type="primary" @click="submit" size="small">保存</el-button>
      </div> -->
       <div class="handle-btn mt30 mb30">
        <el-button class="reset-btn" size="small" @click="goBack"
          >返回</el-button>
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
      isstate: true,
      form: {
        clientNo: '',
        name: '',
        gender: '',
        mobile: '',
        age: '',
        itemName: JSON.parse(localStorage.getItem('positiveTrackingDetail')).itemName,
        itemValue: JSON.parse(localStorage.getItem('positiveTrackingDetail')).itemValue,
        reportLv: JSON.parse(localStorage.getItem('positiveTrackingDetail')).reportLv,
      },
      reportForm: {},
      trackingList: [],
      planWayList: [],
      tabbor: [],
      Tabactive: 0,
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
      currentUser: {},
      ids: this.$route.query.id,
    };
  },
  mounted() {
    this.getClientUserInfo(this.$route.params.clientId);
    this.getPlanWayList();
    this.$api.sunFollow.getItemTrackingRecordList({
      clientId: this.$route.params.clientId,
      positiveTrackingId: this.$route.params.positiveTrackingId }).then((res) => {
      const { data } = res;
      console.log(data);
      this.tabbor = [];
      data.data.forEach((val) => {
        val.trackingWayName = this.planWayList.find(t => t.id === val.trackingWay).name;
        this.tabbor.push(val.trackingDate.split(' ')[0]);
        this.trackingList.push(val);
      });
      if (this.tabbor.length > 0) {
        this.tabbor.unshift('首次上报');
      }
      this.reportForm = {
        reportDate: data.data[0].reportDate,
        reportDepartment: data.data[0].reportDepartment,
        reportUserName: data.data[0].reportUserName,
        remark: data.data[0].remark,
      };
    });
  },
  methods: {
    TabbarBtn(index) {
      this.Tabactive = index;
    },
    getClientUserInfo(id) {
      this.$api.userManagerInterface.getDetail(id).then(({ data }) => {
        this.form.clientNo = data.data.clientNo;
        this.form.name = data.data.name;
        this.form.gender = data.data.gender;
        this.form.mobile = data.data.mobile;
        this.form.age = data.data.age;
      });
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
      this.planWayList = list;
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
            orgCode: this.form.orgCode,
            organId: this.form.organId,
          };
          if (this.id) {
            params.id = this.id;
          }
          this.$api.medicalHistoryInterface.medicalInfo(params).then((res) => {
            const { data } = res;
            if (data.success) {
              this.$message.success('操作成功');
              this.$emit('afterSubmit');
            }
          });
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
  /deep/ .el-form-item{
    margin-bottom: 10px;
  }
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
    min-height: 200px;
    width: 100%;
    border-top: solid 1px #DDE0E6;
    margin-bottom: 20px;
    padding-top: 25px;
  }
    .TabBars{
    display: flex;
    margin-top: 20px;
    // background: #F6F8FC;
    width: 100%;
    margin-left: 0px;
    overflow: hidden;
    padding-left: -5px;
    border-left: solid 1px #DDE0E6;
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
    height: 37px;
    line-height: 37px;
    text-align: center;
    border-bottom: solid 1px #EEF1F5;
  }
  .TabBarsNames:after{
    content: '';
    display: block;
    width: 21px;
    height: 37px;
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
    height: 37px;
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
    height: 37px;
    line-height: 37px;
    text-align: center;
    border-top: solid 1px #DDE0E6;
  }
  .TabBarsName:after{
    content: '';
    display: block;
    width: 21px;
    height: 37px;
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
    height: 37px;
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
.warnRed{
  border: 1px solid #F33D21;
  border-radius: 50px;color: #F33D21;
  font-size: 12px;
  padding: 5px 12px;
}
.warnYellow{
  border: 1px solid #FA912B;
  border-radius: 50px;color: #FA912B;
  font-size: 12px;
  padding: 5px 12px;
}
</style>
