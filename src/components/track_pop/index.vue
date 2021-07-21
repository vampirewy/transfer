<template>
   <!-- 跟踪结果弹窗 -->
  <el-dialog
    title="跟踪结果" :visible.sync="visible"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="600px"
    @close="cancel"
  >
    <div>
      <el-form :model="form1" label-width="80px">
        <el-form-item label="跟踪结果：" prop="result">
          <el-radio-group v-model="form1.checkRadio">
            <el-radio :label="1">已回访</el-radio>
            <el-radio :label="2">拒接</el-radio>
            <el-radio :label="3">关机</el-radio>
            <el-radio :label="4">通话中</el-radio>
            <el-radio :label="5">号码错误</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="跟踪记录：" prop="remark">
          <el-input type="textarea" placeholder="请输入" v-model="form1.remark"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancel" class="cancelBtn">取消</el-button>
      <el-button type="primary" size="small" @click="onDialogConfirm" class="sureBtn">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: Boolean,
    clientId: String,
  },
  data() {
    return {
      form1: {
        checkRadio: '',
        reasonRadio: '',
        remark: '',
      },
    };
  },
  methods: {
    onDialogConfirm() {
      console.log('跟踪结果弹窗关闭！');
      this.$emit('change', '关闭');
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-detail /deep/ {
  .form-title {
    display: flex;
    align-items: center;
  }
  .dialog-footer {
    text-align: center;
    padding: 0 32px;
  }
}


</style>

