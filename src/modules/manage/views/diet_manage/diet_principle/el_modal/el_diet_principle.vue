<template>
  <el-dialog
    :title="EditList.Look ? '查看' :EditList.id ? '编辑':'新增'"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="550px"
    top="30vh"
    :visible.sync="visibles"
    @close="visibles = false"
  >
    <el-form  label-width="90px" class="form-content">
      <el-form-item  label="原则名称：">
          <div v-if="EditList.Look">{{EditList.name}}</div>
        <el-input placeholder="请输入" v-model="EditList.name"
        v-else></el-input>
      </el-form-item>
      <div class="template-intro">
        <el-form-item  label="原则内容：">
          <div v-if="EditList.Look" style="line-height: 20px;">{{EditList.content}}</div>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入"
            maxlength="300"
            show-word-limit
            v-model="EditList.content"
          v-else></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer" style="background:#ffffff" v-if="!EditList.Look">
      <el-button size="small" @click="visibles = false" class="cancelBtn"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit" class="sureBtn"
        >保存</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default() {
        return {};
      },
    },
    EditList: Object,
  },
  data() {
    return {
      name: '',
      content: '',
    };
  },
  computed: {
    visibles: {
      get() {
        return this.visible;
      },
      set() {
        this.$emit('update:visible', false);
      },
    },
  },
  methods: {
    submit() {
      if (this.EditList.name === '') {
        this.$message.warning('请填写名称');
        return false;
      }
      if (this.EditList.content === '') {
        this.$message.warning('请填写内容');
        return false;
      }
      // const params = {
      //   id: this.id,
      //   name: this.name,
      //   content: this.content,
      // };
      this.$api.dietProgrammeInterface.principlesaveDietPrinciple(this.EditList).then((res) => {
        const { data } = res;
        if (data.success) {
          this.$message.success('操作成功');
          // this.$parent.viewIndex = 1;
          this.$emit('cancel');
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
</style>
