<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '~/src/assets/public/main.scss';

export default {
  name: 'app',
  data() {
    return {};
  },
};
</script>

<style>
.el-message-box__content {
  display: flex;
  align-items: center;
}
</style>
