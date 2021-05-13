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
      default: '260px',
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        /* toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },*/
        /* legend: {
          data: ['蒸发量', '降水量', '平均温度'],
        },*/
        grid: { // 折线图整体的位置
          left: 10,
          right: 10,
          bottom: 0,
          top: 30,
          containLabel: true,
        },
        xAxis: [
          {
            // type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow',
            },
            axisLabel: { // 刻度值
              textStyle: {
                color: '#333333',
                fontSize: 10,
              },
            },
            splitLine: {
              show: true, // 网格线
              lineStyle: {
                color: '#EEF1F5', // y轴刻度字颜色
                type: 'solid',
              },
            },
            splitArea: {
              show: false,
            }, // 保留网格区域
            // boundaryGap: false, // 与Y轴贴边
            axisTick: { // 是否去掉刻度线
              show: false,
            },
            axisLine: {
              // x轴
              show: true,
              onZero: true,
              lineStyle: {
                color: '#EEF1F5', // y轴刻度字颜色
                type: 'solid',
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '', // 就诊人数 柱形图用
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: { // 刻度值
              formatter: '{value}',
              textStyle: {
                color: '#333333',
                fontSize: 10,
              },
            },
            splitLine: {
              show: true, // 网格线
              lineStyle: {
                color: '#EEF1F5', // y轴刻度字颜色
                type: 'solid',
              },
            },
            splitArea: {
              show: false,
            }, // 保留网格区域
            axisLine: {
              // y轴
              onZero: true,
              lineStyle: {
                color: '#EEF1F5', // y轴刻度字颜色
                type: 'solid',
              },
            },
            axisTick: { // y轴刻度
              show: false,
            },
            // splitNumber: 4, // y轴刻度个数
            /* splitArea: {
              show: false,
            },*/
          },
          {
            type: 'value',
            name: '', // 就诊费用 折线图用
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: { // 刻度值
              formatter: '{value}',
              textStyle: {
                color: '#333333',
                fontSize: 10,
              },
            },
            splitLine: {
              show: true, // 网格线
              lineStyle: {
                color: '#EEF1F5', // y轴刻度字颜色
                type: 'solid',
              },
            },
            splitArea: {
              show: false,
            }, // 保留网格区域
            axisLine: {
              // y轴
              onZero: true,
              lineStyle: {
                color: '#EEF1F5', // y轴刻度字颜色
                type: 'solid',
              },
            },
            axisTick: { // y轴刻度
              show: false,
            },
            // splitNumber: 4, // y轴刻度个数
          },
        ],
        series: [
          {
            name: '已就诊',
            type: 'bar',
            barWidth: 16,
            itemStyle: {
              normal: {
                barBorderRadius: [15, 15, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#3154AC',
                  },
                  {
                    offset: 1,
                    color: '#4B86FF',
                  },
                ]),
              },
            },
            data: [17.0, 9.9, 17.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 26.5, 33.3],
          },
          {
            name: '未就诊',
            type: 'bar',
            barWidth: 16,
            itemStyle: {
              normal: {
                barBorderRadius: [15, 15, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#FA912B',
                  },
                  {
                    offset: 1,
                    color: '#EAAF75',
                  },
                ]),
              },
            },
            data: [12.6, 3.9, 19.0, 26.4, 28.7, 70.7, 175.6, 192.2, 48.7, 18.8, 16.0, 22.3],
          },
          {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1,
            smooth: true, // 线段是否平滑
            symbolSize: 1, // 设定实心点的大小
            animationDuration: 2000, // 展示动画时间
            animationEasing: 'cubicInOut', // 折线展示的动画
            itemStyle: {
              normal: {
                color: '#36BF2F', // hover的tip点的颜色
                lineStyle: {
                  color: '#36BF2F', // 线段颜色
                  width: 2, // 线段宽度
                },
              },
            },
            data: [20.6, 12.2, 13.3, 14.5, 16.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
          },
        ],
      };
      this.sectionName.forEach((sectionNameValue, index) => {
        this.chart.hideLoading();
        console.log(sectionNameValue);
        console.log(index);
        /* option.series.push({
          name: sectionNameValue,
          itemStyle: {
            normal: {
              color: '#3154AC', // hover的tip点的颜色
              lineStyle: {
                color: '#3154AC', // 线段颜色
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
                color: '#3154AC90', // 第一颜色
              },
              {
                offset: 1,
                color: '#3154AC90', // 渐变颜色
              },
            ]),
          },
          symbolSize: 1, // 设定实心点的大小
          data: this.chartData[index],
          animationDuration: 2000, // 展示动画时间
          animationEasing: 'cubicInOut', // 折线展示的动画
        });*/
      });
      this.chart.setOption(option, true);
    },
  },
};
</script>
