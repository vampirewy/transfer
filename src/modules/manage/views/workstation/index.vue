<template>
  <div class="station">
    <Info></Info>
  </div>
</template>

<script>
import Info from './info/index.vue';
export default {
  name: 'workstation',
  components: { Info },
  data() {
    return {};
  },
  mounted() {
    document.querySelector('.main-content-con').style = 'top: 97px';
    document.querySelector('.content-wrapper').style =
      'height: calc(100% - 30px);margin: 0;background: #F6F8FC;padding:10px 20px 20px 19px';
  },
};
</script>

<style lang="scss" scoped></style>
