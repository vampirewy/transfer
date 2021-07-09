<template>
  <div class="health-monitor-trend">
     <div class="TabBars">
      <div v-for="(item,index) in tabbor" :key="index">
      <span :class="Tabactive === index?'TabBarsName':'TabBarsNames'" @click="TabbarBtn(index)">
          {{item}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// import LineChart from '../components/line_chart.vue';
// import * as dayjs from 'dayjs';
export default {
  name: 'WeightTrend',
  components: {
    // LineChart,
  },
  data() {
    return {
      tabbor: ['血压', '血糖', '体重', '运动', '其他检测'],
      Tabactive: 0,
      tabIndex: 0,
    };
  },
  mounted() {
    // this.queryChartData();
    // this.queryPageList();
  },
  methods: {
    TabbarBtn(index) {
      this.Tabactive = index;
      if (index === 0) {
        this.tabIndex = 'BP';
      }
      if (index === 1) {
        this.tabIndex = 'BG';
      }
      if (index === 2) {
        this.tabIndex = 'weight';
      }
      if (index === 3) {
        this.tabIndex = 'sport';
      }
      if (index === 4) {
        this.tabIndex = 'other';
      }
      this.$emit('messageData', index, this.tabIndex);
    },
    handlePageChange(page) {
      this.table.pageNo = page;
      this.queryPageList();
    },
    handleSizeChange(size) {
      this.table.pageSize = size;
      this.queryPageList();
    },
  },
};
</script>

<style lang="scss" scoped>
.lookPressure{
  display: flex;
  margin:20px 0 20px 0;
  div{
    width: 25%;
    padding-left: 20px;
    font-size: 14px;
    color: #333333;
  }
}
  .TabBars {
  display: flex;
  align-items: center;
  height: 38px;
  border-bottom: 1px solid #dde0e6;
  z-index: 1;
  margin: 40px 0 20px 0;
  div {
    .TabBarsNames {
      cursor: pointer;
      background: #eef1f5;
      border-color: transparent;
      color: #666666;
      position: relative;
      padding: 9.6px 10px;
      font-size: 12px;
      border-radius: 8px 8px 0 0;
      margin: 0 22px;
      // border: 1px solid #dde0e6;
    }
    .fristName:nth-child(1) {
      border-radius: 0px 5px 0 0;
      margin-left: 0;
      // border: 1px solid #DDE0E6;
    }
    .TabBarsNames:after {
      content: '';
      display: block;
      width: 20px;
      height: 34.8px;
      position: absolute;
      -webkit-transform: skewX(23deg);
      transform: skewX(23deg);
      background: #eef1f5;
      border-top-right-radius: 8px;
      top: 0px;
      right: -13px;
      // border-right: 1px solid #dde0e6;
      // border-bottom: 1px solid #dde0e6;
    }
    .TabBarsNames:before {
      content: '';
      display: block;
      width: 20px;
      height: 34.8px;
      position: absolute;
      -webkit-transform: skewX(-23deg);
      transform: skewX(-23deg);
      background: #eef1f5;
      border-top-left-radius: 8px;
      top: 0px;
      left: -13px;
      // border-left: 1px solid #dde0e6;
      // border-bottom: 1px solid #dde0e6;
    }
    .fristName:nth-child(1)::before {
      width: 0;
      height: 0;
    }
    .TabBarsName {
      cursor: pointer;
      background: #ffffff;
      border-color: transparent;
      color: #333333;
      position: relative;
      margin: 0 20px;
      padding: 9.5px 9px;
      font-size: 14px;
      border-radius: 8px 8px 0 0;
      border: 1px solid #dde0e6;
      bottom: 1px;
    }
    .TabBarsName:after {
      content: '';
      display: block;
      width: 20px;
      height: 38px;
      position: absolute;
      -webkit-transform: skewX(23deg);
      transform: skewX(23deg);
      background: white;
      border-top-right-radius: 8px;
      top: 0px;
      right: -13px;
      border-right: 1px solid #dde0e6;
      border-bottom: 1px solid #dde0e6;
    }
    .TabBarsName::before {
      content: '';
      display: block;
      width: 20px;
      height: 38px;
      position: absolute;
      -webkit-transform: skewX(-23deg);
      transform: skewX(-23deg);
      background: white;
      border-top-left-radius: 8px;
      top: 0px;
      left: -13px;
      border-left: 1px solid #dde0e6;
      border-bottom: 1px solid #dde0e6;
    }
  }
}
</style>
