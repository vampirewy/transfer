<template>
  <div class="health-monitor-trend">
    <div class="formSearchTitle" style="font-size: 14px">
          <span class="dianLv"></span>血压趋势
        </div>
        <div class="chart-legend">
      <span>收缩压</span>
      <span>舒张压</span>
    </div>
        <line-chart
          :chart-data="yData"
          :sectionName="['收缩压', '舒张压']"
          :sectionXList="xData">
        </line-chart>
        <div class="formSearchTitle" style="font-size: 14px">
          <span class="dianLv"></span>列表
        </div>
  </div>
</template>

<script>
import LineChart from '../components/line_chart.vue';
import * as dayjs from 'dayjs';
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
          { label: '收缩压', prop: 'sbp' },
          { label: '舒张压', prop: 'dbp' },
          { label: '脉搏', prop: 'hd' },
          { label: '备注', prop: 'hd' },
        ],
        list: [],
        total: 0,
        pageNo: 1,
        pageSize: 15,
      },
      xData: [],
      yData: [],
      Name: '',
      queryInfo: {},
    };
  },
  mounted() {
    console.log(this.id, this.ids, '血压新增');
    this.queryChartData();
    this.queryPageList();
    // this.queryChartInfo();
  },
  methods: {
    queryChartData() {
      this.$api.healthMonitorInterface.getBPChart(this.id).then(({ data }) => {
        const xData = [];
        const sbp = [];
        const dbp = [];
        (data.data || []).forEach((item) => {
          let dateStr;
          if (new Date(item.testDate).getFullYear() === new Date().getFullYear()) {
            dateStr = dayjs(item.testDate).format('MM/DD');
          } else {
            dateStr = dayjs(item.testDate).format('YY/MM/DD');
          }
          xData.push(dateStr);
          sbp.push(item.sbp);
          dbp.push(item.dbp);
        });
        this.xData = xData;
        this.yData = [sbp, dbp];
      });
    },
    queryPageList() {
      this.$api.healthMonitorInterface.getBPList({
        clientId: this.id,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      }).then(({ data }) => {
        this.table.total = data.data.total;
        this.table.list = data.data.data;
      });
    },
    handlePageChange(page) {
      this.table.pageNo = page;
      this.queryPageList();
    },
    handleSizeChange(size) {
      this.table.pageSize = size;
      this.queryPageList();
    },
    blackReturn() {
      this.$emit('messageData', true, true);
    },
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
