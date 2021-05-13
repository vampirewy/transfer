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
      default: '300px',
    },
    xList: {
      type: Array,
      default: () => [],
    },
    yList: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
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
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
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
      this.chart = echarts.init(this.$el, 'macarons');

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          left: 'center',
          bottom: '15',
          data: this.xList,
        },
        title: {
          text: this.total, // 总人数数字
          left: 'center',
          top: '32%',
          textStyle: {
            color: '#333',
            fontSize: 15,
            align: 'center',
          },
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: '42%',
          style: {
            text: '总人数',
            textAlign: 'center',
            fill: '#737373',
            fontSize: 13,
          },
        },
        series: [
          {
            name: '人员类别',
            type: 'pie',
            // roseType: 'radius', //可以根据大小控制长短
            radius: [45, 90], // 中间可设置空心
            center: ['50%', '40%'],
            label: {
              formatter: '{c|{c}}',
              rich: {
                c: { fontSize: 16 },
              },
            },
            itemStyle: {
              // 通常情况下：
              normal: {
                // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组中的颜色
                color(params) {
                  const colorList = [
                    '#4991FD',
                    '#FFB980',
                    '#81C997',
                    '#A38FF8',
                    '#27727B',
                    '#999',
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
      });
    },
  },
};
</script>
