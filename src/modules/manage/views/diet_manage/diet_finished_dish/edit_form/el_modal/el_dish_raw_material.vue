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
            <div style="margin-top: 8px;">
              <span>食品类别：</span>
              <el-select
                v-model="query.foodSort"
                placeholder="请选择"
                clearable
                style="width: 139px"
              >
                <el-option
                  v-for="item in cateData"
                  :key="item.paramValue"
                  :label="item.name"
                  :value="item.paramValue"
                ></el-option>
              </el-select>
            </div>
            <div class="searchInputFormItem">
              <el-input
                style="height: 40px"
                placeholder="输入条件搜索"
                v-model="query.names"
              >
              </el-input>
              <span class="searchBtnImgSpan" @click="search" style="right:-3px">
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
    <el-table
      ref="elDishRawMaterialForm"
      row-class-name="table-row"
      :data="tableData"
    >
      <el-table-column type="selection" align="center" width="55">
      </el-table-column>
      <el-table-column align="center" prop="names" label="原料名称">
      </el-table-column>
      <el-table-column align="center" prop="otherName" label="别名">
      </el-table-column>
      <el-table-column align="center" prop="kcal" label="能量 (Kcal)">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper, total"
      :total="total"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      @current-change="loadData"
    ></el-pagination>
    <div class="form-buttons">
      <el-button size="small" class="cancelBtn" @click="visibles = false">
        取消
      </el-button>
      <el-button size="small" class="sureBtn" type="primary" @click="submit"
        >确定</el-button
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
      tableData: [],
      cateData: [],
      currentPage: 1,
      total: 0,
      pageSize: 15,
      status: '',
      query: {
        names: '',
        foodSort: '',
      },
    };
  },
  created() {
    this.loadData();
    this.loadCateDate();
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
    loadCateDate() {
      this.$api.dietRawMaterial
        .getDietIngredientCategory('DP001')
        .then((res) => {
          this.cateData = res.data.data;
        });
    },
    loadData() {
      this.$api.dietRawMaterial
        .getDietIngredientList({
          ...this.query,
          pageNo: this.currentPage,
          pageSize: this.pageSize,
        })
        .then((res) => {
          const { total, data } = res.data.data;
          this.total = total;
          this.tableData = data;
        });
    },
    search() {
      this.currentPage = 1;
      this.loadData();
    },
    reset() {
      this.query = {
        names: '',
        foodSort: '',
      };
      this.currentPage = 1;
      this.loadData();
    },
    submit() {
      const items = this.$refs.elDishRawMaterialForm.selection;
      this.$emit('change', items);
      this.visibles = false;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .table-row {
  height: 44px;
}
/deep/ .el-select {
  margin: 0 !important;
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
