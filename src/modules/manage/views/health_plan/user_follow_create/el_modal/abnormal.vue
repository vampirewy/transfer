<template>
  <div class="abnormal-popoper">
    <!--<div class="query searchInputFormItem">
      <el-input v-model="formData.name" placeholder="输入异常名称搜索"></el-input>
      <span class="searchBtnImgSpan" @click="search(1)">
            <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
      </span>
    </div>-->
    <div class="divTop" style="margin: -5px 0 5px 0">
      <div class="searchCondition">
        <div class="searchLeft">
          <div class="searchInputFormItem" style="margin-top: 0!important;">
            <el-input placeholder="输入异常名称搜索" v-model="formData.name">
            </el-input>
            <span class="searchBtnImgSpan" @click="search(1)">
                  <img class="searchBtnImg" src="@/assets/images/common/topsearch.png"/>
              </span>
          </div>
        </div>
        <div class="searchRight">
          <div class="buttones">
            <div class="searchFor" @click="search(1)">
              <img src="@/assets/images/common/topsearchblue.png" alt="">
            </div>
            <div class="resetAll" @click="reset">重置</div>
          </div>
        </div>
      </div>
    </div>
    <el-table
      @selection-change="handleSelectionChange"
      :data="dataSource"
      ref="multipleTable"
      align="center"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="异常名称" prop="abnormalName"></el-table-column>
      <el-table-column label="异常等级" prop="dangerLevelName"></el-table-column>
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
    <div class="buttonsSelectOpen">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'abnormal',
  props: {
    visible: Boolean,
    value: {
      default: () => [],
    },
  },
  data() {
    return {
      formData: {},
      params: {
        pageNo: 1,
        pageSize: 5,
        total: 0,
      },
      dataSource: [],
      multipleSelection: [],
      map: {},
    };
  },
  methods: {
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
      this.params.pageNo = this.params.pageNo;
      this.params.pageSize = this.params.pageSize;
      this.$api.reportInterface
        .getAbnormalList(Object.assign(this.params, this.formData))
        .then(({ data }) => {
          this.params.total = data.data.total;
          this.dataSource = data.data.data;
          this.dataSource.forEach((val) => {
            this.$set(this.map, val.id, val);
          });
        });
    },
    search(current = 1) {
      this.params.pageNo = current;
      this.fetch();
    },
    reset() {
      this.formData.name = '';
      this.params.pageNo = 1;
      this.fetch();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
