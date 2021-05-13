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
        legend: {
          data: ['展现', '点击', '访问', '咨询', '订单'],
        },
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
            },
            emphasis: {
              label: {
                fontSize: 20,
              },
            },
            data: [
              { value: 60, name: '60%' },
              { value: 40, name: '40%' },
              { value: 20, name: '20%' },
              { value: 80, name: '80%' },
            ],
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
      this.chart.setOption(option);
    },
  },
};
</script>
