<template>
  <el-dialog title="查看" :visible.sync="visible" @close="cancel">
    <ul class="file-detail">
      <li>附件标题: {{ current.title }}</li>
      <li>创建时间: {{ current.createTime }}</li>
      <li>附件: <a :href="`${upload_url}${current.filePath}`"
      target="blank">{{current.filePath}}</a></li>
      <li>备注: {{ current.remark }}</li>
    </ul>
  </el-dialog>
</template>
<script>
export default {
  name: 'fileDetail',
  props: {
    visible: Boolean,
    current: Object,
  },
  data() {
    return {
      upload_url: process.env.api.upload_url,
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
.file-detail {
  li {
    margin-top: 20px;
  }
}
</style>
