<template>
  <el-dialog
    :title="ruleForm.id ? '编辑菜谱模板':'新增菜谱模板'"
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
      <el-form-item prop="dietTemplateSortId" label="模板分类：">
      <el-select
        v-model="ruleForm.dietTemplateSortId"
        placeholder="请选择"
        style="width: 160px"
      >
        <el-option
          :label="item.name"
          :value="item.id"
          v-for="(item, index) in menuTypeSelectList"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
      <!-- <el-form-item
        prop="dietTemplateSortId"
        style="position: relative"
        label="模板分类："
      >
        <el-select
          placeholder="请选择"
          :value="menuTypeSelectName"
          clearable
          style="width: 159px"
        >
        </el-select>
        <div class="mask" @click="selectType"></div>
      </el-form-item> -->
      <el-form-item prop="name" label="模板名称：">
        <el-input
          v-model="ruleForm.name"
          style="width: 160px"
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
          style="width: 200px"
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
    id: {
      type: String,
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
      menuTypeSelectList: [],
      rules: {
        dietTemplateSortId: [{ required: true, message: '请选择模板分类' }],
        name: [{ required: true, message: '请输入模板名称' }],
        minKcal: [{ required: true, message: '请输入最小卡路里' }],
        maxKcal: [{ required: true, message: '请输入最大卡路里' }],
      },
      menuTypeSelectName: '',
      query: '',
    };
  },
  watch: {
    // value(val) {
    //   if (val.id) {
    //     this.ruleForm = val;
    //     this.menuTypeSelectName = val.dietTemplateSortName;
    //   } else {
    //     this.ruleForm = {
    //       id: '',
    //       dietTemplateSortId: '',
    //       name: '',
    //       intro: '',
    //       minKcal: '',
    //       maxKcal: '',
    //     };
    //     this.menuTypeSelectName = '';
    //   }
    // },
  },
  mounted() {
    this.loadData();
    if (this.id) {
      this.$api.dietMenuTemplateInterface
        .getDietMenuTemplateDetail(this.id)
        .then((res) => {
          const { data } = res.data;
          this.ruleForm = {
            id: data.id,
            dietTemplateSortId: data.dietTemplateSortId,
            name: data.name,
            intro: data.intro,
            minKcal: data.minKcal,
            maxKcal: data.maxKcal,
          };
        });
    } else {
      this.ruleForm = {
        id: '',
        dietTemplateSortId: '',
        name: '',
        intro: '',
        minKcal: '',
        maxKcal: '',
      };
    }
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
    loadData() {
      this.$api.dietMenuTemplateInterface
        .getDietMeneTemCate({
          pageSize: 1000,
          // keywords: this.query,
        })
        .then((res) => {
          const { data } = res.data.data;
          this.menuTypeSelectList = data;
          // this.total = total;
        });
    },
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
    width: 98%;
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
