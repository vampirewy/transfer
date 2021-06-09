<template>
  <div class="follow-plan">
    <el-table :data="tableData" style="width: 100%" align="center">
      <el-table-column prop="itemName" label="指标名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.itemName | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="itemValue" label="结果" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.itemValue | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="refRange" label="参考范围" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.refRange | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="itemUnit" label="单位" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.itemUnit | getResult }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper, total, sizes"
      :current-page="currentPage"
      :total="total"
      :page-size="15"
      @current-change="pageClick"
      :pageSizes="[15]"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'InportantIndex',
  props: ['clientId'],
  data() {
    return {
      tableData: [
        // {
        //   clientName: '空腹血糖',
        //   gridName: '4.12',
        //   executeTime: 'mmol/L',
        //   executePlanWayName: '3.6~5.8',
        // },
        // {
        //   clientName: '空腹血糖',
        //   gridName: '4.12',
        //   executeTime: 'mmol/L',
        //   executePlanWayName: '3.6~5.8',
        // },
        // {
        //   clientName: '空腹血糖',
        //   gridName: '4.12',
        //   executeTime: 'mmol/L',
        //   executePlanWayName: '3.6~5.8',
        // },
        // {
        //   clientName: '空腹血糖',
        //   gridName: '4.12',
        //   executeTime: 'mmol/L',
        //   executePlanWayName: '3.6~5.8',
        // },
        // {
        //   clientName: '空腹血糖',
        //   gridName: '4.12',
        //   executeTime: 'mmol/L',
        //   executePlanWayName: '3.6~5.8',
        // },
      ],
      currentPage: 1,
      total: 0,
    };
  },
  mounted() {
    this.getImportantIndex();
  },
  methods: {
    pageClick(page) {
      this.currentPage = page;
      this.getImportantIndex();
    },
    getImportantIndex() {
      this.$api.health
        .getReportItem(this.clientId)
        .then((res) => {
          const { data } = res;
          const result = data.data;
          this.tableData = result || [];
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.follow-plan {
  .el-table{
    width: 99.99%!important;
  }
  .el-pagination{
    text-align: right;
    margin-top: 10px;
  }

  /deep/ .is-background {
    margin-top: 10px;
    // float: right;
  }
}
</style>
