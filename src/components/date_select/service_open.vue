<template>
  <div class="medical-history-select-user">
    <div class="searchInputFormItem">
      <el-input v-model="name" placeholder="输入服务名称搜索"></el-input>
      <span class="searchBtnImgSpan" @click="search">
        <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
      </span>
    </div>
    <el-table :data="tableData" align="center" @row-click="handleRowClick">
      <el-table-column width="80">
        <template slot-scope="scope">
          <el-radio v-model="selectRadio" :label="scope.row.id">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="服务名称" width="110px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="serviceFrom === 'myService'">{{scope.row.serviceName}}</span>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="typeDesc" label="服务模式" width="110px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="serviceFrom === 'myService'">{{scope.row.serviceTypeDesc}}</span>
          <span v-else>{{scope.row.typeDesc}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="introduce" label="服务介绍" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="serviceFrom === 'myService'">{{scope.row.serviceIntroduce}}</span>
          <span v-else>{{scope.row.introduce}}</span>
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
  props: ['serviceFrom'],
  data() {
    return {
      name: '',
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
      console.log(row);
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
      let res;
      if (this.serviceFrom === 'myService') {
        res = await this.$api.ServiceManagerInterface.getMyServiceList({
          name: this.name,
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          state: 1,
        });
      } else {
        res = await this.$api.ServiceManagerInterface.getServiceItemList({
          state: 1,
          name: this.name,
          pageNo: this.currentPage,
          pageSize: this.pageSize,
        });
      }

      const { data } = res.data;
      if (data) {
        this.tableData = data.list || [];
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
