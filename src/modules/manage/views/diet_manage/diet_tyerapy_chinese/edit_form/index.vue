<template>
  <div>
    <div class="diet-form_center">
      <div class="diet-plan-box">
        <div class="title">新增食疗库</div>
      </div>
    </div>
    <el-form inline label-width="90px" class="form-content">
      <el-form-item label="食疗名称：">
        <el-input style="width: 189px" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item style="position: relative" label="适宜性别：">
        <el-select
          placeholder="请选择"
          :value="1"
          clearable
          style="width: 189px"
        >
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <div class="block-div">
        <el-form-item label="适宜体质：">
          <el-checkbox-group v-model="fitnessSelected">
            <el-checkbox
              label="平和质"
              v-for="item in 10"
              :key="item"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="block-div">
        <el-form-item label="食疗原料：">
          <el-input
            maxlength="300"
            show-word-limit
            type="textarea"
            :rows="4"
          ></el-input>
        </el-form-item>
      </div>
      <div class="block-div">
        <el-form-item label="食疗功效：">
          <el-input
            maxlength="300"
            show-word-limit
            type="textarea"
            :rows="4"
          ></el-input>
        </el-form-item>
      </div>
      <div class="block-div">
        <el-form-item label="食疗制法：">
          <el-input
            maxlength="300"
            show-word-limit
            type="textarea"
            :rows="4"
          ></el-input>
        </el-form-item>
      </div>
      <div class="block-div">
        <el-form-item label="食疗用法：">
          <el-input
            maxlength="300"
            show-word-limit
            type="textarea"
            :rows="4"
          ></el-input>
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
    return {
      fitnessSelected: [],
    };
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
