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
              <el-collapse accordion @change="handleMenuChange">
                <el-collapse-item
                  v-for="(item, index) in menuList"
                  :key="item.id"
                  :title="item.name"
                  :name="item.id + '-' + index"
                >
                  <ul class="food-type-list">
                    <li
                      v-for="it in item.dietSortDtos"
                      @click="selectMenu(item.id, it.id)"
                      :key="it.id"
                      :class="{ is_active: activeMenuId === item.id + it.id }"
                      class="food-type-item"
                    >
                      {{ it.name }}
                    </li>
                  </ul>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="right">
          <div class="divRightTitleDiv">
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
                <el-button type="text" size="small" @click="edit(scope.row.id)"
                  >编辑</el-button
                >
                <el-button type="text" size="small" @click="look(scope.row.id)"
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
            :current-page.sync="currentPage"
            :page-size="pageSize"
            @current-change="loadData"
          ></el-pagination>
        </div>
      </div>
    </template>
    <template v-else>
      <diet-dish-form :mode="mode" :id="id"></diet-dish-form>
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
      mode: '',
      id: '',
      isShowDishSelect: false,
      viewIndex: 1,
      currentPage: 1,
      pageSize: 15,
      tableData: [],
      total: 0,
      menuList: [],
      activeMenuId: '',
      query: {
        name: '',
        meals: [],
        dietSortId: '',
      },
    };
  },
  created() {
    this.loadData();
    this.loadCaiCategory(1);
  },
  methods: {
    add() {
      this.id = '';
      this.mode = '';
      this.viewIndex = 2;
    },
    edit(id) {
      this.id = id;
      this.mode = '';
      this.viewIndex = 2;
    },
    look(id) {
      this.id = id;
      this.mode = 'look';
      this.viewIndex = 2;
    },
    deletes() {
      const ids = JSON.stringify(
        this.$refs.dietFinishedDish.selection.map(item => item.id),
      );
      this.$api.dietFinishedDishInterface
        .deleteDietFinishedDish(ids)
        .then(() => {
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
        name: '',
        meals: [],
        dietSortId: '',
      };
      this.activeMenuId = '';
      this.currentPage = 1;
      this.loadData();
    },
    selectMenu(id, id2) {
      this.activeMenuId = id + id2;
      this.currentPage = 1;
      this.query.dietSortId = id2;
      this.loadData();
    },
    handleMenuChange(e) {
      const [id, index] = e.split('-');
      this.loadCaiCategory(2, id, index);
    },
    loadCaiCategory(lv, parentId = 0, index) {
      if (index && this.menuList[index].dietSortDtos.length > 0) return;
      this.$api.dietFinishedDishInterface
        .getCaiCategory({
          lv,
          parentId,
        })
        .then((res) => {
          const { data } = res.data.data;
          if (lv === 1) {
            this.menuList = data.map((item) => {
              item.dietSortDtos = [];
              return item;
            });
          } else {
            this.menuList[index].dietSortDtos = data;
            console.log(this.menuList[index]);
          }
        });
    },
    loadData() {
      const { name, dietSortId, meals } = this.query;
      const len = meals.length;
      const m = ['isBreakfast', 'isLunch', 'isDinner', 'isOther'];
      const mObj = m.reduce((obj, item) => {
        if (len === 0) obj[item] = '';
        else obj[item] = meals.includes(item) ? '1' : '';
        return obj;
      }, {});
      this.$api.dietFinishedDishInterface
        .getDietFinishedDishList({
          name,
          dietSortId,
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
      background-color: #dde0e6 !important;
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
.mask {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}
</style>
