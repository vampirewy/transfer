<template>
  <div id="diet-distribution"></div>
</template>
<script>
import * as echarts from 'echarts';
const options = {
    tooltip: {
        trigger: 'item',
    },
    legend: {
        bottom: '0%',
        left: 'center',
        itemWidth :10,
        itemHeight:10,
        textStyle:{
            color:'#666666',
        }
    },
    series: [
        {
            name: '三餐能量分配比',
            type: 'pie',
            radius: ['45%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                position: 'inside',
                formatter:'{c}'
            },
            emphasis: {
                label: {
                    show: false,
                    fontSize: '40',
                    fontWeight: 'bold',
                }
            },
            labelLine: {
                show: false,
            },
            data: [
                { value: 30, name: '早餐',itemStyle:{color:'#806CE5'} },
                { value: 40, name: '午餐',itemStyle:{color:'#3154AC'} },
                { value: 30, name: '晚餐',itemStyle:{color:'#36BF2F'}}
            ]
        }
    ]
};
export default {
  mounted() {
      let myChart = echarts.init(document.getElementById('diet-distribution'));
      myChart.setOption(options);
  },
};
</script>
<style lang="scss" scoped>
#diet-distribution {
  width: 100%;
  height: 270px;
}
</style>