<template>
  <div class="health-monitor-trend">
    <div class="title">运动-查看趋势</div>
    <div class="chart-legend">
      <span>步数</span>
    </div>
    <div class="noDataLine" v-if="xData.length === 0">
      <img src="@/assets/images/noDataLine.png"/>
      <span>暂无数据</span>
    </div>
    <line-chart
      v-else
      :chart-data="yData"
      :sectionName="['步数']"
      :sectionXList="xData">
    </line-chart>
    <div class="title">数据列表</div>
    <el-table :data="table.list">
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
    <div class="buttons">
      <el-button plain size="small" @click="$emit('close')">返回</el-button>
    </div>
  </div>
</template>

<script>
import LineChart from '../components/line_chart.vue';
import * as dayjs from 'dayjs';
export default {
  name: 'SportTrend',
  props: ['id'],
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
      xData: [],
      yData: [],
    };
  },
  mounted() {
    this.queryChartData();
    this.queryPageList();
  },
  methods: {
    queryChartData() {
      this.$api.healthMonitorInterface.getSportChart(this.id).then(({ data }) => {
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
          yData.push(item.steps);
        });
        this.xData = xData;
        this.yData = [yData];
      });
    },
    queryPageList() {
      this.$api.healthMonitorInterface.getSportList({
        clientId: this.id,
        pageNo: this.table.pageNo,
        pageSize: this.table.pageSize,
      }).then(({ data }) => {
        this.table.total = data.data.total;
        this.table.list = data.data.list;
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
  },
};
</script>

<style lang="scss" scoped>

</style>
