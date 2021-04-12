<template>
  <div class="register-page">
    <el-form
      class="register-content"
      :model="registerForm"
      ref="registerForm"
      :rules="registerRules"
    >
      <template v-if="step === 1">
        <el-form-item label="手机号码" prop="tel">
          <el-input type="number" v-model="registerForm.tel" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input type="number" v-model="registerForm.code" placeholder="请输入">
            <template slot="append">
              <el-button
                v-if="time <= 0"
                plain
                class="send-code"
                @click="sendCode"
                >获取验证码</el-button
              >
              <el-button v-else plain class="send-code" disabled
                >{{ time }}s</el-button
              >
            </template>
          </el-input>
        </el-form-item>
        <el-button
          class="register-button"
          type="primary"
          @click="submit(['tel', 'code'], 2)"
          >注册</el-button
        >
        <div class="agreement">
          点击注册即表示同意<span @click="agreementStatus = true"
            >用户注册协议和隐私政策</span
          >
        </div>
      </template>
      <template v-if="step === 2">
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="registerForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="registerForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" placeholder="请输入"></el-input>
        </el-form-item>
        <div class="step2-buttons">
          <el-button plain @click="backToStep1">上一步</el-button>
          <el-button
            type="primary"
            @click="submit(['sex', 'name', 'password'], 3)"
            >完善机构信息</el-button
          >
        </div>
      </template>
      <template v-if="step === 3">
        <el-form-item label="机构名称" prop="orgName">
          <el-input type="text" v-model="registerForm.orgName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="机构范围" prop="orgRange">
          <el-input type="text" v-model="registerForm.orgRange" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="机构地址" prop="orgAddress">
          <el-input type="text" v-model="registerForm.orgAddress" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailAddress">
          <el-input type="text" v-model="registerForm.detailAddress" placeholder="请输入"></el-input>
        </el-form-item>
        <!-- TODO 营业执照 -->
        <div class="step2-buttons">
          <el-button plain @click="$router.back()">取消</el-button>
          <el-button type="primary" @click="register">完成注册</el-button>
        </div>
      </template>
    </el-form>
    <el-dialog
      title="用户注册协议和隐私政策"
      :visible.sync="agreementStatus"
      width="500"
      :before-close="handleAgreementClose"
    >
      <span>协议内容</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAgreementClose"
          >知道了</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
let timeInterval = null;
export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
        tel: '',
        code: '',
        name: '',
        password: '',
        sex: '',
      },
      registerRules: {
        tel: [{ required: true, message: '手机号码不能为空' }],
        code: [{ required: true, message: '验证码不能为空' }],
        name: [{ required: true, message: '姓名不能为空' }],
        password: [{ required: true, message: '密码不能为空' }],
        sex: [{ required: true, message: '性别不能为空' }],
        orgName: [{ required: true, message: '机构名称不能为空' }],
        orgRange: [{ required: true, message: '机构范围不能为空' }],
        orgAddress: [{ required: true, message: '机构地址不能为空' }],
        detailAddress: [{ required: true, message: '详细地址不能为空' }],
      },
      agreementStatus: false,
      time: 0,
      step: 1,
    };
  },
  methods: {
    register() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          console.log('register...');
        }
      });
    },
    submit(validateFields, nextStep) {
      let errorCount = 0;
      this.$refs.registerForm.validateField(validateFields, (err) => {
        if (err) {
          errorCount++;
        }
      });
      if (!errorCount) {
        this.step = nextStep;
        this.$nextTick(() => {
          this.$refs.registerForm.clearValidate();
        });
      }
    },
    backToStep1() {
      this.step = 1;
    },
    handleAgreementClose() {
      this.agreementStatus = false;
    },
    sendCode() {
      // TODO 发送验证码接口...
      this.time = 60;
      timeInterval = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          clearInterval(timeInterval);
        }
      }, 1000);
    },
  },
  beforeDestroy() {
    if (timeInterval) {
      clearInterval(timeInterval);
    }
  },
};
</script>

<style lang="scss" scoped>
.register-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #fff;
  .register-content {
    width: 350px;
    .send-code {
      width: 100px;
      padding-left: 0;
      padding-right: 0;
      &:hover {
        border-color: transparent;
      }
    }
    .register-button {
      display: block;
      width: 100%;
      margin-top: 40px;
    }
    .agreement {
      font-size: 14px;
      margin-top: 15px;
      text-align: center;
      span {
        cursor: pointer;
        color: #409eff;
      }
    }
    .step2-buttons {
      display: flex;
      margin-top: 40px;
      button {
        flex: 1;
      }
    }
    .el-radio-group {
      width: 100%;
    }
  }
  /deep/ .el-dialog__footer {
    text-align: center;
  }
}
</style>
