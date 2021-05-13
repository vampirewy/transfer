<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import resize from './mixins/resize';

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '80px',
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Array,
      default: () => [],
    },
    sectionName: { // 部门
      type: Array,
      default: () => [],
    },
    sectionXList: { // 横轴
      type: Array,
      default: () => [],
    },
    lineColor: {
      type: String,
      default: '#3154AC',
    },
  },
  data() {
    return {
      chart: null,
      monthList: ['1月', '2月', '3月', '4月', '5月', '6月'],
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.initChart();
        });
        // this.setOptions(val)
      },
    },
    sectionName() { // watch监听props里carXList的变化，然后执行操作
      this.$nextTick(() => {
        this.initChart();
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart(); // 初始化
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose(); // 销毁
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions(this.chartData);
    },
    setOptions() {
      const option = {
        xAxis: {
          show: false,
          data: this.sectionXList, // 横轴
          boundaryGap: false, // 与Y轴贴边
          axisTick: { // 是否去掉刻度线
            show: false,
          },
          axisLine: {
            // x轴
            show: false,
            /* onZero: true,
            lineStyle: {
              color: '#333333', // y轴刻度字颜色
              type: 'solid',
            },*/
          },
        },
        grid: { // 折线图整体的位置
          left: -22,
          right: 0,
          bottom: -23,
          top: 10,
          containLabel: true,
        },
        tooltip: { // hover的tip
          trigger: 'axis',
          axisPointer: {
            // type: 'cross',
            lineStyle: {
              color: '#cccccc',
            },
          },
          padding: [5, 10],
        },
        yAxis: {
          show: false, // 隐藏y轴
          type: 'value',
          axisLine: {
            // y轴
            show: false, // 隐藏y轴线
            /* onZero: true,
            lineStyle: {
              color: '#333333', // y轴刻度字颜色
              type: 'solid',
            },*/
          },
          axisTick: {
            show: false,
          },
          // splitNumber: 6, // y轴刻度个数
          splitArea: {
            show: false,
          },
          splitLine: { // 网格线
            show: false,
          },
        },
        /* legend: {
          data: this.sectionName, // 折线图代表线段的name
        }, */
        /* dataZoom: [ // 可以左右滑动
          { type: 'inside' },
        ], */
        series: [],
      };
      // const colorLineList = ['#4991FD', '#31C529'];
      // const colorGradientList = ['#91c4ff', '#d7f4d6'];
      this.sectionName.forEach((sectionNameValue, index) => {
        this.chart.hideLoading();
        option.series.push({
          name: sectionNameValue,
          itemStyle: {
            normal: {
              color: this.lineColor, // hover的tip点的颜色
              lineStyle: {
                color: this.lineColor, // 线段颜色
                width: 2, // 线段宽度
              },
            },
          },
          smooth: true, // 线段是否平滑
          type: 'line',
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [ // 渐变由上至下
              {
                offset: 0,
                color: `${this.lineColor}90`, // 第一颜色
              },
              {
                offset: 1,
                color: `${this.lineColor}90`, // 渐变颜色
              },
            ]),
          },
          symbolSize: 1, // 设定实心点的大小
          data: this.chartData[index],
          animationDuration: 2000, // 展示动画时间
          animationEasing: 'cubicInOut', // 折线展示的动画
        });
      });
      this.chart.setOption(option, true);
    },
  },
};
</script>
