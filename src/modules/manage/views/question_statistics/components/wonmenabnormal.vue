<template>
  <div style="display: flex; width: 100%; height: 100%; flex-wrap: wrap">
    <div id="myChart" style="width: 100%; height: 100%"></div>
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
    return {};
  },
  methods: {
    draw() {
      // 实例化echarts对象
      const myChartDrawer = echarts.init(document.getElementById('myChart'));
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
          data: [],
        },
        series: [
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
            barGap: '-100%',
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
          {
            type: 'bar',
            barWidth: 16,
            z: 0,
            data: [],
            itemStyle: {
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [15, 15, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 1,
                    color: '#F6F8FC',
                  },
                  {
                    offset: 0,
                    color: '#F6F8FC',
                  },
                ]),
              },
            },
          },
        ],
      };
      const data = [];
      this.toplist.forEach((element) => {
        option.xAxis.data.push(element.abnormalName);
        data.push(element.codeCount);
      });
      let max = 0;
      const bgData = [];
      data.forEach((item) => {
        if (max < item) max = item;
      });
      data.forEach(() => {
        bgData.push(Number(max) + 5);
      });
      option.series[0].data = data;
      option.series[1].data = bgData;
      myChartDrawer.setOption(option);
    },
    // top10数据
    async queryList() {
      const res = await this.$api.statics.womanabnormalclientList({
        ...this.data,
      });
      this.toplist = res.data.data;
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
