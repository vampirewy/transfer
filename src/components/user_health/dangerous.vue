<template>
  <div class="follow-plan">
    <el-table :data="tableData" style="width: 100%" align="center">
      <el-table-column prop="riskType" label="分类" show-overflow-tooltip>
        <template slot-scope="scope">
            <span>{{ statusMap[scope.row.riskType] || '-'}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="gridName" label="因素" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.riskFactor | getResult}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="executeTime" label="发生日期" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.itemUnit | getResult }}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="advice" label="建议" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.advice | getResult }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="executePlanWayName" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
              type="text"
              size="small"
              @click="
                $router.push({
                  name: 'risk_factors_look',
                  params: {
                    id: scope.row.id,
                  },
                })
              "
              v-if="getAccess('life_style_questionnaire_view')
              "
            >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 15px"
      layout="prev, pager, next, jumper, total, sizes"
      :total="total"
      :page-size="formData.pageSize"
          :current-page="formData.pageNo"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'InportantIndex',
  props: ['clientId'],
  data() {
    return {
      statusMap: {
        1: '饮食',
        2: '运动',
        3: '吸烟情况',
        4: '饮酒情况',
        5: '心理及睡眠',
        6: '既往接触史',
        7: '家族史',
      },
      tableData: [],
      currentPage: 1,
      total: 0,
      formData: {
        keywords: '', // 危险因素
        // riskType: '', // 危险分类
        // clientGrid: '', // 题目类型
        pageNo: 1,
        pageSize: 10,
        clientId: this.$route.params.id,
      },
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$api.projectList.riskList(this.formData);
      const { data } = res.data;
      this.tableData = data.data;
      this.total = data.total;
    },
    handleCurrentChange(page) {
      this.formData.pageNo = page;
      this.fetch();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.formData.pageNo = 1;
      this.fetch();
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
