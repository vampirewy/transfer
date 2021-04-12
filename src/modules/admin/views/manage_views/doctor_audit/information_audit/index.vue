<template>
  <div class="information-audit-page">
    <template v-if="viewIndex === 1">
      <div class="query-container">
        <el-form
          class="form"
          ref="queryForm"
          :model="form"
          label-width="100px"
          label-position="left"
          inline="true"
        >
          <el-form-item>
            <el-input
              type="text"
              v-model="form.nameOrPhone"
              placeholder="请输入姓名/手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="审核状态：">
            <el-select v-model="form.auditState" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="待审核" value="0"></el-option>
              <el-option label="审核通过" value="1"></el-option>
              <el-option label="审核不通过" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button
                style="margin-left: 8px;"
                @click="resetForm()"
                size="small"
                class="reset"
        >重置</el-button
        >
        <el-button size="small" @click="queryAuditList()" type="primary" class="query"
          >搜索</el-button
        >
      </div>
      <el-table :data="tableData" border>
        <el-table-column
          prop="realName"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="mobileNo"
          label="手机号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="hospitalName"
          label="所属机构"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="auditStateDesc"
          label="状态"
          align="center"
        ></el-table-column>
        <el-table-column prop="id" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
                    class="font-size-common"
                    type="text"
                    @click="detail(scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        page-size="15"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </template>
    <template v-else>
      <information-audit-form :detailId="detailId" @cancel="viewIndex = 1" />
    </template>
  </div>
</template>

<script>
import InformationAuditForm from './form.vue';

const PAGE_SIZE = 15;

export default {
  name: 'index',
  components: {
    InformationAuditForm,
  },
  data() {
    return {
      form: {
        auditState: undefined, // 审核状态
        nameOrPhone: undefined, // 姓名或手机号
      },
      detailId: '',
      viewIndex: 1,
      tableData: [],
      total: 0,
      currentPage: 1,
    };
  },
  watch: {
    viewIndex(newValue) {
      if (newValue === 1) this.queryAuditList();
    },
  },
  mounted() {
    this.queryAuditList();
  },
  methods: {
    resetForm() {
      Object.assign(this.$data, this.$options.data());
      this.$refs.queryForm.resetFields();
      this.queryAuditList();
      this.currentPage = 1;
    },
    queryAuditList() {
      this.$api.informationAuditInterface
        .getQualificationAuditList({
          ...this.form,
          pageNo: this.currentPage,
          pageSize: PAGE_SIZE,
        })
        .then((response) => {
          const result = response.data;
          const { data, code, message } = result;
          if (code === 200) {
            this.tableData = data.list;
            this.total = data.total;
          } else {
            this.$message.error(message || '网络异常！');
          }
        });
    },
    detail(rowData) {
      this.detailId = rowData.id;
      this.viewIndex = 4;
    },
    handleCurrentChange(target) {
      this.currentPage = target;
      this.queryAuditList();
    },
  },
};
</script>

<style lang="scss" scoped>
  .font-size-common {
    font-size: 14px;
  }
.el-pagination {
  margin: 30px 0 0;
  text-align: right;
}
.information-audit-page {
  .create-button-container {
    margin-bottom: 20px;
  }
  .query-container {
    > .form {
      display: inline-block;
    }
    > .el-input {
      display: inline-block;
      width: 280px;
    }
    .query, .reset {
      float: right;
    }
  }
}
</style>
