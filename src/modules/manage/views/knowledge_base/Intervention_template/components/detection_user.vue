<template>
  <div class="medical-history-select-user">
    <div class="query" style="background:#FFFFFF">
      <!-- <el-input v-model="keyword" placeholder="输入条件搜索"></el-input>
      <el-button class="search-button" @click="search">
        <i class="el-icon-search"></i>
      </el-button> -->
      <div class="searchCondition">
      <div class="searchLeft">
        <div class="searchInputFormItem">
          <el-input placeholder="名称/项目" v-model="formData.keyWord">
          </el-input>
          <span class="searchBtnImgSpan" @click="search(1)">
                  <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
              </span>
        </div>
      </div>
      <div class="searchRight">
        <div class="buttones" style="margin: 10px 10px 0 0;">
          <div class="searchFor" @click="search(1)" style="margin: 10px 10px 0 0;">
            <img src="@/assets/images/common/topsearchblue.png" alt="">
          </div>
          <div class="resetAll" @click="reset">重置</div>
        </div>
      </div>
    </div>
    </div>
    <el-table :data="tableData" @row-click="rowClick" class="openTable">
      <!-- <el-table-column width="80">
        <template slot-scope="scope">
          <el-radio v-model="selectRadio" :label="scope.row.id">&nbsp;</el-radio>
        </template>
      </el-table-column> -->
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column prop="name" label="科室名称"></el-table-column>
      <el-table-column prop="unit" label="小项名称"></el-table-column>
      <el-table-column prop="intro" label="正常参考">
        <!-- <template slot-scope="scope">
          <span v-if="scope.row.gender === 1">男</span>
          <span v-if="scope.row.gender === 2">女</span>
        </template> -->
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
    <div>
      <div class="handle-btn mt30 mb30">
        <el-button class="reset-btn" size="small" @click="goBack"
          >返回</el-button
        >
        <el-button class="add-btn" type="primary" size="small" @click="submit"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MedicalHistorySelectUser',
  data() {
    return {
      formData: {
        keyword: '',
      },
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
    reset() {

    },
    async queryList() {
      const res = await this.$api.healthMonitorInterface.healthDataItemGetAll({
        projectName: this.keyword,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      });
      console.log(res.data);
      const { data } = res.data;
      if (data) {
        this.tableData = data.data || [];
        console.log(this.tableData);
        this.total = data.total;
      }
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
    .handle-btn {
    text-align: center;
    margin-top: 20px;
    .reset-btn {
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      border: 1px solid #3154AC;
      text-align:center;
      color: #3154AC;
    }
    .add-btn {
      width: 90px;
      height: 40px;
      background: rgba(49, 84, 172, 0.1);
      border-radius: 20px;
      background: #3154AC;
      border: 1px solid #3154AC;
      text-align:center;
    }
  }
</style>
