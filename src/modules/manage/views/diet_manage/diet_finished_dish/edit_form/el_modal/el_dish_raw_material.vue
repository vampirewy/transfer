<template>
  <el-dialog
    title="选择原料"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="700px"
    :visible.sync="visibles"
    @close="visibles = false"
  >
    <div class="divTop">
      <div class="divTitle">
        <div class="searchCondition">
          <div class="searchLeft">
            <div>
              <span>食品类别：</span>
              <el-select
                v-model="status"
                placeholder="请选择"
                clearable
                style="width: 139px"
              >
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="0"></el-option>
              </el-select>
            </div>
            <div class="searchInputFormItem">
              <el-input placeholder="输入条件搜索" v-model="query"> </el-input>
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-table row-class-name="table-row" :data="tableData">
      <el-table-column type="selection" align="center" width="55">
      </el-table-column>
      <el-table-column align="center" prop="title" label="原料名称">
      </el-table-column>
      <el-table-column align="center" prop="title2" label="别名">
      </el-table-column>
      <el-table-column align="center" prop="title2" label="能量 (Kcal)">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper, total"
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <div class="form-buttons">
      <el-button size="small" class="cancelBtn" @click="visibles = false">
        取消
      </el-button>
      <el-button size="small" class="sureBtn" type="primary">确定</el-button>
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
      tableData: [
        { title: 345347357, title2: '谢小妞', title3: '29', title4: '女' },
      ],
      currentPage: 1,
      total: 0,
      pageSize: 15,
      status: '',
      query: '',
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
  },
};
</script>

<style lang="scss" scoped>
/deep/ .table-row {
  height: 44px;
}
.el-pagination {
  text-align: center;
}
.el-table {
  margin: 20px 0;
}
.form-buttons {
  margin-top: 23px;
  text-align: center;
}
</style>
