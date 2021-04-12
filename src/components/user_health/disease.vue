<template>
  <el-form
          :inline="false"
          :model="form"
          class="form-inline"
  >
  <el-form-item label="异常信息" class="form-item" :class="{'notTitle': notTitle === true}">
    <div class="unusual-list" v-if="reportAbnormalListNew && reportAbnormalListNew.length">
      <el-tag
              class="unusual-tag" :class="'unusual-tag' + it.dangerLevel"
              v-for="it in reportAbnormalListNew"
              :key="it.id"
      >
        <img v-if="it.dangerLevel && it.dangerLevel !== 0"
             :src="require(`@/assets/images/healthPlan/unusual${it.dangerLevel}.png`)"/>
        <span>{{ it.abnormalName }}</span>
      </el-tag>
    </div>
    <div class="noneText" v-else>
        <img src="@/assets/images/noData.png"/>
        <p>暂时为空</p>
    </div>
  </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'disease',
  props: ['reportAbnormalList', 'notTitle'],
  data() {
    return {
      form: {},
      reportAbnormalListNew: [],
    };
  },
  watch: {
    reportAbnormalList(val) {
      this.reportAbnormalListNew = val;
    },
  },
};
</script>

<style lang="scss" scoped>
  /deep/ .el-form-item__label {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #4991FD;
    border-radius: 5px;
    padding-left: 22px;
    font-size: 16px;
    text-align: left;
    float: none;
    display: inline-block;
    color: white !important;
  }
  .notTitle{
    /deep/ .el-form-item__label {
     display: none;
    }
  }
  /deep/ .el-form-item__content {
    border-radius: 5px;
    border: 1px solid #F4F4F6;
    padding: 20px 20px 0 20px;
    margin-top: 12px;
    min-height: 134px;
  }
  .unusual-list {
    .unusual-tag {
      margin-right: 22px;
      height: 48px;
      line-height: 45px;
      background-color: white;
      border-radius: 8px;
      border-width: 2px;
      padding: 0 40px 0 26px;
      margin-bottom: 20px;
      &.unusual-tag1{
        border-color: #31C529;
        box-shadow: 0px 0px 15px 0px rgba(49, 197, 41, 0.2);
      }
      &.unusual-tag2{
        border-color: #4991FD;
        box-shadow: 0px 0px 15px 0px rgba(73, 145, 253, 0.2);
      }
      &.unusual-tag3{
        border-color: #6C6CE5;
        box-shadow: 0px 0px 15px 0px rgba(108, 108, 229, 0.2);
      }
      &.unusual-tag4{
        border-color: #E6B058;
        box-shadow: 0px 0px 15px 0px rgba(230, 176, 88, 0.2);
      }
      &.unusual-tag5{
        border-color: #FE2B2A;
        box-shadow: 0px 0px 15px 0px rgba(254, 43, 42, 0.2);
      }
      img{
        width: auto;
        height: 16px;
        vertical-align: sub;
      }
      span{
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .noneText{
    text-align: center;
    img{
      position: relative;
      width: 40px;
      height: 40px;
      margin-top: 20px;
    }
    p{
      color: #97A6BD;
      font-size: 14px;
      text-align: center;
      margin-top: -20px;
    }

  }
</style>
