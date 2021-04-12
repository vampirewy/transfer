<template>
  <div class="institutional-list-page">
    <template v-if="viewIndex === 1">
      <div class="query-container">
        <el-form
          class="form"
          ref="queryForm"
          :model="form"
          label-width="88px"
          label-position="left"
          inline="true"
        >
          <el-form-item label="机构名称：">
            <el-input
              type="text"
              v-model="form.organizationName"
              placeholder="请输入机构名称"
              style="width: 266px;"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
                style="margin-left: 8px;"
                @click="resetForm()"
                size="small"
                class="reset"
        >重置</el-button
        >
        <el-button @click="queryOrganizationList()" size="small" type="primary" class="add"
          >搜索</el-button
        >
      </div>
      <el-table :data="organizationList" border>
        <el-table-column
          prop="organizationName"
          label="机构名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="organizationLevelDesc"
          label="机构等级"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="organizationAddress"
          label="地址"
          align="center"
        ></el-table-column>
        <el-table-column prop="id" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
                    class="font-size-common"
                    type="text"
                    @click="edit(scope.row)">
              编辑</el-button>
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
    <template v-else-if="viewIndex !== 1">
      <institutional-list-form
        :detailData="detailData"
        :detail="viewIndex === 4"
        @cancel="viewIndex = 1"
        @refreshList="queryOrganizationList()"
      />
    </template>
  </div>
</template>

<script>
import InstitutionalListForm from './form.vue';

const PAGE_SIZE = 15;

export default {
  name: 'index',
  components: {
    InstitutionalListForm,
  },
  data() {
    return {
      viewIndex: 1,
      detailData: {},
      form: {
        organizationName: '',
      },
      organizationList: [],
      total: 0,
      currentPage: 1,
    };
  },
  mounted() {
    this.queryOrganizationList();
  },
  methods: {
    resetForm() {
      Object.assign(this.$data, this.$options.data());
      this.$refs.queryForm.resetFields();
      this.queryOrganizationList();
      this.currentPage = 1;
    },
    queryOrganizationList() {
      const { organizationName } = this.form;
      this.$api.institutionalInterface
        .getOrganizationList({
          organizationName,
          pageNo: this.currentPage,
          pageSize: PAGE_SIZE,
        })
        .then((res) => {
          const { data } = res;
          if (data.code === 200) {
            this.organizationList = data.data.list || [];
            this.total = data.data.total;
          } else {
            this.$message.error(data.message || '网络异常！');
          }
        });
    },
    edit(data) {
      this.detailData = data;
      this.viewIndex = 3;
    },
    detail(data) {
      this.detailData = data;
      this.viewIndex = 4;
    },
    handleCurrentChange(pageNo) {
      this.currentPage = pageNo;
      this.queryOrganizationList();
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
.institutional-list-page {
  .query-container {
    margin-bottom: 20px;
    > .form {
      display: inline-block;
    }
    > .el-input {
      display: inline-block;
      width: 280px;
    }
    .add, .reset {
      float: right;
    }
  }
}
</style>
