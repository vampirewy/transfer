<template>
  <el-dialog
    title="菜谱模版类型"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="580px"
    top="30vh"
    :visible.sync="visibles"
    @close="visibles = false"
  >
    <div class="divTop">
      <div class="divTitle">
        <div class="diet-search">
          <div class="searchCondition">
            <div class="searchLeft">
              <div class="searchInputFormItem">
                <el-input placeholder="输入条件搜索" v-model="query">
                </el-input>
                <span class="searchBtnImgSpan" @click="search">
                  <img
                    class="searchBtnImg"
                    src="@/assets/images/common/topsearch.png"
                  />
                </span>
              </div>
            </div>
            <div class="searchRight">
              <div class="buttones">
                <div class="searchFor" @click="search">
                  <img src="@/assets/images/common/topsearchblue.png" alt="" />
                </div>
                <div class="resetAll" @click="reset">重置</div>
                <el-button class="btnNew" type="primary">添加新类型</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" align="center">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="realName" label="模版名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-show="editIndex !== scope.$index">{{
            scope.row.realName
          }}</span>
          <el-input
            v-show="editIndex === scope.$index"
            placeholder="请输入"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作" width="160px">
        <template slot-scope="scope">
          <div class="op-box">
            <img
              @click="editIndex = scope.$index"
              v-show="editIndex !== scope.$index"
              src="@/assets/images/diet/table_edit_icon.png"
              alt=""
            />
            <img
              @click="editIndex = -1"
              v-show="editIndex === scope.$index"
              src="@/assets/images/diet/table_edit_success_icon.png"
              alt=""
            />
            <img src="@/assets/images/diet/icon_del.png" alt="" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper, total, sizes"
      :total="total"
      :page-sizes="[15]"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="visibles = false" class="cancelBtn"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit" class="sureBtn"
        >保存</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      editIndex: -1,
      query: '',
      total: 0,
      currentPage: 1,
      pageSize: 15,
      tableData: [{ realName: '小麦' }],
    };
  },
  computed: {
    visibles: {
      get() {
        return this.visible;
      },
      set() {
        this.$emit('update:visible', false);
      },
    },
  },
  methods: {
    search() {},
    reset() {},
    handleCurrentChange() {},
    submit() {},
  },
};
</script>
<style lang="scss" scoped>
.searchRight {
  flex: 1;
}
.buttones {
  .btnNew {
    background: #36bf2f;
    border-radius: 5px !important;
    width: 90px;
    height: 40px;
    padding: 0;
    line-height: 40px;
    border: none;
    text-align: center;
    margin: 15px 10px 0 88px;
    /deep/ span {
      font-weight: 400;
      color: #ffffff;
      font-size: 14px !important;
    }
  }
}
.el-table {
  margin: 20px 0;
  /deep/ .el-input {
    width: 140px;
    input {
      text-align: center;
    }
  }
}
.dialog-footer {
  text-align: center;
}
.op-box {
  img {
    width: 30px;
    height: 30px;
  }
  img:last-child {
    margin-left: 10px;
  }
}
</style>
