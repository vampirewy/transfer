<template>
  <div class="medical-history-select-user">
    <!--<div class="searchInputFormItemOpen">
      <el-input v-model="keyword" placeholder="输入条件搜索"></el-input>
      <span class="searchBtnImgSpan" @click="search">
        <img class="searchBtnImg" src="@/assets/images/common/searchBlack.png"/>
      </span>
    </div>-->
    <div class="divTop" style="margin: -15px 0 15px 0">
    <div class="searchCondition">
      <div class="searchLeft">
        <div>
          <span>问卷类型：</span>
          <el-select
                  v-model="sortType"
                  placeholder="请选择"
                  style="width: 140px"
          >
            <el-option :label="item.name" :value="item.paramValue"
                       v-for="item in sortTypeList"
                       :key="item.paramValue"></el-option>
          </el-select>
        </div>
        <div class="searchInputFormItem">
          <el-input placeholder="输入问卷名称搜索" v-model="keyword">
          </el-input>
          <span class="searchBtnImgSpan" @click="search">
                  <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
              </span>
        </div>
      </div>
      <div class="searchRight">
        <div class="buttones">
          <div class="searchFor" @click="search">
            <img src="@/assets/images/common/topsearchblue.png" alt="">
          </div>
          <div class="resetAll" @click="reset">重置</div>
        </div>
      </div>
    </div>
  </div>
    <el-table :data="tableData" @row-click="handleRowClick" class="openTable">
      <el-table-column width="80">
        <template slot-scope="scope">
          <el-radio v-model="selectRadio" :label="scope.row.id">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="问卷名称"></el-table-column>
      <el-table-column prop="sortTypeName" label="问卷类型"></el-table-column>
      <el-table-column prop="createdByName" label="创建人"></el-table-column>
      <el-table-column prop="writeTotal" min-width="150" label="已填人数"></el-table-column>
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
  data() {
    return {
      sortTypeList: [],
      keyword: '',
      sortType: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      selectRadio: '',
    };
  },
  mounted() {
    this.getSystemParamByCode('ZY007');
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
    reset() {
      this.keyword = '';
      this.sortType = '';
      this.currentPage = 1;
      this.queryList();
    },
    async getSystemParamByCode(code) {
      const res = await this.$api.userManagerInterface.getSystemParamByCode(code);
      const { data } = res.data;
      this.sortTypeList = data;
    },
    async queryList() {
      const res = await this.$api.userFollowInterface.getTemplateQuestionListPage({
        name: this.keyword,
        sortType: this.sortType,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      });
      const { data } = res.data;
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
  .el-table{
    &:before {
      background: none;
    }
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
