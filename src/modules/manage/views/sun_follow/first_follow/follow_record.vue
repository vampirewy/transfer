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
          <el-form-item label="客户姓名：" >
            <span>{{form.name | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" >
            <span>{{form.gender | getResultGender}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="体检编号：" >
            <span>{{form.clientNo | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户年龄：" >
            <span>{{form.age | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号：" >
            <span>{{form.mobile | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目名称：" >
            <span>{{form.projectName | getResult}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目结果：" >
            <span :class="form.resultLevel === 1 ? 'warnRed' : 'warnYellow'">
              {{form.result | getResult}}</span>
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
          <el-row>
            <el-col :span="6">
              <el-form-item label="跟踪时间：" >
                <span>2021-04-21 14:00</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="跟踪方式：" >
                <span>电话</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="跟踪人员：" >
                <span>陈良</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="短信通知：" >
                <span>是</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="跟踪结果：" >
                <span>患者各项指标均已超出正常值，请注意观察，继续跟踪回访</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="跟踪记录：" >
                <span>已跟踪，继续跟踪回访</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="短信记录：" >
                <span>您的各项指标均已超出正常值，请留意生活不能吃高糖高脂肪食物</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
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
      form: { id: '1',
        clientNo: '2021015898745',
        name: '吴白',
        gender: 1,
        mobile: '15899856354',
        age: 30,
        projectName: '肺部CT',
        result: '疑似肺癌',
        resultLevel: 1,
        subjectName: '内科',
        doctor: '陈良',
        createdTime: '2021-04-27 14：00',
        receiveName: '郑西',
        receiveTime: '2021-04-29 19：20',
        zongName: '否',
      },
      tabbor: ['首次上报', '2021-04-21', '2021-04-15'],
      Tabactive: 0,
      tabIndex: 0,
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
      ids: this.$route.query.id,
    };
  },
  mounted() {
    if (this.ids) {
      this.$api.medicalHistoryInterface.medicalInfoDetail(this.ids).then((res) => {
        const { data } = res;
        console.log(data, '撒打算大的');
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
    TabbarBtn(index) {
      this.Tabactive = index;
      // this.$emit('messageData', index, this.tabIndex);
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
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-bottom: solid 1px #EEF1F5;
  }
  .TabBarsNames:after{
    content: '';
    display: block;
    width: 21px;
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
    width: 21px;
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
