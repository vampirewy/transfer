export default class Charts {
  constructor(props) {
    this.$echarts = props.$echarts;
    this.interval = null;
    this.currentIndex = -1;
    this.myChart = null;

    this.colorTheme = '#ffffff';
    this.lineStyleColor = 'rgba(255, 255, 255, 0.4)';
    this.lineStyleColorCenterZero = 'rgba(200, 0, 0, 0.4)';
    this.inactiveColor = '#999';
    this.splitLineColor = 'rgba(255, 255, 255, 0.1)';

    this.colorList = [
      '#3AA1FF', // 蓝
      '#4ECB73', // 绿
      '#FBD437', // 黄
      '#F04864', // 红
      '#975Fe5', // 紫
      '#36CBCB', // 青
      '#e03997', // 粉
      '#f37b1d', // 橙
      '#a5673f', // 棕
    ];

    this.gradientColorList = [
      ['#02B8F5', '#0967BC'],
      ['#02F5AD', '#0B9267'],
      ['#D5F302', '#B4C008'],
      ['#ff7875', '#f5222d'],
      ['#975Fe5', '#975Fe5'],
      ['#975Fe5', '#975Fe5'],
      // ['#975Fe5', '#975Fe5'],
      // ['#975Fe5', '#975Fe5'],
    ];

    this.newGradientColorList = [];

    this.colorObj = {
      blue: 0,
      green: 1,
      yellow: 2,
      red: 3,
      purple: 4,
      cyan: 5,
      pink: 6,
      orange: 7,
    };

    this.grid = {
      top: '15%',
      bottom: '15%',
      left: '4%',
      right: '0%',
    };

    this.axisLabelRotate = 0; // xAxis名称倾斜角度
  }

  setCharts(params) {
    const {
      id,
      legend,
      yAxisName,
      xAxis,
      yList,
      tooltipUnit,
      color = [],
      boundaryGap = ['0%', '40%'],
      gradientColor = true,
      centerZero = false,
      oblique = false,
      dark = false,
    } = params;

    this.legend = legend;
    this.yAxisName = yAxisName;
    this.xAxis = xAxis;
    this.data = yList;
    this.boundaryGap = boundaryGap;
    this.tooltipUnit = tooltipUnit;
    this.gradientColor = gradientColor;
    this.centerZero = centerZero;
    this.oblique = oblique;

    const element = document.getElementById(id);
    this.myChart = this.$echarts.init(element);

    const onResize = () => {
      this.myChart.resize();
    };

    window.addEventListener('resize', onResize);

    /* 是否为暗黑模式*/
    if (!dark) {
      this.colorTheme = '#333';
      this.lineStyleColor = 'rgba(0,0,0, 0.4)';
      this.inactiveColor = '#999';
      this.splitLineColor = 'rgba(0,0,0, 0.1)';
    }

    // 如果xAxis名称太挤，倾斜角度设置为24
    if (oblique) {
      this.axisLabelRotate = 24;
      this.grid.bottom = '22%';
    }

    /* 自定义颜色*/
    let colorList = [];
    let gradientColorList = [];

    if (!color.length) {
      colorList = this.colorList;
      gradientColorList = this.gradientColorList;
    } else {
      color.map((m) => {
        colorList.push(this.colorList[this.colorObj[m]]);
        gradientColorList.push(this.gradientColorList[this.colorObj[m]]);
        return true;
      });
      if (color.length < this.data.length) {
        console.log('颜色不足');
        // let differ = data.length - color.length
      }
    }
    this.newGradientColorList = gradientColorList;

    const option = {
      color: this.colorList,
      grid: this.grid,
      legend: this.setLegend(),
      tooltip: this.setTooltip(),
      xAxis: this.setXAxis(),
      yAxis: this.setYAxis(),
      series: this.setSeries(),
    };

    this.myChart.setOption(option);
  }

  setLegend() {
    return {
      data: this.legend,
      top: 10,
      itemGap: 30, // 图例每项之间的间隔
      inactiveColor: this.inactiveColor, // 图例关闭时的颜色。
      textStyle: {
        color: this.colorTheme, // 图例的公用文本样式。
      },
      icon: 'circle', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
    };
  }

  setTooltip() {
    const obj = {
      trigger: 'axis',
      confine: true, // 将 tooltip 框限制在图表的区域内。
      axisPointer: {
        type: 'line', // 直线指示器 //shadow,cross
      },
    };
    if (!this.tooltipUnit) {
      return obj;
    }
    obj.formatter = (params) => {
      let html = params[0].name;
      const marker = params[0].marker.replace('style="', 'style="opacity:0;');
      params.map((m) => {
        const mi = m;
        if (mi.marker.includes('[object Object]')) {
          mi.marker = mi.marker.replace(
            '[object Object]',
            mi.color.colorStops[0].color,
          );
        }
        if (m.seriesName) {
          html += `<br />${m.marker} ${m.seriesName}：${m.value} ${this.tooltipUnit}`;
        } else {
          html += `<br />${m.marker} ${m.value} ${this.tooltipUnit}`;
        }
        return true;
      });
      return `${html}${marker}`;
    };
    return obj;
  }

  setXAxis() {
    return {
      type: 'category',
      data: this.xAxis,
      axisLabel: {
        rotate: this.axisLabelRotate,
        textStyle: {
          color: this.colorTheme,
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: this.centerZero
            ? this.lineStyleColorCenterZero
            : this.lineStyleColor,
        },
      },
      interval: 0,
    };
  }

  setYAxis() {
    const obj = {
      type: 'value',
      name: this.yAxisName,
      boundaryGap: this.boundaryGap,
      nameTextStyle: {
        color: this.colorTheme,
      },
      axisLabel: {
        textStyle: {
          color: this.colorTheme,
        },
      },
      axisLine: {
        lineStyle: {
          color: this.lineStyleColor,
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: this.splitLineColor,
        },
      },
    };

    return obj;
  }

  setSeries() {
    const seriesOptions = {
      data: this.data,
      name: '',
      type: 'line',
      smooth: true,
      symbol: 'circle', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      label: {
        normal: {
          show: false,
          position: 'top',
          textStyle: {
            color: this.colorTheme,
          },
        },
      },
      itemStyle: {
        normal: {},
      },
      areaStyle: {
        opacity: 0.15,
      },
    };

    return seriesOptions;
  }

  bind() {
    if (this.myChart) {
      this.highlight();
      this.autoPlay();

      this.myChart.off('mouseover');
      this.myChart.on('mouseover', () => {
        if (this.interval) {
          clearInterval(this.interval);
        }
        this.myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.currentIndex,
        });
      });
      this.myChart.off('mouseout');
      this.myChart.on('mouseout', () => {
        this.highlight();
        this.autoPlay();
      });
    }
  }

  highlight() {
    const dataLength = this.myChart.getOption().series[0].data.length;

    this.myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: this.currentIndex,
    });

    this.currentIndex = (this.currentIndex + 1) % dataLength;

    this.myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: this.currentIndex,
    });

    this.myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: this.currentIndex,
    });
  }

  autoPlay() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      this.highlight();
    }, 3000);
  }
}
