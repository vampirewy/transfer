<template>
  <div class="system-manage-page">
    <el-tabs v-model="activeTabName">
      <el-tab-pane
        label="员工列表"
        name="staff"
        v-if="getAccess('staff_list')"
      >
        <staff-manage v-if="activeTabName === 'staff'"></staff-manage>
      </el-tab-pane>
      <el-tab-pane
        label="角色列表"
        name="role"
        v-if="getAccess('role_list')"
      >
        <role-manage v-if="activeTabName === 'role'"></role-manage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import StaffManage from './staff_manage/index.vue';
import RoleManage from './role_manage/index.vue';

export default {
  name: 'SystemManage',
  components: {
    StaffManage,
    RoleManage,
  },
  data() {
    return {
      activeTabName:
        this.getAccess('staff_list')
          ? 'staff'
          : 'role',
    };
  },
};
</script>

<style lang="scss" scoped>
.system-manage-page {
  background: #fff;
  /deep/ .el-tabs__header {
    margin-bottom: 20px;
  }
}
</style>
