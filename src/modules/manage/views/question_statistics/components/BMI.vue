<template>
  <div id="myChart" style="width: 100%; height: 100%"></div>
</template>
<script>
import echarts from 'echarts';
export default {
  name: 'lifestyle',
  props: {
    data: Object,
  },
  data() {
    return {};
  },
  methods: {
    draw() {
      // 实例化echarts对象
      const myChartDrawer = echarts.init(document.getElementById('myChart'));

      // 绘制条形图
      const option = {
        title: {
          text: '',
          top: 5,
          right: 5,
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              opacity: 0,
            },
          },
        },
        legend: {
          data: ['男性', '女性'],
          top: 5,
          right: 5,
          icon: 'circle',
        },
        // X轴
        xAxis: {
          data: ['未知', '偏瘦', '正常', '偏高', '肥胖'],
          axisLabel: {
            show: true,
          },
        },
        // Y轴
        yAxis: {
          // y 轴线
          axisLine: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#eef1f5'],
              width: 1,
              type: 'solid',
            },
          },
        },
        // 数据
        series: [
          {
            name: '男性',
            type: 'bar',
            data: [120, 100, 440, 320, 250],
            barWidth: 25, // 柱图宽度
            itemStyle: {
              normal: {
                // 柱形图圆角，初始化效果
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
                // label: {
                //   show: true, // 开启显示
                //   position: 'top', // 在上方显示
                //   textStyle: {
                //     // 数值样式
                //     color: '#333',
                //     fontSize: 14,
                //   },
                // },
              },
            },
          },
          {
            name: '女性',
            type: 'bar',
            data: [200, 120, 240, 330, 220],
            barWidth: 25, // 柱图宽度
            itemStyle: {
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [15, 15, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#F33D21',
                  },
                  {
                    offset: 1,
                    color: '#FF5085',
                  },
                ]),
              },
            },
          },
        ],
      };
      // option.series[0].data = data;
      myChartDrawer.setOption(option);
    },
  },
  mounted() {
    console.log(this.data, 123456);
    // 调用绘制图表的方法
    this.draw();
  },
};
</script>

<style lang="scss" scoped>
</style>
