<template>
  <div>
    <div class="diet-form_center">
      <div class="diet-plan-box">
        <div class="title"><span v-if="id">编辑</span><span v-else>新增</span>原料</div>
      </div>
    </div>
    <el-form
      ref="dietRawMaterialForm"
      inline
      :rules="rules"
      :model="ruleForm"
      label-width="90px"
      class="form-content"
    >
      <el-form-item prop="names" label="原料名称：">
        <el-input
          v-if="type !== 'edit'"
          style="width: 189px"
          v-model="ruleForm.names"
          placeholder="请输入"
        ></el-input>
        <span v-else>{{ ruleForm.names }}</span>
      </el-form-item>
      <el-form-item  label="别名：">
        <el-input
          v-if="type !== 'edit'"
          style="width: 189px"
          v-model="ruleForm.otherName"
          placeholder="请输入"
        ></el-input>
        <span v-else>{{ ruleForm.otherName }}</span>
      </el-form-item>
      <div>
        <el-form-item label="备注：">
          <el-input
            v-if="type !== 'edit'"
            style="width: 200px"
            v-model="ruleForm.remarks"
            type="textarea"
            :rows="4"
            placeholder="请输入"
          ></el-input>
          <span v-else>{{ ruleForm.otherName }}</span>
        </el-form-item>
        <el-form-item style="position: relative" label="原料分类：">
          <el-select
            v-if="type !== 'edit'"
            placeholder="请选择"
            v-model="ruleForm.foodSort"
            clearable
            style="width: 189px"
          >
            <el-option
              v-for="item in cateData"
              :key="item.paramValue"
              :label="item.name"
              :value="item.paramValue"
            ></el-option>
          </el-select>
          <span v-else>{{ foodSortName }}</span>
          <span class="tip">营养成分：以100g可食部计算</span>
        </el-form-item>
      </div>
      <div class="diet-form_center">
        <div class="diet-plan-box">
          <div class="title">原料成分</div>
        </div>
      </div>
      <div class="cooking-me">
        <el-form-item>
          <div class="component-box">
            <div class="component-item" v-for="item in list" :key="item.title">
              <span class="label">{{ item.title }}</span>
              <el-input
                :disabled="type !== 'add'"
                placeholder="请输入"
                clearable
                v-model="item.value"
              ></el-input>
              <span>{{item.Units}}</span>
            </div>
          </div>
        </el-form-item>
      </div>
    </el-form>
    <div class="form-buttons">
      <el-button size="small" class="cancelBtn" @click="back"> 返回 </el-button>
      <el-button
        v-show="type === 'add'"
        size="small"
        class="sureBtn"
        type="primary"
        @click="submit"
        >保存</el-button
      >
    </div>
  </div>
</template>
<script >
export default {
  props: {
    type: {
      type: String,
      default: 'add',
    },
    id: {
      type: String,
      dafault: '',
    },
  },
  data() {
    return {
      ruleForm: {
        id: '',
        names: '',
        foodSort: '',
        ingredientId: '',
        otherName: '',
        remarks: '',
      },
      rules: {
        names: [{ required: true, message: '请输入名称', trigger: 'change' }],
        // otherName: [
        //   { required: true, message: '请输入别名', trigger: 'change' },
        // ],
      },
      cateData: [],
      list: [
        { key: 'eatPercent', title: '可食部分', value: '', Units: '%' },
        { key: 'water', title: '水分', value: '', Units: 'g' },
        { key: 'kcal', title: '能量KJ', value: '', Units: 'kcal' },
        { key: 'protein', title: '蛋白质', value: '', Units: 'g' },
        { key: 'fat', title: '脂肪', value: '', Units: 'g' },
        { key: 'cho', title: '碳水化合物', value: '', Units: 'g' },
        { key: 'brxxw', title: '不溶性纤维', value: '', Units: 'g' },
        { key: 'dgc', title: '胆固醇', value: '', Units: 'mg' },
        { key: 'ash', title: '灰分', value: '', Units: 'g' },
        { key: 'vitaminsA', title: '维生素A', value: '', Units: 'μg' },
        { key: 'thiamin', title: '硫胺素 B1', value: '', Units: 'mg' },
        { key: 'riboflavin', title: '核黄素 B2', value: '', Units: 'mg' },
        { key: 'niacin', title: '尼克酸 B3', value: '', Units: 'mg' },
        { key: 'vitaminsC', title: '维生素C', value: '', Units: 'mg' },
        { key: 'vitaminsE', title: '维生素E', value: '', Units: 'mg' },
        { key: 'ca', title: '钙', value: '', Units: 'mg' },
        { key: 'p', title: '磷', value: '', Units: 'mg' },
        { key: 'k', title: '钾', value: '', Units: 'mg' },
        { key: 'na', title: '钠', value: '', Units: 'mg' },
        { key: 'mg', title: '镁', value: '', Units: 'mg' },
        { key: 'fe', title: '铁', value: '', Units: 'mg' },
        { key: 'zn', title: '锌', value: '', Units: 'mg' },
        { key: 'se', title: '硒', value: '', Units: 'μg' },
        { key: 'cu', title: '铜', value: '', Units: 'mg' },
        { key: 'mn', title: '锰', value: '', Units: 'mg' },
        { key: 'i', title: '碘', value: '', Units: 'μg' },
        { key: 'f', title: '氟', value: '', Units: 'mg' },
        { key: 'cr', title: '铬', value: '', Units: 'μg' },
        { key: 'mu', title: '钼', value: '', Units: 'mg' },
        { key: 'vitaminsD', title: '维生素D', value: '', Units: 'mg' },
        { key: 'vitaminsB6', title: '维生素B6', value: '', Units: 'mg' },
        { key: 'vitaminsB12', title: '维生素B12', value: '', Units: 'mg' },
        { key: 'vitaminsB5', title: '泛酸 B5', value: '', Units: 'mg' },
        { key: 'danjian', title: '胆碱', value: '', Units: 'mg' },
        { key: 'vitaminsH', title: '维生素h', value: '', Units: 'mg' },
      ],
    };
  },
  created() {
    if (this.id) {
      this.ruleForm.id = this.id;
      this.loadData();
    }
    this.loadCateData();
  },
  computed: {
    foodSortName() {
      if (this.cateData.length <= 0 || !this.ruleForm.foodSort) return '';
      return this.cateData.find(item => item.paramValue === this.ruleForm.foodSort)
        .name;
    },
  },
  methods: {
    loadCateData() {
      this.$api.dietRawMaterial
        .getDietIngredientCategory('DP001')
        .then((res) => {
          this.cateData = res.data.data;
        });
    },
    loadData() {
      this.$api.dietRawMaterial.getDietIngredientDetail(this.id).then((res) => {
        const {
          id,
          names,
          otherName,
          remarks,
          foodSort,
          ingredientId,
          ...others
        } = res.data.data;
        this.ruleForm = {
          id,
          names,
          otherName,
          remarks,
          foodSort,
          ingredientId,
        };
        this.list.forEach((item) => {
          item.value = others[item.key];
        });
      });
    },
    back() {
      this.$parent.viewIndex = 1;
    },
    submit() {
      this.$refs.dietRawMaterialForm.validate((e) => {
        if (!e) return;
        const list = this.list.reduce((obj, item) => {
          obj[item.key] = item.value;
          return obj;
        }, {});
        this.$api.dietRawMaterial
          .saveDietIngredient({
            ...this.ruleForm,
            ...list,
          })
          .then(() => {
            this.$message.success('操作成功!');
            this.$parent.viewIndex = 1;
            this.$parent.loadData();
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
