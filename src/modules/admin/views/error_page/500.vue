<template>
  <error-content code="500" desc="服务器错误" :src="src" />
</template>

<script>
import error404 from '~/src/assets/images/error_page/error-500.svg';
import errorContent from './error_content.vue';

export default {
  name: 'error_500',
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
