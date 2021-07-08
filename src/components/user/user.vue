<template>
  <div class="user-avatar-dropdown">
     <span class="avatarSpan">
          <!--@click="handleClickAvatar"-->
        <el-avatar :src="doUserAvatar" size="medium" />
      </span>
      <el-dropdown @command="handleClick" v-if="showAdminButton">
        <span>
          <a href="javascript:;" class="name">{{ doUserName }}</a>
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="admin">后台管理</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown @command="handleClick" v-else-if="showBackButton">
          <span>
            <a href="javascript:;" class="name">{{ doUserName }}</a>
            <i class="el-icon-caret-bottom"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="back" v-if="showBackButton">返回首页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="quitSpan" v-else>
        {{ doUserName }}
      </span>
      <span class="ge">|</span>
      <span class="quitSpan" @click="updatePsd">修改密码</span>
    <span class="ge">|</span>
    <span class="quitSpan" @click="logout">退出登录</span>
  </div>
</template>

<script>
import HeaderImg from '~/src/assets/images/headerImg.png';
import { localSave } from '~/src/libs/util';
import avatarImg from '@/assets/images/body/avatar.png';
import avatarImg2 from '@/assets/images/body/avatar2.png';
import updatePsd from './el_modal/updatePsd.vue';
export default {
  name: 'User',
  components: {
    updatePsd,
  },
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
      doUserName: this.userName,
      doUserAvatar: avatarImg, // this.handleAvatar(this.userAvatar),
    };
  },
  watch: {
    /* userAvatar(val) {
      this.doUserAvatar = this.handleAvatar(val);
    },*/
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
  mounted() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const res = await this.$api.userManagerInterface.getUserInfo();
      const { data } = res.data;
      this.doUserName = data.realName;
      if (data.sex === '男') {
        this.doUserAvatar = avatarImg;
      } else if (data.sex === '女') {
        this.doUserAvatar = avatarImg2;
      }
    },
    /* handleAvatar(val) {
      if (!val) { // 没头像时显示默认头像，有头像加入路径
        return HeaderImg;
      }
      return `${process.env.api.upload_url + val}`;
    },*/
    handleClick(name) {
      if (name === 'logout') {
        this.logout();
      } else if (name === 'admin') {
        this.admin();
      } else if (name === 'back') {
        this.back();
      }
    },
    /**
     * 修改密码
     */
    updatePsd() {
      this.$jDynamic.show({
        component: 'updatePsd',
        data: {
          confirmfunc: async (value) => {
            console.log(value);
          },
        },
        render: h => h(updatePsd),
      });
    },
    logout() {
      this.$api.loginInterface.logout().then(() => {
        localSave('HK_USER_INFO', '');
        localSave('HK_ACCESS', '');
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
    width: auto;
    margin-top: 14px;
    text-align: right;
      margin-right: 15px;
    /deep/ .el-dropdown{
      color: white;
    }
      /deep/ .el-avatar-img{
          img{
              vertical-align: initial;
          }
      }
  }
  .avatarSpan{
    margin-right: 5px;
    display: inline-block;
  }
  .userNameSpan{
    font-size: 14px;
  }
  .ge{
    color: #DDE0E6;
    opacity: 1;
      font-size: 12px;
      display: inline-block;
      margin-top: -4px;
      vertical-align: middle;
      margin-right: 5px;
  }
  .quitSpan{
    color: #333333;
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
      color: #333333;
    }
    /deep/ .el-avatar--medium {
        width: 30px;
        height: 30px;
        line-height: 30px;
      vertical-align: middle;
        border-radius: 8px;
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
