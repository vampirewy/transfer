<template>
  <el-upload
    :disabled="disabled"
    :headers="headers"
    :action="API + '/file/upload'"
    :on-success="onSuccess"
    :on-exceed="onExceed"
    :on-progress="onProgress"
    :on-error="onError"
    :before-upload="beforeUpload"
    :class="className"
    :show-file-list="showFileList"
    :data="{type}"
  >
    <slot></slot>
  </el-upload>
</template>

<script>
import { getToken } from '~/src/libs/util';
export default {
  name: 'Upload',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Object,
      default: () => ({ token: getToken() }),
    },
    onSuccess: {
      type: Function,
    },
    onProgress: {
      type: Function,
    },
    onError: {
      type: Function,
    },
    onExceed: {
      type: Function,
    },
    beforeUpload: {
      type: Function,
    },
    className: {
      type: [String, Object],
    },
    showFileList: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      API: process.env.api.common_url,
    };
  },
};
</script>

<style lang="sass" scoped>

</style>
