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
            <el-form-item label="回访时间：">
              {{form.nextFollowTime}}
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="回访方式：">
              {{form.planWayTypeName}}
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="回访提示：" class="followDesc">
                {{form.followDesc}}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'viewNextFollow',
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
        this.$jDynamic.hide({ component: 'viewNextFollow' });
      }
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
