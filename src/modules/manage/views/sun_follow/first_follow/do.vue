<template>
  <div class="medical-history-form">
    <el-row style="display:flex;">
      <el-col :span="11" style="padding-right: 20px;border-right: 2px solid #F6F8FC">
        <client-info></client-info>
          <div>
            <div class="TabBars">
              <div v-for="(item,index) in tabbor" :key="index">
          <span :class="Tabactive === index?'TabBarsName':'TabBarsNames'" @click="TabbarBtn(index)">
              {{item}}
            </span>
              </div>
            </div>
            <div class="interventionCon">
              <follow-record v-if="Tabactive === 0"
                             @getNextTrackingTip="getNextTrackingTip"></follow-record>
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
        <follow-content @getTable="getFollowContent"></follow-content>
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
                        v-model="form.trackingDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="跟踪人员" prop="trackingUserName">
                <el-input
                        type="text"
                        disabled
                        placeholder="请输入"
                        v-model="form.trackingUserName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="跟踪方式">
                <el-select v-model="form.trackingWay" placeholder="请选择">
                  <el-option :label="it.name" :value="it.id" :key="it.id"
                             v-for="it in planWayList">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="$route.params.sourceType === '2'">
            <el-col :span="24">
              <el-form-item label="跟踪提示">
                {{nextTrackingTip | getResult}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="跟踪记录" prop="trackingRemark">
                <el-input
                        type="textarea"
                        v-model="form.trackingRemark"
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
                <el-radio-group v-model="form.isSendMsg">
                  <el-radio :label="1">发送</el-radio>
                  <el-radio :label="2">不发送</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="短信小结">
                <el-input
                        type="textarea"
                        v-model="form.messageContent"
                        :rows="4"
                        placeholder="请输入"
                        :maxlength="300"
                        show-word-limit
                        style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="allIsCloseCaseShow">
          <div class="divRightTitleDiv">
            <div class="divRightTitle" style="margin-top: 15px">下次跟踪回访计划
              <div class="titleBiao"></div></div>
          </div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="回访时间">
                <el-select
                        v-model="form.nextTrackingDay"
                        placeholder="请选择"
                        @change="changeAfterDay"
                >
                  <el-option v-for="item in nextTrackingDayList"
                             :label="item.name" :value="item.value" :key="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对应日期">
                <el-date-picker
                        style="width: 100%"
                        v-model="form.nextTrackingDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :min-date="new Date()"
                        placeholder="请选择">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="回访方式">
                <el-select v-model="form.nextTrackingWay" placeholder="请选择">
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
                        v-model="form.nextTrackingTip"
                        :rows="4"
                        placeholder="请输入"
                        :maxlength="300"
                        show-word-limit
                        style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
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
  data() {
    return {
      popoverStatus: false,
      form: {
        clientId: this.$route.params.clientId,
        trackingDate: dayjs(new Date()).format('YYYY-MM-DD'),
        trackingUserId: '',
        trackingUserName: '',
        trackingWay: '',
        trackingRemark: '',
        isSendMsg: 2,
        messageContent: '',
        nextTrackingDay: '',
        nextTrackingDate: '', // dayjs(new Date(new Date().getTime() + (8.64e7 * 10))).format('YYYY-MM-DD'),
        nextTrackingWay: '',
        nextTrackingTip: '',
        contentSaveRequests: [],
      },
      nextTrackingTip: '', // 下次回访的提示 取记录里面最后一条的提示
      allIsCloseCaseShow: false, // 是否全部都结案，全部结案的不下次回访
      contentSaveRequestsList: [],
      planWayList: [],
      tabbor: ['跟踪记录', '体检信息', '历史阳性'], // , '就诊记录'
      Tabactive: 0,
      tabIndex: 0,
      reportLv: '', // 判断回访方式是红色/橙色为主
      nextTrackingDayList: [],
    };
  },
  mounted() {
    this.getUserInfo();
    this.getPlanWayList();
  },
  methods: {
    changeAfterDay(val) {
      this.form.nextTrackingDate = dayjs(new Date(new Date().getTime() + (8.64e7 * val))).format('YYYY-MM-DD');
    },
    async getFollowDayWayDetail() {
      const res = await this.$api.userManagerInterface.getTrackingConfigDetail(1);
      const { data } = res.data;
      if (this.reportLv === 1) {
        this.form.trackingWay = this.form.nextTrackingWay = data.redLvWay;
        this.nextTrackingDayList = [{ name: `${data.redLvDay}天后`, value: data.redLvDay }];
        this.form.nextTrackingDay = data.redLvDay;
      } else if (this.reportLv === 2) {
        this.form.trackingWay = this.form.nextTrackingWay = data.orangeLvWay;
        this.nextTrackingDayList = [{ name: `${data.orangeLvDay}天后`, value: data.orangeLvDay }];
        this.form.nextTrackingDay = data.orangeLvDay;
      }
      this.changeAfterDay(this.form.nextTrackingDay);
    },
    async getUserInfo() {
      const res = await this.$api.userManagerInterface.getUserInfo();
      const { data } = res.data;
      this.form.trackingUserId = data.userId;
      this.form.trackingUserName = data.realName;
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
      this.getFollowDayWayDetail(); // 获取到方式列表后再请求，防止闪显
    },
    getNextTrackingTip(val) {
      this.nextTrackingTip = val;
    },
    getFollowContent(list) {
      console.log(list);
      this.contentSaveRequestsList = list;
      let allIsCloseCase = false;
      let reportLv = 2; // 默认橙色
      list.forEach((val) => {
        if (val.isCloseCase === 2) { // 1 已结案 2 未结案。  如果有未结案的就展示
          allIsCloseCase = true;
        }
        if (val.reportLv === 1) {
          reportLv = 1;
        }
      });
      this.allIsCloseCaseShow = allIsCloseCase;
      this.reportLv = reportLv; // 设置回访方式以红色/橙色为主
    },
    TabbarBtn(index) {
      this.Tabactive = index;
      // this.$emit('messageData', index, this.tabIndex);
    },
    goBack() {
      this.$router.go(-1);
    },
    submit() {
      console.log(dayjs(new Date()).format('YYYY-MM-DD'));
      const sendData = Object.assign({}, this.form);
      sendData.contentSaveRequests = [];
      let valid = true;
      this.contentSaveRequestsList.forEach((val) => {
        if (val.nextTrackingDate === dayjs(new Date()).format('YYYY-MM-DD') && val.state === '') {
          this.$message.warning('请选择今日跟踪计划的跟踪结果');
          valid = false;
          return;
        }
        sendData.contentSaveRequests.push({
          positiveTrackingId: val.id,
          isCloseCase: val.isCloseCase,
          state: val.state || 1,
        });
      });
      if (!valid) { // 如果验证未通过
        return;
      }
      console.log(this.contentSaveRequestsList);
      sendData.trackingDate = `${sendData.trackingDate.split(' ')[0]} 00:00:00`;
      sendData.nextTrackingDate = `${sendData.nextTrackingDate.split(' ')[0]} 00:00:00`;
      if (this.allIsCloseCaseShow === false) { // 如果都结案
        sendData.nextTrackingDay = '';
        sendData.nextTrackingDate = '';
      }
      this.$api.sunFollow.savePositiveReturn(sendData).then(() => {
        this.$message.success('操作成功');
        if (this.$route.params.sourceType === '1') {
          this.$router.push({
            path: '/first_follow',
          });
        } else if (this.$route.params.sourceType === '2') {
          this.$router.push({
            path: '/follow_task',
          });
        }
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
    height: 37px;
    line-height: 38px;
    text-align: center;
    border-bottom: solid 1px #EEF1F5;
  }
  .TabBarsNames:after{
    content: '';
    display: block;
    width: 16px;
    height: 37px;
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
    height: 37px;
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
    height: 37px;
    line-height: 37px;
    text-align: center;
    border-top: solid 1px #DDE0E6;
  }
  .TabBarsName:after{
    content: '';
    display: block;
    width: 16px;
    height: 37px;
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
    height: 37px;
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
