<template>
  <!-- 跟踪结果弹窗 -->
  <el-dialog
    title="跟踪结果"
    :visible.sync="isShowTrackPop"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="600px"
    @close="cancel"
  >
    <div>
      <el-form :model="form" label-width="100px" :rules="rules">
        <el-form-item label="跟踪结果：" prop="result">
          <el-radio-group v-model="form.result">
            <el-radio :label="1">已回访</el-radio>
            <el-radio :label="2">拒接</el-radio>
            <el-radio :label="3">关机</el-radio>
            <el-radio :label="4">通话中</el-radio>
            <el-radio :label="5">号码错误</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="跟踪记录：" prop="trackRecord">
          <el-input
            type="textarea"
            placeholder="请输入"
            v-model="form.trackRecord"
            maxlength="300"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancel" class="cancelBtn">取消</el-button>
      <el-button
        type="primary"
        size="small"
        @click="onDialogConfirm"
        class="sureBtn"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    isShowTrackPop: Boolean,
    trackingId: String,
  },
  data() {
    return {
      rules: {
        result: [{ required: true }],
      },
      form: {
        result: 1,
        trackRecord: '',
      },
    };
  },
  methods: {
    async onDialogConfirm() {
      const isSuccess = await this.getTrankingRequest();
      if (isSuccess) {
        this.$message.success('操作成功');
      }
      this.$emit('cancel', true);
    },
    cancel() {
      this.$emit('cancel');
    },
    async getTrankingRequest() {
      const params = {
        trackingId: this.trackingId,
        ...this.form,
      };
      const res = await this.$api.sunFollow.saveTranking(params);
      const { success } = res.data;
      if (success) return success;
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
