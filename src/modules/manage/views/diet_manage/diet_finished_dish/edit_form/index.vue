<template>
  <div>
    <div class="diet-form_center">
      <div class="diet-plan-box">
        <div class="title">新增菜名</div>
      </div>
    </div>
    <el-form inline label-width="90px"  class="form-content">
      <el-form-item required label="菜品名称：">
        <el-input style="width: 189px" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item required style="position: relative" label="菜品分类：">
        <el-select placeholder="请选择 (可多选)" value=""  clearable style="width: 189px">
        </el-select>
        <div class="mask" @click="isShowDishSelect = true"></div>
        <el-dish-select :active.sync="isShowDishSelect"></el-dish-select>
      </el-form-item>
      <div>
        <el-form-item label="餐次：">
          <el-checkbox-group style="margin-left: 10px" v-model="type">
            <el-checkbox label="早餐"></el-checkbox>
            <el-checkbox label="午餐"></el-checkbox>
            <el-checkbox label="晚餐"></el-checkbox>
            <el-checkbox label="其他"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="cooking-me">
        <el-form-item label="烹饪方法：">
          <el-input type="textarea" :rows="4" maxlength="300" show-word-limit />
        </el-form-item>
      </div>
    </el-form>
    <div class="diet-form_center">
      <div class="diet-plan-box">
        <div class="title">菜品原料</div>
      </div>
    </div>
    <div class="divRightTitleDiv">
      <el-button
        class="btn-new btnAdd"
        size="small"
        @click="isShowDishRawMaterial = true"
        ><img src="@/assets/images/common/addBtn.png" />添加原料</el-button
      >
      <el-button type="primary" class="btn">主要营养成分</el-button>
    </div>
    <el-table
      :data="tableData"
      row-class-name="table-row"
      header-row-class-name="table-row"
      align="center"
    >
      <el-table-column
        align="center"
        prop="title"
        label="原料名称"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        align="center"
        prop="title2"
        label="重量(g)"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-show="scope.$index !== editIndex">{{
            scope.row.title2
          }}</span>
          <el-input
            v-show="scope.$index === editIndex"
            v-model="scope.row.title2"
            placeholder="请输入"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="id" align="center" label="操作" width="160px">
        <template slot-scope="scope">
          <div class="btn-box">
            <img
              v-show="scope.$index !== editIndex"
              @click="editIndex = scope.$index"
              src="@/assets/images/diet/table_edit_icon.png"
              alt=""
            />
            <img
              v-show="scope.$index === editIndex"
              @click="editIndex = -1"
              src="@/assets/images/diet/table_edit_success_icon.png"
              alt=""
            />
            <img src="@/assets/images/diet/icon_del.png" alt="" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="form-buttons">
      <el-button size="small" class="cancelBtn" @click="back"> 返回 </el-button>
      <el-button size="small" class="sureBtn" type="primary">保存</el-button>
    </div>
    <el-dish-raw-material
      :visible.sync="isShowDishRawMaterial"
    ></el-dish-raw-material>
  </div>
</template>
<script>
import elDishSelect from './el_modal/el_dish_selecet.vue';
import elDishRawMaterial from './el_modal/el_dish_raw_material.vue';
export default {
  name: 'diet_dish_form',
  components: {
    elDishSelect,
    elDishRawMaterial,
  },
  data() {
    return {
      isShowDishSelect: false,
      isShowDishRawMaterial: false,
      editIndex: -1,
      query: '',
      type: '',
      tableData: [{ title: '小麦粉', title2: '12', isEdit: false }],
    };
  },
  methods: {
    search() {},
    back() {
      this.$parent.viewIndex = 1;
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
