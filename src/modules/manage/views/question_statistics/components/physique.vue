<template>
  <div id="myChart" style="width: 100%; height: 100%"></div>
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
      lifeList: [],
    };
  },
  methods: {
    draw() {
      // 实例化echarts对象
      const myChartDrawer = echarts.init(document.getElementById('myChart'));
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
          data: [
            '是',
            '基本是/倾向是',
            '否',
          ],
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
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
          data: [],
        },
        series: [
          {
            name: '是',
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
                // barBorderRadius: [0, 15, 15, 0],
                color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                  {
                    offset: 0,
                    color: '#4B86FF',
                  },
                  {
                    offset: 1,
                    color: '#3154AC',
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
            name: '基本是/倾向是',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [],
            itemStyle: {
              normal: {
                // 柱形图圆角，初始化效果
                // barBorderRadius: [0, 15, 15, 0],
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
            name: '否',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [],
            itemStyle: {
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [0, 15, 15, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#F6F8FC',
                  },
                  {
                    offset: 1,
                    color: '#F6F8FC',
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
      this.lifeList.forEach((element) => {
        option.yAxis.data.push(element.paramName);
        option.series[0].data.push(element.judgeResultMapList[0].yesCount);
        option.series[1].data.push(element.judgeResultMapList[1].basicCount);
        option.series[2].data.push(element.judgeResultMapList[2].noCount);
      });
      myChartDrawer.setOption(option);
    },
    async queryList() {
      const res = await this.$api.statics.lifedoctorList({
        ...this.data,
      });
      this.lifeList = res.data.data;
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
