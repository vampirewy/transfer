<template>
  <el-dialog
    title="菜谱模板类型"
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
                <el-input placeholder="输入名称搜索" v-model="query">
                </el-input>
                <span class="searchBtnImgSpan" style="right: -3px;"  @click="search">
                  <img
                    class="searchBtnImg"
                    src="@/assets/images/common/topsearch.png"
                  />
                </span>
              </div>
            </div>
            <div class="searchRight">
              <div class="buttones">
                <!-- <div class="searchFor" @click="search">
                  <img src="@/assets/images/common/topsearchblue.png" alt="" />
                </div> -->
                <div class="resetAll" @click="reset">重置</div>
                <el-button class="btnNew" type="primary" @click="add"
                  >添加新分类</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-table
      @select="itemCheck"
      ref="elMenuTemplateTypeForm"
      :data="tableData"
      align="center"
    >
      <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
      <el-table-column prop="name" label="模板名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-show="editIndex !== scope.$index">{{ scope.row.name }}</span>
          <el-input
            v-show="editIndex === scope.$index"
            v-model="scope.row.name"
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
              @click="handleEdit(scope.row)"
              v-show="editIndex === scope.$index"
              src="@/assets/images/diet/table_edit_success_icon.png"
              alt=""
            />
            <img
              @click="deletes(scope.row.id, scope.$index)"
              src="@/assets/images/diet/icon_del.png"
              alt=""
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper, total, sizes"
      :total="total"
      :page-sizes="[15]"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      @current-change="loadData"
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
      tableData: [],
    };
  },
  created() {
    this.loadData();
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
    loadData() {
      this.$api.dietMenuTemplateInterface
        .getDietMeneTemCate({
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          keywords: this.query,
        })
        .then((res) => {
          const { data, total } = res.data.data;
          this.tableData = data;
          this.total = total;
        });
    },
    handleEdit(item) {
      this.$api.dietMenuTemplateInterface.saveDietMeneTemCate(item).then(() => {
        this.$message.success('操作成功!');
        this.loadData();
        this.editIndex = -1;
      });
    },
    itemCheck(selection, row) {
      this.$refs.elMenuTemplateTypeForm.clearSelection();
      if (selection.length === 0) {
        return;
      }
      if (row) {
        this.$refs.elMenuTemplateTypeForm.toggleRowSelection(row, true);
      }
    },
    deletes(id, index) {
      if (!id) return this.tableData.splice(index, 1);
      this.$api.dietMenuTemplateInterface
        .deleteDietMenuTemCate(`[${id}]`)
        .then(() => {
          this.$message.success('删除成功!');
          this.loadData();
        });
    },
    add() {
      this.tableData.push({});
      this.editIndex = this.tableData.length - 1;
    },
    search() {
      this.currentPage = 1;
      this.loadData();
    },
    reset() {
      this.query = '';
      this.currentPage = 1;
      this.loadData();
    },
    submit() {
      const [selection = {}] = this.$refs.elMenuTemplateTypeForm.selection;
      const { name, id } = selection;
      this.$emit('change', id, name);
      this.visibles = false;
      this.$refs.elMenuTemplateTypeForm.clearSelection();
    },
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
  /deep/ th .el-checkbox__input {
    visibility: hidden;
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
