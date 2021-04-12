<template>
  <div class="error-page">
    <div class="content-con">
      <img :src="src" :alt="code" />
      <div class="text-con">
        <h4>{{ code }}</h4>
        <h5>{{ desc }}</h5>
      </div>
      <back-btn-group class="back-btn-group"></back-btn-group>
    </div>
  </div>
</template>

<script>
import backBtnGroup from './back_btn_group.vue';

export default {
  name: 'error_content',
  components: {
    backBtnGroup,
  },
  props: {
    code: String,
    desc: String,
    src: String,
  },
};
</script>

<style lang="scss" scoped>
.error-page {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f8f8f9;
  .content-con {
    width: 700px;
    height: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .text-con {
      position: absolute;
      left: 0;
      top: 0;
      h4 {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 80px;
        font-weight: 700;
        color: #348eed;
      }
      h5 {
        position: absolute;
        width: 700px;
        left: 0;
        top: 100px;
        font-size: 20px;
        font-weight: 700;
        color: #67647d;
      }
    }
    .back-btn-group {
      position: absolute;
      right: 0;
      bottom: 20px;
    }
  }
}
</style>
