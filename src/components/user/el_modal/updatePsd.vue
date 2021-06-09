<template>
  <el-dialog
    class="el-plan-setting-mdl"
    :title="modalTitle"
    :visible.sync="show"
    width="550px"
    alignFooter="right"
    :close-on-click-modal="false"
    @close="onVisible"
  >
    <div class="body">
        <el-form
                :model="modifyForm"
                ref="modifyForm"
                :rules="modifyRules"
                label-width="90px"
                label-suffix="："
                :lable-position="'right'">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input
                    type="password"
                    placeholder="请输入原密码"
                    v-model="modifyForm.oldPassword">
            </el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
                    type="password"
                    placeholder="请输入新密码"
                    v-model="modifyForm.newPassword">
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
                    type="password"
                    placeholder="请再次输入"
                    v-model="modifyForm.confirmPassword"
            ></el-input>
          </el-form-item>
        </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" class="cancelBtn" @click="cancel">取消</el-button>
      <el-button size="small" class="sureBtn" type="primary" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'updatePsd',
  data() {
    return {
      show: true,
      modalTitle: '修改密码',
      modifyForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      modifyRules: {
        oldPassword: [{ required: true, message: '原密码不能为空' }],
        newPassword: [{ required: true, message: '新密码不能为空' }],
        confirmPassword: [{ required: true, message: '确认密码不能为空' }],
      },
    };
  },
  mounted() {
    // this.onLoad();
  },
  methods: {
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'updatePsd' });
      }
    },
    /**
     * 保存
     */
    save() {
      this.$refs.modifyForm.validate(async (valid) => {
        console.log('发送');
        if (valid) {
          const params = { ...this.modifyForm };
          this.$api.loginInterface.modifyPassword(params).then(() => {
            this.$message.success('操作成功');
            this.$refs.modifyForm.resetFields();
            if (this.confirmfunc) {
              this.confirmfunc.call(this, '');
            }
            this.cancel();
          });
        }
      });
    },
    cancel() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-plan-setting-mdl {
  .el-button + .el-button{
    margin-left: 20px;
  }
  /deep/ .el-dialog__footer{
    text-align: center;
    padding: 0 0 12px 0;
  }
}
</style>
