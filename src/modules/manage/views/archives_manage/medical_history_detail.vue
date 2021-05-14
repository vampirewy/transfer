<template>
  <el-dialog
    :modal-append-to-body="false"
    title="查看"
    :visible="true"
    width="570px"
    :before-close="() => $emit('close')">
    <div class="medical-history-detail-content">
      <div class="title">就医记录</div>
      <div class="info-item">
        <span class="info-label">医疗机构：</span>
        <span class="info-value">{{data.hospital}}</span>
      </div>
      <el-row>
        <el-col :span="13">
          <div class="info-item">
            <span class="info-label">就诊科室：</span>
            <span class="info-value">{{data.department}}</span>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="info-item">
            <span class="info-label">就医类型：</span>
            <span class="info-value">{{typeText[data.medicalType]}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13">
          <div class="info-item">
            <span class="info-label">医疗卡号：</span>
            <span class="info-value">{{data.patientNo}}</span>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="info-item">
            <span class="info-label">当前状态：</span>
            <span class="info-value">{{resultText[data.result]}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="13">
          <div class="info-item">
            <span class="info-label">就医时间：</span>
            <span class="info-value">{{data.inDate}}</span>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="info-item">
            <span class="info-label">出院时间：</span>
            <span class="info-value">{{data.outDate}}</span>
          </div>
        </el-col>
      </el-row>
      <div class="info-item">
        <span class="info-label">主管医生：</span>
        <span class="info-value">{{data.doctorName}}</span>
      </div>
      <div class="info-item">
        <span class="info-label">主诉：</span>
        <span class="info-value">{{data.complaint}}</span>
      </div>
      <div class="info-item">
        <span class="info-label">现病史：</span>
        <span class="info-value">{{data.hpi}}</span>
      </div>
      <div class="info-item">
        <span class="info-label">检查：</span>
        <span class="info-value">{{data.examination}}</span>
      </div>
      <div class="info-item">
        <span class="info-label">诊断：</span>
        <span class="info-value">{{data.diagnosis}}</span>
      </div>
      <div class="info-item">
        <span class="info-label">治疗方案：</span>
        <span class="info-value">{{data.therapy}}</span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'MedicalHistoryDetail',
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      data: {},
      typeText: {
        1: '门诊',
        2: '住院',
      },
      resultText: {
        1: '未指定',
        2: '治疗中',
        3: '转诊',
        4: '转为慢病',
        5: '痊愈',
        6: '其他',
      },
    };
  },
  mounted() {
    console.log(this.id, '弹窗');
    this.$api.healthMonitorInterface.SinglegetDetail(this.id).then((res) => {
      const { data } = res;
      this.data = data.data || {};
    });
  },
};
</script>

<style lang="scss" scoped>
.medical-history-detail-content {
  .title {
    padding-left: 10px;
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    line-height: 22px;
    position: relative;
    margin-bottom: 19px;
    &:after {
      content: '';
      width: 5px;
      height: 5px;
      background: #4991FD;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
    }
  }
  .info-item {
    margin-top: 10px;
    display: flex;
    .info-label {
      width: 72px;
      text-align: right;
      color: #666;
      font-weight: 400;
    }
    .info-value {
      flex: 1;
      color: #333;
    }
  }
}
</style>
