<template>
  <div class="header-bar">
    <!--<h3 class="title">{{ siteTitle }}</h3>-->
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderBar',
  props: {
    siteTitle: String,
  },
};
</script>

<style lang="scss" scoped>
.header-bar {
  width: 100%;
  line-height: 60px;
  height: 60px;
  position: relative;
  .title {
    font-size: 14px;
    font-weight: 400;
    color: #333;
    display: inline-block;
  }
  .custom-content-con {
    float: right;
    height: auto;
    line-height: 59px;
  }
}
</style>
