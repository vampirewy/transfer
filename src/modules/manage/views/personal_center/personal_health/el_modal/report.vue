<template>
  <div class="report-page">
    <report-detail
      style="margin-top: -30px"
      v-if="view === 3"
      :id="currentId"
      @close="handleClose">
    </report-detail>
        <div v-else>
            <el-table
              ref="table"
              class="has-expand-table"
              :data="dataSource"
            >
              <el-table-column label="体检编号" prop="reportNo" align="center"></el-table-column>
              <el-table-column label="体检日期" prop="reportDate" align="center"></el-table-column>
              <el-table-column label="体检机构" prop="examinationOrgan" align="center">
              </el-table-column>
              <el-table-column label="操作" prop="index" width="160" align="center">
                <template slot-scope="scope">
                  <el-button
                          type="text"
                          @click="handleDetail(scope.row.id)"
                          v-if="getAccess('physical_examination_report_view')"
                  >查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align: right">
              <el-pagination
                style="margin-top: 15px"
                @current-change="search"
                background
                :total="params.total"
                :page-size="params.pageSize"
                :current-page="params.pageNo"
                :page-sizes="[15]"
                layout="prev, pager, next, jumper, total, sizes"
              ></el-pagination>
            </div>
          </div>
  </div>
</template>

<script>
import ReportDetail from '../../../archives_manage/report_detail.vue';

export default {
  name: 'index',
  components: {
    ReportDetail,
  },
  data() {
    return {
      view: 1, // 1:列表，2:新增、编辑，3:详情
      currentId: '',
      total: 0,
      dataSource: [],
      params: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
      },
    };
  },
  methods: {
    handleClose() {
      this.view = 1;
      this.$emit('change', true);
      this.search();
    },
    handleDetail(id) {
      this.view = 3;
      this.currentId = id;
      this.$emit('change', false);
    },
    fetch() {
      this.$api.reportInterface.fetchReportList(Object.assign(this.params,
        { clientId: this.$route.params.id })).then(({ data }) => {
        if (data.success) {
          this.params.total = data.data.total;
          this.dataSource = data.data.list;
        }
      });
    },
    search(current = 1) {
      this.params.pageNo = current;
      this.fetch();
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
.report-page {
  /deep/ .el-pagination__sizes {
    margin-right: 0;
    .el-select .el-input {
      margin: 0;
    }
  }
}
</style>
