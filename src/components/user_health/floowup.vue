<template>
  <div class="follow-plan">
    <el-table :data="tableData" style="width: 100%" align="center">
      <el-table-column prop="clientName" label="随访日期" show-overflow-tooltip>
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.itemName | getResult}}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="gridName" label="随访形式" show-overflow-tooltip>
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.itemValue | getResult}}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="executePlanWayName" label="随访标题" show-overflow-tooltip>
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.refRange | getResult }}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="executeTime" label="随访结果" show-overflow-tooltip>
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.itemUnit | getResult }}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="executePlanWayName" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text"
                        size="small"
                        >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper, total, sizes"
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
        {
          clientName: '2020-10-01',
          gridName: '我是名称',
          executeTime: '我是标题',
          executePlanWayName: '我是提',
        },
        {
          clientName: '2020-10-01',
          gridName: '我是名称',
          executeTime: '我是标题',
          executePlanWayName: '我是提示啊我是提示',
        },
        {
          clientName: '2020-10-01',
          gridName: '我是名称',
          executeTime: '我是标题',
          executePlanWayName: '我是提示啊我是提示',
        },
        {
          clientName: '2020-10-01',
          gridName: '我是名称',
          executeTime: '我是标题',
          executePlanWayName: '我是提示啊我是提示',
        },
        {
          clientName: '2020-10-01',
          gridName: '我是名称',
          executeTime: '我是标题',
          executePlanWayName: '我是提示啊我是提示',
        },
      ],
      currentPage: 1,
      total: 0,
    };
  },
  mounted() {
    // this.getImportantIndex();
  },
  methods: {
    // pageClick(page) {
    //   this.currentPage = page;
    //   this.getImportantIndex();
    // },
    // getImportantIndex() {
    //   this.$api.health
    //     .getReportItem(this.clientId)
    //     .then((res) => {
    //       const { data } = res;
    //       const result = data.data;
    //       this.tableData = result || [];
    //     });
    // },
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
    float: right;
  }
}
</style>
