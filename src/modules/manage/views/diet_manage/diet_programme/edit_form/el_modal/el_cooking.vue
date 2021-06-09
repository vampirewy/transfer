<template>
  <el-dialog
    title="烹饪方法"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="550px"
    top="30vh"
    :visible.sync="visibles"
    @close="visibles = false"
  >
    <div class="cooking-box">
      <div class="cooking-item">
        <span class="cooking-lable">菜品名称：</span>
        <span class="cooking-content">桂花酒酿圆子</span>
      </div>
      <div class="cooking-item">
        <span class="cooking-lable">烹饪方法：</span>
        <span class="cooking-content"
          >发口令好尬客户给了然后来客人上课发合力科技he日军哥我苦尽甘来科技感了就分开设计师了j</span
        >
      </div>
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
  methods: {},
};
</script>
<style lang="scss" scoped>
.cooking-box {
  /deep/ .el-dialog{
    border-radius: 8px !important;
  }
  .cooking-item {
    display: flex;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    & ~ .cooking-item {
      margin-top: 28px;
    }
    .cooking-lable {
      color: #666666;
    }
    .cooking-content {
      flex: 1;
    }
  }
}
</style>
