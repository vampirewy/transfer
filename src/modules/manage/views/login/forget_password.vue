<template>
  <div class="forget-password-page">
    <div class="forget-content">
      <div class="forget-content-wrapper">
        <div class="content-main">
          <div class="content-center">
            <div class="forget-header">
              <h3>WELCOME TO</h3>
              <h2 class="login-brand">健康管理系统</h2>
            </div>
            <el-form
              :model="forgetForm"
              ref="forgetForm"
              :rules="forgetRules"
              class="inputCommon"
            >
              <h3 class="forget-title">
                {{step === 3 ? '输入新密码' : (step === 2 ? '输入验证码' : '找回密码')}}
              </h3>
              <template v-if="step === 1">
                <el-form-item label="手机号码" prop="tel">
                  <el-input
                    v-model="forgetForm.tel"
                    :validate-event="false"
                    maxlength="11"
                    placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <div class="buttons">
                  <el-button size="small" @click="$router.back()">取消</el-button>
                  <el-button
                    v-if="time <= 0"
                    type="primary"
                    size="small"
                    class="send-code"
                    @click="sendCode"
                    :disabled="!forgetForm.tel"
                  >发送验证码</el-button>
                  <el-button
                    v-else
                    class="send-code"
                    disabled
                    size="small"
                  >{{ time }}s</el-button>
                </div>
              </template>
              <template v-if="step === 2">
                <el-form-item label="验证码" prop="code">
                  <div class="number-inputs">
                    <el-input
                      v-for="index of 6"
                      :key="index"
                      ref="numberInput"
                      maxlength="1"
                      v-model="forgetForm['number' + index]"
                      @focus="() => handleNumberFocus(index)"
                      @input="val => handleNumberInput(val, index)"
                      @keydown.native="e => handleNumberKeyDown(e, index)"
                      :validate-event="false">
                    </el-input>
                  </div>
                </el-form-item>
                <div class="buttons">
                  <el-button @click="step = 1" size="small">上一步</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="nextStep(['tel', 'code'])"
                    >下一步</el-button>
                </div>
              </template>
              <template v-if="step === 3">
                <el-form-item label="新密码" prop="newPassword">
                  <el-input type="password" v-model="forgetForm.newPassword" :validate-event="false"
                            placeholder="新的密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                  <el-input
                    type="password"
                    v-model="forgetForm.confirmPassword"
                    :validate-event="false"
                    placeholder="确认密码"></el-input>
                </el-form-item>
                <div class="buttons">
                  <el-button @click="step = 2" size="small">上一步</el-button>
                  <el-button type="primary" @click="finish" size="small">确定</el-button>
                </div>
              </template>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let timeInterval = null;
