<template>
  <div id="diet-protein-proportion"></div>
</template>
<script>
import * as echarts from 'echarts';
const options = {
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: '动物性及豆类蛋白质占总蛋白质比例',
      type: 'pie',
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'inside',
        formatter: '{b}',
      },
      emphasis: {
        label: {
          show: false,
          fontSize: '40',
          fontWeight: 'bold',
        },
      },
      data: [
        { value: 30, name: '其他', itemStyle: { color: '#3154AC' } },
        { value: 15, name: '30%~50%', itemStyle: { color: '#36BF2F' } },
      ],
    },
  ],
};
export default {
  mounted() {
    const myChart = echarts.init(
      document.getElementById('diet-protein-proportion'),
    );
    myChart.setOption(options);
  },
};
</script>
<style lang="scss" scoped>
#diet-protein-proportion {
  width: 100%;
  height: 270px;
}
</style>
