<template>
  <div class="medical-history-select-user">
    <!--<div class="searchInputFormItem">
      <el-input v-model="name" placeholder="输入服务名称搜索"></el-input>
      <span class="searchBtnImgSpan" @click="search">
        <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
      </span>
    </div>-->
    <el-table :data="tableData" align="center" @row-click="handleRowClick">
      <el-table-column width="80">
        <template slot-scope="scope">
          <el-radio v-model="selectRadio" :label="scope.row.id">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="问卷类型" min-width="25%" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>生活方式问卷</span>
        </template>
      </el-table-column>
      <el-table-column prop="questionDate" label="填写日期" min-width="50%" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.questionDate">
            {{ scope.row.questionDate.split(' ')[0] || '-'}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev,pager,next,jumper,total,sizes"
      :page-sizes="[5]"
      :pager-count="5"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'ServiceOpen',
  props: ['clientId'],
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      selectRadio: '',
    };
  },
  mounted() {
    this.queryList();
  },
  methods: {
    handleRowClick(row) {
      this.$emit('change', row);
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.queryList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.queryList();
    },
    search() {
      this.currentPage = 1;
      this.queryList();
    },
    async queryList() {
      const res = await this.$api.health.fetch({
        questionType: 1,
        clientId: this.clientId,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      });
      const { data } = res.data;
      console.log(data.data, 1111);
      if (data) {
        this.tableData = data.data || [];
        this.total = data.total;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.medical-history-select-user {
  padding: 13px 18px 21px 18px;
  .searchInputFormItem {
    margin-bottom: 20px;
  }
  .el-table::before {
    background: none;
  }
  .el-pagination {
    margin-top: 20px;
    text-align: right;
    /deep/ .el-pagination__sizes {
      margin-right: 0;
    }
    /deep/ .el-input__validateIcon {
      display: none;
    }
  }
}
</style>
