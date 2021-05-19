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
    centerText: {
      type: String,
      default: '0.00',
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
        graphic: {
          type: 'text',
          left: 'center',
          top: '41%',
          style: {
            text: this.centerText, // 圈中的文字值
            textAlign: 'center',
            fill: '#333333',
            fontSize: 20,
            fontWeight: 600,
          },
        },
        title: {
          text: '总费用',
          left: 'center',
          top: '53%',
          textStyle: {
            color: '#999999',
            fontSize: 14,
            align: 'center',
          },
        },
        series: [
          {
            name: '随访数量',
            value: '随访数量',
            type: 'pie',
            // roseType: 'radius', //可以根据大小控制长短
            radius: [63, 88], // 中间可设置空心
            center: ['50%', '50%'],
            hoverAnimation: false, // hover是否变大
            label: {
              normal: {
                show: true,
                position: 'inner',
                textStyle: {
                  fontWeight: 300,
                  fontSize: 11,
                  color: 'white',
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
                fontSize: '15',
                color: '#fff',
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
                    '#3154AC',
                    '#806CE5',
                    '#333333',
                    '#FA912B',
                    '#36BF2F',
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
