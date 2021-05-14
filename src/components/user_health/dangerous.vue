<template>
  <div class="follow-plan">
    <el-table :data="tableData" style="width: 100%" align="center">
      <el-table-column prop="clientName" label="分类" show-overflow-tooltip>
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.itemName | getResult}}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="gridName" label="因素" show-overflow-tooltip>
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.itemValue | getResult}}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="executeTime" label="发生日期" show-overflow-tooltip>
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.itemUnit | getResult }}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="executePlanWayName" label="建议" show-overflow-tooltip>
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.refRange | getResult }}</span>
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
    <!-- <el-pagination
      style="margin-top: 15px"
      layout="prev, pager, next, jumper, total, sizes"
      :total="total"
      :page-size="15"
      @current-change="pageClick"
      :pageSizes="[15]"
    ></el-pagination> -->
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
          clientName: '家族史',
          gridName: '高血压、糖尿病',
          executeTime: '2021-03-21',
          executePlanWayName: '多运动，少吃油腻食物，荤素搭配',
        },
        {
          clientName: '既往接触史',
          gridName: '高血压、糖尿病',
          executeTime: '2021-03-21',
          executePlanWayName: '多运动，少吃油腻食物，荤素搭配',
        },
        {
          clientName: '饮食',
          gridName: '高血压、糖尿病',
          executeTime: '2021-03-21',
          executePlanWayName: '多运动，少吃油腻食物，荤素搭配',
        },
        {
          clientName: '运动',
          gridName: '高血压、糖尿病',
          executeTime: '2021-03-21',
          executePlanWayName: '多运动，少吃油腻食物，荤素搭配',
        },
        {
          clientName: '吸烟情况',
          gridName: '高血压、糖尿病',
          executeTime: '2021-03-21',
          executePlanWayName: '多运动，少吃油腻食物，荤素搭配',
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
    pageClick(page) {
      this.currentPage = page;
      // this.getImportantIndex();
    },
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
