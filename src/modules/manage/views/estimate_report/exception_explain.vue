<template>
  <div class="exception-explain">
    <div class="divRightTitleDiv">
      <div class="divRightTitle" style="margin-top: 0">异常解读
        <div class="titleBiao"></div></div>
    </div>
    <div
      v-for="(exception, index) in exceptions"
      :key="index"
      :class="`exception-item ${exception.expand ? 'expand' : ''}`">
      <div class="exception-header" @click="triggerExpand(exception)">
        <span>{{index + 1}}.{{exception.abnormalName}}</span>
        <i :class="exception.expand ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
      </div>
      <div class="detail" v-if="exception.expand">
        <el-form class="detail-form">
          <el-form-item label="医学解释">
            <el-input
              type="textarea"
              v-model="exception.medicalExplain"
              :autosize="{ minRows: 2 }"
              maxlength="500"
              show-word-limit
              placeholder=""
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="病因提示">
            <el-input
              type="textarea"
              v-model="exception.commonCause"
              :autosize="{ minRows: 2 }"
              maxlength="500"
              show-word-limit
              placeholder=""
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="体检建议">
            <el-input
              type="textarea"
              v-model="exception.advice"
              :autosize="{ minRows: 2 }"
              maxlength="500"
              show-word-limit
              placeholder=""
              disabled
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="detail-button">
          <el-button type="primary" size="small">保存数据</el-button>
        </div>
      </div>
    </div>
    <div class="page-button">
      <el-button class="cancelBtn" size="small" @click="$emit('close')">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExceptionExplain',
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      exceptions: [],
    };
  },
  mounted() {
    this.queryList();
  },
  methods: {
    queryList() {
      this.$api.accessReport.getExceptionList(this.id).then(({ data }) => {
        this.exceptions = data.data;
      });
    },
    triggerExpand(exception) {
      this.$set(exception, 'expand', !exception.expand);
    },
  },
};
</script>

<style lang="scss" scoped>
.exception-explain {
  .title {
    position: relative;
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    padding-left: 10px;
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
  }
  .exception-item {
    margin-bottom: 10px;
    .exception-header {
      padding: 19px;
      background: #F6F8FC;
      border-radius: 5px;
      font-size: 16px;
      font-weight: 600;
      color: #666666;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }
    &.expand .exception-header {
      background: #3154AC;
      color: #fff;
    }
  }
  .detail-form {
    /deep/ .el-form-item {
      background: #FFFFFF;
      border-radius: 5px;
      padding: 10px 20px;
      margin-bottom: 10px;
      .el-form-item__label {
        font-size: 14px;
        font-weight: 400;
        color: #36BF2F !important;
        line-height: 20px;
        margin-bottom: 8px;
      }
      textarea {
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
        border: none;
        resize: none;
        padding: 0;
      }
      .el-input__count {
        display: none;
      }
      .el-textarea.is-disabled .el-textarea__inner {
        background-color: #fff;
        cursor: auto;
      }
    }
  }
  .detail {
    background: #F6F8FC;
    border-radius: 5px;
    border: 1px solid #F6F8FC;
    padding: 20px;
    .detail-button {
      text-align: right;
      margin-top: 20px;
      display: none;
    }
  }
  .page-button {
    text-align: center;
    margin-top: 30px;
    .el-button {
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      border: 1px solid #3154AC;
      &:hover {
        color: #3154AC;
        border-color: #3154AC;
        background: rgba(49, 84, 172, 0.3);
      }
    }
  }
}
</style>
