<template>
  <div>
    <div class="diet-form_center">
      <div class="diet-plan-box">
        <div class="title">新增原料</div>
      </div>
    </div>
    <el-form inline label-width="90px" class="form-content">
      <el-form-item required label="原料名称：">
        <el-input style="width: 189px" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item required style="position: relative" label="原料分类：">
        <el-select
          placeholder="请选择 (可多选)"
          :value="1"
          clearable
          style="width: 189px"
        >
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
        <span class="tip">营养成分：以100g可食部计算</span>
      </el-form-item>
      <div class="diet-form_center">
        <div class="diet-plan-box">
          <div class="title">原料成分</div>
        </div>
      </div>
      <div class="cooking-me">
        <el-form-item>
          <div class="component-box">
            <div class="component-item" v-for="item in 32" :key="item">
              <span class="label">可食部</span>
              <el-input
                :disabled="type !== 'add'"
                placeholder="请输入"
                clearable
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
        >保存</el-button
      >
    </div>
  </div>
</template>
<script >
export default {
  props: {
    type: {
      Boolean: String,
      default: 'add',
    },
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$parent.viewIndex = 1;
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
