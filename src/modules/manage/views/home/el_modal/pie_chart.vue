<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts';

require('echarts/theme/macarons');
// echarts theme
// import resize from './mixins/resize';

export default {
  // mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '220px',
    },
    height: {
      type: String,
      default: '190px',
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
    console.log(this.width, this.height, '数据');
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
      this.yList.forEach((val) => {
        val.value = ((val.value / this.centerText) * 100).toFixed(0);
      });
      this.chart = echarts.init(this.$el, 'macarons');
      const options = {
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c} ({d}%)',
        // },
        /* legend: {
          left: 'center',
          bottom: '15',
          data: this.xList,
        },*/
        graphic: {
          type: 'text',
          left: '47%',
          top: '45%',
          style: {
            text: this.centerText, // 圈中的文字值
            textAlign: 'center',
            fill: '#333333',
            fontSize: 20,
            fontWeight: 600,
          },
        },
        title: {
          text: '总人数',
          left: '42%',
          top: '60%',
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
            radius: [50, 75], // 中间可设置空心
            center: ['53%', '55%'],
            hoverAnimation: true,
            label: {
              normal: {
                // formatter: '{d}%',
                // formatter: function (params) {
                //   return `${params.percent.toFixed(1)}%`;
                // },
                show: true,
                position: 'inner',
                textStyle: {
                  fontWeight: 300,
                  fontSize: 10,
                },
                formatter: '{c}%',
                // formatter: function(a){ return a.percent.toFixed(0) + '%'},
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                color: '#ffffff',
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
                    '#FA912B',
                    '#333333',
                    '#806CE5',
                    '#3154AC',
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
      this.chart.setOption(options);
    },
  },
};
</script>
