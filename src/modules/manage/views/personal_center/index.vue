<template>
  <div class="personal-center">
    <el-tabs>
      <el-tab-pane label="个人信息">
        <personal-info></personal-info>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <modify-password></modify-password>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PersonalInfo from './personal_info/index.vue';
import ModifyPassword from './modify_password/index.vue';

export default {
  name: 'PersonalCenter',
  components: {
    PersonalInfo,
    ModifyPassword,
  },
};
</script>

<style lang="scss" scoped>
.personal-center {
  min-height: 500px;
  /deep/ .el-tabs__header {
    width: 200px;
    margin-right: 24px;
    .el-tabs__item {
      font-size: 14px;
      font-weight: 400;
      color: #97A6BD;
      outline: none !important;
      &.is-active {
        font-size: 16px;
        font-weight: 600;
        color: #333333;
      }
    }
  }
  // /deep/ .el-tabs--left {
  //   width: 100%;
  // }
  // /deep/ .el-tabs__content {
  //   margin: 24px 24px 0 0;
  //   padding: 0 35px 15px 35px;
  //   background-color: white;
  // }
  // /deep/ .el-tabs--left .el-tabs__active-bar.is-left{
  //   left: 0;
  // }
  // /deep/ .el-tabs__nav-wrap::after{
  //   background-color: white;
  // }
  // /deep/ .el-table .el-table__header-wrapper th{
  //   padding: 9px 0;
  // }
}
</style>
