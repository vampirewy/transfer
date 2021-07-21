<template>
  <div class="medical-history-select-user" >
    <div class="query" style="background:#FFFFFF">
      <!-- <el-input v-model="keyword" placeholder="输入条件搜索"></el-input>
      <el-button class="search-button" @click="search">
        <i class="el-icon-search"></i>
      </el-button> -->
      <div class="searchCondition">
      <div class="searchLeft">
        <div class="searchInputFormItem">
          <el-input placeholder="异常名称" v-model="formData.name">
          </el-input>
          <span class="searchBtnImgSpan" style="background:#fff;margin: 1px;"
          @click="search(1)">
                  <img class="searchBtnImg" style="width:35px"
                  src="@/assets/images/common/topsearch.png"/>
              </span>
        </div>
      </div>
      <div class="searchRight">
        <div class="buttones" style="margin: 10px 10px 0 0;">
          <div class="searchFor" @click="search(1)" style="margin: 5px 10px 0 0;">
            <img src="@/assets/images/common/topsearchblue.png" alt="">
          </div>
          <div class="resetAll" @click="reset" style="margin: 5px 10px 0 0;">重置</div>
        </div>
      </div>
    </div>
    </div>
    <!-- @row-click="rowClick"  -->
    <el-table :data="tableData"
    class="openTable"
    @selection-change="handleSelectionChange">
      <!-- <el-table-column width="80">
        <template slot-scope="scope">
          <el-radio v-model="selectRadio" :label="scope.row.id">&nbsp;</el-radio>
        </template>
      </el-table-column> -->
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column prop="abnormalName" label="异常名称"></el-table-column>
      <el-table-column prop="gender" label="性别">
        <template slot-scope="scope">
          <span v-if="scope.row.gender === 0">不限</span>
          <span v-if="scope.row.gender === 1">男</span>
          <span v-if="scope.row.gender === 2">女</span>
        </template>
      </el-table-column>
      <el-table-column prop="abnormalTypeName" label="类型"></el-table-column>
    </el-table>
    <el-pagination
          style="margin-top: 15px"
          @current-change="search"
          background
          layout="prev, pager, next, jumper, total, sizes"
          :total="total"
          :page-size="params.pageSize"
          :pageSizes="[15]"
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
        name: '',
      },
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      selectRadio: '',
      multipleSelection: [],
      params: {
        pageNo: 1,
        pageSize: 5,
      },
    };
  },
  mounted() {
    this.queryList();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    goBack() {
      this.$emit('change');
    },
    submit() {
      // this.selectRadio = scope.id;
      // this.$emit('change', scope);
      this.$emit('change', this.multipleSelection);
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
      this.formData.name = '';
      this.currentPage = 1;
      this.queryList();
    },
    async queryList() {
      const reqBody = {
        name: '', // 异常名称
        level: '', // 重要性 ，传下拉列表接口的值，如1，2，3
        state: '', // 状态，0不启用 1启用
        type: '', // 异常类型，传下拉列表接口的值，如1，2，3
        icdCode: '',
        recommendDepartmentName: '',
        recommendInspectName: '',
        medicalLimit: '',
        pageNo: this.params.pageNo,
        pageSize: this.params.pageSize,
      };
      const res = await this.$api.unusualListInterface.listPage(reqBody);
      const { data } = res.data;
      if (data) {
        this.tableData = data.data || [];
        this.total = data.total;
      }
    },
    // async queryList() {
    //   const res = await this.$api.healthMonitorInterface.healthDataItemGetAll({
    //     projectName: this.keyword,
    //     pageNo: this.currentPage,
    //     pageSize: this.pageSize,
    //   });
    //   console.log(res.data);
    //   const { data } = res.data;
    //   if (data) {
    //     this.tableData = data.data || [];
    //     console.log(this.tableData);
    //     this.total = data.total;
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.medical-history-select-user {
  padding: 13px 18px 21px 18px;
  height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
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
