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
  .TabBars{
    display: flex;
   .TabBarsNames{
    cursor: pointer;
    background: #EEF1F5;
    border-color: transparent;
    color: #666666;
    position: relative;
    margin-right: 30px;
    // padding: 10px 14px 10px 16px;
    font-size: 14px;
    border-radius: 8px 5px 0 0;
    display: block;
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-bottom: 1px solid #EEF1F5;
    border-top: 1px solid #EEF1F5;
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
    border-bottom: 1px solid #EEF1F5;
    border-right: 1px solid #EEF1F5;
  }
  .TabBarsNames:before {
    content: '';
    display: block;
    width: 10px;
    height: 36px;
    position: absolute;
    -webkit-transform: skewX(165deg);
    transform: skewX(163deg);
    background: #EEF1F5;
    border-top-left-radius: 8px;
    top: 0px;
    left: -4px;
    border-bottom: 1px solid #EEF1F5;
    border-left: 1px solid #EEF1F5;
}
  .TabBarsName{
    cursor: pointer;
    background: #ffffff;
    border-color: transparent;
    color: #333333;
    font-weight: 500;
    position: relative;
    margin-right: 30px;
    // padding: 10px 14px 10px 16px;
    font-size: 14px;
    border-radius: 8px 5px 0 0;
    display: block;
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-bottom: 1px solid #EEF1F5;
    border-top: 1px solid #EEF1F5;
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
    border-bottom: 1px solid #EEF1F5;
    border-right: 1px solid #EEF1F5;
  }
  .TabBarsName:before {
    content: '';
    display: block;
    width: 10px;
    height: 36px;
    position: absolute;
    -webkit-transform: skewX(165deg);
    transform: skewX(163deg);
    background: white;
    border-top-left-radius: 8px;
    top: 0px;
    left: -4px;
    border-bottom: 1px solid #EEF1F5;
    border-left: 1px solid #EEF1F5;
  }
  }
</style>
