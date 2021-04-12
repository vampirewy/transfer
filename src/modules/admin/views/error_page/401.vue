<template>
  <error-content code="401" desc="您没有权限浏览这个页面" :src="src" />
</template>

<script>
import error401 from '~/src/assets/images/error_page/error-401.svg';
import errorContent from './error_content.vue';

export default {
  name: 'error_401',
  components: {
    errorContent,
  },
  data() {
    return {
      src: error401,
    };
  },
};
</script>
