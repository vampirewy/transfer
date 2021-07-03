<template>
  <el-dialog
    title="新增菜谱模板"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="580px"
    top="30vh"
    :visible.sync="visibles"
    @close="visibles = false"
  >
    <el-form
      :rules="rules"
      :model="ruleForm"
      inline
      label-width="90px"
      class="form-content"
    >
      <el-form-item
        prop="dietTemplateSortId"
        style="position: relative"
        label="模板类别："
      >
        <el-select
          placeholder="请选择"
          :value="menuTypeSelectName"
          clearable
          style="width: 159px"
        >
        </el-select>
        <div class="mask" @click="selectType"></div>
      </el-form-item>
      <el-form-item prop="name" label="模板名称：">
        <el-input
          v-model="ruleForm.name"
          style="width: 159px"
          placeholder="请输入"
        ></el-input>
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
      <div class="template-intro">
        <el-form-item label="模板介绍：">
          <el-input
            type="textarea"
            :rows="4"
            v-model="ruleForm.intro"
            placeholder="请输入"
            maxlength="300"
            show-word-limit
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
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
  },
  data() {
    return {
      ruleForm: {
        id: '',
        dietTemplateSortId: '',
        name: '',
        intro: '',
        minKcal: '',
        maxKcal: '',
      },
      rules: {
        dietTemplateSortId: [{ required: true, message: '请选择模板类别' }],
        name: [{ required: true, message: '请输入模板名称' }],
        minKcal: [{ required: true, message: '请输入最小卡路里' }],
        maxKcal: [{ required: true, message: '请输入最大卡路里' }],
      },
      menuTypeSelectName: '',
    };
  },
  watch: {
    value(val) {
      if (val.id) {
        this.ruleForm = val;
        this.menuTypeSelectName = val.dietTemplateSortName;
      } else {
        this.ruleForm = {
          id: '',
          dietTemplateSortId: '',
          name: '',
          intro: '',
          minKcal: '',
          maxKcal: '',
        };
        this.menuTypeSelectName = '';
      }
    },
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
      this.$api.dietMenuTemplateInterface
        .saveDietMenuTemplate(this.ruleForm)
        .then(() => {
          this.$message.success('操作成功!');
          this.visibles = false;
          this.$parent.loadData();
        });
    },
    selectType() {
      this.$parent.menuType = 2;
      this.$parent.isShowDietMenuTemplateType = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.template-intro {
  /deep/ .el-form-item {
    display: inline-flex;
    width: 100%;
    .el-form-item__content {
      flex: 1 !important;
    }
  }
}
.dialog-footer {
  text-align: center;
}
.line {
  line-height: 40px;
  margin-right: 10px;
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}
</style>
