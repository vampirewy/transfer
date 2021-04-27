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
                  <el-input placeholder="名称/原料" v-model="query"> </el-input>
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
                    v-model="status"
                    placeholder="选择"
                    clearable
                    style="width: 139px"
                  >
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                  </el-select>
                </div>
                <div>
                  <span class="label">菜品分类：</span>
                  <el-select
                    v-model="status"
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
            <el-tab-pane label="成品菜" name="1">
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
            <el-tab-pane label="原料" name="2">
              <ul class="food-type-list">
                <li class="food-type-item is_active">谷类及制品</li>
                <li class="food-type-item">谷类及制品</li>
                <li class="food-type-item">谷类及制品</li>
              </ul>
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
                ><img src="@/assets/images/common/delBtn.png" />删除</el-button
              >
            </div>
          </div>
          <el-table :data="tableData" align="center">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              prop="realName"
              label="菜名"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="mobileNo"
              label="菜分类"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="roleName"
              label="餐次"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="activated" label="烹饪方法">
            </el-table-column>
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
            @current-change="handleCurrentChange"
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
      roleOptions: '',
      role: '',
      status: '',
      query: '',
    };
  },
  methods: {
    handleCurrentChange() {},
    add() {
      this.viewIndex = 2;
    },
    search() {},
    reset() {},
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
  display: flex;
  margin-top: 20px;
  .left {
    width: 20%;
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
