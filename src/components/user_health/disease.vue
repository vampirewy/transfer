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
    background: #7CA7FF;
    border-radius: 8px 8px 0 0;
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
    border-radius: 0 0 8px 8px;
    border: 1px solid #F4F4F6;
    border-top: none;
    padding: 20px 20px 0 20px;
    min-height: 134px;
  }
  .unusual-list {
    .unusual-tag {
      margin-right: 22px;
      height: 48px;
      line-height: 45px;
      background-color: white;
      border-radius: 80px;
      border-width: 2px;
      padding: 0 40px 0 26px;
      margin-bottom: 20px;
      &.unusual-tag1{
        border-color: #36BF2F;
      }
      &.unusual-tag2{
        border-color: #3154AC;
      }
      &.unusual-tag3{
        border-color: #806CE5;
      }
      &.unusual-tag4{
        border-color: #FA912B;
      }
      &.unusual-tag5{
        border-color: #F33D21;
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
