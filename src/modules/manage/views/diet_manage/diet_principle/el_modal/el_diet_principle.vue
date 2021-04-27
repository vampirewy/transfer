<template>
  <el-dialog
    title="新增"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="550px"
    top="30vh"
    :visible.sync="visibles"
    @close="visibles = false"
  >
    <el-form  label-width="90px" class="form-content">
      <el-form-item  label="原则名称：">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <div class="template-intro">
        <el-form-item  label="原则内容：">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入"
            maxlength="300"
            show-word-limit
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="visibles = false" class="cancelBtn"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit" class="sureBtn"
        >保存</el-button
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
    return {};
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
  methods: {
    submit() {},
  },
};
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
</style>
