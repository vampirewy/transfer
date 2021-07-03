<template>
  <div class="abnormal-popoper">
    <!--<div class="query searchInputFormItem">
      <el-input v-model="params.keyword" placeholder="输入医生姓名搜索"></el-input>
      <span class="searchBtnImgSpan" @click="search(1)">
            <img class="searchBtnImg" src="@/assets/images/common/search.png"/>
      </span>
    </div>-->
    <div class="divTop" style="margin: -15px 0 15px 0">
      <div class="searchCondition">
        <div class="searchLeft">
          <div class="searchInputFormItem">
            <el-input placeholder="输入小项名称搜索" v-model="params.itemName">
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
            :data="tableData"
            ref="table"
            align="center"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="科室名称" prop="sectionName" min-width="90px" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="小项名称" prop="itemName" min-width="110px" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination
            background
            layout="prev,pager,next,jumper,total"
            :total="params.total"
            :page-size="params.pageSize"
            :current-page="params.pageNo"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :pager-count="4"
    ></el-pagination>
    <div class="footer">
      <el-button class="cancelBtn" size="small" @click="cancel">取消</el-button>
      <el-button type="primary" class="sureBtn" size="small" @click="submit">确定</el-button>
    </div>
  </div>
</template>
<script>export default {
  name: 'projectOpen',
  props: {
    visible: Boolean,
    selectedList: {
      default: () => [],
    },
  },
  data() {
    return {
      formData: {},
      params: {
        itemName: '',
        pageNo: 1,
        pageSize: 5,
        total: 0,
      },
      tableData: [],
      map: {},
      multipleSelectionAll: [], // 所有选中的数据包含跨页数据
      multipleSelection: [], // 当前页选中的数据
      idKey: 'id', // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
    };
  },
  mounted() {
    this.multipleSelectionAll = this.selectedList; // chexkbox回显
    this.fetch();
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
      this.getAllSelectionData(); // 获取全部勾选的数据
      this.$emit('change', [...this.multipleSelectionAll]);
      this.multipleSelectionAll = [];
      this.$refs.table.clearSelection();
    },
    fetch() {
      // this.params.pageNo = this.params.pageNo;
      // this.params.pageSize = this.params.pageSize;
      this.$api.physicalProjectListInterface
        .listPage(Object.assign({}, this.params))
        .then(({ data }) => {
          // console.log(data.data);
          this.params.total = data.data.total;
          this.tableData = data.data.data;
          this.tableData.forEach((val) => {
            this.$set(this.map, val.id, val);
          });
          console.log(this.map);
          setTimeout(() => {
            this.setSelectRow();
          }, 100);
        });
    },
    search(current = 1) {
      this.changePageCoreRecordData();
      this.params.pageNo = current;
      this.fetch();
    },
    reset() {
      this.params.itemName = '';
      this.params.pageNo = 1;
      this.fetch();
    },
    // 设置选中的方法
    setSelectRow() {
      console.log(this.multipleSelectionAll);
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return;
      }
      // 标识当前行的唯一键的名称
      const idKey = this.idKey;
      const selectAllIds = [];
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push(row[idKey]);
      });
      console.log(selectAllIds);
      this.$refs.table.clearSelection();
      for (let i = 0; i < this.tableData.length; i++) {
        if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.tableData[i], true);
        }
      }
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      const idKey = this.idKey;
      const that = this;
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection;
        return;
      }
      // 总选择里面的key集合
      const selectAllIds = [];
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push(row[idKey]);
      });
      const selectIds = [];
      // 获取当前页选中的id
      this.multipleSelection.forEach((row) => {
        selectIds.push(row[idKey]);
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row);
        }
      });
      const noSelectIds = [];
      // 得到当前页没有选中的id
      this.tableData.forEach((row) => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey]);
        }
      });
      noSelectIds.forEach((id) => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] === id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1);
              break;
            }
          }
        }
      });
    },
    // 得到选中的所有数据
    getAllSelectionData() {
      // 再执行一次记忆勾选数据匹配，目的是为了在当前页操作勾选后直接获取选中数据
      this.changePageCoreRecordData();
      console.log(this.multipleSelectionAll);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // this.$emit('change', [...this.multipleSelection]);
    },
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
    /deep/ .el-table td{
      padding: 10px 0;
    }
    padding: 13px 18px 21px 18px;
    /deep/ .el-table__header-wrapper th{
      // padding: 11px 0;
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
