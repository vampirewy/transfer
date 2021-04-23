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
                formatter:'{b}'
            },
            emphasis: {
                label: {
                    show: false,
                    fontSize: '40',
                    fontWeight: 'bold',
                }
            },
            data: [
                { value: 30, name: '其他',itemStyle:{color:'#3154AC'} },
                { value: 15, name: '30%~50%',itemStyle:{color:'#36BF2F'} },
            ]
        }
    ]
};
export default options;