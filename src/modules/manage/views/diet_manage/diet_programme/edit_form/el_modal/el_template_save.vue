<template>
  <el-dialog
    title="保存为模版"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="570px"
    :visible.sync="visibles"
    @close="visibles = false"
  >
    <el-form inline :rules="rules"
    :model="ruleForm"
    label-width="90px"
     class="form-content">
      <el-form-item required label="模版类别：" prop="Category">
        <el-select placeholder="请选择" v-model="ruleForm.Category" style="width: 148px">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item required label="模版名称：" prop="name">
        <el-input style="width: 148px" v-model="ruleForm.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="minKcal" label="参考范围：">
        <el-input
        v-model="ruleForm.minKcal"
          style="width: 189px"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <span class="line">-</span>
      <el-form-item prop="maxKcal">
        <el-input
        v-model="ruleForm.maxKcal"
          style="width: 189px"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="模版介绍：">
        <el-input
          v-model="ruleForm.Introduction"
          placeholder="请输入"
          type="textarea"
          :rows="5"
          style="width: 400px"
          maxlength="300"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="visibles = false" class="cancelBtn"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit" class="sureBtn"
        >确定添加</el-button
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
  },
  data() {
    return {
      ruleForm: {
        Category: '',
        name: '',
        minKcal: '',
        maxKcal: '',
        Introduction: '',
      },
      rules: {
        Category: [{ required: true, message: '请选择模版类别' }],
        name: [{ required: true, message: '请输入模版名称' }],
        minKcal: [{ required: true, message: '请输入最小卡路里' }],
        maxKcal: [{ required: true, message: '请输入最大卡路里' }],
      },
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
    async submit() {
      await this.$api.companyManageInterface.updateWorkUnit({
        id: this.value.id,
        workUnitName: this.value.workUnitName,
        contact: this.value.contact,
        mobile: this.value.mobile,
        address: this.value.address,
      });
      this.$message.success('操作成功');
      this.cancel();
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-detail /deep/ {
  .el-dialog__body {
    padding: 20px 25px 0 34px !important;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>
