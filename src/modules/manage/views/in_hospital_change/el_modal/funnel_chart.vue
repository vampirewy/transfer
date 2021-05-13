<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts';

require('echarts/theme/macarons');
// echarts theme
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
      default: '210px',
    },
    xList: {
      type: Array,
      default: () => [],
    },
    yList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
    console.log(this.yList, '数据');
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    options: {
      handler() {
        this.chart.setOption(this.options);
      },
      deep: true,
    },
    xList() {
      // watch监听props里carXList的变化，然后执行操作
      this.$nextTick(() => {
        this.initChart();
      });
    },
    yList() {
      // watch监听props里carYList的变化，然后执行操作
      this.$nextTick(() => {
        this.initChart();
      });
    },
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}%',
        },
        /* legend: {
          data: ['展现', '点击', '访问', '咨询', '订单'],
        },*/
        series: [
          {
            name: '', // 检后就医转化率分析
            type: 'funnel',
            left: 0,
            top: 30,
            // x2: 80,
            bottom: 0,
            width: '100%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 0,
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}%',
              color: '#fff',
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid',
              },
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 0,
              // 通常情况下：
              normal: {
                // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组中的颜色
                /* color(params) {
                  const colorList = [
                    '#FA912B', '#806CE5', '#24499D', '#36BF2F',
                    '#6DC8EC', '#31C529', '#54c9b6', '#F53626', '#f5c8be',
                  ];
                  return colorList[params.dataIndex];
                },*/
                /* color: new echarts.graphic.LinearGradient(1, 1, 0, 1, [
                  {
                    offset: 0,
                    color: '#FA912B',
                  },
                  {
                    offset: 1,
                    color: '#EAAF75',
                  },
                ]),*/
                // color: '#a453f7',  //设置所有柱状图颜色
              },
            },
            emphasis: {
              label: {
                fontSize: 20,
              },
            },
            data: this.yList,
          },
        ],
      };
      // if (this.yList.length > 1) {
      //   options.series[0].itemStyle.normal.borderWidth = 3;
      //   options.series[0].itemStyle.normal.borderColor = '#fff';
      // } else {
      //   options.series[0].itemStyle.normal.borderWidth = 0;
      //   options.series[0].itemStyle.normal.borderColor = '#fff';
      // }
      /* this.yList.forEach((val) => {

      });*/
      option.series[0].itemStyle.normal = {
        /* color: new echarts.graphic.LinearGradient(1, 1, 0, 1, [
          {
            offset: 0,
            color: '#FA912B',
          },
          {
            offset: 1,
            color: '#EAAF75',
          },
        ]),*/
        color(params) {
          /* const colorList = [
            '#FA912B', '#806CE5', '#24499D', '#36BF2F',
            '#6DC8EC', '#31C529', '#54c9b6', '#F53626', '#f5c8be',
          ];*/
          const colorList = [new echarts.graphic.LinearGradient(1, 1, 0, 1, [
            { offset: 0, color: '#FA912B' },
            { offset: 1, color: '#EAAF75' },
          ]), new echarts.graphic.LinearGradient(1, 1, 0, 1, [
            { offset: 0, color: '#806CE5' },
            { offset: 1, color: '#6C6CE5' },
          ]), new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: '#5393D5' },
            { offset: 1, color: '#3154AC' },
          ]), new echarts.graphic.LinearGradient(1, 1, 0, 1, [
            { offset: 0, color: '#36BF2F' },
            { offset: 1, color: '#22AE60' },
          ])];
          return colorList[params.dataIndex];
        },
      };
      this.chart.setOption(option);
    },
  },
};
</script>
