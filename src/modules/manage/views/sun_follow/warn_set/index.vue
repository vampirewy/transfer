<template>
  <div class="health-monitor">
    <tab-bars @messageData='TabbarBtn'></tab-bars>
    <target-set v-if="tabIndex === 0" ref="targetSet"></target-set>
    <keyword-set v-if="tabIndex === 1" ref="keywordSet"></keyword-set>
  </div>
</template>

<script>
import TabBars from './TabBars.vue';
import SportTrend from './sport_trend.vue';
import OperateButton from '~/src/components/query_page/operate_button.vue';
import BgtrendAdd from './bg_trend_add.vue';
import TargetSet from './target_set/index.vue';
import KeywordSet from './keyword_set/index.vue';
export default {
  name: 'warn_set',
  components: {
    TabBars,
    SportTrend,
    OperateButton,
    BgtrendAdd,
    TargetSet,
    KeywordSet,
  },
  data() {
    return {
      tabIndex: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(vm);
      if (vm.tabIndex === 0) {
        // targetSet列表
        vm.$refs.targetSet.queryList();
      }
    });
  },
  methods: {
    TabbarBtn(index) {
      this.tabIndex = index;
      if (this.tabIndex === 0) {
        setTimeout(() => {
          console.log(this.$refs.targetSet, 'this.$refs.targetSet');
          this.$refs.targetSet.search();
        }, 50);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.operates{
  margin-top: 20px;
}
.health-monitor {
  /deep/ .el-tabs__item {
    box-shadow: none !important;
    &:not(.is-active) {
      color: #97A6BD;
    }
  }
  /deep/ .search-button {
    &:hover {
      background: #55AAFF;
    }
    img {
      width: 16px;
    }
  }
  /deep/ .el-pagination__sizes {
    margin-right: 0;
    .el-select .el-input {
      margin: 0;
    }
  }
  /deep/ .health-monitor-trend {
    .title {
      position: relative;
      padding-left: 10px;
      font-size: 18px;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
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
    .chart-legend {
      text-align: right;
      margin-top: -20px;
      > span {
        font-size: 12px;
        font-weight: 400;
        color: #97A6BD;
        line-height: 17px;
        padding-left: 18px;
        position: relative;
        + span {
          margin-left: 40px;
        }
        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 3px;
        }
        &:first-child:after {
          background: #4991FD;
        }
        &:nth-of-type(2):after {
          background: #31C529;
        }
      }
    }
    .noDataLine{
      height: 490px;
      text-align: center;
      img{
        margin-top: 135px;
        width: 200px;
      }
      span{
        font-size: 14px;
        color: #97A6BD;
        display: block;
        margin-top: 15px;
      };
    }
    .buttons {
      text-align: center;
      margin-top: 30px;
      button {
        width: 80px;
        border-radius: 8px;
        border: none;
        background: #97A6BD;
        color: #fff;
      }
    }
  }
  .TabBars{
  display: flex;
  margin-top: 30px;
   .TabBarsNames{
    cursor: pointer;
    background: #EEF1F5;
    border-color: transparent;
    color: #666666;
    position: relative;
    margin-right: 20px;
    // padding: 10px 14px 10px 16px;
    font-size: 14px;
    border-radius: 8px 5px 0 0;
    display: block;
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
  }
  .TabBarsNames:after{
    content: '';
    display: block;
    width: 25px;
    height: 36px;
    position: absolute;
    -webkit-transform: skewX(23deg);
    transform: skewX(23deg);
    background: #EEF1F5;
    border-top-right-radius: 8px;
    top: 0px;
    right: -13px;
  }
  .TabBarsName{
    cursor: pointer;
    background: #ffffff;
    border-color: transparent;
    color: #333333;
    font-weight: 500;
    position: relative;
    margin-right: 20px;
    // padding: 10px 14px 10px 16px;
    font-size: 14px;
    border-radius: 8px 5px 0 0;
    display: block;
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
  }
  .TabBarsName:after{
    content: '';
    display: block;
    width: 25px;
    height: 36px;
    position: absolute;
    -webkit-transform: skewX(23deg);
    transform: skewX(23deg);
    background: white;
    border-top-right-radius: 8px;
    top: 0px;
    right: -13px;
  }
  }
}
</style>
