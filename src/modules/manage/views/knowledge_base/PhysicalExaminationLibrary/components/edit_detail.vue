<template>
  <el-dialog
    :title="value.type === 1 ? '编辑' : '编辑体检库'"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="570px"
    :visible.sync="visible"
    @close="cancel"
  >
    <!-- <div class="form-title">
      <div class="point"></div>
      <h3 class="name">企业信息</h3>
    </div> -->

    <el-form
      :label-position="right"
      label-width="100px"
      label-text-align="center"
      :model="value"
      class="form-content"
    >
      <!-- <el-form-item label="企业名称：">
        <el-input
          v-model="value.workUnitName"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          :maxlength="30"
          style="width: 430px"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="体检库名称：">
        <el-input
          v-model="value.address"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          :maxlength="180"
          style="width: 410px"
        ></el-input>
      </el-form-item>
      <div style="display: flex;">
      <!-- <el-col :span="6"> -->
        <el-form-item label="导入体检库：" >
          <el-select v-model="importLibraryId" placeholder="请选择">
            <el-option
              v-for="item in resultOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      <!-- </el-col> -->
      <!-- <el-col :span="6"> -->
        <el-form-item label="是否启用：" >
          <el-select v-model="state" placeholder="请选择">
            <!-- <el-option
              v-for="item in resultOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option> -->
            <el-option label="是" value="1" key="1"></el-option>
            <el-option label="否" value="2" key="2"></el-option>
          </el-select>
        </el-form-item>
      <!-- </el-col> -->
      </div>
      <!-- <el-form-item label="导入体检库：">
        <el-input
          v-model="value.contact"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          :maxlength="30"
          style="width: 166px"
        ></el-input>
        <span class="tel">是否启用：</span>
        <el-input
          v-model="value.mobile"
          :format="/^(1\d{0,10}){0,1}$/"
          :disabled="value.type === 2"
          :placeholder="value.type === 1 ? '请输入' : ''"
          style="width: 166px"
        ></el-input>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancel" class="cancelBtn">取消</el-button>
      <el-button type="primary" size="small" @click="submit" class="sureBtn">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'edit_or_detail',
  props: {
    visible: Boolean,
    value: Boolean,
    libraryList: {},
  },
  // props: ['id', 'editId'],
  data() {
    return {
      modalTitle: '编辑',
      result: '',
      results: '',
      state: '',
      importLibraryId: '',
      resultOptions: [
        // { value: 1, label: '未指定' },
        // { value: 2, label: '治疗中' },
        // { value: 3, label: '转诊' },
        // { value: 4, label: '转为慢病' },
        // { value: 5, label: '痊愈' },
        // { value: 6, label: '其他' },
      ],
    };
  },
  mounted() {
    console.log(this.libraryList, '接收的数据');
    this.getLibraryList();
  },
  methods: {
    async getLibraryList() {
      const res = await this.$api.physicalProjectListInterface.listOrganItemLibrary();
      const { data } = res.data;
      this.resultOptions = data;
    },
    cancel() {
      this.$emit('cancel');
    },
    async submit() {
      await this.$api.physicalProjectListInterface.saveOrganItemLibrary({
        name: this.value.address,
        state: this.state,
        importLibraryId: this.importLibraryId,
      });
      this.$message.success('操作成功');
      this.cancel();
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-detail /deep/ {
  .form-title {
    display: flex;
    align-items: center;
    .point {
      width: 5px;
      height: 5px;
      background: #4991fd;
      margin-right: 8px;
      -webkit-border-radius: 1px;
      -moz-border-radius: 1px;
      border-radius: 1px;
    }
    .name {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
    }
  }
  .form-content {
    margin-top: 20px;
    .el-input__inner {
      background-color: #f4f4f6;
      border: 0;
    }
    .tel {
      margin-left: 20px;
      color: #666;
    }
  }
  .dialog-footer {
    text-align: center;
    padding: 0 32px;
  }
  .reset-btn {
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    background: #97a6bd;
    color: #ffffff;
    font-weight: 400;
    padding: 12px 26px;
  }
  .add-btn {
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    padding: 12px 25px;
  }
}
</style>
