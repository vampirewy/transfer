<template>
  <div class="health-monitor-trend">
    <div class="formSearchTitle" style="font-size: 14px">
          <span class="dianLv"></span>运动监测
        </div>
        <div class="chart-legend">
      <span>步数</span>
    </div>
    <line-chart
          v-if="elist.length > 0"
          :chart-data="yData"
          :sectionName="['步数']"
          :sectionXList="xData">
        </line-chart>
        <div class="noneText" v-else>
        <img src="@/assets/images/noData.png"/>
          <p>暂时为空</p>
      </div>
        <div class="formSearchTitle" style="font-size: 14px">
          <span class="dianLv"></span>列表
        </div>
  </div>
</template>

<script>
import * as dayjs from 'dayjs';
import LineChart from '../components/line_chart.vue';
export default {
  name: 'BPTrend',
  props: ['id', 'ids'],
  components: {
    LineChart,
  },
  data() {
    return {
      table: {
        columns: [
          { label: '姓名', prop: 'clientName' },
          { label: '数据时间', prop: 'testDate' },
          { label: '运动时间', prop: 'sportTime' },
          { label: '运动路程', prop: 'sportDistance' },
          { label: '消耗kcal', prop: 'kcal' },
          { label: '运动步数', prop: 'steps' },
        ],
        list: [],
        total: 0,
        pageNo: 1,
        pageSize: 15,
      },
      elist: [],
      xData: [],
      yData: [],
      Name: '',
      queryInfo: {},
    };
  },
  mounted() {
    this.queryChartData();
    // this.queryChartInfo();
  },
  methods: {
    queryChartData() {
      this.$api.healthMonitorInterface.getSportChart(this.id).then(({ data }) => {
        const xData = [];
        const yData = [];
        this.elist = data.data;
        (data.data || []).forEach((item) => {
          let dateStr;
          if (new Date(item.testDate).getFullYear() === new Date().getFullYear()) {
            dateStr = dayjs(item.testDate).format('MM/DD');
          } else {
            dateStr = dayjs(item.testDate).format('YY/MM/DD');
          }
          xData.push(dateStr);
          yData.push(item.steps);
        });
        this.xData = xData;
        this.yData = [yData];
      });
    },
    // queryPageList() {
    //   this.$api.healthMonitorInterface.getSportList({
    //     clientId: this.id,
    //     pageNo: this.table.pageNo,
    //     pageSize: this.table.pageSize,
    //   }).then(({ data }) => {
    //     this.table.total = data.data.total;
    //     this.table.list = data.data.data;
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.health-monitor-trend{
  position: relative;
  margin-top: 20px;
}
.chart-legend {
      text-align: right;
      margin-top: -20px;
      > span {
        font-size: 12px;
        font-weight: 400;
        color: #97A6BD;
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
          background: #4991FD;
        }
        &:nth-of-type(2):after {
          background: #31C529;
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
    background: #3154AC;
    margin-left: 10px;
    border-radius: 1px;
    position: absolute;
    margin-top: 17px;
    opacity: 0.5;
  }
.lookPressure{
  display: flex;
  margin:20px 0 20px 0;
  div{
    width: 25%;
    padding-left: 20px;
    font-size: 14px;
    color: #333333;
  }
}
</style>
