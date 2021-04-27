<template>
  <div class="abnormal-popoper">
    <div class="query searchInputFormItem">
      <el-input v-model="params.name" placeholder="输入问卷名称搜索"></el-input>
      <span class="searchBtnImgSpan" @click="search(1)">
            <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
      </span>
    </div>
    <el-table
      @selection-change="handleSelectionChange"
      :data="tableData"
      ref="multipleTable"
      align="center"
      @row-click="handleRowClick"
    >
      <el-table-column width="80">
        <template slot-scope="scope">
          <el-radio v-model="selectRadio" :label="scope.row.id">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column label="问卷名称" prop="name"></el-table-column>
      <el-table-column label="题目数量" prop="subjectCount">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev,pager,next,jumper,total,sizes"
      :page-sizes="[5]"
      :pager-count="3"
      :total="params.total"
      :page-size="params.pageSize"
      :current-page="params.pageNo"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'questionOpen',
  props: {
    visible: Boolean,
    value: {
      default: () => [],
    },
    clientIds: {
      default: () => [],
    },
    propsType: {
      default: '',
    },
  },
  data() {
    return {
      formData: {},
      params: {
        name: '',
        pageNo: 1,
        pageSize: 5,
        total: 0,
      },
      tableData: [],
      multipleSelection: [],
      map: {},
      selectRadio: '',
    };
  },
  watch: {
    selectRadio(val) {
      const res = this.tableData.filter(item => item.id === val);
      this.$emit('change', res.length > 0 ? res[0] : null);
    },
  },
  methods: {
    handleRowClick(row) {
      this.$emit('change', row);
    },
    handleCurrentChange(page) {
      this.search(page);
    },
    handleSizeChange(size) {
      this.params.pageSize = size;
      this.search();
    },
    cancel() {
      this.$emit('cancel');
    },
    submit() {
      this.$emit('change', [...this.multipleSelection]);
      this.multipleSelection = [];
      this.$refs.multipleTable.clearSelection();
    },
    fetch() {
      this.$api.userFollowInterface
        .getTemplateQuestionListPage({
          pageNo: this.params.pageNo,
          pageSize: 5,
          name: this.params.name,
        }).then(({ data }) => {
          // console.log(data.data);
          this.params.total = data.data.total;
          this.tableData = data.data.data;
          this.tableData.forEach((val) => {
            this.$set(this.map, val.id, val);
          });
          console.log(this.map);
        });
    },
    search(current = 1) {
      this.params.pageNo = current;
      this.fetch();
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('change', [...this.multipleSelection]);
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
.abnormal-popoper {
  /deep/ .el-input .el-input__inner{
    font-size: 12px;
  }
  /deep/ .el-table .cell{
    font-size: 12px;
    color: #666666;
  }
  padding: 13px 18px 21px 18px;
  /deep/ .el-table__header-wrapper th{
    padding: 11px 0;
    .cell{
      font-size: 14px;
      color: #333333;
    }
  }
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
