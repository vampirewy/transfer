<template>
  <el-form
          :inline="false"
          :model="form"
          class="form-inline"
  >
    <div class="result-top" v-if="notTitle === true">
      <div v-for="item in topTitle" :key="item.title">
        <div :style="{'background':item.color}"></div>{{item.title}}</div>
    </div>
  <el-form-item label="异常信息" class="form-item" :class="{'notTitle': notTitle === true}">
    <div class="result-top haveTitle" v-if="!notTitle">
      <div v-for="item in topTitle" :key="item.title">
        <div :style="{'background':item.color}"></div>{{item.title}}</div>
    </div>
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
  props: ['reportAbnormalList', 'notTitle'], // notTitle是否展示标题 用于与个人管理中心区分
  data() {
    return {
      form: {},
      reportAbnormalListNew: [],
      topTitle: [
        {
          color: '#36BF2F',
          title: '一般',
        },
        {
          color: '#3154AC',
          title: '轻度',
        },
        {
          color: '#806CE5',
          title: '中度',
        },
        {
          color: '#FA912B',
          title: '中重度',
        },
        {
          color: '#F33D21',
          title: '重度',
        },
        {
          color: '#E2E5EA',
          title: '未曾匹配',
        },
      ],
    };
  },
  watch: {
    reportAbnormalList(val) {
      this.reportAbnormalListNew = val;
    },
  },
  methods: {
    pageClick(page) {
      this.currentPage = page;
      // this.getImportantIndex();
    },
    getImportantIndex() {
      this.$api.health
        .getabnormalList(this.clientId)
        .then((res) => {
          const { data } = res;
          const result = data.data;
          this.form = result || [];
        });
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
    /deep/ .el-form-item__content {
      border-top: 1px solid #F4F4F6;
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
      margin-right: 15px;
      height: 40px;
      line-height: 40px;
      background-color: white;
      border-radius: 80px;
      border-width: 1px;
      padding: 0 17px 0 10px;
      margin-bottom: 20px;
      &.unusual-tag1{
        border-color: #36BF2F;
        color: #36BF2F;
      }
      &.unusual-tag2{
        border-color: #24499D;
        color: #24499D;
      }
      &.unusual-tag3{
        border-color: #806CE5;
        color: #806CE5;
      }
      &.unusual-tag4{
        border-color: #FA912B;
        color: #FA912B;
      }
      &.unusual-tag5{
        border-color: #F33D21;
        color: #F33D21;
      }
      img{
        width: auto;
        height: 16px;
        vertical-align: sub;
      }
      span{
        font-size: 14px;
        // color: #333333;
      }
    }
  }
  .result-top{
    display: flex;
    height: 32px;
    align-items: center;
    justify-content: flex-start;
    margin-left: 17px;
    &.haveTitle{
      justify-content: center;
      margin: -10px 0 10px 0;
    }
    div{
      font-size: 12px;
      color: #333;
      font-weight: 400;
      display: flex;
      align-items: center;
      margin-right: 30px;
      div{
        width: 7px;
        height: 7px;
        border-radius: 30px;
        margin-right: 5px;
      }
    }
  }
  .noneText{
    display: block;
    text-align: center;
    margin-top: 0;
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
