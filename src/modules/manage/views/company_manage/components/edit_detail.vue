<template>
  <el-dialog
    :title="value.type === 1 ? '编辑' : '查看'"
    class="dialog-detail"
    :modal-append-to-body="false"
    width="570px"
    :visible.sync="visible"
    @close="cancel"
  >
    <!-- <div class="form-title">
      <div class="point"></div>
      <h3 class="name">单位信息</h3>
    </div> -->

    <el-form
      :label-position="right"
      label-width="80px"
      :model="value"
      class="form-content"
    >
      <el-form-item label="单位名称：">
        <el-input
          v-if="value.type === 1"
          v-model="value.workUnitName"
          placeholder="请输入"
          :maxlength="30"
          style="width: 430px"
        ></el-input>
        <span v-if="value.type === 2">{{value.workUnitName}}</span>
      </el-form-item>
      <el-form-item label="联系地址：">
        <el-input
          v-model="value.address"
          v-if="value.type === 1"
          placeholder="请输入"
          :maxlength="200"
          style="width: 430px"
        ></el-input>
        <span v-if="value.type === 2">{{value.address}}</span>
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input
          v-model="value.contact"
          v-if="value.type === 1"
          placeholder="请输入"
          :maxlength="30"
          style="width: 166px"
        ></el-input>
        <span v-if="value.type === 2"
        style="min-width:166px;display:inline-block;">{{value.contact}}</span>
        <span class="tel">联系电话：</span>
        <el-input
          v-model="value.mobile"
          :format="/^(1\d{0,10}){0,1}$/"
          v-if="value.type === 1"
          placeholder="请输入"
          style="width: 166px"
        ></el-input>
        <span v-if="value.type === 2"
        >{{value.mobile}}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" v-if="value.type === 1">
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
    value: Object,
  },
  data() {
    return {
      modalTitle: '编辑',
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
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
/deep/ .el-dialog__body{
  padding: 0;
}
.el-form-item{
  margin-bottom: 10px;
}
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
    .el-input__inner {
      // background-color: #f4f4f6;
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
