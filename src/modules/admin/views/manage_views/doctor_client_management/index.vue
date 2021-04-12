<template>
  <div class="doctor-management-page common-page-style">
    <el-tabs v-model="activeTabName">
      <el-tab-pane label="职称管理" name="position">
        <position-management></position-management>
      </el-tab-pane>
      <el-tab-pane label="医生管理" name="doctor">
        <doctor-management></doctor-management>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DoctorManagement from './doctor_management/index.vue';
import PositionManagement from './position_management/index.vue';

export default {
  name: 'index',
  components: {
    DoctorManagement,
    PositionManagement,
  },
  data() {
    return {
      activeTabName: 'position',
    };
  },
};
</script>

<style scoped>
.common-page-style {
  background: #fff;
  padding: 0 20px 20px;
}
</style>
