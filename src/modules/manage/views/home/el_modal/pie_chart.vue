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
      default: '170px',
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
      const options = {
        /* tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        }, */
        /* legend: {
          left: 'center',
          bottom: '15',
          data: this.xList,
        },*/
        series: [
          {
            name: '随访数量',
            value: '随访数量',
            type: 'pie',
            // roseType: 'radius', //可以根据大小控制长短
            radius: [50, 75], // 中间可设置空心
            center: ['45%', '55%'],
            hoverAnimation: false,
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
            // label: {
            //   formatter: '{d|{d}%}',
            //   rich: {
            //     d: { fontSize: 10 },
            //   },
            // },
            // label: {
            //   normal: {
            //   position: 'center',
            //   show: false,
            //   },
            // },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                color: '#333333',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              // 通常情况下：
              normal: {
                // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组中的颜色
                color(params) {
                  const colorList = [
                    '#5B8FF9',
                    '#5AD8A6',
                    '#6C6CE5',
                    '#F6BD16',
                    '#E8684A',
                    '#6DC8EC',
                    '#31C529',
                    '#54c9b6',
                    '#F53626',
                    '#f5c8be',
                  ];
                  return colorList[params.dataIndex];
                },
                // color: '#a453f7',  //设置所有柱状图颜色
              },
            },
            data: this.yList,
            animationEasing: 'cubicInOut',
            animationDuration: 3000,
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
      this.chart.setOption(options);
    },
  },
};
</script>
