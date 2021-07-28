<template>
  <el-dialog title="查看" :visible.sync="visible" :modal-append-to-body="false" @close="cancel">
    <ul class="file-detail">
      <li>附件标题: {{ current.title }}</li>
      <li>上传时间: {{ current.createTime }}</li>
      <li>附件: <a :href="`${upload_url}/${current.filePath}`"
      target="blank">{{current.filePath}}</a></li>
      <li>附件说明: {{ current.remark }}</li>
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
      upload_url: process.env.api.pdf_url,
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
/deep/ .el-dialog{
  width: 40% !important;
  margin-top: 15% !important;
}
</style>
