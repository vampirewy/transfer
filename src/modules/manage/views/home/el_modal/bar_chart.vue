<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts';

require('echarts/theme/macarons');
// echarts theme
import resize from './mixins/resize';

const animationDuration = 3000;
/* let colorList = [
  '#71A9FD',
  '#4991FD',
  '#AECEFE',
  '#86B6FE',
  '#71A9FD',
];*/
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
      default: '175px',
    },
    xList: {
      type: Array,
      default: () => [],
    },
    yList: {
      type: Array,
      default: () => [],
    },
    colorListProp: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chart: null,
      colorList: [], // 柱形图颜色
    };
  },
  mounted() {
    if (this.colorListProp.length > 0) {
      this.colorList = this.colorListProp; // 折线图的柱形图颜色设置
    } else {
      this.colorList = [
        '#71A9FD',
        '#4991FD',
        '#AECEFE',
        '#86B6FE',
        '#71A9FD',
      ];
    }
    this.$nextTick(() => {
      this.initChart();
    });
  },
  watch: {
    yList: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.initChart();
        });
        // this.setOptions(val)
      },
    },
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      const elThis = this;
      this.chart = echarts.init(this.$el, 'macarons');
      const options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: 20,
          left: '2%',
          right: '2%',
          bottom: '0',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.xList,
            axisTick: {
              alignWithLabel: true,
              show: false, // 是否去掉刻度线
            },
            axisLabel: { // 坐标轴刻度标签的相关设置。
              interval: 0, // x轴文字间隔0
              // rotate: '45',
            },
            axisLine: {
              // x轴
              show: false,
              onZero: true,
              lineStyle: {
                color: '#97A6BD', // y轴刻度字颜色
                // type: 'solid',
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            // minInterval: 1,
            axisTick: {
              show: false,
            },
            axisLine: {
              // y轴
              show: false,
              onZero: true,
              lineStyle: {
                color: '#97A6BD', // y轴刻度字颜色
                type: 'solid',
              },
            },
            splitNumber: 3,
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '',
            type: 'bar',
            stack: 'vistors',
            barWidth: '24px',
            showBackground: true,
            backgroundStyle: {
              color: '#F4F4F6',
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {// 数值样式
                color: '#666666',
                fontSize: 14,
              },
              emphasis: {
                textStyle: {// hover数值样式
                  color: '#71A9FD',
                },
              },
            },
            itemStyle: {
              // 通常情况下：
              normal: {
                barBorderRadius: 5,
                // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组中的颜色
                color(params) {
                  return elThis.colorList[params.dataIndex];
                },
                // color: '#a453f7',  //设置所有柱状图颜色
              },
            },
            data: this.yList,
            animationDuration,
          },
        ],
      };
      if (this.colorListProp.length === 2) { // 如果是折线图的柱形图
        options.grid.bottom = 40;
        options.series.forEach((seriesVal) => {
          seriesVal.barWidth = '40px';
        });
      }
      this.chart.setOption(options);
    },
  },
};
</script>
