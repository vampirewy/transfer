<template>
  <div class="diet-manage">
    <template v-if="viewIndex === 1">
      <div class="divTop">
        <div class="divTitle">
          <div class="diet-search">
            <div class="search-title">
              <img src="@/assets/images/common/titleLeft.png" alt="" />
              成品菜
            </div>
            <div class="searchCondition">
              <div class="searchLeft">
                <div class="searchInputFormItem">
                  <el-input placeholder="名称/原料" v-model="query.name">
                  </el-input>
                  <span class="searchBtnImgSpan" @click="search">
                    <img
                      class="searchBtnImg"
                      src="@/assets/images/common/topsearch.png"
                    />
                  </span>
                </div>
                <div>
                  <span class="label">菜品餐次：</span>
                  <el-select
                    v-model="query.meals"
                    multiple
                    collapse-tags
                    placeholder="选择"
                    clearable
                    style="width: 179px"
                  >
                    <el-option label="早餐" value="isBreakfast"></el-option>
                    <el-option label="午餐" value="isLunch"></el-option>
                    <el-option label="晚餐" value="isDinner"></el-option>
                    <el-option label="加餐" value="isOther"></el-option>
                  </el-select>
                </div>
                <div>
                  <span class="label">菜品分类：</span>
                  <el-select
                    v-model="query.method"
                    placeholder="选择"
                    clearable
                    style="width: 150px"
                  >
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
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
        <div class="left">
          <el-tabs stretch type="border-card" value="1">
            <el-tab-pane label="成品菜菜单" name="1">
              <el-collapse>
                <el-collapse-item title="中国菜" name="1">
                  <ul class="food-type-list">
                    <li class="food-type-item is_active">心调养食谱</li>
                    <li class="food-type-item">心调养食谱</li>
                    <li class="food-type-item">心调养食谱</li>
                  </ul>
                </el-collapse-item>
                <el-collapse-item title="中国菜" name="2">
                  <ul class="food-type-list">
                    <li class="food-type-item">心调养食谱</li>
                    <li class="food-type-item">心调养食谱</li>
                    <li class="food-type-item">心调养食谱</li>
                  </ul>
                </el-collapse-item>
                <el-collapse-item title="中国菜" name="3">
                  <ul class="food-type-list">
                    <li class="food-type-item">心调养食谱</li>
                    <li class="food-type-item">心调养食谱</li>
                    <li class="food-type-item">心调养食谱</li>
                  </ul>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="right">
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
          <el-table :data="tableData" ref="dietFinishedDish" align="center">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              prop="name"
              label="菜名"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="name"
              label="菜分类"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="mealTimes"
              label="餐次"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="method" label="烹饪方法"> </el-table-column>
            <el-table-column prop="id" label="操作" width="160px">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  v-if="getAccess('staff_list_edit')"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  v-if="getAccess('staff_list_view')"
                  >查看</el-button
                >
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
            @current-change="loadData"
          ></el-pagination>
        </div>
      </div>
    </template>
    <template v-else>
      <diet-dish-form></diet-dish-form>
    </template>
  </div>
</template>

<script>
import dietDishForm from './edit_form/index.vue';
export default {
  name: 'diet_finished_dish',
  components: {
    dietDishForm,
  },
  data() {
    return {
      viewIndex: 1,
      currentPage: 1,
      pageSize: 15,
      tableData: [],
      total: 0,
      query: {
        name: '',
        meals: [],
        method: '',
      },
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    add() {
      this.viewIndex = 2;
    },
    deletes() {
      const ids = JSON.stringify(
        this.$refs.dietFinishedDish.selection.map(item => (item.id)),
      );
      this.$api.dietFinishedDishInterface
        .deleteDietFinishedDish(ids)
        .then((res) => {
          console.log(res);
        });
    },
    search() {
      this.currentPage = 1;
      this.loadData();
    },
    reset() {
      this.query = {
        name: '',
        meals: [],
        method: '',
      };
      this.currentPage = 1;
      this.loadData();
    },
    upMore() {},
    loadData() {
      const { name, method, meals } = this.query;
      const len = meals.length;
      const m = ['isBreakfast', 'isLunch', 'isDinner', 'isOther'];
      const mObj = m.reduce((obj, item) => {
        if (len === 0) obj[item] = '1';
        else obj[item] = meals.includes(item) ? '1' : '2';
        return obj;
      }, {});
      this.$api.dietFinishedDishInterface
        .getDietFinishedDishList({
          name,
          method,
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          ...mObj,
        })
        .then((res) => {
          if (!res.data.success) return;
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
          this.total = total;
          this.tableData = data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../diet_programme/tabs_cus.scss';
.el-tabs {
    /deep/ .el-tabs__item {
      &.is-active {
        color: #333333 !important;
        background-color: #DDE0E6 !important;
      }
    }
}
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
  display: flex;
  margin-top: 20px;
  .left {
    width: 15%;
  }
  .right {
    flex: 1;
    margin-left: 20px;
  }
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
