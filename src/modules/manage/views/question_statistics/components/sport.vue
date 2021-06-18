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
          data: [],
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
            data: [],
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
            name: '女性',
            type: 'bar',
            data: [],
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
      this.lifeList.forEach((element) => {
        option.xAxis.data.push(element.codeName);
        option.series[0].data.push(element.genderMapCount[0].manCount);
        option.series[1].data.push(element.genderMapCount[1].womanCount);
      });
      myChartDrawer.setOption(option);
    },
    async queryList() {
      const res = await this.$api.statics.lifeclientList({
        ...this.data,
        type: 6,
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
