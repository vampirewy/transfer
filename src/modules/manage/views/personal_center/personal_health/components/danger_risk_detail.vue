<template>
  <el-dialog
    class="el-plan-setting-mdl"
    :title="modalTitle"
    :visible.sync="show"
    width="570px"
    alignFooter="right"
    :close-on-click-modal="false"
    @close="onVisible"
  >
    <div class="body" v-if="executeState === 1">
      <div class="search-title">
        <span>危险因素</span>
      </div>
      <div class="header headerPlan">
        <el-form :inline="false" :model="form" class="form-inline inputCommon headerPlan">
          <el-row>
            <el-col :span="12">
              <el-form-item label="分类：" label-width="60px">
                <span>{{ form.typeName | getResult}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="因素：" label-width="60px">
                <span>{{form.factor | getResult}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="建议：" label-width="60px">
                {{form.advice | getResult}}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'dangerRiskDetail',
  data() {
    return {
      show: true,
      executeState: 1, // 查看
      modalTitle: '',
      form: {
        typeName: '',
        factor: '',
        advice: '',
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$nextTick(async () => {
        this.getDetail();
      });
    },
    /**
     * 获取干预模板计划编辑写入
     * @return {Promise<void>}
     */
    async getDetail() {
      const PropsData = Object.assign({}, this.propsData);
      console.log(PropsData);
      const { typeName, factor, advice } = PropsData;
      this.form.typeName = typeName;
      this.form.factor = factor;
      this.form.advice = advice;
    },
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'dangerRiskDetail' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-plan-setting-mdl {
  /deep/ .el-dialog__body{
    padding: 30px 12px 10px 26px !important;
  }
  /deep/ .el-form-item__label{
    line-height: 30px;
  }
  /deep/ .el-input__inner,/deep/ .el-textarea__inner{
    background-color: #F4F4F6;
    border: none;
    resize: none;
  }
  .body {
    /deep/ .el-input.is-disabled .el-input__inner,
    /deep/ .el-textarea.is-disabled .el-textarea__inner{
      color: #333333;
    }
    .search-title {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
      padding-left: 15px;
      margin-bottom: 10px;
      position: relative;
      &:before {
        content: '';
        width: 5px;
        height: 5px;
        background: #26c165;
        border-radius: 3px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .red {
      color: #f00;
    }
    .colClass{
      width: 66px;
      /*margin-right: 16px*/
    }
    .form-title {
      color: #666666;
      display: inline-block;
      width: 61px;
      text-align: right;
    }
    .el-pagination {
      padding: 10px 0;
      text-align: right;
    }
    .header{
      /deep/ .el-form-item{
        margin-bottom: 10px;
      }
    }
    .headerPlan{
      margin-top: 8px;
      margin-bottom: 20px;
      /deep/ .el-form-item{
        margin-bottom: 0;
        .el-form-item__content{
          line-height: 30px;
        }
      }
    }
  }
  .el-select{
    width: 100%;
  }
  /*/deep/ .el-textarea .el-input__count{
    bottom: -11px;
    background: none;
    height: 20px;
  }*/
  .el-button + .el-button{
    margin-left: 20px;
  }
  /deep/ .el-dialog__footer{
    padding: 0px 32px 12px 0;
  }
}
</style>
