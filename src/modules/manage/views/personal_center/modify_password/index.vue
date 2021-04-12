<template>
  <div class="modify-password inputCommon">
    <div class="modify-title">修改密码</div>
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
      <div class="form-buttons">
        <el-button
          plain
          size="small"
          @click="$router.back()"
        >返回</el-button>
        <el-button
          class="save-button"
          type="primary"
          size="small"
          @click="save"
        >保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ModifyPassword',
  data() {
    return {
      modifyForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      modifyRules: {
        oldPassword: [{ required: true, message: '愿密码不能为空' }],
        newPassword: [{ required: true, message: '新密码不能为空' }],
        confirmPassword: [{ required: true, message: '确认密码不能为空' }],
      },
    };
  },
  methods: {
    save() {
      this.$refs.modifyForm.validate((valid) => {
        if (valid) {
          this.modifyPassword();
        }
      });
    },
    modifyPassword() {
      const params = { ...this.modifyForm };
      this.$api.loginInterface.modifyPassword(params).then(() => {
        this.$message.success('操作成功');
        this.$refs.modifyForm.resetFields();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.modify-password {
  .modify-title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    margin-bottom: 30px;
    margin-top: 15px;
    padding-left: 10px;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
      height: 18px;
      background: #4991FD;
      border-radius: 1px;
    }
  }
  .el-input {
    width: 300px;
    display: block;
  }
  .form-buttons {
    margin-left: 90px;
    margin-top: 30px;
    button {
      width: 80px;
      border-radius: 8px;
      border: none;
    }
    button + button {
      margin-left: 20px;
    }
    /deep/ .is-plain {
      background: #97A6BD;
      color: #fff;
    }
  }
  .el-input {
    width: 450px;
  }
}
</style>
