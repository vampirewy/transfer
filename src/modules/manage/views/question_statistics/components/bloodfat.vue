<template>
  <div style="display: flex; width: 100%; height: 100%; flex-wrap: wrap">
    <div id="myChart" style="width: 50%; height: 100%"></div>
    <div id="myCharts" style="width: 50%; height: 100%"></div>
    <div id="myChartes" style="width: 50%; height: 100%"></div>
    <div id="myChartess" style="width: 50%; height: 100%"></div>
  </div>
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
      const myChartDrawers = echarts.init(document.getElementById('myCharts'));
      const myChartDraweres = echarts.init(
        document.getElementById('myChartes'),
      );
      const myChartDraweress = echarts.init(
        document.getElementById('myChartess'),
      );
      // 绘制条形图
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
            shadowStyle: {
              opacity: 0,
            },
          },
        },
        legend: {
          data: ['男', '女'],
          top: 5,
          right: 5,
          icon: 'circle',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        yAxis: {
          type: 'value',
        },
        xAxis: {
          type: 'category',
          data: [
            '未知',
            '偏低',
            '正常',
            '偏高',
          ],
        },
        series: [
          {
            name: '男',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [320, 302, 301, 234],
            barWidth: 16, // 柱图宽度
            itemStyle: {
              color: 'red',
              normal: {
                // 柱形图圆角，初始化效果
                // barBorderRadius: [0, 15, 15, 0],
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 1,
                    color: '#3154AC',
                  },
                  {
                    offset: 0,
                    color: '#4B86FF',
                  },
                ]),
                label: {
                  show: false, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: '#333',
                    fontSize: 14,
                  },
                },
              },
            },
          },
          {
            name: '女',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [120, 132, 101, 134],
            barWidth: 16, // 柱图宽度
            itemStyle: {
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [15, 15, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 1,
                    color: '#F33D21',
                  },
                  {
                    offset: 0,
                    color: '#FF5085',
                  },
                ]),
                label: {
                  show: false, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: '#333',
                    fontSize: 14,
                  },
                },
              },
            },
          },
          // {
          //   name: '否',
          //   type: 'bar',
          //   stack: 'total',
          //   label: {
          //     show: true,
          //   },
          //   emphasis: {
          //     focus: 'series',
          //   },
          //   data: [220, 182, 191, 234, 290, 330, 310],
          //   barWidth: 25, // 柱图宽度
          //   itemStyle: {
          //     normal: {
          //       // 柱形图圆角，初始化效果
          //       barBorderRadius: [15, 15, 0, 0],
          //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //         {
          //           offset: 0,
          //           color: '#F6F8FC',
          //         },
          //         {
          //           offset: 1,
          //           color: '#F6F8FC',
          //         },
          //       ]),
          //       label: {
          //         show: false, // 开启显示
          //         position: 'top', // 在上方显示
          //         textStyle: {
          //           // 数值样式
          //           color: '#333',
          //           fontSize: 14,
          //         },
          //       },
          //     },
          //   },
          // },
        ],
      };
      myChartDrawer.setOption(option);
      myChartDrawers.setOption(option);
      myChartDraweres.setOption(option);
      myChartDraweress.setOption(option);
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
