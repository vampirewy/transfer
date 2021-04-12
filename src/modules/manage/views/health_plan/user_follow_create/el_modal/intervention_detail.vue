<template>
  <div class="create-edit">
    <div class="divRightTitle"><span>|</span>查看-干预方案</div>
    <el-form
      :inline="false"
      :label-position="labelPosition"
      :model="form"
      class="form-inline"
    >
      <el-form-item label="方案名称：" class="healthPlanInput">
        <el-input
                v-model="form.name"
                placeholder="请输入"
                style="width: 230px;"
                disabled
        >
        </el-input>
      </el-form-item>
      <el-form-item label="开始时间：" class="healthPlanInput">
        <el-date-picker
                v-model="form.startTime"
                :picker-options="pickerStartTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择开始时间" style="width: 230px"
                disabled
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：" class="healthPlanInput">
        <el-date-picker
                v-model="form.endTime"
                :picker-options="pickerEndTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择结束时间" style="width: 230px"
                disabled
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item style="margin-bottom: 0">
        <div class="top">
          <div class="action">
            <span class="name">生活方式</span>
          </div>
          <div class="actionInput">
            <span class="life-advice">生活建议：</span>
            <div class="sport-form sportTag" style="height: auto;min-height: 90px">
              <span class="desc">{{form.lifeAdvice}}</span>
            </div>
          </div>
        </div>

        <div class="bottom">
          <div class="action">
            <span class="name">运动方式</span>
          </div>
          <div class="actionInput">
            <div class="sport-form sportTag">
              <el-tag
                      class="unusual-tag"
                      v-for="(it) in form.sportAdvice"
                      :key="it.id"
              >
                <span>{{ it }}</span>
              </el-tag>
              <p class="noneText" v-if="form.sportAdvice.length === 0" style="margin-top: 18px;">
                请选择运动方式
              </p>
            </div>
          </div>
        </div>

      </el-form-item>
      <div class="footer">
        <el-button size="small" class="cancelBtn" @click="cancel">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'interventionDetail',
  props: ['propsData'],
  components: {

  },
  data() {
    return {
      routeType: 1, // 1新增 2编辑
      labelPosition: 'top',
      form: {
        lifeAdvice: '',
        sportAdvice: [],
        name: '', // 方案名称
        startTime: '', // 开始时间
        endTime: '', // 结束时间
      },
      pickerStartTime: {
        disabledDate: (time) => {
          if (this.form.endTime) {
            const endTime = new Date(this.form.endTime);
            return time.getTime() > new Date(endTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
      pickerEndTime: {
        disabledDate: (time) => {
          if (this.form.startTime) {
            const startTime = new Date(this.form.startTime);
            return time.getTime() < new Date(startTime).getTime() - (3600 * 1000 * 23 * 1);
          }
        },
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.getDetail();
    },
    /**
     * 获取干预方案明细
     */
    async getDetail() {
      const reqBody = { id: this.propsData.interventionId };
      const res = await this.$api.interventionPlanInterface.getInterveneScheme(
        reqBody,
      );
      const { data } = res.data;
      this.form.name = data.name;
      if (data.startTime) { this.form.startTime = data.startTime.split(' ')[0]; }
      if (data.endTime) { this.form.endTime = data.endTime.split(' ')[0]; }
      this.form.lifeAdvice = data.lifeAdvice;
      if (data.sportAdvice) { this.form.sportAdvice = data.sportAdvice.split(','); }
    },
    /**
     * 取消
     */
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
.create-edit /deep/ {
  .divRightTitle{
    font-size: 18px;
    color: #333333;
    font-weight: bold;
    span{
      color: #4991FD;
      font-size: 18px;
      margin-right: 9px;
    }
  }
  .red {
    color: #f00;
    font-style: normal;
  }
  .form-title {
    color: #262626;
  }
  .el-form-item {
    background-color: #fff;
  }
  .form-item {
    .el-form-item__label {
      color: #262626;
    }
  }
  .noneText{
    color: #97A6BD;
    font-size: 16px;
    margin-top: 35px;
    text-align: center;
  }
  .result {
    .life-state {
      display: flex;
    }
    .life-style {
      display: flex;
      flex-wrap: wrap;
      .nameP{
        width: 33%;
        font-size: 14px;
        color: #333333;
        margin-bottom: 10px;
        align-items: center;
        display: flex;
        img{
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
        span{
          &.red{
            color: #FE2B2A;
          }
        }
      }
      .con {
        margin-top: 5px;
        /*p {
          line-height: 30px;
        }*/
      }
    }
  }
  .healthPlanInput{
    margin-top: 20px;
    display: inline-block;
    margin-right: 30px;
    input::-webkit-input-placeholder {
      color: #999999;
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
      color: #999999;
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
      color: #999999;
    }
    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #999999;
    }
    /deep/ .el-input__inner{
      background-color: #F4F4F6;
      }
    /deep/ .el-input.is-disabled .el-input__inner{
      color: #333333;
    }
    .el-form-item__label{
      padding-bottom: 0;
    }
    .el-form-item__content {
      display: inline-block;
      vertical-align: top;
    }
  }
  .top,.bottom{
    border: 1px solid #F4F4F6;
    margin-bottom: 30px;
    .action {
      height: 60px;
      background: #4991FD;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 10px;
      .name{
        font-size: 16px;
        color: white;
        padding-left: 20px;
        font-weight: bold;
      }
      a {
        color: #4991fd;
        text-decoration: none;
      }
      .clear {
        margin-left: 5px;
      }
    }
    .actionInput{
      display: flex;
      margin: 20px 10px 10px 20px;
      .life-advice{
        color: #666666;
        width: 78px;
        font-size: 14px;
      }
      .sport-form {
        width: 100%;
        height: 90px;
        /*padding: 10px 20px 10px 20px;*/
       /* background: #F4F4F6;*/
        border-radius: 5px;
        /deep/ .el-textarea__inner{
          height: 110px;
          resize: none;
          background-color: #F4F4F6;
        }
        /deep/ .el-textarea.is-disabled .el-textarea__inner{
          color: #333333;
        }
        &.sportTag{
          .desc{
            color: #666666;
            line-height: 20px;
            display: inline-block;
            margin-top: 10px;
          }
          .unusual-tag {
            margin-right: 22px;
            height: 48px;
            line-height: 45px;
            background-color: white;
            border-radius: 8px;
            border-width: 2px;
            padding: 0 40px 0 40px;
            margin-bottom: 20px;
            border-color: #97A6BD;
            position: relative;
          }
          img{
            width: auto;
            height: 16px;
            position: absolute;
            right: 10px;
            top: 14px;
            cursor: pointer;
          }
          span{
            font-size: 14px;
            color: #333333;
          }
        }
      }
    }
  }

  .footer {
    margin-top: 10px;
    text-align: center;
  }

  /*.el-textarea .el-input__count {
    bottom: -20px;
    background: none;
  }*/
}
</style>
