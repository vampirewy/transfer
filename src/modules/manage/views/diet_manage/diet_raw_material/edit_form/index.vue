<template>
  <div>
    <div class="diet-form_center">
      <div class="diet-plan-box">
        <div class="title">新增原料</div>
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
          style="width: 189px"
          v-model="ruleForm.names"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item style="position: relative" label="原料分类：">
        <el-select
          placeholder="请选择 (可多选)"
          v-model="ruleForm.foodSort"
          clearable
          style="width: 189px"
        >
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
        <span class="tip">营养成分：以100g可食部计算</span>
      </el-form-item>
      <div>
        <el-form-item prop="otherName" label="别名：">
          <el-input
            style="width: 189px"
            v-model="ruleForm.otherName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            style="width: 500px"
            v-model="ruleForm.remarks"
            type="textarea"
            :rows="4"
            placeholder="请输入"
          ></el-input>
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
              %
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
        otherName: [
          { required: true, message: '请输入别名', trigger: 'change' },
        ],
      },
      list: [
        { key: 'eatPercent', title: '可食部分', value: '' },
        { key: 'water', title: '水分', value: '' },
        { key: 'kcal', title: '能量KJ', value: '' },
        { key: 'protein', title: '蛋白质', value: '' },
        { key: 'fat', title: '脂肪', value: '' },
        { key: 'cho', title: '碳水化合物', value: '' },
        { key: 'brxxw', title: '不溶性纤维', value: '' },
        { key: 'dgc', title: '胆固醇', value: '' },
        { key: 'ash', title: '灰分', value: '' },
        { key: 'vitaminsA', title: '维生素A', value: '' },
        { key: 'thiamin', title: '硫胺素 B1', value: '' },
        { key: 'riboflavin', title: '核黄素 B2', value: '' },
        { key: 'niacin', title: '尼克酸 B3', value: '' },
        { key: 'vitaminsC', title: '维生素C', value: '' },
        { key: 'vitaminsE', title: '维生素E', value: '' },
        { key: 'ca', title: '钙', value: '' },
        { key: 'p', title: '磷', value: '' },
        { key: 'k', title: '钾', value: '' },
        { key: 'na', title: '钠', value: '' },
        { key: 'mg', title: '镁', value: '' },
        { key: 'fe', title: '铁', value: '' },
        { key: 'zn', title: '锌', value: '' },
        { key: 'se', title: '硒', value: '' },
        { key: 'cu', title: '铜', value: '' },
        { key: 'mn', title: '锰', value: '' },
        { key: 'i', title: '碘', value: '' },
        { key: 'f', title: '氟', value: '' },
        { key: 'cr', title: '铬', value: '' },
        { key: 'mu', title: '钼', value: '' },
        { key: 'vitaminsD', title: '维生素D', value: '' },
        { key: 'vitaminsB6', title: '维生素B6', value: '' },
        { key: 'vitaminsB12', title: '维生素B12', value: '' },
        { key: 'vitaminsB5', title: '泛酸 B5', value: '' },
        { key: 'danjian', title: '胆碱', value: '' },
        { key: 'vitaminsH', title: '维生素h', value: '' },
      ],
    };
  },
  created() {
    if (this.id) {
      this.ruleForm.id = this.id;
      this.loadData();
    }
  },
  methods: {
    loadData() {
      this.$api.dietRawMaterial.getDietIngredientDetail(this.id).then((res) => {
        const {
          id,
          names,
          otherName,
          remarks,
          foodSort,
          ingredientId,
        } = res.data.data;
        this.ruleForm = {
          id,
          names,
          otherName,
          remarks,
          foodSort,
          ingredientId,
        };
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
