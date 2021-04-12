<template>
  <div class="medical-history-select-user">
    <el-form
            ref="form"
            class="user-edit-form"
            :model="formData"
            label-width="80px"
    >
      <el-row class="formElForm">
        <el-col :span="8">
          <el-form-item label="题目分类：" label-width="74px">
            <el-select
                    v-model="formData.type"
                    placeholder="请选择"
            >
              <el-option label="饮食" value="1" key="1"></el-option>
              <el-option label="运动" value="2" key="2"></el-option>
              <el-option label="吸烟情况" value="3" key="3"></el-option>
              <el-option label="饮酒情况" value="4" key="4"></el-option>
              <el-option label="心理及睡眠" value="5" key="5"></el-option>
              <el-option label="既往接触史" value="6" key="6"></el-option>
              <el-option label="家族史" value="7" key="7"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      <el-col :span="8">
        <el-form-item label="来源：" label-width="60px">
          <el-select
                  v-model="formData.from"
                  placeholder="请选择"
          >
            <el-option label="系统题目" value="1" key="1"></el-option>
            <el-option label="题库题目" value="2" key="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="" label-width="15px">
          <div class="searchInputFormItem">
            <el-input v-model="formData.name" placeholder="搜索危险因素"></el-input>
            <span class="searchBtnImgSpan" @click="search">
              <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
            </span>
          </div>
        </el-form-item>
      </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" align="center" @row-click="handleRowClick">
      <el-table-column width="80">
        <template slot-scope="scope">
          <el-radio v-model="selectRadio" :label="scope.row.id">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="危险因素" width="110px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>不吃早饭</span>
        </template>
      </el-table-column>
      <el-table-column prop="typeDesc" label="分类" width="110px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>饮食</span>
        </template>
      </el-table-column>
      <el-table-column prop="introduce" label="来源" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>系统题目</span>
        </template>
      </el-table-column>
      <el-table-column prop="introduce" label="建议" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>饮食要规律</span>
        </template>
      </el-table-column>
    </el-table>
    <!--<el-pagination
      background
      layout="prev,pager,next,jumper,total,sizes"
      :page-sizes="[5]"
      :pager-count="5"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>-->
  </div>
</template>

<script>
export default {
  name: 'ServiceOpen',
  props: ['serviceFrom'],
  data() {
    return {
      formData: {
        name: '',
        type: '',
        from: '',
      },
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 1,
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
      const res = await this.$api.ServiceManagerInterface.getServiceItemList({
        state: 1,
        name: this.name,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      });
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
  .formElForm{
    /deep/ .el-form-item{
      margin-bottom: 0;
    }
    /deep/ .el-input__inner{
      background-color: #F4F4F6 !important;
    }
  }
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
