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
                { value: 15, name: '早餐',itemStyle:{color:'#806CE5'} },
                { value: 30, name: '午餐',itemStyle:{color:'#3154AC'} },
                { value: 55, name: '晚餐',itemStyle:{color:'#36BF2F'}}
            ]
        }
    ]
};
export default options;