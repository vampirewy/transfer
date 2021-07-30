<template>
  <div id="diet-protein-proportion"></div>
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
      { value: this.list.animalProtein, name: '动物性', itemStyle: { color: '#3154AC' } },
      { value: this.list.beansProtein, name: '豆类', itemStyle: { color: '#36BF2F' } },
      { value: this.list.otherProtein, name: '其他植物性', itemStyle: { color: '#2458FF' } },
    ];
    this.arrlist = arr;
  },
  methods: {
    initChart() {
      const myChart = echarts.init(
        document.getElementById('diet-protein-proportion'),
      );
      const options = {
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            name: '动物性及豆类蛋白质占总蛋白质比例',
            type: 'pie',
            avoidLabelOverlap: false,
            hoverAnimation: true,
            // label: {
            //   show: true,
            //   position: 'inside',
            //   formatter: '{b}',
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
#diet-protein-proportion {
  width: 100%;
  height: 270px;
}
</style>
