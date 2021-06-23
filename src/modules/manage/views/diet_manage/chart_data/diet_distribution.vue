<template>
  <div id="diet-distribution"></div>
</template>
<script>
import * as echarts from 'echarts';

export default {
  props: {
    list: {
      type: Object,
      default: () => [],
    },
  },
  data() {
    return {
      arrlist: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
    const arr = [
      { value: this.list.breakKcal, name: '早餐', itemStyle: { color: '#806CE5' } },
      { value: this.list.lunchKcal, name: '午餐', itemStyle: { color: '#3154AC' } },
      { value: this.list.dinnerKcal, name: '晚餐', itemStyle: { color: '#36BF2F' } },
    ];
    this.arrlist = arr;
  },
  methods: {
    initChart() {
      const myChart = echarts.init(document.getElementById('diet-distribution'));
      const options = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          bottom: '0%',
          left: 'center',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#666666',
          },
        },
        series: [
          {
            name: '三餐能量分配比',
            type: 'pie',
            radius: ['45%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}',
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: this.arrlist,
          },
        ],
      };
      myChart.setOption(options);
    },
  },
};
</script>
<style lang="scss" scoped>
#diet-distribution {
  width: 100%;
  height: 270px;
}
</style>
