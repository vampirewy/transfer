<template>
  <error-content code="404" desc="该页面不存在" :src="src" />
</template>

<script>
import error404 from '~/src/assets/images/error_page/error-404.svg';
import errorContent from './error_content.vue';

export default {
  name: 'error_404',
  components: {
    errorContent,
  },
  data() {
    return {
      src: error404,
    };
  },
};
</script>
