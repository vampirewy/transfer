<template>
  <div class="login-page">
    <div class="login-content">
      <div class="login-content-wrapper">
        <div class="content-main">
          <div class="content-center">
            <div class="login-header">
              <h3>WELCOME TO</h3>
              <h2 class="login-brand">健康管理系统</h2>
            </div>
            <div class="login-form">
              <h2 class="login-title">Login</h2>
              <el-form
                :model="loginForm"
                ref="loginForm"
                :rules="loginRules"
                class="inputCommon"
              >
                <el-form-item label="账号" prop="username">
                  <el-input
                    type="text"
                    v-model="loginForm.username"
                    placeholder="请输入账号">
                  </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input
                    type="password"
                    v-model="loginForm.password"
                    placeholder="请输入密码">
                  </el-input>
                </el-form-item>
              </el-form>
              <!--<div class="forget-password">
                <span @click="forgetPassword">忘记密码?</span>
              </div>-->
              <el-button
                class="login-button"
                type="primary"
                size="small"
                @click="handleSubmit"
              >登 录</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { localSave, setToken } from '~/src/libs/util';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [{ required: true, message: '账号不能为空' }],
        password: [{ required: true, message: '密码不能为空' }],
      },
      loginResult: {},
      organizationInfo: {},
    };
  },
  computed: {
    ...mapState({
      tagNavList: state => state.app.tagNavList,
    }),
  },
  mounted() {
    document.addEventListener('keyup', this.handleKeyUp);
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.handleKeyUp);
  },
  methods: {
    ...mapMutations({
      setTagNavList: 'app/SET_TAG_NAV_LIST',
    }),
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.login();
        }
      });
    },
    forgetPassword() {
      this.$router.push('/forget_password');
    },
    login() {
      this.$api.loginInterface
        .login({
          mobile: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then((res) => {
          const { data } = res;
          console.log(res);
          this.loginResult = data.data || {};
          // this.$store.commit('user/SET_TOKEN', this.loginResult.token);
          this.redirectHome();
        });
    },
    redirectHome() {
      this.storeLoginInfo();
      this.clearTagsNav();
    },
    storeLoginInfo() {
      // 保存登录信息
      setToken(this.loginResult.token);
      localSave('HK_USER_INFO', JSON.stringify(this.loginResult));
      this.$router.push({ name: 'home' });
      // this.$store.commit('user/SET_TOKEN', this.loginResult.sid);
      // this.$store.commit('user/SET_AVATAR', this.loginResult.headImage);
      // this.$store.commit('user/SET_USER_NAME', this.loginResult.realName);
      // this.$store.commit('user/SET_USER_ID', this.loginResult.userId);
      // this.$store.commit('user/SET_SUPER_ADMIN', this.loginResult.isSuperAdmin);
      // this.$store.commit('user/SET_ACCESS', this.loginResult.menuIds);
      // this.$store.commit('user/SET_HAS_GET_INFO', true);
    },
    handleKeyUp(e) {
      // 回车事件
      if (e.keyCode === 13) {
        this.handleSubmit();
      }
    },
    clearTagsNav() {
      // 清空页面标签
      const res = this.tagNavList.filter(item => item.name === 'home');
      this.setTagNavList(res);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: auto;
  .login-content {
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
    .login-content-wrapper {
      z-index: 2;
      position: relative;
      min-height: 100vh;
      height: 100vh;
      background-color: transparent;
      overflow-x: hidden;
      overflow-y: auto;
    }
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
      .login-header {
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
      .login-form {
        width: 350px;
        margin-left: 220px;
        margin-top: 160px;
        .login-title {
          font-size: 48px;
          font-weight: 500;
          color: #333333;
          line-height: 67px;
          text-align: left;
          margin-bottom: 36px;
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
        .forget-password {
          text-align: left;
          color: #409eff;
          font-size: 14px;
          span {
            cursor: pointer;
          }
        }
        .login-button {
          display: block;
          width: 160px;
          height: 60px;
          margin-top: 10px;
          border-radius: 10px;
          box-shadow: 0px 8px 15px 0px rgba(73, 145, 253, 0.3);
          font-size: 18px;
          font-weight: 400;
        }
        .no-account {
          margin-top: 30px;
          text-align: center;
          font-size: 14px;
          span {
            cursor: pointer;
            color: #409eff;
          }
        }
      }
    }
  }
}
</style>
