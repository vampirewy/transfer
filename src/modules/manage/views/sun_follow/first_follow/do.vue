<template>
  <div class="medical-history-form">
    <el-row style="display:flex;">
      <el-col :span="11" style="padding-right: 20px;border-right: 2px solid #F6F8FC">
        <client-info :info="clientInfoObj"></client-info>
          <div>
            <div class="TabBars">
              <div v-for="(item,index) in tabbor" :key="index">
          <span :class="Tabactive === index?'TabBarsName':'TabBarsNames'" @click="TabbarBtn(index)">
              {{item}}
            </span>
              </div>
            </div>
            <div class="interventionCon">
              <follow-record v-if="Tabactive === 0"></follow-record>
              <physical-info v-if="Tabactive === 1"></physical-info>
              <sun-record v-if="Tabactive === 2"></sun-record>
              <medical-record v-if="Tabactive === 3"></medical-record>
            </div>
          </div>
      </el-col>
      <el-col :span="13" style="padding-left: 20px">
        <div class="divRightTitleDiv">
          <div class="divRightTitle" style="margin-top: 0">跟踪内容
            <div class="titleBiao"></div></div>
        </div>
        <follow-content></follow-content>
        <el-form
                :model="form"
                ref="staffForm"
                label-width="90px"
                label-suffix="："
        >
          <div class="divRightTitleDiv">
            <div class="divRightTitle" style="margin-top: 15px">跟踪结果
              <div class="titleBiao"></div></div>
          </div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="跟踪时间">
                <el-date-picker
                        style="width: 100%"
                        v-model="form.createdTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="跟踪人员" prop="realName">
                <el-input
                        type="text"
                        placeholder="请输入"
                        v-model="form.realName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="跟踪方式">
                <el-select v-model="form.planWay" placeholder="请选择">
                  <el-option :label="it.name" :value="it.id" :key="it.id"
                             v-for="it in planWayList">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="跟踪记录" prop="desc">
                <el-input
                        type="textarea"
                        v-model="form.desc"
                        :rows="4"
                        placeholder="请输入"
                        :maxlength="300"
                        show-word-limit
                        style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="发送短信">
                <el-radio-group v-model="form.postSms">
                  <el-radio :label="0">发送</el-radio>
                  <el-radio :label="1">不发送</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="短信小结">
                <el-input
                        type="textarea"
                        v-model="form.smsDesc"
                        :rows="4"
                        placeholder="请输入"
                        :maxlength="300"
                        show-word-limit
                        style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="divRightTitleDiv">
            <div class="divRightTitle" style="margin-top: 15px">下次跟踪回访计划
              <div class="titleBiao"></div></div>
          </div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="回访时间">
                <el-select
                        v-model="form.afterDay"
                        placeholder="请选择"
                        @change="changeAfterDay"
                >
                  <el-option label="10天后" :value="10" key="10"></el-option>
                  <el-option label="15天后" :value="15" key="15"></el-option>
                  <el-option label="30天后" :value="30" key="30"></el-option>
                  <el-option label="45天后" :value="45" key="45"></el-option>
                  <el-option label="60天后" :value="60" key="60"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对应日期">
                <el-date-picker
                        style="width: 100%"
                        v-model="form.nextFollowTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="回访方式">
                <el-select v-model="form.followWay" placeholder="请选择">
                  <el-option :label="it.name" :value="it.id" :key="it.id"
                             v-for="it in planWayList">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="回访提示">
                <el-input
                        type="textarea"
                        v-model="form.followDesc"
                        :rows="4"
                        placeholder="请输入"
                        :maxlength="300"
                        show-word-limit
                        style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="handle-btn">
          <el-button class="reset-btn" size="small" @click="goBack">返回</el-button>
          <el-button size="small" class="sureBtn" type="primary" @click="submit">保存</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import SelectUser from '../medical_history_select_user.vue';
import clientInfo from './el-modal/client_info.vue';
import followContent from './el-modal/follow_content.vue';
import followRecord from './el-modal/follow_record.vue';
import physicalInfo from './el-modal/physical_info.vue';
import sunRecord from './el-modal/sun_record.vue';
import medicalRecord from './el-modal/medical_record.vue';
import * as dayjs from 'dayjs';
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);

export default {
  name: 'MedicalHistoryForm',
  components: {
    clientInfo,
    followContent,
    followRecord,
    physicalInfo,
    sunRecord,
    medicalRecord,
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
      clientInfoObj: {
        clientNo: '2021015898745',
        name: '吴白',
        age: 30,
        gender: 1,
        mobile: '15899856354',
        workUnitName: '杭州仅一科技有限公司',
      },
      form: {
        id: '',
        clientNo: '',
        name: '',
        gender: '',
        mobile: '',
        age: '',
        projectName: '',
        result: '',
        resultLevel: '',
        subjectName: '',
        doctor: '',
        createdTime: new Date(),
        receiveName: '',
        receiveTime: '',
        zongName: '',
        postSms: 1,
        smsDesc: '',
        afterDay: 10,
        nextFollowTime: new Date(new Date().getTime() + (8.64e7 * 7)),
        followWay: '',
        followDesc: '',
      },
      planWayList: [],
      tabbor: ['跟踪记录', '体检信息', '历史阳性', '就诊记录'],
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
    this.getPlanWayList();
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
    changeAfterDay(val) {
      this.form.nextFollowTime = new Date(new Date().getTime() + (8.64e7 * val));
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
      // list.unshift({ name: '全部', value: '' });
      this.planWayList = list;
    },
    TabbarBtn(index) {
      this.Tabactive = index;
      // this.$emit('messageData', index, this.tabIndex);
    },
    goBack() {
      this.$router.go(-1);
    },
    submit() {
      this.$message.success('操作成功');
      this.$router.push({
        path: '/first_follow',
      });
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
      /*color: #333 !important;
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
    margin-top: 15px;
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
    font-size: 12px;
    border-radius: 8px 8px 0 0;
    display: block;
    width: 72px;
    height: 36px;
    line-height: 38px;
    text-align: center;
    border-bottom: solid 1px #EEF1F5;
  }
  .TabBarsNames:after{
    content: '';
    display: block;
    width: 16px;
    height: 36px;
    position: absolute;
    -webkit-transform: skewX(23deg);
    transform: skewX(23deg);
    background: #EEF1F5;
    border-top-right-radius: 8px;
    top: 0px;
    right: -8px;
    border-bottom: solid 1px #EEF1F5;
  }
  .TabBarsNames:before {
    content: '';
    display: block;
    width: 12px;
    height: 36px;
    position: absolute;
    -webkit-transform: skewX(165deg);
    transform: skewX(163deg);
    background: #EEF1F5;
    border-top-left-radius: 8px;
    top: 0px;
    left: -6px;
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
    font-size: 13px;
    border-radius: 8px 8px 0 0;
    display: block;
    width: 72px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-top: solid 1px #DDE0E6;
  }
  .TabBarsName:after{
    content: '';
    display: block;
    width: 16px;
    height: 36px;
    position: absolute;
    -webkit-transform: skewX(23deg);
    transform: skewX(23deg);
    background: white;
    border-top-right-radius: 8px;
    top: 0px;
    right: -8px;
    border-right: solid 1px #DDE0E6;
  }
  .TabBarsName:before {
    content: '';
    display: block;
    width: 12px;
    height: 36px;
    position: absolute;
    -webkit-transform: skewX(165deg);
    transform: skewX(163deg);
    background: white;
    border-top-left-radius: 8px;
    top: 0px;
    left: -6px;
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
