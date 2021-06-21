<template>
  <div style="display: flex; width: 100%; height: 100%">
    <div id="myChart" style="width: 100%; height: 100%"></div>
    <div id="myCharts" style="width: 100%; height: 100%"></div>
  </div>
</template>
<script>
import echarts from 'echarts';
export default {
  name: 'lifestyle',
  // props: {
  //   data: Object,
  // },
  data() {
    return {
      blood: [],
      bloodfat: [],
      form: {
        keywords: '',
        startTime: '', // 开始时间
        endTime: '', // 结束时间
      },
    };
  },
  methods: {
    draw() {
      // 实例化echarts对象
      const myChartDrawer = echarts.init(document.getElementById('myChart'));
      const myChartDrawers = echarts.init(document.getElementById('myCharts'));
      // 绘制条形图
      const option = {
        title: {
          text: '血压分布情况',
          top: 5,
          left: 5,
          textStyle: {
            fontSize: 14,
          },
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
        // legend: {
        //   data: ['男性', '女性'],
        //   top: 5,
        //   right: 5,
        //   icon: 'circle',
        // },
        // X轴
        xAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#eef1f5'],
              width: 1,
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
          },
          // y 轴线
          axisLine: {
            show: false,
          },
        },
        // Y轴
        yAxis: {
          type: 'category',
          data: [],
        },
        // 数据
        series: [
          {
            name: '男性',
            type: 'bar',
            data: [],
            barWidth: 16, // 柱图宽度
            itemStyle: {
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [0, 15, 15, 0],
                color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
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
            data: [],
            barWidth: 16, // 柱图宽度
            itemStyle: {
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [0, 15, 15, 0],
                color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
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
      const options = {
        title: {
          text: '血糖分布情况',
          top: 5,
          left: 5,
          textStyle: {
            fontSize: 14,
          },
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
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#eef1f5'],
              width: 1,
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
          },
          // y 轴线
          axisLine: {
            show: false,
          },
        },
        // Y轴
        yAxis: {
          type: 'category',
          data: [],
        },
        // 数据
        series: [
          {
            name: '男性',
            type: 'bar',
            data: [],
            barWidth: 16, // 柱图宽度
            itemStyle: {
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [0, 15, 15, 0],
                color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
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
            data: [],
            barWidth: 16, // 柱图宽度
            itemStyle: {
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [0, 15, 15, 0],
                color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
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
      this.blood.forEach((element) => {
        option.yAxis.data.push(element.resultName);
        option.series[0].data.push(element.genderMapCount[0].manCount);
        option.series[1].data.push(element.genderMapCount[1].womanCount);
      });
      this.bloodfat.forEach((element) => {
        options.yAxis.data.push(element.resultName);
        options.series[0].data.push(element.genderMapCount[0].manCount);
        options.series[1].data.push(element.genderMapCount[1].womanCount);
      });
      myChartDrawer.setOption(option);
      myChartDrawers.setOption(options);
    },
    // 血压图表数据
    async queryList() {
      const res = await this.$api.statics.reportList({
        ...this.form,
        type: 2,
      });
      this.blood = res.data.data;
      // 血脂
      const item = await this.$api.statics.reportList({
        ...this.form,
        type: 3,
      });
      this.bloodfat = item.data.data;
      this.draw();
    },
  },
  mounted() {
    this.queryList();
    // 调用绘制图表的方法
    // this.draw();
  },
};
</script>

<style lang="scss" scoped>
</style>
