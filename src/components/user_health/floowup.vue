<template>
  <div class="follow-plan">
    <el-table :data="tableData" style="width: 100%" align="center">
      <el-table-column prop="clientName" label="随访人" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.executeUserName | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gridName" label="随访标题" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.executePlanTitle | getResult}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="executePlanWayName" label="随访方式" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.executePlanWayName | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="executeTime" label="执行日期" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.executeTime | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column
            prop="assortLevelName"
            label="依从度"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
          <span>{{ scope.row.assortLevelName | getResult }}</span>
        </template>
          </el-table-column>
          <el-table-column prop="pleasedLevelName" label="满意度" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.pleasedLevelName | getResult}}</span>
              </template>
            </el-table-column>
      <el-table-column prop="executePlanWayName" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
                type="text"
                size="small"
                @click="handleDetail(scope.row)"
                v-if="getAccess('visited_record_view')"
                >查看</el-button
              >
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
      ],
      currentPage: 1,
      total: 0,
      multipleSelection: [],
      form: {
        keywords: '', // 关键字
        gender: '', // 性别
        workUnitName: '', // 企业单位
        planUserId: '',
        planUserName: '',
        planDate: '',
        planWay: '', // 随访方式
        startTime: '',
        endTime: '',
        executeState: '1', // 状态
        gridId: '', // 客户类型
        assortLevel: '',
        pleasedLevel: '',
      },
      table: {
        list: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 15,
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const reqBody = {
        keywords: this.form.keywords,
        gridId: this.form.gridId,
        gender: this.form.gender,
        executePlanWay: this.form.planWay,
        pleasedLevel: this.form.pleasedLevel,
        assortLevel: this.form.assortLevel,
        pageNo: this.table.currentPage,
        pageSize: this.table.pageSize,
        clientId: this.$route.params.id,
      };
      const res = await this.$api.userFollowInterface.getInterveneRecordListPage(
        reqBody,
      );
      const { data } = res.data;
      if (data) {
        this.tableData = data.data || [];
        this.total = data.total;
      }
    },
    handleDetail(row) {
      this.$router.push({
        path: `/health_plan/user_follow_do/view/${row.id}`,
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
    float: right;
  }
}
</style>
