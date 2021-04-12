<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '@/assets/public/main.scss';

export default {
  name: 'app',
  data() {
    return {};
  },
};
</script>

<style>
  body{
    min-width: 1300px;
  }
.el-message-box__content {
  display: flex;
  align-items: center;
}
  /* 客户编辑 popper 样式覆盖*/
  .user-edit-popper {
    position: absolute;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
  }
</style>
