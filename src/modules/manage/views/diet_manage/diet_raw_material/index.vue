<template>
  <div class="diet-manage">
    <template v-if="viewIndex === 1">
      <div class="divTop">
        <div class="divTitle">
          <div class="diet-search">
            <div class="search-title">
              <img src="@/assets/images/common/titleLeft.png" alt="" />
              原料库
            </div>
            <div class="searchCondition">
              <div class="searchLeft">
                <div class="searchInputFormItem" >
                  <el-input placeholder="原料名称" v-model="query.names">
                  </el-input>
                  <span class="searchBtnImgSpan" @click="search" style="right:-3px">
                    <img
                      class="searchBtnImg"
                      src="@/assets/images/common/topsearch.png"
                    />
                  </span>
                </div>
                <div>
                  <span class="label">原料分类：</span>
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
              </div>
              <div class="searchRight">
                <div class="buttones">
                  <div class="searchFor" @click="search">
                    <img
                      src="@/assets/images/common/topsearchblue.png"
                      alt=""
                    />
                  </div>
                  <div class="resetAll" @click="reset">重置</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="topbottomborder"></div>
      <div class="diet_dish_flex">
        <div class="divRightTitleDiv">
          <!-- <div class="divRightTitle"><span>|</span>客户池</div> -->
          <div>
            <el-button
              class="btn-new btnAdd"
              size="small"
              style="margin: 16px 0"
              @click="add"
              ><img src="@/assets/images/common/addBtn.png" />新增</el-button
            >
            <el-button
              class="btn-new btnAdd"
              size="small"
              style="margin: 16px 0"
              @click="deletes"
              ><img src="@/assets/images/common/delBtn.png" />删除</el-button
            >
          </div>
        </div>
        <el-table :data="tableData" ref="dietRawMaterial" align="center">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="names"
            label="原料名称"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="foodSortName"
            label="原料分类"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="kcal"
            label="能量 (kcal)"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="protein" label="蛋白质 (g)"> </el-table-column>
          <el-table-column prop="fat" label="脂肪 (g)"> </el-table-column>
          <el-table-column prop="cho" label="碳水化合物 (g)"> </el-table-column>
          <el-table-column prop="id" label="操作" width="160px">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit(scope.row.id)"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="look(scope.row.id)">查看</el-button>
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
      </div>
    </template>
    <template v-else>
      <diet-raw-material-form :id="id" :type="type"></diet-raw-material-form>
    </template>
  </div>
</template>

<script>
import dietRawMaterialForm from './edit_form/index.vue';
export default {
  name: 'diet_raw_material',
  components: {
    dietRawMaterialForm,
  },
  data() {
    return {
      viewIndex: 1,
      currentPage: 1,
      pageSize: 15,
      tableData: [],
      cateData: [],
      total: 0,
      roleOptions: '',
      role: '',
      status: '',
      query: {
        foodSort: '',
        names: '',
      },
      id: '',
      type: 'add',
    };
  },
  created() {
    this.loadData();
    this.loadCateData();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.viewIndex = 1;
    });
  },
  methods: {
    add() {
      this.id = '';
      this.type = 'add';
      this.viewIndex = 2;
    },
    look(id) {
      this.id = id;
      this.type = 'edit';
      this.viewIndex = 2;
    },
    edit(id) {
      this.type = 'add';
      this.id = id;
      this.viewIndex = 2;
    },
    deletes() {
      const ids = JSON.stringify(
        this.$refs.dietRawMaterial.selection.map(item => item.id),
      );
      this.$api.dietRawMaterial.deleteDietIngredient(ids).then(() => {
        this.$message.success('删除成功!');
        this.loadData();
      });
    },
    search() {
      this.currentPage = 1;
      this.loadData();
    },
    reset() {
      this.query = {
        foodSort: '',
        names: '',
      };
      this.currentPage = 1;
      this.loadData();
    },
    loadCateData() {
      this.$api.dietRawMaterial
        .getDietIngredientCategory('DP001')
        .then((res) => {
          this.cateData = res.data.data;
        });
    },
    loadData() {
      this.$api.dietRawMaterial
        .getDietIngredientList({
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          ...this.query,
        })
        .then((res) => {
          if (!res.data.success) return;
          const { data, total } = res.data.data;
          this.tableData = data;
          this.total = total;
        });
    },
    upMore() {},
  },
};
</script>

<style lang="scss" scoped>
@import '../diet_programme/tabs_cus.scss';
.search-title {
  height: 22px;
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  line-height: 22px;
}
.label {
  font-weight: 400 !important;
}
.divTop .divTitle {
  font-weight: normal;
}
.query-container {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;

  .left {
    .el-input {
      display: inline-block;
      width: 266px;
    }
  }
  .right {
    display: flex;
    .el-button + .el-button {
      margin-left: 8px;
    }
  }
}
.diet_dish_flex {
  margin-top: 20px;
}
.table-buttons {
  margin-bottom: 16px;
}
/deep/ .el-input__suffix {
  margin-right: 0 !important;
}
/deep/ .el-input__suffix .el-input__suffix-inner {
  margin-right: 0 !important;
}
.el-pagination {
  margin-top: 20px;
}
</style>
