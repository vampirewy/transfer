<template>
  <el-dialog
    title="膳食指南"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="1000px"
    top="100px"
    :visible.sync="visibles"
    @close="visibles = false"
  >
    <img
      style="width: 100%"
      src="@/assets/images/diet/Guide.png"
      alt=""
    />
    <!-- <img
      style="width: 100%"
      src="https://scdn.qiqiangkeji.com/Fpok-G86Z4ehbpM94GOBD9HrSRFw"
      alt=""
    /> -->
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
</style>
