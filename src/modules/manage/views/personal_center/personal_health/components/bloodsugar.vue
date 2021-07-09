<template>
  <div class="health-monitor-trend">
    <div class="formSearchTitle" style="font-size: 14px">
      <span class="dianLv"></span>血糖监测
    </div>
    <div class="chart-legend">
      <span @click="fastblood">空腹血糖</span>
      <span @click="afterfastblood">餐后血糖</span>
    </div>
    <div v-if="active == 1">
      <div v-if="elist.length > 0">
        <line-chart
          :chart-data="yData"
          :sectionName="['空腹血糖']"
          :sectionXList="xData"
        >
        </line-chart>
      </div>
      <div class="noneText" v-else>
        <img src="@/assets/images/noData.png" />
        <p>暂时为空</p>
      </div>
    </div>
    <div v-if="active == 2">
      <div v-if="elist2.length > 0">
        <line-charts
          :chart-data="afteryData"
          :sectionName="['餐后血糖']"
          :sectionXList="afterxData"
        >
        </line-charts>
      </div>
      <div class="noneText" v-else>
        <img src="@/assets/images/noData.png" />
        <p>暂时为空</p>
      </div>
    </div>
    <div class="formSearchTitle" style="font-size: 14px">
      <span class="dianLv"></span>列表
    </div>
  </div>
</template>

<script>
import * as dayjs from 'dayjs';
import LineChart from '../components/line_chart.vue';
import LineCharts from '../components/linecharts.vue';
export default {
  name: 'BPTrend',
  props: ['id', 'ids'],
  components: {
    LineChart,
    LineCharts,
  },
  data() {
    return {
      table: {
        columns: [
          { label: '姓名', prop: 'clientName' },
          { label: '数据时间', prop: 'testDate' },
          { label: '血糖类型', prop: 'sugarTypeName' },
          { label: '血糖值', prop: 'sugar' },
          { label: '备注', prop: 'sugar' },
        ],
        list: [],
        total: 0,
        pageNo: 1,
        pageSize: 15,
      },
      active: 1,
      elist: [],
      elist2: [],
      xData: [],
      yData: [],
      afterxData: [],
      afteryData: [],
      Name: '',
      queryInfo: {},
    };
  },
  mounted() {
    this.queryChartData();
  },
  methods: {
    fastblood() {
      this.active = 1;
    },
    afterfastblood() {
      this.active = 2;
    },
    queryChartData() {
      this.$api.healthMonitorInterface.getBGChart(this.id).then(({ data }) => {
        if (data.data['空腹血糖']) {
          this.elist = data.data['空腹血糖'];
        }
        if (data.data['餐后血糖']) {
          this.elist2 = data.data['餐后血糖'];
        }
        const xData = [];
        const xDataes = [];
        const FPG = []; // 空腹血糖
        const PBG = []; // 餐后血糖
        // console.log(data.data['空腹血糖']);
        (data.data['空腹血糖'] || []).forEach((item) => {
          let dateStr;
          if (
            new Date(item.testDate).getFullYear() === new Date().getFullYear()
          ) {
            dateStr = dayjs(item.testDate).format('MM/DD');
          } else {
            dateStr = dayjs(item.testDate).format('YY/MM/DD');
          }
          xData.push(dateStr);
          FPG.push(item.sugar);
        });
        (data.data['餐后血糖'] || []).forEach((item) => {
          let dateStres;
          if (
            new Date(item.testDate).getFullYear() === new Date().getFullYear()
          ) {
            dateStres = dayjs(item.testDate).format('MM/DD');
          } else {
            dateStres = dayjs(item.testDate).format('YY/MM/DD');
          }
          xDataes.push(dateStres);
          PBG.push(item.sugar);
        });
        this.xData = xData;
        this.afterxData = xDataes;
        this.yData = [FPG];
        this.afteryData = [PBG];
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.health-monitor-trend {
  position: relative;
  margin-top: 20px;
}
.chart-legend {
  text-align: right;
  margin-top: -20px;
  > span {
    font-size: 12px;
    font-weight: 400;
    color: #97a6bd;
    line-height: 17px;
    padding-left: 18px;
    position: relative;
    + span {
      margin-left: 40px;
    }
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 3px;
    }
    &:first-child:after {
      background: #4991fd;
    }
    &:nth-of-type(2):after {
      background: #31c529;
    }
  }
}
.titless {
  position: relative;
  padding-left: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  line-height: 25px;
  margin-bottom: 20px;
}
.lines {
  width: 36px;
  height: 4px;
  background: #3154ac;
  margin-left: 10px;
  border-radius: 1px;
  position: absolute;
  margin-top: 17px;
  opacity: 0.5;
}
.lookPressure {
  display: flex;
  margin: 20px 0 20px 0;
  div {
    width: 25%;
    padding-left: 20px;
    font-size: 14px;
    color: #333333;
  }
}
</style>
