<template>
  <div class="medical-history-select-user">
    <!-- <div class="query">
      <el-input v-model="keyword" placeholder="输入姓名搜索"></el-input>
      <el-button class="search-button" @click="search">
        <i class="el-icon-search"></i>
      </el-button>
    </div> -->
    <div class="query" style="background:#FFFFFF">
      <div class="searchCondition">
      <div class="searchLeft">
        <div class="searchInputFormItem">
          <el-input placeholder="模版名称" v-model="query.name">
          </el-input>
          <span class="searchBtnImgSpan" style="background:#ffffff;margin:1px"
          @click="search(1)">
                  <img class="searchBtnImg" style="width:35px"
                  src="@/assets/images/common/topsearch.png"/>
              </span>
        </div>
        <div class="searchInputFormItem">
          <el-input placeholder="模版周期" v-model="query.day">
          </el-input>
          <span class="searchBtnImgSpan" style="background:#ffffff;margin:1px"
          @click="search(1)">
                  <img class="searchBtnImg" style="width:35px"
                  src="@/assets/images/common/topsearch.png"/>
              </span>
        </div>
      </div>
      <div class="searchRight">
        <div class="buttones" style="margin: 5px 10px 0 0;">
          <div class="searchFor" @click="search(1)" style="margin:11px 10px 0 0;">
            <img src="@/assets/images/common/topsearchblue.png" alt="">
          </div>
          <div class="resetAll" style="margin-top:10px;" @click="reset">重置</div>
        </div>
      </div>
    </div>
    </div>
    <el-table :data="tableData" @row-click="rowClick" class="openTable">
      <el-table-column width="80">
        <template slot-scope="scope">
          <el-radio v-model="selectRadio" :label="scope.row.id">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="模板名称"></el-table-column>
      <el-table-column prop="dietTemplateSortName" label="分类"></el-table-column>
      <el-table-column prop="day" label="模版周期（天）">
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
  name: 'MedicalHistorySelectUser',
  data() {
    return {
      keyword: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      selectRadio: '',
      query: {
        name: '',
        day: '',
        dietTemplateSortId: '',
      },
    };
  },
  mounted() {
    this.queryList();
  },
  methods: {
    reset() {
      this.currentPage = 1;
      this.query.name = '';
      this.query.day = '';
      this.queryList();
    },
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
      this.$api.dietMenuTemplateInterface
        .getDietMenuTemplate({
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          ...this.query,
        })
        .then((res) => {
          const { total, data } = res.data.data;
          this.total = total;
          this.tableData = data;
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
