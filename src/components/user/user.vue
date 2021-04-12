<template>
  <div class="user-avatar-dropdown">
     <span class="avatarSpan" @click="handleClickAvatar">
        <el-avatar :src="doUserAvatar" size="medium" />
      </span>
      <el-dropdown @command="handleClick" v-if="showAdminButton">
        <span>
          <a href="javascript:;" class="name">{{ userName }}</a>
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="admin">后台管理</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown @command="handleClick" v-else-if="showBackButton">
          <span>
            <a href="javascript:;" class="name">{{ userName }}</a>
            <i class="el-icon-caret-bottom"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="back" v-if="showBackButton">返回首页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="userNameSpan" v-else>
        <a href="javascript:;" class="name">{{ userName }}</a>
      </span>
    <span class="ge">|</span>
    <span class="quitSpan" @click="logout"><img src="@/assets/images/body/quit.png"/>退出</span>
  </div>
</template>

<script>
import HeaderImg from '~/src/assets/images/headerImg.png';
import { localSave } from '~/src/libs/util';

export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: HeaderImg,
    },
    userName: {
      type: String,
      default: '',
    },
    superAdmin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      doUserAvatar: this.handleAvatar(this.userAvatar),
    };
  },
  watch: {
    userAvatar(val) {
      this.doUserAvatar = this.handleAvatar(val);
    },
  },
  computed: {
    showAdminButton() {
      return this.superAdmin && !this.$router.options.base;
    },
    showBackButton() {
      return (
        this.$router.options.base && this.$router.options.base === '/admin'
      );
    },
  },
  methods: {
    handleAvatar(val) {
      if (!val) { // 没头像时显示默认头像，有头像加入路径
        return HeaderImg;
      }
      return `${process.env.api.upload_url + val}`;
    },
    handleClick(name) {
      if (name === 'logout') {
        this.logout();
      } else if (name === 'admin') {
        this.admin();
      } else if (name === 'back') {
        this.back();
      }
    },
    logout() {
      this.$api.loginInterface.logout().then(() => {
        localSave('USER_INFO', '');
        window.location.href = '/#/login';
      });
    },
    admin() {
      window.location.href = '/admin';
    },
    back() {
      window.location.href = '/';
    },
    handleClickAvatar() {
      this.$router.push('/personal_center');
    },
  },
};
</script>

<style lang="scss" scoped>
  .user-avatar-dropdown{
    width: 220px;
    margin-top: 15px;
    text-align: right;
    /deep/ .el-dropdown{
      color: white;
    }
  }
  .avatarSpan{
    margin-right: 2px;
    display: inline-block;
  }
  .userNameSpan{
    font-size: 14px;
  }
  .ge{
    color: #F5F5F5;
    opacity: 0.5;
  }
  .quitSpan{
    color: white;
    font-size: 14px;
    display: inline-block;
    margin-right: 5px;
    img{
      width: 16px;
      height: 16px;
      vertical-align: sub;
      margin-right: 5px;
    }
  }
.user {
  &-avatar-dropdown {
    cursor: pointer;
    display: inline-block;
    .name {
      text-decoration: none;
      color: white;
    }
    /deep/ .el-avatar--medium {
        width: 30px;
        height: 30px;
        line-height: 30px;
      vertical-align: middle;
      img {
        width: 100%;
      }
    }
    .el-dropdown {
     // display: flex;
    }
    .el-avatar {
      // margin-left: 8px;
    }
  }
}
</style>
