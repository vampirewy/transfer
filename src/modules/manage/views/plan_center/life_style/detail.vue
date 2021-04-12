<template>
  <div class="detail">
    <div class="title">查看-生活方式模板</div>
    <el-form
      class="life-style-form"
      :model="form"
      ref="form"
      label-width="90px"
      label-suffix="："
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="方案名称">
            <div class="form-item-value">{{form.name}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="指导类型">
            <div class="form-item-value">{{guideTypeMap[form.guideType]}}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="指导内容">
            <div class="form-item-value guide-content">{{form.guideContent}}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="form-buttons">
        <el-button plain size="small" @click="goBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      labelPosition: 'top',
      form: {
        name: '',
        guideType: 0,
        guideContent: '',
      },
      guideTypeMap: {},
    };
  },
  mounted() {
    this.getGuideTypeList();
    this.onLoad();
  },
  methods: {
    getGuideTypeList() {
      this.$api.lifeStyleInterface.getGuideTypeList().then(({ data }) => {
        data.data.forEach((item) => {
          this.guideTypeMap[item.paramValue] = item.name;
        });
      });
    },
    onLoad() {
      this.getDetail();
    },
    /**
     * 获取生活方式明细
     * @return {Promise<void>}
     */
    async getDetail() {
      const reqBody = { id: this.$route.params.id };
      const res = await this.$api.lifeStyleInterface.getLifeStyleById(reqBody);
      const { data } = res.data;
      this.form.name = data.name;
      this.form.guideType = data.guideType;
      this.form.guideContent = data.guideContent;
    },
    /**
     * 返回
     */
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  .title {
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
    &.physical-examination-info {
      margin: 10px 0 20px;
    }
  }
  /deep/ .form-item-value {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    background: #F4F4F6;
    border-radius: 5px;
    &.guide-content {
      padding-top: 10px;
      padding-bottom: 10px;
      min-height: 120px;
      height: unset;
      line-height: 20px;
    }
  }
  .form-buttons {
    text-align: center;
    margin-top: 10px;
    .el-button {
      width: 80px;
      height: 40px;
      border-radius: 8px;
      border: none;
      &:not(.el-button--primary) {
        background: #97A6BD;
        color: #fff;
      }
    }
  }
}
</style>
