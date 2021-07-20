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
    data: Array,
  },
  data() {
    return {
      bloodfat: [],
      bloodfats: [],
      bloodfates: [],
      bloodfatess: [],
    };
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
        title: {
          text: '总胆固醇',
          top: 5,
          left: 5,
          textStyle: {
            fontSize: 14,
          },
        },
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
        // legend: {
        //   data: ['男', '女'],
        //   top: 5,
        //   right: 5,
        //   icon: 'circle',
        // },
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
          data: [],
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
            data: [],
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
            data: [],
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
        ],
      };
      const options = {
        title: {
          text: '甘油三酯',
          top: 5,
          left: 5,
          textStyle: {
            fontSize: 14,
          },
        },
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
          data: [],
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
            data: [],
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
            data: [],
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
        ],
      };
      const optiones = {
        title: {
          text: '高密度脂蛋白分布情况',
          top: 5,
          left: 5,
          textStyle: {
            fontSize: 14,
          },
        },
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
        // legend: {
        //   data: ['男', '女'],
        //   top: 5,
        //   right: 5,
        //   icon: 'circle',
        // },
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
          data: [],
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
            data: [],
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
            data: [],
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
        ],
      };
      const optioness = {
        title: {
          text: '低密度脂蛋白分布情况',
          top: 5,
          left: 5,
          textStyle: {
            fontSize: 14,
          },
        },
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
        // legend: {
        //   data: ['男', '女'],
        //   top: 5,
        //   right: 5,
        //   icon: 'circle',
        // },
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
          data: [],
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
            data: [],
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
            data: [],
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
        ],
      };
      this.bloodfat.forEach((element) => {
        option.xAxis.data.push(element.resultName);
        option.series[0].data.push(element.genderMapCount[0].manCount);
        option.series[1].data.push(element.genderMapCount[1].womanCount);
      });
      this.bloodfats.forEach((element) => {
        options.xAxis.data.push(element.resultName);
        options.series[0].data.push(element.genderMapCount[0].manCount);
        options.series[1].data.push(element.genderMapCount[1].womanCount);
      });
      this.bloodfates.forEach((element) => {
        optiones.xAxis.data.push(element.resultName);
        optiones.series[0].data.push(element.genderMapCount[0].manCount);
        optiones.series[1].data.push(element.genderMapCount[1].womanCount);
      });
      this.bloodfatess.forEach((element) => {
        optioness.xAxis.data.push(element.resultName);
        optioness.series[0].data.push(element.genderMapCount[0].manCount);
        optioness.series[1].data.push(element.genderMapCount[1].womanCount);
      });
      myChartDrawer.setOption(option);
      myChartDrawers.setOption(options);
      myChartDraweres.setOption(optiones);
      myChartDraweress.setOption(optioness);
    },
    // 血压图表数据
    async queryList() {
      const res = await this.$api.statics.reportList({
        ...this.data,
        type: 4,
      });
      this.bloodfat = res.data.data;
      // 血脂
      const item = await this.$api.statics.reportList({
        ...this.data,
        type: 5,
      });
      this.bloodfats = item.data.data;
      const reses = await this.$api.statics.reportList({
        ...this.data,
        type: 6,
      });
      this.bloodfates = reses.data.data;
      // 血脂
      const itemes = await this.$api.statics.reportList({
        ...this.data,
        type: 7,
      });
      this.bloodfatess = itemes.data.data;
      // 调用绘制图表的方法
      this.draw();
    },
  },
  mounted() {
    this.queryList();
  },
};
</script>

<style lang="scss" scoped>
</style>