export default {
  name: 'ForgetPassowrd',
  data() {
    const validatorConfirmPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('确认密码不能为空'));
      }
      if (this.forgetForm.newPassword && this.forgetForm.newPassword !== value) {
        return callback(new Error('二次密码不一致，请重新输入'));
      }
      callback();
    };
    return {
      forgetForm: {
        tel: '',
        code: '',
        newPassword: '',
        confirmPassword: '',
        number1: '',
        number2: '',
        number3: '',
        number4: '',
        number5: '',
        number6: '',
      },
      forgetRules: {
        tel: [{ required: true, message: '手机号码不能为空' }],
        code: [{ required: true, message: '验证码不能为空' }],
        newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
        confirmPassword: [
          { required: true, validator: validatorConfirmPassword, trigger: 'blur' },
        ],
      },
      time: 0,
      step: 1,
    };
  },
  watch: {
    forgetForm: {
      handler() {
        const { number1, number2, number3, number4, number5, number6 } = this.forgetForm;
        this.forgetForm.code = `${number1}${number2}${number3}${number4}${number5}${number6}`;
      },
      deep: true,
    },
  },
  methods: {
    handleNumberKeyDown(e, index) {
      if (e.key === 'Backspace' && index > 1 && !this.forgetForm[`number${index}`]) {
        this.$refs.numberInput[index - 2].focus();
      }
    },
    handleNumberFocus(index) {
      this.codeIndex = index;
    },
    handleNumberInput(val, index) {
      this.forgetForm[`number${index}`] = val.replace(/[^0-9]/g, '');
      if (this.forgetForm[`number${index}`] && index < 6) {
        this.$refs.numberInput[index].focus();
      }
    },
    sendCode() {
      const { tel } = this.forgetForm;
      if (tel) {
        this.$api.loginInterface
          .sendCode({
            mobile: tel,
            type: 'resetPassword',
          })
          .then(() => {
            this.$message.success('验证码已发送！');
            this.step = 2;
            this.time = 60;
            // 60s倒计时
            timeInterval = setInterval(() => {
              this.time--;
              if (this.time <= 0) {
                clearInterval(timeInterval);
              }
            }, 1000);
          });
      } else {
        this.$message.error('请先填写手机号码！');
      }
    },
    nextStep(validateFields) {
      // 上一步的验证错误字段个数
      let errorCount = 0;
      this.$refs.forgetForm.validateField(validateFields, (err) => {
        if (err) {
          errorCount++;
        }
      });
      if (!errorCount) {
        const { tel, code } = this.forgetForm;
        this.$api.loginInterface
          .verifyCode({
            mobile: tel,
            code,
          })
          .then(() => {
            this.step = 3;
            this.$nextTick(() => {
              this.$refs.forgetForm.clearValidate();
            });
          });
      }
    },
    finish() {
      this.$refs.forgetForm.validate((valid) => {
        if (valid) {
          const { tel, code, newPassword } = this.forgetForm;
          this.$api.loginInterface
            .resetPassword({
              mobile: tel,
              smsCode: code,
              newPassword,
            })
            .then(() => {
              this.$message.success('操作成功！');
              this.$router.push('/login');
            });
        }
      });
    },
  },
  beforeDestroy() {
    // 清除定时器
    if (timeInterval) {
      clearInterval(timeInterval);
    }
  },
};
</script>

<style lang="scss" scoped>
.forget-password-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #fff;
  .forget-content {
    position: relative;
    flex: 1;
    &:after, &:before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      content: "";
    }
    // &:after {
    //   background-color: rgba(38,50,56,.4);
    // }
    &:before {
      background-image: url(../../../../assets/images/loginBg.png);
      background-size: cover;
    }
    .forget-content-wrapper {
      z-index: 2;
      position: relative;
      min-height: 100vh;
      height: 100vh;
      background-color: transparent;
      overflow-x: hidden;
      overflow-y: auto;
      .content-main {
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-flow: column wrap;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        min-height: 100vh;
        text-align: center;
        box-sizing: border-box;
        .content-center {
          width: 1270px;
          height: 712px;
          background-image: url(../../../../assets/images/loginBg2.png);
          background-size: cover;
          display: flex;
          flex-direction: row-reverse;
          justify-content: space-between;
        }
        .forget-header {
          padding: 118px 210px 0 0;
          color: #fff;
          text-align: right;
          h3 {
            font-size: 28px;
            font-weight: 400;
            line-height: 40px;
            opacity: 0.4;
          }
          .login-brand {
            font-size: 44px;
            font-weight: 400;
            line-height: 62px;
          }
        }
        .el-form {
          width: 350px;
          margin-left: 220px;
          margin-top: 190px;
          .forget-title {
            font-size: 36px;
            font-weight: 600;
            color: #333333;
            line-height: 50px;
            text-align: left;
            margin-bottom: 40px;
          }
          /deep/ .el-form-item__label {
            display: none;
          }
          /deep/ .el-input__inner {
            height: 60px;
            line-height: 60px;
            padding-left: 20px;
            padding-right: 20px;
          }
          .number-inputs {
            display: flex;
            width: 400px;
            /deep/ .el-input {
              width: 50px;
              + .el-input {
                margin-left: 20px;
                .el-input__inner {
                  text-align: center;
                  padding-left: 0;
                  padding-right: 0;
                }
              }
            }
          }
        }
      }
    }
    .buttons {
      margin-top: 30px;
      display: flex;
      .el-button {
        flex: 1;
        height: 60px;
        border-radius: 10px;
        border: none;
        font-size: 18px;
        font-weight: 400;
        + .el-button {
          margin-left: 20px;
        }
        &.el-button--primary {
          box-shadow: 0px 8px 15px 0px rgba(73, 145, 253, 0.3);
        }
        &:not(.el-button--primary) {
          background: #97A6BD;
          color: #fff;
          box-shadow: 0px 8px 15px 0px rgba(151, 166, 189, 0.3);
        }
      }
    }
  }
}
</style>
