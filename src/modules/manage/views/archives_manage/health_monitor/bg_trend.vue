<template>
  <div class="health-monitor-trend">
    <div class="title">血糖-查看趋势</div>
    <div class="chart-legend">
      <span>空腹血糖</span>
      <span>餐后血糖</span>
    </div>
    <div class="noDataLine" v-if="xData.length === 0">
      <img src="@/assets/images/noDataLine.png"/>
      <span>暂无数据</span>
    </div>
    <line-chart
      v-else
      :chart-data="yData"
      :sectionName="['空腹血糖', '餐后血糖']"
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
  name: 'BGTrend',
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
          { label: '血糖类型', prop: 'sugarTypeName' },
          { label: '血糖值', prop: 'sugar' },
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
      this.$api.healthMonitorInterface.getBGChart(this.id).then(({ data }) => {
        const xData = [];
        const FPG = []; // 空腹血糖
        const PBG = []; // 餐后血糖
        (data.data['空腹血糖'] || []).forEach((item) => {
          let dateStr;
          if (new Date(item.testDate).getFullYear() === new Date().getFullYear()) {
            dateStr = dayjs(item.testDate).format('MM/DD');
          } else {
            dateStr = dayjs(item.testDate).format('YY/MM/DD');
          }
          xData.push(dateStr);
          FPG.push(item.sugar);
        });
        (data.data['餐后血糖'] || []).forEach((item) => {
          PBG.push(item.sugar);
        });
        this.xData = xData;
        this.yData = [FPG, PBG];
      });
    },
    queryPageList() {
      this.$api.healthMonitorInterface.getBGList({
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
