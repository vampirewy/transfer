<template>
  <div v-show="actives" class="el-dish-select_content">
    <div class="divTop">
      <div class="divTitle">
        <div class="searchCondition">
          <div class="searchLeft">
            <div>
              <span>菜品分类：</span>
              <el-select
                v-model="parentId"
                placeholder="请选择"
                clearable
                style="width: 139px"
              >
                <el-option
                  v-for="item in cateData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <div class="searchInputFormItem">
              <el-input placeholder="输入条件搜索" v-model="query.name">
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-table
      ref="elDishSelectForm"
      row-class-name="table-row"
      :data="tableData"
      row-key="id"
    >
      <el-table-column type="selection" align="center" width="55">
      </el-table-column>
      <el-table-column align="center" prop="parentName" label="菜品分类">
      </el-table-column>
      <el-table-column align="center" prop="name" label="名称">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper, total"
      :total="total"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      @current-change="loadData(2)"
    ></el-pagination>
    <div class="form-buttons">
      <el-button size="small" class="cancelBtn" @click="actives = false">
        取消
      </el-button>
      <el-button size="small" class="sureBtn" @click="submit" type="primary"
        >确定</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      tableData: [],
      cateData: [],
      currentPage: 1,
      parentId: '',
      total: 0,
      pageSize: 15,
      status: '',
      query: {
        name: '',
      },
    };
  },
  created() {
    this.loadData(1);
    this.loadData(2);
  },
  computed: {
    actives: {
      get() {
        return this.active;
      },
      set() {
        this.$emit('update:active', false);
      },
    },
  },
  methods: {
    setSelectItem() {
      if (this.value.length > 0) {
        this.$nextTick(() => {
          this.tableData.forEach((row) => {
            if (this.value.includes(row.id)) {
              this.$refs.elDishSelectForm.toggleRowSelection(row, true);
            }
          });
          this.changeValue();
        });
      }
    },
    loadData(lv) {
      const query = {
        ...this.query,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        parentId: this.parentId,
        lv,
      };
      this.$api.dietFinishedDishInterface.getCaiCategory(query).then((res) => {
        const { data, total } = res.data.data;
        if (lv === 2) {
          this.total = total;
          this.tableData = data;
          this.setSelectItem();
        } else {
          this.cateData = data;
        }
      });
    },
    search() {
      this.currentPage = 1;
      this.loadData(2);
    },
    reset() {
      this.query.name = '';
      this.currentPage = 1;
      this.loadData(2);
    },
    changeValue() {
      const ids = this.$refs.elDishSelectForm.selection.map(item => item.id);
      const names = this.$refs.elDishSelectForm.selection.map(
        item => item.name,
      );
      this.$emit('change', ids, names);
    },
    submit() {
      this.changeValue();
      this.actives = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dish-select_content {
  width: 620px;
  background-color: #ffffff;
  padding: 25px 19px;
  box-shadow: 0px 0px 30px 0px rgba(151, 166, 189, 0.3);
  border-radius: 5px;
}
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
