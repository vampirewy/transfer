<template>
  <div class="select-section">
    <!--<div class="query">
      <el-input v-model="keyword" placeholder="输入条件搜索"></el-input>
      <el-button class="search-button" @click="search">
        <i class="el-icon-search"></i>
      </el-button>
    </div>-->
    <el-table :data="tableData" @row-click="rowClick">
      <el-table-column width="80">
        <template slot-scope="scope">
          <el-radio v-model="selectRadio" :label="scope.row.id">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="sectionName" label="科室"></el-table-column>
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
  name: 'SelectSection',
  data() {
    return {
      keyword: '',
      organItemLibraryId: '',
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
    rowClick(scope) {
      this.selectRadio = scope.id;
      this.$emit('change', scope);
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
      const res = await this.$api.physicalProjectListInterface.getSectionList({
        organItemLibraryId: this.organItemLibraryId,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      });
      const { data } = res.data;
      if (data) {
        this.tableData = data.list || [];
        this.tableData.forEach((t) => {
          const v = t;
          v.id = Math.random().toFixed(10);
        });
        this.total = data.total;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.select-section {
  padding: 13px 18px 21px 18px;
  .query {
    display: flex;
    align-items: center;
    height: 40px;
    background: #F4F4F6;
    border-radius: 5px;
    margin-bottom: 20px;
    /deep/ .el-input {
      flex: 1;
      .el-input__inner {
        background: transparent;
        border: none;
      }
    }
    .search-button {
      width: 36px;
      height: 36px;
      background: #4991FD;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 18px;
        color: #fff;
      }
    }
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
