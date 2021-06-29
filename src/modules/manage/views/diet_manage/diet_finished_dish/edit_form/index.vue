<template>
  <div>
    <div class="diet-form_center">
      <div class="diet-plan-box">
        <div class="title">{{ id ? '编辑' : '新增' }}菜名</div>
      </div>
    </div>
    <el-form
      ref="dietFinishedDishForm"
      inline
      label-width="90px"
      class="form-content"
      :rules="rules"
      :model="ruleForms"
    >
      <el-form-item prop="name" label="菜品名称：">
        <el-input
          v-if="mode !== 'look'"
          style="width: 189px"
          v-model="ruleForms.name"
          placeholder="请输入"
        ></el-input>
        <span v-else>{{ ruleForms.name }}</span>
      </el-form-item>
      <el-form-item
        prop="dietSortIds"
        style="position: relative"
        label="菜品分类："
      >
        <el-select
          v-if="mode !== 'look'"
          placeholder="请选择 (可多选)"
          :value="names"
          clearable
          style="width: 189px"
        >
        </el-select>
        <span v-else>{{ names }}</span>
        <div class="mask" @click="isShowDishSelect = true"></div>
        <el-dish-select
          v-if="isShowDishSelect"
          :active.sync="isShowDishSelect"
          :value="ruleForms.dietSortIds"
          @change="handleDishSelect"
        ></el-dish-select>
      </el-form-item>
      <div>
        <el-form-item label="餐次：">
          <el-checkbox-group
            :disabled="mode === 'look'"
            style="margin-left: 10px"
            v-model="type"
          >
            <el-checkbox label="isBreakfast">早餐</el-checkbox>
            <el-checkbox label="isLunch">午餐</el-checkbox>
            <el-checkbox label="isDinner">晚餐</el-checkbox>
            <el-checkbox label="isOther">其他</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="cooking-me">
        <el-form-item label="烹饪方法：">
          <el-input
            type="textarea"
            v-model="method"
            :rows="4"
            maxlength="300"
            show-word-limit
          />
        </el-form-item>
      </div>
    </el-form>
    <div class="diet-form_center">
      <div class="diet-plan-box">
        <div class="title">菜品原料</div>
      </div>
    </div>
    <div class="divRightTitleDiv" v-if="mode !== 'look'">
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
        prop="dietIngredientName"
        label="原料名称"
      ></el-table-column>
      <el-table-column align="center" prop="weight" label="重量(g)">
        <template slot-scope="scope">
          <span v-if="scope.$index !== editIndex">{{ scope.row.weight }}</span>
          <el-input
            v-else
            v-model="scope.row.weight"
            type="text"
            placeholder="请输入"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="id" align="center" label="操作" width="160px">
        <template slot-scope="scope">
          <div class="btn-box" v-if="mode !== 'look'">
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
            <img
              @click="remove(scope.$index)"
              src="@/assets/images/diet/icon_del.png"
              alt=""
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="form-buttons">
      <el-button size="small" class="cancelBtn" @click="back"> 返回 </el-button>
      <el-button size="small" v-if="mode !== 'look'" class="sureBtn" @click="submit" type="primary"
        >保存</el-button
      >
    </div>
    <el-dish-raw-material
      :visible.sync="isShowDishRawMaterial"
      @change="handleDishRawMaterialSelect"
    ></el-dish-raw-material>
  </div>
</template>
<script>
import elDishSelect from './el_modal/el_dish_selecet.vue';
import elDishRawMaterial from './el_modal/el_dish_raw_material.vue';
export default {
  name: 'diet_dish_form',
  props: {
    id: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: '',
    },
  },
  components: {
    elDishSelect,
    elDishRawMaterial,
  },
  data() {
    return {
      isShowDishSelect: false,
      isShowDishRawMaterial: false,
      editIndex: -1,
      type: [],
      tableData: [],
      method: '',
      names: '',
      ruleForms: {
        name: '',
        dietSortIds: [],
      },
      rules: {
        name: [
          { required: true, message: '请输入菜品名称', trigger: 'change' },
        ],
        dietSortIds: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个分类',
            trigger: 'change',
          },
        ],
      },
    };
  },
  created() {
    if (this.id) {
      this.loadData();
    }
  },
  methods: {
    loadData() {
      this.$api.dietFinishedDishInterface
        .getDietFinishedDishDetail(this.id)
        .then((res) => {
          const {
            id,
            name,
            method,
            caiIngredientDtos,
            caiSortDtos: dietSortIds,
            ...others
          } = res.data.data;
          console.log(id);
          const sortIds = dietSortIds.map(item => item.dietSortId);
          this.tableData = caiIngredientDtos;
          this.ruleForms = { name, dietSortIds: sortIds };
          this.method = method;
          this.type = Object.entries(others).reduce((obj, [key, value]) => {
            if (value === 1 || value === '1') {
              obj.push(key);
            }
            return obj;
          }, []);
        });
    },
    remove(index) {
      this.tableData.splice(index, 1);
    },
    handleDishSelect(ids, names) {
      this.names = names.join(',');
      this.ruleForms.dietSortIds = ids;
    },
    handleDishRawMaterialSelect(items) {
      this.tableData = [...items].map(item => ({
        weight: '0',
        dietIngredientId: item.id,
        dietIngredientName: item.names,
      }));
    },
    submit() {
      this.$refs.dietFinishedDishForm.validate((e) => {
        if (!e) return;
        const types = this.type;
        const meals = ['isBreakfast', 'isLunch', 'isDinner', 'isOther'];
        const mealsObj = meals.reduce((obj, item) => {
          obj[item] = types.includes(item) ? 1 : 2;
          return obj;
        }, {});
        this.$api.dietFinishedDishInterface
          .saveDietFinishedDish({
            id: this.id,
            method: this.method,
            ingredientSaveRequests: this.tableData,
            ...this.ruleForms,
            ...mealsObj,
          })
          .then(() => {
            this.$message.success('操作成功!');
            this.$parent.search();
            this.back();
          });
      });
    },
    back() {
      this.$parent.viewIndex = 1;
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
