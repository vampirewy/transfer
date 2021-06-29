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
        <div class="searchInputFormItem">
          <el-input placeholder="请输入短信主题" v-model="keyword">
          </el-input>
          <span class="searchBtnImgSpan" @click="search">
                  <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
              </span>
        </div>
        <!--<div>
          <span>客户性别：</span>
          <el-select
                  v-model="formData.gender"
                  placeholder="请选择"
                  style="width: 140px"
          >
            <el-option label="男" value="1" key="1"></el-option>
            <el-option label="女" value="2" key="2"></el-option>
          </el-select>
        </div>-->
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
      <el-table-column width="70">
        <template slot-scope="scope">
          <el-radio v-model="selectRadio" :label="scope.row.id">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="themName" label="短信主题" min-width="50px"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="content" label="短信内容" show-overflow-tooltip></el-table-column>
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
  name: 'sms_template_open',
  data() {
    return {
      keyword: '',
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
    reset() {
      this.keyword = '';
      this.currentPage = 1;
      this.queryList();
    },
    async queryList() {
      const res = await this.$api.userManagerInterface.getMessageTemplate({
        keywords: this.keyword,
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
