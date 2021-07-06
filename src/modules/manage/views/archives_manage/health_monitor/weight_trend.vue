<template>
  <div class="health-monitor-trend">
    <div class="divRightTitleDiv">
      <div class="divRightTitle">查看-体重
        <div class="titleBiao"></div></div>
    </div>
    <div class="lookPressure">
      <div><span class="lookPressureTitle">姓名：</span><span>{{queryInfo.clientName}}</span></div>
      <div><span class="lookPressureTitle">性别：</span>
      <span v-if="queryInfo.gender === 1">男</span>
      <span v-if="queryInfo.gender === 2">女</span>
      </div>
      <div><span class="lookPressureTitle">年龄：</span><span>{{queryInfo.age}} 岁</span></div>
      <div><span class="lookPressureTitle">客户编号：</span><span>{{queryInfo.clientNo}}</span></div>
    </div>
    <div class="lookPressure">
      <div><span class="lookPressureTitle">身高：</span><span>{{queryInfo.height}} cm</span></div>
      <div><span class="lookPressureTitle">体重：</span><span>{{queryInfo.weight}} kg</span></div>
      <div><span class="lookPressureTitle">腰围：</span><span>{{queryInfo.wc}} cm</span></div>
      <div><span class="lookPressureTitle">体脂率：</span><span>{{queryInfo.bdPercent}} %</span></div>
    </div>
    <div class="lookPressure">
      <div><span class="lookPressureTitle">BMI：</span><span>{{queryInfo.bmi}}</span></div>
      <div><span class="lookPressureTitle">检测时间：</span><span>{{queryInfo.testDate}}</span></div>
    </div>
    <div class="lookPressure">
      <div style="width:100%;display: flex;">
        <span class="lookPressureTitle" style="width:50px;white-space: nowrap;">备注：</span>
        <span>{{queryInfo.result}}</span>
      </div>
    </div>
    <!-- <div class="lookPressure">
      <div><span class="lookPressureTitle">备注：</span><span>{{queryInfo.result}}</span></div>
    </div> -->
    <div class="divRightTitleDiv">
      <div class="divRightTitle">体重-查看趋势
        <div class="titleBiao"></div></div>
    </div>
    <div class="chart-legend">
      <span>体重</span>
    </div>
    <div class="noDataLine" v-if="xData.length === 0">
      <img src="@/assets/images/noDataLine.png"/>
      <span>暂无数据</span>
    </div>
    <line-chart
      v-else
      :chart-data="yData"
      :sectionName="['体重']"
      :sectionXList="xData">
    </line-chart>
    <!-- <div class="title">数据列表</div> -->
    <div class="divRightTitleDiv">
      <div class="divRightTitle">数据列表
        <div class="titleBiao"></div></div>
    </div>
    <el-table :data="table.list" class="openTable">
      <el-table-column
        v-for="(item, index) in table.columns"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        align="center">
      </el-table-column>
    </el-table>
    <div style="text-align: right">
      <el-pagination
        style="margin-top: 15px"
        background
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
        :page-sizes="[15]"
        :current-page="table.pageNo"
        :page-size="table.pageSize"
        layout="prev, pager, next, jumper, total, sizes"
        :total="table.total"
      ></el-pagination>
    </div>
    <!-- <div class="buttons">
      <el-button plain size="small" @click="blackReturn()">返回</el-button>
    </div> -->
    <div class="handle-btn mt30 mb30">
      <el-button class="reset-btn" size="small" @click="blackReturn"
        >返回</el-button>
    </div>
  </div>
</template>

<script>
import LineChart from '../components/line_chart.vue';
import * as dayjs from 'dayjs';
export default {
  name: 'WeightTrend',
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
          { label: '身高', prop: 'height' },
          { label: '体重', prop: 'weight' },
          { label: '腰围', prop: 'wc' },
          { label: 'BMI', prop: 'bmi' },
          { label: '体脂率', prop: 'bdPercent' },
          { label: '备注', prop: 'result' },
        ],
        list: [],
        total: 0,
        pageNo: 1,
        pageSize: 15,
      },
      xData: [],
      yData: [],
      queryInfo: {},
    };
  },
  mounted() {
    this.queryChartData();
    this.queryPageList();
    this.queryChartInfo();
  },
  methods: {
    queryChartData() {
      this.$api.healthMonitorInterface.getWeightChart(this.id).then(({ data }) => {
        const xData = [];
        const yData = [];
        (data.data || []).forEach((item) => {
          let dateStr;
          if (new Date(item.testDate).getFullYear() === new Date().getFullYear()) {
            dateStr = dayjs(item.testDate).format('MM/DD');
          } else {
            dateStr = dayjs(item.testDate).format('YY/MM/DD');
          }
          xData.push(dateStr);
          yData.push(item.weight);
        });
        this.xData = xData;
        this.yData = [yData];
      });
    },
    queryPageList() {
      this.$api.healthMonitorInterface.getWeightList({
        clientId: this.id,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      }).then(({ data }) => {
        this.table.total = data.data.total;
        this.table.list = data.data.data;
      });
    },
    queryChartInfo() {
      this.$api.healthMonitorInterface.getDetailHealthWeight(this.ids).then(({ data }) => {
        this.queryInfo = data.data;
        console.log(this.queryInfo, '12313123123');
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
.handle-btn {
    text-align: center;
  .reset-btn {
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      border: 1px solid #3154AC;
      text-align:center;
      color: #3154AC;
    }
    .add-btn {
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      background: #3154AC;
      border: 1px solid #3154AC;
      text-align:center;
    }
  }
</style>
