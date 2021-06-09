<template>
  <el-dialog
    title="添加食物"
    class="dialog-detail"
    :modal-append-to-body="false"
    top="20px"
    width="1000px"
    :visible.sync="visibles"
    @close="visibles = false"
  >
    <p class="item-title">已选择食物</p>
    <div class="selected-food">
      <div
        class="selected-food-item"
        v-for="item in seletedFoodsList"
        :key="item.id"
      >
        {{ item.name || item.names }}
        <img
          @click="deleteFood(index)"
          src="@/assets/images/body/closeChooseTab.png"
          alt=""
        />
      </div>
    </div>
    <p class="item-title">食物列表</p>
    <div class="food-list">
      <div class="left">
        <el-tabs stretch type="border-card" v-model="tabsActiceValue">
          <el-tab-pane label="成品菜" name="1">
            <el-collapse accordion @change="changeCollapse">
              <el-collapse-item
                v-for="item in caiCateData"
                :key="item.id"
                :title="item.name"
                :name="item.id"
              >
                <ul class="food-type-list">
                  <li
                    v-for="it in item.list"
                    :key="it.id"
                    class="food-type-item"
                    :class="{ is_active: caiCateActiveId === it.id }"
                    @click="selectCaiCate(it.id)"
                  >
                    {{ it.name }}
                  </li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="原料" name="2">
            <ul class="food-type-list">
              <li
                v-for="item in rawCateData"
                :key="item.paramValue"
                @click="selectRawCate(item.paramValue)"
                :class="{ is_active: rawCateActiveId === item.paramValue }"
                class="food-type-item"
              >
                {{ item.name }}
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <div class="divTop">
          <div class="divTitle">
            <div class="searchCondition">
              <div class="searchLeft">
                <div class="searchInputFormItem">
                  <el-input v-model="name" placeholder="请输入条件搜索">
                  </el-input>
                  <span class="searchBtnImgSpan">
                    <img
                      @click="search"
                      class="searchBtnImg"
                      src="@/assets/images/common/topsearch.png"
                    />
                  </span>
                </div>
              </div>
              <div class="searchRight">
                <div class="buttones">
                  <div class="searchFor">
                    <img
                      @click="search"
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
        <template v-if="tabsActiceValue === '1'">
          <el-table
            row-key="id"
            @select="selectFood"
            @select-all="selectFood"
            row-class-name="table-row"
            :data="caiTableData"
          >
            <el-table-column
              reserve-selection
              type="selection"
              align="center"
              width="55"
            >
            </el-table-column>
            <el-table-column align="center" prop="name" label="菜名">
            </el-table-column>
            <el-table-column align="center" prop="mealTimes" label="餐次">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next, jumper, total, sizes"
            :total="total"
            :page-sizes="[15]"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            @current-change="loadCaiTableData"
          ></el-pagination>
        </template>
        <template v-else>
          <el-table
            row-key="id"
            @select="selectFood"
            @select-all="selectFood"
            row-class-name="table-row"
            :data="rawTableData"
          >
            <el-table-column
              reserve-selection
              type="selection"
              align="center"
              width="55"
            >
            </el-table-column>
            <el-table-column align="center" prop="names" label="菜名">
            </el-table-column>
            <el-table-column align="center" prop="otherName" label="餐次">
            </el-table-column>
            <el-table-column align="center" prop="kcal" label="能量">
            </el-table-column>
            <el-table-column align="center" prop="protein" label="蛋白质">
            </el-table-column>
            <el-table-column align="center" prop="protein" label="蛋白质">
            </el-table-column>
            <el-table-column align="center" prop="fat" label="脂肪">
            </el-table-column>
            <el-table-column align="center" prop="cho" label="碳水化合物">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next, jumper, total, sizes"
            :total="total2"
            :page-sizes="[15]"
            :current-page.sync="currentPage2"
            :page-size="pageSize"
            @current-change="loadRawMaterialTableData"
          ></el-pagination>
        </template>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="visibles = false" class="cancelBtn"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit" class="sureBtn"
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
      tabsActiceValue: '1',
      caiCateActiveId: '',
      rawCateActiveId: '',
      currentPage: 1,
      currentPage2: 1,
      total2: 0,
      total: 0,
      pageSize: 15,
      name: '',
      caiCateData: [],
      rawCateData: [],
      rawTableData: [],
      caiTableData: [],
      selectFoods: [],
      selectRaws: [],
      seletedFoodsList: [],
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
  watch: {
    tabsActiceValue(val) {
      if (
        val === '2' &&
        this.rawCateData.length <= 0 &&
        this.rawTableData.length <= 0
      ) {
        this.loadRawMaterialCateData();
        this.loadRawMaterialTableData();
      }
    },
  },
  created() {
    this.loadCaiCateData(1);
    this.loadCaiTableData();
  },
  methods: {
    deleteFood(index) {
      this.seletedFoodsList.splice(index, 1);
    },
    selectFood(rows) {
      this.seletedFoodsList = rows;
    },
    selectCaiCate(id) {
      this.caiCateActiveId = id;
      this.loadCaiTableData();
    },
    selectRawCate(id) {
      this.rawCateActiveId = id;
      this.loadRawMaterialTableData();
    },
    changeCollapse(id) {
      this.loadCaiCateData(2, id - 1, id);
    },
    loadCaiCateData(lv, index, parentId = 0) {
      this.$api.dietFinishedDishInterface
        .getCaiCategory({
          lv,
          parentId,
        })
        .then((res) => {
          const { data } = res.data.data;
          if (lv === 1) {
            data.forEach((item) => {
              item.list = [];
            });
            this.caiCateData = data;
          } else {
            this.caiCateData[index].list = data;
          }
        });
    },
    loadCaiTableData() {
      this.$api.dietFinishedDishInterface
        .getDietFinishedDishList({
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          dietSortId: this.caiCateActiveId,
          name: this.name,
        })
        .then((res) => {
          const { total, data } = res.data.data;
          data.forEach((item) => {
            item.mealTimes = [
              item.isBreakfast - 2 && '早餐',
              item.isLunch - 2 && '午餐',
              item.isDinner - 2 && '晚餐',
              item.isOther - 2 && '加餐',
            ]
              .filter(Boolean)
              .join('、');
          });
          this.caiTableData = data;
          this.total = total;
        });
    },
    loadRawMaterialCateData() {
      this.$api.dietRawMaterial
        .getDietIngredientCategory('DP001')
        .then((res) => {
          this.rawCateData = res.data.data;
        });
    },
    loadRawMaterialTableData() {
      this.$api.dietRawMaterial
        .getDietIngredientList({
          pageNo: this.currentPage2,
          pageSize: this.pageSize,
          names: this.name,
          foodSort: this.rawCateActiveId,
        })
        .then((res) => {
          const { total, data } = res.data.data;
          this.total2 = total;
          this.rawTableData = data;
        });
    },
    search() {
      if (this.tabsActiceValue === '1') {
        this.currentPage = 1;
        this.loadCaiTableData();
      } else {
        this.currentPage2 = 1;
        this.loadRawMaterialTableData();
      }
    },
    reset() {
      this.name = '';
      if (this.tabsActiceValue === '1') {
        this.currentPage = 1;
        this.caiCateActiveId = '';
        this.loadCaiTableData();
      } else {
        this.currentPage2 = 1;
        this.loadRawMaterialTableData();
      }
    },
    submit() {
      this.$emit('change', this.seletedFoodsList);
      this.visibles = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../tabs_cus.scss';
.item-title {
  font-size: 15px;
  font-weight: 600;
  color: #333333;
  line-height: 20px;
  position: relative;
  padding-left: 15px;
  &::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    border: 1px solid #b4bbc9;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
/deep/ .el-dialog__footer{
  background: #ffffff;
  padding-bottom: 10px;
}
.dialog-detail /deep/ {
  .el-dialog {
    height: 90vh;
  }
  .el-dialog__body {
    padding: 20px 25px 0 34px !important;
    max-height: 700px;
  }
  .dialog-footer {
    text-align: center;
  }
}
.selected-food {
  width: 100%;
  height: 114px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #dde0e6;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
  margin: 16px 0;
  overflow-y: auto;
  .selected-food-item {
    display: inline-flex;
    align-items: center;
    background: #f6f8fc;
    border-radius: 16px;
    padding: 0 13px;
    line-height: 32px;
    height: 32px;
    font-size: 12px;
    font-weight: 400;
    color: #333333;
    margin: 0 10px 10px 0;
    box-sizing: border-box;
    img {
      width: 16px;
      height: 16px;
      margin-left: 5px;
      cursor: pointer;
    }
  }
}
.food-list {
  display: flex;
  margin-top: 20px;
  .left {
    width: 25%;
    min-height: 600px;
    border-radius: 8px 8px 0px 8px;
    border: 1px solid #e5e7ef;
  }
  .right {
    border-radius: 0px 8px 8px 0px;
    border: 1px solid #e5e7ef;
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    /deep/.el-table {
      margin: 20px 0;
    }
    /deep/.table-row {
      height: 44px;
    }
    /deep/.el-pagination {
      text-align: center;
    }
  }
  .searchCondition .searchInputFormItem {
    width: 100% !important;
  }
  .searchCondition .searchInputFormItem .el-input {
    width: 95%;
  }
}

.searchLeft {
  flex: 1;
}
</style>
