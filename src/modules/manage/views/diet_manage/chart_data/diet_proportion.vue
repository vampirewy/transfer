<template>
  <div id="diet-proportion"></div>
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
    // const myChart = echarts.init(document.getElementById('diet-proportion'));
    // myChart.setOption(options);
    const arr = [
      { value: this.list.proteinKcal, name: '蛋白质', itemStyle: { color: '#806CE5' } },
      { value: this.list.fatKcal, name: '脂肪', itemStyle: { color: '#3154AC' } },
      { value: this.list.choKcal, name: '碳水化合物', itemStyle: { color: '#36BF2F' } },
    ];
    this.arrlist = arr;
  },
  methods: {
    initChart() {
      const myChart = echarts.init(document.getElementById('diet-proportion'));
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
            hoverAnimation: true,
            // label: {
            //   show: true,
            //   position: 'inside',
            //   formatter: '{c}',
            // },
            label: {
              normal: {
                show: true,
                position: 'inner',
                textStyle: {
                  fontWeight: 300,
                  fontSize: 10,
                },
                formatter: '{d}%',
              },
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
#diet-proportion {
  width: 100%;
  height: 270px;
}
</style>
