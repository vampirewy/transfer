<template>
  <el-dialog
    title="新增菜谱模版"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="580px"
    top="30vh"
    :visible.sync="visibles"
    @close="visibles = false"
  >
    <el-form inline label-width="90px" class="form-content">
      <el-form-item required style="position: relative" label="模版类别：">
        <el-select
          placeholder="请选择"
          :value="1"
          clearable
          style="width: 159px"
        >
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item required label="模版名称：">
        <el-input style="width: 159px" placeholder="请输入"></el-input>
      </el-form-item>
      <div>
        <el-form-item required label="参考范围：">
          <el-input style="width: 189px" placeholder="请输入"></el-input>
          <span style="margin: 0 10px">-</span>
          <el-input style="width: 189px" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <div class="template-intro">
        <el-form-item required label="模版介绍：">
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
.template-intro {
  /deep/ .el-form-item {
    display: inline-flex;
    width: 100%;
    .el-form-item__content {
      flex: 1 !important;
    }
  }
}
.dialog-footer {
  text-align: center;
}
</style>
