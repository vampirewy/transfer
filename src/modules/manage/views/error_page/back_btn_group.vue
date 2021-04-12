<template>
  <div class="back-btn-group">
    <el-button size="large" type="text" @click="backHome">返回首页</el-button>
    <el-button size="large" type="text" @click="backPrev">返回上一页</el-button>
  </div>
</template>

<script>
export default {
  name: 'backBtnGroup',
  methods: {
    backHome() {
      this.$router.replace({
        name: 'home',
      });
    },
    backPrev() {
      this.$router.go(-1);
    },
  },
};
</script>
