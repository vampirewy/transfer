<template>
  <div class="audit-history">
    <div class="title">审核记录</div>
    <el-table
      ref="table"
      class="has-expand-table"
      :data="tableData">
      <el-table-column
        label="审核时间"
        prop="auditTime"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="审核人"
        align="center"
        prop="updateUser"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="审核状态"
        align="center"
        prop="auditStateDesc"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="审核意见"
        align="center"
        prop="auditAdvice"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" prop="id" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="detail(scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: right">
      <el-pagination
        style="margin-top: 30px"
        background
        :total="total"
        :page-size="15"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-sizes="[15]"
        layout="prev, pager, next, jumper, total, sizes"
      ></el-pagination>
    </div>
    <el-dialog
    class="audit-history-detail"
    title="查看"
    :visible.sync="detailStatus"
    width="570px"
    :before-close="handleClose">
      <div class="title">审核记录</div>
      <el-form
        :model="currentData"
        label-width="75px"
        label-suffix="：">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="auditTime" label="审核时间">
              <div>{{currentData.auditTime}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="updateUser" label="审核人">
              <div>{{currentData.updateUser}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item prop="auditStateDesc" label="审核状态">
          <div>{{currentData.auditStateDesc}}</div>
        </el-form-item>
        <el-form-item prop="auditAdvice" label="审核意见">
          <div class="advice">{{currentData.auditAdvice}}</div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AuditHistory',
  props: ['id'],
  data() {
    return {
      tableData: [],
      total: 0,
      pageNo: 1,
      pageSize: 15,
      currentData: {},
      detailStatus: false,
    };
  },
  mounted() {
    this.queryList();
  },
  methods: {
    queryList() {
      this.$api.doctorInterface.auditHistory(this.id, {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }).then(({ data }) => {
        this.tableData = data.data.list;
        this.total = data.data.total;
      });
    },
    detail(data) {
      this.currentData = data;
      this.detailStatus = true;
    },
    handleCurrentChange(page) {
      this.pageNo = page;
      this.queryList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.queryList();
    },
    handleClose() {
      this.currentData = {};
      this.detailStatus = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.audit-history {
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    position: relative;
    padding-left: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 5px;
      height: 5px;
      background: #26C165;
    }
  }
  .audit-history-detail {
    /deep/ .el-form-item__content {
      padding-left: 0;
    }
    /deep/ .el-form-item {
      margin-bottom: 0;
    }
    .advice {
      line-height: 20px;
      padding-top: 10px;
    }
  }
}
</style>
