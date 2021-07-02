<template>
  <el-dialog
    class="el-plan-setting-mdl"
    :title="modalTitle"
    :visible.sync="show"
    width="350px"
    alignFooter="right"
    :close-on-click-modal="false"
    @close="onVisible"
  >
    <div class="body">
      <div class="header">
        <el-form :inline="false" :model="form"
                 label-width="85px"
                 ref="form"
                 :rules="rules"
                 class="form-inline">
          <el-row>
            <el-col :span="24">
              <el-form-item label="登录密码：" prop="password">
                <el-input type="text"
                        placeholder="请输入新密码"
                        v-model="form.password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="footer" style="text-align: center">
      <el-button size="small" class="cancelBtn" @click="cancel">取消</el-button>
      <el-button size="small" class="sureBtn" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'resetPsd',
  data() {
    return {
      show: true,
      modalTitle: '',
      form: {
        id: '',
        password: '',
      },
      rules: {
        password: [{ required: true, message: '请输入新密码' }],
      },
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$nextTick(async () => {
        console.log(this.propsData);
        this.form.id = this.propsData.id;
      });
    },
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'resetPsd' });
      }
    },
    /**
     * 保存
     */
    save() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const obj = {};
          this.$api.systemManageInterface.updatePassword(this.form).then((res) => {
            const { data } = res;
            console.log(data);
            this.$message.success('操作成功');
            if (this.confirmfunc) {
              this.confirmfunc.call(this, obj);
            }
            this.cancel();
          });
        }
      });
    },
    cancel() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-plan-setting-mdl {
  /deep/ .el-dialog{
    margin-top: 33vh!important;
  }
  /deep/ .el-form-item{
    margin-bottom: 10px;
  }
  /deep/ .el-dialog__body{
    padding: 20px 26px 10px 26px !important;
  }
  .followDesc{
    /deep/ .el-form-item__content{
      line-height: 22px;
      margin-top: 10px;
    }
  }
}
</style>
