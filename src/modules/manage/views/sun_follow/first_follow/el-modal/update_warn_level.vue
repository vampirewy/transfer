<template>
  <el-dialog
    class="el-plan-setting-mdl"
    :title="modalTitle"
    :visible.sync="show"
    width="550px"
    alignFooter="right"
    :close-on-click-modal="false"
    @close="onVisible"
  >
    <div class="body">
      <div class="header">
        <el-form :inline="false" :model="form"
                 label-width="85px"
                 ref="form"
                 class="form-inline">
          <el-row>
            <el-col :span="12">
            <el-form-item label="项目名称：">
              {{form.projectName}}
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="项目结果：">
              {{form.result}}
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="预警等级：">
                <el-select
                        v-model="form.resultLevel"
                        placeholder="请选择"
                >
                  <el-option label="红色预警" :value="1"></el-option>
                  <el-option label="橙色预警" :value="2"></el-option>
                </el-select>
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
  name: 'updateWarnLevel',
  data() {
    return {
      show: true,
      modalTitle: '',
      form: {},
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$nextTick(async () => {
        console.log(this.propsData);
        this.form = this.propsData;
      });
    },
    onVisible(value) {
      if (!value) {
        this.$jDynamic.hide({ component: 'updateWarnLevel' });
      }
    },
    /**
     * 保存
     */
    save() {
      this.$refs.form.validate(async (valid) => {
        console.log('发送');
        if (valid) {
          const obj = {
            resultLevel: this.form.resultLevel,
          };
          if (this.confirmfunc) {
            this.confirmfunc.call(this, obj);
          }
          this.cancel();
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
