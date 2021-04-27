<template>
  <div class="medical-history-select-user">
    <div class="query">
      <div>
        <span>项目分类：</span>
        <el-select
        v-model="formData.gridId"
        placeholder="请选择"
        style="width: 140px"
        >
        <el-option
            v-for="(item, index) in gridList"
            :label="item.name"
            :value="item.id"
            :key="index"
        ></el-option>
        </el-select>
    </div>
    <div style="width:250px;margin-left:20px">
      <el-input v-model="keyword" placeholder="输入条件搜索"></el-input>
    </div>
      <el-button class="search-button" @click="search">
        <i class="el-icon-search"></i>
      </el-button>
    <div class="resetAll">重置</div>
    </div>
    <el-table :data="tableData" @row-click="rowClick">
      <!-- <el-table-column width="80">
        <template slot-scope="scope">
          <el-radio v-model="selectRadio" :label="scope.row.id">&nbsp;</el-radio>
        </template>
      </el-table-column> -->
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column prop="sectionName" label="科室"></el-table-column>
      <el-table-column prop="itemName" label="项目名称"></el-table-column>
      <el-table-column prop="refRange" label="参考范围"></el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
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
  name: 'MedicalHistorySelectUser',
  props: ['examination'],
  data() {
    return {
      gridList: [],
      keyword: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      selectRadio: '',
      formData: {
        gridId: '',
      },
    };
  },
  mounted() {
    this.queryList();
    console.log(this.examination, '接收的数据');
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
      this.getOrganType();
    },
    async queryList() {
    //  this.$api.reportInterface.getOrganList(Object.assign(this.formData))
      //   const res = await this.$api.PhysicalProjectListInterface.listPage();
      const res = await this.$api.reportInterface.getOrganList({
        // keywords: this.keyword,
        pageno: this.currentPage,
        pagesize: this.pageSize,
        itemName: '',
        gender: '',
        isMain: '',
        state: '',
        organItemLibraryId: '1',
      });
      const { data } = res.data;
      if (data) {
        this.tableData = data.data || [];
        this.total = data.total;
      }
    },
    getOrganType() {
      this.$api.reportInterface.getOrganType().then(({ data }) => {
        console.log(data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.medical-history-select-user {
  padding: 13px 18px 21px 18px;
  .query {
    display: flex;
    align-items: center;
    height: 40px;
    // background: #F4F4F6;
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
      margin-left: 15px;
      i {
        font-size: 18px;
        color: #fff;
      }
    }
    .resetAll{
        width: 50px;
        height: 35px;
        background: #DDE0E6;
        border-radius: 5px;
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        justify-content: center;
        font-size: 14px;
        color: #333;
        font-weight: 400;
        margin-left: 10px;
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
