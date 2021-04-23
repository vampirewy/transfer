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
            name: '三大营养素供能比',
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
                { value: 15, name: '蛋白质',itemStyle:{color:'#806CE5'} },
                { value: 30, name: '脂肪',itemStyle:{color:'#36BF2F'} },
                { value: 55, name: '碳水化合物',itemStyle:{color:'#3154AC'}}
            ]
        }
    ]
};
export default options;